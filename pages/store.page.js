class StorePage {
  constructor(page) {
    this.page = page;
    this.productCards = page.locator('.card');
    this.categoryLinks = {
      phones: page.getByRole('link', { name: 'Phones', exact: true }),
      laptops: page.getByRole('link', { name: 'Laptops', exact: true }),
      monitors: page.getByRole('link', { name: 'Monitors', exact: true }),
    };
  }

  async open() {
    await this.page.goto('/');
  }

  async selectCategory(category) {
    await this.categoryLinks[category].click();
  }

  productLink(name) {
    return this.page.locator('.card-title a').getByText(name, { exact: true });
  }

  async openProduct(name) {
    await this.productLink(name).click();
  }
}

module.exports = { StorePage };
