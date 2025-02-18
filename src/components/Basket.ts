import { Component } from './base/Component'
import { IEvents } from './base/events'
import { IBasket, IProduct } from '../types'
import { cloneTemplate, ensureElement } from '../utils/utils'
import { BasketItem } from './BasketItem'


export class Basket extends Component<IBasket> {
	protected _basketList: HTMLUListElement
	protected _basketItemTemplate: HTMLTemplateElement
	protected _basketPrice: HTMLSpanElement
	protected _basketButton: HTMLButtonElement

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container)
		this._basketList = ensureElement<HTMLUListElement>('.basket__list', this.container)
		this._basketItemTemplate = ensureElement<HTMLTemplateElement>('#card-basket')
		this._basketPrice = ensureElement<HTMLSpanElement>('.basket__price', this.container)
		this._basketButton = ensureElement<HTMLButtonElement>('.basket__button', this.container)

		this._basketButton.addEventListener('click', () => this.events.emit('basket:order'))
	}

	set products(products: IProduct[]) {
		this._basketList.replaceChildren(
			...products.map((product, i) => new BasketItem(cloneTemplate(this._basketItemTemplate), this.events)
				.render({
					product,
					index: i + 1
				}))
		)
		this._basketButton.disabled = products.length === 0
	}

	set basketSum(sum: number) {
		this._basketPrice.textContent = sum + ' синапсов'
	}
}