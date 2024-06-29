import { test, expect, type Page, type Locator } from '@playwright/test';
import { enableMobileScreen } from './helper';

const closeNavigationMenuTitle = 'close navigation menu';

function getHamburgerIconBtn(page: Page): Locator {
  return page.getByTitle('open navigation menu', { exact: true });
}

function getVerticalNav(page: Page): Locator {
  return page.locator('#vertical-nav');
}

async function openSideNavigation(page: Page): Promise<void> {
  await enableMobileScreen(page);
  await page.goto('/');
  await getHamburgerIconBtn(page).click();
}

test.describe('visibility of hamburger icon button', () => {
  test('hide the hamburger icon button for large screen', async ({ page }) => {
    await page.goto('/');

    const hamburgerButton = getHamburgerIconBtn(page);

    await expect(hamburgerButton).not.toBeVisible();
  });

  test('show the hamburger icon button for small screen', async ({ page }) => {
    await enableMobileScreen(page);
    await page.goto('/');

    const hamburgerButton = getHamburgerIconBtn(page);

    await expect(hamburgerButton).toBeVisible();
  });
});

test.describe('sidebar should open when interacting with the hamburger icon', () => {
  test('click of the hamburger icon', async ({ page }) => {
    await enableMobileScreen(page);
    await page.goto('/');

    const hamburgerButton = getHamburgerIconBtn(page);

    const verticalNav = getVerticalNav(page);

    await expect(verticalNav).not.toBeVisible();
    await hamburgerButton.click();
    await expect(verticalNav).toBeVisible();
  });

  test('hit enter when hamburger icon is focused', async ({ page }) => {
    await enableMobileScreen(page);
    await page.goto('/');

    const hamburgerButton = getHamburgerIconBtn(page);
    const verticalNav = getVerticalNav(page);

    await expect(verticalNav).not.toBeVisible();
    await hamburgerButton.focus();
    await page.keyboard.press('Enter');
    await expect(verticalNav).toBeVisible();
  });
});

test(`vertical nav should span entire viewport`, async ({ page }) => {
  const viewportSize = await enableMobileScreen(page);
  await page.goto('/');

  // open vertical nav
  await getHamburgerIconBtn(page).click();

  const verticalNav = await getVerticalNav(page).boundingBox();

  expect(verticalNav).not.toBeNull();
  expect(verticalNav?.x).toBe(0);
  expect(verticalNav?.y).toBe(0);

  expect(Math.round(verticalNav?.width ?? 0)).toBe(viewportSize.width);
  expect(Math.round(verticalNav?.height ?? 0)).toBe(viewportSize.height);
});

test(`should close sidebar menu when "Escape" key is pressed`, async ({ page }) => {
  await openSideNavigation(page);

  const verticalNav = getVerticalNav(page);

  await expect(verticalNav.getByTitle(closeNavigationMenuTitle)).toBeVisible();

  await page.keyboard.press('Escape');

  await expect(verticalNav.getByTitle(closeNavigationMenuTitle)).not.toBeVisible();
});

test(`focus should be within side nav when it is shown`, async ({ page }) => {
  await openSideNavigation(page);

  const verticalNav = getVerticalNav(page);

  // focus should be on "Close icon button"
  await expect(verticalNav.getByTitle(closeNavigationMenuTitle)).toBeFocused();
});

test(`focus should be within side nav when we press the Tab key`, async ({ page }) => {
  await openSideNavigation(page);

  const verticalNav = getVerticalNav(page);

  // "Close icon button" is focused
  // Pressing tab should move focus to next item
  await page.keyboard.press('Tab');

  expect(await verticalNav.locator('*:focus').textContent()).toBe(' About me ');
});

// prettier-ignore
test(
  'should close sidebar menu when "Enter" key is pressed as Close button will be the first item to be focused', 
  async ({ page }) => {
    await openSideNavigation(page);

    const verticalNav = getVerticalNav(page);

    await page.keyboard.press('Enter');

    await expect(verticalNav.getByTitle(closeNavigationMenuTitle)).not.toBeVisible();
  }
);

// prettier-ignore
test(
  'should close sidebar menu when clicked on a link navigating to same page', 
  async ({ page }) => {
    await openSideNavigation(page);

    const verticalNav = getVerticalNav(page);

    await expect(verticalNav.getByTitle(closeNavigationMenuTitle)).toBeVisible();

    await verticalNav.getByText('about me').click();

    await expect(verticalNav.getByTitle(closeNavigationMenuTitle)).not.toBeVisible();
  }
);

// prettier-ignore
test(
  'should close sidebar menu when hit "Enter" on a focused link navigating to same page', 
  async ({ page }) => {
    await openSideNavigation(page);

    const verticalNav = getVerticalNav(page);

    await expect(verticalNav.getByTitle(closeNavigationMenuTitle)).toBeVisible();

    await verticalNav.locator('a', { hasText: 'About me' }).focus();
    await page.keyboard.press('Enter');

    await expect(verticalNav.getByTitle(closeNavigationMenuTitle)).not.toBeVisible();
  }
);

test('focus should loop around to when using "Tab" to navigate', async ({ page }) => {
  await openSideNavigation(page);

  const verticalNav = getVerticalNav(page);

  await verticalNav.locator('button', { hasText: 'Sign in' }).focus();
  expect(await verticalNav.locator('*:focus').textContent()).toBe('Sign in');

  await page.keyboard.press('Tab');

  await expect(verticalNav.getByTitle(closeNavigationMenuTitle)).toBeFocused();
});

test('focus should loop around backwards to when using "Shift + Tab" to navigate', async ({ page }) => {
  await openSideNavigation(page);

  const verticalNav = getVerticalNav(page);

  await expect(verticalNav.getByTitle(closeNavigationMenuTitle)).toBeFocused();

  await page.keyboard.press('Shift+Tab');

  expect(await verticalNav.locator('*:focus').textContent()).toBe('Sign in');
});
