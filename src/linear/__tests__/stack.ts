import Stack from "../stack";
import { shouldBehaveLikeIterable, shouldBehaveLikeStack } from "shared";

describe("Stack", () => {
	shouldBehaveLikeIterable(new Stack(1, 2, 3));
	shouldBehaveLikeStack(Stack);

	describe("Initiating", () => {
		it("push in order of arguments", () => {
			const items = [1, 2, 3, 4];
			const stack = new Stack(...items);
			expect([...stack]).toEqual(items.reverse());
		});
	});
});
