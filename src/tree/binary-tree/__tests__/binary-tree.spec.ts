import BinaryTree from "../binary-tree";
import BTNode from "../binary-tree-node";

describe("Binary Tree", () => {
	let tree: BinaryTree<unknown>;
	const comparator = jest.fn((a, b) => a < b);
	const items = [14, 15, 4, 9, 3];
	// should create the following tree:
	//    14
	//  /    \
	//  4    15
	// /  \
	// 3   9
	//

	beforeEach(() => (tree = new BinaryTree({ comparator })));

	describe("Creating the tree", () => {
		it("Gets empty root for created tree with no data", () => {
			const tree = new BinaryTree();
			expect(tree.root).toBeNull();
		});

		it("Create tree with data", () => {
			const data = 10;
			const tree = new BinaryTree({ root: data });
			expect(tree.root?.data).toBe(data);
			expect(tree).toHaveLength(1);
		});
	});

	describe("Properties", () => {
		describe("root", () => {
			it("get root when non-empty tree", () => {
				const tree = new BinaryTree({ root: 10 });
				expect(tree.root).toBeDefined();
				expect(tree.root).toBeInstanceOf(BTNode);
			});

			it("get null when empty tree", () => {
				expect(tree.root).toBeNull();
			});
		});

		describe("data", () => {
			it("get undefined when empty tree", () => {
				expect(tree.data).toBeUndefined();
			});

			it("get root data when non-empty tree", () => {
				const data = 10;

				expect(new BinaryTree({ root: 10 }).data).toBe(data);
			});
		});

		describe("left", () => {
			let tree: BinaryTree<number>;

			beforeEach(() => (tree = new BinaryTree({ root: 10 })));

			it("gets left subtree when non-empty left subtree", () => {
				tree.root?.setLeft(20);

				expect(tree.left).toBeDefined();
				expect(tree.left).toBeInstanceOf(BTNode);
				expect(tree.left?.data).toBe(20);
			});

			it("get null subtree when empty tree", () => {
				const tree = new BinaryTree();
				expect(tree.left).toBeNull();
			});

			it("get null when left subtree is empty", () => {
				expect(tree.left).toBeNull();
			});
		});

		describe("right", () => {
			let tree: BinaryTree<number>;

			beforeEach(() => (tree = new BinaryTree({ root: 10 })));

			it("gets right subtree when non-empty right subtree", () => {
				tree.root?.setRight(20);

				expect(tree.right).toBeDefined();
				expect(tree.right).toBeInstanceOf(BTNode);
				expect(tree.right?.data).toBe(20);
			});

			it("get null subtree when empty tree", () => {
				const tree = new BinaryTree();
				expect(tree.right).toBeNull();
			});

			it("get null when right subtree is empty", () => {
				expect(tree.right).toBeNull();
			});
		});
	});

	describe("Methods", () => {
		describe(".search", () => {
			const item = 10;
			const finder = (data: number) =>
				data === item ? 0 : data < item ? -1 : 1;

			it("Returns null for empty tree", () => {
				const tree = new BinaryTree<number>();
				expect(tree.search(finder)).toBeNull();
			});

			it("Returns null for inexistent data", () => {
				const tree = new BinaryTree({ root: 50 });
				expect(tree.search(finder)).toBeNull();
			});

			it("Returns data when is at root", () => {
				const tree = new BinaryTree({ root: item });
				expect(tree.search(finder)).toBe(item);
			});

			it.todo("Returns the data which i am looking for");
			it.todo("Returns data for leaf");
		});

		describe("insert", () => {
			it("creates a tree structure", () => {
				tree.insert(...items);
				expect(tree.data).toBe(14);
				expect(tree.left?.data).toBe(4);
				expect(tree.right?.data).toBe(15);
				expect(tree.left?.left?.data).toBe(3);
				expect(tree.left?.right?.data).toBe(9);
			});

			it("creates a list-like structure", () => {
				const items = [2, 4, 6, 8];
				tree.insert(...items);

				expect(tree.data).toBe(2);
				expect(tree.right?.data).toBe(4);
				expect(tree.right?.right?.data).toBe(6);
				expect(tree.right?.right?.right?.data).toBe(8);
			});

			it("keeps tree empty with no items argument", () => {
				tree.insert();

				expect(tree).toHaveLength(0);
			});

			it("increase size by argument value", () => {
				tree.insert(...items);
				expect(tree).toHaveLength(items.length);
				tree.insert(...items);
				expect(tree).toHaveLength(2 * items.length);
			});

			it("insert duplicated values", () => {
				tree.insert(...items);
				tree.insert(14);

				expect(tree).toHaveLength(items.length + 1);
				expect(tree.right?.left?.data).toBe(14);
			});
		});

		describe("insertDistinct", () => {
			it("ignore duplicate values on insertion", () => {
				tree.insertDistinct(14, 14);

				expect(tree.data).toBe(14);
				expect(tree.root?.isLeaf()).toBe(true);
			});

			it("size is equal to distinct values", () => {
				tree.insertDistinct(14, 14);

				expect(tree).toHaveLength(1);
			});

			it("ignores same object reference", () => {
				const data = {
					a: "a",
				};

				tree.insertDistinct(data, 14, data);

				expect(tree.data).toBe(data);
				expect(tree).toHaveLength(2);
			});
		});

		describe("depth", () => {
			it("returns -Infinity for empty tree", () => {
				expect(tree.depth()).toBe(-Infinity);
			});

			it("returns 0 for single rooted tree", () => {
				const tree = new BinaryTree({ root: 10 });
				expect(tree.depth()).toBe(0);
			});

			it("given the maximium level of any leaf of the tree", () => {
				tree.insert(...items);
				tree.insert(-1);
				expect(tree.depth()).toBe(3);
			});
		});
	});
});
