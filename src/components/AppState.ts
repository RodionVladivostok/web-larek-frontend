import { IAppState, IOrderData, IProduct } from '../types'
import { Model } from './base/Model'


export class AppState extends Model<IAppState>{
	catalog: IProduct[] = []
	basket: IProduct[] = []
	order: IOrderData = {
		payment: null,
		address: '',
		phone: '',
		email: '',
	}

	setCatalog(products: IProduct[]) {
		this.catalog = products
		this.events.emit('catalog:changed')
	}

	addToBasket(value: IProduct) {
		this.basket.push(value)
	}

	deleteFromBasket(id: string) {
		this.basket = this.basket.filter(p => p.id !== id)
	}

	get basketCount() {
		return this.basket.length
	}

	clearBasket() {
		this.basket = []
	}

	get basketSum() {
		return this.basket.reduce((sum, product) => sum + product.price, 0)
	}

	getProduct(id: string) {
		return this.catalog.find(product => product.id === id)
	}

	isProductInBasket(id: string) {
		return this.basket.some(p => p.id === id)
	}

	get isPhoneAndEmailValid() {
		return !!(this.order.phone && this.order.email)
	}

	get isPaymentAndAddressValid() {
		return !!(this.order.payment && this.order.address)
	}

	clearOrderData() {
		this.order = {
			payment: null,
			address: '',
			phone: '',
			email: '',
		}
	}
}