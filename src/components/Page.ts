import { Component } from './base/Component'
import { IEvents } from './base/events'
import { ensureElement } from '../utils/utils'


export class Page extends Component<any> {
	protected _basketCount: HTMLSpanElement
	protected _pageWrapper: HTMLDivElement
	protected _basketButton: HTMLButtonElement

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container)
		this._basketCount = ensureElement<HTMLSpanElement>('.header__basket-counter', this.container)
		this._basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container)
		this._pageWrapper = ensureElement<HTMLDivElement>('.page__wrapper', this.container)

		this._basketButton.addEventListener('click', () => this.events.emit('basket:open'))
	}

	set basketCount(value: number) {
		this._basketCount.textContent = value.toString()
	}

	set locked(value: boolean) {
		if (value) {
			this._pageWrapper.classList.add('page__wrapper_locked');
		} else {
			this._pageWrapper.classList.remove('page__wrapper_locked');
		}
	}
}