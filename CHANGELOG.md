# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Explicit export package public interface

### Added

- Iterable mixin to transform linear data structure iterable

#### [Binary Tree Node (BTNode)](src/tree/binary-tree/node.ts)

**BinaryTreeNode** (**BTNode**) is used as a node for binary trees to creates a dynamic linked representation of the tree, it is the root of binary trees.
Note: BTNode can't be manipulated directly only through `BinaryTree.root` getter

Properties:

- `data` - Node's data
- `father` - Node's father which is a node as well
- `left` - Left subtree node
- `right` - Right subtree node
- `brother` - Brother subtree node, which means right subtree when is left subtree and vice-versa
- `root` - Root from the node, it walks through the ancestors until it find the its root

Methods:

- `setLeft(): this` - creates a leaft to insert data in, for tree with no left son
- `setRight(): this` - returns true whether tree is right subtree or false otherwise
- `isRoot(): boolean` - Checks whether the tree is the root node
- `isLeft(): boolean` - returns true whether tree is left subtree or false otherwise
- `isRight(): boolean` - creates a leaf to insert data in, for tree with no right son
- `isLeaf(): boolean` - returns true whether tree has no sons, also known as a leaf
- `level(): number` - Calculates the level of the subtree
- `ancestor(): boolean` - Checks whether the tree is ancestor of the tree
- `descendant(): boolean` - Checks whether the tree is the root node

#### [Binary Tree](src/tree/binary-tree/tree.ts)

- Construct tree with options `root` and `comparator`, comparator by default is a plain equality `a < b` comparison and `root` creates a binary tree with root value

Properties:

- `data: T | undefined` - root data if exists
- `root: BTNode` - root node
- `left: BTNode` - left subtree
- `right: BTNode` - right subtree
- `length: number` - size of the tree

Methods:

- `empty(): boolean` - _alias_ for `.length`
- `clear(): this` - remove all data from the tree
- `depth(): number` - returns the longest path in the tree, which means the highest level or `-Infinity` if is empty
- `insert(...items): this` - insert multiple data in the tree following the constructor option `comparator` which when is true insert at the left and right otherwise
- `insertDistinct(...items): this` - same as `.insert` but ignores equal values using `Object.is` comparison

#### [Queue](src/linear/queue.ts)

- Add the following methods:
  - `peak(): T` - Retrieve the first element from the queue, the next to be removed, or throws `QueueUnderflow` exception if is empty
  - `clear` - remove all elements from the collection

#### [Stack](src/linear/stack.ts)

- Add the following methods:

  - ` clear(): this` - remove all elements from the collection
  - `[Symbol.iterator]` - iterator
  - `entries(): IterableIterator<[number, T]>` - Returns an iterable of key, value pairs for every entry in collection
  - `keys(): IterableIterator<number>` - Returns an iterable of keys in the collection
  - `values(): IterableIterator<T>` - Returns an iterable of values in the collection

- Add [**LinkedList**](src/list/list.ts) data structure with no limit of size. It has also some exceptions that can be throwed
- Add methods to [**LinkedList**](src/list/list.ts): `pop`, `push`, `size`, `isEmpty`, `length`, `size`, `indexOf`, `toArray`, `dequeue`, `clear`, `peek`, `tail` and `contains`.
- Besides the methods above. Add `values`, `entries` (as the default) and `values` iterators to **LinkedList** the same as the [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/array) has

## [0.4.0] - 2021-09-30

### Added

- Add [**Stack**](src/stack.ts) data structure get LIFO access:

  - `push` - Insert item at the beginning of the stack
  - `pop` - Remove the last item inserted
  - `top` - Returns the top of the stack
  - `size` - Returns the size of the stack
  - `empty` - Return true of false depending whether or not the stack contains any items
  - `length` - Alias for `size`

- Add [**Queue**](src/queue.ts) data structure to get FIFO access

  - `insert` - Insert several items in the queue, which can grow indefinitely
  - `remove` - Remove the last first element inserted, applied when the queue is nonempty
  - `empty` - return true of false depending whether or not the queue contains any items
  - `size` - returns the length of the queue
  - `clear` - remove all elements

[unreleased]: https://github.com/pherval/elementary-js-structures/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/pherval/elementary-js-structures/compare/v0.1.0...v0.4.0
[0.1.0]: https://github.com/pherval/elementary-js-structures/releases/tag/v0.1.0
