# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Add [**Queue**](src/queue.ts) data structure to get FIFO access

  - `insert` - Insert several items in the queue, which can grow indefinitely
  - `remove` - Remove the last first element inserted, applied when the queue is nonempty
  - `empty` - return true of false depending whether or not the queue contains any items
  - `size` - returns the length of the queue
  - `clear` - remove all elements

- Add [**LinkedList**](src/list/list.ts) data structure with no limit of size. It has also some exceptions that can be throwed
- Add methods to [**LinkedList**](src/list/list.ts): `pop`, `push`, `size`, `isEmpty`, `length`, `size`, `indexOf`, `toArray`, `dequeue`, `clear`, `peek`, `tail` and `contains`.
- Besides the methods above. Add `values`, `entries` (as the default) and `values` iterators to **LinkedList** the same as the [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/array) has

[unreleased]: https://github.com/pherval/elementary-js-structures/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/pherval/elementary-js-structures/releases/tag/v0.1.0
