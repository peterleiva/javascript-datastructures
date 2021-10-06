import BinaryTree from "../binary-tree";

describe("Binary Tree", () => {
	describe("Creating the tree", () => {
		it("Create a tree successfully", () => {
			const tree = new BinaryTree();
			expect(tree).toBeDefined();
		});

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
		describe(".size", () => {
			it("Gets 0 for newly created tree", () => {
				const tree = new BinaryTree();
				expect(tree.size()).toBe(0);
			});

			it("Gets 1 for root only element", () => {
				const tree = new BinaryTree(10);
				expect(tree.size()).toBe(1);
			});

			it.todo("Gets 2 for single leat right");
			it.todo("Gets 2 for single leaf right");
			it.todo("Gets 10 for 10 appends");
		});

		describe(".isEmpty", () => {
			describe("Created with no data", () => {
				let tree: BinaryTree<number>;

				beforeEach(() => {
					tree = new BinaryTree();
				});

				it("Returns true", () => {
					expect(tree.empty()).toBe(true);
				});

				it.todo("Returns true after inserting at root");
			});

			it("Gets false for new tree with data", () => {
				const tree = new BinaryTree(10);
				expect(tree.empty()).toBe(false);
			});
		});

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
