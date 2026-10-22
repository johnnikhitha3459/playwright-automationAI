const { test, expect } = require('@playwright/test');
const { StorePage } = require('../pages/store.page');
const { ProductPage } = require('../pages/product.page');
const { CartPage } = require('../pages/cart.page');

test('store catalog displays products and filters by category', async ({ page }) => {
  const store = new StorePage(page);
  await store.open();

  await expect(page).toHaveTitle('STORE');
  await expect(store.productCards.first()).toBeVisible();

  await store.selectCategory('phones');
  await expect(store.productLink('Samsung galaxy s6')).toBeVisible();
  await expect(store.productCards).toHaveCount(7);

  await store.selectCategory('laptops');
  await expect(store.productLink('Sony vaio i5')).toBeVisible();
  await expect(store.productCards).toHaveCount(6);

  await store.selectCategory('monitors');
  await expect(store.productLink('Apple monitor 24')).toBeVisible();
  await expect(store.productCards).toHaveCount(2);
});

test('customer can view a product and add it to the cart', async ({ page }) => {
  const store = new StorePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  await store.open();
  await store.openProduct('Samsung galaxy s6');
  await expect(product.name).toHaveText('Samsung galaxy s6');
  await expect(product.price).toContainText('$360');
  await expect(product.description).toContainText('Samsung Galaxy S6');

  await product.addToCart();
  await cart.open();
  await expect(cart.productRow('Samsung galaxy s6')).toBeVisible();
  await expect(cart.total).toHaveText('360');
});

test('customer can place an order from the cart', async ({ page }) => {
  const store = new StorePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  await store.open();
  await store.openProduct('Samsung galaxy s6');
  await product.addToCart();
  await cart.open();
  await expect(cart.productRow('Samsung galaxy s6')).toBeVisible();

  await cart.openOrderForm();
  await expect(cart.orderModal).toBeVisible();
  await cart.completeOrder({
    name: 'Demo Customer',
    country: 'Test Country',
    city: 'Test City',
    card: '4111111111111111',
    month: '12',
    year: '2030',
  });
  await expect(page.getByText('Thank you for your purchase!', { exact: true })).toBeVisible();
});

test('customer can remove a product from the cart', async ({ page }) => {
  const store = new StorePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  await store.open();
  await store.openProduct('Samsung galaxy s6');
  await product.addToCart();
  await cart.open();

  await cart.removeProduct('Samsung galaxy s6');
  await expect(cart.productRows).toHaveCount(0);
  await expect(cart.total).toBeEmpty();
});
