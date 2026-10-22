const { test, expect } = require('@playwright/test');
const { getValidLoginData } = require('./test-data/login-database');

test('new customer can sign up and log in with credentials from SQLite', async ({ page }) => {
  const { username, password } = getValidLoginData();

  await page.goto('/');

  const signupModal = page.locator('#signInModal');
  await page.getByRole('link', { name: 'Sign up', exact: true }).click();
  await signupModal.locator('#sign-username').fill(username);
  await signupModal.locator('#sign-password').fill(password);

  const signupDialogPromise = page.waitForEvent('dialog');
  await signupModal.getByRole('button', { name: 'Sign up', exact: true }).click();
  const signupDialog = await signupDialogPromise;
  const signupMessage = signupDialog.message();
  await signupDialog.accept();
  expect(signupMessage).toBe('Sign up successful.');

  const loginModal = page.locator('#logInModal');
  await page.getByRole('link', { name: 'Log in', exact: true }).click();
  await loginModal.locator('#loginusername').fill(username);
  await loginModal.locator('#loginpassword').fill(password);

  await loginModal.getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(page.locator('#nameofuser')).toHaveText(`Welcome ${username}`);
});
