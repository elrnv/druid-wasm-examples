const rust = import('../pkg/druid_wasm_examples');

rust
  .then(m => m.hello())
  .catch(console.error);
