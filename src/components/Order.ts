import { Component } from './base/Component'
import { IEvents } from './base/events'
import { IOrder, TPayment } from '../types'
import { ensureElement } from '../utils/utils'


export class Order extends Component<IOrder> {
	protected _cardPayment: HTMLButtonElement
	protected _cashPayment: HTMLButtonElement
	protected _addressInput: HTMLInputElement
	protected _orderBtn: HTMLButtonElement

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container)

		this._cardPayment = ensureElement<HTMLButtonElement>('button[name="card"]', this.container)
		this._cashPayment = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container)
		this._addressInput = ensureElement<HTMLInputElement>('.form__input', this.container)
		this._orderBtn = ensureElement<HTMLButtonElement>('.order__button', this.container)

		this._cardPayment.addEventListener('click', () => this.events.emit('payment:change', {payment: 'card'}))
		this._cashPayment.addEventListener('click', () => this.events.emit('payment:change', {payment: 'cash'}))
		this._addressInput.addEventListener('input', (e) => {
			const address = (e.target as HTMLInputElement).value
			this.events.emit('address:changed', {address})
		})
		this._orderBtn.addEventListener('click', () => this.events.emit('basket:contacts'))
	}

	set payment(payment: TPayment) {
		switch (payment) {
			case 'card':
				this._cardPayment.classList.add('button_alt-active')
				this._cashPayment.classList.remove('button_alt-active')
				break
			case 'cash':
				this._cardPayment.classList.remove('button_alt-active')
				this._cashPayment.classList.add('button_alt-active')
				break
			default:
				this._cardPayment.classList.remove('button_alt-active')
				this._cashPayment.classList.remove('button_alt-active')
		}
	}

	set address(value: string) {
		this._addressInput.value = value
	}

	set isFormValid(value: boolean) {
		this._orderBtn.disabled = !value
	}
}