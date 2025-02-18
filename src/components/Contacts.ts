import { Component } from './base/Component'
import { IEvents } from './base/events'
import { ensureElement } from '../utils/utils'
import { IContacts } from '../types'

export class Contacts extends Component<IContacts> {
	protected _emailInput: HTMLInputElement
	protected _phoneInput: HTMLInputElement
	protected _payButton: HTMLButtonElement

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container)

		this._emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container)
		this._phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container)
		this._payButton = ensureElement<HTMLButtonElement>('.button', this.container)

		this._emailInput.addEventListener('input', e => {
			const email = (e.target as HTMLInputElement).value
			this.events.emit('email:changed', {email})
		})
		this._phoneInput.addEventListener('input', e => {
			const phone = (e.target as HTMLInputElement).value
			this.events.emit('phone:changed', {phone})
		})
		this._payButton.addEventListener('click', (e) => {
			e.preventDefault()
			this.events.emit('basket:success')
		})
	}

	set email(value: string) {
		this._emailInput.value = value
	}

	set phone(value: string) {
		this._phoneInput.value = value
	}

	set isFormValid(value: boolean) {
		this._payButton.disabled = !value
	}
}