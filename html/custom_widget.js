import init, { custom_widget } from '../pkg/druid_wasm_examples.js';

async function run() {
    await init();
    custom_widget();
}

run();
