import init, { styled_text } from '../pkg/druid_wasm_examples.js';

async function run() {
    await init();
    styled_text();
}

run();
