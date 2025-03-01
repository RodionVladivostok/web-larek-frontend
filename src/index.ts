import './scss/styles.scss'
import { API_URL } from './utils/constants'
import { Api } from './components/base/api'
import { EventEmitter } from './components/base/events'
import { IOrderPayload, IOrderResponse, IProductResponse, TPayment } from './types'
import { AppState } from './components/AppState'
import { Gallery } from './components/Gallery'
import { cloneTemplate, ensureElement } from './utils/utils'
import { ProductCard } from './components/ProductCard'
import { Modal } from './components/Modal'
import { ProductCardPreview } from './components/ProductCardPreview'
import { Page } from './components/Page'
import { Basket } from './components/Basket'
import { Order } from './components/Order'
import { Contacts } from './components/Contacts'
import { Success } from './components/Success'
import { BasketItem } from './components/BasketItem'


const api = new Api(API_URL)
const events = new EventEmitter()
const appState = new AppState({}, events)

const galleryTemplate = ensureElement<HTMLTemplateElement>('.gallery')
const productCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog')
const modalTemplate = ensureElement<HTMLElement>('#modal-container')
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview')
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket')
const orderTemplate = ensureElement<HTMLTemplateElement>('#order')
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts')
const successTemplate = ensureElement<HTMLTemplateElement>('#success')
const basketItemTemplate = ensureElement<HTMLTemplateElement>('#card-basket')

const gallery = new Gallery(galleryTemplate, events)
const modal = new Modal(modalTemplate, events)
const page = new Page(document.body, events)
const order = new Order(cloneTemplate(orderTemplate), events)
const contacts = new Contacts(cloneTemplate(contactsTemplate), events)
const success = new Success(cloneTemplate(successTemplate), events)
const basket = new Basket(cloneTemplate(basketTemplate), events)

api
	.get('/product')
	.then((res: IProductResponse) => {
		appState.setCatalog(res.items)
	})
	.catch(err => console.log(err))

events.on('catalog:changed', () => {
	gallery.catalog = appState.catalog.map(
		product => new ProductCard(cloneTemplate(productCardTemplate), events).render(product)
	)
})

events.on('card:select', ({id}: {id: string}) => {
	const product = appState.getProduct(id)
	const inBasket = appState.isProductInBasket(id)
	modal.render({
		content: new ProductCardPreview(cloneTemplate(cardPreviewTemplate), events).render({inBasket, ...product})
	})
	page.locked = true
})

events.on('card:to-basket', ({id}: {id: string}) => {
	const product = appState.catalog.find(product => product.id === id)
	appState.addToBasket(product)
	page.basketCount = appState.basketCount
	events.emit('modal:close')
})

events.on('modal:close', () => {
	modal.close()
	page.locked = false
})

events.on('basket:open', () => {
	const basketItems: HTMLElement[] = appState.basket.map(
		(product, i) => new BasketItem(cloneTemplate(basketItemTemplate), events)
			.render({
				product,
				index: i + 1
			}))
	modal.render({
		content: basket.render({
			basketItems,
			basketSum: appState.basketSum
		})
	})
	page.locked = true
})

events.on('card:delete-item', ({id}: {id: string}) => {
	appState.deleteFromBasket(id)
	page.basketCount = appState.basketCount
	basket.basketSum = appState.basketSum
	basket.updateIndexes()
})

events.on('basket:order', () => {
	modal.render({
		content: order.render({
			address: appState.order.address,
			payment: appState.order.payment,
		})
	})
})

events.on('payment:change', ({payment}: {payment: TPayment}) => {
	appState.order.payment = payment
	order.payment = payment
	order.orderBtnDisabled = appState.isPaymentAndAddressValid
})

events.on('address:changed', ({address}: {address: string}) => {
	appState.order.address = address
	order.orderBtnDisabled = appState.isPaymentAndAddressValid
})

events.on('basket:contacts', () => {
	modal.render({
		content: contacts.render({
			email: appState.order.email,
			phone: appState.order.phone,
		})
	})
})

events.on('email:changed', ({email}: {email: string}) => {
	appState.order.email = email
	contacts.payBtnDisabled = appState.isPhoneAndEmailValid
})

events.on('phone:changed', ({phone}: {phone: string}) => {
	appState.order.phone = phone
	contacts.payBtnDisabled = appState.isPhoneAndEmailValid
})

events.on('order:create', () => {
	const orderData: IOrderPayload = {
		...appState.order,
		total: appState.basketSum,
		items: appState.basket.map(p => p.id)
	}
	api
		.post('/order', orderData)
		.then((res: IOrderResponse) => {
			modal.render({
				content: success.render({sum: res.total})
			})
			appState.clearBasket()
			page.basketCount = appState.basketCount
			appState.clearOrderData()
			contacts.payBtnDisabled = appState.isPhoneAndEmailValid
			order.orderBtnDisabled = appState.isPaymentAndAddressValid
		})
		.catch(err => console.log(err))
})
