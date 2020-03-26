const rust = import('../pkg/druid_wasm_examples');

rust
  .then(m => m.parse())
  .catch(console.error);
