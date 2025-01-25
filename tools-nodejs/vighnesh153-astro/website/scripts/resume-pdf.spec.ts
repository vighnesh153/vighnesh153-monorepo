import { test } from "@playwright/test";

test("Generate PDF of Resume", async ({ page, browser }) => {
  await page.goto("/resume");

  await page.pdf({
    path: `./public/${await page.title()}.pdf`,
    displayHeaderFooter: false,
    landscape: false,
    printBackground: true,
    format: "A4",
    tagged: true,
    margin: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  });
});
