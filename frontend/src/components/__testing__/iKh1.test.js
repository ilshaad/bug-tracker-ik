// eslint-disable-next-line no-unused-vars
/*global describe, test, expect, jest*/

import iKh1 from '../iKh1.js';

describe('iKh1 component imports css file so I want to test jest handling other different type of file wihtin the component', () => {
	test('test iKh1 function to be truthy', () => {
		expect( iKh1() ).toBeTruthy();
	});

	test('snapshotting iKh1 function callback', () => {
		expect(iKh1()).toMatchSnapshot();
	});
}); /*END describe() */