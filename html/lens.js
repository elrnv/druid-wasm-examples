import init, { lens } from '../pkg/druid_wasm_examples.js';

async function run() {
    await init();
    lens();
}

run();
