export function shouldBehaveLike(
	description: string,
	behavior: () => void
): void {
	describe(`should behave like ${description}`, () => {
		behavior();
	});
}
