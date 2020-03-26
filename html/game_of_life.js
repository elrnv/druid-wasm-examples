import init, { game_of_life } from '../pkg/druid_wasm_examples.js';

async function run() {
    await init();
    game_of_life();
}

run();
