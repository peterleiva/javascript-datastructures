/**
 * @file Tree tranversal interface for navigation
 */

interface TraversalFunction<T> {
  (data: T): void;
}
/**
 * Every tree has some ways to navigate over it.
 *
 * Tree Traversal defines common ways to traverse its nodes. When talk about
 * traversal always has to do with ordered tree, so to successfully traversal
 * the tree must be sorted
 *
 * TODO: definir traversal apenas para árvores ordenadas!!!
 */
interface TreeTraversal<T> extends Iterable<T> {
  /**
   * Tranverse the tree in pre order
   */
  preorder(): Iterator<T>;
  /**
   * Tranverse the tree in order
   */
  inorder(): Iterator<T>;
  /**
   * Tranverse a tree in pos order
   */
  posorder(): Iterator<T>;
  /**
   * Tranverse the tree in reverse in order
   */
  reverseInorder(): Iterator<T>;
}

export default TreeTraversal;
