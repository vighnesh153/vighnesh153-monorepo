import { OutputBuffer } from "@/models/OutputBuffer";

describe("check the functionality of output buffer.", () => {
  const outputBuffer: OutputBuffer = OutputBuffer.instance;
  beforeEach(() => {
    outputBuffer.flush();
  });

  test("should return empty string if no data is passed.", () => {
    const result = outputBuffer.getAndFlush();
    expect(result).toStrictEqual("");
  });

  test("should return single entry if inserted.", () => {
    outputBuffer.push("123");

    const result = outputBuffer.getAndFlush();
    expect(result).toStrictEqual("123");
  });

  test("should return joint string if multiple parts are inserted.", () => {
    outputBuffer.push("123\n");
    outputBuffer.push("Hello\n\n");

    const result = outputBuffer.getAndFlush();
    expect(result).toStrictEqual("123\nHello\n\n");
  });
});
