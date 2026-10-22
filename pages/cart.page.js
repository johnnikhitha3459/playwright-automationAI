class CartPage {
  constructor(page) {
    this.page = page;
    this.productRows = page.locator('#tbodyid tr');
    this.total = page.locator('#totalp');
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order', exact: true });
    this.orderModal = page.locator('#orderModal');
    this.purchaseButton = this.orderModal.getByRole('button', { name: 'Purchase', exact: true });
  }

  async open() {
    await this.page.goto('/cart.html');
  }

  productRow(name) {
    return this.productRows.filter({ hasText: name });
  }

  async removeProduct(name) {
    await this.productRow(name).getByRole('link', { name: 'Delete', exact: true }).click();
  }

  async openOrderForm() {
    await this.placeOrderButton.click();
  }

  async completeOrder({ name, country, city, card, month, year }) {
    await this.orderModal.locator('#name').fill(name);
    await this.orderModal.locator('#country').fill(country);
    await this.orderModal.locator('#city').fill(city);
    await this.orderModal.locator('#card').fill(card);
    await this.orderModal.locator('#month').fill(month);
    await this.orderModal.locator('#year').fill(year);
    await this.purchaseButton.click();
  }
}

module.exports = { CartPage };
