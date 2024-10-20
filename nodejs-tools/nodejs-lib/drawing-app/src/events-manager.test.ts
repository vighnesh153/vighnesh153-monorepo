import { Queue } from "@vighnesh153/tools";
import { Color } from "./colors.ts";
import { buildClearScreenEvent, buildCommitEvent } from "./events.ts";
import {
  buildEventsManager,
  isRedoAvailable,
  isUndoAvailable,
  publishEvents,
  redo,
  undo,
} from "./events-manager.ts";

describe("events manager tests", () => {
  it("should publish the events", () => {
    // arrange
    const eventsManager = buildEventsManager();

    // act
    publishEvents(eventsManager, [
      buildClearScreenEvent({ color: Color.Black }),
      buildClearScreenEvent({ color: Color.Red }),
      buildClearScreenEvent({ color: Color.Green }),
    ]);

    // assert
    expect(eventsManager.undoEventsStack.size).toBe(3);
    expect(eventsManager.pendingQueue.size).toBe(3);
    expect(eventsManager.redoEventsStack.size).toBe(0);
  });

  it("should return false if undo is not possible", () => {
    // arrange
    const eventsManager = buildEventsManager();

    // act
    const result = isUndoAvailable(eventsManager);

    // assert
    expect(result).toBe(false);
  });

  it("should return true if undo is possible", () => {
    // arrange
    const eventsManager = buildEventsManager();
    publishEvents(eventsManager, [
      buildClearScreenEvent({ color: Color.Black }),
    ]);

    // act
    const result = isUndoAvailable(eventsManager);

    // assert
    expect(result).toBe(true);
  });

  it("should do the undo operation for 1 commit", () => {
    // arrange
    const eventsManager = buildEventsManager();
    const events = [
      buildClearScreenEvent({ color: Color.Black }),
      buildClearScreenEvent({ color: Color.SkyBlue }),
      buildClearScreenEvent({ color: Color.Green }),
      buildCommitEvent(),
    ];
    publishEvents(eventsManager, events);

    // act
    undo(eventsManager);

    // assert
    expect(eventsManager.undoEventsStack.size).toBe(0);
    expect(eventsManager.pendingQueue.size).toBe(1); // 1 is the clear slate event
    // prettier-ignore
    expect(eventsManager.redoEventsStack.toArray()).toStrictEqual([
      events[3],
      events[2],
      events[1],
      events[0],
    ]);
  });

  it("should do the undo operation for multiple commits", () => {
    // arrange
    const eventsManager = buildEventsManager();
    const events = [
      buildClearScreenEvent({ color: Color.Black }),
      buildClearScreenEvent({ color: Color.SkyBlue }),
      buildClearScreenEvent({ color: Color.Green }),
      buildCommitEvent(),
      buildClearScreenEvent({ color: Color.Green }),
      buildClearScreenEvent({ color: Color.Yellow }),
      buildClearScreenEvent({ color: Color.DarkRed }),
      buildCommitEvent(),
    ];
    publishEvents(eventsManager, events);

    // act
    undo(eventsManager);

    // assert
    expect(eventsManager.pendingQueue.size).toBe(4 + 1); // 1 is the clear slate event
    // prettier-ignore
    expect(eventsManager.undoEventsStack.toArray()).toStrictEqual([
      events[0],
      events[1],
      events[2],
      events[3],
    ]);
    // prettier-ignore
    expect(eventsManager.redoEventsStack.toArray()).toStrictEqual([
      events[7],
      events[6],
      events[5],
      events[4],
    ]);
  });

  it("should return false if redo is not possible", () => {
    // arrange
    const eventsManager = buildEventsManager();

    // act
    const result = isRedoAvailable(eventsManager);

    // assert
    expect(result).toBe(false);
  });

  it("should return true if redo is possible", () => {
    // arrange
    const eventsManager = buildEventsManager();
    publishEvents(eventsManager, [
      buildClearScreenEvent({ color: Color.Black }),
    ]);
    undo(eventsManager);

    // act
    const result = isRedoAvailable(eventsManager);

    // assert
    expect(result).toBe(true);
  });

  it("should do the redo operation for 1 commit", () => {
    // arrange
    const eventsManager = buildEventsManager();
    const events = [
      buildClearScreenEvent({ color: Color.Black }),
      buildClearScreenEvent({ color: Color.SkyBlue }),
      buildClearScreenEvent({ color: Color.Green }),
      buildCommitEvent(),
    ];
    publishEvents(eventsManager, events);
    undo(eventsManager);

    // act
    redo(eventsManager);

    // assert
    // prettier-ignore
    expect(eventsManager.undoEventsStack.toArray()).toStrictEqual([
      events[0],
      events[1],
      events[2],
      events[3],
    ]);
    // prettier-ignore
    expect(eventsManager.pendingQueue.toArray().slice(1)).toStrictEqual([
      events[0],
      events[1],
      events[2],
    ]);
    expect(eventsManager.redoEventsStack.size).toBe(0);
  });

  it("should do the redo operation for multiple commits", () => {
    // arrange
    const eventsManager = buildEventsManager();
    const events = [
      buildClearScreenEvent({ color: Color.Black }),
      buildClearScreenEvent({ color: Color.SkyBlue }),
      buildClearScreenEvent({ color: Color.Green }),
      buildCommitEvent(),
      buildClearScreenEvent({ color: Color.Green }),
      buildClearScreenEvent({ color: Color.Yellow }),
      buildClearScreenEvent({ color: Color.DarkRed }),
      buildCommitEvent(),
    ];
    publishEvents(eventsManager, events);
    undo(eventsManager);
    eventsManager.pendingQueue = new Queue();

    // act
    redo(eventsManager);

    // assert
    // prettier-ignore
    expect(eventsManager.pendingQueue.toArray()).toStrictEqual([
      events[4],
      events[5],
      events[6],
    ]);
    expect(eventsManager.undoEventsStack.toArray()).toStrictEqual(events);
    expect(eventsManager.redoEventsStack.size).toBe(0);
  });
});
