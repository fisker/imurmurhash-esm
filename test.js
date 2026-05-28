import test from "node:test";
import assert from "node:assert/strict";
import original from "imurmurhash";
import MurmurHash3 from "./index.js";

test("Cache", () => {
  for (const Implementation of [original, MurmurHash3]) {
    const cache = Implementation();
    // Should use cache when calling without `new`
    assert.equal(Implementation(), cache);
    // Should create a new instance when calling with `new`
    assert.notEqual(new Implementation(), cache);
  }
});

test("Examples from original repo", () => {
  // https://github.com/jensyt/imurmurhash-js/tree/master#quick-example

  const examples = [
    {
      run(MurmurHash3) {
        // Create the initial hash
        var hashState = MurmurHash3("string");

        // Incrementally add text
        hashState.hash("more strings");
        hashState.hash("even more strings");

        // All calls can be chained if desired
        hashState.hash("and").hash("some").hash("more");

        // Get a result
        return hashState.result();
        // returns 0xe4ccfe6b
      },
      expected: 0xe4ccfe6b,
    },
    // https://github.com/jensyt/imurmurhash-js/tree/master#murmurhash3prototyperesult-
    {
      run(MurmurHash3) {
        return MurmurHash3("this is a test string").result();
      },
      expected: 0x70529328,
    },
    {
      run(MurmurHash3) {
        // Do part of the string, get a result, then the other part
        var m = MurmurHash3("this is a");
        m.result();
        // 0xbfc4f834
        return m.hash(" test string").result();
        // 0x70529328 (same as above)
      },
      expected: 0x70529328,
    },
  ];

  for (const example of examples) {
    assert.equal(example.run(MurmurHash3), example.expected);
    assert.equal(example.run(original), example.expected);
  }
});

test("Should have same result", () => {
  // https://github.com/eslint/eslint/blob/d4ce898796ca22c3b96aa70d3014cb85f4bac1cd/lib/cli-engine/hash.js#L27
  // https://github.com/stylelint/stylelint/blob/5b6b024684b88f11a3bc84269722529e09bd4c16/lib/utils/hash.mjs#L8
  const hash = (MurmurHash3, string) =>
    MurmurHash3(string).result().toString(36);

  for (let index = 0; index < 10; index++) {
    const string = crypto.randomUUID();
    const expected = hash(original, string);
    assert.equal(hash(MurmurHash3, string), expected);
  }
});
