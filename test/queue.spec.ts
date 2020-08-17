import Queue, {
  QueueFullError,
  QueueEmptyError,
  PositiveValueError,
} from 'src/queue.ts';

describe('Queue', () => {
  describe('Create Queues', () => {
    describe('With Argument', () => {
      it('Create successfuly with 1 argument', () => {
        const queue = new Queue(10);
        expect(queue).toBeDefined();
      });

      it('Create successfuly with n arguments', () => {
        const queue = new Queue(...[10, 20]);
        expect(queue).toBeDefined();
      });

      it('It has the size of argument', () => {
        const queue = new Queue(...[1, 2, 3, 4]);
        expect(queue.length).toBe(4);
      })
    });

    describe('Without Argument', () => {
      it('Create a empty queue successfuly', () => {
        const queue = new Queue();
        expect(queue).toBeDefined();
      });

      it('Has zero length', () => {
        const queue = new Queue<number>();
        expect(queue.length).toBe(0);
      });
    });
  });

  describe('Methods', () => {
    describe('.top', () => {
      it('Returns null for empty queue', () => {
        expect(new Queue().top()).toBeNull();
      });

      it('returns the only element', () => {
        const element = 10;
        const queue = new Queue(10);
        expect(queue.top()).toBe(element);
      });

      it('Gets the first arg when constructing with various args', () => {
        const first = 1;
        const queue = new Queue(first, 2, 3, 4, 5);
        expect(queue.top()).toBe(first);
      });

      it('Returns elements without removing it', () => {
        const queue = new Queue(1, 2, 3);
        queue.top();
        expect(queue.length).toBe(3);
      });
    });

    describe('.enqueue', () => {
      describe('With single argument', () => {
        it('Enqueue element sucessfully', () => {
          const queue = new Queue();
          queue.enqueue(1);
          expect(queue.top()).toBe(1);
        });

        it('Augment queue size by 1', () => {
          const queue = new Queue(1, 2, 3, 4);
          queue.enqueue(5);

          expect(queue.size()).toBe(5);
        });

        it('Augment queue size by n when n sequence enqueues', () => {
          const queue = new Queue();
          queue.enqueue(1);
          queue.enqueue(2);
          queue.enqueue(3);

          expect(queue.size()).toBe(3);
        });

        it('Gets the first element after n sequence enqueues', () => {
          const queue = new Queue();
          queue.enqueue(1);
          queue.enqueue(2);
          queue.enqueue(3);

          expect(queue.top()).toBe(1);
        });

        it.skip('Throws QueueFullError when queue max size', async () => {
          // FIXME: mocar size para que não possa cair no erro de heap
          const fillQueue = (size: number) => new Promise((resolve) => {
            const queue = new Queue();

            for (let i = 0; i < size; i++) queue.enqueue(i);
            resolve(queue);
          });

          await expect(fillQueue(Queue.MAX_SIZE + 1))
              .rejects.toThrow(QueueFullError);
        });
      });

      describe('With multiple arguments', () => {
        it('Augment the queue size by n elements added', () => {
          const queue = new Queue();
          queue.enqueue([1, 2, 3, 4]);

          expect(queue.length).toBe(4);
        });

        it('The last n elements is the equals to array of n', () => {
          const elements = [1, 2, 3, 4];
          const queue = new Queue();
          queue.enqueue(elements);
          queue.enqueue(10);
          queue.enqueue(20);

          expect(queue.dequeue(4)).toEqual(elements);
        });

        it.todo('Throw QueueFullError when exceeds maximum size');
      });
    });

    describe('.dequeue', () => {
      it('Gets the only element same enqueue element', () => {
        const queue = new Queue();
        queue.enqueue(1);
        expect(queue.dequeue()).toBe(1);
      });

      it('Descrese queue size by n for n successive dequeues', () => {
        const queue = new Queue(1, 2, 3, 4);

        queue.dequeue();
        queue.dequeue();

        expect(queue.size()).toBe(2);
      });

      it('Descrese queue size by n passed as argument', () => {
        const queue = new Queue(1, 2, 3, 4);

        queue.dequeue(2);
        expect(queue.size()).toBe(2);
      });

      it('Empty the queue when dequeue its single element', () => {
        const queue = new Queue(1);
        queue.dequeue();

        expect(queue.isEmpty()).toBe(true);
      });

      it('Empty queue by dequeuing all elements', () => {
        const queue = new Queue(1, 2, 3, 4);
        queue.dequeue(4);

        expect(queue.isEmpty()).toBe(true);
      });

      it('Gets the first enqueue element after various enqueue', () => {
        const queue = new Queue(1);

        queue.enqueue(2);
        queue.enqueue(3);
        queue.enqueue(4);

        expect(queue.dequeue()).toBe(1);
      });

      it('Throw PositiveValueError value negative values', () => {
        const queue = new Queue();
        expect(() => queue.dequeue(-10)).toThrowError(PositiveValueError);
      });

      it('Throws error when dequeue more elements than it have', () => {
        const queue = new Queue(1, 2, 3);
        expect(() => queue.dequeue(4)).toThrowError(QueueEmptyError);
      });

      it('Throws a QueueEmptyError for empty queue', () => {
        const queue = new Queue();
        expect(() => queue.dequeue()).toThrowError(QueueEmptyError);
      });
    });

    describe('.isEmpty', () => {
      it('Returns true after added 1 element', () => {
        const queue = new Queue();
        queue.enqueue(1);
        expect(queue.isEmpty()).toBe(false);
      });

      it('Returns false for no elements', () => {
        const queue = new Queue();
        expect(queue.isEmpty()).toBe(true);
      });

      it('Returns true after dequeue single element', () => {
        const queue = new Queue(10);
        queue.dequeue();

        expect(queue.isEmpty()).toBe(true);
      });

      it('Returns false after dequeue and left with more than element', () => {
        const queue = new Queue(10, 20);

        queue.dequeue();
        expect(queue.isEmpty()).toBe(false);
      });

      it('Returns false when constructing with single element', () => {
        const queue = new Queue(10);
        expect(queue.isEmpty()).toBe(false);
      });

      it('Returns false when constructing with more than 1 element', () => {
        const queue = new Queue(1, 2, 3);
        expect(queue.isEmpty()).toBe(false);
      });
    });

    describe('.size', () => {
      it('Returns 0 when constructing with no elements', () => {
        const queue = new Queue();
        expect(queue.size()).toBe(0);
      });

      it('Returns 1 when constructing with 1 element', () => {
        const queue = new Queue(1);
        expect(queue.size()).toBe(1);
      });

      it.skip('Returns Max size elements for massive constructing', () => {
        const size = Queue.MAX_SIZE;
        const elements = [];
        for (let i = 0; i < size; i++) elements.push(i);

        const queue = new Queue(...elements);
        expect(queue.size()).toBe(size);
      });
    });

    describe('.clear', () => {
      it('Removes all elements with no empty queue', () => {
        const queue = new Queue(1, 2, 3);
        queue.clear();

        expect(queue.length).toBe(0);
      });

      it('Keeps the queue empty', () => {
        const queue = new Queue();
        queue.clear();

        expect(queue.length).toBe(0);
      });
    });
  });
});
