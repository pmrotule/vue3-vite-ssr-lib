import "./HelloWorld.css";
import { ref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderClass } from "vue/server-renderer";
import MyButton, { _ as _export_sfc } from "./MyButton.mjs";
const readTheDocs = "_readTheDocs_w6q3k_1";
const style0 = {
  readTheDocs
};
const _sfc_main = {
  __name: "HelloWorld",
  __ssrInlineRender: true,
  props: {
    msg: String
  },
  setup(__props) {
    const count = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h1>${ssrInterpolate(__props.msg)}</h1><div class="card">`);
      _push(ssrRenderComponent(MyButton, {
        onClick: ($event) => count.value++
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`count is ${ssrInterpolate(count.value)}`);
          } else {
            return [
              createTextVNode("count is " + toDisplayString(count.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p> Edit <code>components/HelloWorld.vue</code> to test HMR </p></div><p> Check out <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite starter </p><p> Install <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a> in your IDE for a better DX </p><p class="${ssrRenderClass(_ctx.style.readTheDocs)}">Click on the Vite and Vue logos to learn more</p><!--]-->`);
    };
  }
};
const cssModules = {
  "style": style0
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/HelloWorld.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HelloWorld = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  HelloWorld as default
};
