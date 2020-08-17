/**
 * @file Queue data structure
 * @version 0.1.0
 */

/**
 * Queue list to enqueue things and dequeue them
 */
type QueueList<T> = Array<T> | T;

/**
 * Queue Abstract Data Type
 *
 * All kinds of queues must implement this interface, them it can behave like a
 * queue
 */
export interface QueueADT<T> {
  top(): T;
  isEmpty(): boolean;
  enqueue(element: QueueList<T>): QueueList<T>;
  dequeue(quantity?: number): QueueList<T>;
  size(): number;
  clear(): this;
}

/**
 * Collection operation
 */
interface Collection<Element> {
  concat(collection: Collection<Element>): Collection<Element>;

  /**
   * Transform each element in a collection modifying its values according to
   * callback function
   *
   * @param {function(data: Element): Element} callback Mapper function to
   *    transformer for each element from the collection
   */
  map(callback: (data: Element) => Element): this;
}

/**
 * Max size queue error object
 */
export class QueueFullError extends Error {
  /**
   * Creates a QueueMaxSizeError with default message
   */
  constructor() {
    super('Queue reached the maximum size 4,294,967,295');
  }
}

/**
 * Positive value error
 */
export class PositiveValueError extends Error {
  /**
   * Creates a new PositiveValueError
   */
  constructor() {
    super('The value must be positive');
  }
}

/**
 * Dequeue a empty queue error throwed when dequeue an empty queue
 */
export class QueueEmptyError extends Error {
  /**
   * Creates a QueueEmptyError with default message
   */
  constructor() {
    super('Queue can\'t dequeue a empty queue');
  }
}

/**
 * Priotity function to enqueue follwing this algorythm
 *
 * An priority queue must give this function as argument on enqueue function
 */
interface PriorityFunction<T> {
  (element: T): number
}

/**
 * Define a queue data structure for queueing things
 *
 * @implements {QueueADT}
 *
 * TODO: Usar uma função ao enfileirar para tornar em uma fila de prioridade
 */
export class Queue<T> implements QueueADT<T> {
  static MAX_SIZE = 2**32 - 1;
  #list: Array<T> = [];
  #size = 0;

  /**
   * Create the queue with a list of optional elements
   */
  constructor(...elements: Array<T>) {
    this.enqueue(elements);
  }

  /**
   * Alias for .size method
   *
   * @return {number}
   */
  get length(): number {
    return this.size();
  }

  /**
   * Number of stored elements in the queue
   *
   * @return {number}
   */
  size(): number {
    return this.#size;
  }

  /**
   * Get the next element in line witouth dequeueing it
   *
   * Creates a new copy with only the first element of the queue, without
   * removing it. For empty queue it gets a null object
   *
   * @return {T}
   */
  top(): T {
    if (this.size() === 0) return null;

    return this.#list.slice(0, 1).pop();
  }

  /**
   * Enqueue single or list of elements
   *
   * Enqueue always add a elements to the end of list inside datastructure. The
   * argument accepts a single or a list of them. enqueuem them in the order
   * they are, alweays at the end. A full error can be throw if the queue
   * exceeds. The internal structure accepts a list of 2**32 items, which is the
   * maximum size a array element can have in javascript.
   * If those elements are enqueue successfuly a copy of them is retuned as an
   * array or a single element
   *
   * @throws QueueMaxSizeError when exceeds the queue size
   * @param {T | Array<T>} element elements to be enqueued
   * @return {Array<T> | T}
   */
  enqueue(element: QueueList<T>): QueueList<T> {
    const elements: Array<T> = Array.isArray(element) ? element : [element];

    if (this.size() + elements.length >= Queue.MAX_SIZE) {
      throw new QueueFullError;
    }

    this.#list.push(...elements);
    this.#size += elements.length;

    return element;
  }

  /**
   * Removes all elements turning the queue empty
   *
   * @return {this}
   */
  clear(): this {
    this.#list = [];
    this.#size = 0;

    return this;
  }

  /**
   * Dequeue a list of elements from the queue
   *
   * Dequeue is an operation with effects. The elements no long exists in Queue
   * structure. Thereof it removes the n elements, specified by quantity
   * argument, returning them on success. If the queue only have one element,
   * them this single elements is returned otherwise it returns a array of
   * deleted elements, sorted by queue order.
   *
   * @throws QueueEmptyError when queue is empty
   * @throws PositiveValueError when quantity if less than 0
   * @param {number} quantity
   * @return {EnqueueArgument}
   */
  dequeue(quantity = 1): QueueList<T> {
    if (quantity < 0) throw new PositiveValueError;
    if (quantity > this.length) throw new QueueEmptyError;

    let dequeued: T[] = [];

    dequeued = this.#list.splice(0, quantity);
    this.#size -= quantity;

    return dequeued.length === 1 ? dequeued.pop() : dequeued;
  }

  /**
   * Check if the queue is empty
   *
   * @return {number}
   */
  isEmpty(): boolean {
    return this.#size === 0;
  }
}

export default Queue;
