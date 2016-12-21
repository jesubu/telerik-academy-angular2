import { TelerikAcademyKendoAngular2QuickstartPage } from './app.po';

describe('telerik-academy-kendo-angular2-quickstart App', function() {
  let page: TelerikAcademyKendoAngular2QuickstartPage;

  beforeEach(() => {
    page = new TelerikAcademyKendoAngular2QuickstartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
