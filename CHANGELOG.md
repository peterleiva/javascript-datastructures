# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Explicit export package public interface

### Added

- Iterable mixin to transform linear data structure iterable

#### [Binary Tree Node](src/tree/binary-tree-node.ts)

- Add BinaryTreeNode (BTNode) to be used as a node for binary trees

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
