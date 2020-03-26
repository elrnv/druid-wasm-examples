import init, { switch_demo } from '../pkg/druid_wasm_examples.js';

async function run() {
    await init();
    switch_demo();
}

run();
