import init, { image } from '../pkg/druid_wasm_examples.js';

async function run() {
    await init();
    image();
}

run();
