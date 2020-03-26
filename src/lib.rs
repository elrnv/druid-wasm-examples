use wasm_bindgen::prelude::*;

mod examples;

cfg_if::cfg_if! {
    if #[cfg(feature = "console_log")] {
        pub fn init_log() {
            use log::Level;
            console_log::init_with_level(Level::Trace).expect("error initializing log");
        }
    } else {
        pub fn init_log() {}
    }
}

macro_rules! impl_example {
    ($fn:ident) => {
        #[wasm_bindgen]
        pub fn $fn() {
            #[cfg(feature = "console_error_panic_hook")]
            std::panic::set_hook(Box::new(console_error_panic_hook::hook));
            init_log();
            examples::$fn::main();
        }
    }
}

impl_example!(anim);
impl_example!(calc);
impl_example!(custom_widget);
impl_example!(either);
//impl_example!(ext_event); // No thread support on wasm
impl_example!(flex);
impl_example!(game_of_life);
impl_example!(hello);
impl_example!(identity);
impl_example!(image); // Can't load an image from a local file
impl_example!(layout);
impl_example!(lens);
impl_example!(list);
impl_example!(multiwin);
impl_example!(panels);
impl_example!(parse);
impl_example!(scroll_colors);
impl_example!(scroll);
impl_example!(split_demo);
impl_example!(styled_text);
//impl_example!(svg); // usvg doesn't compile on usvg at the time of this writing
impl_example!(switch_demo);
impl_example!(timer);
impl_example!(view_switcher);
