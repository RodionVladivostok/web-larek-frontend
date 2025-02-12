import { IAppState, IProduct, TPayment } from '../types'
import { Model } from './base/Model'

export class AppState extends Model<IAppState>{
	catalog: IProduct[] = []
	basket: IProduct[] = []
	payment: TPayment = null
	address: string
	email: string
	phone: string

	setCatalog(products: IProduct[]) {
		this.catalog = products
		this.events.emit('catalog:changed')
	}

	addToBasket(value: IProduct) {
		this.basket.push(value)
	}
}