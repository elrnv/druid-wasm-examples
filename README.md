# Druid examples in WASM

This repository collects most of the Druid examples and arranges them (with very slight
modifications) for building with `wasm-pack` and serving with `npm`.

To get started first check out the [rust wasm
tutorial](https://rustwasm.github.io/docs/book/game-of-life/introduction.html).

# Building

After following the tutorial, it is assumed that you have all the required tools and libraries set
up on your system (`cargo`, `wasm-pack`, `npm`).

First build the examples with

```
> wasm-pack build
```

Then go to the `html` directory and run

```
> npm install
> npm run serve
```

which should start a server with our examples served in individual html documents.

Finally point your browser to the appropriate localhost url (usually http://localhost:8080) and you
should see a page with a list of links, one for each example.

# Status

Examples that are known to be working (on par with native) are marked below.

 [x] anim
 [x] calc
 [x] custom_widget
 [x] either
 [ ] ext_event (No thread support on wasm)
 [x] flex
 [x] game_of_life
 [x] hello
 [x] identity
 [ ] image (Can't load an image from a local file)
 [x] layout
 [x] lens
 [x] list
 [x] multiwin
 [x] panels
 [x] parse
 [x] scroll_colors
 [x] scroll
 [x] split_demo
 [x] styled_text
 [ ] svg (usvg doesn't compile on usvg at the time of this writing)
 [x] switch_demo
 [x] timer
 [x] view_switcher

# Acknowledgements

The examples (files in the `examples` module) in this repository are taken (mostly unmodified) from
the [`druid`](https://github.com/xi-editor/druid) library, so all credit goes to the `druid` developers.
