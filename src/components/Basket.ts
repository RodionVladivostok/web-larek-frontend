import { Component } from './base/Component'
import { IEvents } from './base/events'
import { IBasket } from '../types'
import { ensureElement } from '../utils/utils'


export class Basket extends Component<IBasket> {
	protected _basketList: HTMLUListElement
	protected _basketPrice: HTMLSpanElement
	protected _basketButton: HTMLButtonElement

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container)
		this._basketList = ensureElement<HTMLUListElement>('.basket__list', this.container)
		this._basketPrice = ensureElement<HTMLSpanElement>('.basket__price', this.container)
		this._basketButton = ensureElement<HTMLButtonElement>('.basket__button', this.container)
		
		this._basketButton.addEventListener('click', () => this.events.emit('basket:order'))
	}

	set basketItems(basketItems: HTMLElement[]) {
		this._basketList.replaceChildren(...basketItems)
	}

	set basketSum(sum: number) {
		this._basketPrice.textContent = sum + ' синапсов'
		this._basketButton.disabled = sum === 0
	}

	updateIndexes() {
		Array.from(this._basketList.children).forEach((item, i) => {
			item.querySelector('.basket__item-index').textContent = (i + 1).toString()
		})
	}
}