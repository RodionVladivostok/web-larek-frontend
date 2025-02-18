import './scss/styles.scss'
import { API_URL } from './utils/constants'
import { Api } from './components/base/api'
import { EventEmitter } from './components/base/events'
import { IProductResponse, TPayment } from './types';
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

const gallery = new Gallery(galleryTemplate, events)
const modal = new Modal(modalTemplate, events)
const page = new Page(document.body, events)
const order = new Order(cloneTemplate(orderTemplate), events)
const contacts = new Contacts(cloneTemplate(contactsTemplate), events)

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
	modal.close()
	page.locked = false
})

events.on('modal:close', () => {
	modal.close()
	page.locked = false
})

events.on('basket:open', () => {
	page.locked = true
	renderBasket()
})

events.on('card:delete-item', ({id}: {id: string}) => {
	appState.deleteFromBasket(id)
	page.basketCount = appState.basketCount
	renderBasket()
})

events.on('basket:order', () => {
	modal.render({
		content: order.render({
			address: appState.address,
			payment: appState.payment,
		})
	})
})

events.on('payment:change', ({payment}: {payment: TPayment}) => {
	appState.payment = payment
	order.payment = payment
	order.isFormValid = appState.isPaymentAndAddressValid
})

events.on('address:changed', ({address}: {address: string}) => {
	appState.address = address
	order.isFormValid = appState.isPaymentAndAddressValid
})

events.on('basket:contacts', () => {
	modal.render({
		content: contacts.render({
			email: appState.email,
			phone: appState.phone,
		})
	})
})

events.on('email:changed', ({email}: {email: string}) => {
	appState.email = email
	contacts.isFormValid = appState.isPhoneAndEmailValid
})

events.on('phone:changed', ({phone}: {phone: string}) => {
	appState.phone = phone
	contacts.isFormValid = appState.isPhoneAndEmailValid
})

events.on('basket:success', () => {
	modal.render({
		content: new Success(cloneTemplate(successTemplate), events).render({basket: appState.basket})
	})
	appState.clearBasket()
	page.basketCount = appState.basketCount
	appState.clearOrderAndContactFields()
})

const renderBasket = () => {
	modal.render({
		content: new Basket(cloneTemplate(basketTemplate), events).render({
			products: appState.basket,
			basketSum: appState.basketSum
		})
	})
}



