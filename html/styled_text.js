const rust = import('../pkg/druid_wasm_examples');

rust
  .then(m => m.styled_text())
  .catch(console.error);
