import BinaryTree from "../binary-tree";

describe("Binary Tree", () => {
	describe("Creating the tree", () => {
		it("Gets empty root for created tree with no data", () => {
			const tree = new BinaryTree();
			expect(tree.root).toBeNull();
		});

		it("Create tree with data", () => {
			const data = 10;
			const tree = new BinaryTree(data);
			expect(tree.root?.data).toBe(10);
		});
	});

	describe("Properties", () => {
		it("Must have a root property", () => {
			const tree = new BinaryTree();
			expect(tree.root).toBeDefined();
		});
	});

	describe("Methods", () => {
		describe(".find", () => {
			const dataSearched = 10;
			const finder = (data: number) => data === dataSearched;

			it("Returns null for empty tree", () => {
				const tree = new BinaryTree<number>();
				expect(tree.find(finder)).toBeNull();
			});

			it.todo("Returns null for inexistent data", () => {
				const tree = new BinaryTree(50);
				expect(tree.find(finder)).toBeNull();
			});

			it.todo("Returns data when is at root", () => {
				const tree = new BinaryTree(dataSearched);
				expect(tree.find(finder)).toBe(dataSearched);
			});

			it.todo("Returns the data which i am looking for");
			it.todo("Returns data for leaf");
		});
	});
});
