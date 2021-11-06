import { Collection } from "types";
import casual from "casual";

export type CollectionFactory = {
	(data: unknown[]): Collection;
};

export function setupIntegerArray(n?: number, limit = 50): number[] {
	const digits = Math.min(50, Math.max(0, n ?? casual.integer(2)));

	return digits === 0 ? [] : casual.array_of_digits(digits);
}

export function setupCollection(
	factory: CollectionFactory,
	items?: number
): Collection {
	const digits = setupIntegerArray(items);

	return factory(digits);
}
