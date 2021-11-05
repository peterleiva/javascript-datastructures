import type { DequeADT } from "./types";

/**
 * A Deque is an ordered set of items from which items may be deleted at either
 * end and into which items may be inserted at either end
 */
export default class Deque<T> implements DequeADT<T> {
	insertLeft(item: T): T {
		throw new Error("must be implemented");
	}

	insertRight(item: T): T {
		throw new Error("must be implemented");
	}

	deleteLeft(): T {
		throw new Error("must be implemented");
	}

	deleteRight(): T {
		throw new Error("must be implemented");
	}
}
