import "./MyButton.css";
function un(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let r = 0; r < s.length; r++)
    n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const P = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, an = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], Et = () => {
}, fn = /^on[^a-z]/, pn = (e) => fn.test(e), D = Object.assign, dn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, hn = Object.prototype.hasOwnProperty, m = (e, t) => hn.call(e, t), h = Array.isArray, U = (e) => ye(e) === "[object Map]", wt = (e) => ye(e) === "[object Set]", N = (e) => typeof e == "function", v = (e) => typeof e == "string", Ke = (e) => typeof e == "symbol", w = (e) => e !== null && typeof e == "object", _n = (e) => w(e) && N(e.then) && N(e.catch), Nt = Object.prototype.toString, ye = (e) => Nt.call(e), bt = (e) => ye(e).slice(8, -1), Ot = (e) => ye(e) === "[object Object]", He = (e) => v(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, gn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, mn = gn(
  (e) => e.charAt(0).toUpperCase() + e.slice(1)
), se = (e, t) => !Object.is(e, t), En = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
};
let ke;
const Ce = () => ke || (ke = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function We(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = v(s) ? On(s) : We(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else {
    if (v(e))
      return e;
    if (w(e))
      return e;
  }
}
const wn = /;(?![^(]*\))/g, Nn = /:([^]+)/, bn = /\/\*[^]*?\*\//g;
function On(e) {
  const t = {};
  return e.replace(bn, "").split(wn).forEach((n) => {
    if (n) {
      const s = n.split(Nn);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Ve(e) {
  let t = "";
  if (v(e))
    t = e;
  else if (h(e))
    for (let n = 0; n < e.length; n++) {
      const s = Ve(e[n]);
      s && (t += s + " ");
    }
  else if (w(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const ls = (e) => v(e) ? e : e == null ? "" : h(e) || w(e) && (e.toString === Nt || !N(e.toString)) ? JSON.stringify(e, St, 2) : String(e), St = (e, t) => t && t.__v_isRef ? St(e, t.value) : U(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, r]) => (n[`${s} =>`] = r, n), {})
} : wt(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : w(t) && !h(t) && !Ot(t) ? String(t) : t;
function et(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let yt;
function Sn(e, t = yt) {
  t && t.active && t.effects.push(e);
}
function yn() {
  return yt;
}
const oe = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Vt = (e) => (e.w & z) > 0, xt = (e) => (e.n & z) > 0, Vn = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= z;
}, xn = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      Vt(r) && !xt(r) ? r.delete(e) : t[n++] = r, r.w &= ~z, r.n &= ~z;
    }
    t.length = n;
  }
}, $e = /* @__PURE__ */ new WeakMap();
let ee = 0, z = 1;
const Te = 30;
let O;
const B = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Pe = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class Rn {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Sn(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = O, n = j;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = O, O = this, j = !0, z = 1 << ++ee, ee <= Te ? Vn(this) : tt(this), this.fn();
    } finally {
      ee <= Te && xn(this), z = 1 << --ee, O = this.parent, j = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    O === this ? this.deferStop = !0 : this.active && (tt(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function tt(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let j = !0;
const Rt = [];
function It() {
  Rt.push(j), j = !1;
}
function vt() {
  const e = Rt.pop();
  j = e === void 0 ? !0 : e;
}
function V(e, t, n) {
  if (j && O) {
    let s = $e.get(e);
    s || $e.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = oe());
    const o = process.env.NODE_ENV !== "production" ? { effect: O, target: e, type: t, key: n } : void 0;
    Me(r, o);
  }
}
function Me(e, t) {
  let n = !1;
  ee <= Te ? xt(e) || (e.n |= z, n = !Vt(e)) : n = !e.has(O), n && (e.add(O), O.deps.push(e), process.env.NODE_ENV !== "production" && O.onTrack && O.onTrack(
    D(
      {
        effect: O
      },
      t
    )
  ));
}
function K(e, t, n, s, r, o) {
  const i = $e.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && h(e)) {
    const a = Number(s);
    i.forEach((d, l) => {
      (l === "length" || l >= a) && c.push(d);
    });
  } else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        h(e) ? He(n) && c.push(i.get("length")) : (c.push(i.get(B)), U(e) && c.push(i.get(Pe)));
        break;
      case "delete":
        h(e) || (c.push(i.get(B)), U(e) && c.push(i.get(Pe)));
        break;
      case "set":
        U(e) && c.push(i.get(B));
        break;
    }
  const u = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: s, oldValue: r, oldTarget: o } : void 0;
  if (c.length === 1)
    c[0] && (process.env.NODE_ENV !== "production" ? Y(c[0], u) : Y(c[0]));
  else {
    const a = [];
    for (const d of c)
      d && a.push(...d);
    process.env.NODE_ENV !== "production" ? Y(oe(a), u) : Y(oe(a));
  }
}
function Y(e, t) {
  const n = h(e) ? e : [...e];
  for (const s of n)
    s.computed && nt(s, t);
  for (const s of n)
    s.computed || nt(s, t);
}
function nt(e, t) {
  (e !== O || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(D({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const In = /* @__PURE__ */ un("__proto__,__v_isRef,__isVue"), Dt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ke)
), vn = /* @__PURE__ */ Ue(), Dn = /* @__PURE__ */ Ue(!0), Cn = /* @__PURE__ */ Ue(!0, !0), rt = /* @__PURE__ */ $n();
function $n() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = p(this);
      for (let o = 0, i = this.length; o < i; o++)
        V(s, "get", o + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(p)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      It();
      const s = p(this)[t].apply(this, n);
      return vt(), s;
    };
  }), e;
}
function Tn(e) {
  const t = p(this);
  return V(t, "has", e), t.hasOwnProperty(e);
}
function Ue(e = !1, t = !1) {
  return function(s, r, o) {
    if (r === "__v_isReactive")
      return !e;
    if (r === "__v_isReadonly")
      return e;
    if (r === "__v_isShallow")
      return t;
    if (r === "__v_raw" && o === (e ? t ? Mt : Pt : t ? Yn : Tt).get(s))
      return s;
    const i = h(s);
    if (!e) {
      if (i && m(rt, r))
        return Reflect.get(rt, r, o);
      if (r === "hasOwnProperty")
        return Tn;
    }
    const c = Reflect.get(s, r, o);
    return (Ke(r) ? Dt.has(r) : In(r)) || (e || V(s, "get", r), t) ? c : S(c) ? i && He(r) ? c : c.value : w(c) ? e ? At(c) : Ft(c) : c;
  };
}
const Pn = /* @__PURE__ */ Mn();
function Mn(e = !1) {
  return function(n, s, r, o) {
    let i = n[s];
    if (H(i) && S(i) && !S(r))
      return !1;
    if (!e && (!we(r) && !H(r) && (i = p(i), r = p(r)), !h(n) && S(i) && !S(r)))
      return i.value = r, !0;
    const c = h(n) && He(s) ? Number(s) < n.length : m(n, s), u = Reflect.set(n, s, r, o);
    return n === p(o) && (c ? se(r, i) && K(n, "set", s, r, i) : K(n, "add", s, r)), u;
  };
}
function Fn(e, t) {
  const n = m(e, t), s = e[t], r = Reflect.deleteProperty(e, t);
  return r && n && K(e, "delete", t, void 0, s), r;
}
function An(e, t) {
  const n = Reflect.has(e, t);
  return (!Ke(t) || !Dt.has(t)) && V(e, "has", t), n;
}
function jn(e) {
  return V(e, "iterate", h(e) ? "length" : B), Reflect.ownKeys(e);
}
const zn = {
  get: vn,
  set: Pn,
  deleteProperty: Fn,
  has: An,
  ownKeys: jn
}, Ct = {
  get: Dn,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && et(
      `Set operation on key "${String(t)}" failed: target is readonly.`,
      e
    ), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && et(
      `Delete operation on key "${String(t)}" failed: target is readonly.`,
      e
    ), !0;
  }
}, Kn = /* @__PURE__ */ D(
  {},
  Ct,
  {
    get: Cn
  }
), Be = (e) => e, xe = (e) => Reflect.getPrototypeOf(e);
function ae(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = p(e), o = p(t);
  n || (t !== o && V(r, "get", t), V(r, "get", o));
  const { has: i } = xe(r), c = s ? Be : n ? Ge : ie;
  if (i.call(r, t))
    return c(e.get(t));
  if (i.call(r, o))
    return c(e.get(o));
  e !== r && e.get(t);
}
function fe(e, t = !1) {
  const n = this.__v_raw, s = p(n), r = p(e);
  return t || (e !== r && V(s, "has", e), V(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function pe(e, t = !1) {
  return e = e.__v_raw, !t && V(p(e), "iterate", B), Reflect.get(e, "size", e);
}
function st(e) {
  e = p(e);
  const t = p(this);
  return xe(t).has.call(t, e) || (t.add(e), K(t, "add", e, e)), this;
}
function ot(e, t) {
  t = p(t);
  const n = p(this), { has: s, get: r } = xe(n);
  let o = s.call(n, e);
  o ? process.env.NODE_ENV !== "production" && $t(n, s, e) : (e = p(e), o = s.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), o ? se(t, i) && K(n, "set", e, t, i) : K(n, "add", e, t), this;
}
function it(e) {
  const t = p(this), { has: n, get: s } = xe(t);
  let r = n.call(t, e);
  r ? process.env.NODE_ENV !== "production" && $t(t, n, e) : (e = p(e), r = n.call(t, e));
  const o = s ? s.call(t, e) : void 0, i = t.delete(e);
  return r && K(t, "delete", e, void 0, o), i;
}
function ct() {
  const e = p(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? U(e) ? new Map(e) : new Set(e) : void 0, s = e.clear();
  return t && K(e, "clear", void 0, void 0, n), s;
}
function de(e, t) {
  return function(s, r) {
    const o = this, i = o.__v_raw, c = p(i), u = t ? Be : e ? Ge : ie;
    return !e && V(c, "iterate", B), i.forEach((a, d) => s.call(r, u(a), u(d), o));
  };
}
function he(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = p(r), i = U(o), c = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, a = r[e](...s), d = n ? Be : t ? Ge : ie;
    return !t && V(
      o,
      "iterate",
      u ? Pe : B
    ), {
      // iterator protocol
      next() {
        const { value: l, done: f } = a.next();
        return f ? { value: l, done: f } : {
          value: c ? [d(l[0]), d(l[1])] : d(l),
          done: f
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function M(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(
        `${mn(e)} operation ${n}failed: target is readonly.`,
        p(this)
      );
    }
    return e === "delete" ? !1 : this;
  };
}
function Hn() {
  const e = {
    get(o) {
      return ae(this, o);
    },
    get size() {
      return pe(this);
    },
    has: fe,
    add: st,
    set: ot,
    delete: it,
    clear: ct,
    forEach: de(!1, !1)
  }, t = {
    get(o) {
      return ae(this, o, !1, !0);
    },
    get size() {
      return pe(this);
    },
    has: fe,
    add: st,
    set: ot,
    delete: it,
    clear: ct,
    forEach: de(!1, !0)
  }, n = {
    get(o) {
      return ae(this, o, !0);
    },
    get size() {
      return pe(this, !0);
    },
    has(o) {
      return fe.call(this, o, !0);
    },
    add: M("add"),
    set: M("set"),
    delete: M("delete"),
    clear: M("clear"),
    forEach: de(!0, !1)
  }, s = {
    get(o) {
      return ae(this, o, !0, !0);
    },
    get size() {
      return pe(this, !0);
    },
    has(o) {
      return fe.call(this, o, !0);
    },
    add: M("add"),
    set: M("set"),
    delete: M("delete"),
    clear: M("clear"),
    forEach: de(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = he(
      o,
      !1,
      !1
    ), n[o] = he(
      o,
      !0,
      !1
    ), t[o] = he(
      o,
      !1,
      !0
    ), s[o] = he(
      o,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    s
  ];
}
const [
  Wn,
  Un,
  Bn,
  Jn
] = /* @__PURE__ */ Hn();
function Je(e, t) {
  const n = t ? e ? Jn : Bn : e ? Un : Wn;
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    m(n, r) && r in s ? n : s,
    r,
    o
  );
}
const qn = {
  get: /* @__PURE__ */ Je(!1, !1)
}, Gn = {
  get: /* @__PURE__ */ Je(!0, !1)
}, Ln = {
  get: /* @__PURE__ */ Je(!0, !0)
};
function $t(e, t, n) {
  const s = p(n);
  if (s !== n && t.call(e, s)) {
    const r = bt(e);
    console.warn(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Tt = /* @__PURE__ */ new WeakMap(), Yn = /* @__PURE__ */ new WeakMap(), Pt = /* @__PURE__ */ new WeakMap(), Mt = /* @__PURE__ */ new WeakMap();
function Qn(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Xn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Qn(bt(e));
}
function Ft(e) {
  return H(e) ? e : qe(
    e,
    !1,
    zn,
    qn,
    Tt
  );
}
function At(e) {
  return qe(
    e,
    !0,
    Ct,
    Gn,
    Pt
  );
}
function _e(e) {
  return qe(
    e,
    !0,
    Kn,
    Ln,
    Mt
  );
}
function qe(e, t, n, s, r) {
  if (!w(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = Xn(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, c), c;
}
function J(e) {
  return H(e) ? J(e.__v_raw) : !!(e && e.__v_isReactive);
}
function H(e) {
  return !!(e && e.__v_isReadonly);
}
function we(e) {
  return !!(e && e.__v_isShallow);
}
function Fe(e) {
  return J(e) || H(e);
}
function p(e) {
  const t = e && e.__v_raw;
  return t ? p(t) : e;
}
function Zn(e) {
  return En(e, "__v_skip", !0), e;
}
const ie = (e) => w(e) ? Ft(e) : e, Ge = (e) => w(e) ? At(e) : e;
function kn(e) {
  j && O && (e = p(e), process.env.NODE_ENV !== "production" ? Me(e.dep || (e.dep = oe()), {
    target: e,
    type: "get",
    key: "value"
  }) : Me(e.dep || (e.dep = oe())));
}
function er(e, t) {
  e = p(e);
  const n = e.dep;
  n && (process.env.NODE_ENV !== "production" ? Y(n, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  }) : Y(n));
}
function S(e) {
  return !!(e && e.__v_isRef === !0);
}
function us(e) {
  return tr(e, !1);
}
function tr(e, t) {
  return S(e) ? e : new nr(e, t);
}
class nr {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : p(t), this._value = n ? t : ie(t);
  }
  get value() {
    return kn(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || we(t) || H(t);
    t = n ? t : p(t), se(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : ie(t), er(this, t));
  }
}
function rr(e) {
  return S(e) ? e.value : e;
}
const sr = {
  get: (e, t, n) => rr(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return S(r) && !S(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function or(e) {
  return J(e) ? e : new Proxy(e, sr);
}
const q = [];
function ir(e) {
  q.push(e);
}
function cr() {
  q.pop();
}
function E(e, ...t) {
  if (process.env.NODE_ENV === "production")
    return;
  It();
  const n = q.length ? q[q.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = lr();
  if (s)
    G(
      s,
      n,
      11,
      [
        e + t.join(""),
        n && n.proxy,
        r.map(
          ({ vnode: o }) => `at <${sn(n, o.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...ur(r)), console.warn(...o);
  }
  vt();
}
function lr() {
  let e = q[q.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function ur(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...ar(n));
  }), t;
}
function ar({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${sn(
    e.component,
    e.type,
    s
  )}`, o = ">" + n;
  return e.props ? [r, ...fr(e.props), o] : [r + o];
}
function fr(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...jt(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function jt(e, t, n) {
  return v(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : S(t) ? (t = jt(e, p(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : N(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = p(t), n ? t : [`${e}=`, t]);
}
const zt = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function G(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (o) {
    Kt(o, t, n);
  }
  return r;
}
function Ae(e, t, n, s) {
  if (N(e)) {
    const o = G(e, t, n, s);
    return o && _n(o) && o.catch((i) => {
      Kt(i, t, n);
    }), o;
  }
  const r = [];
  for (let o = 0; o < e.length; o++)
    r.push(Ae(e[o], t, n, s));
  return r;
}
function Kt(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? zt[n] : n;
    for (; o; ) {
      const a = o.ec;
      if (a) {
        for (let d = 0; d < a.length; d++)
          if (a[d](e, i, c) === !1)
            return;
      }
      o = o.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      G(
        u,
        null,
        10,
        [e, i, c]
      );
      return;
    }
  }
  pr(e, n, r, s);
}
function pr(e, t, n, s = !0) {
  if (process.env.NODE_ENV !== "production") {
    const r = zt[t];
    if (n && ir(n), E(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && cr(), s)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let Ne = !1, je = !1;
const C = [];
let A = 0;
const X = [];
let T = null, F = 0;
const Ht = /* @__PURE__ */ Promise.resolve();
let Le = null;
const dr = 100;
function hr(e) {
  const t = Le || Ht;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function _r(e) {
  let t = A + 1, n = C.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    ce(C[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function Ye(e) {
  (!C.length || !C.includes(
    e,
    Ne && e.allowRecurse ? A + 1 : A
  )) && (e.id == null ? C.push(e) : C.splice(_r(e.id), 0, e), Wt());
}
function Wt() {
  !Ne && !je && (je = !0, Le = Ht.then(Bt));
}
function Ut(e) {
  h(e) ? X.push(...e) : (!T || !T.includes(
    e,
    e.allowRecurse ? F + 1 : F
  )) && X.push(e), Wt();
}
function gr(e) {
  if (X.length) {
    const t = [...new Set(X)];
    if (X.length = 0, T) {
      T.push(...t);
      return;
    }
    for (T = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), T.sort((n, s) => ce(n) - ce(s)), F = 0; F < T.length; F++)
      process.env.NODE_ENV !== "production" && Jt(e, T[F]) || T[F]();
    T = null, F = 0;
  }
}
const ce = (e) => e.id == null ? 1 / 0 : e.id, mr = (e, t) => {
  const n = ce(e) - ce(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Bt(e) {
  je = !1, Ne = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), C.sort(mr);
  const t = process.env.NODE_ENV !== "production" ? (n) => Jt(e, n) : Et;
  try {
    for (A = 0; A < C.length; A++) {
      const n = C[A];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        G(n, null, 14);
      }
    }
  } finally {
    A = 0, C.length = 0, gr(e), Ne = !1, Le = null, (C.length || X.length) && Bt(e);
  }
}
function Jt(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > dr) {
      const s = t.ownerInstance, r = s && rn(s.type);
      return E(
        `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`
      ), !0;
    } else
      e.set(t, n + 1);
  }
}
const k = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (Ce().__VUE_HMR_RUNTIME__ = {
  createRecord: Ie(Er),
  rerender: Ie(wr),
  reload: Ie(Nr)
});
const be = /* @__PURE__ */ new Map();
function Er(e, t) {
  return be.has(e) ? !1 : (be.set(e, {
    initialDef: ne(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ne(e) {
  return on(e) ? e.__vccOpts : e;
}
function wr(e, t) {
  const n = be.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, ne(s.type).render = t), s.renderCache = [], s.update();
  }));
}
function Nr(e, t) {
  const n = be.get(e);
  if (!n)
    return;
  t = ne(t), lt(n.initialDef, t);
  const s = [...n.instances];
  for (const r of s) {
    const o = ne(r.type);
    k.has(o) || (o !== n.initialDef && lt(o, t), k.add(o)), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (k.add(o), r.ceReload(t.styles), k.delete(o)) : r.parent ? Ye(r.parent.update) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  Ut(() => {
    for (const r of s)
      k.delete(
        ne(r.type)
      );
  });
}
function lt(e, t) {
  D(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Ie(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
function br(e, ...t) {
}
const Or = /* @__PURE__ */ Sr(
  "component:updated"
  /* COMPONENT_UPDATED */
);
function Sr(e) {
  return (t) => {
    br(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
let y = null, qt = null;
function ut(e) {
  const t = y;
  return y = e, qt = e && e.type.__scopeId || null, t;
}
function as(e, t = y, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && _t(-1);
    const o = ut(t);
    let i;
    try {
      i = e(...r);
    } finally {
      ut(o), s._d && _t(1);
    }
    return process.env.NODE_ENV !== "production" && Or(t), i;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
const yr = (e) => e.__isSuspense;
function Vr(e, t) {
  t && t.pendingBranch ? h(e) ? t.effects.push(...e) : t.effects.push(e) : Ut(e);
}
const ge = {};
function xr(e, t, { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = P) {
  var c;
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && E(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && E(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const u = (g) => {
    E(
      "Invalid watch source: ",
      g,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, a = yn() === ((c = Z) == null ? void 0 : c.scope) ? Z : null;
  let d, l = !1, f = !1;
  if (S(e) ? (d = () => e.value, l = we(e)) : J(e) ? (d = () => e, s = !0) : h(e) ? (f = !0, l = e.some((g) => J(g) || we(g)), d = () => e.map((g) => {
    if (S(g))
      return g.value;
    if (J(g))
      return Q(g);
    if (N(g))
      return G(g, a, 2);
    process.env.NODE_ENV !== "production" && u(g);
  })) : N(e) ? t ? d = () => G(e, a, 2) : d = () => {
    if (!(a && a.isUnmounted))
      return _ && _(), Ae(
        e,
        a,
        3,
        [x]
      );
  } : (d = Et, process.env.NODE_ENV !== "production" && u(e)), t && s) {
    const g = d;
    d = () => Q(g());
  }
  let _, x = (g) => {
    _ = I.onStop = () => {
      G(g, a, 4);
    };
  }, R = f ? new Array(e.length).fill(ge) : ge;
  const W = () => {
    if (I.active)
      if (t) {
        const g = I.run();
        (s || l || (f ? g.some(
          (cn, ln) => se(cn, R[ln])
        ) : se(g, R))) && (_ && _(), Ae(t, a, 3, [
          g,
          // pass undefined as the old value when it's changed for the first time
          R === ge ? void 0 : f && R[0] === ge ? [] : R,
          x
        ]), R = g);
      } else
        I.run();
  };
  W.allowRecurse = !!t;
  let ue;
  r === "sync" ? ue = W : r === "post" ? ue = () => ht(W, a && a.suspense) : (W.pre = !0, a && (W.id = a.uid), ue = () => Ye(W));
  const I = new Rn(d, ue);
  return process.env.NODE_ENV !== "production" && (I.onTrack = o, I.onTrigger = i), t ? n ? W() : R = I.run() : r === "post" ? ht(
    I.run.bind(I),
    a && a.suspense
  ) : I.run(), () => {
    I.stop(), a && a.scope && dn(a.scope.effects, I);
  };
}
function Rr(e, t, n) {
  const s = this.proxy, r = v(e) ? e.includes(".") ? Ir(s, e) : () => s[e] : e.bind(s, s);
  let o;
  N(t) ? o = t : (o = t.handler, n = t);
  const i = Z;
  mt(this);
  const c = xr(r, o.bind(s), n);
  return i ? mt(i) : Gr(), c;
}
function Ir(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
function Q(e, t) {
  if (!w(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), S(e))
    Q(e.value, t);
  else if (h(e))
    for (let n = 0; n < e.length; n++)
      Q(e[n], t);
  else if (wt(e) || U(e))
    e.forEach((n) => {
      Q(n, t);
    });
  else if (Ot(e))
    for (const n in e)
      Q(e[n], t);
  return e;
}
const vr = (e) => !!e.type.__asyncLoader, Dr = Symbol.for("v-ndc");
function Cr(e, t, n = {}, s, r) {
  if (y.isCE || y.parent && vr(y.parent) && y.parent.isCE)
    return t !== "default" && (n.name = t), Qe("slot", n, s && s());
  let o = e[t];
  process.env.NODE_ENV !== "production" && o && o.length > 1 && (E(
    "SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."
  ), o = () => []), o && o._c && (o._d = !1), Yt();
  const i = o && Gt(o(n)), c = Wr(
    Re,
    {
      key: n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      i && i.key || `_${t}`
    },
    i || (s ? s() : []),
    i && e._ === 1 ? 64 : -2
  );
  return !r && c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), o && o._c && (o._d = !0), c;
}
function Gt(e) {
  return e.some((t) => Xt(t) ? !(t.type === Lt || t.type === Re && !Gt(t.children)) : !0) ? e : null;
}
const ze = (e) => e ? Lr(e) ? Yr(e) || e.proxy : ze(e.parent) : null, re = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ D(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? _e(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? _e(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? _e(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? _e(e.refs) : e.refs,
    $parent: (e) => ze(e.parent),
    $root: (e) => ze(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Pr(e),
    $forceUpdate: (e) => e.f || (e.f = () => Ye(e.update)),
    $nextTick: (e) => e.n || (e.n = hr.bind(e.proxy)),
    $watch: (e) => Rr.bind(e)
  })
), $r = (e) => e === "_" || e === "$", ve = (e, t) => e !== P && !e.__isScriptSetup && m(e, t), Tr = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: c, appContext: u } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let a;
    if (t[0] !== "$") {
      const _ = i[t];
      if (_ !== void 0)
        switch (_) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (ve(s, t))
          return i[t] = 1, s[t];
        if (r !== P && m(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (a = e.propsOptions[0]) && m(a, t)
        )
          return i[t] = 3, o[t];
        if (n !== P && m(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const d = re[t];
    let l, f;
    if (d)
      return t === "$attrs" ? (V(e, "get", t), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && V(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== P && m(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      f = u.config.globalProperties, m(f, t)
    )
      return f[t];
    process.env.NODE_ENV !== "production" && y && (!v(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== P && $r(t[0]) && m(r, t) ? E(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === y && E(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return ve(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && m(r, t) ? (E(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== P && m(s, t) ? (s[t] = n, !0) : m(e.props, t) ? (process.env.NODE_ENV !== "production" && E(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && E(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o }
  }, i) {
    let c;
    return !!n[i] || e !== P && m(e, i) || ve(t, i) || (c = o[0]) && m(c, i) || m(s, i) || m(re, i) || m(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : m(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (Tr.ownKeys = (e) => (E(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function at(e) {
  return h(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Pr(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let u;
  return c ? u = c : !r.length && !n && !s ? u = t : (u = {}, r.length && r.forEach(
    (a) => Oe(u, a, i, !0)
  ), Oe(u, t, i)), w(t) && o.set(t, u), u;
}
function Oe(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && Oe(e, o, n, !0), r && r.forEach(
    (i) => Oe(e, i, n, !0)
  );
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && E(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = Mr[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const Mr = {
  data: ft,
  props: dt,
  emits: dt,
  // objects
  methods: te,
  computed: te,
  // lifecycle
  beforeCreate: b,
  created: b,
  beforeMount: b,
  mounted: b,
  beforeUpdate: b,
  updated: b,
  beforeDestroy: b,
  beforeUnmount: b,
  destroyed: b,
  unmounted: b,
  activated: b,
  deactivated: b,
  errorCaptured: b,
  serverPrefetch: b,
  // assets
  components: te,
  directives: te,
  // watch
  watch: Ar,
  // provide / inject
  provide: ft,
  inject: Fr
};
function ft(e, t) {
  return t ? e ? function() {
    return D(
      N(e) ? e.call(this, this) : e,
      N(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Fr(e, t) {
  return te(pt(e), pt(t));
}
function pt(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function b(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function te(e, t) {
  return e ? D(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function dt(e, t) {
  return e ? h(e) && h(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : D(
    /* @__PURE__ */ Object.create(null),
    at(e),
    at(t ?? {})
  ) : t;
}
function Ar(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = D(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = b(e[s], t[s]);
  return n;
}
const ht = Vr, jr = (e) => e.__isTeleport, Re = Symbol.for("v-fgt"), zr = Symbol.for("v-txt"), Lt = Symbol.for("v-cmt"), me = [];
let $ = null;
function Yt(e = !1) {
  me.push($ = e ? null : []);
}
function Kr() {
  me.pop(), $ = me[me.length - 1] || null;
}
let le = 1;
function _t(e) {
  le += e;
}
function Qt(e) {
  return e.dynamicChildren = le > 0 ? $ || an : null, Kr(), le > 0 && $ && $.push(e), e;
}
function Hr(e, t, n, s, r, o) {
  return Qt(
    en(
      e,
      t,
      n,
      s,
      r,
      o,
      !0
      /* isBlock */
    )
  );
}
function Wr(e, t, n, s, r) {
  return Qt(
    Qe(
      e,
      t,
      n,
      s,
      r,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function Xt(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const Ur = (...e) => tn(
  ...e
), Zt = "__vInternal", kt = ({ key: e }) => e ?? null, Ee = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? v(e) || S(e) || N(e) ? { i: y, r: e, k: t, f: !!n } : e : null);
function en(e, t = null, n = null, s = 0, r = null, o = e === Re ? 0 : 1, i = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && kt(t),
    ref: t && Ee(t),
    scopeId: qt,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: y
  };
  return c ? (Xe(u, n), o & 128 && e.normalize(u)) : n && (u.shapeFlag |= v(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && E("VNode created with invalid key (NaN). VNode type:", u.type), le > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  $ && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && $.push(u), u;
}
const Qe = process.env.NODE_ENV !== "production" ? Ur : tn;
function tn(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === Dr) && (process.env.NODE_ENV !== "production" && !e && E(`Invalid vnode type when creating vnode: ${e}.`), e = Lt), Xt(e)) {
    const c = Se(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Xe(c, n), le > 0 && !o && $ && (c.shapeFlag & 6 ? $[$.indexOf(e)] = c : $.push(c)), c.patchFlag |= -2, c;
  }
  if (on(e) && (e = e.__vccOpts), t) {
    t = Br(t);
    let { class: c, style: u } = t;
    c && !v(c) && (t.class = Ve(c)), w(u) && (Fe(u) && !h(u) && (u = D({}, u)), t.style = We(u));
  }
  const i = v(e) ? 1 : yr(e) ? 128 : jr(e) ? 64 : w(e) ? 4 : N(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Fe(e) && (e = p(e), E(
    "Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), en(
    e,
    t,
    n,
    s,
    r,
    i,
    o,
    !0
  );
}
function Br(e) {
  return e ? Fe(e) || Zt in e ? D({}, e) : e : null;
}
function Se(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e, c = t ? qr(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && kt(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? h(r) ? r.concat(Ee(t)) : [r, Ee(t)] : Ee(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && o === -1 && h(i) ? i.map(nn) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Re ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Se(e.ssContent),
    ssFallback: e.ssFallback && Se(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function nn(e) {
  const t = Se(e);
  return h(e.children) && (t.children = e.children.map(nn)), t;
}
function Jr(e = " ", t = 0) {
  return Qe(zr, null, e, t);
}
function Xe(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (h(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Xe(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(Zt in t) ? t._ctx = y : r === 3 && y && (y.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    N(t) ? (t = { default: t, _ctx: y }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Jr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function qr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Ve([t.class, s.class]));
      else if (r === "style")
        t.style = We([t.style, s.style]);
      else if (pn(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(h(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else
        r !== "" && (t[r] = s[r]);
  }
  return t;
}
let Z = null, Ze, L, gt = "__VUE_INSTANCE_SETTERS__";
(L = Ce()[gt]) || (L = Ce()[gt] = []), L.push((e) => Z = e), Ze = (e) => {
  L.length > 1 ? L.forEach((t) => t(e)) : L[0](e);
};
const mt = (e) => {
  Ze(e), e.scope.on();
}, Gr = () => {
  Z && Z.scope.off(), Ze(null);
};
function Lr(e) {
  return e.vnode.shapeFlag & 4;
}
function Yr(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(or(Zn(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in re)
          return re[n](e);
      },
      has(t, n) {
        return n in t || n in re;
      }
    }));
}
const Qr = /(?:^|[-_])(\w)/g, Xr = (e) => e.replace(Qr, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function rn(e, t = !0) {
  return N(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function sn(e, t, n = !1) {
  let s = rn(t);
  if (!s && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (s = r[1]);
  }
  if (!s && e && e.parent) {
    const r = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    s = r(
      e.components || e.parent.type.components
    ) || r(e.appContext.components);
  }
  return s ? Xr(s) : n ? "App" : "Anonymous";
}
function on(e) {
  return N(e) && "__vccOpts" in e;
}
function De(e) {
  return !!(e && e.__v_isShallow);
}
function Zr() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, s = { style: "color:#9d288c" }, r = {
    header(l) {
      return w(l) ? l.__isVue ? ["div", e, "VueInstance"] : S(l) ? [
        "div",
        {},
        ["span", e, d(l)],
        "<",
        c(l.value),
        ">"
      ] : J(l) ? [
        "div",
        {},
        ["span", e, De(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${H(l) ? " (readonly)" : ""}`
      ] : H(l) ? [
        "div",
        {},
        ["span", e, De(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const f = [];
    l.type.props && l.props && f.push(i("props", p(l.props))), l.setupState !== P && f.push(i("setup", l.setupState)), l.data !== P && f.push(i("data", p(l.data)));
    const _ = u(l, "computed");
    _ && f.push(i("computed", _));
    const x = u(l, "inject");
    return x && f.push(i("injected", x)), f.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), f;
  }
  function i(l, f) {
    return f = D({}, f), Object.keys(f).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(f).map((_) => [
          "div",
          {},
          ["span", s, _ + ": "],
          c(f[_], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, f = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", s, l] : w(l) ? ["object", { object: f ? p(l) : l }] : ["span", n, String(l)];
  }
  function u(l, f) {
    const _ = l.type;
    if (N(_))
      return;
    const x = {};
    for (const R in l.ctx)
      a(_, R, f) && (x[R] = l.ctx[R]);
    return x;
  }
  function a(l, f, _) {
    const x = l[_];
    if (h(x) && x.includes(f) || w(x) && f in x || l.extends && a(l.extends, f, _) || l.mixins && l.mixins.some((R) => a(R, f, _)))
      return !0;
  }
  function d(l) {
    return De(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
function kr() {
  Zr();
}
process.env.NODE_ENV !== "production" && kr();
const es = "_button_183ae_1", ts = {
  button: es
}, ns = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, rs = {};
function ss(e, t) {
  return Yt(), Hr("button", {
    class: Ve(e.style.button)
  }, [
    Cr(e.$slots, "default")
  ], 2);
}
const os = {
  style: ts
}, fs = /* @__PURE__ */ ns(rs, [["render", ss], ["__cssModules", os]]);
export {
  Re as F,
  fs as M,
  ns as _,
  en as a,
  Qe as b,
  Hr as c,
  Jr as d,
  Ve as n,
  Yt as o,
  us as r,
  ls as t,
  as as w
};
