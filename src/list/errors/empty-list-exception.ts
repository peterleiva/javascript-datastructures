export default class EmptyListException extends Error {
	constructor() {
		super();

		this.message = `Can't remove item from a empty list`;
	}
}
