import { RecipeBookAngularjsPage } from './app.po';

describe('recipe-book-angularjs App', () => {
  let page: RecipeBookAngularjsPage;

  beforeEach(() => {
    page = new RecipeBookAngularjsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
