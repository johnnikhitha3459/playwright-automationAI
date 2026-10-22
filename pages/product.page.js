class ProductPage {
  constructor(page) {
    this.page = page;
    this.name = page.locator('.name');
    this.price = page.locator('.price-container');
    this.description = page.locator('#more-information');
    this.addToCartButton = page.getByRole('link', { name: 'Add to cart', exact: true });
  }

  async addToCart() {
    const dialogPromise = this.page.waitForEvent('dialog');
    const responsePromise = this.page.waitForResponse(response =>
      response.url().endsWith('/addtocart') &&
      response.request().method() === 'POST'
    );
    await this.addToCartButton.click();

    const [response, dialog] = await Promise.all([responsePromise, dialogPromise]);
    if (!response.ok()) {
      throw new Error(`Add-to-cart request failed with status ${response.status()}`);
    }
    await dialog.accept();
  }
}

module.exports = { ProductPage };
