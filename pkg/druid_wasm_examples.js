
let wasm;

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachegetFloat64Memory0 = null;
function getFloat64Memory0() {
    if (cachegetFloat64Memory0 === null || cachegetFloat64Memory0.buffer !== wasm.memory.buffer) {
        cachegetFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachegetFloat64Memory0;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1 };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) wasm.__wbindgen_export_2.get(dtor)(a, state.b);
            else state.a = a;
        }
    };
    real.original = state;
    return real;
}
function __wbg_adapter_24(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h169441eb1c4aa90b(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_27(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h5029feedafe44769(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_30(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd9718959a43193d0(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_33(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h8aae7020d5004ed0(arg0, arg1);
}

function __wbg_adapter_36(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hc071e7879f0fa1f8(arg0, arg1, addHeapObject(arg2));
}

/**
*/
export function anim() {
    wasm.anim();
}

/**
*/
export function calc() {
    wasm.calc();
}

/**
*/
export function custom_widget() {
    wasm.custom_widget();
}

/**
*/
export function either() {
    wasm.either();
}

/**
*/
export function flex() {
    wasm.flex();
}

/**
*/
export function game_of_life() {
    wasm.game_of_life();
}

/**
*/
export function hello() {
    wasm.hello();
}

/**
*/
export function identity() {
    wasm.identity();
}

/**
*/
export function image() {
    wasm.image();
}

/**
*/
export function layout() {
    wasm.layout();
}

/**
*/
export function lens() {
    wasm.lens();
}

/**
*/
export function list() {
    wasm.list();
}

/**
*/
export function multiwin() {
    wasm.multiwin();
}

/**
*/
export function panels() {
    wasm.panels();
}

/**
*/
export function parse() {
    wasm.parse();
}

/**
*/
export function scroll_colors() {
    wasm.scroll_colors();
}

/**
*/
export function scroll() {
    wasm.scroll();
}

/**
*/
export function split_demo() {
    wasm.split_demo();
}

/**
*/
export function styled_text() {
    wasm.styled_text();
}

/**
*/
export function switch_demo() {
    wasm.switch_demo();
}

/**
*/
export function timer() {
    wasm.timer();
}

/**
*/
export function view_switcher() {
    wasm.view_switcher();
}

function handleError(e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
}

let cachegetUint8ClampedMemory0 = null;
function getUint8ClampedMemory0() {
    if (cachegetUint8ClampedMemory0 === null || cachegetUint8ClampedMemory0.buffer !== wasm.memory.buffer) {
        cachegetUint8ClampedMemory0 = new Uint8ClampedArray(wasm.memory.buffer);
    }
    return cachegetUint8ClampedMemory0;
}

function getClampedArrayU8FromWasm0(ptr, len) {
    return getUint8ClampedMemory0().subarray(ptr / 1, ptr / 1 + len);
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {

        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = import.meta.url.replace(/\.js$/, '_bg.wasm');
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_new_59cb74e423758ede = function() {
        var ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_558ba5917b466edd = function(arg0, arg1) {
        var ret = getObject(arg1).stack;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
        try {
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(arg0, arg1);
        }
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        var ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        var ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_cb_forget = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        var ret = false;
        return ret;
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        var ret = arg0;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_Window_04bba8b54ef81db0 = function(arg0) {
        var ret = getObject(arg0) instanceof Window;
        return ret;
    };
    imports.wbg.__wbg_document_f023a2b0d5b3d060 = function(arg0) {
        var ret = getObject(arg0).document;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_innerWidth_92ed193bd8aa828e = function(arg0) {
        try {
            var ret = getObject(arg0).innerWidth;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_innerHeight_1f092bd5c34f22b9 = function(arg0) {
        try {
            var ret = getObject(arg0).innerHeight;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_devicePixelRatio_482782a2b1b3af2a = function(arg0) {
        var ret = getObject(arg0).devicePixelRatio;
        return ret;
    };
    imports.wbg.__wbg_performance_9d639ac65758f7fe = function(arg0) {
        var ret = getObject(arg0).performance;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_requestAnimationFrame_c1ca5bf33b036c59 = function(arg0, arg1) {
        try {
            var ret = getObject(arg0).requestAnimationFrame(getObject(arg1));
            return ret;
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_setTimeout_d7917295f0291868 = function(arg0, arg1, arg2) {
        try {
            var ret = getObject(arg0).setTimeout(getObject(arg1), arg2);
            return ret;
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_createElement_d1b8191d1ca1103b = function(arg0, arg1, arg2) {
        try {
            var ret = getObject(arg0).createElement(getStringFromWasm0(arg1, arg2));
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_getElementById_87fd6611f51eaa51 = function(arg0, arg1, arg2) {
        var ret = getObject(arg0).getElementById(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_setProperty_e8b545c0ee776504 = function(arg0, arg1, arg2, arg3, arg4) {
        try {
            getObject(arg0).setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_addEventListener_540ca8a90a4cfd87 = function(arg0, arg1, arg2, arg3) {
        try {
            getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_now_0a117b544a88778f = function(arg0) {
        var ret = getObject(arg0).now();
        return ret;
    };
    imports.wbg.__wbg_newwithu8clampedarray_21105846b882f367 = function(arg0, arg1, arg2) {
        try {
            var ret = new ImageData(getClampedArrayU8FromWasm0(arg0, arg1), arg2 >>> 0);
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_deltaX_b3b42a728e833f8d = function(arg0) {
        var ret = getObject(arg0).deltaX;
        return ret;
    };
    imports.wbg.__wbg_deltaY_6016d9ae265ca8ea = function(arg0) {
        var ret = getObject(arg0).deltaY;
        return ret;
    };
    imports.wbg.__wbg_deltaMode_3716a5be08281a04 = function(arg0) {
        var ret = getObject(arg0).deltaMode;
        return ret;
    };
    imports.wbg.__wbg_instanceof_HtmlCanvasElement_69ef8df401e5d26d = function(arg0) {
        var ret = getObject(arg0) instanceof HTMLCanvasElement;
        return ret;
    };
    imports.wbg.__wbg_width_861b13f2c834e50c = function(arg0) {
        var ret = getObject(arg0).width;
        return ret;
    };
    imports.wbg.__wbg_width_c780f3aa15468362 = function(arg0, arg1) {
        getObject(arg0).width = arg1 >>> 0;
    };
    imports.wbg.__wbg_height_97296d57446b7c53 = function(arg0) {
        var ret = getObject(arg0).height;
        return ret;
    };
    imports.wbg.__wbg_height_ab2b0aa93160e434 = function(arg0, arg1) {
        getObject(arg0).height = arg1 >>> 0;
    };
    imports.wbg.__wbg_getContext_fc68e7f629e2b10a = function(arg0, arg1, arg2) {
        try {
            var ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_debug_421e3c50725477b1 = function(arg0) {
        console.debug(getObject(arg0));
    };
    imports.wbg.__wbg_error_7aac59d937b76b67 = function(arg0) {
        console.error(getObject(arg0));
    };
    imports.wbg.__wbg_info_1875274d2a59b192 = function(arg0) {
        console.info(getObject(arg0));
    };
    imports.wbg.__wbg_log_6a5797c4bb0f636c = function(arg0) {
        console.log(getObject(arg0));
    };
    imports.wbg.__wbg_warn_2325c63ec9c0319d = function(arg0) {
        console.warn(getObject(arg0));
    };
    imports.wbg.__wbg_title_39ac1ca7698713f2 = function(arg0, arg1, arg2) {
        getObject(arg0).title = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_style_64324d69bc0556a8 = function(arg0) {
        var ret = getObject(arg0).style;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_offsetWidth_4a4930e8c3b517d1 = function(arg0) {
        var ret = getObject(arg0).offsetWidth;
        return ret;
    };
    imports.wbg.__wbg_offsetHeight_68ce277ca6f89e6e = function(arg0) {
        var ret = getObject(arg0).offsetHeight;
        return ret;
    };
    imports.wbg.__wbg_instanceof_CanvasRenderingContext2d_a3cc87f343a7e4b9 = function(arg0) {
        var ret = getObject(arg0) instanceof CanvasRenderingContext2D;
        return ret;
    };
    imports.wbg.__wbg_canvas_95b2e58999441abe = function(arg0) {
        var ret = getObject(arg0).canvas;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_strokeStyle_289f9407fe55bd14 = function(arg0, arg1) {
        getObject(arg0).strokeStyle = getObject(arg1);
    };
    imports.wbg.__wbg_fillStyle_d72ab49007d815ac = function(arg0, arg1) {
        getObject(arg0).fillStyle = getObject(arg1);
    };
    imports.wbg.__wbg_lineWidth_a26616854c39e5e6 = function(arg0, arg1) {
        getObject(arg0).lineWidth = arg1;
    };
    imports.wbg.__wbg_lineCap_7598e667172d08b7 = function(arg0, arg1, arg2) {
        getObject(arg0).lineCap = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_lineJoin_ce2ab50b0f45dff4 = function(arg0, arg1, arg2) {
        getObject(arg0).lineJoin = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_miterLimit_f0fc32234b27e00a = function(arg0, arg1) {
        getObject(arg0).miterLimit = arg1;
    };
    imports.wbg.__wbg_lineDashOffset_978b9fa6dc6d1678 = function(arg0, arg1) {
        getObject(arg0).lineDashOffset = arg1;
    };
    imports.wbg.__wbg_font_166fb4da12864962 = function(arg0, arg1, arg2) {
        getObject(arg0).font = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_drawImage_88f48c6159bf13d1 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        try {
            getObject(arg0).drawImage(getObject(arg1), arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_beginPath_06a3bee6af57dd8d = function(arg0) {
        getObject(arg0).beginPath();
    };
    imports.wbg.__wbg_clip_2ea2b9fe4bb2a1b5 = function(arg0, arg1) {
        getObject(arg0).clip(takeObject(arg1));
    };
    imports.wbg.__wbg_fill_40397525683db153 = function(arg0, arg1) {
        getObject(arg0).fill(takeObject(arg1));
    };
    imports.wbg.__wbg_stroke_f2e62ebca12793e8 = function(arg0) {
        getObject(arg0).stroke();
    };
    imports.wbg.__wbg_createLinearGradient_2186bfb36965275b = function(arg0, arg1, arg2, arg3, arg4) {
        var ret = getObject(arg0).createLinearGradient(arg1, arg2, arg3, arg4);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_createRadialGradient_069632a5994d5f82 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        try {
            var ret = getObject(arg0).createRadialGradient(arg1, arg2, arg3, arg4, arg5, arg6);
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_putImageData_35f77f1ba86bcdfc = function(arg0, arg1, arg2, arg3) {
        try {
            getObject(arg0).putImageData(getObject(arg1), arg2, arg3);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_setLineDash_f123a74903afe88f = function(arg0, arg1) {
        try {
            getObject(arg0).setLineDash(getObject(arg1));
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_bezierCurveTo_1343dd13a5d20cfd = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        getObject(arg0).bezierCurveTo(arg1, arg2, arg3, arg4, arg5, arg6);
    };
    imports.wbg.__wbg_closePath_1ee39032ab960e12 = function(arg0) {
        getObject(arg0).closePath();
    };
    imports.wbg.__wbg_lineTo_72f7b15f12007abe = function(arg0, arg1, arg2) {
        getObject(arg0).lineTo(arg1, arg2);
    };
    imports.wbg.__wbg_moveTo_218a2b604aa328ea = function(arg0, arg1, arg2) {
        getObject(arg0).moveTo(arg1, arg2);
    };
    imports.wbg.__wbg_quadraticCurveTo_6bd7fc5d3ab34fa8 = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).quadraticCurveTo(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_clearRect_646bffbb36d79077 = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).clearRect(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_restore_ab138a82f4cf2425 = function(arg0) {
        getObject(arg0).restore();
    };
    imports.wbg.__wbg_save_23abe31b0333d310 = function(arg0) {
        getObject(arg0).save();
    };
    imports.wbg.__wbg_fillText_4b1f4a60dad97732 = function(arg0, arg1, arg2, arg3, arg4) {
        try {
            getObject(arg0).fillText(getStringFromWasm0(arg1, arg2), arg3, arg4);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_measureText_2ef1e851080a1b84 = function(arg0, arg1, arg2) {
        try {
            var ret = getObject(arg0).measureText(getStringFromWasm0(arg1, arg2));
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_scale_d7dd215abdbe55aa = function(arg0, arg1, arg2) {
        try {
            getObject(arg0).scale(arg1, arg2);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_transform_054c1cf946d0fff1 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        try {
            getObject(arg0).transform(arg1, arg2, arg3, arg4, arg5, arg6);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_offsetX_e065bffb691fac77 = function(arg0) {
        var ret = getObject(arg0).offsetX;
        return ret;
    };
    imports.wbg.__wbg_offsetY_713eb77eafd4a540 = function(arg0) {
        var ret = getObject(arg0).offsetY;
        return ret;
    };
    imports.wbg.__wbg_ctrlKey_71d0e9186ddb3aab = function(arg0) {
        var ret = getObject(arg0).ctrlKey;
        return ret;
    };
    imports.wbg.__wbg_shiftKey_639f3d59212c0d6b = function(arg0) {
        var ret = getObject(arg0).shiftKey;
        return ret;
    };
    imports.wbg.__wbg_altKey_01838d3dfde5ce4f = function(arg0) {
        var ret = getObject(arg0).altKey;
        return ret;
    };
    imports.wbg.__wbg_metaKey_87987bf14723a07b = function(arg0) {
        var ret = getObject(arg0).metaKey;
        return ret;
    };
    imports.wbg.__wbg_button_0d89a25de78f5529 = function(arg0) {
        var ret = getObject(arg0).button;
        return ret;
    };
    imports.wbg.__wbg_keyCode_a0e5ee0b5942b9d7 = function(arg0) {
        var ret = getObject(arg0).keyCode;
        return ret;
    };
    imports.wbg.__wbg_altKey_724d749667c118d5 = function(arg0) {
        var ret = getObject(arg0).altKey;
        return ret;
    };
    imports.wbg.__wbg_ctrlKey_c7cf650d0fbadff3 = function(arg0) {
        var ret = getObject(arg0).ctrlKey;
        return ret;
    };
    imports.wbg.__wbg_shiftKey_8a72435d96120554 = function(arg0) {
        var ret = getObject(arg0).shiftKey;
        return ret;
    };
    imports.wbg.__wbg_metaKey_b57c92714ddbd021 = function(arg0) {
        var ret = getObject(arg0).metaKey;
        return ret;
    };
    imports.wbg.__wbg_location_3a22a7bb8792f488 = function(arg0) {
        var ret = getObject(arg0).location;
        return ret;
    };
    imports.wbg.__wbg_repeat_62f9eb7cf4a38b44 = function(arg0) {
        var ret = getObject(arg0).repeat;
        return ret;
    };
    imports.wbg.__wbg_key_7bc040dd03933553 = function(arg0, arg1) {
        var ret = getObject(arg1).key;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_addColorStop_ca340ecf213c22e9 = function(arg0, arg1, arg2, arg3) {
        try {
            getObject(arg0).addColorStop(arg1, getStringFromWasm0(arg2, arg3));
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_width_76fb79c76458df0c = function(arg0) {
        var ret = getObject(arg0).width;
        return ret;
    };
    imports.wbg.__wbg_newnoargs_4f6527054d7f1f1d = function(arg0, arg1) {
        var ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_183c0b733b35a027 = function(arg0, arg1) {
        try {
            var ret = getObject(arg0).call(getObject(arg1));
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_globalThis_eb9027a878db64ad = function() {
        try {
            var ret = globalThis.globalThis;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_self_69a78003cf074413 = function() {
        try {
            var ret = self.self;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_window_db757fdea9443777 = function() {
        try {
            var ret = window.window;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_global_8efdae4f126ac8b4 = function() {
        try {
            var ret = global.global;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        var ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_newwithlength_04d902d5475117e1 = function(arg0) {
        var ret = new Float64Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_a6eff7b20941127b = function(arg0, arg1, arg2) {
        try {
            var ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
            return ret;
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        var ret = typeof(obj) === 'number' ? obj : undefined;
        getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        var ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        var ret = debugString(getObject(arg1));
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_closure_wrapper9918 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 2802, __wbg_adapter_27);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper9912 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 2806, __wbg_adapter_36);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper9920 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 2800, __wbg_adapter_33);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper9916 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 2804, __wbg_adapter_24);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper9914 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 2808, __wbg_adapter_30);
        return addHeapObject(ret);
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;

    return wasm;
}

export default init;

