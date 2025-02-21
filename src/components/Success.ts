import { Component } from './base/Component'
import { IEvents } from './base/events'
import { ensureElement } from '../utils/utils'
import { ISuccess } from '../types/'


export class Success extends Component<ISuccess> {
	protected _description: HTMLParagraphElement
	protected _successBtn: HTMLButtonElement

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container)

		this._description = ensureElement<HTMLParagraphElement>('.order-success__description', this.container)
		this._successBtn = ensureElement<HTMLButtonElement>('.order-success__close', this.container)

		this._successBtn.addEventListener('click', () => this.events.emit('modal:close'))
	}

	set sum(sum: number) {
		this._description.textContent = `Списано ${sum} синапсов`
	}
}