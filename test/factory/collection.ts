import { Collection } from "types";
import casual from "casual";

export type CollectionFactory = {
	(data: unknown[]): Collection;
};

export function setupCollection(
	factory: CollectionFactory,
	items?: number
): Collection {
	const digits = Math.min(50, Math.max(0, items ?? casual.integer(2)));

	return factory(digits === 0 ? [] : casual.array_of_digits(digits));
}
