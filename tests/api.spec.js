const { test, expect } = require('@playwright/test');
const productCategories = require('./test-data/product-categories.json');

test.describe('DemoBlaze product API', () => {
  test('GET /entries returns a valid product catalog', async ({ request }) => {
    const response = await request.get('/entries');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body.Items)).toBe(true);
    expect(body.Items.length).toBeGreaterThan(0);

    const productIds = new Set();
    for (const product of body.Items) {
      expect(product).toEqual(expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        price: expect.any(Number),
        cat: expect.any(String),
        desc: expect.any(String),
        img: expect.any(String),
      }));
      expect(product.title.length).toBeGreaterThan(0);
      expect(productIds.has(product.id)).toBe(false);
      productIds.add(product.id);
    }
  });

  for (const { category, expectedProduct } of productCategories) {
    test(`POST /bycat returns only ${category} products`, async ({ request }) => {
      const response = await request.post('/bycat', {
        data: { cat: category },
      });
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(Array.isArray(body.Items)).toBe(true);
      expect(body.Items.length).toBeGreaterThan(0);
      for (const product of body.Items) {
        expect(product.cat).toBe(category);
      }
      expect(body.Items.map((product) => product.title)).toContain(expectedProduct);
    });
  }

  test('POST /view returns details for product 1', async ({ request }) => {
    const response = await request.post('/view', {
      data: { id: '1' },
    });
    expect(response.status()).toBe(200);

    const product = await response.json();
    expect(product).toEqual(expect.objectContaining({
      id: 1,
      title: expect.any(String),
      price: expect.any(Number),
      cat: expect.any(String),
      desc: expect.any(String),
      img: expect.any(String),
    }));
    expect(product.title.length).toBeGreaterThan(0);
    expect(product.desc.length).toBeGreaterThan(0);
  });

  test('POST /bycat returns an empty list for an unsupported category', async ({ request }) => {
    const response = await request.post('/bycat', {
      data: { cat: 'not-a-real-category' },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.Items).toEqual([]);
  });
});
