import { assertSpyCallArgs, assertSpyCalls, stub } from "@std/testing/mock";
import { Notification } from "./notification.ts";
import { sleep } from "./sleep.ts";

Deno.test("notification should publish the data to the subscriber", async () => {
  const notification = new Notification<number>();
  const mockFn = stub({ func() {} } as const, "func");

  notification.subscribe(mockFn);
  notification.publish(123);

  await sleep(10);

  assertSpyCalls(mockFn, 1);
  assertSpyCallArgs(mockFn, 0, [123]);
});

Deno.test("notification should publish data to all subscribers", async () => {
  const notification = new Notification<number>();
  const mockFn1 = stub({ func() {} } as const, "func");
  const mockFn2 = stub({ func() {} } as const, "func");
  const mockFn3 = stub({ func() {} } as const, "func");

  notification.subscribe(mockFn1);
  notification.subscribe(mockFn2);
  notification.subscribe(mockFn3);
  notification.publish(123);

  await sleep(10);

  assertSpyCalls(mockFn1, 1);
  assertSpyCallArgs(mockFn1, 0, [123]);

  assertSpyCalls(mockFn2, 1);
  assertSpyCallArgs(mockFn2, 0, [123]);

  assertSpyCalls(mockFn3, 1);
  assertSpyCallArgs(mockFn3, 0, [123]);
});

Deno.test("notification should only publish data to active subscribers", async () => {
  const notification = new Notification<number>();
  const mockFn1 = stub({ func() {} } as const, "func");
  const mockFn2 = stub({ func() {} } as const, "func");
  const mockFn3 = stub({ func() {} } as const, "func");

  notification.subscribe(mockFn1);
  const { unsubscribe: unsubscribe2 } = notification.subscribe(mockFn2);
  notification.subscribe(mockFn3);

  unsubscribe2();

  notification.publish(123);

  await sleep(10);

  assertSpyCalls(mockFn1, 1);
  assertSpyCallArgs(mockFn1, 0, [123]);

  assertSpyCalls(mockFn2, 0);

  assertSpyCalls(mockFn3, 1);
  assertSpyCallArgs(mockFn3, 0, [123]);
});

Deno.test("should invoke the subscription function with the latest data", async () => {
  const notification = new Notification<number>({ notifyOnSubscribe: true });
  const mockFn1 = stub({ func() {} } as const, "func");
  const mockFn2 = stub({ func() {} } as const, "func");

  notification.subscribe(mockFn1);

  // No data published as of now
  assertSpyCalls(mockFn1, 0);

  notification.publish(123);
  await sleep(10);

  // data published once
  assertSpyCalls(mockFn1, 1);
  assertSpyCallArgs(mockFn1, 0, [123]);

  notification.subscribe(mockFn2);

  // invoked with most recently published data
  assertSpyCalls(mockFn1, 1);
  assertSpyCallArgs(mockFn2, 0, [123]);
});
