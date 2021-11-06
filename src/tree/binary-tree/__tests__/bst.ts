import { setupBST } from "factory/binary-tree";
import { Underflow } from "linear";
import BST from "../bst";

describe("Binary Search Tree", () => {
	describe("#deleteMin", () => {
		let tree: BST<number>;
		let collection: number[];
		let min: number;

		beforeEach(() => {
			({ tree, collection } = setupBST());
			min = Math.min(...collection);
		});

		test("throws Underflow when tree is empty", () => {
			expect(() => new BST().deleteMin()).toThrow(Underflow);
		});

		test("return minimium item deleted", () => {
			expect(tree.deleteMin()).toBe(min);
		});

		test("remove minimium item from the tree", () => {
			tree.deleteMin();

			expect(tree.search(s => s - min)).toBeNull();
		});

		test("remove root has single item", () => {
			const tree = new BST();
			tree.insert(1);
			tree.deleteMin();

			expect(tree).toHaveLength(0);
			expect(tree.empty()).toBe(true);
		});
	});
});
