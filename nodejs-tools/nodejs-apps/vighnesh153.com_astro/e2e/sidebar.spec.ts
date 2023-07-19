import { test, expect, type Page, type Locator } from '@playwright/test';

function getHamburgerIconBtn(page: Page): Locator {
  return page.getByTitle('open navigation menu', { exact: true });
}

function getVerticalNav(page: Page): Locator {
  return page.locator('#vertical-nav');
}

test('should not show the hamburger icon for large screen', async ({ page }) => {
  await page.goto('/');

  const hamburgerButton = getHamburgerIconBtn(page);

  await expect(hamburgerButton).not.toBeVisible();
});

test('should show the hamburger icon for small screen', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 915 });
  await page.goto('/');

  const hamburgerButton = getHamburgerIconBtn(page);

  await expect(hamburgerButton).toBeVisible();
});

test.describe('sidebar should open when interacting with the hamburger icon', () => {
  test('click of the hamburger icon', async ({ page }) => {
    await page.setViewportSize({ width: 412, height: 915 });
    await page.goto('/');

    const hamburgerButton = getHamburgerIconBtn(page);

    const verticalNav = getVerticalNav(page);

    await expect(verticalNav).not.toBeVisible();
    await hamburgerButton.click();
    await expect(verticalNav).toBeVisible();
  });

  test('hit enter when hamburger icon is focused', async ({ page }) => {
    await page.setViewportSize({ width: 412, height: 915 });
    await page.goto('/');

    const hamburgerButton = getHamburgerIconBtn(page);
    const verticalNav = getVerticalNav(page);

    await expect(verticalNav).not.toBeVisible();
    await hamburgerButton.focus();
    await page.keyboard.press('Enter');
    await expect(verticalNav).toBeVisible();
  });
});
