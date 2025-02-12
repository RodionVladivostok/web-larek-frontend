import { Component } from './base/Component'
import { IEvents } from './base/events'
import { IModal } from '../types'
import { ensureElement } from '../utils/utils'


export class Modal extends Component<IModal> {
	protected _content: HTMLElement
	protected _closeButton: HTMLButtonElement

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container)

		this._content = ensureElement<HTMLElement>('.modal__content', container)
		this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container)

		this._closeButton.addEventListener('click', () => this.events.emit('modal:close'))
		this.container.addEventListener('click', () => this.events.emit('modal:close'))
		this._content.addEventListener('click', e => e.stopPropagation())
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value)
	}

	close() {
		this.container.classList.remove('modal_active')
	}

	render(data?: Partial<IModal>): HTMLElement {
		super.render(data)
		this.container.classList.add('modal_active')
		return this.container
	}
}