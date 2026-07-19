import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_GATE,
  IMPLEMENTATION_AUTHORIZED
} from "../src/index.js";

test("Cin-Gen begins SAFE with implementation gated", () => {
  assert.equal(DEFAULT_GATE, "SAFE");
  assert.equal(IMPLEMENTATION_AUTHORIZED, false);
});
