import { Component } from './base/Component'
import { IEvents } from './base/events'
import { IProductCardPreview, TCategory } from '../types'
import { ensureElement } from '../utils/utils'
import { CATEGORY_CLASS_LIST, CDN_URL } from '../utils/constants'


export class ProductCardPreview extends Component<IProductCardPreview> {
	protected _category: HTMLSpanElement
	protected _title: HTMLHeadElement
	protected _image: HTMLImageElement
	protected _price: HTMLSpanElement
	protected _description: HTMLParagraphElement
	protected _cardButton: HTMLButtonElement
	protected _id: string

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container)

		this._category = ensureElement('.card__category', this.container)
		this._title = ensureElement('.card__title', this.container)
		this._image = ensureElement<HTMLImageElement>('.card__image', this.container)
		this._price = ensureElement('.card__price', this.container)
		this._description = ensureElement<HTMLParagraphElement>('.card__text', this.container)
		this._cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container)

		this._cardButton.addEventListener('click', () => this.events.emit('card:to-basket', {id: this._id}))
	}

	set id(value: string) {
		this._id = value
	}

	set description(value: string) {
			this._description.innerText = value
	}

	set image(value: string) {
		this._image.src = CDN_URL + value
	}


	set title(value: string) {
		this._title.innerText = value
	}

	set price(value: number|null) {
		this._price.textContent = value
			? value + ' синапсов'
			: 'Бесценно'
		if (!value) {
			this._cardButton.disabled = true
		}
	}

	set category(value: TCategory) {
		this._category.innerText = value
		this._category.classList.add(CATEGORY_CLASS_LIST[value])
	}

	set inBasket(value: boolean) {
		this._cardButton.disabled = value
	}
}