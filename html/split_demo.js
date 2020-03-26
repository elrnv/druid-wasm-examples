const rust = import('../pkg/druid_wasm_examples');

rust
  .then(m => m.split_demo())
  .catch(console.error);
