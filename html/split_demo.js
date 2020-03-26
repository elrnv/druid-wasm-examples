import init, { split_demo } from '../pkg/druid_wasm_examples.js';

async function run() {
    await init();
    split_demo();
}

run();
