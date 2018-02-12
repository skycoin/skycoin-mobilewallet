import { by, browser, element } from 'protractor';

import { DisclaimerPage } from './disclaimer';

describe('Conduit App E2E Test Suite', () => {
  const disclaimerPage = new DisclaimerPage();
  describe('home page should work fine', () => {
    beforeAll(() => {
      disclaimerPage.getPage();
    });

    it('should have right title', () => {
      disclaimerPage.getPageTitle().then((title: string) => {
        expect(title).toEqual('Conduit');
      });
    });
  });
});
