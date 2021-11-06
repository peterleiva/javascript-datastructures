import { setupIntegerArray } from "factory";
import BST from "tree/binary-tree/bst";

type Options<T> = Partial<{
	n: number;
	items: T[];
}>;

export function setupBST(options?: Options<number>): {
	tree: BST<number>;
	collection: number[];
} {
	const data = options?.items ?? setupIntegerArray(options?.n);
	const tree = new BST<number>();

	return { tree: tree.insert(...data), collection: data };
}
