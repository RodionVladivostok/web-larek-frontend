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

export interface IAppState {
	catalog: IProduct[]
	basket: IProduct[]
	payment: string
	address: string
	email: string
	phone: string
}

export interface IGallery {
	catalog: HTMLElement[]
}

export interface IModal {
	content: HTMLElement
}

export interface IBasket {
	products: IProduct[]
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
	basket: IProduct[]
}