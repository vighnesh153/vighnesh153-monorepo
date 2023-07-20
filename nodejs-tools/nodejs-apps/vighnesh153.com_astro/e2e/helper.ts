import type { Page } from '@playwright/test';

export async function enableMobileScreen(page: Page): Promise<{ width: number; height: number }> {
  const viewportSize = { width: 412, height: 915 };
  await page.setViewportSize(viewportSize);
  return viewportSize;
}
