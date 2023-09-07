import "./HelloWorld.css";
import { _ as n, r as c, o as u, c as d, a as e, t as a, b as i, w as _, M as h, n as p, F as m, d as t } from "./MyButton-02c8503b.mjs";
const f = "_readTheDocs_w6q3k_1", g = {
  readTheDocs: f
}, k = { class: "card" }, v = /* @__PURE__ */ e("p", null, [
  /* @__PURE__ */ t(" Edit "),
  /* @__PURE__ */ e("code", null, "components/HelloWorld.vue"),
  /* @__PURE__ */ t(" to test HMR ")
], -1), V = /* @__PURE__ */ e("p", null, [
  /* @__PURE__ */ t(" Check out "),
  /* @__PURE__ */ e("a", {
    href: "https://vuejs.org/guide/quick-start.html#local",
    target: "_blank"
  }, "create-vue"),
  /* @__PURE__ */ t(", the official Vue + Vite starter ")
], -1), D = /* @__PURE__ */ e("p", null, [
  /* @__PURE__ */ t(" Install "),
  /* @__PURE__ */ e("a", {
    href: "https://github.com/johnsoncodehk/volar",
    target: "_blank"
  }, "Volar"),
  /* @__PURE__ */ t(" in your IDE for a better DX ")
], -1), y = {
  __name: "HelloWorld",
  props: {
    msg: String
  },
  setup(l) {
    const o = c(0);
    return (r, s) => (u(), d(m, null, [
      e("h1", null, a(l.msg), 1),
      e("div", k, [
        i(h, {
          onClick: s[0] || (s[0] = (C) => o.value++)
        }, {
          default: _(() => [
            t("count is " + a(o.value), 1)
          ]),
          _: 1
        }),
        v
      ]),
      V,
      D,
      e("p", {
        class: p(r.style.readTheDocs)
      }, "Click on the Vite and Vue logos to learn more", 2)
    ], 64));
  }
}, b = {
  style: g
}, x = /* @__PURE__ */ n(y, [["__cssModules", b]]);
export {
  x as default
};
