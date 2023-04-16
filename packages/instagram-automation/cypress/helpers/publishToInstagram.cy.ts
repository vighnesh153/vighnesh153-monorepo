function millis(fromSeconds: number): number {
  return fromSeconds * 1000;
}

export interface PublishToInstagramProps {
  timeout?: number;
  username: string;
  password: string;
  filePath: string;
  caption: string;
}

export function publishToInstagram(props: PublishToInstagramProps): void {
  // eslint-disable-next-line consistent-return
  cy.on('uncaught:exception', (err) => {
    if (err.message.includes('user agent does not support public key credentials')) {
      // don't fail the test
      return false;
    }
  });

  const { timeout = millis(20), username, password, filePath, caption } = props;

  cy.visit('https://www.instagram.com');

  // Click on login button
  cy.get('button:contains("Log In")', { timeout }).click();

  // Enter credentials
  cy.get('input[name="username"]', { timeout }).type(username);
  cy.get('input[name="password"]', { timeout }).type(password);

  // submit
  cy.get('button[type="submit"]', { timeout }).click();

  // create new post
  cy.get('svg[aria-label="New post"]', { timeout }).click();

  // open image selector
  cy.get('button:contains("Select from computer")', { timeout }).click();

  // select file
  cy.get('input[type=file]', { timeout }).selectFile(filePath, { force: true });

  // image uploaded. go to next
  cy.get('[role="button"]:contains("Next")', { timeout }).click();

  cy.wait(millis(3));

  // don't apply any filters
  cy.get('[role="button"]:contains("Next")').click();

  cy.wait(millis(3));

  // set the caption
  cy.get('[role="textbox"]').type(caption);

  // publish
  cy.get('[role="button"]:contains("Share")', { timeout }).click();

  // wait for some time for the post to be published
  cy.wait(10000);

  // close the popup
  cy.get('[role="button"] [aria-label="Close"]', { timeout }).click();

  cy.wait(3000);

  // Open the menu
  cy.get('svg[aria-label="Settings"]').click();

  cy.wait(3000);

  // Click the "Log out" button
  cy.get('[role="button"]:contains("Log out")').click();

  // wait for log out
  cy.wait(5000);
}
