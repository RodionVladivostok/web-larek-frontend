import { Component } from './base/Component'
import { IProduct, TCategory } from '../types'
import { IEvents } from './base/events'
import { ensureElement } from '../utils/utils'
import { CATEGORY_CLASS_LIST, CDN_URL } from '../utils/constants'


export class ProductCard extends Component<IProduct> {
	protected _title: HTMLHeadElement
	protected _image: HTMLImageElement
	protected _price: HTMLSpanElement
	protected _category: HTMLSpanElement
	protected _id: string

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._title = ensureElement<HTMLHeadElement>('.card__title', this.container)
		this._image = ensureElement<HTMLImageElement>('.card__image', this.container)
		this._price = ensureElement<HTMLSpanElement>('.card__price', this.container)
		this._category = ensureElement<HTMLSpanElement>('.card__category', this.container)

		this.container.addEventListener('click', () => {
			events.emit('card:select', {id: this._id})
		})
	}

	set id(value: string) {
		this._id = value
	}

	set title(value: string) {
		this._title.textContent = value
	}

	set price(value: number|null) {
		this._price.textContent = value
			? value + ' синапсов'
			: 'Бесценно'
	}

	set image(value: string) {
		this._image.src = CDN_URL + value
	}

	set category(value: TCategory) {
		this._category.textContent = value
		this._category.classList.add(CATEGORY_CLASS_LIST[value])
	}
}