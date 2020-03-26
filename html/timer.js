import init, { timer } from '../pkg/druid_wasm_examples.js';

async function run() {
    await init();
    timer();
}

run();
