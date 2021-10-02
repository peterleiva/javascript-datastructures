/**
 * Given when removing from empty ordered linear collection
 */
export default class Underflow extends Error {
	/**
	 * Initializes the underflow message
	 */
	constructor() {
		super("underflow");
	}
}
