// eslint-disable-next-line no-unused-vars
/*global describe, test, expect, jest*/

import sum from '../sum.js';

test('adds 1 + 2 to equal 3', () => {
	expect(sum(1, 2)).toBe(3);
});

test("iK testing jest object is working probably otherwise include import {jest} from '@jest/globals'", () => {
	const iKmockFunction = jest.fn(x => x + 42);

	expect(iKmockFunction(1)).toBe(43);
});