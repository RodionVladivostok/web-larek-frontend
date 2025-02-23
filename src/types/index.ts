export interface IProduct {
	id: string
	description: string
	image: string
	title: string
	category: string
	price: number|null
}

export interface IProductCardPreview extends IProduct {
	inBasket: boolean
}

export interface IProductResponse {
	items: IProduct[]
	total: number
}

export interface IOrderResponse {
	id: string
	total: number
}

export interface IAppState {
	catalog: IProduct[]
	basket: IProduct[]
	order: IOrderData
}

export interface IGallery {
	catalog: HTMLElement[]
}

export interface IModal {
	content: HTMLElement
}

export interface IBasket {
	basketItems: HTMLElement[]
	basketSum: number
}

export interface IBasketItem {
	product: IProduct
	index: number
}

export type TCategory =
	| 'другое'
	| 'софт-скил'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил'

export type TCategoryClasses = {
	[key in TCategory]: string
}

export type TPayment = 'card'|'cash'|null

export interface IOrder {
	payment: TPayment
	address: string
}

export interface IContacts {
	email: string
	phone: string
}

export interface ISuccess {
	sum: number
}

export interface IOrderData {
	payment: TPayment
	address: string
	phone: string
	email: string
}

export interface IOrderPayload extends IOrderData {
	total: number
	items: string[]
}