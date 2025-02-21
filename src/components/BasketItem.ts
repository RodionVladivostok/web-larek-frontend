import { Component } from './base/Component'
import { IBasketItem, IProduct } from '../types'
import { IEvents } from './base/events'
import { ensureElement } from '../utils/utils'


export class BasketItem extends Component<IBasketItem> {
	protected _title: HTMLSpanElement
	protected _price: HTMLSpanElement
	protected _index: HTMLSpanElement
	protected _itemDeleteButton: HTMLButtonElement
	protected _id: string

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container)

		this._title = ensureElement<HTMLSpanElement>('.card__title', this.container)
		this._price = ensureElement<HTMLSpanElement>('.card__price', this.container)
		this._index = ensureElement<HTMLSpanElement>('.basket__item-index', this.container)
		this._itemDeleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container)

		this._itemDeleteButton.addEventListener('click', () => {
			this.container.remove()
			this.events.emit('card:delete-item', {id: this._id})
		})
	}

	set product(product: IProduct) {
		this._title.textContent = product.title
		this._price.textContent = `${product.price} синапсов`
		this._id = product.id
	}

	set index(value: number) {
		this._index.textContent = value.toString()
	}
}