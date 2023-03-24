function millis(fromSeconds: number): number {
  return fromSeconds * 1000;
}

export interface PublishToInstagramProps {
  timeout?: number;
  username: string;
  password: string;
  filePath: string;
}

export function publishToInstagram(props: PublishToInstagramProps): void {
  const { timeout = millis(20), username, password, filePath } = props;

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
  cy.get('button:contains("Next")', { timeout }).click();

  cy.wait(millis(3));

  // don't apply any filters
  cy.get('button:contains("Next")').click();

  cy.wait(millis(3));

  // set the caption
  cy.get('[role="textbox"]').type('My caption');

  // publish
  cy.get('button:contains("Share")', { timeout }).click();

  // wait for some time for the post to be published
  cy.wait(10000);
}
