import init, { scroll } from '../pkg/druid_wasm_examples.js';

async function run() {
    await init();
    scroll();
}

run();
