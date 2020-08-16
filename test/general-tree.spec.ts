import Tree from 'src/general-tree';

describe('Tree Class', () => {

  describe('Methods', () => {
    describe('.children', () => {
      describe('With no child', () => {
        let tree: Tree<any>;

        beforeEach(() => {
          tree = new Tree();
        });

        it('Gets a empty array', async () => {
          expect(tree.children.length).toEqual(0);
        });
      });

      describe('With child', () => {
        let tree: Tree<number>;

        beforeEach(() => {
          tree = new Tree();
        });

        it('Returns the same order as the children data', async () => {
          tree.appendChild(1);
          tree.appendChild(2);
          const data = tree.children.map(t => t.data);
          expect(data).toEqual([1, 2]);
        });

        afterEach(() => {
          tree = null;
        });
      });
    });

    describe('.appendChild', () => {
      let tree: Tree<number>;

      beforeEach(() => {
        tree = new Tree();
        tree.appendChild(1);
      });

      it('Add child to the end of list', async () => {
        const children = tree.children;
        expect(children[children.length - 1].data).toEqual(1);
      });

      it('Increase the child list', async () => {
        expect(tree.children.length).toEqual(1);
      });

      afterEach(() => {
        tree = null;
      });
    });
  });
});
