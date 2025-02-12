import { IGallery } from '../types'
import { Component } from './base/Component'
import { IEvents } from './base/events'


export class Gallery extends Component<IGallery> {
	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
	}

	set catalog(items: HTMLElement[]) {
		this.container.replaceChildren(...items);
	}
}