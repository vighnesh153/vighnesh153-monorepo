import { not } from "@vighnesh153/tools";
import { Disc } from "./Disc.ts";
import { Position } from "./Position.ts";
import { Stack } from "./Stack.ts";

function withinThreshold(diff: number, threshold: number): boolean {
  return Math.abs(diff) <= threshold;
}

function* moveDiscTo(disc: Disc, position: Position, speed: number) {
  while (not(withinThreshold(disc.center.x - position.x, speed))) {
    disc.center = {
      ...disc.center,
      x: disc.center.x + (disc.center.x < position.x ? speed : -speed),
    };
    yield;
  }
  disc.center = {
    ...disc.center,
    x: position.x,
  };
  yield;

  while (not(withinThreshold(disc.center.y - position.y, speed))) {
    disc.center = {
      ...disc.center,
      y: disc.center.y + (disc.center.y < position.y ? speed : -speed),
    };
    yield;
  }
  disc.center = {
    ...disc.center,
    y: position.y,
  };
  yield;
}

interface Props {
  disc: Disc;
  src: Stack;
  dest: Stack;
  ceilingGap: number;
  speed: number;
  beforeYield?: () => void;
}

export function* animateDiscMovement(props: Props) {
  const { disc, src, dest, ceilingGap, speed, beforeYield = () => null } =
    props;
  const finalPos = dest.getPositionForNewDisc();

  const positions: Position[] = [
    disc.center,
    { x: disc.center.x, y: src.topY - ceilingGap },
    { x: finalPos.x, y: dest.topY - ceilingGap },
    {
      ...finalPos,
      y: finalPos.y - disc.thickness / 2,
    },
  ];

  for (const position of positions) {
    for (const frame of moveDiscTo(disc, position, speed)) {
      beforeYield();
      yield frame;
    }
  }
}
