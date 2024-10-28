// @ts-ignore
import { UseKeyPressKey } from "@vighnesh153/react-hooks";

// Keycode mapping found on this link
// https://topic.alibabacloud.com/a/adb-shell-input-keyevent-code-explanation_1_28_30094397.html
export const webKeyToAndroidKey: Partial<Record<UseKeyPressKey, string>> = {
  ArrowDown: "DPAD_DOWN",
  ArrowUp: "DPAD_UP",
  ArrowLeft: "DPAD_LEFT",
  ArrowRight: "DPAD_RIGHT",
  Enter: "DPAD_CENTER",
  Backspace: "KEYCODE_DEL",
  "+": "KEYCODE_PLUS",
  "-": "KEYCODE_MINUS",
  "*": "KEYCODE_STAR",
  "/": "KEYCODE_SLASH",
  "\\": "KEYCODE_BACKSLASH",
  "=": "KEYCODE_EQUALS",
  "@": "KEYCODE_AT",
  "#": "KEYCODE_POUND",
  ",": "KEYCODE_COMMA",
  ".": "KEYCODE_PERIOD",
  "[": "KEYCODE_LEFT_BRACKET",
  "]": "KEYCODE_RIGHT_BRACKET",
  " ": "KEYCODE_SPACE",
  "0": "KEYCODE_0",
  "1": "KEYCODE_1",
  "2": "KEYCODE_2",
  "3": "KEYCODE_3",
  "4": "KEYCODE_4",
  "5": "KEYCODE_5",
  "6": "KEYCODE_6",
  "7": "KEYCODE_7",
  "8": "KEYCODE_8",
  "9": "KEYCODE_9",
  a: "KEYCODE_A",
  b: "KEYCODE_B",
  c: "KEYCODE_C",
  d: "KEYCODE_D",
  e: "KEYCODE_E",
  f: "KEYCODE_F",
  g: "KEYCODE_G",
  h: "KEYCODE_H",
  i: "KEYCODE_I",
  j: "KEYCODE_J",
  k: "KEYCODE_K",
  l: "KEYCODE_L",
  m: "KEYCODE_M",
  n: "KEYCODE_N",
  o: "KEYCODE_O",
  p: "KEYCODE_P",
  q: "KEYCODE_Q",
  r: "KEYCODE_R",
  s: "KEYCODE_S",
  t: "KEYCODE_T",
  u: "KEYCODE_U",
  v: "KEYCODE_V",
  w: "KEYCODE_W",
  x: "KEYCODE_X",
  y: "KEYCODE_Y",
  z: "KEYCODE_Z",
};