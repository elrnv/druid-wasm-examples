import init, { calc } from '../pkg/druid_wasm_examples.js';

async function run() {
    await init();
    calc();
}

run();
