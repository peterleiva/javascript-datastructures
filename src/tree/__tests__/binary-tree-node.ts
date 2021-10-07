import BTNode, { InvalidInsertion } from "../binary-tree-node";
import { setupTree } from "factory";

describe("Binary Tree Node", () => {
	const { root: tree, left, right, leaf } = setupTree();

	describe("making node", () => {
		it("constructs node with data", () => {
			const data = 10;
			expect(new BTNode(data).data).toBe(data);
		});

		it("constructs node with null value", () => {
			expect(new BTNode(null).data).toBeNull();
		});

		it("tree's partitions is null", () => {
			const node = new BTNode(10);

			expect(node.father).toBeNull();
			expect(node.left).toBeNull();
			expect(node.right).toBeNull();
		});
	});

	describe("setLeft", () => {
		let node: BTNode<unknown>;
		const data = 10;

		beforeEach(() => {
			node = new BTNode(null);
			node.setLeft(data);
		});

		it("creates left node with argument data", () => {
			expect(node.left).toBeInstanceOf(BTNode);
			expect(node.left).not.toBeNull();
			expect(node.left?.data).toBe(data);
		});

		it("left's father returns this node", () => {
			expect(node.left?.father).toBe(node);
		});

		it("throws InvalidInsertion when left tree isn't empty", () => {
			expect(() => node.setLeft(20)).toThrow(InvalidInsertion);
		});
	});

	describe("setRight", () => {
		let node: BTNode<unknown>;
		const data: unknown = 10;

		beforeEach(() => {
			node = new BTNode(null);
			node.setRight(data);
		});

		it("creates left node with argument data", () => {
			expect(node.right).not.toBeNull();
			expect(node.right).toBeInstanceOf(BTNode);
			expect(node.right?.data).toBe(data);
		});

		it("right's father returns this node", () => {
			expect(node.right?.father).toBe(node);
		});

		it("throws InvalidInsertion when right tree isn't empty", () => {
			expect(() => node.setRight(20)).toThrow(InvalidInsertion);
		});
	});

	describe("brother", () => {
		it("returns null when node is root", () => {
			expect(tree.brother).toBeNull();
		});

		it("returns null when node has no sibling", () => {
			expect(leaf.brother).toBeNull();
		});

		it("returns right when node is left tree", () => {
			expect(left.brother).toBe(tree.right);
		});

		it("returns left tree when node is right tree", () => {
			expect(right.brother).toBe(left);
		});
	});

	describe("isLeft", () => {
		it("returns true for left(p.father) == this", () => {
			expect(left.isLeft()).toBe(true);
		});

		it("returns false when has no father", () => {
			expect(tree.isLeft()).toBe(false);
		});

		it("returns false when right(p.father) == this", () => {
			expect(right.isLeft()).toBe(false);
		});
	});

	describe("isRight", () => {
		it("returns true when node is right(p.father)", () => {
			expect(right.isRight()).toBe(true);
		});

		it("returns false when has no father", () => {
			expect(tree.isRight()).toBe(false);
		});

		it("returns false when node is left(p.father)", () => {
			expect(left.isRight()).toBe(false);
		});
	});

	describe("root", () => {
		it("returns self ref when node is root", () => {
			expect(tree.root).toBe(tree);
		});

		it("returns root for descendent node", () => {
			expect(left.root).toBe(tree);
			expect(right.root).toBe(tree);
			expect(leaf.root).toBe(tree);
		});
	});

	describe("isRoot", () => {
		it("returns true when node has no father", () => {
			expect(tree.isRoot()).toBe(true);
		});

		it("returns false when node has father", () => {
			expect(right.isRoot()).toBe(false);
			expect(left.isRoot()).toBe(false);
			expect(leaf.isRoot()).toBe(false);
		});

		it("returns false when node internal node", () => {
			expect(left.isRoot()).toBe(false);
		});
	});

	describe("isLeaf", () => {
		it("returns true when node hasn't son", () => {
			expect(leaf.isLeaf()).toBe(true);
			expect(right.isLeaf()).toBe(true);
		});

		it("returns false when has sons", () => {
			expect(left.isLeaf()).toBe(false);
		});
	});

	describe("level", () => {
		it("root node has level 0", () => {
			expect(tree.level()).toBe(0);
		});

		it("root' son has level 1", () => {
			expect(left.level()).toBe(1);
		});

		it("node has level(father) + 1", () => {
			expect(leaf.level()).toBe(2);
		});
	});
});
