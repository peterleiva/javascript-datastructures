import { shouldBehaveLikeCollection, shouldBehaveLikeIterable } from "shared";
import Queue from "../queue";
import { Underflow } from "../errors";

describe("Queue", () => {
	let queue: Queue<number>;

	beforeEach(() => {
		queue = new Queue();
	});
	shouldBehaveLikeIterable(new Queue(1, 2, 3));
	shouldBehaveLikeCollection(Queue);

	describe("Queue creation", () => {
		describe("With Argument", () => {
			it("Create successfuly with 1 argument", () => {
				const queue = new Queue(10);
				expect(queue).toHaveLength(1);
			});

			it("Create successfuly with 2 items", () => {
				const queue = new Queue(10, 20);
				expect(queue).toHaveLength(2);
			});

			it("Create successfuly with multiple items", () => {
				const queue = new Queue(...[1, 2, 3, 4]);
				expect(queue).toHaveLength(4);
			});
		});

		describe("Without Argument", () => {
			it("creates empty queue", () => {
				const queue = new Queue();
				expect(queue).toHaveLength(0);
			});
		});
	});

	describe("Methods", () => {
		describe(".insert", () => {
			let queue: Queue<unknown>;
			beforeEach(() => (queue = new Queue()));

			describe("With single item", () => {
				it("Enqueue item sucessfully", () => {
					queue.insert(1);
					expect([...queue]).toEqual([1]);
				});

				it("Enqueues ordered by insertion time", () => {
					queue.insert(1);
					queue.insert(2);
					queue.insert(3);

					expect([...queue]).toEqual([1, 2, 3]);
				});

				it("Increase size by the number of insertions", () => {
					queue.insert(1);
					queue.insert(2);
					queue.insert(3);
					queue.insert(4);

					expect(queue).toHaveLength(4);
				});
			});

			describe("With multiple arguments", () => {
				it("insert items by order of argument", () => {
					const items = [1, 2, 3, 4];

					queue.insert(...items);
					expect([...queue]).toEqual(items);
				});

				it("Augment the queue length by quantity of arguments", () => {
					queue.insert(1, 2, 3, 4);
					expect(queue).toHaveLength(4);
				});

				it("Insert items at the rear", () => {
					const items = [1, 2, 3, 4];
					queue.insert(10);
					queue.insert(20);
					queue.insert(...items);

					expect([...queue]).toEqual([10, 20, ...items]);
				});

				it("Enqueue successfuly n elements", () => {
					queue.insert(1, 2, 3, 4);
					expect([...queue]).toEqual([1, 2, 3, 4]);
				});
			});
		});

		describe(".remove", () => {
			it("Dequeuing empty queue throws Underflow", () => {
				expect(() => queue.remove()).toThrow(Underflow);
			});

			it("Returns first item inserted", () => {
				queue.insert(1, 2, 3);
				expect(queue.remove()).toBe(1);
			});

			it("Decrease size by 1", () => {
				queue.insert(1, 2, 3);
				queue.remove();
				expect(queue).toHaveLength(2);
			});

			it("Gets empty queue when theres only one queued element", () => {
				queue.insert(1);
				queue.remove();
				expect(queue.empty()).toBe(true);
			});

			it("Remove last item", () => {
				queue.insert(1);
				queue.remove();
				expect([...queue]).toEqual([]);
			});
		});

		describe(".peek", () => {
			it("throws underfow for empty queue", () => {
				expect(() => queue.peek()).toThrow(Underflow);
			});

			it("return the next item of the queue", () => {
				queue.insert(1, 2, 3);
				expect(queue.peek()).toBe(1);
			});
		});

		describe(".empty", () => {
			it("Returns true after insert item", () => {
				const queue = new Queue();
				queue.insert(1);
				expect(queue.empty()).toBe(false);
			});

			it("Returns false for recent created queue", () => {
				const queue = new Queue();
				expect(queue.empty()).toBe(true);
			});

			it("Returns true after dequeue last item", () => {
				const queue = new Queue(10);
				queue.remove();

				expect(queue.empty()).toBe(true);
			});

			it("Returns false after dequeue and left with more than element", () => {
				const queue = new Queue(10, 20);

				queue.remove();
				expect(queue.empty()).toBe(false);
			});

			it("Returns false when constructing with single element", () => {
				const queue = new Queue(10);
				expect(queue.empty()).toBe(false);
			});

			it("Returns false when constructing with more than 1 element", () => {
				const queue = new Queue(1, 2, 3);
				expect(queue.empty()).toBe(false);
			});
		});

		describe(".size", () => {
			it("Returns 0 for new queue", () => {
				const queue = new Queue();
				expect(queue.size()).toBe(0);
			});

			it("Returns queued number of items", () => {
				const queue = new Queue(1, 2, 3, 4);
				expect(queue.size()).toBe(4);
			});
		});
	});
});
