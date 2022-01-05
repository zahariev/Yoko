"use strict";
var SU = Object.defineProperty,
  IU = Object.defineProperties,
  kU = Object.getOwnPropertyDescriptors,
  fM = Object.getOwnPropertySymbols,
  TU = Object.prototype.hasOwnProperty,
  AU = Object.prototype.propertyIsEnumerable,
  pM = ($, Ye, dt) =>
    Ye in $
      ? SU($, Ye, { enumerable: !0, configurable: !0, writable: !0, value: dt })
      : ($[Ye] = dt),
  Z = ($, Ye) => {
    for (var dt in Ye || (Ye = {})) TU.call(Ye, dt) && pM($, dt, Ye[dt]);
    if (fM) for (var dt of fM(Ye)) AU.call(Ye, dt) && pM($, dt, Ye[dt]);
    return $;
  },
  gr = ($, Ye) => IU($, kU(Ye));
(self.webpackChunkyoko = self.webpackChunkyoko || []).push([
  [179],
  {
    814: () => {
      function $(n) {
        return "function" == typeof n;
      }
      function Ye(n) {
        const t = n((i) => {
          Error.call(i), (i.stack = new Error().stack);
        });
        return (
          (t.prototype = Object.create(Error.prototype)),
          (t.prototype.constructor = t),
          t
        );
      }
      const dt = Ye(
        (n) =>
          function (t) {
            n(this),
              (this.message = t
                ? `${t.length} errors occurred during unsubscription:\n${t
                    .map((i, r) => `${r + 1}) ${i.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = t);
          }
      );
      function _r(n, e) {
        if (n) {
          const t = n.indexOf(e);
          0 <= t && n.splice(t, 1);
        }
      }
      class Oe {
        constructor(e) {
          (this.initialTeardown = e),
            (this.closed = !1),
            (this._parentage = null),
            (this._teardowns = null);
        }
        unsubscribe() {
          let e;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: t } = this;
            if (t)
              if (((this._parentage = null), Array.isArray(t)))
                for (const s of t) s.remove(this);
              else t.remove(this);
            const { initialTeardown: i } = this;
            if ($(i))
              try {
                i();
              } catch (s) {
                e = s instanceof dt ? s.errors : [s];
              }
            const { _teardowns: r } = this;
            if (r) {
              this._teardowns = null;
              for (const s of r)
                try {
                  tm(s);
                } catch (o) {
                  (e = null != e ? e : []),
                    o instanceof dt ? (e = [...e, ...o.errors]) : e.push(o);
                }
            }
            if (e) throw new dt(e);
          }
        }
        add(e) {
          var t;
          if (e && e !== this)
            if (this.closed) tm(e);
            else {
              if (e instanceof Oe) {
                if (e.closed || e._hasParent(this)) return;
                e._addParent(this);
              }
              (this._teardowns =
                null !== (t = this._teardowns) && void 0 !== t ? t : []).push(
                e
              );
            }
        }
        _hasParent(e) {
          const { _parentage: t } = this;
          return t === e || (Array.isArray(t) && t.includes(e));
        }
        _addParent(e) {
          const { _parentage: t } = this;
          this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e;
        }
        _removeParent(e) {
          const { _parentage: t } = this;
          t === e ? (this._parentage = null) : Array.isArray(t) && _r(t, e);
        }
        remove(e) {
          const { _teardowns: t } = this;
          t && _r(t, e), e instanceof Oe && e._removeParent(this);
        }
      }
      Oe.EMPTY = (() => {
        const n = new Oe();
        return (n.closed = !0), n;
      })();
      const Jp = Oe.EMPTY;
      function em(n) {
        return (
          n instanceof Oe ||
          (n && "closed" in n && $(n.remove) && $(n.add) && $(n.unsubscribe))
        );
      }
      function tm(n) {
        $(n) ? n() : n.unsubscribe();
      }
      const Ai = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        ua = {
          setTimeout(...n) {
            const { delegate: e } = ua;
            return ((null == e ? void 0 : e.setTimeout) || setTimeout)(...n);
          },
          clearTimeout(n) {
            const { delegate: e } = ua;
            return ((null == e ? void 0 : e.clearTimeout) || clearTimeout)(n);
          },
          delegate: void 0,
        };
      function nm(n) {
        ua.setTimeout(() => {
          const { onUnhandledError: e } = Ai;
          if (!e) throw n;
          e(n);
        });
      }
      function Ts() {}
      const mM = Bc("C", void 0, void 0);
      function Bc(n, e, t) {
        return { kind: n, value: e, error: t };
      }
      let Ri = null;
      function da(n) {
        if (Ai.useDeprecatedSynchronousErrorHandling) {
          const e = !Ri;
          if ((e && (Ri = { errorThrown: !1, error: null }), n(), e)) {
            const { errorThrown: t, error: i } = Ri;
            if (((Ri = null), t)) throw i;
          }
        } else n();
      }
      class Hc extends Oe {
        constructor(e) {
          super(),
            (this.isStopped = !1),
            e
              ? ((this.destination = e), em(e) && e.add(this))
              : (this.destination = vM);
        }
        static create(e, t, i) {
          return new jc(e, t, i);
        }
        next(e) {
          this.isStopped ? zc(Bc("N", e, void 0), this) : this._next(e);
        }
        error(e) {
          this.isStopped
            ? zc(Bc("E", void 0, e), this)
            : ((this.isStopped = !0), this._error(e));
        }
        complete() {
          this.isStopped
            ? zc(mM, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(e) {
          this.destination.next(e);
        }
        _error(e) {
          try {
            this.destination.error(e);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      class jc extends Hc {
        constructor(e, t, i) {
          let r;
          if ((super(), $(e))) r = e;
          else if (e) {
            let s;
            ({ next: r, error: t, complete: i } = e),
              this && Ai.useDeprecatedNextContext
                ? ((s = Object.create(e)),
                  (s.unsubscribe = () => this.unsubscribe()))
                : (s = e),
              (r = null == r ? void 0 : r.bind(s)),
              (t = null == t ? void 0 : t.bind(s)),
              (i = null == i ? void 0 : i.bind(s));
          }
          this.destination = {
            next: r ? Uc(r) : Ts,
            error: Uc(null != t ? t : im),
            complete: i ? Uc(i) : Ts,
          };
        }
      }
      function Uc(n, e) {
        return (...t) => {
          try {
            n(...t);
          } catch (i) {
            Ai.useDeprecatedSynchronousErrorHandling
              ? (function (n) {
                  Ai.useDeprecatedSynchronousErrorHandling &&
                    Ri &&
                    ((Ri.errorThrown = !0), (Ri.error = n));
                })(i)
              : nm(i);
          }
        };
      }
      function im(n) {
        throw n;
      }
      function zc(n, e) {
        const { onStoppedNotification: t } = Ai;
        t && ua.setTimeout(() => t(n, e));
      }
      const vM = { closed: !0, next: Ts, error: im, complete: Ts },
        $c =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function ha(n) {
        return n;
      }
      let Se = (() => {
        class n {
          constructor(t) {
            t && (this._subscribe = t);
          }
          lift(t) {
            const i = new n();
            return (i.source = this), (i.operator = t), i;
          }
          subscribe(t, i, r) {
            const s = (function (n) {
              return (
                (n && n instanceof Hc) ||
                ((function (n) {
                  return n && $(n.next) && $(n.error) && $(n.complete);
                })(n) &&
                  em(n))
              );
            })(t)
              ? t
              : new jc(t, i, r);
            return (
              da(() => {
                const { operator: o, source: a } = this;
                s.add(
                  o
                    ? o.call(s, a)
                    : a
                    ? this._subscribe(s)
                    : this._trySubscribe(s)
                );
              }),
              s
            );
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (i) {
              t.error(i);
            }
          }
          forEach(t, i) {
            return new (i = sm(i))((r, s) => {
              let o;
              o = this.subscribe(
                (a) => {
                  try {
                    t(a);
                  } catch (l) {
                    s(l), null == o || o.unsubscribe();
                  }
                },
                s,
                r
              );
            });
          }
          _subscribe(t) {
            var i;
            return null === (i = this.source) || void 0 === i
              ? void 0
              : i.subscribe(t);
          }
          [$c]() {
            return this;
          }
          pipe(...t) {
            return (function (n) {
              return 0 === n.length
                ? ha
                : 1 === n.length
                ? n[0]
                : function (t) {
                    return n.reduce((i, r) => r(i), t);
                  };
            })(t)(this);
          }
          toPromise(t) {
            return new (t = sm(t))((i, r) => {
              let s;
              this.subscribe(
                (o) => (s = o),
                (o) => r(o),
                () => i(s)
              );
            });
          }
        }
        return (n.create = (e) => new n(e)), n;
      })();
      function sm(n) {
        var e;
        return null !== (e = null != n ? n : Ai.Promise) && void 0 !== e
          ? e
          : Promise;
      }
      const DM = Ye(
        (n) =>
          function () {
            n(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let q = (() => {
        class n extends Se {
          constructor() {
            super(),
              (this.closed = !1),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(t) {
            const i = new om(this, this);
            return (i.operator = t), i;
          }
          _throwIfClosed() {
            if (this.closed) throw new DM();
          }
          next(t) {
            da(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                const i = this.observers.slice();
                for (const r of i) r.next(t);
              }
            });
          }
          error(t) {
            da(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = t);
                const { observers: i } = this;
                for (; i.length; ) i.shift().error(t);
              }
            });
          }
          complete() {
            da(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: t } = this;
                for (; t.length; ) t.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0), (this.observers = null);
          }
          get observed() {
            var t;
            return (
              (null === (t = this.observers) || void 0 === t
                ? void 0
                : t.length) > 0
            );
          }
          _trySubscribe(t) {
            return this._throwIfClosed(), super._trySubscribe(t);
          }
          _subscribe(t) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(t),
              this._innerSubscribe(t)
            );
          }
          _innerSubscribe(t) {
            const { hasError: i, isStopped: r, observers: s } = this;
            return i || r ? Jp : (s.push(t), new Oe(() => _r(s, t)));
          }
          _checkFinalizedStatuses(t) {
            const { hasError: i, thrownError: r, isStopped: s } = this;
            i ? t.error(r) : s && t.complete();
          }
          asObservable() {
            const t = new Se();
            return (t.source = this), t;
          }
        }
        return (n.create = (e, t) => new om(e, t)), n;
      })();
      class om extends q {
        constructor(e, t) {
          super(), (this.destination = e), (this.source = t);
        }
        next(e) {
          var t, i;
          null ===
            (i =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.next) ||
            void 0 === i ||
            i.call(t, e);
        }
        error(e) {
          var t, i;
          null ===
            (i =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.error) ||
            void 0 === i ||
            i.call(t, e);
        }
        complete() {
          var e, t;
          null ===
            (t =
              null === (e = this.destination) || void 0 === e
                ? void 0
                : e.complete) ||
            void 0 === t ||
            t.call(e);
        }
        _subscribe(e) {
          var t, i;
          return null !==
            (i =
              null === (t = this.source) || void 0 === t
                ? void 0
                : t.subscribe(e)) && void 0 !== i
            ? i
            : Jp;
        }
      }
      function Je(n) {
        return (e) => {
          if (
            (function (n) {
              return $(null == n ? void 0 : n.lift);
            })(e)
          )
            return e.lift(function (t) {
              try {
                return n(t, this);
              } catch (i) {
                this.error(i);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      class et extends Hc {
        constructor(e, t, i, r, s) {
          super(e),
            (this.onFinalize = s),
            (this._next = t
              ? function (o) {
                  try {
                    t(o);
                  } catch (a) {
                    e.error(a);
                  }
                }
              : super._next),
            (this._error = r
              ? function (o) {
                  try {
                    r(o);
                  } catch (a) {
                    e.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = i
              ? function () {
                  try {
                    i();
                  } catch (o) {
                    e.error(o);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var e;
          const { closed: t } = this;
          super.unsubscribe(),
            !t &&
              (null === (e = this.onFinalize) || void 0 === e || e.call(this));
        }
      }
      function Et(n, e) {
        return Je((t, i) => {
          let r = 0;
          t.subscribe(
            new et(i, (s) => {
              i.next(n.call(e, s, r++));
            })
          );
        });
      }
      function Oi(n) {
        return this instanceof Oi ? ((this.v = n), this) : new Oi(n);
      }
      function xM(n, e, t) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var r,
          i = t.apply(n, e || []),
          s = [];
        return (
          (r = {}),
          o("next"),
          o("throw"),
          o("return"),
          (r[Symbol.asyncIterator] = function () {
            return this;
          }),
          r
        );
        function o(h) {
          i[h] &&
            (r[h] = function (f) {
              return new Promise(function (p, g) {
                s.push([h, f, p, g]) > 1 || a(h, f);
              });
            });
        }
        function a(h, f) {
          try {
            !(function (h) {
              h.value instanceof Oi
                ? Promise.resolve(h.value.v).then(c, u)
                : d(s[0][2], h);
            })(i[h](f));
          } catch (p) {
            d(s[0][3], p);
          }
        }
        function c(h) {
          a("next", h);
        }
        function u(h) {
          a("throw", h);
        }
        function d(h, f) {
          h(f), s.shift(), s.length && a(s[0][0], s[0][1]);
        }
      }
      function SM(n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var t,
          e = n[Symbol.asyncIterator];
        return e
          ? e.call(n)
          : ((n = (function (n) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                t = e && n[e],
                i = 0;
              if (t) return t.call(n);
              if (n && "number" == typeof n.length)
                return {
                  next: function () {
                    return (
                      n && i >= n.length && (n = void 0),
                      { value: n && n[i++], done: !n }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(n)),
            (t = {}),
            i("next"),
            i("throw"),
            i("return"),
            (t[Symbol.asyncIterator] = function () {
              return this;
            }),
            t);
        function i(s) {
          t[s] =
            n[s] &&
            function (o) {
              return new Promise(function (a, l) {
                !(function (s, o, a, l) {
                  Promise.resolve(l).then(function (c) {
                    s({ value: c, done: a });
                  }, o);
                })(a, l, (o = n[s](o)).done, o.value);
              });
            };
        }
      }
      const Wc = (n) =>
        n && "number" == typeof n.length && "function" != typeof n;
      function um(n) {
        return $(null == n ? void 0 : n.then);
      }
      function dm(n) {
        return $(n[$c]);
      }
      function hm(n) {
        return (
          Symbol.asyncIterator &&
          $(null == n ? void 0 : n[Symbol.asyncIterator])
        );
      }
      function fm(n) {
        return new TypeError(
          `You provided ${
            null !== n && "object" == typeof n ? "an invalid object" : `'${n}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const pm =
        "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      function mm(n) {
        return $(null == n ? void 0 : n[pm]);
      }
      function gm(n) {
        return xM(this, arguments, function* () {
          const t = n.getReader();
          try {
            for (;;) {
              const { value: i, done: r } = yield Oi(t.read());
              if (r) return yield Oi(void 0);
              yield yield Oi(i);
            }
          } finally {
            t.releaseLock();
          }
        });
      }
      function _m(n) {
        return $(null == n ? void 0 : n.getReader);
      }
      function qt(n) {
        if (n instanceof Se) return n;
        if (null != n) {
          if (dm(n))
            return (function (n) {
              return new Se((e) => {
                const t = n[$c]();
                if ($(t.subscribe)) return t.subscribe(e);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(n);
          if (Wc(n))
            return (function (n) {
              return new Se((e) => {
                for (let t = 0; t < n.length && !e.closed; t++) e.next(n[t]);
                e.complete();
              });
            })(n);
          if (um(n))
            return (function (n) {
              return new Se((e) => {
                n.then(
                  (t) => {
                    e.closed || (e.next(t), e.complete());
                  },
                  (t) => e.error(t)
                ).then(null, nm);
              });
            })(n);
          if (hm(n)) return ym(n);
          if (mm(n))
            return (function (n) {
              return new Se((e) => {
                for (const t of n) if ((e.next(t), e.closed)) return;
                e.complete();
              });
            })(n);
          if (_m(n))
            return (function (n) {
              return ym(gm(n));
            })(n);
        }
        throw fm(n);
      }
      function ym(n) {
        return new Se((e) => {
          (function (n, e) {
            var t, i, r, s;
            return (function (n, e, t, i) {
              return new (t || (t = Promise))(function (s, o) {
                function a(u) {
                  try {
                    c(i.next(u));
                  } catch (d) {
                    o(d);
                  }
                }
                function l(u) {
                  try {
                    c(i.throw(u));
                  } catch (d) {
                    o(d);
                  }
                }
                function c(u) {
                  u.done
                    ? s(u.value)
                    : (function (s) {
                        return s instanceof t
                          ? s
                          : new t(function (o) {
                              o(s);
                            });
                      })(u.value).then(a, l);
                }
                c((i = i.apply(n, e || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (t = SM(n); !(i = yield t.next()).done; )
                  if ((e.next(i.value), e.closed)) return;
              } catch (o) {
                r = { error: o };
              } finally {
                try {
                  i && !i.done && (s = t.return) && (yield s.call(t));
                } finally {
                  if (r) throw r.error;
                }
              }
              e.complete();
            });
          })(n, e).catch((t) => e.error(t));
        });
      }
      function oi(n, e, t, i = 0, r = !1) {
        const s = e.schedule(function () {
          t(), r ? n.add(this.schedule(null, i)) : this.unsubscribe();
        }, i);
        if ((n.add(s), !r)) return s;
      }
      function As(n, e, t = 1 / 0) {
        return $(e)
          ? As((i, r) => Et((s, o) => e(i, s, r, o))(qt(n(i, r))), t)
          : ("number" == typeof e && (t = e),
            Je((i, r) =>
              (function (n, e, t, i, r, s, o, a) {
                const l = [];
                let c = 0,
                  u = 0,
                  d = !1;
                const h = () => {
                    d && !l.length && !c && e.complete();
                  },
                  f = (g) => (c < i ? p(g) : l.push(g)),
                  p = (g) => {
                    c++;
                    let m = !1;
                    qt(t(g, u++)).subscribe(
                      new et(
                        e,
                        (y) => {
                          e.next(y);
                        },
                        () => {
                          m = !0;
                        },
                        void 0,
                        () => {
                          if (m)
                            try {
                              for (c--; l.length && c < i; ) {
                                const y = l.shift();
                                p(y);
                              }
                              h();
                            } catch (y) {
                              e.error(y);
                            }
                        }
                      )
                    );
                  };
                return (
                  n.subscribe(
                    new et(e, f, () => {
                      (d = !0), h();
                    })
                  ),
                  () => {}
                );
              })(i, r, n, t)
            ));
      }
      function vm(n = 1 / 0) {
        return As(ha, n);
      }
      const qc = new Se((n) => n.complete());
      function bm(n) {
        return n && $(n.schedule);
      }
      function Kc(n) {
        return n[n.length - 1];
      }
      function fa(n) {
        return bm(Kc(n)) ? n.pop() : void 0;
      }
      function Cm(n, e = 0) {
        return Je((t, i) => {
          t.subscribe(
            new et(
              i,
              (r) => oi(i, n, () => i.next(r), e),
              () => oi(i, n, () => i.complete(), e),
              (r) => oi(i, n, () => i.error(r), e)
            )
          );
        });
      }
      function Dm(n, e = 0) {
        return Je((t, i) => {
          i.add(n.schedule(() => t.subscribe(i), e));
        });
      }
      function Em(n, e) {
        if (!n) throw new Error("Iterable cannot be null");
        return new Se((t) => {
          oi(t, e, () => {
            const i = n[Symbol.asyncIterator]();
            oi(
              t,
              e,
              () => {
                i.next().then((r) => {
                  r.done ? t.complete() : t.next(r.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Rs(n, e) {
        return e
          ? (function (n, e) {
              if (null != n) {
                if (dm(n))
                  return (function (n, e) {
                    return qt(n).pipe(Dm(e), Cm(e));
                  })(n, e);
                if (Wc(n))
                  return (function (n, e) {
                    return new Se((t) => {
                      let i = 0;
                      return e.schedule(function () {
                        i === n.length
                          ? t.complete()
                          : (t.next(n[i++]), t.closed || this.schedule());
                      });
                    });
                  })(n, e);
                if (um(n))
                  return (function (n, e) {
                    return qt(n).pipe(Dm(e), Cm(e));
                  })(n, e);
                if (hm(n)) return Em(n, e);
                if (mm(n))
                  return (function (n, e) {
                    return new Se((t) => {
                      let i;
                      return (
                        oi(t, e, () => {
                          (i = n[pm]()),
                            oi(
                              t,
                              e,
                              () => {
                                let r, s;
                                try {
                                  ({ value: r, done: s } = i.next());
                                } catch (o) {
                                  return void t.error(o);
                                }
                                s ? t.complete() : t.next(r);
                              },
                              0,
                              !0
                            );
                        }),
                        () => $(null == i ? void 0 : i.return) && i.return()
                      );
                    });
                  })(n, e);
                if (_m(n))
                  return (function (n, e) {
                    return Em(gm(n), e);
                  })(n, e);
              }
              throw fm(n);
            })(n, e)
          : qt(n);
      }
      function pa(...n) {
        const e = fa(n),
          t = (function (n, e) {
            return "number" == typeof Kc(n) ? n.pop() : 1 / 0;
          })(n),
          i = n;
        return i.length ? (1 === i.length ? qt(i[0]) : vm(t)(Rs(i, e))) : qc;
      }
      function Os(n) {
        return n <= 0
          ? () => qc
          : Je((e, t) => {
              let i = 0;
              e.subscribe(
                new et(t, (r) => {
                  ++i <= n && (t.next(r), n <= i && t.complete());
                })
              );
            });
      }
      function wm(n = {}) {
        const {
          connector: e = () => new q(),
          resetOnError: t = !0,
          resetOnComplete: i = !0,
          resetOnRefCountZero: r = !0,
        } = n;
        return (s) => {
          let o = null,
            a = null,
            l = null,
            c = 0,
            u = !1,
            d = !1;
          const h = () => {
              null == a || a.unsubscribe(), (a = null);
            },
            f = () => {
              h(), (o = l = null), (u = d = !1);
            },
            p = () => {
              const g = o;
              f(), null == g || g.unsubscribe();
            };
          return Je((g, m) => {
            c++, !d && !u && h();
            const y = (l = null != l ? l : e());
            m.add(() => {
              c--, 0 === c && !d && !u && (a = Yc(p, r));
            }),
              y.subscribe(m),
              o ||
                ((o = new jc({
                  next: (_) => y.next(_),
                  error: (_) => {
                    (d = !0), h(), (a = Yc(f, t, _)), y.error(_);
                  },
                  complete: () => {
                    (u = !0), h(), (a = Yc(f, i)), y.complete();
                  },
                })),
                Rs(g).subscribe(o));
          })(s);
        };
      }
      function Yc(n, e, ...t) {
        return !0 === e
          ? (n(), null)
          : !1 === e
          ? null
          : e(...t)
              .pipe(Os(1))
              .subscribe(() => n());
      }
      function he(n) {
        for (let e in n) if (n[e] === he) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function Qc(n, e) {
        for (const t in e)
          e.hasOwnProperty(t) && !n.hasOwnProperty(t) && (n[t] = e[t]);
      }
      function K(n) {
        if ("string" == typeof n) return n;
        if (Array.isArray(n)) return "[" + n.map(K).join(", ") + "]";
        if (null == n) return "" + n;
        if (n.overriddenName) return `${n.overriddenName}`;
        if (n.name) return `${n.name}`;
        const e = n.toString();
        if (null == e) return "" + e;
        const t = e.indexOf("\n");
        return -1 === t ? e : e.substring(0, t);
      }
      function Xc(n, e) {
        return null == n || "" === n
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? n
          : n + " " + e;
      }
      const WM = he({ __forward_ref__: he });
      function ae(n) {
        return (
          (n.__forward_ref__ = ae),
          (n.toString = function () {
            return K(this());
          }),
          n
        );
      }
      function k(n) {
        return (function (n) {
          return (
            "function" == typeof n &&
            n.hasOwnProperty(WM) &&
            n.__forward_ref__ === ae
          );
        })(n)
          ? n()
          : n;
      }
      class Pi extends Error {
        constructor(e, t) {
          super(
            (function (n, e) {
              return `${n ? `NG0${n}: ` : ""}${e}`;
            })(e, t)
          ),
            (this.code = e);
        }
      }
      function U(n) {
        return "string" == typeof n ? n : null == n ? "" : String(n);
      }
      function ht(n) {
        return "function" == typeof n
          ? n.name || n.toString()
          : "object" == typeof n && null != n && "function" == typeof n.type
          ? n.type.name || n.type.toString()
          : U(n);
      }
      function ma(n, e) {
        const t = e ? ` in ${e}` : "";
        throw new Pi("201", `No provider for ${ht(n)} found${t}`);
      }
      function Ot(n, e) {
        null == n &&
          (function (n, e, t, i) {
            throw new Error(
              `ASSERTION ERROR: ${n}` +
                (null == i ? "" : ` [Expected=> ${t} ${i} ${e} <=Actual]`)
            );
          })(e, n, null, "!=");
      }
      function I(n) {
        return {
          token: n.token,
          providedIn: n.providedIn || null,
          factory: n.factory,
          value: void 0,
        };
      }
      function pe(n) {
        return { providers: n.providers || [], imports: n.imports || [] };
      }
      function $n(n) {
        return xm(n, ga) || xm(n, Im);
      }
      function xm(n, e) {
        return n.hasOwnProperty(e) ? n[e] : null;
      }
      function Sm(n) {
        return n && (n.hasOwnProperty(Jc) || n.hasOwnProperty(JM))
          ? n[Jc]
          : null;
      }
      const ga = he({ ɵprov: he }),
        Jc = he({ ɵinj: he }),
        Im = he({ ngInjectableDef: he }),
        JM = he({ ngInjectorDef: he });
      var F = (() => (
        ((F = F || {})[(F.Default = 0)] = "Default"),
        (F[(F.Host = 1)] = "Host"),
        (F[(F.Self = 2)] = "Self"),
        (F[(F.SkipSelf = 4)] = "SkipSelf"),
        (F[(F.Optional = 8)] = "Optional"),
        F
      ))();
      let eu;
      function ai(n) {
        const e = eu;
        return (eu = n), e;
      }
      function km(n, e, t) {
        const i = $n(n);
        return i && "root" == i.providedIn
          ? void 0 === i.value
            ? (i.value = i.factory())
            : i.value
          : t & F.Optional
          ? null
          : void 0 !== e
          ? e
          : void ma(K(n), "Injector");
      }
      function li(n) {
        return { toString: n }.toString();
      }
      var Kt = (() => (
          ((Kt = Kt || {})[(Kt.OnPush = 0)] = "OnPush"),
          (Kt[(Kt.Default = 1)] = "Default"),
          Kt
        ))(),
        wt = (() => {
          return (
            ((n = wt || (wt = {}))[(n.Emulated = 0)] = "Emulated"),
            (n[(n.None = 2)] = "None"),
            (n[(n.ShadowDom = 3)] = "ShadowDom"),
            wt
          );
          var n;
        })();
      const tx = "undefined" != typeof globalThis && globalThis,
        nx = "undefined" != typeof window && window,
        ix =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        le = tx || ("undefined" != typeof global && global) || nx || ix,
        yr = {},
        me = [],
        _a = he({ ɵcmp: he }),
        tu = he({ ɵdir: he }),
        nu = he({ ɵpipe: he }),
        Tm = he({ ɵmod: he }),
        Gn = he({ ɵfac: he }),
        Ps = he({ __NG_ELEMENT_ID__: he });
      let rx = 0;
      function Sn(n) {
        return li(() => {
          const t = {},
            i = {
              type: n.type,
              providersResolver: null,
              decls: n.decls,
              vars: n.vars,
              factory: null,
              template: n.template || null,
              consts: n.consts || null,
              ngContentSelectors: n.ngContentSelectors,
              hostBindings: n.hostBindings || null,
              hostVars: n.hostVars || 0,
              hostAttrs: n.hostAttrs || null,
              contentQueries: n.contentQueries || null,
              declaredInputs: t,
              inputs: null,
              outputs: null,
              exportAs: n.exportAs || null,
              onPush: n.changeDetection === Kt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: n.selectors || me,
              viewQuery: n.viewQuery || null,
              features: n.features || null,
              data: n.data || {},
              encapsulation: n.encapsulation || wt.Emulated,
              id: "c",
              styles: n.styles || me,
              _: null,
              setInput: null,
              schemas: n.schemas || null,
              tView: null,
            },
            r = n.directives,
            s = n.features,
            o = n.pipes;
          return (
            (i.id += rx++),
            (i.inputs = Pm(n.inputs, t)),
            (i.outputs = Pm(n.outputs)),
            s && s.forEach((a) => a(i)),
            (i.directiveDefs = r
              ? () => ("function" == typeof r ? r() : r).map(Am)
              : null),
            (i.pipeDefs = o
              ? () => ("function" == typeof o ? o() : o).map(Rm)
              : null),
            i
          );
        });
      }
      function Am(n) {
        return (
          tt(n) ||
          (function (n) {
            return n[tu] || null;
          })(n)
        );
      }
      function Rm(n) {
        return (function (n) {
          return n[nu] || null;
        })(n);
      }
      const Om = {};
      function be(n) {
        return li(() => {
          const e = {
            type: n.type,
            bootstrap: n.bootstrap || me,
            declarations: n.declarations || me,
            imports: n.imports || me,
            exports: n.exports || me,
            transitiveCompileScopes: null,
            schemas: n.schemas || null,
            id: n.id || null,
          };
          return null != n.id && (Om[n.id] = n.type), e;
        });
      }
      function Pm(n, e) {
        if (null == n) return yr;
        const t = {};
        for (const i in n)
          if (n.hasOwnProperty(i)) {
            let r = n[i],
              s = r;
            Array.isArray(r) && ((s = r[1]), (r = r[0])),
              (t[r] = i),
              e && (e[r] = s);
          }
        return t;
      }
      const O = Sn;
      function tt(n) {
        return n[_a] || null;
      }
      function Yt(n, e) {
        const t = n[Tm] || null;
        if (!t && !0 === e)
          throw new Error(`Type ${K(n)} does not have '\u0275mod' property.`);
        return t;
      }
      const G = 11;
      function In(n) {
        return Array.isArray(n) && "object" == typeof n[1];
      }
      function un(n) {
        return Array.isArray(n) && !0 === n[1];
      }
      function su(n) {
        return 0 != (8 & n.flags);
      }
      function Ca(n) {
        return 2 == (2 & n.flags);
      }
      function Da(n) {
        return 1 == (1 & n.flags);
      }
      function dn(n) {
        return null !== n.template;
      }
      function ux(n) {
        return 0 != (512 & n[2]);
      }
      function Bi(n, e) {
        return n.hasOwnProperty(Gn) ? n[Gn] : null;
      }
      class Nm {
        constructor(e, t, i) {
          (this.previousValue = e),
            (this.currentValue = t),
            (this.firstChange = i);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function ft() {
        return Lm;
      }
      function Lm(n) {
        return n.type.prototype.ngOnChanges && (n.setInput = px), fx;
      }
      function fx() {
        const n = Bm(this),
          e = null == n ? void 0 : n.current;
        if (e) {
          const t = n.previous;
          if (t === yr) n.previous = e;
          else for (let i in e) t[i] = e[i];
          (n.current = null), this.ngOnChanges(e);
        }
      }
      function px(n, e, t, i) {
        const r =
            Bm(n) ||
            (function (n, e) {
              return (n[Vm] = e);
            })(n, { previous: yr, current: null }),
          s = r.current || (r.current = {}),
          o = r.previous,
          a = this.declaredInputs[t],
          l = o[a];
        (s[a] = new Nm(l && l.currentValue, e, o === yr)), (n[i] = e);
      }
      ft.ngInherit = !0;
      const Vm = "__ngSimpleChanges__";
      function Bm(n) {
        return n[Vm] || null;
      }
      const Hm = "http://www.w3.org/2000/svg";
      let lu;
      function Ie(n) {
        return !!n.listen;
      }
      const Um = {
        createRenderer: (n, e) =>
          void 0 !== lu
            ? lu
            : "undefined" != typeof document
            ? document
            : void 0,
      };
      function Ne(n) {
        for (; Array.isArray(n); ) n = n[0];
        return n;
      }
      function Ea(n, e) {
        return Ne(e[n]);
      }
      function Zt(n, e) {
        return Ne(e[n.index]);
      }
      function uu(n, e) {
        return n.data[e];
      }
      function Ft(n, e) {
        const t = e[n];
        return In(t) ? t : t[0];
      }
      function zm(n) {
        return 4 == (4 & n[2]);
      }
      function du(n) {
        return 128 == (128 & n[2]);
      }
      function ui(n, e) {
        return null == e ? null : n[e];
      }
      function $m(n) {
        n[18] = 0;
      }
      function hu(n, e) {
        n[5] += e;
        let t = n,
          i = n[3];
        for (
          ;
          null !== i && ((1 === e && 1 === t[5]) || (-1 === e && 0 === t[5]));

        )
          (i[5] += e), (t = i), (i = i[3]);
      }
      const V = {
        lFrame: Zm(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1,
      };
      function Gm() {
        return V.bindingsEnabled;
      }
      function C() {
        return V.lFrame.lView;
      }
      function J() {
        return V.lFrame.tView;
      }
      function Nt(n) {
        return (V.lFrame.contextLView = n), n[8];
      }
      function je() {
        let n = Wm();
        for (; null !== n && 64 === n.type; ) n = n.parent;
        return n;
      }
      function Wm() {
        return V.lFrame.currentTNode;
      }
      function kn(n, e) {
        const t = V.lFrame;
        (t.currentTNode = n), (t.isParent = e);
      }
      function fu() {
        return V.lFrame.isParent;
      }
      function pu() {
        V.lFrame.isParent = !1;
      }
      function wa() {
        return V.isInCheckNoChangesMode;
      }
      function Ma(n) {
        V.isInCheckNoChangesMode = n;
      }
      function pt() {
        const n = V.lFrame;
        let e = n.bindingRootIndex;
        return (
          -1 === e && (e = n.bindingRootIndex = n.tView.bindingStartIndex), e
        );
      }
      function wr() {
        return V.lFrame.bindingIndex++;
      }
      function kx(n, e) {
        const t = V.lFrame;
        (t.bindingIndex = t.bindingRootIndex = n), mu(e);
      }
      function mu(n) {
        V.lFrame.currentDirectiveIndex = n;
      }
      function Ym() {
        return V.lFrame.currentQueryIndex;
      }
      function _u(n) {
        V.lFrame.currentQueryIndex = n;
      }
      function Ax(n) {
        const e = n[1];
        return 2 === e.type ? e.declTNode : 1 === e.type ? n[6] : null;
      }
      function Qm(n, e, t) {
        if (t & F.SkipSelf) {
          let r = e,
            s = n;
          for (
            ;
            !((r = r.parent),
            null !== r ||
              t & F.Host ||
              ((r = Ax(s)), null === r || ((s = s[15]), 10 & r.type)));

          );
          if (null === r) return !1;
          (e = r), (n = s);
        }
        const i = (V.lFrame = Xm());
        return (i.currentTNode = e), (i.lView = n), !0;
      }
      function xa(n) {
        const e = Xm(),
          t = n[1];
        (V.lFrame = e),
          (e.currentTNode = t.firstChild),
          (e.lView = n),
          (e.tView = t),
          (e.contextLView = n),
          (e.bindingIndex = t.bindingStartIndex),
          (e.inI18n = !1);
      }
      function Xm() {
        const n = V.lFrame,
          e = null === n ? null : n.child;
        return null === e ? Zm(n) : e;
      }
      function Zm(n) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: n,
          child: null,
          inI18n: !1,
        };
        return null !== n && (n.child = e), e;
      }
      function Jm() {
        const n = V.lFrame;
        return (
          (V.lFrame = n.parent), (n.currentTNode = null), (n.lView = null), n
        );
      }
      const eg = Jm;
      function Sa() {
        const n = Jm();
        (n.isParent = !0),
          (n.tView = null),
          (n.selectedIndex = -1),
          (n.contextLView = null),
          (n.elementDepthCount = 0),
          (n.currentDirectiveIndex = -1),
          (n.currentNamespace = null),
          (n.bindingRootIndex = -1),
          (n.bindingIndex = -1),
          (n.currentQueryIndex = 0);
      }
      function mt() {
        return V.lFrame.selectedIndex;
      }
      function di(n) {
        V.lFrame.selectedIndex = n;
      }
      function ke() {
        const n = V.lFrame;
        return uu(n.tView, n.selectedIndex);
      }
      function yu() {
        V.lFrame.currentNamespace = Hm;
      }
      function Ia(n, e) {
        for (let t = e.directiveStart, i = e.directiveEnd; t < i; t++) {
          const s = n.data[t].type.prototype,
            {
              ngAfterContentInit: o,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: c,
              ngOnDestroy: u,
            } = s;
          o && (n.contentHooks || (n.contentHooks = [])).push(-t, o),
            a &&
              ((n.contentHooks || (n.contentHooks = [])).push(t, a),
              (n.contentCheckHooks || (n.contentCheckHooks = [])).push(t, a)),
            l && (n.viewHooks || (n.viewHooks = [])).push(-t, l),
            c &&
              ((n.viewHooks || (n.viewHooks = [])).push(t, c),
              (n.viewCheckHooks || (n.viewCheckHooks = [])).push(t, c)),
            null != u && (n.destroyHooks || (n.destroyHooks = [])).push(t, u);
        }
      }
      function ka(n, e, t) {
        ng(n, e, 3, t);
      }
      function Ta(n, e, t, i) {
        (3 & n[2]) === t && ng(n, e, t, i);
      }
      function vu(n, e) {
        let t = n[2];
        (3 & t) === e && ((t &= 2047), (t += 1), (n[2] = t));
      }
      function ng(n, e, t, i) {
        const s = null != i ? i : -1,
          o = e.length - 1;
        let a = 0;
        for (let l = void 0 !== i ? 65535 & n[18] : 0; l < o; l++)
          if ("number" == typeof e[l + 1]) {
            if (((a = e[l]), null != i && a >= i)) break;
          } else
            e[l] < 0 && (n[18] += 65536),
              (a < s || -1 == s) &&
                (Vx(n, t, e, l), (n[18] = (4294901760 & n[18]) + l + 2)),
              l++;
      }
      function Vx(n, e, t, i) {
        const r = t[i] < 0,
          s = t[i + 1],
          a = n[r ? -t[i] : t[i]];
        if (r) {
          if (n[2] >> 11 < n[18] >> 16 && (3 & n[2]) === e) {
            n[2] += 2048;
            try {
              s.call(a);
            } finally {
            }
          }
        } else
          try {
            s.call(a);
          } finally {
          }
      }
      class Bs {
        constructor(e, t, i) {
          (this.factory = e),
            (this.resolving = !1),
            (this.canSeeViewProviders = t),
            (this.injectImpl = i);
        }
      }
      function Aa(n, e, t) {
        const i = Ie(n);
        let r = 0;
        for (; r < t.length; ) {
          const s = t[r];
          if ("number" == typeof s) {
            if (0 !== s) break;
            r++;
            const o = t[r++],
              a = t[r++],
              l = t[r++];
            i ? n.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l);
          } else {
            const o = s,
              a = t[++r];
            Cu(o)
              ? i && n.setProperty(e, o, a)
              : i
              ? n.setAttribute(e, o, a)
              : e.setAttribute(o, a),
              r++;
          }
        }
        return r;
      }
      function ig(n) {
        return 3 === n || 4 === n || 6 === n;
      }
      function Cu(n) {
        return 64 === n.charCodeAt(0);
      }
      function Ra(n, e) {
        if (null !== e && 0 !== e.length)
          if (null === n || 0 === n.length) n = e.slice();
          else {
            let t = -1;
            for (let i = 0; i < e.length; i++) {
              const r = e[i];
              "number" == typeof r
                ? (t = r)
                : 0 === t ||
                  rg(n, t, r, null, -1 === t || 2 === t ? e[++i] : null);
            }
          }
        return n;
      }
      function rg(n, e, t, i, r) {
        let s = 0,
          o = n.length;
        if (-1 === e) o = -1;
        else
          for (; s < n.length; ) {
            const a = n[s++];
            if ("number" == typeof a) {
              if (a === e) {
                o = -1;
                break;
              }
              if (a > e) {
                o = s - 1;
                break;
              }
            }
          }
        for (; s < n.length; ) {
          const a = n[s];
          if ("number" == typeof a) break;
          if (a === t) {
            if (null === i) return void (null !== r && (n[s + 1] = r));
            if (i === n[s + 1]) return void (n[s + 2] = r);
          }
          s++, null !== i && s++, null !== r && s++;
        }
        -1 !== o && (n.splice(o, 0, e), (s = o + 1)),
          n.splice(s++, 0, t),
          null !== i && n.splice(s++, 0, i),
          null !== r && n.splice(s++, 0, r);
      }
      function sg(n) {
        return -1 !== n;
      }
      function Mr(n) {
        return 32767 & n;
      }
      function xr(n, e) {
        let t = (function (n) {
            return n >> 16;
          })(n),
          i = e;
        for (; t > 0; ) (i = i[15]), t--;
        return i;
      }
      let Du = !0;
      function Oa(n) {
        const e = Du;
        return (Du = n), e;
      }
      let $x = 0;
      function js(n, e) {
        const t = wu(n, e);
        if (-1 !== t) return t;
        const i = e[1];
        i.firstCreatePass &&
          ((n.injectorIndex = e.length),
          Eu(i.data, n),
          Eu(e, null),
          Eu(i.blueprint, null));
        const r = Pa(n, e),
          s = n.injectorIndex;
        if (sg(r)) {
          const o = Mr(r),
            a = xr(r, e),
            l = a[1].data;
          for (let c = 0; c < 8; c++) e[s + c] = a[o + c] | l[o + c];
        }
        return (e[s + 8] = r), s;
      }
      function Eu(n, e) {
        n.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function wu(n, e) {
        return -1 === n.injectorIndex ||
          (n.parent && n.parent.injectorIndex === n.injectorIndex) ||
          null === e[n.injectorIndex + 8]
          ? -1
          : n.injectorIndex;
      }
      function Pa(n, e) {
        if (n.parent && -1 !== n.parent.injectorIndex)
          return n.parent.injectorIndex;
        let t = 0,
          i = null,
          r = e;
        for (; null !== r; ) {
          const s = r[1],
            o = s.type;
          if (((i = 2 === o ? s.declTNode : 1 === o ? r[6] : null), null === i))
            return -1;
          if ((t++, (r = r[15]), -1 !== i.injectorIndex))
            return i.injectorIndex | (t << 16);
        }
        return -1;
      }
      function Fa(n, e, t) {
        !(function (n, e, t) {
          let i;
          "string" == typeof t
            ? (i = t.charCodeAt(0) || 0)
            : t.hasOwnProperty(Ps) && (i = t[Ps]),
            null == i && (i = t[Ps] = $x++);
          const r = 255 & i;
          e.data[n + (r >> 5)] |= 1 << r;
        })(n, e, t);
      }
      function lg(n, e, t) {
        if (t & F.Optional) return n;
        ma(e, "NodeInjector");
      }
      function cg(n, e, t, i) {
        if (
          (t & F.Optional && void 0 === i && (i = null),
          0 == (t & (F.Self | F.Host)))
        ) {
          const r = n[9],
            s = ai(void 0);
          try {
            return r ? r.get(e, i, t & F.Optional) : km(e, i, t & F.Optional);
          } finally {
            ai(s);
          }
        }
        return lg(i, e, t);
      }
      function ug(n, e, t, i = F.Default, r) {
        if (null !== n) {
          const s = (function (n) {
            if ("string" == typeof n) return n.charCodeAt(0) || 0;
            const e = n.hasOwnProperty(Ps) ? n[Ps] : void 0;
            return "number" == typeof e ? (e >= 0 ? 255 & e : qx) : e;
          })(t);
          if ("function" == typeof s) {
            if (!Qm(e, n, i)) return i & F.Host ? lg(r, t, i) : cg(e, t, i, r);
            try {
              const o = s(i);
              if (null != o || i & F.Optional) return o;
              ma(t);
            } finally {
              eg();
            }
          } else if ("number" == typeof s) {
            let o = null,
              a = wu(n, e),
              l = -1,
              c = i & F.Host ? e[16][6] : null;
            for (
              (-1 === a || i & F.SkipSelf) &&
              ((l = -1 === a ? Pa(n, e) : e[a + 8]),
              -1 !== l && fg(i, !1)
                ? ((o = e[1]), (a = Mr(l)), (e = xr(l, e)))
                : (a = -1));
              -1 !== a;

            ) {
              const u = e[1];
              if (hg(s, a, u.data)) {
                const d = Kx(a, e, t, o, i, c);
                if (d !== dg) return d;
              }
              (l = e[a + 8]),
                -1 !== l && fg(i, e[1].data[a + 8] === c) && hg(s, a, e)
                  ? ((o = u), (a = Mr(l)), (e = xr(l, e)))
                  : (a = -1);
            }
          }
        }
        return cg(e, t, i, r);
      }
      const dg = {};
      function qx() {
        return new Sr(je(), C());
      }
      function Kx(n, e, t, i, r, s) {
        const o = e[1],
          a = o.data[n + 8],
          u = Na(
            a,
            o,
            t,
            null == i ? Ca(a) && Du : i != o && 0 != (3 & a.type),
            r & F.Host && s === a
          );
        return null !== u ? Us(e, o, u, a) : dg;
      }
      function Na(n, e, t, i, r) {
        const s = n.providerIndexes,
          o = e.data,
          a = 1048575 & s,
          l = n.directiveStart,
          u = s >> 20,
          h = r ? a + u : n.directiveEnd;
        for (let f = i ? a : a + u; f < h; f++) {
          const p = o[f];
          if ((f < l && t === p) || (f >= l && p.type === t)) return f;
        }
        if (r) {
          const f = o[l];
          if (f && dn(f) && f.type === t) return l;
        }
        return null;
      }
      function Us(n, e, t, i) {
        let r = n[t];
        const s = e.data;
        if (
          (function (n) {
            return n instanceof Bs;
          })(r)
        ) {
          const o = r;
          o.resolving &&
            (function (n, e) {
              throw new Pi(
                "200",
                `Circular dependency in DI detected for ${n}`
              );
            })(ht(s[t]));
          const a = Oa(o.canSeeViewProviders);
          o.resolving = !0;
          const l = o.injectImpl ? ai(o.injectImpl) : null;
          Qm(n, i, F.Default);
          try {
            (r = n[t] = o.factory(void 0, s, n, i)),
              e.firstCreatePass &&
                t >= i.directiveStart &&
                (function (n, e, t) {
                  const {
                    ngOnChanges: i,
                    ngOnInit: r,
                    ngDoCheck: s,
                  } = e.type.prototype;
                  if (i) {
                    const o = Lm(e);
                    (t.preOrderHooks || (t.preOrderHooks = [])).push(n, o),
                      (
                        t.preOrderCheckHooks || (t.preOrderCheckHooks = [])
                      ).push(n, o);
                  }
                  r &&
                    (t.preOrderHooks || (t.preOrderHooks = [])).push(0 - n, r),
                    s &&
                      ((t.preOrderHooks || (t.preOrderHooks = [])).push(n, s),
                      (
                        t.preOrderCheckHooks || (t.preOrderCheckHooks = [])
                      ).push(n, s));
                })(t, s[t], e);
          } finally {
            null !== l && ai(l), Oa(a), (o.resolving = !1), eg();
          }
        }
        return r;
      }
      function hg(n, e, t) {
        return !!(t[e + (n >> 5)] & (1 << n));
      }
      function fg(n, e) {
        return !(n & F.Self || (n & F.Host && e));
      }
      class Sr {
        constructor(e, t) {
          (this._tNode = e), (this._lView = t);
        }
        get(e, t, i) {
          return ug(this._tNode, this._lView, e, i, t);
        }
      }
      function Ir(n) {
        return (function (n, e) {
          if ("class" === e) return n.classes;
          if ("style" === e) return n.styles;
          const t = n.attrs;
          if (t) {
            const i = t.length;
            let r = 0;
            for (; r < i; ) {
              const s = t[r];
              if (ig(s)) break;
              if (0 === s) r += 2;
              else if ("number" == typeof s)
                for (r++; r < i && "string" == typeof t[r]; ) r++;
              else {
                if (s === e) return t[r + 1];
                r += 2;
              }
            }
          }
          return null;
        })(je(), n);
      }
      const Tr = "__parameters__";
      function Hi(n, e, t) {
        return li(() => {
          const i = (function (n) {
            return function (...t) {
              if (n) {
                const i = n(...t);
                for (const r in i) this[r] = i[r];
              }
            };
          })(e);
          function r(...s) {
            if (this instanceof r) return i.apply(this, s), this;
            const o = new r(...s);
            return (a.annotation = o), a;
            function a(l, c, u) {
              const d = l.hasOwnProperty(Tr)
                ? l[Tr]
                : Object.defineProperty(l, Tr, { value: [] })[Tr];
              for (; d.length <= u; ) d.push(null);
              return (d[u] = d[u] || []).push(o), l;
            }
          }
          return (
            t && (r.prototype = Object.create(t.prototype)),
            (r.prototype.ngMetadataName = n),
            (r.annotationCls = r),
            r
          );
        });
      }
      class x {
        constructor(e, t) {
          (this._desc = e),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof t
              ? (this.__NG_ELEMENT_ID__ = t)
              : void 0 !== t &&
                (this.ɵprov = I({
                  token: this,
                  providedIn: t.providedIn || "root",
                  factory: t.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function Jt(n, e) {
        void 0 === e && (e = n);
        for (let t = 0; t < n.length; t++) {
          let i = n[t];
          Array.isArray(i)
            ? (e === n && (e = n.slice(0, t)), Jt(i, e))
            : e !== n && e.push(i);
        }
        return e;
      }
      function Tn(n, e) {
        n.forEach((t) => (Array.isArray(t) ? Tn(t, e) : e(t)));
      }
      function La(n, e, t) {
        e >= n.length ? n.push(t) : n.splice(e, 0, t);
      }
      function ji(n, e) {
        return e >= n.length - 1 ? n.pop() : n.splice(e, 1)[0];
      }
      function fi(n, e) {
        const t = [];
        for (let i = 0; i < n; i++) t.push(e);
        return t;
      }
      function Lt(n, e, t) {
        let i = Rr(n, e);
        return (
          i >= 0
            ? (n[1 | i] = t)
            : ((i = ~i),
              (function (n, e, t, i) {
                let r = n.length;
                if (r == e) n.push(t, i);
                else if (1 === r) n.push(i, n[0]), (n[0] = t);
                else {
                  for (r--, n.push(n[r - 1], n[r]); r > e; )
                    (n[r] = n[r - 2]), r--;
                  (n[e] = t), (n[e + 1] = i);
                }
              })(n, i, e, t)),
          i
        );
      }
      function Iu(n, e) {
        const t = Rr(n, e);
        if (t >= 0) return n[1 | t];
      }
      function Rr(n, e) {
        return (function (n, e, t) {
          let i = 0,
            r = n.length >> t;
          for (; r !== i; ) {
            const s = i + ((r - i) >> 1),
              o = n[s << t];
            if (e === o) return s << t;
            o > e ? (r = s) : (i = s + 1);
          }
          return ~(r << t);
        })(n, e, 1);
      }
      const qs = {},
        Tu = "__NG_DI_FLAG__",
        Or = "ngTempTokenPath",
        aS = /\n/gm,
        Au = "__source",
        Ru = he({ provide: String, useValue: he });
      let Ks;
      function Pr(n) {
        const e = Ks;
        return (Ks = n), e;
      }
      function cS(n, e = F.Default) {
        if (void 0 === Ks)
          throw new Error("inject() must be called from an injection context");
        return null === Ks
          ? km(n, void 0, e)
          : Ks.get(n, e & F.Optional ? null : void 0, e);
      }
      function b(n, e = F.Default) {
        return (eu || cS)(k(n), e);
      }
      const Ou = b;
      function Ui(n) {
        const e = [];
        for (let t = 0; t < n.length; t++) {
          const i = k(n[t]);
          if (Array.isArray(i)) {
            if (0 === i.length)
              throw new Error("Arguments array must have arguments.");
            let r,
              s = F.Default;
            for (let o = 0; o < i.length; o++) {
              const a = i[o],
                l = uS(a);
              "number" == typeof l
                ? -1 === l
                  ? (r = a.token)
                  : (s |= l)
                : (r = a);
            }
            e.push(b(r, s));
          } else e.push(b(i));
        }
        return e;
      }
      function Ys(n, e) {
        return (n[Tu] = e), (n.prototype[Tu] = e), n;
      }
      function uS(n) {
        return n[Tu];
      }
      function yg(n, e, t, i) {
        const r = n[Or];
        throw (
          (e[Au] && r.unshift(e[Au]),
          (n.message = (function (n, e, t, i = null) {
            n =
              n && "\n" === n.charAt(0) && "\u0275" == n.charAt(1)
                ? n.substr(2)
                : n;
            let r = K(e);
            if (Array.isArray(e)) r = e.map(K).join(" -> ");
            else if ("object" == typeof e) {
              let s = [];
              for (let o in e)
                if (e.hasOwnProperty(o)) {
                  let a = e[o];
                  s.push(
                    o + ":" + ("string" == typeof a ? JSON.stringify(a) : K(a))
                  );
                }
              r = `{${s.join(", ")}}`;
            }
            return `${t}${i ? "(" + i + ")" : ""}[${r}]: ${n.replace(
              aS,
              "\n  "
            )}`;
          })("\n" + n.message, r, t, i)),
          (n.ngTokenPath = r),
          (n[Or] = null),
          n)
        );
      }
      const Qs = Ys(
          Hi("Inject", (n) => ({ token: n })),
          -1
        ),
        Vt = Ys(Hi("Optional"), 8),
        pi = Ys(Hi("SkipSelf"), 4);
      let ja;
      function Nr(n) {
        var e;
        return (
          (null ==
          (e = (function () {
            if (void 0 === ja && ((ja = null), le.trustedTypes))
              try {
                ja = le.trustedTypes.createPolicy("angular", {
                  createHTML: (n) => n,
                  createScript: (n) => n,
                  createScriptURL: (n) => n,
                });
              } catch (n) {}
            return ja;
          })())
            ? void 0
            : e.createHTML(n)) || n
        );
      }
      class zi {
        constructor(e) {
          this.changingThisBreaksApplicationSecurity = e;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      class CS extends zi {
        getTypeName() {
          return "HTML";
        }
      }
      class DS extends zi {
        getTypeName() {
          return "Style";
        }
      }
      class ES extends zi {
        getTypeName() {
          return "Script";
        }
      }
      class wS extends zi {
        getTypeName() {
          return "URL";
        }
      }
      class MS extends zi {
        getTypeName() {
          return "ResourceURL";
        }
      }
      function Bt(n) {
        return n instanceof zi ? n.changingThisBreaksApplicationSecurity : n;
      }
      function An(n, e) {
        const t = xg(n);
        if (null != t && t !== e) {
          if ("ResourceURL" === t && "URL" === e) return !0;
          throw new Error(
            `Required a safe ${e}, got a ${t} (see https://g.co/ng/security#xss)`
          );
        }
        return t === e;
      }
      function xg(n) {
        return (n instanceof zi && n.getTypeName()) || null;
      }
      class AS {
        constructor(e) {
          this.inertDocumentHelper = e;
        }
        getInertBodyElement(e) {
          e = "<body><remove></remove>" + e;
          try {
            const t = new window.DOMParser().parseFromString(
              Nr(e),
              "text/html"
            ).body;
            return null === t
              ? this.inertDocumentHelper.getInertBodyElement(e)
              : (t.removeChild(t.firstChild), t);
          } catch (t) {
            return null;
          }
        }
      }
      class RS {
        constructor(e) {
          if (
            ((this.defaultDoc = e),
            (this.inertDocument =
              this.defaultDoc.implementation.createHTMLDocument(
                "sanitization-inert"
              )),
            null == this.inertDocument.body)
          ) {
            const t = this.inertDocument.createElement("html");
            this.inertDocument.appendChild(t);
            const i = this.inertDocument.createElement("body");
            t.appendChild(i);
          }
        }
        getInertBodyElement(e) {
          const t = this.inertDocument.createElement("template");
          if ("content" in t) return (t.innerHTML = Nr(e)), t;
          const i = this.inertDocument.createElement("body");
          return (
            (i.innerHTML = Nr(e)),
            this.defaultDoc.documentMode && this.stripCustomNsAttrs(i),
            i
          );
        }
        stripCustomNsAttrs(e) {
          const t = e.attributes;
          for (let r = t.length - 1; 0 < r; r--) {
            const o = t.item(r).name;
            ("xmlns:ns1" === o || 0 === o.indexOf("ns1:")) &&
              e.removeAttribute(o);
          }
          let i = e.firstChild;
          for (; i; )
            i.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(i),
              (i = i.nextSibling);
        }
      }
      const PS =
          /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        FS =
          /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function Zs(n) {
        return (n = String(n)).match(PS) || n.match(FS) ? n : "unsafe:" + n;
      }
      function Rn(n) {
        const e = {};
        for (const t of n.split(",")) e[t] = !0;
        return e;
      }
      function Js(...n) {
        const e = {};
        for (const t of n)
          for (const i in t) t.hasOwnProperty(i) && (e[i] = !0);
        return e;
      }
      const kg = Rn("area,br,col,hr,img,wbr"),
        Tg = Rn("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        Ag = Rn("rp,rt"),
        Lu = Js(
          kg,
          Js(
            Tg,
            Rn(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          Js(
            Ag,
            Rn(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          Js(Ag, Tg)
        ),
        Vu = Rn("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        Bu = Rn("srcset"),
        Rg = Js(
          Vu,
          Bu,
          Rn(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          Rn(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        NS = Rn("script,style,template");
      class LS {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(e) {
          let t = e.firstChild,
            i = !0;
          for (; t; )
            if (
              (t.nodeType === Node.ELEMENT_NODE
                ? (i = this.startElement(t))
                : t.nodeType === Node.TEXT_NODE
                ? this.chars(t.nodeValue)
                : (this.sanitizedSomething = !0),
              i && t.firstChild)
            )
              t = t.firstChild;
            else
              for (; t; ) {
                t.nodeType === Node.ELEMENT_NODE && this.endElement(t);
                let r = this.checkClobberedElement(t, t.nextSibling);
                if (r) {
                  t = r;
                  break;
                }
                t = this.checkClobberedElement(t, t.parentNode);
              }
          return this.buf.join("");
        }
        startElement(e) {
          const t = e.nodeName.toLowerCase();
          if (!Lu.hasOwnProperty(t))
            return (this.sanitizedSomething = !0), !NS.hasOwnProperty(t);
          this.buf.push("<"), this.buf.push(t);
          const i = e.attributes;
          for (let r = 0; r < i.length; r++) {
            const s = i.item(r),
              o = s.name,
              a = o.toLowerCase();
            if (!Rg.hasOwnProperty(a)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let l = s.value;
            Vu[a] && (l = Zs(l)),
              Bu[a] &&
                ((n = l),
                (l = (n = String(n))
                  .split(",")
                  .map((e) => Zs(e.trim()))
                  .join(", "))),
              this.buf.push(" ", o, '="', Og(l), '"');
          }
          var n;
          return this.buf.push(">"), !0;
        }
        endElement(e) {
          const t = e.nodeName.toLowerCase();
          Lu.hasOwnProperty(t) &&
            !kg.hasOwnProperty(t) &&
            (this.buf.push("</"), this.buf.push(t), this.buf.push(">"));
        }
        chars(e) {
          this.buf.push(Og(e));
        }
        checkClobberedElement(e, t) {
          if (
            t &&
            (e.compareDocumentPosition(t) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${e.outerHTML}`
            );
          return t;
        }
      }
      const VS = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        BS = /([^\#-~ |!])/g;
      function Og(n) {
        return n
          .replace(/&/g, "&amp;")
          .replace(VS, function (e) {
            return (
              "&#" +
              (1024 * (e.charCodeAt(0) - 55296) +
                (e.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(BS, function (e) {
            return "&#" + e.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      let za;
      function Pg(n, e) {
        let t = null;
        try {
          za =
            za ||
            (function (n) {
              const e = new RS(n);
              return (function () {
                try {
                  return !!new window.DOMParser().parseFromString(
                    Nr(""),
                    "text/html"
                  );
                } catch (n) {
                  return !1;
                }
              })()
                ? new AS(e)
                : e;
            })(n);
          let i = e ? String(e) : "";
          t = za.getInertBodyElement(i);
          let r = 5,
            s = i;
          do {
            if (0 === r)
              throw new Error(
                "Failed to sanitize html because the input is unstable"
              );
            r--, (i = s), (s = t.innerHTML), (t = za.getInertBodyElement(i));
          } while (i !== s);
          return Nr(new LS().sanitizeChildren(Hu(t) || t));
        } finally {
          if (t) {
            const i = Hu(t) || t;
            for (; i.firstChild; ) i.removeChild(i.firstChild);
          }
        }
      }
      function Hu(n) {
        return "content" in n &&
          (function (n) {
            return (
              n.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === n.nodeName
            );
          })(n)
          ? n.content
          : null;
      }
      var ne = (() => (
        ((ne = ne || {})[(ne.NONE = 0)] = "NONE"),
        (ne[(ne.HTML = 1)] = "HTML"),
        (ne[(ne.STYLE = 2)] = "STYLE"),
        (ne[(ne.SCRIPT = 3)] = "SCRIPT"),
        (ne[(ne.URL = 4)] = "URL"),
        (ne[(ne.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        ne
      ))();
      const Vg = "__ngContext__";
      function it(n, e) {
        n[Vg] = e;
      }
      function Uu(n) {
        const e = (function (n) {
          return n[Vg] || null;
        })(n);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function $a(n) {
        return n.ngOriginalError;
      }
      function iI(n, ...e) {
        n.error(...e);
      }
      class On {
        constructor() {
          this._console = console;
        }
        handleError(e) {
          const t = this._findOriginalError(e),
            i = this._findContext(e),
            r = ((n = e) && n.ngErrorLogger) || iI;
          var n;
          r(this._console, "ERROR", e),
            t && r(this._console, "ORIGINAL ERROR", t),
            i && r(this._console, "ERROR CONTEXT", i);
        }
        _findContext(e) {
          return e ? e.ngDebugContext || this._findContext($a(e)) : null;
        }
        _findOriginalError(e) {
          let t = e && $a(e);
          for (; t && $a(t); ) t = $a(t);
          return t || null;
        }
      }
      const qg = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(le))();
      function Kg(n) {
        return n.ownerDocument.defaultView;
      }
      function Pn(n) {
        return n instanceof Function ? n() : n;
      }
      var Ht = (() => (
        ((Ht = Ht || {})[(Ht.Important = 1)] = "Important"),
        (Ht[(Ht.DashCase = 2)] = "DashCase"),
        Ht
      ))();
      function Gu(n, e) {
        return undefined(n, e);
      }
      function no(n) {
        const e = n[3];
        return un(e) ? e[3] : e;
      }
      function Wu(n) {
        return Jg(n[13]);
      }
      function qu(n) {
        return Jg(n[4]);
      }
      function Jg(n) {
        for (; null !== n && !un(n); ) n = n[4];
        return n;
      }
      function Vr(n, e, t, i, r) {
        if (null != i) {
          let s,
            o = !1;
          un(i) ? (s = i) : In(i) && ((o = !0), (i = i[0]));
          const a = Ne(i);
          0 === n && null !== t
            ? null == r
              ? s_(e, t, a)
              : $i(e, t, a, r || null, !0)
            : 1 === n && null !== t
            ? $i(e, t, a, r || null, !0)
            : 2 === n
            ? (function (n, e, t) {
                const i = Wa(n, e);
                i &&
                  (function (n, e, t, i) {
                    Ie(n) ? n.removeChild(e, t, i) : e.removeChild(t);
                  })(n, i, e, t);
              })(e, a, o)
            : 3 === n && e.destroyNode(a),
            null != s &&
              (function (n, e, t, i, r) {
                const s = t[7];
                s !== Ne(t) && Vr(e, n, i, s, r);
                for (let a = 10; a < t.length; a++) {
                  const l = t[a];
                  io(l[1], l, n, e, i, s);
                }
              })(e, n, s, t, r);
        }
      }
      function Yu(n, e, t) {
        return Ie(n)
          ? n.createElement(e, t)
          : null === t
          ? n.createElement(e)
          : n.createElementNS(t, e);
      }
      function t_(n, e) {
        const t = n[9],
          i = t.indexOf(e),
          r = e[3];
        1024 & e[2] && ((e[2] &= -1025), hu(r, -1)), t.splice(i, 1);
      }
      function Qu(n, e) {
        if (n.length <= 10) return;
        const t = 10 + e,
          i = n[t];
        if (i) {
          const r = i[17];
          null !== r && r !== n && t_(r, i), e > 0 && (n[t - 1][4] = i[4]);
          const s = ji(n, 10 + e);
          !(function (n, e) {
            io(n, e, e[G], 2, null, null), (e[0] = null), (e[6] = null);
          })(i[1], i);
          const o = s[19];
          null !== o && o.detachView(s[1]),
            (i[3] = null),
            (i[4] = null),
            (i[2] &= -129);
        }
        return i;
      }
      function n_(n, e) {
        if (!(256 & e[2])) {
          const t = e[G];
          Ie(t) && t.destroyNode && io(n, e, t, 3, null, null),
            (function (n) {
              let e = n[13];
              if (!e) return Xu(n[1], n);
              for (; e; ) {
                let t = null;
                if (In(e)) t = e[13];
                else {
                  const i = e[10];
                  i && (t = i);
                }
                if (!t) {
                  for (; e && !e[4] && e !== n; )
                    In(e) && Xu(e[1], e), (e = e[3]);
                  null === e && (e = n), In(e) && Xu(e[1], e), (t = e && e[4]);
                }
                e = t;
              }
            })(e);
        }
      }
      function Xu(n, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function (n, e) {
              let t;
              if (null != n && null != (t = n.destroyHooks))
                for (let i = 0; i < t.length; i += 2) {
                  const r = e[t[i]];
                  if (!(r instanceof Bs)) {
                    const s = t[i + 1];
                    if (Array.isArray(s))
                      for (let o = 0; o < s.length; o += 2) {
                        const a = r[s[o]],
                          l = s[o + 1];
                        try {
                          l.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        s.call(r);
                      } finally {
                      }
                  }
                }
            })(n, e),
            (function (n, e) {
              const t = n.cleanup,
                i = e[7];
              let r = -1;
              if (null !== t)
                for (let s = 0; s < t.length - 1; s += 2)
                  if ("string" == typeof t[s]) {
                    const o = t[s + 1],
                      a = "function" == typeof o ? o(e) : Ne(e[o]),
                      l = i[(r = t[s + 2])],
                      c = t[s + 3];
                    "boolean" == typeof c
                      ? a.removeEventListener(t[s], l, c)
                      : c >= 0
                      ? i[(r = c)]()
                      : i[(r = -c)].unsubscribe(),
                      (s += 2);
                  } else {
                    const o = i[(r = t[s + 1])];
                    t[s].call(o);
                  }
              if (null !== i) {
                for (let s = r + 1; s < i.length; s++) i[s]();
                e[7] = null;
              }
            })(n, e),
            1 === e[1].type && Ie(e[G]) && e[G].destroy();
          const t = e[17];
          if (null !== t && un(e[3])) {
            t !== e[3] && t_(t, e);
            const i = e[19];
            null !== i && i.detachView(n);
          }
        }
      }
      function i_(n, e, t) {
        return (function (n, e, t) {
          let i = e;
          for (; null !== i && 40 & i.type; ) i = (e = i).parent;
          if (null === i) return t[0];
          if (2 & i.flags) {
            const r = n.data[i.directiveStart].encapsulation;
            if (r === wt.None || r === wt.Emulated) return null;
          }
          return Zt(i, t);
        })(n, e.parent, t);
      }
      function $i(n, e, t, i, r) {
        Ie(n) ? n.insertBefore(e, t, i, r) : e.insertBefore(t, i, r);
      }
      function s_(n, e, t) {
        Ie(n) ? n.appendChild(e, t) : e.appendChild(t);
      }
      function o_(n, e, t, i, r) {
        null !== i ? $i(n, e, t, i, r) : s_(n, e, t);
      }
      function Wa(n, e) {
        return Ie(n) ? n.parentNode(e) : e.parentNode;
      }
      function a_(n, e, t) {
        return c_(n, e, t);
      }
      let c_ = function (n, e, t) {
        return 40 & n.type ? Zt(n, t) : null;
      };
      function qa(n, e, t, i) {
        const r = i_(n, i, e),
          s = e[G],
          a = a_(i.parent || e[6], i, e);
        if (null != r)
          if (Array.isArray(t))
            for (let l = 0; l < t.length; l++) o_(s, r, t[l], a, !1);
          else o_(s, r, t, a, !1);
      }
      function Ka(n, e) {
        if (null !== e) {
          const t = e.type;
          if (3 & t) return Zt(e, n);
          if (4 & t) return Ju(-1, n[e.index]);
          if (8 & t) {
            const i = e.child;
            if (null !== i) return Ka(n, i);
            {
              const r = n[e.index];
              return un(r) ? Ju(-1, r) : Ne(r);
            }
          }
          if (32 & t) return Gu(e, n)() || Ne(n[e.index]);
          {
            const i = d_(n, e);
            return null !== i
              ? Array.isArray(i)
                ? i[0]
                : Ka(no(n[16]), i)
              : Ka(n, e.next);
          }
        }
        return null;
      }
      function d_(n, e) {
        return null !== e ? n[16][6].projection[e.projection] : null;
      }
      function Ju(n, e) {
        const t = 10 + n + 1;
        if (t < e.length) {
          const i = e[t],
            r = i[1].firstChild;
          if (null !== r) return Ka(i, r);
        }
        return e[7];
      }
      function ed(n, e, t, i, r, s, o) {
        for (; null != t; ) {
          const a = i[t.index],
            l = t.type;
          if (
            (o && 0 === e && (a && it(Ne(a), i), (t.flags |= 4)),
            64 != (64 & t.flags))
          )
            if (8 & l) ed(n, e, t.child, i, r, s, !1), Vr(e, n, r, a, s);
            else if (32 & l) {
              const c = Gu(t, i);
              let u;
              for (; (u = c()); ) Vr(e, n, r, u, s);
              Vr(e, n, r, a, s);
            } else 16 & l ? f_(n, e, i, t, r, s) : Vr(e, n, r, a, s);
          t = o ? t.projectionNext : t.next;
        }
      }
      function io(n, e, t, i, r, s) {
        ed(t, i, n.firstChild, e, r, s, !1);
      }
      function f_(n, e, t, i, r, s) {
        const o = t[16],
          l = o[6].projection[i.projection];
        if (Array.isArray(l))
          for (let c = 0; c < l.length; c++) Vr(e, n, r, l[c], s);
        else ed(n, e, l, o[3], r, s, !0);
      }
      function p_(n, e, t) {
        Ie(n) ? n.setAttribute(e, "style", t) : (e.style.cssText = t);
      }
      function td(n, e, t) {
        Ie(n)
          ? "" === t
            ? n.removeAttribute(e, "class")
            : n.setAttribute(e, "class", t)
          : (e.className = t);
      }
      function m_(n, e, t) {
        let i = n.length;
        for (;;) {
          const r = n.indexOf(e, t);
          if (-1 === r) return r;
          if (0 === r || n.charCodeAt(r - 1) <= 32) {
            const s = e.length;
            if (r + s === i || n.charCodeAt(r + s) <= 32) return r;
          }
          t = r + 1;
        }
      }
      const g_ = "ng-template";
      function II(n, e, t) {
        let i = 0;
        for (; i < n.length; ) {
          let r = n[i++];
          if (t && "class" === r) {
            if (((r = n[i]), -1 !== m_(r.toLowerCase(), e, 0))) return !0;
          } else if (1 === r) {
            for (; i < n.length && "string" == typeof (r = n[i++]); )
              if (r.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function __(n) {
        return 4 === n.type && n.value !== g_;
      }
      function kI(n, e, t) {
        return e === (4 !== n.type || t ? n.value : g_);
      }
      function TI(n, e, t) {
        let i = 4;
        const r = n.attrs || [],
          s = (function (n) {
            for (let e = 0; e < n.length; e++) if (ig(n[e])) return e;
            return n.length;
          })(r);
        let o = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ("number" != typeof l) {
            if (!o)
              if (4 & i) {
                if (
                  ((i = 2 | (1 & i)),
                  ("" !== l && !kI(n, l, t)) || ("" === l && 1 === e.length))
                ) {
                  if (hn(i)) return !1;
                  o = !0;
                }
              } else {
                const c = 8 & i ? l : e[++a];
                if (8 & i && null !== n.attrs) {
                  if (!II(n.attrs, c, t)) {
                    if (hn(i)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const d = AI(8 & i ? "class" : l, r, __(n), t);
                if (-1 === d) {
                  if (hn(i)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== c) {
                  let h;
                  h = d > s ? "" : r[d + 1].toLowerCase();
                  const f = 8 & i ? h : null;
                  if ((f && -1 !== m_(f, c, 0)) || (2 & i && c !== h)) {
                    if (hn(i)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !hn(i) && !hn(l)) return !1;
            if (o && hn(l)) continue;
            (o = !1), (i = l | (1 & i));
          }
        }
        return hn(i) || o;
      }
      function hn(n) {
        return 0 == (1 & n);
      }
      function AI(n, e, t, i) {
        if (null === e) return -1;
        let r = 0;
        if (i || !t) {
          let s = !1;
          for (; r < e.length; ) {
            const o = e[r];
            if (o === n) return r;
            if (3 === o || 6 === o) s = !0;
            else {
              if (1 === o || 2 === o) {
                let a = e[++r];
                for (; "string" == typeof a; ) a = e[++r];
                continue;
              }
              if (4 === o) break;
              if (0 === o) {
                r += 4;
                continue;
              }
            }
            r += s ? 1 : 2;
          }
          return -1;
        }
        return (function (n, e) {
          let t = n.indexOf(4);
          if (t > -1)
            for (t++; t < n.length; ) {
              const i = n[t];
              if ("number" == typeof i) return -1;
              if (i === e) return t;
              t++;
            }
          return -1;
        })(e, n);
      }
      function y_(n, e, t = !1) {
        for (let i = 0; i < e.length; i++) if (TI(n, e[i], t)) return !0;
        return !1;
      }
      function FI(n, e) {
        e: for (let t = 0; t < e.length; t++) {
          const i = e[t];
          if (n.length === i.length) {
            for (let r = 0; r < n.length; r++) if (n[r] !== i[r]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function v_(n, e) {
        return n ? ":not(" + e.trim() + ")" : e;
      }
      function NI(n) {
        let e = n[0],
          t = 1,
          i = 2,
          r = "",
          s = !1;
        for (; t < n.length; ) {
          let o = n[t];
          if ("string" == typeof o)
            if (2 & i) {
              const a = n[++t];
              r += "[" + o + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & i ? (r += "." + o) : 4 & i && (r += " " + o);
          else
            "" !== r && !hn(o) && ((e += v_(s, r)), (r = "")),
              (i = o),
              (s = s || !hn(i));
          t++;
        }
        return "" !== r && (e += v_(s, r)), e;
      }
      const z = {};
      function ee(n) {
        b_(J(), C(), mt() + n, wa());
      }
      function b_(n, e, t, i) {
        if (!i)
          if (3 == (3 & e[2])) {
            const s = n.preOrderCheckHooks;
            null !== s && ka(e, s, t);
          } else {
            const s = n.preOrderHooks;
            null !== s && Ta(e, s, 0, t);
          }
        di(t);
      }
      function Ya(n, e) {
        return (n << 17) | (e << 2);
      }
      function fn(n) {
        return (n >> 17) & 32767;
      }
      function nd(n) {
        return 2 | n;
      }
      function Kn(n) {
        return (131068 & n) >> 2;
      }
      function id(n, e) {
        return (-131069 & n) | (e << 2);
      }
      function rd(n) {
        return 1 | n;
      }
      function A_(n, e) {
        const t = n.contentQueries;
        if (null !== t)
          for (let i = 0; i < t.length; i += 2) {
            const r = t[i],
              s = t[i + 1];
            if (-1 !== s) {
              const o = n.data[s];
              _u(r), o.contentQueries(2, e[s], s);
            }
          }
      }
      function ro(n, e, t, i, r, s, o, a, l, c) {
        const u = e.blueprint.slice();
        return (
          (u[0] = r),
          (u[2] = 140 | i),
          $m(u),
          (u[3] = u[15] = n),
          (u[8] = t),
          (u[10] = o || (n && n[10])),
          (u[G] = a || (n && n[G])),
          (u[12] = l || (n && n[12]) || null),
          (u[9] = c || (n && n[9]) || null),
          (u[6] = s),
          (u[16] = 2 == e.type ? n[16] : u),
          u
        );
      }
      function Br(n, e, t, i, r) {
        let s = n.data[e];
        if (null === s)
          (s = (function (n, e, t, i, r) {
            const s = Wm(),
              o = fu(),
              l = (n.data[e] = (function (n, e, t, i, r, s) {
                return {
                  type: t,
                  index: i,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: r,
                  attrs: s,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: e,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, o ? s : s && s.parent, t, e, i, r));
            return (
              null === n.firstChild && (n.firstChild = l),
              null !== s &&
                (o
                  ? null == s.child && null !== l.parent && (s.child = l)
                  : null === s.next && (s.next = l)),
              l
            );
          })(n, e, t, i, r)),
            V.lFrame.inI18n && (s.flags |= 64);
        else if (64 & s.type) {
          (s.type = t), (s.value = i), (s.attrs = r);
          const o = (function () {
            const n = V.lFrame,
              e = n.currentTNode;
            return n.isParent ? e : e.parent;
          })();
          s.injectorIndex = null === o ? -1 : o.injectorIndex;
        }
        return kn(s, !0), s;
      }
      function Hr(n, e, t, i) {
        if (0 === t) return -1;
        const r = e.length;
        for (let s = 0; s < t; s++)
          e.push(i), n.blueprint.push(i), n.data.push(null);
        return r;
      }
      function so(n, e, t) {
        xa(e);
        try {
          const i = n.viewQuery;
          null !== i && Dd(1, i, t);
          const r = n.template;
          null !== r && R_(n, e, r, 1, t),
            n.firstCreatePass && (n.firstCreatePass = !1),
            n.staticContentQueries && A_(n, e),
            n.staticViewQueries && Dd(2, n.viewQuery, t);
          const s = n.components;
          null !== s &&
            (function (n, e) {
              for (let t = 0; t < e.length; t++) yk(n, e[t]);
            })(e, s);
        } catch (i) {
          throw (
            (n.firstCreatePass &&
              ((n.incompleteFirstPass = !0), (n.firstCreatePass = !1)),
            i)
          );
        } finally {
          (e[2] &= -5), Sa();
        }
      }
      function jr(n, e, t, i) {
        const r = e[2];
        if (256 == (256 & r)) return;
        xa(e);
        const s = wa();
        try {
          $m(e),
            (function (n) {
              V.lFrame.bindingIndex = n;
            })(n.bindingStartIndex),
            null !== t && R_(n, e, t, 2, i);
          const o = 3 == (3 & r);
          if (!s)
            if (o) {
              const c = n.preOrderCheckHooks;
              null !== c && ka(e, c, null);
            } else {
              const c = n.preOrderHooks;
              null !== c && Ta(e, c, 0, null), vu(e, 0);
            }
          if (
            ((function (n) {
              for (let e = Wu(n); null !== e; e = qu(e)) {
                if (!e[2]) continue;
                const t = e[9];
                for (let i = 0; i < t.length; i++) {
                  const r = t[i],
                    s = r[3];
                  0 == (1024 & r[2]) && hu(s, 1), (r[2] |= 1024);
                }
              }
            })(e),
            (function (n) {
              for (let e = Wu(n); null !== e; e = qu(e))
                for (let t = 10; t < e.length; t++) {
                  const i = e[t],
                    r = i[1];
                  du(i) && jr(r, i, r.template, i[8]);
                }
            })(e),
            null !== n.contentQueries && A_(n, e),
            !s)
          )
            if (o) {
              const c = n.contentCheckHooks;
              null !== c && ka(e, c);
            } else {
              const c = n.contentHooks;
              null !== c && Ta(e, c, 1), vu(e, 1);
            }
          !(function (n, e) {
            const t = n.hostBindingOpCodes;
            if (null !== t)
              try {
                for (let i = 0; i < t.length; i++) {
                  const r = t[i];
                  if (r < 0) di(~r);
                  else {
                    const s = r,
                      o = t[++i],
                      a = t[++i];
                    kx(o, s), a(2, e[s]);
                  }
                }
              } finally {
                di(-1);
              }
          })(n, e);
          const a = n.components;
          null !== a &&
            (function (n, e) {
              for (let t = 0; t < e.length; t++) _k(n, e[t]);
            })(e, a);
          const l = n.viewQuery;
          if ((null !== l && Dd(2, l, i), !s))
            if (o) {
              const c = n.viewCheckHooks;
              null !== c && ka(e, c);
            } else {
              const c = n.viewHooks;
              null !== c && Ta(e, c, 2), vu(e, 2);
            }
          !0 === n.firstUpdatePass && (n.firstUpdatePass = !1),
            s || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), hu(e[3], -1));
        } finally {
          Sa();
        }
      }
      function ZI(n, e, t, i) {
        const r = e[10],
          s = !wa(),
          o = zm(e);
        try {
          s && !o && r.begin && r.begin(), o && so(n, e, i), jr(n, e, t, i);
        } finally {
          s && !o && r.end && r.end();
        }
      }
      function R_(n, e, t, i, r) {
        const s = mt(),
          o = 2 & i;
        try {
          di(-1), o && e.length > 20 && b_(n, e, 20, wa()), t(i, r);
        } finally {
          di(s);
        }
      }
      function pd(n, e, t) {
        !Gm() ||
          ((function (n, e, t, i) {
            const r = t.directiveStart,
              s = t.directiveEnd;
            n.firstCreatePass || js(t, e), it(i, e);
            const o = t.initialInputs;
            for (let a = r; a < s; a++) {
              const l = n.data[a],
                c = dn(l);
              c && hk(e, t, l);
              const u = Us(e, n, a, t);
              it(u, e),
                null !== o && fk(0, a - r, u, l, 0, o),
                c && (Ft(t.index, e)[8] = u);
            }
          })(n, e, t, Zt(t, e)),
          128 == (128 & t.flags) &&
            (function (n, e, t) {
              const i = t.directiveStart,
                r = t.directiveEnd,
                o = t.index,
                a = V.lFrame.currentDirectiveIndex;
              try {
                di(o);
                for (let l = i; l < r; l++) {
                  const c = n.data[l],
                    u = e[l];
                  mu(l),
                    (null !== c.hostBindings ||
                      0 !== c.hostVars ||
                      null !== c.hostAttrs) &&
                      j_(c, u);
                }
              } finally {
                di(-1), mu(a);
              }
            })(n, e, t));
      }
      function md(n, e, t = Zt) {
        const i = e.localNames;
        if (null !== i) {
          let r = e.index + 1;
          for (let s = 0; s < i.length; s += 2) {
            const o = i[s + 1],
              a = -1 === o ? t(e, n) : n[o];
            n[r++] = a;
          }
        }
      }
      function P_(n) {
        const e = n.tView;
        return null === e || e.incompleteFirstPass
          ? (n.tView = Za(
              1,
              null,
              n.template,
              n.decls,
              n.vars,
              n.directiveDefs,
              n.pipeDefs,
              n.viewQuery,
              n.schemas,
              n.consts
            ))
          : e;
      }
      function Za(n, e, t, i, r, s, o, a, l, c) {
        const u = 20 + i,
          d = u + r,
          h = (function (n, e) {
            const t = [];
            for (let i = 0; i < e; i++) t.push(i < n ? null : z);
            return t;
          })(u, d),
          f = "function" == typeof c ? c() : c;
        return (h[1] = {
          type: n,
          blueprint: h,
          template: t,
          queries: null,
          viewQuery: a,
          declTNode: e,
          data: h.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof s ? s() : s,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: f,
          incompleteFirstPass: !1,
        });
      }
      function L_(n, e, t, i) {
        const r = q_(e);
        null === t
          ? r.push(i)
          : (r.push(t), n.firstCreatePass && K_(n).push(i, r.length - 1));
      }
      function V_(n, e, t) {
        for (let i in n)
          if (n.hasOwnProperty(i)) {
            const r = n[i];
            (t = null === t ? {} : t).hasOwnProperty(i)
              ? t[i].push(e, r)
              : (t[i] = [e, r]);
          }
        return t;
      }
      function jt(n, e, t, i, r, s, o, a) {
        const l = Zt(e, t);
        let u,
          c = e.inputs;
        !a && null != c && (u = c[i])
          ? (X_(n, t, u, i, r),
            Ca(e) &&
              (function (n, e) {
                const t = Ft(e, n);
                16 & t[2] || (t[2] |= 64);
              })(t, e.index))
          : 3 & e.type &&
            ((i = (function (n) {
              return "class" === n
                ? "className"
                : "for" === n
                ? "htmlFor"
                : "formaction" === n
                ? "formAction"
                : "innerHtml" === n
                ? "innerHTML"
                : "readonly" === n
                ? "readOnly"
                : "tabindex" === n
                ? "tabIndex"
                : n;
            })(i)),
            (r = null != o ? o(r, e.value || "", i) : r),
            Ie(s)
              ? s.setProperty(l, i, r)
              : Cu(i) || (l.setProperty ? l.setProperty(i, r) : (l[i] = r)));
      }
      function gd(n, e, t, i) {
        let r = !1;
        if (Gm()) {
          const s = (function (n, e, t) {
              const i = n.directiveRegistry;
              let r = null;
              if (i)
                for (let s = 0; s < i.length; s++) {
                  const o = i[s];
                  y_(t, o.selectors, !1) &&
                    (r || (r = []),
                    Fa(js(t, e), n, o.type),
                    dn(o) ? (U_(n, t), r.unshift(o)) : r.push(o));
                }
              return r;
            })(n, e, t),
            o = null === i ? null : { "": -1 };
          if (null !== s) {
            (r = !0), z_(t, n.data.length, s.length);
            for (let u = 0; u < s.length; u++) {
              const d = s[u];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              l = !1,
              c = Hr(n, e, s.length, null);
            for (let u = 0; u < s.length; u++) {
              const d = s[u];
              (t.mergedAttrs = Ra(t.mergedAttrs, d.hostAttrs)),
                $_(n, t, e, c, d),
                dk(c, d, o),
                null !== d.contentQueries && (t.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (t.flags |= 128);
              const h = d.type.prototype;
              !a &&
                (h.ngOnChanges || h.ngOnInit || h.ngDoCheck) &&
                ((n.preOrderHooks || (n.preOrderHooks = [])).push(t.index),
                (a = !0)),
                !l &&
                  (h.ngOnChanges || h.ngDoCheck) &&
                  ((n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(
                    t.index
                  ),
                  (l = !0)),
                c++;
            }
            !(function (n, e) {
              const i = e.directiveEnd,
                r = n.data,
                s = e.attrs,
                o = [];
              let a = null,
                l = null;
              for (let c = e.directiveStart; c < i; c++) {
                const u = r[c],
                  d = u.inputs,
                  h = null === s || __(e) ? null : pk(d, s);
                o.push(h), (a = V_(d, c, a)), (l = V_(u.outputs, c, l));
              }
              null !== a &&
                (a.hasOwnProperty("class") && (e.flags |= 16),
                a.hasOwnProperty("style") && (e.flags |= 32)),
                (e.initialInputs = o),
                (e.inputs = a),
                (e.outputs = l);
            })(n, t);
          }
          o &&
            (function (n, e, t) {
              if (e) {
                const i = (n.localNames = []);
                for (let r = 0; r < e.length; r += 2) {
                  const s = t[e[r + 1]];
                  if (null == s)
                    throw new Pi(
                      "301",
                      `Export of name '${e[r + 1]}' not found!`
                    );
                  i.push(e[r], s);
                }
              }
            })(t, i, o);
        }
        return (t.mergedAttrs = Ra(t.mergedAttrs, t.attrs)), r;
      }
      function H_(n, e, t, i, r, s) {
        const o = s.hostBindings;
        if (o) {
          let a = n.hostBindingOpCodes;
          null === a && (a = n.hostBindingOpCodes = []);
          const l = ~e.index;
          (function (n) {
            let e = n.length;
            for (; e > 0; ) {
              const t = n[--e];
              if ("number" == typeof t && t < 0) return t;
            }
            return 0;
          })(a) != l && a.push(l),
            a.push(i, r, o);
        }
      }
      function j_(n, e) {
        null !== n.hostBindings && n.hostBindings(1, e);
      }
      function U_(n, e) {
        (e.flags |= 2), (n.components || (n.components = [])).push(e.index);
      }
      function dk(n, e, t) {
        if (t) {
          if (e.exportAs)
            for (let i = 0; i < e.exportAs.length; i++) t[e.exportAs[i]] = n;
          dn(e) && (t[""] = n);
        }
      }
      function z_(n, e, t) {
        (n.flags |= 1),
          (n.directiveStart = e),
          (n.directiveEnd = e + t),
          (n.providerIndexes = e);
      }
      function $_(n, e, t, i, r) {
        n.data[i] = r;
        const s = r.factory || (r.factory = Bi(r.type)),
          o = new Bs(s, dn(r), null);
        (n.blueprint[i] = o),
          (t[i] = o),
          H_(n, e, 0, i, Hr(n, t, r.hostVars, z), r);
      }
      function hk(n, e, t) {
        const i = Zt(e, n),
          r = P_(t),
          s = n[10],
          o = Ja(
            n,
            ro(
              n,
              r,
              null,
              t.onPush ? 64 : 16,
              i,
              e,
              s,
              s.createRenderer(i, t),
              null,
              null
            )
          );
        n[e.index] = o;
      }
      function Fn(n, e, t, i, r, s) {
        const o = Zt(n, e);
        !(function (n, e, t, i, r, s, o) {
          if (null == s)
            Ie(n) ? n.removeAttribute(e, r, t) : e.removeAttribute(r);
          else {
            const a = null == o ? U(s) : o(s, i || "", r);
            Ie(n)
              ? n.setAttribute(e, r, a, t)
              : t
              ? e.setAttributeNS(t, r, a)
              : e.setAttribute(r, a);
          }
        })(e[G], o, s, n.value, t, i, r);
      }
      function fk(n, e, t, i, r, s) {
        const o = s[e];
        if (null !== o) {
          const a = i.setInput;
          for (let l = 0; l < o.length; ) {
            const c = o[l++],
              u = o[l++],
              d = o[l++];
            null !== a ? i.setInput(t, d, c, u) : (t[u] = d);
          }
        }
      }
      function pk(n, e) {
        let t = null,
          i = 0;
        for (; i < e.length; ) {
          const r = e[i];
          if (0 !== r)
            if (5 !== r) {
              if ("number" == typeof r) break;
              n.hasOwnProperty(r) &&
                (null === t && (t = []), t.push(r, n[r], e[i + 1])),
                (i += 2);
            } else i += 2;
          else i += 4;
        }
        return t;
      }
      function G_(n, e, t, i) {
        return new Array(n, !0, !1, e, null, 0, i, t, null, null);
      }
      function _k(n, e) {
        const t = Ft(e, n);
        if (du(t)) {
          const i = t[1];
          80 & t[2] ? jr(i, t, i.template, t[8]) : t[5] > 0 && yd(t);
        }
      }
      function yd(n) {
        for (let i = Wu(n); null !== i; i = qu(i))
          for (let r = 10; r < i.length; r++) {
            const s = i[r];
            if (1024 & s[2]) {
              const o = s[1];
              jr(o, s, o.template, s[8]);
            } else s[5] > 0 && yd(s);
          }
        const t = n[1].components;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const r = Ft(t[i], n);
            du(r) && r[5] > 0 && yd(r);
          }
      }
      function yk(n, e) {
        const t = Ft(e, n),
          i = t[1];
        (function (n, e) {
          for (let t = e.length; t < n.blueprint.length; t++)
            e.push(n.blueprint[t]);
        })(i, t),
          so(i, t, t[8]);
      }
      function Ja(n, e) {
        return n[13] ? (n[14][4] = e) : (n[13] = e), (n[14] = e), e;
      }
      function vd(n) {
        for (; n; ) {
          n[2] |= 64;
          const e = no(n);
          if (ux(n) && !e) return n;
          n = e;
        }
        return null;
      }
      function Cd(n, e, t) {
        const i = e[10];
        i.begin && i.begin();
        try {
          jr(n, e, n.template, t);
        } catch (r) {
          throw (Q_(e, r), r);
        } finally {
          i.end && i.end();
        }
      }
      function W_(n) {
        !(function (n) {
          for (let e = 0; e < n.components.length; e++) {
            const t = n.components[e],
              i = Uu(t),
              r = i[1];
            ZI(r, i, r.template, t);
          }
        })(n[8]);
      }
      function Dd(n, e, t) {
        _u(0), e(n, t);
      }
      const Ek = (() => Promise.resolve(null))();
      function q_(n) {
        return n[7] || (n[7] = []);
      }
      function K_(n) {
        return n.cleanup || (n.cleanup = []);
      }
      function Q_(n, e) {
        const t = n[9],
          i = t ? t.get(On, null) : null;
        i && i.handleError(e);
      }
      function X_(n, e, t, i, r) {
        for (let s = 0; s < t.length; ) {
          const o = t[s++],
            a = t[s++],
            l = e[o],
            c = n.data[o];
          null !== c.setInput ? c.setInput(l, r, i, a) : (l[a] = r);
        }
      }
      function Yn(n, e, t) {
        const i = Ea(e, n);
        !(function (n, e, t) {
          Ie(n) ? n.setValue(e, t) : (e.textContent = t);
        })(n[G], i, t);
      }
      function el(n, e, t) {
        let i = t ? n.styles : null,
          r = t ? n.classes : null,
          s = 0;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const a = e[o];
            "number" == typeof a
              ? (s = a)
              : 1 == s
              ? (r = Xc(r, a))
              : 2 == s && (i = Xc(i, a + ": " + e[++o] + ";"));
          }
        t ? (n.styles = i) : (n.stylesWithoutHost = i),
          t ? (n.classes = r) : (n.classesWithoutHost = r);
      }
      const oo = new x("INJECTOR", -1);
      class Z_ {
        get(e, t = qs) {
          if (t === qs) {
            const i = new Error(`NullInjectorError: No provider for ${K(e)}!`);
            throw ((i.name = "NullInjectorError"), i);
          }
          return t;
        }
      }
      const ao = new x("Set Injector scope."),
        lo = {},
        xk = {};
      let Ed;
      function J_() {
        return void 0 === Ed && (Ed = new Z_()), Ed;
      }
      function ey(n, e = null, t = null, i) {
        return new Ik(n, t, e || J_(), i);
      }
      class Ik {
        constructor(e, t, i, r = null) {
          (this.parent = i),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const s = [];
          t && Tn(t, (a) => this.processProvider(a, e, t)),
            Tn([e], (a) => this.processInjectorType(a, [], s)),
            this.records.set(oo, Ur(void 0, this));
          const o = this.records.get(ao);
          (this.scope = null != o ? o.value : null),
            (this.source = r || ("object" == typeof e ? null : K(e)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((e) => e.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(e, t = qs, i = F.Default) {
          this.assertNotDestroyed();
          const r = Pr(this),
            s = ai(void 0);
          try {
            if (!(i & F.SkipSelf)) {
              let a = this.records.get(e);
              if (void 0 === a) {
                const l =
                  ("function" == typeof (n = e) ||
                    ("object" == typeof n && n instanceof x)) &&
                  $n(e);
                (a = l && this.injectableDefInScope(l) ? Ur(wd(e), lo) : null),
                  this.records.set(e, a);
              }
              if (null != a) return this.hydrate(e, a);
            }
            return (i & F.Self ? J_() : this.parent).get(
              e,
              (t = i & F.Optional && t === qs ? null : t)
            );
          } catch (o) {
            if ("NullInjectorError" === o.name) {
              if (((o[Or] = o[Or] || []).unshift(K(e)), r)) throw o;
              return yg(o, e, "R3InjectorError", this.source);
            }
            throw o;
          } finally {
            ai(s), Pr(r);
          }
          var n;
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((e) => this.get(e));
        }
        toString() {
          const e = [];
          return (
            this.records.forEach((i, r) => e.push(K(r))),
            `R3Injector[${e.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed)
            throw new Error("Injector has already been destroyed.");
        }
        processInjectorType(e, t, i) {
          if (!(e = k(e))) return !1;
          let r = Sm(e);
          const s = (null == r && e.ngModule) || void 0,
            o = void 0 === s ? e : s,
            a = -1 !== i.indexOf(o);
          if ((void 0 !== s && (r = Sm(s)), null == r)) return !1;
          if (null != r.imports && !a) {
            let u;
            i.push(o);
            try {
              Tn(r.imports, (d) => {
                this.processInjectorType(d, t, i) &&
                  (void 0 === u && (u = []), u.push(d));
              });
            } finally {
            }
            if (void 0 !== u)
              for (let d = 0; d < u.length; d++) {
                const { ngModule: h, providers: f } = u[d];
                Tn(f, (p) => this.processProvider(p, h, f || me));
              }
          }
          this.injectorDefTypes.add(o);
          const l = Bi(o) || (() => new o());
          this.records.set(o, Ur(l, lo));
          const c = r.providers;
          if (null != c && !a) {
            const u = e;
            Tn(c, (d) => this.processProvider(d, u, c));
          }
          return void 0 !== s && void 0 !== e.providers;
        }
        processProvider(e, t, i) {
          let r = zr((e = k(e))) ? e : k(e && e.provide);
          const s = ((n = e), ny(n) ? Ur(void 0, n.useValue) : Ur(ty(n), lo));
          var n;
          if (zr(e) || !0 !== e.multi) this.records.get(r);
          else {
            let o = this.records.get(r);
            o ||
              ((o = Ur(void 0, lo, !0)),
              (o.factory = () => Ui(o.multi)),
              this.records.set(r, o)),
              (r = e),
              o.multi.push(e);
          }
          this.records.set(r, s);
        }
        hydrate(e, t) {
          return (
            t.value === lo && ((t.value = xk), (t.value = t.factory())),
            "object" == typeof t.value &&
              t.value &&
              null !== (n = t.value) &&
              "object" == typeof n &&
              "function" == typeof n.ngOnDestroy &&
              this.onDestroy.add(t.value),
            t.value
          );
          var n;
        }
        injectableDefInScope(e) {
          if (!e.providedIn) return !1;
          const t = k(e.providedIn);
          return "string" == typeof t
            ? "any" === t || t === this.scope
            : this.injectorDefTypes.has(t);
        }
      }
      function wd(n) {
        const e = $n(n),
          t = null !== e ? e.factory : Bi(n);
        if (null !== t) return t;
        if (n instanceof x)
          throw new Error(`Token ${K(n)} is missing a \u0275prov definition.`);
        if (n instanceof Function)
          return (function (n) {
            const e = n.length;
            if (e > 0) {
              const i = fi(e, "?");
              throw new Error(
                `Can't resolve all parameters for ${K(n)}: (${i.join(", ")}).`
              );
            }
            const t = (function (n) {
              const e = n && (n[ga] || n[Im]);
              if (e) {
                const t = (function (n) {
                  if (n.hasOwnProperty("name")) return n.name;
                  const e = ("" + n).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(n);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${t}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${t}" class.`
                  ),
                  e
                );
              }
              return null;
            })(n);
            return null !== t ? () => t.factory(n) : () => new n();
          })(n);
        throw new Error("unreachable");
      }
      function ty(n, e, t) {
        let i;
        if (zr(n)) {
          const r = k(n);
          return Bi(r) || wd(r);
        }
        if (ny(n)) i = () => k(n.useValue);
        else if (
          (function (n) {
            return !(!n || !n.useFactory);
          })(n)
        )
          i = () => n.useFactory(...Ui(n.deps || []));
        else if (
          (function (n) {
            return !(!n || !n.useExisting);
          })(n)
        )
          i = () => b(k(n.useExisting));
        else {
          const r = k(n && (n.useClass || n.provide));
          if (
            !(function (n) {
              return !!n.deps;
            })(n)
          )
            return Bi(r) || wd(r);
          i = () => new r(...Ui(n.deps));
        }
        return i;
      }
      function Ur(n, e, t = !1) {
        return { factory: n, value: e, multi: t ? [] : void 0 };
      }
      function ny(n) {
        return null !== n && "object" == typeof n && Ru in n;
      }
      function zr(n) {
        return "function" == typeof n;
      }
      const iy = function (n, e, t) {
        return (function (n, e = null, t = null, i) {
          const r = ey(n, e, t, i);
          return r._resolveInjectorDefTypes(), r;
        })({ name: t }, e, n, t);
      };
      let ye = (() => {
        class n {
          static create(t, i) {
            return Array.isArray(t)
              ? iy(t, i, "")
              : iy(t.providers, t.parent, t.name || "");
          }
        }
        return (
          (n.THROW_IF_NOT_FOUND = qs),
          (n.NULL = new Z_()),
          (n.ɵprov = I({ token: n, providedIn: "any", factory: () => b(oo) })),
          (n.__NG_ELEMENT_ID__ = -1),
          n
        );
      })();
      function Yk(n, e) {
        Ia(Uu(n)[1], je());
      }
      function ie(n) {
        let e = (function (n) {
            return Object.getPrototypeOf(n.prototype).constructor;
          })(n.type),
          t = !0;
        const i = [n];
        for (; e; ) {
          let r;
          if (dn(n)) r = e.ɵcmp || e.ɵdir;
          else {
            if (e.ɵcmp) throw new Error("Directives cannot inherit Components");
            r = e.ɵdir;
          }
          if (r) {
            if (t) {
              i.push(r);
              const o = n;
              (o.inputs = Td(n.inputs)),
                (o.declaredInputs = Td(n.declaredInputs)),
                (o.outputs = Td(n.outputs));
              const a = r.hostBindings;
              a && Jk(n, a);
              const l = r.viewQuery,
                c = r.contentQueries;
              if (
                (l && Xk(n, l),
                c && Zk(n, c),
                Qc(n.inputs, r.inputs),
                Qc(n.declaredInputs, r.declaredInputs),
                Qc(n.outputs, r.outputs),
                dn(r) && r.data.animation)
              ) {
                const u = n.data;
                u.animation = (u.animation || []).concat(r.data.animation);
              }
            }
            const s = r.features;
            if (s)
              for (let o = 0; o < s.length; o++) {
                const a = s[o];
                a && a.ngInherit && a(n), a === ie && (t = !1);
              }
          }
          e = Object.getPrototypeOf(e);
        }
        !(function (n) {
          let e = 0,
            t = null;
          for (let i = n.length - 1; i >= 0; i--) {
            const r = n[i];
            (r.hostVars = e += r.hostVars),
              (r.hostAttrs = Ra(r.hostAttrs, (t = Ra(t, r.hostAttrs))));
          }
        })(i);
      }
      function Td(n) {
        return n === yr ? {} : n === me ? [] : n;
      }
      function Xk(n, e) {
        const t = n.viewQuery;
        n.viewQuery = t
          ? (i, r) => {
              e(i, r), t(i, r);
            }
          : e;
      }
      function Zk(n, e) {
        const t = n.contentQueries;
        n.contentQueries = t
          ? (i, r, s) => {
              e(i, r, s), t(i, r, s);
            }
          : e;
      }
      function Jk(n, e) {
        const t = n.hostBindings;
        n.hostBindings = t
          ? (i, r) => {
              e(i, r), t(i, r);
            }
          : e;
      }
      let tl = null;
      function $r() {
        if (!tl) {
          const n = le.Symbol;
          if (n && n.iterator) tl = n.iterator;
          else {
            const e = Object.getOwnPropertyNames(Map.prototype);
            for (let t = 0; t < e.length; ++t) {
              const i = e[t];
              "entries" !== i &&
                "size" !== i &&
                Map.prototype[i] === Map.prototype.entries &&
                (tl = i);
            }
          }
        }
        return tl;
      }
      function uo(n) {
        return (
          !!Ad(n) && (Array.isArray(n) || (!(n instanceof Map) && $r() in n))
        );
      }
      function Ad(n) {
        return null !== n && ("function" == typeof n || "object" == typeof n);
      }
      function Nn(n, e, t) {
        return (n[e] = t);
      }
      function rt(n, e, t) {
        return !Object.is(n[e], t) && ((n[e] = t), !0);
      }
      function st(n, e, t, i) {
        const r = C();
        return rt(r, wr(), e) && (J(), Fn(ke(), r, n, e, t, i)), st;
      }
      function It(n, e, t, i, r, s, o, a) {
        const l = C(),
          c = J(),
          u = n + 20,
          d = c.firstCreatePass
            ? (function (n, e, t, i, r, s, o, a, l) {
                const c = e.consts,
                  u = Br(e, n, 4, o || null, ui(c, a));
                gd(e, t, u, ui(c, l)), Ia(e, u);
                const d = (u.tViews = Za(
                  2,
                  u,
                  i,
                  r,
                  s,
                  e.directiveRegistry,
                  e.pipeRegistry,
                  null,
                  e.schemas,
                  c
                ));
                return (
                  null !== e.queries &&
                    (e.queries.template(e, u),
                    (d.queries = e.queries.embeddedTView(u))),
                  u
                );
              })(u, c, l, e, t, i, r, s, o)
            : c.data[u];
        kn(d, !1);
        const h = l[G].createComment("");
        qa(c, l, h, d),
          it(h, l),
          Ja(l, (l[u] = G_(h, l, h, d))),
          Da(d) && pd(c, l, d),
          null != o && md(l, d, a);
      }
      function Rd(n) {
        return (function (n, e) {
          return n[e];
        })(V.lFrame.contextLView, 20 + n);
      }
      function v(n, e = F.Default) {
        const t = C();
        return null === t ? b(n, e) : ug(je(), t, k(n), e);
      }
      function ve(n, e, t) {
        const i = C();
        return rt(i, wr(), e) && jt(J(), ke(), i, n, e, i[G], t, !1), ve;
      }
      function Ld(n, e, t, i, r) {
        const o = r ? "class" : "style";
        X_(n, t, e.inputs[o], o, i);
      }
      function T(n, e, t, i) {
        const r = C(),
          s = J(),
          o = 20 + n,
          a = r[G],
          l = (r[o] = Yu(a, e, V.lFrame.currentNamespace)),
          c = s.firstCreatePass
            ? (function (n, e, t, i, r, s, o) {
                const a = e.consts,
                  c = Br(e, n, 2, r, ui(a, s));
                return (
                  gd(e, t, c, ui(a, o)),
                  null !== c.attrs && el(c, c.attrs, !1),
                  null !== c.mergedAttrs && el(c, c.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, c),
                  c
                );
              })(o, s, r, 0, e, t, i)
            : s.data[o];
        kn(c, !0);
        const u = c.mergedAttrs;
        null !== u && Aa(a, l, u);
        const d = c.classes;
        null !== d && td(a, l, d);
        const h = c.styles;
        null !== h && p_(a, l, h),
          64 != (64 & c.flags) && qa(s, r, l, c),
          0 === V.lFrame.elementDepthCount && it(l, r),
          V.lFrame.elementDepthCount++,
          Da(c) &&
            (pd(s, r, c),
            (function (n, e, t) {
              if (su(e)) {
                const r = e.directiveEnd;
                for (let s = e.directiveStart; s < r; s++) {
                  const o = n.data[s];
                  o.contentQueries && o.contentQueries(1, t[s], s);
                }
              }
            })(s, c, r)),
          null !== i && md(r, c);
      }
      function A() {
        let n = je();
        fu() ? pu() : ((n = n.parent), kn(n, !1));
        const e = n;
        V.lFrame.elementDepthCount--;
        const t = J();
        t.firstCreatePass && (Ia(t, n), su(n) && t.queries.elementEnd(n)),
          null != e.classesWithoutHost &&
            (function (n) {
              return 0 != (16 & n.flags);
            })(e) &&
            Ld(t, e, C(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function (n) {
              return 0 != (32 & n.flags);
            })(e) &&
            Ld(t, e, C(), e.stylesWithoutHost, !1);
      }
      function ot(n, e, t, i) {
        T(n, e, t, i), A();
      }
      function _i() {
        return C();
      }
      function rl(n) {
        return !!n && "function" == typeof n.then;
      }
      const Vd = function (n) {
        return !!n && "function" == typeof n.subscribe;
      };
      function se(n, e, t, i) {
        const r = C(),
          s = J(),
          o = je();
        return (
          (function (n, e, t, i, r, s, o, a) {
            const l = Da(i),
              u = n.firstCreatePass && K_(n),
              d = e[8],
              h = q_(e);
            let f = !0;
            if (3 & i.type || a) {
              const m = Zt(i, e),
                y = a ? a(m) : m,
                _ = h.length,
                D = a ? (E) => a(Ne(E[i.index])) : i.index;
              if (Ie(t)) {
                let E = null;
                if (
                  (!a &&
                    l &&
                    (E = (function (n, e, t, i) {
                      const r = n.cleanup;
                      if (null != r)
                        for (let s = 0; s < r.length - 1; s += 2) {
                          const o = r[s];
                          if (o === t && r[s + 1] === i) {
                            const a = e[7],
                              l = r[s + 2];
                            return a.length > l ? a[l] : null;
                          }
                          "string" == typeof o && (s += 2);
                        }
                      return null;
                    })(n, e, r, i.index)),
                  null !== E)
                )
                  ((E.__ngLastListenerFn__ || E).__ngNextListenerFn__ = s),
                    (E.__ngLastListenerFn__ = s),
                    (f = !1);
                else {
                  s = Bd(i, e, d, s, !1);
                  const L = t.listen(y, r, s);
                  h.push(s, L), u && u.push(r, D, _, _ + 1);
                }
              } else
                (s = Bd(i, e, d, s, !0)),
                  y.addEventListener(r, s, o),
                  h.push(s),
                  u && u.push(r, D, _, o);
            } else s = Bd(i, e, d, s, !1);
            const p = i.outputs;
            let g;
            if (f && null !== p && (g = p[r])) {
              const m = g.length;
              if (m)
                for (let y = 0; y < m; y += 2) {
                  const de = e[g[y]][g[y + 1]].subscribe(s),
                    _e = h.length;
                  h.push(s, de), u && u.push(r, i.index, _e, -(_e + 1));
                }
            }
          })(s, r, r[G], o, n, e, !!t, i),
          se
        );
      }
      function Wy(n, e, t, i) {
        try {
          return !1 !== t(i);
        } catch (r) {
          return Q_(n, r), !1;
        }
      }
      function Bd(n, e, t, i, r) {
        return function s(o) {
          if (o === Function) return i;
          const a = 2 & n.flags ? Ft(n.index, e) : e;
          0 == (32 & e[2]) && vd(a);
          let l = Wy(e, 0, i, o),
            c = s.__ngNextListenerFn__;
          for (; c; ) (l = Wy(e, 0, c, o) && l), (c = c.__ngNextListenerFn__);
          return r && !1 === l && (o.preventDefault(), (o.returnValue = !1)), l;
        };
      }
      function re(n = 1) {
        return (function (n) {
          return (V.lFrame.contextLView = (function (n, e) {
            for (; n > 0; ) (e = e[15]), n--;
            return e;
          })(n, V.lFrame.contextLView))[8];
        })(n);
      }
      function PT(n, e) {
        let t = null;
        const i = (function (n) {
          const e = n.attrs;
          if (null != e) {
            const t = e.indexOf(5);
            if (0 == (1 & t)) return e[t + 1];
          }
          return null;
        })(n);
        for (let r = 0; r < e.length; r++) {
          const s = e[r];
          if ("*" !== s) {
            if (null === i ? y_(n, s, !0) : FI(i, s)) return r;
          } else t = r;
        }
        return t;
      }
      function ts(n) {
        const e = C()[16][6];
        if (!e.projection) {
          const i = (e.projection = fi(n ? n.length : 1, null)),
            r = i.slice();
          let s = e.child;
          for (; null !== s; ) {
            const o = n ? PT(s, n) : 0;
            null !== o &&
              (r[o] ? (r[o].projectionNext = s) : (i[o] = s), (r[o] = s)),
              (s = s.next);
          }
        }
      }
      function Wi(n, e = 0, t) {
        const i = C(),
          r = J(),
          s = Br(r, 20 + n, 16, null, t || null);
        null === s.projection && (s.projection = e),
          pu(),
          64 != (64 & s.flags) &&
            (function (n, e, t) {
              f_(e[G], 0, e, t, i_(n, t, e), a_(t.parent || e[6], t, e));
            })(r, i, s);
      }
      function nv(n, e, t, i, r) {
        const s = n[t + 1],
          o = null === e;
        let a = i ? fn(s) : Kn(s),
          l = !1;
        for (; 0 !== a && (!1 === l || o); ) {
          const u = n[a + 1];
          LT(n[a], e) && ((l = !0), (n[a + 1] = i ? rd(u) : nd(u))),
            (a = i ? fn(u) : Kn(u));
        }
        l && (n[t + 1] = i ? nd(s) : rd(s));
      }
      function LT(n, e) {
        return (
          null === n ||
          null == e ||
          (Array.isArray(n) ? n[1] : n) === e ||
          (!(!Array.isArray(n) || "string" != typeof e) && Rr(n, e) >= 0)
        );
      }
      function _t(n, e, t) {
        return mn(n, e, t, !1), _t;
      }
      function kt(n, e) {
        return mn(n, e, null, !0), kt;
      }
      function mn(n, e, t, i) {
        const r = C(),
          s = J(),
          o = (function (n) {
            const e = V.lFrame,
              t = e.bindingIndex;
            return (e.bindingIndex = e.bindingIndex + n), t;
          })(2);
        s.firstUpdatePass &&
          (function (n, e, t, i) {
            const r = n.data;
            if (null === r[t + 1]) {
              const s = r[mt()],
                o = (function (n, e) {
                  return e >= n.expandoStartIndex;
                })(n, t);
              (function (n, e) {
                return 0 != (n.flags & (e ? 16 : 32));
              })(s, i) &&
                null === e &&
                !o &&
                (e = !1),
                (e = (function (n, e, t, i) {
                  const r = (function (n) {
                    const e = V.lFrame.currentDirectiveIndex;
                    return -1 === e ? null : n[e];
                  })(n);
                  let s = i ? e.residualClasses : e.residualStyles;
                  if (null === r)
                    0 === (i ? e.classBindings : e.styleBindings) &&
                      ((t = fo((t = jd(null, n, e, t, i)), e.attrs, i)),
                      (s = null));
                  else {
                    const o = e.directiveStylingLast;
                    if (-1 === o || n[o] !== r)
                      if (((t = jd(r, n, e, t, i)), null === s)) {
                        let l = (function (n, e, t) {
                          const i = t ? e.classBindings : e.styleBindings;
                          if (0 !== Kn(i)) return n[fn(i)];
                        })(n, e, i);
                        void 0 !== l &&
                          Array.isArray(l) &&
                          ((l = jd(null, n, e, l[1], i)),
                          (l = fo(l, e.attrs, i)),
                          (function (n, e, t, i) {
                            n[fn(t ? e.classBindings : e.styleBindings)] = i;
                          })(n, e, i, l));
                      } else
                        s = (function (n, e, t) {
                          let i;
                          const r = e.directiveEnd;
                          for (let s = 1 + e.directiveStylingLast; s < r; s++)
                            i = fo(i, n[s].hostAttrs, t);
                          return fo(i, e.attrs, t);
                        })(n, e, i);
                  }
                  return (
                    void 0 !== s &&
                      (i ? (e.residualClasses = s) : (e.residualStyles = s)),
                    t
                  );
                })(r, s, e, i)),
                (function (n, e, t, i, r, s) {
                  let o = s ? e.classBindings : e.styleBindings,
                    a = fn(o),
                    l = Kn(o);
                  n[i] = t;
                  let u,
                    c = !1;
                  if (Array.isArray(t)) {
                    const d = t;
                    (u = d[1]), (null === u || Rr(d, u) > 0) && (c = !0);
                  } else u = t;
                  if (r)
                    if (0 !== l) {
                      const h = fn(n[a + 1]);
                      (n[i + 1] = Ya(h, a)),
                        0 !== h && (n[h + 1] = id(n[h + 1], i)),
                        (n[a + 1] = (function (n, e) {
                          return (131071 & n) | (e << 17);
                        })(n[a + 1], i));
                    } else
                      (n[i + 1] = Ya(a, 0)),
                        0 !== a && (n[a + 1] = id(n[a + 1], i)),
                        (a = i);
                  else
                    (n[i + 1] = Ya(l, 0)),
                      0 === a ? (a = i) : (n[l + 1] = id(n[l + 1], i)),
                      (l = i);
                  c && (n[i + 1] = nd(n[i + 1])),
                    nv(n, u, i, !0),
                    nv(n, u, i, !1),
                    (function (n, e, t, i, r) {
                      const s = r ? n.residualClasses : n.residualStyles;
                      null != s &&
                        "string" == typeof e &&
                        Rr(s, e) >= 0 &&
                        (t[i + 1] = rd(t[i + 1]));
                    })(e, u, n, i, s),
                    (o = Ya(a, l)),
                    s ? (e.classBindings = o) : (e.styleBindings = o);
                })(r, s, e, t, o, i);
            }
          })(s, n, o, i),
          e !== z &&
            rt(r, o, e) &&
            (function (n, e, t, i, r, s, o, a) {
              if (!(3 & e.type)) return;
              const l = n.data,
                c = l[a + 1];
              sl(
                (function (n) {
                  return 1 == (1 & n);
                })(c)
                  ? fv(l, e, t, r, Kn(c), o)
                  : void 0
              ) ||
                (sl(s) ||
                  ((function (n) {
                    return 2 == (2 & n);
                  })(c) &&
                    (s = fv(l, null, t, r, a, o))),
                (function (n, e, t, i, r) {
                  const s = Ie(n);
                  if (e)
                    r
                      ? s
                        ? n.addClass(t, i)
                        : t.classList.add(i)
                      : s
                      ? n.removeClass(t, i)
                      : t.classList.remove(i);
                  else {
                    let o = -1 === i.indexOf("-") ? void 0 : Ht.DashCase;
                    if (null == r)
                      s ? n.removeStyle(t, i, o) : t.style.removeProperty(i);
                    else {
                      const a =
                        "string" == typeof r && r.endsWith("!important");
                      a && ((r = r.slice(0, -10)), (o |= Ht.Important)),
                        s
                          ? n.setStyle(t, i, r, o)
                          : t.style.setProperty(i, r, a ? "important" : "");
                    }
                  }
                })(i, o, Ea(mt(), t), r, s));
            })(
              s,
              s.data[mt()],
              r,
              r[G],
              n,
              (r[o + 1] = (function (n, e) {
                return (
                  null == n ||
                    ("string" == typeof e
                      ? (n += e)
                      : "object" == typeof n && (n = K(Bt(n)))),
                  n
                );
              })(e, t)),
              i,
              o
            );
      }
      function jd(n, e, t, i, r) {
        let s = null;
        const o = t.directiveEnd;
        let a = t.directiveStylingLast;
        for (
          -1 === a ? (a = t.directiveStart) : a++;
          a < o && ((s = e[a]), (i = fo(i, s.hostAttrs, r)), s !== n);

        )
          a++;
        return null !== n && (t.directiveStylingLast = a), i;
      }
      function fo(n, e, t) {
        const i = t ? 1 : 2;
        let r = -1;
        if (null !== e)
          for (let s = 0; s < e.length; s++) {
            const o = e[s];
            "number" == typeof o
              ? (r = o)
              : r === i &&
                (Array.isArray(n) || (n = void 0 === n ? [] : ["", n]),
                Lt(n, o, !!t || e[++s]));
          }
        return void 0 === n ? null : n;
      }
      function fv(n, e, t, i, r, s) {
        const o = null === e;
        let a;
        for (; r > 0; ) {
          const l = n[r],
            c = Array.isArray(l),
            u = c ? l[1] : l,
            d = null === u;
          let h = t[r + 1];
          h === z && (h = d ? me : void 0);
          let f = d ? Iu(h, i) : u === i ? h : void 0;
          if ((c && !sl(f) && (f = Iu(l, i)), sl(f) && ((a = f), o))) return a;
          const p = n[r + 1];
          r = o ? fn(p) : Kn(p);
        }
        if (null !== e) {
          let l = s ? e.residualClasses : e.residualStyles;
          null != l && (a = Iu(l, i));
        }
        return a;
      }
      function sl(n) {
        return void 0 !== n;
      }
      function Te(n, e = "") {
        const t = C(),
          i = J(),
          r = n + 20,
          s = i.firstCreatePass ? Br(i, r, 1, e, null) : i.data[r],
          o = (t[r] = (function (n, e) {
            return Ie(n) ? n.createText(e) : n.createTextNode(e);
          })(t[G], e));
        qa(i, t, o, s), kn(s, !1);
      }
      function is(n) {
        return po("", n, ""), is;
      }
      function po(n, e, t) {
        const i = C(),
          r = (function (n, e, t, i) {
            return rt(n, wr(), t) ? e + U(t) + i : z;
          })(i, n, e, t);
        return r !== z && Yn(i, mt(), r), po;
      }
      function Ud(n, e, t) {
        const i = C();
        return rt(i, wr(), e) && jt(J(), ke(), i, n, e, i[G], t, !0), Ud;
      }
      const qi = void 0;
      var yA = [
        "en",
        [["a", "p"], ["AM", "PM"], qi],
        [["AM", "PM"], qi, qi],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        qi,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        qi,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", qi, "{1} 'at' {0}", qi],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function (n) {
          const t = Math.floor(Math.abs(n)),
            i = n.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === t && 0 === i ? 1 : 5;
        },
      ];
      let rs = {};
      function Pv(n) {
        return (
          n in rs ||
            (rs[n] =
              le.ng &&
              le.ng.common &&
              le.ng.common.locales &&
              le.ng.common.locales[n]),
          rs[n]
        );
      }
      var M = (() => (
        ((M = M || {})[(M.LocaleId = 0)] = "LocaleId"),
        (M[(M.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
        (M[(M.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
        (M[(M.DaysFormat = 3)] = "DaysFormat"),
        (M[(M.DaysStandalone = 4)] = "DaysStandalone"),
        (M[(M.MonthsFormat = 5)] = "MonthsFormat"),
        (M[(M.MonthsStandalone = 6)] = "MonthsStandalone"),
        (M[(M.Eras = 7)] = "Eras"),
        (M[(M.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
        (M[(M.WeekendRange = 9)] = "WeekendRange"),
        (M[(M.DateFormat = 10)] = "DateFormat"),
        (M[(M.TimeFormat = 11)] = "TimeFormat"),
        (M[(M.DateTimeFormat = 12)] = "DateTimeFormat"),
        (M[(M.NumberSymbols = 13)] = "NumberSymbols"),
        (M[(M.NumberFormats = 14)] = "NumberFormats"),
        (M[(M.CurrencyCode = 15)] = "CurrencyCode"),
        (M[(M.CurrencySymbol = 16)] = "CurrencySymbol"),
        (M[(M.CurrencyName = 17)] = "CurrencyName"),
        (M[(M.Currencies = 18)] = "Currencies"),
        (M[(M.Directionality = 19)] = "Directionality"),
        (M[(M.PluralCase = 20)] = "PluralCase"),
        (M[(M.ExtraData = 21)] = "ExtraData"),
        M
      ))();
      const ol = "en-US";
      let Fv = ol;
      function Gd(n, e, t, i, r) {
        if (((n = k(n)), Array.isArray(n)))
          for (let s = 0; s < n.length; s++) Gd(n[s], e, t, i, r);
        else {
          const s = J(),
            o = C();
          let a = zr(n) ? n : k(n.provide),
            l = ty(n);
          const c = je(),
            u = 1048575 & c.providerIndexes,
            d = c.directiveStart,
            h = c.providerIndexes >> 20;
          if (zr(n) || !n.multi) {
            const f = new Bs(l, r, v),
              p = qd(a, e, r ? u : u + h, d);
            -1 === p
              ? (Fa(js(c, o), s, a),
                Wd(s, n, e.length),
                e.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 1048576),
                t.push(f),
                o.push(f))
              : ((t[p] = f), (o[p] = f));
          } else {
            const f = qd(a, e, u + h, d),
              p = qd(a, e, u, u + h),
              g = f >= 0 && t[f],
              m = p >= 0 && t[p];
            if ((r && !m) || (!r && !g)) {
              Fa(js(c, o), s, a);
              const y = (function (n, e, t, i, r) {
                const s = new Bs(n, t, v);
                return (
                  (s.multi = []),
                  (s.index = e),
                  (s.componentProviders = 0),
                  sb(s, r, i && !t),
                  s
                );
              })(r ? gR : mR, t.length, r, i, l);
              !r && m && (t[p].providerFactory = y),
                Wd(s, n, e.length, 0),
                e.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 1048576),
                t.push(y),
                o.push(y);
            } else Wd(s, n, f > -1 ? f : p, sb(t[r ? p : f], l, !r && i));
            !r && i && m && t[p].componentProviders++;
          }
        }
      }
      function Wd(n, e, t, i) {
        const r = zr(e);
        if (
          r ||
          (function (n) {
            return !!n.useClass;
          })(e)
        ) {
          const o = (e.useClass || e).prototype.ngOnDestroy;
          if (o) {
            const a = n.destroyHooks || (n.destroyHooks = []);
            if (!r && e.multi) {
              const l = a.indexOf(t);
              -1 === l ? a.push(t, [i, o]) : a[l + 1].push(i, o);
            } else a.push(t, o);
          }
        }
      }
      function sb(n, e, t) {
        return t && n.componentProviders++, n.multi.push(e) - 1;
      }
      function qd(n, e, t, i) {
        for (let r = t; r < i; r++) if (e[r] === n) return r;
        return -1;
      }
      function mR(n, e, t, i) {
        return Kd(this.multi, []);
      }
      function gR(n, e, t, i) {
        const r = this.multi;
        let s;
        if (this.providerFactory) {
          const o = this.providerFactory.componentProviders,
            a = Us(t, t[1], this.providerFactory.index, i);
          (s = a.slice(0, o)), Kd(r, s);
          for (let l = o; l < a.length; l++) s.push(a[l]);
        } else (s = []), Kd(r, s);
        return s;
      }
      function Kd(n, e) {
        for (let t = 0; t < n.length; t++) e.push((0, n[t])());
        return e;
      }
      function fe(n, e = []) {
        return (t) => {
          t.providersResolver = (i, r) =>
            (function (n, e, t) {
              const i = J();
              if (i.firstCreatePass) {
                const r = dn(n);
                Gd(t, i.data, i.blueprint, r, !0),
                  Gd(e, i.data, i.blueprint, r, !1);
              }
            })(i, r ? r(n) : n, e);
        };
      }
      class ob {}
      const lb = "ngComponent";
      class vR {
        resolveComponentFactory(e) {
          throw (function (n) {
            const e = Error(
              `No component factory found for ${K(
                n
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e[lb] = n), e;
          })(e);
        }
      }
      let Ki = (() => {
        class n {}
        return (n.NULL = new vR()), n;
      })();
      function dl(...n) {}
      function os(n, e) {
        return new ge(Zt(n, e));
      }
      const DR = function () {
        return os(je(), C());
      };
      let ge = (() => {
        class n {
          constructor(t) {
            this.nativeElement = t;
          }
        }
        return (n.__NG_ELEMENT_ID__ = DR), n;
      })();
      function cb(n) {
        return n instanceof ge ? n.nativeElement : n;
      }
      class Yi {}
      let Qi = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = () => wR()), n;
      })();
      const wR = function () {
        const n = C(),
          t = Ft(je().index, n);
        return (function (n) {
          return n[G];
        })(In(t) ? t : n);
      };
      let Qd = (() => {
        class n {}
        return (
          (n.ɵprov = I({ token: n, providedIn: "root", factory: () => null })),
          n
        );
      })();
      class Xi {
        constructor(e) {
          (this.full = e),
            (this.major = e.split(".")[0]),
            (this.minor = e.split(".")[1]),
            (this.patch = e.split(".").slice(2).join("."));
        }
      }
      const ub = new Xi("13.0.2"),
        as = {};
      function hl(n, e, t, i, r = !1) {
        for (; null !== t; ) {
          const s = e[t.index];
          if ((null !== s && i.push(Ne(s)), un(s)))
            for (let a = 10; a < s.length; a++) {
              const l = s[a],
                c = l[1].firstChild;
              null !== c && hl(l[1], l, c, i);
            }
          const o = t.type;
          if (8 & o) hl(n, e, t.child, i);
          else if (32 & o) {
            const a = Gu(t, e);
            let l;
            for (; (l = a()); ) i.push(l);
          } else if (16 & o) {
            const a = d_(e, t);
            if (Array.isArray(a)) i.push(...a);
            else {
              const l = no(e[16]);
              hl(l[1], l, a, i, !0);
            }
          }
          t = r ? t.projectionNext : t.next;
        }
        return i;
      }
      class vo {
        constructor(e, t) {
          (this._lView = e),
            (this._cdRefInjectingView = t),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const e = this._lView,
            t = e[1];
          return hl(t, e, t.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(e) {
          this._lView[8] = e;
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const e = this._lView[3];
            if (un(e)) {
              const t = e[8],
                i = t ? t.indexOf(this) : -1;
              i > -1 && (Qu(e, i), ji(t, i));
            }
            this._attachedToViewContainer = !1;
          }
          n_(this._lView[1], this._lView);
        }
        onDestroy(e) {
          L_(this._lView[1], this._lView, null, e);
        }
        markForCheck() {
          vd(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          Cd(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (n, e, t) {
            Ma(!0);
            try {
              Cd(n, e, t);
            } finally {
              Ma(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef() {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          var e;
          (this._appRef = null),
            io(this._lView[1], (e = this._lView), e[G], 2, null, null);
        }
        attachToAppRef(e) {
          if (this._attachedToViewContainer)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = e;
        }
      }
      class SR extends vo {
        constructor(e) {
          super(e), (this._view = e);
        }
        detectChanges() {
          W_(this._view);
        }
        checkNoChanges() {
          !(function (n) {
            Ma(!0);
            try {
              W_(n);
            } finally {
              Ma(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      class db extends Ki {
        constructor(e) {
          super(), (this.ngModule = e);
        }
        resolveComponentFactory(e) {
          const t = tt(e);
          return new Xd(t, this.ngModule);
        }
      }
      function hb(n) {
        const e = [];
        for (let t in n)
          n.hasOwnProperty(t) && e.push({ propName: n[t], templateName: t });
        return e;
      }
      const kR = new x("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => qg,
      });
      class Xd extends ob {
        constructor(e, t) {
          super(),
            (this.componentDef = e),
            (this.ngModule = t),
            (this.componentType = e.type),
            (this.selector = e.selectors.map(NI).join(",")),
            (this.ngContentSelectors = e.ngContentSelectors
              ? e.ngContentSelectors
              : []),
            (this.isBoundToModule = !!t);
        }
        get inputs() {
          return hb(this.componentDef.inputs);
        }
        get outputs() {
          return hb(this.componentDef.outputs);
        }
        create(e, t, i, r) {
          const s = (r = r || this.ngModule)
              ? (function (n, e) {
                  return {
                    get: (t, i, r) => {
                      const s = n.get(t, as, r);
                      return s !== as || i === as ? s : e.get(t, i, r);
                    },
                  };
                })(e, r.injector)
              : e,
            o = s.get(Yi, Um),
            a = s.get(Qd, null),
            l = o.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            u = i
              ? (function (n, e, t) {
                  if (Ie(n)) return n.selectRootElement(e, t === wt.ShadowDom);
                  let i = "string" == typeof e ? n.querySelector(e) : e;
                  return (i.textContent = ""), i;
                })(l, i, this.componentDef.encapsulation)
              : Yu(
                  o.createRenderer(null, this.componentDef),
                  c,
                  (function (n) {
                    const e = n.toLowerCase();
                    return "svg" === e
                      ? Hm
                      : "math" === e
                      ? "http://www.w3.org/1998/MathML/"
                      : null;
                  })(c)
                ),
            d = this.componentDef.onPush ? 576 : 528,
            h = (function (n, e) {
              return {
                components: [],
                scheduler: n || qg,
                clean: Ek,
                playerHandler: e || null,
                flags: 0,
              };
            })(),
            f = Za(0, null, null, 1, 0, null, null, null, null, null),
            p = ro(null, f, h, d, null, null, o, l, a, s);
          let g, m;
          xa(p);
          try {
            const y = (function (n, e, t, i, r, s) {
              const o = t[1];
              t[20] = n;
              const l = Br(o, 20, 2, "#host", null),
                c = (l.mergedAttrs = e.hostAttrs);
              null !== c &&
                (el(l, c, !0),
                null !== n &&
                  (Aa(r, n, c),
                  null !== l.classes && td(r, n, l.classes),
                  null !== l.styles && p_(r, n, l.styles)));
              const u = i.createRenderer(n, e),
                d = ro(
                  t,
                  P_(e),
                  null,
                  e.onPush ? 64 : 16,
                  t[20],
                  l,
                  i,
                  u,
                  s || null,
                  null
                );
              return (
                o.firstCreatePass &&
                  (Fa(js(l, t), o, e.type), U_(o, l), z_(l, t.length, 1)),
                Ja(t, d),
                (t[20] = d)
              );
            })(u, this.componentDef, p, o, l);
            if (u)
              if (i) Aa(l, u, ["ng-version", ub.full]);
              else {
                const { attrs: _, classes: D } = (function (n) {
                  const e = [],
                    t = [];
                  let i = 1,
                    r = 2;
                  for (; i < n.length; ) {
                    let s = n[i];
                    if ("string" == typeof s)
                      2 === r
                        ? "" !== s && e.push(s, n[++i])
                        : 8 === r && t.push(s);
                    else {
                      if (!hn(r)) break;
                      r = s;
                    }
                    i++;
                  }
                  return { attrs: e, classes: t };
                })(this.componentDef.selectors[0]);
                _ && Aa(l, u, _), D && D.length > 0 && td(l, u, D.join(" "));
              }
            if (((m = uu(f, 20)), void 0 !== t)) {
              const _ = (m.projection = []);
              for (let D = 0; D < this.ngContentSelectors.length; D++) {
                const E = t[D];
                _.push(null != E ? Array.from(E) : null);
              }
            }
            (g = (function (n, e, t, i, r) {
              const s = t[1],
                o = (function (n, e, t) {
                  const i = je();
                  n.firstCreatePass &&
                    (t.providersResolver && t.providersResolver(t),
                    $_(n, i, e, Hr(n, e, 1, null), t));
                  const r = Us(e, n, i.directiveStart, i);
                  it(r, e);
                  const s = Zt(i, e);
                  return s && it(s, e), r;
                })(s, t, e);
              if (
                (i.components.push(o),
                (n[8] = o),
                r && r.forEach((l) => l(o, e)),
                e.contentQueries)
              ) {
                const l = je();
                e.contentQueries(1, o, l.directiveStart);
              }
              const a = je();
              return (
                !s.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (di(a.index),
                  H_(t[1], a, 0, a.directiveStart, a.directiveEnd, e),
                  j_(e, o)),
                o
              );
            })(y, this.componentDef, p, h, [Yk])),
              so(f, p, null);
          } finally {
            Sa();
          }
          return new RR(this.componentType, g, os(m, p), p, m);
        }
      }
      class RR extends class {} {
        constructor(e, t, i, r, s) {
          super(),
            (this.location = i),
            (this._rootLView = r),
            (this._tNode = s),
            (this.instance = t),
            (this.hostView = this.changeDetectorRef = new SR(r)),
            (this.componentType = e);
        }
        get injector() {
          return new Sr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(e) {
          this.hostView.onDestroy(e);
        }
      }
      class Zi {}
      const ls = new Map();
      class pb extends Zi {
        constructor(e, t) {
          super(),
            (this._parent = t),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new db(this));
          const i = Yt(e);
          (this._bootstrapComponents = Pn(i.bootstrap)),
            (this._r3Injector = ey(
              e,
              t,
              [
                { provide: Zi, useValue: this },
                { provide: Ki, useValue: this.componentFactoryResolver },
              ],
              K(e)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(e));
        }
        get(e, t = ye.THROW_IF_NOT_FOUND, i = F.Default) {
          return e === ye || e === Zi || e === oo
            ? this
            : this._r3Injector.get(e, t, i);
        }
        destroy() {
          const e = this._r3Injector;
          !e.destroyed && e.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(e) {
          this.destroyCbs.push(e);
        }
      }
      class Jd extends class {} {
        constructor(e) {
          super(),
            (this.moduleType = e),
            null !== Yt(e) &&
              (function (n) {
                const e = new Set();
                !(function t(i) {
                  const r = Yt(i, !0),
                    s = r.id;
                  null !== s &&
                    ((function (n, e, t) {
                      if (e && e !== t)
                        throw new Error(
                          `Duplicate module registered for ${n} - ${K(
                            e
                          )} vs ${K(e.name)}`
                        );
                    })(s, ls.get(s), i),
                    ls.set(s, i));
                  const o = Pn(r.imports);
                  for (const a of o) e.has(a) || (e.add(a), t(a));
                })(n);
              })(e);
        }
        create(e) {
          return new pb(this.moduleType, e);
        }
      }
      function gb(n, e, t, i) {
        return (function (n, e, t, i, r, s) {
          const o = e + t;
          return rt(n, o, r)
            ? Nn(n, o + 1, s ? i.call(s, r) : i(r))
            : (function (n, e) {
                const t = n[e];
                return t === z ? void 0 : t;
              })(n, o + 1);
        })(C(), pt(), n, e, t, i);
      }
      function eh(n) {
        return (e) => {
          setTimeout(n, void 0, e);
        };
      }
      const ce = class extends q {
        constructor(e = !1) {
          super(), (this.__isAsync = e);
        }
        emit(e) {
          super.next(e);
        }
        subscribe(e, t, i) {
          var l, c, u;
          let r = e,
            s = t || (() => null),
            o = i;
          if (e && "object" == typeof e) {
            const d = e;
            (r = null == (l = d.next) ? void 0 : l.bind(d)),
              (s = null == (c = d.error) ? void 0 : c.bind(d)),
              (o = null == (u = d.complete) ? void 0 : u.bind(d));
          }
          this.__isAsync && ((s = eh(s)), r && (r = eh(r)), o && (o = eh(o)));
          const a = super.subscribe({ next: r, error: s, complete: o });
          return e instanceof Oe && e.add(a), a;
        }
      };
      function ZR() {
        return this._results[$r()]();
      }
      class cs {
        constructor(e = !1) {
          (this._emitDistinctChangesOnly = e),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const t = $r(),
            i = cs.prototype;
          i[t] || (i[t] = ZR);
        }
        get changes() {
          return this._changes || (this._changes = new ce());
        }
        get(e) {
          return this._results[e];
        }
        map(e) {
          return this._results.map(e);
        }
        filter(e) {
          return this._results.filter(e);
        }
        find(e) {
          return this._results.find(e);
        }
        reduce(e, t) {
          return this._results.reduce(e, t);
        }
        forEach(e) {
          this._results.forEach(e);
        }
        some(e) {
          return this._results.some(e);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(e, t) {
          const i = this;
          i.dirty = !1;
          const r = Jt(e);
          (this._changesDetected = !(function (n, e, t) {
            if (n.length !== e.length) return !1;
            for (let i = 0; i < n.length; i++) {
              let r = n[i],
                s = e[i];
              if ((t && ((r = t(r)), (s = t(s))), s !== r)) return !1;
            }
            return !0;
          })(i._results, r, t)) &&
            ((i._results = r),
            (i.length = r.length),
            (i.last = r[this.length - 1]),
            (i.first = r[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      Symbol;
      const eO = function () {
        return fl(je(), C());
      };
      let Xn = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = eO), n;
      })();
      const tO = Xn,
        nO = class extends tO {
          constructor(e, t, i) {
            super(),
              (this._declarationLView = e),
              (this._declarationTContainer = t),
              (this.elementRef = i);
          }
          createEmbeddedView(e) {
            const t = this._declarationTContainer.tViews,
              i = ro(
                this._declarationLView,
                t,
                e,
                16,
                null,
                t.declTNode,
                null,
                null,
                null,
                null
              );
            i[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (i[19] = s.createEmbeddedView(t)),
              so(t, i, e),
              new vo(i)
            );
          }
        };
      function fl(n, e) {
        return 4 & n.type ? new nO(e, n, os(n, e)) : null;
      }
      const sO = function () {
        return wb(je(), C());
      };
      let _n = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = sO), n;
      })();
      const aO = _n,
        Db = class extends aO {
          constructor(e, t, i) {
            super(),
              (this._lContainer = e),
              (this._hostTNode = t),
              (this._hostLView = i);
          }
          get element() {
            return os(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Sr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const e = Pa(this._hostTNode, this._hostLView);
            if (sg(e)) {
              const t = xr(e, this._hostLView),
                i = Mr(e);
              return new Sr(t[1].data[i + 8], t);
            }
            return new Sr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(e) {
            const t = Eb(this._lContainer);
            return (null !== t && t[e]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(e, t, i) {
            const r = e.createEmbeddedView(t || {});
            return this.insert(r, i), r;
          }
          createComponent(e, t, i, r, s) {
            const o = e && !("function" == typeof e);
            let a;
            if (o) a = t;
            else {
              const d = t || {};
              (a = d.index),
                (i = d.injector),
                (r = d.projectableNodes),
                (s = d.ngModuleRef);
            }
            const l = o ? e : new Xd(tt(e)),
              c = i || this.parentInjector;
            if (!s && null == l.ngModule && c) {
              const d = c.get(Zi, null);
              d && (s = d);
            }
            const u = l.create(c, r, void 0, s);
            return this.insert(u.hostView, a), u;
          }
          insert(e, t) {
            const i = e._lView,
              r = i[1];
            if (un(i[3])) {
              const u = this.indexOf(e);
              if (-1 !== u) this.detach(u);
              else {
                const d = i[3],
                  h = new Db(d, d[6], d[3]);
                h.detach(h.indexOf(e));
              }
            }
            const s = this._adjustIndex(t),
              o = this._lContainer;
            !(function (n, e, t, i) {
              const r = 10 + i,
                s = t.length;
              i > 0 && (t[r - 1][4] = e),
                i < s - 10
                  ? ((e[4] = t[r]), La(t, 10 + i, e))
                  : (t.push(e), (e[4] = null)),
                (e[3] = t);
              const o = e[17];
              null !== o &&
                t !== o &&
                (function (n, e) {
                  const t = n[9];
                  e[16] !== e[3][3][16] && (n[2] = !0),
                    null === t ? (n[9] = [e]) : t.push(e);
                })(o, e);
              const a = e[19];
              null !== a && a.insertView(n), (e[2] |= 128);
            })(r, i, o, s);
            const a = Ju(s, o),
              l = i[G],
              c = Wa(l, o[7]);
            return (
              null !== c &&
                (function (n, e, t, i, r, s) {
                  (i[0] = r), (i[6] = e), io(n, i, t, 1, r, s);
                })(r, o[6], l, i, c, a),
              e.attachToViewContainerRef(),
              La(th(o), s, e),
              e
            );
          }
          move(e, t) {
            return this.insert(e, t);
          }
          indexOf(e) {
            const t = Eb(this._lContainer);
            return null !== t ? t.indexOf(e) : -1;
          }
          remove(e) {
            const t = this._adjustIndex(e, -1),
              i = Qu(this._lContainer, t);
            i && (ji(th(this._lContainer), t), n_(i[1], i));
          }
          detach(e) {
            const t = this._adjustIndex(e, -1),
              i = Qu(this._lContainer, t);
            return i && null != ji(th(this._lContainer), t) ? new vo(i) : null;
          }
          _adjustIndex(e, t = 0) {
            return null == e ? this.length + t : e;
          }
        };
      function Eb(n) {
        return n[8];
      }
      function th(n) {
        return n[8] || (n[8] = []);
      }
      function wb(n, e) {
        let t;
        const i = e[n.index];
        if (un(i)) t = i;
        else {
          let r;
          if (8 & n.type) r = Ne(i);
          else {
            const s = e[G];
            r = s.createComment("");
            const o = Zt(n, e);
            $i(
              s,
              Wa(s, o),
              r,
              (function (n, e) {
                return Ie(n) ? n.nextSibling(e) : e.nextSibling;
              })(s, o),
              !1
            );
          }
          (e[n.index] = t = G_(i, e, r, n)), Ja(e, t);
        }
        return new Db(t, n, e);
      }
      class nh {
        constructor(e) {
          (this.queryList = e), (this.matches = null);
        }
        clone() {
          return new nh(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class ih {
        constructor(e = []) {
          this.queries = e;
        }
        createEmbeddedView(e) {
          const t = e.queries;
          if (null !== t) {
            const i =
                null !== e.contentQueries ? e.contentQueries[0] : t.length,
              r = [];
            for (let s = 0; s < i; s++) {
              const o = t.getByIndex(s);
              r.push(this.queries[o.indexInDeclarationView].clone());
            }
            return new ih(r);
          }
          return null;
        }
        insertView(e) {
          this.dirtyQueriesWithMatches(e);
        }
        detachView(e) {
          this.dirtyQueriesWithMatches(e);
        }
        dirtyQueriesWithMatches(e) {
          for (let t = 0; t < this.queries.length; t++)
            null !== kb(e, t).matches && this.queries[t].setDirty();
        }
      }
      class Mb {
        constructor(e, t, i = null) {
          (this.predicate = e), (this.flags = t), (this.read = i);
        }
      }
      class rh {
        constructor(e = []) {
          this.queries = e;
        }
        elementStart(e, t) {
          for (let i = 0; i < this.queries.length; i++)
            this.queries[i].elementStart(e, t);
        }
        elementEnd(e) {
          for (let t = 0; t < this.queries.length; t++)
            this.queries[t].elementEnd(e);
        }
        embeddedTView(e) {
          let t = null;
          for (let i = 0; i < this.length; i++) {
            const r = null !== t ? t.length : 0,
              s = this.getByIndex(i).embeddedTView(e, r);
            s &&
              ((s.indexInDeclarationView = i),
              null !== t ? t.push(s) : (t = [s]));
          }
          return null !== t ? new rh(t) : null;
        }
        template(e, t) {
          for (let i = 0; i < this.queries.length; i++)
            this.queries[i].template(e, t);
        }
        getByIndex(e) {
          return this.queries[e];
        }
        get length() {
          return this.queries.length;
        }
        track(e) {
          this.queries.push(e);
        }
      }
      class sh {
        constructor(e, t = -1) {
          (this.metadata = e),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = t);
        }
        elementStart(e, t) {
          this.isApplyingToNode(t) && this.matchTNode(e, t);
        }
        elementEnd(e) {
          this._declarationNodeIndex === e.index &&
            (this._appliesToNextNode = !1);
        }
        template(e, t) {
          this.elementStart(e, t);
        }
        embeddedTView(e, t) {
          return this.isApplyingToNode(e)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-e.index, t),
              new sh(this.metadata))
            : null;
        }
        isApplyingToNode(e) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const t = this._declarationNodeIndex;
            let i = e.parent;
            for (; null !== i && 8 & i.type && i.index !== t; ) i = i.parent;
            return t === (null !== i ? i.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(e, t) {
          const i = this.metadata.predicate;
          if (Array.isArray(i))
            for (let r = 0; r < i.length; r++) {
              const s = i[r];
              this.matchTNodeWithReadOption(e, t, uO(t, s)),
                this.matchTNodeWithReadOption(e, t, Na(t, e, s, !1, !1));
            }
          else
            i === Xn
              ? 4 & t.type && this.matchTNodeWithReadOption(e, t, -1)
              : this.matchTNodeWithReadOption(e, t, Na(t, e, i, !1, !1));
        }
        matchTNodeWithReadOption(e, t, i) {
          if (null !== i) {
            const r = this.metadata.read;
            if (null !== r)
              if (r === ge || r === _n || (r === Xn && 4 & t.type))
                this.addMatch(t.index, -2);
              else {
                const s = Na(t, e, r, !1, !1);
                null !== s && this.addMatch(t.index, s);
              }
            else this.addMatch(t.index, i);
          }
        }
        addMatch(e, t) {
          null === this.matches
            ? (this.matches = [e, t])
            : this.matches.push(e, t);
        }
      }
      function uO(n, e) {
        const t = n.localNames;
        if (null !== t)
          for (let i = 0; i < t.length; i += 2) if (t[i] === e) return t[i + 1];
        return null;
      }
      function hO(n, e, t, i) {
        return -1 === t
          ? (function (n, e) {
              return 11 & n.type ? os(n, e) : 4 & n.type ? fl(n, e) : null;
            })(e, n)
          : -2 === t
          ? (function (n, e, t) {
              return t === ge
                ? os(e, n)
                : t === Xn
                ? fl(e, n)
                : t === _n
                ? wb(e, n)
                : void 0;
            })(n, e, i)
          : Us(n, n[1], t, e);
      }
      function xb(n, e, t, i) {
        const r = e[19].queries[i];
        if (null === r.matches) {
          const s = n.data,
            o = t.matches,
            a = [];
          for (let l = 0; l < o.length; l += 2) {
            const c = o[l];
            a.push(c < 0 ? null : hO(e, s[c], o[l + 1], t.metadata.read));
          }
          r.matches = a;
        }
        return r.matches;
      }
      function oh(n, e, t, i) {
        const r = n.queries.getByIndex(t),
          s = r.matches;
        if (null !== s) {
          const o = xb(n, e, r, t);
          for (let a = 0; a < s.length; a += 2) {
            const l = s[a];
            if (l > 0) i.push(o[a / 2]);
            else {
              const c = s[a + 1],
                u = e[-l];
              for (let d = 10; d < u.length; d++) {
                const h = u[d];
                h[17] === h[3] && oh(h[1], h, c, i);
              }
              if (null !== u[9]) {
                const d = u[9];
                for (let h = 0; h < d.length; h++) {
                  const f = d[h];
                  oh(f[1], f, c, i);
                }
              }
            }
          }
        }
        return i;
      }
      function Ut(n) {
        const e = C(),
          t = J(),
          i = Ym();
        _u(i + 1);
        const r = kb(t, i);
        if (n.dirty && zm(e) === (2 == (2 & r.metadata.flags))) {
          if (null === r.matches) n.reset([]);
          else {
            const s = r.crossesNgTemplate ? oh(t, e, i, []) : xb(t, e, r, i);
            n.reset(s, cb), n.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function us(n, e, t) {
        const i = J();
        i.firstCreatePass &&
          (Ib(i, new Mb(n, e, t), -1),
          2 == (2 & e) && (i.staticViewQueries = !0)),
          Sb(i, C(), e);
      }
      function yi(n, e, t, i) {
        const r = J();
        if (r.firstCreatePass) {
          const s = je();
          Ib(r, new Mb(e, t, i), s.index),
            (function (n, e) {
              const t = n.contentQueries || (n.contentQueries = []);
              e !== (t.length ? t[t.length - 1] : -1) &&
                t.push(n.queries.length - 1, e);
            })(r, n),
            2 == (2 & t) && (r.staticContentQueries = !0);
        }
        Sb(r, C(), t);
      }
      function zt() {
        return (n = C()), (e = Ym()), n[19].queries[e].queryList;
        var n, e;
      }
      function Sb(n, e, t) {
        const i = new cs(4 == (4 & t));
        L_(n, e, i, i.destroy),
          null === e[19] && (e[19] = new ih()),
          e[19].queries.push(new nh(i));
      }
      function Ib(n, e, t) {
        null === n.queries && (n.queries = new rh()),
          n.queries.track(new sh(e, t));
      }
      function kb(n, e) {
        return n.queries.getByIndex(e);
      }
      const gl = new x("Application Initializer");
      let hs = (() => {
        class n {
          constructor(t) {
            (this.appInits = t),
              (this.resolve = dl),
              (this.reject = dl),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((i, r) => {
                (this.resolve = i), (this.reject = r);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              i = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let r = 0; r < this.appInits.length; r++) {
                const s = this.appInits[r]();
                if (rl(s)) t.push(s);
                else if (Vd(s)) {
                  const o = new Promise((a, l) => {
                    s.subscribe({ complete: a, error: l });
                  });
                  t.push(o);
                }
              }
            Promise.all(t)
              .then(() => {
                i();
              })
              .catch((r) => {
                this.reject(r);
              }),
              0 === t.length && i(),
              (this.initialized = !0);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(b(gl, 8));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const Eo = new x("AppId"),
        zO = {
          provide: Eo,
          useFactory: function () {
            return `${hh()}${hh()}${hh()}`;
          },
          deps: [],
        };
      function hh() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const qb = new x("Platform Initializer"),
        _l = new x("Platform ID"),
        $O = new x("appBootstrapListener");
      let fh = (() => {
        class n {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const Zn = new x("LocaleId"),
        Kb = new x("DefaultCurrencyCode");
      class WO {
        constructor(e, t) {
          (this.ngModuleFactory = e), (this.componentFactories = t);
        }
      }
      const ph = function (n) {
          return new Jd(n);
        },
        qO = ph,
        KO = function (n) {
          return Promise.resolve(ph(n));
        },
        Qb = function (n) {
          const e = ph(n),
            i = Pn(Yt(n).declarations).reduce((r, s) => {
              const o = tt(s);
              return o && r.push(new Xd(o)), r;
            }, []);
          return new WO(e, i);
        },
        YO = Qb,
        QO = function (n) {
          return Promise.resolve(Qb(n));
        };
      let Xb = (() => {
        class n {
          constructor() {
            (this.compileModuleSync = qO),
              (this.compileModuleAsync = KO),
              (this.compileModuleAndAllComponentsSync = YO),
              (this.compileModuleAndAllComponentsAsync = QO);
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const JO = (() => Promise.resolve(0))();
      function mh(n) {
        "undefined" == typeof Zone
          ? JO.then(() => {
              n && n.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", n);
      }
      class oe {
        constructor({
          enableLongStackTrace: e = !1,
          shouldCoalesceEventChangeDetection: t = !1,
          shouldCoalesceRunChangeDetection: i = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ce(!1)),
            (this.onMicrotaskEmpty = new ce(!1)),
            (this.onStable = new ce(!1)),
            (this.onError = new ce(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched();
          const r = this;
          (r._nesting = 0),
            (r._outer = r._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec())),
            e &&
              Zone.longStackTraceZoneSpec &&
              (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)),
            (r.shouldCoalesceEventChangeDetection = !i && t),
            (r.shouldCoalesceRunChangeDetection = i),
            (r.lastRequestAnimationFrameId = -1),
            (r.nativeRequestAnimationFrame = (function () {
              let n = le.requestAnimationFrame,
                e = le.cancelAnimationFrame;
              if ("undefined" != typeof Zone && n && e) {
                const t = n[Zone.__symbol__("OriginalDelegate")];
                t && (n = t);
                const i = e[Zone.__symbol__("OriginalDelegate")];
                i && (e = i);
              }
              return {
                nativeRequestAnimationFrame: n,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function (n) {
              const e = () => {
                !(function (n) {
                  n.isCheckStableRunning ||
                    -1 !== n.lastRequestAnimationFrameId ||
                    ((n.lastRequestAnimationFrameId =
                      n.nativeRequestAnimationFrame.call(le, () => {
                        n.fakeTopEventTask ||
                          (n.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (n.lastRequestAnimationFrameId = -1),
                                _h(n),
                                (n.isCheckStableRunning = !0),
                                gh(n),
                                (n.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          n.fakeTopEventTask.invoke();
                      })),
                    _h(n));
                })(n);
              };
              n._inner = n._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (t, i, r, s, o, a) => {
                  try {
                    return Zb(n), t.invokeTask(r, s, o, a);
                  } finally {
                    ((n.shouldCoalesceEventChangeDetection &&
                      "eventTask" === s.type) ||
                      n.shouldCoalesceRunChangeDetection) &&
                      e(),
                      Jb(n);
                  }
                },
                onInvoke: (t, i, r, s, o, a, l) => {
                  try {
                    return Zb(n), t.invoke(r, s, o, a, l);
                  } finally {
                    n.shouldCoalesceRunChangeDetection && e(), Jb(n);
                  }
                },
                onHasTask: (t, i, r, s) => {
                  t.hasTask(r, s),
                    i === r &&
                      ("microTask" == s.change
                        ? ((n._hasPendingMicrotasks = s.microTask),
                          _h(n),
                          gh(n))
                        : "macroTask" == s.change &&
                          (n.hasPendingMacrotasks = s.macroTask));
                },
                onHandleError: (t, i, r, s) => (
                  t.handleError(r, s),
                  n.runOutsideAngular(() => n.onError.emit(s)),
                  !1
                ),
              });
            })(r);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!oe.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (oe.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(e, t, i) {
          return this._inner.run(e, t, i);
        }
        runTask(e, t, i, r) {
          const s = this._inner,
            o = s.scheduleEventTask("NgZoneEvent: " + r, e, tP, dl, dl);
          try {
            return s.runTask(o, t, i);
          } finally {
            s.cancelTask(o);
          }
        }
        runGuarded(e, t, i) {
          return this._inner.runGuarded(e, t, i);
        }
        runOutsideAngular(e) {
          return this._outer.run(e);
        }
      }
      const tP = {};
      function gh(n) {
        if (0 == n._nesting && !n.hasPendingMicrotasks && !n.isStable)
          try {
            n._nesting++, n.onMicrotaskEmpty.emit(null);
          } finally {
            if ((n._nesting--, !n.hasPendingMicrotasks))
              try {
                n.runOutsideAngular(() => n.onStable.emit(null));
              } finally {
                n.isStable = !0;
              }
          }
      }
      function _h(n) {
        n.hasPendingMicrotasks = !!(
          n._hasPendingMicrotasks ||
          ((n.shouldCoalesceEventChangeDetection ||
            n.shouldCoalesceRunChangeDetection) &&
            -1 !== n.lastRequestAnimationFrameId)
        );
      }
      function Zb(n) {
        n._nesting++,
          n.isStable && ((n.isStable = !1), n.onUnstable.emit(null));
      }
      function Jb(n) {
        n._nesting--, gh(n);
      }
      class rP {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ce()),
            (this.onMicrotaskEmpty = new ce()),
            (this.onStable = new ce()),
            (this.onError = new ce());
        }
        run(e, t, i) {
          return e.apply(t, i);
        }
        runGuarded(e, t, i) {
          return e.apply(t, i);
        }
        runOutsideAngular(e) {
          return e();
        }
        runTask(e, t, i, r) {
          return e.apply(t, i);
        }
      }
      let yh = (() => {
          class n {
            constructor(t) {
              (this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      oe.assertNotInAngularZone(),
                        mh(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                mh(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (i) =>
                    !i.updateCb ||
                    !i.updateCb(t) ||
                    (clearTimeout(i.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, i, r) {
              let s = -1;
              i &&
                i > 0 &&
                (s = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (o) => o.timeoutId !== s
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, i)),
                this._callbacks.push({ doneCb: t, timeoutId: s, updateCb: r });
            }
            whenStable(t, i, r) {
              if (r && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(t, i, r), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(t, i, r) {
              return [];
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(b(oe));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        eC = (() => {
          class n {
            constructor() {
              (this._applications = new Map()), vh.addToWindow(this);
            }
            registerApplication(t, i) {
              this._applications.set(t, i);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, i = !0) {
              return vh.findTestabilityInTree(this, t, i);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      class sP {
        addToWindow(e) {}
        findTestabilityInTree(e, t, i) {
          return null;
        }
      }
      let vh = new sP(),
        tC = !0,
        nC = !1;
      function bh() {
        return (nC = !0), tC;
      }
      let yn;
      const iC = new x("AllowMultipleToken");
      function rC(n, e, t = []) {
        const i = `Platform: ${e}`,
          r = new x(i);
        return (s = []) => {
          let o = sC();
          if (!o || o.injector.get(iC, !1))
            if (n) n(t.concat(s).concat({ provide: r, useValue: !0 }));
            else {
              const a = t
                .concat(s)
                .concat(
                  { provide: r, useValue: !0 },
                  { provide: ao, useValue: "platform" }
                );
              !(function (n) {
                if (yn && !yn.destroyed && !yn.injector.get(iC, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                yn = n.get(oC);
                const e = n.get(qb, null);
                e && e.forEach((t) => t());
              })(ye.create({ providers: a, name: i }));
            }
          return (function (n) {
            const e = sC();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(n, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return e;
          })(r);
        };
      }
      function sC() {
        return yn && !yn.destroyed ? yn : null;
      }
      let oC = (() => {
        class n {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, i) {
            const a = (function (n, e) {
                let t;
                return (
                  (t =
                    "noop" === n
                      ? new rP()
                      : ("zone.js" === n ? void 0 : n) ||
                        new oe({
                          enableLongStackTrace: bh(),
                          shouldCoalesceEventChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneRunCoalescing),
                        })),
                  t
                );
              })(i ? i.ngZone : void 0, {
                ngZoneEventCoalescing: (i && i.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (i && i.ngZoneRunCoalescing) || !1,
              }),
              l = [{ provide: oe, useValue: a }];
            return a.run(() => {
              const c = ye.create({
                  providers: l,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                u = t.create(c),
                d = u.injector.get(On, null);
              if (!d)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?"
                );
              return (
                a.runOutsideAngular(() => {
                  const h = a.onError.subscribe({
                    next: (f) => {
                      d.handleError(f);
                    },
                  });
                  u.onDestroy(() => {
                    Ch(this._modules, u), h.unsubscribe();
                  });
                }),
                (function (n, e, t) {
                  try {
                    const i = t();
                    return rl(i)
                      ? i.catch((r) => {
                          throw (
                            (e.runOutsideAngular(() => n.handleError(r)), r)
                          );
                        })
                      : i;
                  } catch (i) {
                    throw (e.runOutsideAngular(() => n.handleError(i)), i);
                  }
                })(d, a, () => {
                  const h = u.injector.get(hs);
                  return (
                    h.runInitializers(),
                    h.donePromise.then(
                      () => (
                        (function (n) {
                          Ot(n, "Expected localeId to be defined"),
                            "string" == typeof n &&
                              (Fv = n.toLowerCase().replace(/_/g, "-"));
                        })(u.injector.get(Zn, ol) || ol),
                        this._moduleDoBootstrap(u),
                        u
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, i = []) {
            const r = aC({}, i);
            return (function (n, e, t) {
              const i = new Jd(t);
              return Promise.resolve(i);
            })(0, 0, t).then((s) => this.bootstrapModuleFactory(s, r));
          }
          _moduleDoBootstrap(t) {
            const i = t.injector.get(fs);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((r) => i.bootstrap(r));
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${K(
                    t.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
                );
              t.instance.ngDoBootstrap(i);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach((t) => t.destroy()),
              this._destroyListeners.forEach((t) => t()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(b(ye));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      function aC(n, e) {
        return Array.isArray(e) ? e.reduce(aC, n) : Z(Z({}, n), e);
      }
      let fs = (() => {
        class n {
          constructor(t, i, r, s, o) {
            (this._zone = t),
              (this._injector = i),
              (this._exceptionHandler = r),
              (this._componentFactoryResolver = s),
              (this._initStatus = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const a = new Se((c) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    c.next(this._stable), c.complete();
                  });
              }),
              l = new Se((c) => {
                let u;
                this._zone.runOutsideAngular(() => {
                  u = this._zone.onStable.subscribe(() => {
                    oe.assertNotInAngularZone(),
                      mh(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), c.next(!0));
                      });
                  });
                });
                const d = this._zone.onUnstable.subscribe(() => {
                  oe.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        c.next(!1);
                      }));
                });
                return () => {
                  u.unsubscribe(), d.unsubscribe();
                };
              });
            this.isStable = pa(a, l.pipe(wm()));
          }
          bootstrap(t, i) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let r;
            (r =
              t instanceof ob
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(r.componentType);
            const s = (function (n) {
                return n.isBoundToModule;
              })(r)
                ? void 0
                : this._injector.get(Zi),
              a = r.create(ye.NULL, [], i || r.selector, s),
              l = a.location.nativeElement,
              c = a.injector.get(yh, null),
              u = c && a.injector.get(eC);
            return (
              c && u && u.registerApplication(l, c),
              a.onDestroy(() => {
                this.detachView(a.hostView),
                  Ch(this.components, a),
                  u && u.unregisterApplication(l);
              }),
              this._loadComponent(a),
              a
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const i = t;
            this._views.push(i), i.attachToAppRef(this);
          }
          detachView(t) {
            const i = t;
            Ch(this._views, i), i.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get($O, [])
                .concat(this._bootstrapListeners)
                .forEach((r) => r(t));
          }
          ngOnDestroy() {
            this._views.slice().forEach((t) => t.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(b(oe), b(ye), b(On), b(Ki), b(hs));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      function Ch(n, e) {
        const t = n.indexOf(e);
        t > -1 && n.splice(t, 1);
      }
      const CP = function (n) {
        return (function (n, e, t) {
          if (Ca(n) && !t) {
            const i = Ft(n.index, e);
            return new vo(i, i);
          }
          return 47 & n.type ? new vo(e[16], e) : null;
        })(je(), C(), 16 == (16 & n));
      };
      let wo = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = CP), n;
      })();
      class pC {
        constructor() {}
        supports(e) {
          return uo(e);
        }
        create(e) {
          return new PP(e);
        }
      }
      const OP = (n, e) => e;
      class PP {
        constructor(e) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = e || OP);
        }
        forEachItem(e) {
          let t;
          for (t = this._itHead; null !== t; t = t._next) e(t);
        }
        forEachOperation(e) {
          let t = this._itHead,
            i = this._removalsHead,
            r = 0,
            s = null;
          for (; t || i; ) {
            const o = !i || (t && t.currentIndex < gC(i, r, s)) ? t : i,
              a = gC(o, r, s),
              l = o.currentIndex;
            if (o === i) r--, (i = i._nextRemoved);
            else if (((t = t._next), null == o.previousIndex)) r++;
            else {
              s || (s = []);
              const c = a - r,
                u = l - r;
              if (c != u) {
                for (let h = 0; h < c; h++) {
                  const f = h < s.length ? s[h] : (s[h] = 0),
                    p = f + h;
                  u <= p && p < c && (s[h] = f + 1);
                }
                s[o.previousIndex] = u - c;
              }
            }
            a !== l && e(o, a, l);
          }
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousItHead; null !== t; t = t._nextPrevious) e(t);
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
        }
        forEachMovedItem(e) {
          let t;
          for (t = this._movesHead; null !== t; t = t._nextMoved) e(t);
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
        }
        forEachIdentityChange(e) {
          let t;
          for (
            t = this._identityChangesHead;
            null !== t;
            t = t._nextIdentityChange
          )
            e(t);
        }
        diff(e) {
          if ((null == e && (e = []), !uo(e)))
            throw new Error(
              `Error trying to diff '${K(
                e
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let r,
            s,
            o,
            t = this._itHead,
            i = !1;
          if (Array.isArray(e)) {
            this.length = e.length;
            for (let a = 0; a < this.length; a++)
              (s = e[a]),
                (o = this._trackByFn(a, s)),
                null !== t && Object.is(t.trackById, o)
                  ? (i && (t = this._verifyReinsertion(t, s, o, a)),
                    Object.is(t.item, s) || this._addIdentityChange(t, s))
                  : ((t = this._mismatch(t, s, o, a)), (i = !0)),
                (t = t._next);
          } else
            (r = 0),
              (function (n, e) {
                if (Array.isArray(n))
                  for (let t = 0; t < n.length; t++) e(n[t]);
                else {
                  const t = n[$r()]();
                  let i;
                  for (; !(i = t.next()).done; ) e(i.value);
                }
              })(e, (a) => {
                (o = this._trackByFn(r, a)),
                  null !== t && Object.is(t.trackById, o)
                    ? (i && (t = this._verifyReinsertion(t, a, o, r)),
                      Object.is(t.item, a) || this._addIdentityChange(t, a))
                    : ((t = this._mismatch(t, a, o, r)), (i = !0)),
                  (t = t._next),
                  r++;
              }),
              (this.length = r);
          return this._truncate(t), (this.collection = e), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              e = this._previousItHead = this._itHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._additionsHead; null !== e; e = e._nextAdded)
              e.previousIndex = e.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                e = this._movesHead;
              null !== e;
              e = e._nextMoved
            )
              e.previousIndex = e.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(e, t, i, r) {
          let s;
          return (
            null === e ? (s = this._itTail) : ((s = e._prev), this._remove(e)),
            null !==
            (e =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(i, null))
              ? (Object.is(e.item, t) || this._addIdentityChange(e, t),
                this._reinsertAfter(e, s, r))
              : null !==
                (e =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(i, r))
              ? (Object.is(e.item, t) || this._addIdentityChange(e, t),
                this._moveAfter(e, s, r))
              : (e = this._addAfter(new FP(t, i), s, r)),
            e
          );
        }
        _verifyReinsertion(e, t, i, r) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(i, null);
          return (
            null !== s
              ? (e = this._reinsertAfter(s, e._prev, r))
              : e.currentIndex != r &&
                ((e.currentIndex = r), this._addToMoves(e, r)),
            e
          );
        }
        _truncate(e) {
          for (; null !== e; ) {
            const t = e._next;
            this._addToRemovals(this._unlink(e)), (e = t);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(e, t, i) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
          const r = e._prevRemoved,
            s = e._nextRemoved;
          return (
            null === r ? (this._removalsHead = s) : (r._nextRemoved = s),
            null === s ? (this._removalsTail = r) : (s._prevRemoved = r),
            this._insertAfter(e, t, i),
            this._addToMoves(e, i),
            e
          );
        }
        _moveAfter(e, t, i) {
          return (
            this._unlink(e),
            this._insertAfter(e, t, i),
            this._addToMoves(e, i),
            e
          );
        }
        _addAfter(e, t, i) {
          return (
            this._insertAfter(e, t, i),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = e)
                : (this._additionsTail._nextAdded = e)),
            e
          );
        }
        _insertAfter(e, t, i) {
          const r = null === t ? this._itHead : t._next;
          return (
            (e._next = r),
            (e._prev = t),
            null === r ? (this._itTail = e) : (r._prev = e),
            null === t ? (this._itHead = e) : (t._next = e),
            null === this._linkedRecords && (this._linkedRecords = new mC()),
            this._linkedRecords.put(e),
            (e.currentIndex = i),
            e
          );
        }
        _remove(e) {
          return this._addToRemovals(this._unlink(e));
        }
        _unlink(e) {
          null !== this._linkedRecords && this._linkedRecords.remove(e);
          const t = e._prev,
            i = e._next;
          return (
            null === t ? (this._itHead = i) : (t._next = i),
            null === i ? (this._itTail = t) : (i._prev = t),
            e
          );
        }
        _addToMoves(e, t) {
          return (
            e.previousIndex === t ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = e)
                  : (this._movesTail._nextMoved = e)),
            e
          );
        }
        _addToRemovals(e) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new mC()),
            this._unlinkedRecords.put(e),
            (e.currentIndex = null),
            (e._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = e),
                (e._prevRemoved = null))
              : ((e._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = e)),
            e
          );
        }
        _addIdentityChange(e, t) {
          return (
            (e.item = t),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = e)
                : (this._identityChangesTail._nextIdentityChange = e)),
            e
          );
        }
      }
      class FP {
        constructor(e, t) {
          (this.item = e),
            (this.trackById = t),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class NP {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(e) {
          null === this._head
            ? ((this._head = this._tail = e),
              (e._nextDup = null),
              (e._prevDup = null))
            : ((this._tail._nextDup = e),
              (e._prevDup = this._tail),
              (e._nextDup = null),
              (this._tail = e));
        }
        get(e, t) {
          let i;
          for (i = this._head; null !== i; i = i._nextDup)
            if (
              (null === t || t <= i.currentIndex) &&
              Object.is(i.trackById, e)
            )
              return i;
          return null;
        }
        remove(e) {
          const t = e._prevDup,
            i = e._nextDup;
          return (
            null === t ? (this._head = i) : (t._nextDup = i),
            null === i ? (this._tail = t) : (i._prevDup = t),
            null === this._head
          );
        }
      }
      class mC {
        constructor() {
          this.map = new Map();
        }
        put(e) {
          const t = e.trackById;
          let i = this.map.get(t);
          i || ((i = new NP()), this.map.set(t, i)), i.add(e);
        }
        get(e, t) {
          const r = this.map.get(e);
          return r ? r.get(e, t) : null;
        }
        remove(e) {
          const t = e.trackById;
          return this.map.get(t).remove(e) && this.map.delete(t), e;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function gC(n, e, t) {
        const i = n.previousIndex;
        if (null === i) return i;
        let r = 0;
        return t && i < t.length && (r = t[i]), i + e + r;
      }
      class _C {
        constructor() {}
        supports(e) {
          return e instanceof Map || Ad(e);
        }
        create() {
          return new LP();
        }
      }
      class LP {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(e) {
          let t;
          for (t = this._mapHead; null !== t; t = t._next) e(t);
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousMapHead; null !== t; t = t._nextPrevious) e(t);
        }
        forEachChangedItem(e) {
          let t;
          for (t = this._changesHead; null !== t; t = t._nextChanged) e(t);
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
        }
        diff(e) {
          if (e) {
            if (!(e instanceof Map || Ad(e)))
              throw new Error(
                `Error trying to diff '${K(
                  e
                )}'. Only maps and objects are allowed`
              );
          } else e = new Map();
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let t = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(e, (i, r) => {
              if (t && t.key === r)
                this._maybeAddToChanges(t, i),
                  (this._appendAfter = t),
                  (t = t._next);
              else {
                const s = this._getOrCreateRecordForKey(r, i);
                t = this._insertBeforeOrAppend(t, s);
              }
            }),
            t)
          ) {
            t._prev && (t._prev._next = null), (this._removalsHead = t);
            for (let i = t; null !== i; i = i._nextRemoved)
              i === this._mapHead && (this._mapHead = null),
                this._records.delete(i.key),
                (i._nextRemoved = i._next),
                (i.previousValue = i.currentValue),
                (i.currentValue = null),
                (i._prev = null),
                (i._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(e, t) {
          if (e) {
            const i = e._prev;
            return (
              (t._next = e),
              (t._prev = i),
              (e._prev = t),
              i && (i._next = t),
              e === this._mapHead && (this._mapHead = t),
              (this._appendAfter = e),
              e
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = t), (t._prev = this._appendAfter))
              : (this._mapHead = t),
            (this._appendAfter = t),
            null
          );
        }
        _getOrCreateRecordForKey(e, t) {
          if (this._records.has(e)) {
            const r = this._records.get(e);
            this._maybeAddToChanges(r, t);
            const s = r._prev,
              o = r._next;
            return (
              s && (s._next = o),
              o && (o._prev = s),
              (r._next = null),
              (r._prev = null),
              r
            );
          }
          const i = new VP(e);
          return (
            this._records.set(e, i),
            (i.currentValue = t),
            this._addToAdditions(i),
            i
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              this._previousMapHead = this._mapHead, e = this._previousMapHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._changesHead; null !== e; e = e._nextChanged)
              e.previousValue = e.currentValue;
            for (e = this._additionsHead; null != e; e = e._nextAdded)
              e.previousValue = e.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(e, t) {
          Object.is(t, e.currentValue) ||
            ((e.previousValue = e.currentValue),
            (e.currentValue = t),
            this._addToChanges(e));
        }
        _addToAdditions(e) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = e)
            : ((this._additionsTail._nextAdded = e), (this._additionsTail = e));
        }
        _addToChanges(e) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = e)
            : ((this._changesTail._nextChanged = e), (this._changesTail = e));
        }
        _forEach(e, t) {
          e instanceof Map
            ? e.forEach(t)
            : Object.keys(e).forEach((i) => t(e[i], i));
        }
      }
      class VP {
        constructor(e) {
          (this.key = e),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function yC() {
        return new Mo([new pC()]);
      }
      let Mo = (() => {
        class n {
          constructor(t) {
            this.factories = t;
          }
          static create(t, i) {
            if (null != i) {
              const r = i.factories.slice();
              t = t.concat(r);
            }
            return new n(t);
          }
          static extend(t) {
            return {
              provide: n,
              useFactory: (i) => n.create(t, i || yC()),
              deps: [[n, new pi(), new Vt()]],
            };
          }
          find(t) {
            const i = this.factories.find((r) => r.supports(t));
            if (null != i) return i;
            throw new Error(
              `Cannot find a differ supporting object '${t}' of type '${(function (
                n
              ) {
                return n.name || typeof n;
              })(t)}'`
            );
          }
        }
        return (n.ɵprov = I({ token: n, providedIn: "root", factory: yC })), n;
      })();
      function vC() {
        return new ps([new _C()]);
      }
      let ps = (() => {
        class n {
          constructor(t) {
            this.factories = t;
          }
          static create(t, i) {
            if (i) {
              const r = i.factories.slice();
              t = t.concat(r);
            }
            return new n(t);
          }
          static extend(t) {
            return {
              provide: n,
              useFactory: (i) => n.create(t, i || vC()),
              deps: [[n, new pi(), new Vt()]],
            };
          }
          find(t) {
            const i = this.factories.find((r) => r.supports(t));
            if (i) return i;
            throw new Error(`Cannot find a differ supporting object '${t}'`);
          }
        }
        return (n.ɵprov = I({ token: n, providedIn: "root", factory: vC })), n;
      })();
      const HP = [new _C()],
        UP = new Mo([new pC()]),
        zP = new ps(HP),
        $P = rC(null, "core", [
          { provide: _l, useValue: "unknown" },
          { provide: oC, deps: [ye] },
          { provide: eC, deps: [] },
          { provide: fh, deps: [] },
        ]),
        YP = [
          { provide: fs, useClass: fs, deps: [oe, ye, On, Ki, hs] },
          {
            provide: kR,
            deps: [oe],
            useFactory: function (n) {
              let e = [];
              return (
                n.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (t) {
                  e.push(t);
                }
              );
            },
          },
          { provide: hs, useClass: hs, deps: [[new Vt(), gl]] },
          { provide: Xb, useClass: Xb, deps: [] },
          zO,
          {
            provide: Mo,
            useFactory: function () {
              return UP;
            },
            deps: [],
          },
          {
            provide: ps,
            useFactory: function () {
              return zP;
            },
            deps: [],
          },
          {
            provide: Zn,
            useFactory: function (n) {
              return (
                n || ("undefined" != typeof $localize && $localize.locale) || ol
              );
            },
            deps: [[new Qs(Zn), new Vt(), new pi()]],
          },
          { provide: Kb, useValue: "USD" },
        ];
      let XP = (() => {
          class n {
            constructor(t) {}
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(b(fs));
            }),
            (n.ɵmod = be({ type: n })),
            (n.ɵinj = pe({ providers: YP })),
            n
          );
        })(),
        Al = null;
      function Bn() {
        return Al;
      }
      const Q = new x("DocumentToken");
      let Lo = (() => {
          class n {
            historyGo(t) {
              throw new Error("Not implemented");
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = I({
              token: n,
              factory: function () {
                return b(iD);
              },
              providedIn: "platform",
            })),
            n
          );
        })(),
        iD = (() => {
          class n extends Lo {
            constructor(t) {
              super(), (this._doc = t), this._init();
            }
            _init() {
              (this.location = window.location),
                (this._history = window.history);
            }
            getBaseHrefFromDOM() {
              return Bn().getBaseHref(this._doc);
            }
            onPopState(t) {
              const i = Bn().getGlobalEventTarget(this._doc, "window");
              return (
                i.addEventListener("popstate", t, !1),
                () => i.removeEventListener("popstate", t)
              );
            }
            onHashChange(t) {
              const i = Bn().getGlobalEventTarget(this._doc, "window");
              return (
                i.addEventListener("hashchange", t, !1),
                () => i.removeEventListener("hashchange", t)
              );
            }
            get href() {
              return this.location.href;
            }
            get protocol() {
              return this.location.protocol;
            }
            get hostname() {
              return this.location.hostname;
            }
            get port() {
              return this.location.port;
            }
            get pathname() {
              return this.location.pathname;
            }
            get search() {
              return this.location.search;
            }
            get hash() {
              return this.location.hash;
            }
            set pathname(t) {
              this.location.pathname = t;
            }
            pushState(t, i, r) {
              rD()
                ? this._history.pushState(t, i, r)
                : (this.location.hash = r);
            }
            replaceState(t, i, r) {
              rD()
                ? this._history.replaceState(t, i, r)
                : (this.location.hash = r);
            }
            forward() {
              this._history.forward();
            }
            back() {
              this._history.back();
            }
            historyGo(t = 0) {
              this._history.go(t);
            }
            getState() {
              return this._history.state;
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(b(Q));
            }),
            (n.ɵprov = I({
              token: n,
              factory: function () {
                return new iD(b(Q));
              },
              providedIn: "platform",
            })),
            n
          );
        })();
      function rD() {
        return !!window.history.pushState;
      }
      function sD(n, e) {
        if (0 == n.length) return e;
        if (0 == e.length) return n;
        let t = 0;
        return (
          n.endsWith("/") && t++,
          e.startsWith("/") && t++,
          2 == t ? n + e.substring(1) : 1 == t ? n + e : n + "/" + e
        );
      }
      function oD(n) {
        const e = n.match(/#|\?|$/),
          t = (e && e.index) || n.length;
        return n.slice(0, t - ("/" === n[t - 1] ? 1 : 0)) + n.slice(t);
      }
      function ir(n) {
        return n && "?" !== n[0] ? "?" + n : n;
      }
      let Yh = (() => {
        class n {
          historyGo(t) {
            throw new Error("Not implemented");
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = I({
            token: n,
            factory: function () {
              return (function (n) {
                const e = b(Q).location;
                return new Y1(b(Lo), (e && e.origin) || "");
              })();
            },
            providedIn: "root",
          })),
          n
        );
      })();
      const K1 = new x("appBaseHref");
      let Y1 = (() => {
          class n extends Yh {
            constructor(t, i) {
              if (
                (super(),
                (this._platformLocation = t),
                (this._removeListenerFns = []),
                null == i && (i = this._platformLocation.getBaseHrefFromDOM()),
                null == i)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = i;
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return sD(this._baseHref, t);
            }
            path(t = !1) {
              const i =
                  this._platformLocation.pathname +
                  ir(this._platformLocation.search),
                r = this._platformLocation.hash;
              return r && t ? `${i}${r}` : i;
            }
            pushState(t, i, r, s) {
              const o = this.prepareExternalUrl(r + ir(s));
              this._platformLocation.pushState(t, i, o);
            }
            replaceState(t, i, r, s) {
              const o = this.prepareExternalUrl(r + ir(s));
              this._platformLocation.replaceState(t, i, o);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(t = 0) {
              var i, r;
              null == (r = (i = this._platformLocation).historyGo) ||
                r.call(i, t);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(b(Lo), b(K1, 8));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        aD = (() => {
          class n {
            constructor(t, i) {
              (this._subject = new ce()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = t);
              const r = this._platformStrategy.getBaseHref();
              (this._platformLocation = i),
                (this._baseHref = oD(lD(r))),
                this._platformStrategy.onPopState((s) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: s.state,
                    type: s.type,
                  });
                });
            }
            path(t = !1) {
              return this.normalize(this._platformStrategy.path(t));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(t, i = "") {
              return this.path() == this.normalize(t + ir(i));
            }
            normalize(t) {
              return n.stripTrailingSlash(
                (function (n, e) {
                  return n && e.startsWith(n) ? e.substring(n.length) : e;
                })(this._baseHref, lD(t))
              );
            }
            prepareExternalUrl(t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._platformStrategy.prepareExternalUrl(t)
              );
            }
            go(t, i = "", r = null) {
              this._platformStrategy.pushState(r, "", t, i),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + ir(i)),
                  r
                );
            }
            replaceState(t, i = "", r = null) {
              this._platformStrategy.replaceState(r, "", t, i),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + ir(i)),
                  r
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            historyGo(t = 0) {
              var i, r;
              null == (r = (i = this._platformStrategy).historyGo) ||
                r.call(i, t);
            }
            onUrlChange(t) {
              this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((i) => {
                    this._notifyUrlChangeListeners(i.url, i.state);
                  }));
            }
            _notifyUrlChangeListeners(t = "", i) {
              this._urlChangeListeners.forEach((r) => r(t, i));
            }
            subscribe(t, i, r) {
              return this._subject.subscribe({
                next: t,
                error: i,
                complete: r,
              });
            }
          }
          return (
            (n.normalizeQueryParams = ir),
            (n.joinWithSlash = sD),
            (n.stripTrailingSlash = oD),
            (n.ɵfac = function (t) {
              return new (t || n)(b(Yh), b(Lo));
            }),
            (n.ɵprov = I({
              token: n,
              factory: function () {
                return new aD(b(Yh), b(Lo));
              },
              providedIn: "root",
            })),
            n
          );
        })();
      function lD(n) {
        return n.replace(/\/index.html$/, "");
      }
      var Le = (() => (
        ((Le = Le || {})[(Le.Zero = 0)] = "Zero"),
        (Le[(Le.One = 1)] = "One"),
        (Le[(Le.Two = 2)] = "Two"),
        (Le[(Le.Few = 3)] = "Few"),
        (Le[(Le.Many = 4)] = "Many"),
        (Le[(Le.Other = 5)] = "Other"),
        Le
      ))();
      const rN = function (n) {
        return (function (n) {
          const e = (function (n) {
            return n.toLowerCase().replace(/_/g, "-");
          })(n);
          let t = Pv(e);
          if (t) return t;
          const i = e.split("-")[0];
          if (((t = Pv(i)), t)) return t;
          if ("en" === i) return yA;
          throw new Error(`Missing locale data for the locale "${n}".`);
        })(n)[M.PluralCase];
      };
      class jl {}
      let ON = (() => {
          class n extends jl {
            constructor(t) {
              super(), (this.locale = t);
            }
            getPluralCategory(t, i) {
              switch (rN(i || this.locale)(t)) {
                case Le.Zero:
                  return "zero";
                case Le.One:
                  return "one";
                case Le.Two:
                  return "two";
                case Le.Few:
                  return "few";
                case Le.Many:
                  return "many";
                default:
                  return "other";
              }
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(b(Zn));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        sf = (() => {
          class n {
            constructor(t, i, r, s) {
              (this._iterableDiffers = t),
                (this._keyValueDiffers = i),
                (this._ngEl = r),
                (this._renderer = s),
                (this._iterableDiffer = null),
                (this._keyValueDiffer = null),
                (this._initialClasses = []),
                (this._rawClass = null);
            }
            set klass(t) {
              this._removeClasses(this._initialClasses),
                (this._initialClasses =
                  "string" == typeof t ? t.split(/\s+/) : []),
                this._applyClasses(this._initialClasses),
                this._applyClasses(this._rawClass);
            }
            set ngClass(t) {
              this._removeClasses(this._rawClass),
                this._applyClasses(this._initialClasses),
                (this._iterableDiffer = null),
                (this._keyValueDiffer = null),
                (this._rawClass = "string" == typeof t ? t.split(/\s+/) : t),
                this._rawClass &&
                  (uo(this._rawClass)
                    ? (this._iterableDiffer = this._iterableDiffers
                        .find(this._rawClass)
                        .create())
                    : (this._keyValueDiffer = this._keyValueDiffers
                        .find(this._rawClass)
                        .create()));
            }
            ngDoCheck() {
              if (this._iterableDiffer) {
                const t = this._iterableDiffer.diff(this._rawClass);
                t && this._applyIterableChanges(t);
              } else if (this._keyValueDiffer) {
                const t = this._keyValueDiffer.diff(this._rawClass);
                t && this._applyKeyValueChanges(t);
              }
            }
            _applyKeyValueChanges(t) {
              t.forEachAddedItem((i) =>
                this._toggleClass(i.key, i.currentValue)
              ),
                t.forEachChangedItem((i) =>
                  this._toggleClass(i.key, i.currentValue)
                ),
                t.forEachRemovedItem((i) => {
                  i.previousValue && this._toggleClass(i.key, !1);
                });
            }
            _applyIterableChanges(t) {
              t.forEachAddedItem((i) => {
                if ("string" != typeof i.item)
                  throw new Error(
                    `NgClass can only toggle CSS classes expressed as strings, got ${K(
                      i.item
                    )}`
                  );
                this._toggleClass(i.item, !0);
              }),
                t.forEachRemovedItem((i) => this._toggleClass(i.item, !1));
            }
            _applyClasses(t) {
              t &&
                (Array.isArray(t) || t instanceof Set
                  ? t.forEach((i) => this._toggleClass(i, !0))
                  : Object.keys(t).forEach((i) =>
                      this._toggleClass(i, !!t[i])
                    ));
            }
            _removeClasses(t) {
              t &&
                (Array.isArray(t) || t instanceof Set
                  ? t.forEach((i) => this._toggleClass(i, !1))
                  : Object.keys(t).forEach((i) => this._toggleClass(i, !1)));
            }
            _toggleClass(t, i) {
              (t = t.trim()) &&
                t.split(/\s+/g).forEach((r) => {
                  i
                    ? this._renderer.addClass(this._ngEl.nativeElement, r)
                    : this._renderer.removeClass(this._ngEl.nativeElement, r);
                });
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(v(Mo), v(ps), v(ge), v(Qi));
            }),
            (n.ɵdir = O({
              type: n,
              selectors: [["", "ngClass", ""]],
              inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
            })),
            n
          );
        })();
      class NN {
        constructor(e, t, i, r) {
          (this.$implicit = e),
            (this.ngForOf = t),
            (this.index = i),
            (this.count = r);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let _D = (() => {
        class n {
          constructor(t, i, r) {
            (this._viewContainer = t),
              (this._template = i),
              (this._differs = r),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            this._trackByFn = t;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const t = this._ngForOf;
              if (!this._differ && t)
                try {
                  this._differ = this._differs
                    .find(t)
                    .create(this.ngForTrackBy);
                } catch (i) {
                  throw new Error(
                    `Cannot find a differ supporting object '${t}' of type '${(function (
                      n
                    ) {
                      return n.name || typeof n;
                    })(
                      t
                    )}'. NgFor only supports binding to Iterables such as Arrays.`
                  );
                }
            }
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const i = [];
            t.forEachOperation((r, s, o) => {
              if (null == r.previousIndex) {
                const a = this._viewContainer.createEmbeddedView(
                    this._template,
                    new NN(null, this._ngForOf, -1, -1),
                    null === o ? void 0 : o
                  ),
                  l = new yD(r, a);
                i.push(l);
              } else if (null == o)
                this._viewContainer.remove(null === s ? void 0 : s);
              else if (null !== s) {
                const a = this._viewContainer.get(s);
                this._viewContainer.move(a, o);
                const l = new yD(r, a);
                i.push(l);
              }
            });
            for (let r = 0; r < i.length; r++)
              this._perViewChange(i[r].view, i[r].record);
            for (let r = 0, s = this._viewContainer.length; r < s; r++) {
              const o = this._viewContainer.get(r);
              (o.context.index = r),
                (o.context.count = s),
                (o.context.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange((r) => {
              this._viewContainer.get(r.currentIndex).context.$implicit =
                r.item;
            });
          }
          _perViewChange(t, i) {
            t.context.$implicit = i.item;
          }
          static ngTemplateContextGuard(t, i) {
            return !0;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(v(_n), v(Xn), v(Mo));
          }),
          (n.ɵdir = O({
            type: n,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
          })),
          n
        );
      })();
      class yD {
        constructor(e, t) {
          (this.record = e), (this.view = t);
        }
      }
      let Ul = (() => {
        class n {
          constructor(t, i) {
            (this._viewContainer = t),
              (this._context = new VN()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = i);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t),
              this._updateView();
          }
          set ngIfThen(t) {
            vD("ngIfThen", t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            vD("ngIfElse", t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(t, i) {
            return !0;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(v(_n), v(Xn));
          }),
          (n.ɵdir = O({
            type: n,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
          })),
          n
        );
      })();
      class VN {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function vD(n, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${n} must be a TemplateRef, but received '${K(e)}'.`
          );
      }
      let df = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵmod = be({ type: n })),
          (n.ɵinj = pe({ providers: [{ provide: jl, useClass: ON }] })),
          n
        );
      })();
      const DD = "browser";
      class hf extends class extends class {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          var n;
          (n = new hf()), Al || (Al = n);
        }
        onAndCancel(e, t, i) {
          return (
            e.addEventListener(t, i, !1),
            () => {
              e.removeEventListener(t, i, !1);
            }
          );
        }
        dispatchEvent(e, t) {
          e.dispatchEvent(t);
        }
        remove(e) {
          e.parentNode && e.parentNode.removeChild(e);
        }
        createElement(e, t) {
          return (t = t || this.getDefaultDocument()).createElement(e);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(e) {
          return e.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(e) {
          return e instanceof DocumentFragment;
        }
        getGlobalEventTarget(e, t) {
          return "window" === t
            ? window
            : "document" === t
            ? e
            : "body" === t
            ? e.body
            : null;
        }
        getBaseHref(e) {
          const t =
            ((Ho = Ho || document.querySelector("base")),
            Ho ? Ho.getAttribute("href") : null);
          return null == t
            ? null
            : (function (n) {
                (zl = zl || document.createElement("a")),
                  zl.setAttribute("href", n);
                const e = zl.pathname;
                return "/" === e.charAt(0) ? e : `/${e}`;
              })(t);
        }
        resetBaseElement() {
          Ho = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(e) {
          return (function (n, e) {
            e = encodeURIComponent(e);
            for (const t of n.split(";")) {
              const i = t.indexOf("="),
                [r, s] = -1 == i ? [t, ""] : [t.slice(0, i), t.slice(i + 1)];
              if (r.trim() === e) return decodeURIComponent(s);
            }
            return null;
          })(document.cookie, e);
        }
      }
      let zl,
        Ho = null;
      const wD = new x("TRANSITION_ID"),
        CL = [
          {
            provide: gl,
            useFactory: function (n, e, t) {
              return () => {
                t.get(hs).donePromise.then(() => {
                  const i = Bn(),
                    r = e.querySelectorAll(`style[ng-transition="${n}"]`);
                  for (let s = 0; s < r.length; s++) i.remove(r[s]);
                });
              };
            },
            deps: [wD, Q, ye],
            multi: !0,
          },
        ];
      class ff {
        static init() {
          var n;
          (n = new ff()), (vh = n);
        }
        addToWindow(e) {
          (le.getAngularTestability = (i, r = !0) => {
            const s = e.findTestabilityInTree(i, r);
            if (null == s)
              throw new Error("Could not find testability for element.");
            return s;
          }),
            (le.getAllAngularTestabilities = () => e.getAllTestabilities()),
            (le.getAllAngularRootElements = () => e.getAllRootElements()),
            le.frameworkStabilizers || (le.frameworkStabilizers = []),
            le.frameworkStabilizers.push((i) => {
              const r = le.getAllAngularTestabilities();
              let s = r.length,
                o = !1;
              const a = function (l) {
                (o = o || l), s--, 0 == s && i(o);
              };
              r.forEach(function (l) {
                l.whenStable(a);
              });
            });
        }
        findTestabilityInTree(e, t, i) {
          if (null == t) return null;
          const r = e.getTestability(t);
          return null != r
            ? r
            : i
            ? Bn().isShadowRoot(t)
              ? this.findTestabilityInTree(e, t.host, !0)
              : this.findTestabilityInTree(e, t.parentElement, !0)
            : null;
        }
      }
      let DL = (() => {
        class n {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const jo = new x("EventManagerPlugins");
      let Gl = (() => {
        class n {
          constructor(t, i) {
            (this._zone = i),
              (this._eventNameToPlugin = new Map()),
              t.forEach((r) => (r.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, i, r) {
            return this._findPluginFor(i).addEventListener(t, i, r);
          }
          addGlobalEventListener(t, i, r) {
            return this._findPluginFor(i).addGlobalEventListener(t, i, r);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const i = this._eventNameToPlugin.get(t);
            if (i) return i;
            const r = this._plugins;
            for (let s = 0; s < r.length; s++) {
              const o = r[s];
              if (o.supports(t)) return this._eventNameToPlugin.set(t, o), o;
            }
            throw new Error(`No event manager plugin found for event ${t}`);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(b(jo), b(oe));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class pf {
        constructor(e) {
          this._doc = e;
        }
        addGlobalEventListener(e, t, i) {
          const r = Bn().getGlobalEventTarget(this._doc, e);
          if (!r)
            throw new Error(`Unsupported event target ${r} for event ${t}`);
          return this.addEventListener(r, t, i);
        }
      }
      let xD = (() => {
          class n {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const i = new Set();
              t.forEach((r) => {
                this._stylesSet.has(r) || (this._stylesSet.add(r), i.add(r));
              }),
                this.onStylesAdded(i);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        Uo = (() => {
          class n extends xD {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Map()),
                this._hostNodes.set(t.head, []);
            }
            _addStylesToHost(t, i, r) {
              t.forEach((s) => {
                const o = this._doc.createElement("style");
                (o.textContent = s), r.push(i.appendChild(o));
              });
            }
            addHost(t) {
              const i = [];
              this._addStylesToHost(this._stylesSet, t, i),
                this._hostNodes.set(t, i);
            }
            removeHost(t) {
              const i = this._hostNodes.get(t);
              i && i.forEach(SD), this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((i, r) => {
                this._addStylesToHost(t, r, i);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((t) => t.forEach(SD));
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(b(Q));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      function SD(n) {
        Bn().remove(n);
      }
      const mf = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        gf = /%COMP%/g;
      function Wl(n, e, t) {
        for (let i = 0; i < e.length; i++) {
          let r = e[i];
          Array.isArray(r) ? Wl(n, r, t) : ((r = r.replace(gf, n)), t.push(r));
        }
        return t;
      }
      function TD(n) {
        return (e) => {
          if ("__ngUnwrap__" === e) return n;
          !1 === n(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let ql = (() => {
        class n {
          constructor(t, i, r) {
            (this.eventManager = t),
              (this.sharedStylesHost = i),
              (this.appId = r),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new _f(t));
          }
          createRenderer(t, i) {
            if (!t || !i) return this.defaultRenderer;
            switch (i.encapsulation) {
              case wt.Emulated: {
                let r = this.rendererByCompId.get(i.id);
                return (
                  r ||
                    ((r = new LL(
                      this.eventManager,
                      this.sharedStylesHost,
                      i,
                      this.appId
                    )),
                    this.rendererByCompId.set(i.id, r)),
                  r.applyToHost(t),
                  r
                );
              }
              case 1:
              case wt.ShadowDom:
                return new VL(this.eventManager, this.sharedStylesHost, t, i);
              default:
                if (!this.rendererByCompId.has(i.id)) {
                  const r = Wl(i.id, i.styles, []);
                  this.sharedStylesHost.addStyles(r),
                    this.rendererByCompId.set(i.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(b(Gl), b(Uo), b(Eo));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class _f {
        constructor(e) {
          (this.eventManager = e),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(e, t) {
          return t
            ? document.createElementNS(mf[t] || t, e)
            : document.createElement(e);
        }
        createComment(e) {
          return document.createComment(e);
        }
        createText(e) {
          return document.createTextNode(e);
        }
        appendChild(e, t) {
          e.appendChild(t);
        }
        insertBefore(e, t, i) {
          e && e.insertBefore(t, i);
        }
        removeChild(e, t) {
          e && e.removeChild(t);
        }
        selectRootElement(e, t) {
          let i = "string" == typeof e ? document.querySelector(e) : e;
          if (!i)
            throw new Error(`The selector "${e}" did not match any elements`);
          return t || (i.textContent = ""), i;
        }
        parentNode(e) {
          return e.parentNode;
        }
        nextSibling(e) {
          return e.nextSibling;
        }
        setAttribute(e, t, i, r) {
          if (r) {
            t = r + ":" + t;
            const s = mf[r];
            s ? e.setAttributeNS(s, t, i) : e.setAttribute(t, i);
          } else e.setAttribute(t, i);
        }
        removeAttribute(e, t, i) {
          if (i) {
            const r = mf[i];
            r ? e.removeAttributeNS(r, t) : e.removeAttribute(`${i}:${t}`);
          } else e.removeAttribute(t);
        }
        addClass(e, t) {
          e.classList.add(t);
        }
        removeClass(e, t) {
          e.classList.remove(t);
        }
        setStyle(e, t, i, r) {
          r & (Ht.DashCase | Ht.Important)
            ? e.style.setProperty(t, i, r & Ht.Important ? "important" : "")
            : (e.style[t] = i);
        }
        removeStyle(e, t, i) {
          i & Ht.DashCase ? e.style.removeProperty(t) : (e.style[t] = "");
        }
        setProperty(e, t, i) {
          e[t] = i;
        }
        setValue(e, t) {
          e.nodeValue = t;
        }
        listen(e, t, i) {
          return "string" == typeof e
            ? this.eventManager.addGlobalEventListener(e, t, TD(i))
            : this.eventManager.addEventListener(e, t, TD(i));
        }
      }
      class LL extends _f {
        constructor(e, t, i, r) {
          super(e), (this.component = i);
          const s = Wl(r + "-" + i.id, i.styles, []);
          t.addStyles(s),
            (this.contentAttr = "_ngcontent-%COMP%".replace(
              gf,
              r + "-" + i.id
            )),
            (this.hostAttr = "_nghost-%COMP%".replace(gf, r + "-" + i.id));
        }
        applyToHost(e) {
          super.setAttribute(e, this.hostAttr, "");
        }
        createElement(e, t) {
          const i = super.createElement(e, t);
          return super.setAttribute(i, this.contentAttr, ""), i;
        }
      }
      class VL extends _f {
        constructor(e, t, i, r) {
          super(e),
            (this.sharedStylesHost = t),
            (this.hostEl = i),
            (this.shadowRoot = i.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = Wl(r.id, r.styles, []);
          for (let o = 0; o < s.length; o++) {
            const a = document.createElement("style");
            (a.textContent = s[o]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(e) {
          return e === this.hostEl ? this.shadowRoot : e;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(e, t) {
          return super.appendChild(this.nodeOrShadowRoot(e), t);
        }
        insertBefore(e, t, i) {
          return super.insertBefore(this.nodeOrShadowRoot(e), t, i);
        }
        removeChild(e, t) {
          return super.removeChild(this.nodeOrShadowRoot(e), t);
        }
        parentNode(e) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(e))
          );
        }
      }
      let BL = (() => {
        class n extends pf {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, i, r) {
            return (
              t.addEventListener(i, r, !1),
              () => this.removeEventListener(t, i, r)
            );
          }
          removeEventListener(t, i, r) {
            return t.removeEventListener(i, r);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(b(Q));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const OD = ["alt", "control", "meta", "shift"],
        WL = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        PD = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        qL = {
          alt: (n) => n.altKey,
          control: (n) => n.ctrlKey,
          meta: (n) => n.metaKey,
          shift: (n) => n.shiftKey,
        };
      let KL = (() => {
          class n extends pf {
            constructor(t) {
              super(t);
            }
            supports(t) {
              return null != n.parseEventName(t);
            }
            addEventListener(t, i, r) {
              const s = n.parseEventName(i),
                o = n.eventCallback(s.fullKey, r, this.manager.getZone());
              return this.manager
                .getZone()
                .runOutsideAngular(() =>
                  Bn().onAndCancel(t, s.domEventName, o)
                );
            }
            static parseEventName(t) {
              const i = t.toLowerCase().split("."),
                r = i.shift();
              if (0 === i.length || ("keydown" !== r && "keyup" !== r))
                return null;
              const s = n._normalizeKey(i.pop());
              let o = "";
              if (
                (OD.forEach((l) => {
                  const c = i.indexOf(l);
                  c > -1 && (i.splice(c, 1), (o += l + "."));
                }),
                (o += s),
                0 != i.length || 0 === s.length)
              )
                return null;
              const a = {};
              return (a.domEventName = r), (a.fullKey = o), a;
            }
            static getEventFullKey(t) {
              let i = "",
                r = (function (n) {
                  let e = n.key;
                  if (null == e) {
                    if (((e = n.keyIdentifier), null == e))
                      return "Unidentified";
                    e.startsWith("U+") &&
                      ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                      3 === n.location && PD.hasOwnProperty(e) && (e = PD[e]));
                  }
                  return WL[e] || e;
                })(t);
              return (
                (r = r.toLowerCase()),
                " " === r ? (r = "space") : "." === r && (r = "dot"),
                OD.forEach((s) => {
                  s != r && qL[s](t) && (i += s + ".");
                }),
                (i += r),
                i
              );
            }
            static eventCallback(t, i, r) {
              return (s) => {
                n.getEventFullKey(s) === t && r.runGuarded(() => i(s));
              };
            }
            static _normalizeKey(t) {
              return "esc" === t ? "escape" : t;
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(b(Q));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        zo = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = I({
              token: n,
              factory: function (t) {
                let i = null;
                return (i = t ? new (t || n)() : b(vf)), i;
              },
              providedIn: "root",
            })),
            n
          );
        })(),
        vf = (() => {
          class n extends zo {
            constructor(t) {
              super(), (this._doc = t);
            }
            sanitize(t, i) {
              if (null == i) return null;
              switch (t) {
                case ne.NONE:
                  return i;
                case ne.HTML:
                  return An(i, "HTML")
                    ? Bt(i)
                    : Pg(this._doc, String(i)).toString();
                case ne.STYLE:
                  return An(i, "Style") ? Bt(i) : i;
                case ne.SCRIPT:
                  if (An(i, "Script")) return Bt(i);
                  throw new Error("unsafe value used in a script context");
                case ne.URL:
                  return xg(i), An(i, "URL") ? Bt(i) : Zs(String(i));
                case ne.RESOURCE_URL:
                  if (An(i, "ResourceURL")) return Bt(i);
                  throw new Error(
                    "unsafe value used in a resource URL context (see https://g.co/ng/security#xss)"
                  );
                default:
                  throw new Error(
                    `Unexpected SecurityContext ${t} (see https://g.co/ng/security#xss)`
                  );
              }
            }
            bypassSecurityTrustHtml(t) {
              return (function (n) {
                return new CS(n);
              })(t);
            }
            bypassSecurityTrustStyle(t) {
              return (function (n) {
                return new DS(n);
              })(t);
            }
            bypassSecurityTrustScript(t) {
              return (function (n) {
                return new ES(n);
              })(t);
            }
            bypassSecurityTrustUrl(t) {
              return (function (n) {
                return new wS(n);
              })(t);
            }
            bypassSecurityTrustResourceUrl(t) {
              return (function (n) {
                return new MS(n);
              })(t);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(b(Q));
            }),
            (n.ɵprov = I({
              token: n,
              factory: function (t) {
                let i = null;
                return (
                  (i = t
                    ? new t()
                    : (function (n) {
                        return new vf(n.get(Q));
                      })(b(ye))),
                  i
                );
              },
              providedIn: "root",
            })),
            n
          );
        })();
      const nV = rC($P, "browser", [
          { provide: _l, useValue: DD },
          {
            provide: qb,
            useValue: function () {
              hf.makeCurrent(), ff.init();
            },
            multi: !0,
          },
          {
            provide: Q,
            useFactory: function () {
              return (n = document), (lu = n), document;
              var n;
            },
            deps: [],
          },
        ]),
        iV = [
          [],
          { provide: ao, useValue: "root" },
          {
            provide: On,
            useFactory: function () {
              return new On();
            },
            deps: [],
          },
          { provide: jo, useClass: BL, multi: !0, deps: [Q, oe, _l] },
          { provide: jo, useClass: KL, multi: !0, deps: [Q] },
          [],
          { provide: ql, useClass: ql, deps: [Gl, Uo, Eo] },
          { provide: Yi, useExisting: ql },
          { provide: xD, useExisting: Uo },
          { provide: Uo, useClass: Uo, deps: [Q] },
          { provide: yh, useClass: yh, deps: [oe] },
          { provide: Gl, useClass: Gl, deps: [jo, oe] },
          { provide: class {}, useClass: DL, deps: [] },
          [],
        ];
      let FD = (() => {
        class n {
          constructor(t) {
            if (t)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(t) {
            return {
              ngModule: n,
              providers: [
                { provide: Eo, useValue: t.appId },
                { provide: wD, useExisting: Eo },
                CL,
              ],
            };
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(b(n, 12));
          }),
          (n.ɵmod = be({ type: n })),
          (n.ɵinj = pe({ providers: iV, imports: [df, XP] })),
          n
        );
      })();
      function At(n) {
        return null != n && "false" != `${n}`;
      }
      function Cf(n, e = 0) {
        return (function (n) {
          return !isNaN(parseFloat(n)) && !isNaN(Number(n));
        })(n)
          ? Number(n)
          : e;
      }
      function LD(n) {
        return Array.isArray(n) ? n : [n];
      }
      function Be(n) {
        return null == n ? "" : "string" == typeof n ? n : `${n}px`;
      }
      function He(n) {
        return n instanceof ge ? n.nativeElement : n;
      }
      function Di(...n) {
        return Rs(n, fa(n));
      }
      "undefined" != typeof window && window;
      const { isArray: hV } = Array;
      function VD(n) {
        return Et((e) =>
          (function (n, e) {
            return hV(e) ? n(...e) : n(e);
          })(n, e)
        );
      }
      const pV = ["addListener", "removeListener"],
        mV = ["addEventListener", "removeEventListener"],
        gV = ["on", "off"];
      function Df(n, e, t, i) {
        if (($(t) && ((i = t), (t = void 0)), i))
          return Df(n, e, t).pipe(VD(i));
        const [r, s] = (function (n) {
          return $(n.addEventListener) && $(n.removeEventListener);
        })(n)
          ? mV.map((o) => (a) => n[o](e, a, t))
          : (function (n) {
              return $(n.addListener) && $(n.removeListener);
            })(n)
          ? pV.map(BD(n, e))
          : (function (n) {
              return $(n.on) && $(n.off);
            })(n)
          ? gV.map(BD(n, e))
          : [];
        if (!r && Wc(n)) return As((o) => Df(o, e, t))(qt(n));
        if (!r) throw new TypeError("Invalid event target");
        return new Se((o) => {
          const a = (...l) => o.next(1 < l.length ? l : l[0]);
          return r(a), () => s(a);
        });
      }
      function BD(n, e) {
        return (t) => (i) => n[t](e, i);
      }
      class bV extends Oe {
        constructor(e, t) {
          super();
        }
        schedule(e, t = 0) {
          return this;
        }
      }
      const Kl = {
        setInterval(...n) {
          const { delegate: e } = Kl;
          return ((null == e ? void 0 : e.setInterval) || setInterval)(...n);
        },
        clearInterval(n) {
          const { delegate: e } = Kl;
          return ((null == e ? void 0 : e.clearInterval) || clearInterval)(n);
        },
        delegate: void 0,
      };
      class Ef extends bV {
        constructor(e, t) {
          super(e, t),
            (this.scheduler = e),
            (this.work = t),
            (this.pending = !1);
        }
        schedule(e, t = 0) {
          if (this.closed) return this;
          this.state = e;
          const i = this.id,
            r = this.scheduler;
          return (
            null != i && (this.id = this.recycleAsyncId(r, i, t)),
            (this.pending = !0),
            (this.delay = t),
            (this.id = this.id || this.requestAsyncId(r, this.id, t)),
            this
          );
        }
        requestAsyncId(e, t, i = 0) {
          return Kl.setInterval(e.flush.bind(e, this), i);
        }
        recycleAsyncId(e, t, i = 0) {
          if (null != i && this.delay === i && !1 === this.pending) return t;
          Kl.clearInterval(t);
        }
        execute(e, t) {
          if (this.closed) return new Error("executing a cancelled action");
          this.pending = !1;
          const i = this._execute(e, t);
          if (i) return i;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }
        _execute(e, t) {
          let r,
            i = !1;
          try {
            this.work(e);
          } catch (s) {
            (i = !0),
              (r = s || new Error("Scheduled action threw falsy error"));
          }
          if (i) return this.unsubscribe(), r;
        }
        unsubscribe() {
          if (!this.closed) {
            const { id: e, scheduler: t } = this,
              { actions: i } = t;
            (this.work = this.state = this.scheduler = null),
              (this.pending = !1),
              _r(i, this),
              null != e && (this.id = this.recycleAsyncId(t, e, null)),
              (this.delay = null),
              super.unsubscribe();
          }
        }
      }
      const $o = {
          schedule(n) {
            let e = requestAnimationFrame,
              t = cancelAnimationFrame;
            const { delegate: i } = $o;
            i && ((e = i.requestAnimationFrame), (t = i.cancelAnimationFrame));
            const r = e((s) => {
              (t = void 0), n(s);
            });
            return new Oe(() => (null == t ? void 0 : t(r)));
          },
          requestAnimationFrame(...n) {
            const { delegate: e } = $o;
            return (
              (null == e ? void 0 : e.requestAnimationFrame) ||
              requestAnimationFrame
            )(...n);
          },
          cancelAnimationFrame(...n) {
            const { delegate: e } = $o;
            return (
              (null == e ? void 0 : e.cancelAnimationFrame) ||
              cancelAnimationFrame
            )(...n);
          },
          delegate: void 0,
        },
        HD = { now: () => (HD.delegate || Date).now(), delegate: void 0 };
      class Go {
        constructor(e, t = Go.now) {
          (this.schedulerActionCtor = e), (this.now = t);
        }
        schedule(e, t = 0, i) {
          return new this.schedulerActionCtor(this, e).schedule(i, t);
        }
      }
      Go.now = HD.now;
      class wf extends Go {
        constructor(e, t = Go.now) {
          super(e, t),
            (this.actions = []),
            (this._active = !1),
            (this._scheduled = void 0);
        }
        flush(e) {
          const { actions: t } = this;
          if (this._active) return void t.push(e);
          let i;
          this._active = !0;
          do {
            if ((i = e.execute(e.state, e.delay))) break;
          } while ((e = t.shift()));
          if (((this._active = !1), i)) {
            for (; (e = t.shift()); ) e.unsubscribe();
            throw i;
          }
        }
      }
      const jD = new (class extends wf {
        flush(e) {
          (this._active = !0), (this._scheduled = void 0);
          const { actions: t } = this;
          let i,
            r = -1;
          e = e || t.shift();
          const s = t.length;
          do {
            if ((i = e.execute(e.state, e.delay))) break;
          } while (++r < s && (e = t.shift()));
          if (((this._active = !1), i)) {
            for (; ++r < s && (e = t.shift()); ) e.unsubscribe();
            throw i;
          }
        }
      })(
        class extends Ef {
          constructor(e, t) {
            super(e, t), (this.scheduler = e), (this.work = t);
          }
          requestAsyncId(e, t, i = 0) {
            return null !== i && i > 0
              ? super.requestAsyncId(e, t, i)
              : (e.actions.push(this),
                e._scheduled ||
                  (e._scheduled = $o.requestAnimationFrame(() =>
                    e.flush(void 0)
                  )));
          }
          recycleAsyncId(e, t, i = 0) {
            if ((null != i && i > 0) || (null == i && this.delay > 0))
              return super.recycleAsyncId(e, t, i);
            0 === e.actions.length &&
              ($o.cancelAnimationFrame(t), (e._scheduled = void 0));
          }
        }
      );
      let Mf,
        EV = 1;
      const Yl = {};
      function UD(n) {
        return n in Yl && (delete Yl[n], !0);
      }
      const wV = {
          setImmediate(n) {
            const e = EV++;
            return (
              (Yl[e] = !0),
              Mf || (Mf = Promise.resolve()),
              Mf.then(() => UD(e) && n()),
              e
            );
          },
          clearImmediate(n) {
            UD(n);
          },
        },
        { setImmediate: MV, clearImmediate: xV } = wV,
        Ql = {
          setImmediate(...n) {
            const { delegate: e } = Ql;
            return ((null == e ? void 0 : e.setImmediate) || MV)(...n);
          },
          clearImmediate(n) {
            const { delegate: e } = Ql;
            return ((null == e ? void 0 : e.clearImmediate) || xV)(n);
          },
          delegate: void 0,
        },
        xf =
          (new (class extends wf {
            flush(e) {
              (this._active = !0), (this._scheduled = void 0);
              const { actions: t } = this;
              let i,
                r = -1;
              e = e || t.shift();
              const s = t.length;
              do {
                if ((i = e.execute(e.state, e.delay))) break;
              } while (++r < s && (e = t.shift()));
              if (((this._active = !1), i)) {
                for (; ++r < s && (e = t.shift()); ) e.unsubscribe();
                throw i;
              }
            }
          })(
            class extends Ef {
              constructor(e, t) {
                super(e, t), (this.scheduler = e), (this.work = t);
              }
              requestAsyncId(e, t, i = 0) {
                return null !== i && i > 0
                  ? super.requestAsyncId(e, t, i)
                  : (e.actions.push(this),
                    e._scheduled ||
                      (e._scheduled = Ql.setImmediate(
                        e.flush.bind(e, void 0)
                      )));
              }
              recycleAsyncId(e, t, i = 0) {
                if ((null != i && i > 0) || (null == i && this.delay > 0))
                  return super.recycleAsyncId(e, t, i);
                0 === e.actions.length &&
                  (Ql.clearImmediate(t), (e._scheduled = void 0));
              }
            }
          ),
          new wf(Ef)),
        zD = xf;
      function $D(n = 0, e, t = zD) {
        let i = -1;
        return (
          null != e && (bm(e) ? (t = e) : (i = e)),
          new Se((r) => {
            let s = (function (n) {
              return n instanceof Date && !isNaN(n);
            })(n)
              ? +n - t.now()
              : n;
            s < 0 && (s = 0);
            let o = 0;
            return t.schedule(function () {
              r.closed ||
                (r.next(o++), 0 <= i ? this.schedule(void 0, i) : r.complete());
            }, s);
          })
        );
      }
      function GD(n, e = zD) {
        return (function (n) {
          return Je((e, t) => {
            let i = !1,
              r = null,
              s = null,
              o = !1;
            const a = () => {
                if ((null == s || s.unsubscribe(), (s = null), i)) {
                  i = !1;
                  const c = r;
                  (r = null), t.next(c);
                }
                o && t.complete();
              },
              l = () => {
                (s = null), o && t.complete();
              };
            e.subscribe(
              new et(
                t,
                (c) => {
                  (i = !0),
                    (r = c),
                    s || qt(n()).subscribe((s = new et(t, a, l)));
                },
                () => {
                  (o = !0), (!i || !s || s.closed) && t.complete();
                }
              )
            );
          });
        })(() => $D(n, e));
      }
      function Xl(n, e) {
        return Je((t, i) => {
          let r = 0;
          t.subscribe(new et(i, (s) => n.call(e, s, r++) && i.next(s)));
        });
      }
      let Sf;
      try {
        Sf = "undefined" != typeof Intl && Intl.v8BreakIterator;
      } catch (n) {
        Sf = !1;
      }
      let Wo,
        sr,
        If,
        ti = (() => {
          class n {
            constructor(t) {
              (this._platformId = t),
                (this.isBrowser = this._platformId
                  ? (function (n) {
                      return n === DD;
                    })(this._platformId)
                  : "object" == typeof document && !!document),
                (this.EDGE =
                  this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                (this.TRIDENT =
                  this.isBrowser &&
                  /(msie|trident)/i.test(navigator.userAgent)),
                (this.BLINK =
                  this.isBrowser &&
                  !(!window.chrome && !Sf) &&
                  "undefined" != typeof CSS &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.WEBKIT =
                  this.isBrowser &&
                  /AppleWebKit/i.test(navigator.userAgent) &&
                  !this.BLINK &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.IOS =
                  this.isBrowser &&
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !("MSStream" in window)),
                (this.FIREFOX =
                  this.isBrowser &&
                  /(firefox|minefield)/i.test(navigator.userAgent)),
                (this.ANDROID =
                  this.isBrowser &&
                  /android/i.test(navigator.userAgent) &&
                  !this.TRIDENT),
                (this.SAFARI =
                  this.isBrowser &&
                  /safari/i.test(navigator.userAgent) &&
                  this.WEBKIT);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(b(_l));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        WD = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = be({ type: n })),
            (n.ɵinj = pe({})),
            n
          );
        })();
      function rr(n) {
        return (function () {
          if (null == Wo && "undefined" != typeof window)
            try {
              window.addEventListener(
                "test",
                null,
                Object.defineProperty({}, "passive", { get: () => (Wo = !0) })
              );
            } finally {
              Wo = Wo || !1;
            }
          return Wo;
        })()
          ? n
          : !!n.capture;
      }
      function OV() {
        if (null == sr) {
          if (
            "object" != typeof document ||
            !document ||
            "function" != typeof Element ||
            !Element
          )
            return (sr = !1), sr;
          if ("scrollBehavior" in document.documentElement.style) sr = !0;
          else {
            const n = Element.prototype.scrollTo;
            sr = !!n && !/\{\s*\[native code\]\s*\}/.test(n.toString());
          }
        }
        return sr;
      }
      function kf(n) {
        if (
          (function () {
            if (null == If) {
              const n = "undefined" != typeof document ? document.head : null;
              If = !(!n || (!n.createShadowRoot && !n.attachShadow));
            }
            return If;
          })()
        ) {
          const e = n.getRootNode ? n.getRootNode() : null;
          if (
            "undefined" != typeof ShadowRoot &&
            ShadowRoot &&
            e instanceof ShadowRoot
          )
            return e;
        }
        return null;
      }
      function Mn(n) {
        return n.composedPath ? n.composedPath()[0] : n.target;
      }
      function Tf() {
        return (
          ("undefined" != typeof __karma__ && !!__karma__) ||
          ("undefined" != typeof jasmine && !!jasmine) ||
          ("undefined" != typeof jest && !!jest) ||
          ("undefined" != typeof Mocha && !!Mocha)
        );
      }
      const FV = new x("cdk-dir-doc", {
        providedIn: "root",
        factory: function () {
          return Ou(Q);
        },
      });
      let KD = (() => {
          class n {
            constructor(t) {
              if (((this.value = "ltr"), (this.change = new ce()), t)) {
                const r = t.documentElement ? t.documentElement.dir : null,
                  s = (t.body ? t.body.dir : null) || r;
                this.value = "ltr" === s || "rtl" === s ? s : "ltr";
              }
            }
            ngOnDestroy() {
              this.change.complete();
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(b(FV, 8));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        qo = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = be({ type: n })),
            (n.ɵinj = pe({})),
            n
          );
        })(),
        VV = (() => {
          class n {
            constructor(t, i, r) {
              (this._ngZone = t),
                (this._platform = i),
                (this._scrolled = new q()),
                (this._globalSubscription = null),
                (this._scrolledCount = 0),
                (this.scrollContainers = new Map()),
                (this._document = r);
            }
            register(t) {
              this.scrollContainers.has(t) ||
                this.scrollContainers.set(
                  t,
                  t.elementScrolled().subscribe(() => this._scrolled.next(t))
                );
            }
            deregister(t) {
              const i = this.scrollContainers.get(t);
              i && (i.unsubscribe(), this.scrollContainers.delete(t));
            }
            scrolled(t = 20) {
              return this._platform.isBrowser
                ? new Se((i) => {
                    this._globalSubscription || this._addGlobalListener();
                    const r =
                      t > 0
                        ? this._scrolled.pipe(GD(t)).subscribe(i)
                        : this._scrolled.subscribe(i);
                    return (
                      this._scrolledCount++,
                      () => {
                        r.unsubscribe(),
                          this._scrolledCount--,
                          this._scrolledCount || this._removeGlobalListener();
                      }
                    );
                  })
                : Di();
            }
            ngOnDestroy() {
              this._removeGlobalListener(),
                this.scrollContainers.forEach((t, i) => this.deregister(i)),
                this._scrolled.complete();
            }
            ancestorScrolled(t, i) {
              const r = this.getAncestorScrollContainers(t);
              return this.scrolled(i).pipe(Xl((s) => !s || r.indexOf(s) > -1));
            }
            getAncestorScrollContainers(t) {
              const i = [];
              return (
                this.scrollContainers.forEach((r, s) => {
                  this._scrollableContainsElement(s, t) && i.push(s);
                }),
                i
              );
            }
            _getWindow() {
              return this._document.defaultView || window;
            }
            _scrollableContainsElement(t, i) {
              let r = He(i),
                s = t.getElementRef().nativeElement;
              do {
                if (r == s) return !0;
              } while ((r = r.parentElement));
              return !1;
            }
            _addGlobalListener() {
              this._globalSubscription = this._ngZone.runOutsideAngular(() =>
                Df(this._getWindow().document, "scroll").subscribe(() =>
                  this._scrolled.next()
                )
              );
            }
            _removeGlobalListener() {
              this._globalSubscription &&
                (this._globalSubscription.unsubscribe(),
                (this._globalSubscription = null));
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(b(oe), b(ti), b(Q, 8));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        Af = (() => {
          class n {
            constructor(t, i, r) {
              (this._platform = t),
                (this._change = new q()),
                (this._changeListener = (s) => {
                  this._change.next(s);
                }),
                (this._document = r),
                i.runOutsideAngular(() => {
                  if (t.isBrowser) {
                    const s = this._getWindow();
                    s.addEventListener("resize", this._changeListener),
                      s.addEventListener(
                        "orientationchange",
                        this._changeListener
                      );
                  }
                  this.change().subscribe(() => (this._viewportSize = null));
                });
            }
            ngOnDestroy() {
              if (this._platform.isBrowser) {
                const t = this._getWindow();
                t.removeEventListener("resize", this._changeListener),
                  t.removeEventListener(
                    "orientationchange",
                    this._changeListener
                  );
              }
              this._change.complete();
            }
            getViewportSize() {
              this._viewportSize || this._updateViewportSize();
              const t = {
                width: this._viewportSize.width,
                height: this._viewportSize.height,
              };
              return this._platform.isBrowser || (this._viewportSize = null), t;
            }
            getViewportRect() {
              const t = this.getViewportScrollPosition(),
                { width: i, height: r } = this.getViewportSize();
              return {
                top: t.top,
                left: t.left,
                bottom: t.top + r,
                right: t.left + i,
                height: r,
                width: i,
              };
            }
            getViewportScrollPosition() {
              if (!this._platform.isBrowser) return { top: 0, left: 0 };
              const t = this._document,
                i = this._getWindow(),
                r = t.documentElement,
                s = r.getBoundingClientRect();
              return {
                top:
                  -s.top || t.body.scrollTop || i.scrollY || r.scrollTop || 0,
                left:
                  -s.left ||
                  t.body.scrollLeft ||
                  i.scrollX ||
                  r.scrollLeft ||
                  0,
              };
            }
            change(t = 20) {
              return t > 0 ? this._change.pipe(GD(t)) : this._change;
            }
            _getWindow() {
              return this._document.defaultView || window;
            }
            _updateViewportSize() {
              const t = this._getWindow();
              this._viewportSize = this._platform.isBrowser
                ? { width: t.innerWidth, height: t.innerHeight }
                : { width: 0, height: 0 };
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(b(ti), b(oe), b(Q, 8));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        Jl = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = be({ type: n })),
            (n.ɵinj = pe({})),
            n
          );
        })(),
        YD = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = be({ type: n })),
            (n.ɵinj = pe({ imports: [[qo, WD, Jl], qo, Jl] })),
            n
          );
        })();
      class HV extends q {
        constructor(e) {
          super(), (this._value = e);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(e) {
          const t = super._subscribe(e);
          return !t.closed && e.next(this._value), t;
        }
        getValue() {
          const { hasError: e, thrownError: t, _value: i } = this;
          if (e) throw t;
          return this._throwIfClosed(), i;
        }
        next(e) {
          super.next((this._value = e));
        }
      }
      function Ko(n, e, t) {
        const i = $(n) || e || t ? { next: n, error: e, complete: t } : n;
        return i
          ? Je((r, s) => {
              var o;
              null === (o = i.subscribe) || void 0 === o || o.call(i);
              let a = !0;
              r.subscribe(
                new et(
                  s,
                  (l) => {
                    var c;
                    null === (c = i.next) || void 0 === c || c.call(i, l),
                      s.next(l);
                  },
                  () => {
                    var l;
                    (a = !1),
                      null === (l = i.complete) || void 0 === l || l.call(i),
                      s.complete();
                  },
                  (l) => {
                    var c;
                    (a = !1),
                      null === (c = i.error) || void 0 === c || c.call(i, l),
                      s.error(l);
                  },
                  () => {
                    var l, c;
                    a &&
                      (null === (l = i.unsubscribe) ||
                        void 0 === l ||
                        l.call(i)),
                      null === (c = i.finalize) || void 0 === c || c.call(i);
                  }
                )
              );
            })
          : ha;
      }
      function rB(n, e) {
        return n === e;
      }
      function ni(n) {
        return Je((e, t) => {
          qt(n).subscribe(new et(t, () => t.complete(), Ts)),
            !t.closed && e.subscribe(t);
        });
      }
      function Of(n) {
        return 0 === n.offsetX && 0 === n.offsetY;
      }
      function Pf(n) {
        const e =
          (n.touches && n.touches[0]) ||
          (n.changedTouches && n.changedTouches[0]);
        return !(
          !e ||
          -1 !== e.identifier ||
          (null != e.radiusX && 1 !== e.radiusX) ||
          (null != e.radiusY && 1 !== e.radiusY)
        );
      }
      const pB = new x("cdk-input-modality-detector-options"),
        mB = { ignoreKeys: [18, 17, 224, 91, 16] },
        Cs = rr({ passive: !0, capture: !0 });
      let gB = (() => {
        class n {
          constructor(t, i, r, s) {
            (this._platform = t),
              (this._mostRecentTarget = null),
              (this._modality = new HV(null)),
              (this._lastTouchMs = 0),
              (this._onKeydown = (o) => {
                var a, l;
                (null ==
                (l = null == (a = this._options) ? void 0 : a.ignoreKeys)
                  ? void 0
                  : l.some((c) => c === o.keyCode)) ||
                  (this._modality.next("keyboard"),
                  (this._mostRecentTarget = Mn(o)));
              }),
              (this._onMousedown = (o) => {
                Date.now() - this._lastTouchMs < 650 ||
                  (this._modality.next(Of(o) ? "keyboard" : "mouse"),
                  (this._mostRecentTarget = Mn(o)));
              }),
              (this._onTouchstart = (o) => {
                Pf(o)
                  ? this._modality.next("keyboard")
                  : ((this._lastTouchMs = Date.now()),
                    this._modality.next("touch"),
                    (this._mostRecentTarget = Mn(o)));
              }),
              (this._options = Z(Z({}, mB), s)),
              (this.modalityDetected = this._modality.pipe(
                Xl((e, t) => 1 <= t)
              )),
              (this.modalityChanged = this.modalityDetected.pipe(
                (function (n, e = ha) {
                  return (
                    (n = null != n ? n : rB),
                    Je((t, i) => {
                      let r,
                        s = !0;
                      t.subscribe(
                        new et(i, (o) => {
                          const a = e(o);
                          (s || !n(r, a)) && ((s = !1), (r = a), i.next(o));
                        })
                      );
                    })
                  );
                })()
              )),
              t.isBrowser &&
                i.runOutsideAngular(() => {
                  r.addEventListener("keydown", this._onKeydown, Cs),
                    r.addEventListener("mousedown", this._onMousedown, Cs),
                    r.addEventListener("touchstart", this._onTouchstart, Cs);
                });
          }
          get mostRecentModality() {
            return this._modality.value;
          }
          ngOnDestroy() {
            this._modality.complete(),
              this._platform.isBrowser &&
                (document.removeEventListener("keydown", this._onKeydown, Cs),
                document.removeEventListener(
                  "mousedown",
                  this._onMousedown,
                  Cs
                ),
                document.removeEventListener(
                  "touchstart",
                  this._onTouchstart,
                  Cs
                ));
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(b(ti), b(oe), b(Q), b(pB, 8));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const yB = new x("cdk-focus-monitor-default-options"),
        ec = rr({ passive: !0, capture: !0 });
      let Ff = (() => {
        class n {
          constructor(t, i, r, s, o) {
            (this._ngZone = t),
              (this._platform = i),
              (this._inputModalityDetector = r),
              (this._origin = null),
              (this._windowFocused = !1),
              (this._originFromTouchInteraction = !1),
              (this._elementInfo = new Map()),
              (this._monitoredElementCount = 0),
              (this._rootNodeFocusListenerCount = new Map()),
              (this._windowFocusListener = () => {
                (this._windowFocused = !0),
                  (this._windowFocusTimeoutId = setTimeout(
                    () => (this._windowFocused = !1)
                  ));
              }),
              (this._stopInputModalityDetector = new q()),
              (this._rootNodeFocusAndBlurListener = (a) => {
                const l = Mn(a),
                  c = "focus" === a.type ? this._onFocus : this._onBlur;
                for (let u = l; u; u = u.parentElement) c.call(this, a, u);
              }),
              (this._document = s),
              (this._detectionMode =
                (null == o ? void 0 : o.detectionMode) || 0);
          }
          monitor(t, i = !1) {
            const r = He(t);
            if (!this._platform.isBrowser || 1 !== r.nodeType) return Di(null);
            const s = kf(r) || this._getDocument(),
              o = this._elementInfo.get(r);
            if (o) return i && (o.checkChildren = !0), o.subject;
            const a = { checkChildren: i, subject: new q(), rootNode: s };
            return (
              this._elementInfo.set(r, a),
              this._registerGlobalListeners(a),
              a.subject
            );
          }
          stopMonitoring(t) {
            const i = He(t),
              r = this._elementInfo.get(i);
            r &&
              (r.subject.complete(),
              this._setClasses(i),
              this._elementInfo.delete(i),
              this._removeGlobalListeners(r));
          }
          focusVia(t, i, r) {
            const s = He(t);
            s === this._getDocument().activeElement
              ? this._getClosestElementsInfo(s).forEach(([a, l]) =>
                  this._originChanged(a, i, l)
                )
              : (this._setOrigin(i),
                "function" == typeof s.focus && s.focus(r));
          }
          ngOnDestroy() {
            this._elementInfo.forEach((t, i) => this.stopMonitoring(i));
          }
          _getDocument() {
            return this._document || document;
          }
          _getWindow() {
            return this._getDocument().defaultView || window;
          }
          _getFocusOrigin(t) {
            return this._origin
              ? this._originFromTouchInteraction
                ? this._shouldBeAttributedToTouch(t)
                  ? "touch"
                  : "program"
                : this._origin
              : this._windowFocused && this._lastFocusOrigin
              ? this._lastFocusOrigin
              : "program";
          }
          _shouldBeAttributedToTouch(t) {
            return (
              1 === this._detectionMode ||
              !!(null == t
                ? void 0
                : t.contains(this._inputModalityDetector._mostRecentTarget))
            );
          }
          _setClasses(t, i) {
            t.classList.toggle("cdk-focused", !!i),
              t.classList.toggle("cdk-touch-focused", "touch" === i),
              t.classList.toggle("cdk-keyboard-focused", "keyboard" === i),
              t.classList.toggle("cdk-mouse-focused", "mouse" === i),
              t.classList.toggle("cdk-program-focused", "program" === i);
          }
          _setOrigin(t, i = !1) {
            this._ngZone.runOutsideAngular(() => {
              (this._origin = t),
                (this._originFromTouchInteraction = "touch" === t && i),
                0 === this._detectionMode &&
                  (clearTimeout(this._originTimeoutId),
                  (this._originTimeoutId = setTimeout(
                    () => (this._origin = null),
                    this._originFromTouchInteraction ? 650 : 1
                  )));
            });
          }
          _onFocus(t, i) {
            const r = this._elementInfo.get(i),
              s = Mn(t);
            !r ||
              (!r.checkChildren && i !== s) ||
              this._originChanged(i, this._getFocusOrigin(s), r);
          }
          _onBlur(t, i) {
            const r = this._elementInfo.get(i);
            !r ||
              (r.checkChildren &&
                t.relatedTarget instanceof Node &&
                i.contains(t.relatedTarget)) ||
              (this._setClasses(i), this._emitOrigin(r.subject, null));
          }
          _emitOrigin(t, i) {
            this._ngZone.run(() => t.next(i));
          }
          _registerGlobalListeners(t) {
            if (!this._platform.isBrowser) return;
            const i = t.rootNode,
              r = this._rootNodeFocusListenerCount.get(i) || 0;
            r ||
              this._ngZone.runOutsideAngular(() => {
                i.addEventListener(
                  "focus",
                  this._rootNodeFocusAndBlurListener,
                  ec
                ),
                  i.addEventListener(
                    "blur",
                    this._rootNodeFocusAndBlurListener,
                    ec
                  );
              }),
              this._rootNodeFocusListenerCount.set(i, r + 1),
              1 == ++this._monitoredElementCount &&
                (this._ngZone.runOutsideAngular(() => {
                  this._getWindow().addEventListener(
                    "focus",
                    this._windowFocusListener
                  );
                }),
                this._inputModalityDetector.modalityDetected
                  .pipe(ni(this._stopInputModalityDetector))
                  .subscribe((s) => {
                    this._setOrigin(s, !0);
                  }));
          }
          _removeGlobalListeners(t) {
            const i = t.rootNode;
            if (this._rootNodeFocusListenerCount.has(i)) {
              const r = this._rootNodeFocusListenerCount.get(i);
              r > 1
                ? this._rootNodeFocusListenerCount.set(i, r - 1)
                : (i.removeEventListener(
                    "focus",
                    this._rootNodeFocusAndBlurListener,
                    ec
                  ),
                  i.removeEventListener(
                    "blur",
                    this._rootNodeFocusAndBlurListener,
                    ec
                  ),
                  this._rootNodeFocusListenerCount.delete(i));
            }
            --this._monitoredElementCount ||
              (this._getWindow().removeEventListener(
                "focus",
                this._windowFocusListener
              ),
              this._stopInputModalityDetector.next(),
              clearTimeout(this._windowFocusTimeoutId),
              clearTimeout(this._originTimeoutId));
          }
          _originChanged(t, i, r) {
            this._setClasses(t, i),
              this._emitOrigin(r.subject, i),
              (this._lastFocusOrigin = i);
          }
          _getClosestElementsInfo(t) {
            const i = [];
            return (
              this._elementInfo.forEach((r, s) => {
                (s === t || (r.checkChildren && s.contains(t))) &&
                  i.push([s, r]);
              }),
              i
            );
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(b(oe), b(ti), b(gB), b(Q, 8), b(yB, 8));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const rE = "cdk-high-contrast-black-on-white",
        sE = "cdk-high-contrast-white-on-black",
        Nf = "cdk-high-contrast-active";
      let vB = (() => {
        class n {
          constructor(t, i) {
            (this._platform = t), (this._document = i);
          }
          getHighContrastMode() {
            if (!this._platform.isBrowser) return 0;
            const t = this._document.createElement("div");
            (t.style.backgroundColor = "rgb(1,2,3)"),
              (t.style.position = "absolute"),
              this._document.body.appendChild(t);
            const i = this._document.defaultView || window,
              r = i && i.getComputedStyle ? i.getComputedStyle(t) : null,
              s = ((r && r.backgroundColor) || "").replace(/ /g, "");
            switch ((t.remove(), s)) {
              case "rgb(0,0,0)":
                return 2;
              case "rgb(255,255,255)":
                return 1;
            }
            return 0;
          }
          _applyBodyHighContrastModeCssClasses() {
            if (
              !this._hasCheckedHighContrastMode &&
              this._platform.isBrowser &&
              this._document.body
            ) {
              const t = this._document.body.classList;
              t.remove(Nf),
                t.remove(rE),
                t.remove(sE),
                (this._hasCheckedHighContrastMode = !0);
              const i = this.getHighContrastMode();
              1 === i
                ? (t.add(Nf), t.add(rE))
                : 2 === i && (t.add(Nf), t.add(sE));
            }
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(b(ti), b(Q));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function oE(...n) {
        return vm(1)(Rs(n, fa(n)));
      }
      function tc(...n) {
        const e = fa(n);
        return Je((t, i) => {
          (e ? oE(n, t, e) : oE(n, t)).subscribe(i);
        });
      }
      function Lf(n, e, t) {
        for (let i in e)
          if (e.hasOwnProperty(i)) {
            const r = e[i];
            r
              ? n.setProperty(
                  i,
                  r,
                  (null == t ? void 0 : t.has(i)) ? "important" : ""
                )
              : n.removeProperty(i);
          }
        return n;
      }
      function Ds(n, e) {
        const t = e ? "" : "none";
        Lf(n.style, {
          "touch-action": e ? "" : "none",
          "-webkit-user-drag": e ? "" : "none",
          "-webkit-tap-highlight-color": e ? "" : "transparent",
          "user-select": t,
          "-ms-user-select": t,
          "-webkit-user-select": t,
          "-moz-user-select": t,
        });
      }
      function aE(n, e, t) {
        Lf(
          n.style,
          {
            position: e ? "" : "fixed",
            top: e ? "" : "0",
            opacity: e ? "" : "0",
            left: e ? "" : "-999em",
          },
          t
        );
      }
      function nc(n, e) {
        return e && "none" != e ? n + " " + e : n;
      }
      function lE(n) {
        const e = n.toLowerCase().indexOf("ms") > -1 ? 1 : 1e3;
        return parseFloat(n) * e;
      }
      function Vf(n, e) {
        return n
          .getPropertyValue(e)
          .split(",")
          .map((i) => i.trim());
      }
      function Bf(n) {
        const e = n.getBoundingClientRect();
        return {
          top: e.top,
          right: e.right,
          bottom: e.bottom,
          left: e.left,
          width: e.width,
          height: e.height,
          x: e.x,
          y: e.y,
        };
      }
      function Hf(n, e, t) {
        const { top: i, bottom: r, left: s, right: o } = n;
        return t >= i && t <= r && e >= s && e <= o;
      }
      function Yo(n, e, t) {
        (n.top += e),
          (n.bottom = n.top + n.height),
          (n.left += t),
          (n.right = n.left + n.width);
      }
      function cE(n, e, t, i) {
        const { top: r, right: s, bottom: o, left: a, width: l, height: c } = n,
          u = l * e,
          d = c * e;
        return i > r - d && i < o + d && t > a - u && t < s + u;
      }
      class uE {
        constructor(e, t) {
          (this._document = e),
            (this._viewportRuler = t),
            (this.positions = new Map());
        }
        clear() {
          this.positions.clear();
        }
        cache(e) {
          this.clear(),
            this.positions.set(this._document, {
              scrollPosition: this._viewportRuler.getViewportScrollPosition(),
            }),
            e.forEach((t) => {
              this.positions.set(t, {
                scrollPosition: { top: t.scrollTop, left: t.scrollLeft },
                clientRect: Bf(t),
              });
            });
        }
        handleScroll(e) {
          const t = Mn(e),
            i = this.positions.get(t);
          if (!i) return null;
          const r = i.scrollPosition;
          let s, o;
          if (t === this._document) {
            const c = this._viewportRuler.getViewportScrollPosition();
            (s = c.top), (o = c.left);
          } else (s = t.scrollTop), (o = t.scrollLeft);
          const a = r.top - s,
            l = r.left - o;
          return (
            this.positions.forEach((c, u) => {
              c.clientRect &&
                t !== u &&
                t.contains(u) &&
                Yo(c.clientRect, a, l);
            }),
            (r.top = s),
            (r.left = o),
            { top: a, left: l }
          );
        }
      }
      function dE(n) {
        const e = n.cloneNode(!0),
          t = e.querySelectorAll("[id]"),
          i = n.nodeName.toLowerCase();
        e.removeAttribute("id");
        for (let r = 0; r < t.length; r++) t[r].removeAttribute("id");
        return (
          "canvas" === i
            ? pE(n, e)
            : ("input" === i || "select" === i || "textarea" === i) && fE(n, e),
          hE("canvas", n, e, pE),
          hE("input, textarea, select", n, e, fE),
          e
        );
      }
      function hE(n, e, t, i) {
        const r = e.querySelectorAll(n);
        if (r.length) {
          const s = t.querySelectorAll(n);
          for (let o = 0; o < r.length; o++) i(r[o], s[o]);
        }
      }
      let wB = 0;
      function fE(n, e) {
        "file" !== e.type && (e.value = n.value),
          "radio" === e.type &&
            e.name &&
            (e.name = `mat-clone-${e.name}-${wB++}`);
      }
      function pE(n, e) {
        const t = e.getContext("2d");
        if (t)
          try {
            t.drawImage(n, 0, 0);
          } catch (i) {}
      }
      const mE = rr({ passive: !0 }),
        gE = rr({ passive: !1 }),
        jf = new Set(["position"]);
      class xB {
        constructor(e, t, i, r, s, o) {
          (this._config = t),
            (this._document = i),
            (this._ngZone = r),
            (this._viewportRuler = s),
            (this._dragDropRegistry = o),
            (this._passiveTransform = { x: 0, y: 0 }),
            (this._activeTransform = { x: 0, y: 0 }),
            (this._hasStartedDragging = !1),
            (this._moveEvents = new q()),
            (this._pointerMoveSubscription = Oe.EMPTY),
            (this._pointerUpSubscription = Oe.EMPTY),
            (this._scrollSubscription = Oe.EMPTY),
            (this._resizeSubscription = Oe.EMPTY),
            (this._boundaryElement = null),
            (this._nativeInteractionsEnabled = !0),
            (this._handles = []),
            (this._disabledHandles = new Set()),
            (this._direction = "ltr"),
            (this.dragStartDelay = 0),
            (this._disabled = !1),
            (this.beforeStarted = new q()),
            (this.started = new q()),
            (this.released = new q()),
            (this.ended = new q()),
            (this.entered = new q()),
            (this.exited = new q()),
            (this.dropped = new q()),
            (this.moved = this._moveEvents),
            (this._pointerDown = (a) => {
              if ((this.beforeStarted.next(), this._handles.length)) {
                const l = this._handles.find(
                  (c) => a.target && (a.target === c || c.contains(a.target))
                );
                l &&
                  !this._disabledHandles.has(l) &&
                  !this.disabled &&
                  this._initializeDragSequence(l, a);
              } else
                this.disabled ||
                  this._initializeDragSequence(this._rootElement, a);
            }),
            (this._pointerMove = (a) => {
              const l = this._getPointerPositionOnPage(a);
              if (!this._hasStartedDragging) {
                if (
                  Math.abs(l.x - this._pickupPositionOnPage.x) +
                    Math.abs(l.y - this._pickupPositionOnPage.y) >=
                  this._config.dragStartThreshold
                ) {
                  const f =
                      Date.now() >=
                      this._dragStartTime + this._getDragStartDelay(a),
                    p = this._dropContainer;
                  if (!f) return void this._endDragSequence(a);
                  (!p || (!p.isDragging() && !p.isReceiving())) &&
                    (a.preventDefault(),
                    (this._hasStartedDragging = !0),
                    this._ngZone.run(() => this._startDragSequence(a)));
                }
                return;
              }
              this._boundaryElement &&
                (!this._previewRect ||
                  (!this._previewRect.width && !this._previewRect.height)) &&
                (this._previewRect = (
                  this._preview || this._rootElement
                ).getBoundingClientRect()),
                a.preventDefault();
              const c = this._getConstrainedPointerPosition(l);
              if (
                ((this._hasMoved = !0),
                (this._lastKnownPointerPosition = l),
                this._updatePointerDirectionDelta(c),
                this._dropContainer)
              )
                this._updateActiveDropContainer(c, l);
              else {
                const u = this._activeTransform;
                (u.x =
                  c.x -
                  this._pickupPositionOnPage.x +
                  this._passiveTransform.x),
                  (u.y =
                    c.y -
                    this._pickupPositionOnPage.y +
                    this._passiveTransform.y),
                  this._applyRootElementTransform(u.x, u.y);
              }
              this._moveEvents.observers.length &&
                this._ngZone.run(() => {
                  this._moveEvents.next({
                    source: this,
                    pointerPosition: c,
                    event: a,
                    distance: this._getDragDistance(c),
                    delta: this._pointerDirectionDelta,
                  });
                });
            }),
            (this._pointerUp = (a) => {
              this._endDragSequence(a);
            }),
            this.withRootElement(e).withParent(t.parentDragRef || null),
            (this._parentPositions = new uE(i, s)),
            o.registerDragItem(this);
        }
        get disabled() {
          return (
            this._disabled ||
            !(!this._dropContainer || !this._dropContainer.disabled)
          );
        }
        set disabled(e) {
          const t = At(e);
          t !== this._disabled &&
            ((this._disabled = t),
            this._toggleNativeDragInteractions(),
            this._handles.forEach((i) => Ds(i, t)));
        }
        getPlaceholderElement() {
          return this._placeholder;
        }
        getRootElement() {
          return this._rootElement;
        }
        getVisibleElement() {
          return this.isDragging()
            ? this.getPlaceholderElement()
            : this.getRootElement();
        }
        withHandles(e) {
          (this._handles = e.map((i) => He(i))),
            this._handles.forEach((i) => Ds(i, this.disabled)),
            this._toggleNativeDragInteractions();
          const t = new Set();
          return (
            this._disabledHandles.forEach((i) => {
              this._handles.indexOf(i) > -1 && t.add(i);
            }),
            (this._disabledHandles = t),
            this
          );
        }
        withPreviewTemplate(e) {
          return (this._previewTemplate = e), this;
        }
        withPlaceholderTemplate(e) {
          return (this._placeholderTemplate = e), this;
        }
        withRootElement(e) {
          const t = He(e);
          return (
            t !== this._rootElement &&
              (this._rootElement &&
                this._removeRootElementListeners(this._rootElement),
              this._ngZone.runOutsideAngular(() => {
                t.addEventListener("mousedown", this._pointerDown, gE),
                  t.addEventListener("touchstart", this._pointerDown, mE);
              }),
              (this._initialTransform = void 0),
              (this._rootElement = t)),
            "undefined" != typeof SVGElement &&
              this._rootElement instanceof SVGElement &&
              (this._ownerSVGElement = this._rootElement.ownerSVGElement),
            this
          );
        }
        withBoundaryElement(e) {
          return (
            (this._boundaryElement = e ? He(e) : null),
            this._resizeSubscription.unsubscribe(),
            e &&
              (this._resizeSubscription = this._viewportRuler
                .change(10)
                .subscribe(() => this._containInsideBoundaryOnResize())),
            this
          );
        }
        withParent(e) {
          return (this._parentDragRef = e), this;
        }
        dispose() {
          var e, t;
          this._removeRootElementListeners(this._rootElement),
            this.isDragging() &&
              (null == (e = this._rootElement) || e.remove()),
            null == (t = this._anchor) || t.remove(),
            this._destroyPreview(),
            this._destroyPlaceholder(),
            this._dragDropRegistry.removeDragItem(this),
            this._removeSubscriptions(),
            this.beforeStarted.complete(),
            this.started.complete(),
            this.released.complete(),
            this.ended.complete(),
            this.entered.complete(),
            this.exited.complete(),
            this.dropped.complete(),
            this._moveEvents.complete(),
            (this._handles = []),
            this._disabledHandles.clear(),
            (this._dropContainer = void 0),
            this._resizeSubscription.unsubscribe(),
            this._parentPositions.clear(),
            (this._boundaryElement =
              this._rootElement =
              this._ownerSVGElement =
              this._placeholderTemplate =
              this._previewTemplate =
              this._anchor =
              this._parentDragRef =
                null);
        }
        isDragging() {
          return (
            this._hasStartedDragging && this._dragDropRegistry.isDragging(this)
          );
        }
        reset() {
          (this._rootElement.style.transform = this._initialTransform || ""),
            (this._activeTransform = { x: 0, y: 0 }),
            (this._passiveTransform = { x: 0, y: 0 });
        }
        disableHandle(e) {
          !this._disabledHandles.has(e) &&
            this._handles.indexOf(e) > -1 &&
            (this._disabledHandles.add(e), Ds(e, !0));
        }
        enableHandle(e) {
          this._disabledHandles.has(e) &&
            (this._disabledHandles.delete(e), Ds(e, this.disabled));
        }
        withDirection(e) {
          return (this._direction = e), this;
        }
        _withDropContainer(e) {
          this._dropContainer = e;
        }
        getFreeDragPosition() {
          const e = this.isDragging()
            ? this._activeTransform
            : this._passiveTransform;
          return { x: e.x, y: e.y };
        }
        setFreeDragPosition(e) {
          return (
            (this._activeTransform = { x: 0, y: 0 }),
            (this._passiveTransform.x = e.x),
            (this._passiveTransform.y = e.y),
            this._dropContainer || this._applyRootElementTransform(e.x, e.y),
            this
          );
        }
        withPreviewContainer(e) {
          return (this._previewContainer = e), this;
        }
        _sortFromLastPointerPosition() {
          const e = this._lastKnownPointerPosition;
          e &&
            this._dropContainer &&
            this._updateActiveDropContainer(
              this._getConstrainedPointerPosition(e),
              e
            );
        }
        _removeSubscriptions() {
          this._pointerMoveSubscription.unsubscribe(),
            this._pointerUpSubscription.unsubscribe(),
            this._scrollSubscription.unsubscribe();
        }
        _destroyPreview() {
          var e, t;
          null == (e = this._preview) || e.remove(),
            null == (t = this._previewRef) || t.destroy(),
            (this._preview = this._previewRef = null);
        }
        _destroyPlaceholder() {
          var e, t;
          null == (e = this._placeholder) || e.remove(),
            null == (t = this._placeholderRef) || t.destroy(),
            (this._placeholder = this._placeholderRef = null);
        }
        _endDragSequence(e) {
          if (
            this._dragDropRegistry.isDragging(this) &&
            (this._removeSubscriptions(),
            this._dragDropRegistry.stopDragging(this),
            this._toggleNativeDragInteractions(),
            this._handles &&
              (this._rootElement.style.webkitTapHighlightColor =
                this._rootElementTapHighlight),
            this._hasStartedDragging)
          )
            if ((this.released.next({ source: this }), this._dropContainer))
              this._dropContainer._stopScrolling(),
                this._animatePreviewToPlaceholder().then(() => {
                  this._cleanupDragArtifacts(e),
                    this._cleanupCachedDimensions(),
                    this._dragDropRegistry.stopDragging(this);
                });
            else {
              this._passiveTransform.x = this._activeTransform.x;
              const t = this._getPointerPositionOnPage(e);
              (this._passiveTransform.y = this._activeTransform.y),
                this._ngZone.run(() => {
                  this.ended.next({
                    source: this,
                    distance: this._getDragDistance(t),
                    dropPoint: t,
                  });
                }),
                this._cleanupCachedDimensions(),
                this._dragDropRegistry.stopDragging(this);
            }
        }
        _startDragSequence(e) {
          Qo(e) && (this._lastTouchEventTime = Date.now()),
            this._toggleNativeDragInteractions();
          const t = this._dropContainer;
          if (t) {
            const i = this._rootElement,
              r = i.parentNode,
              s = (this._placeholder = this._createPlaceholderElement()),
              o = (this._anchor =
                this._anchor || this._document.createComment("")),
              a = this._getShadowRoot();
            r.insertBefore(o, i),
              (this._initialTransform = i.style.transform || ""),
              (this._preview = this._createPreviewElement()),
              aE(i, !1, jf),
              this._document.body.appendChild(r.replaceChild(s, i)),
              this._getPreviewInsertionPoint(r, a).appendChild(this._preview),
              this.started.next({ source: this }),
              t.start(),
              (this._initialContainer = t),
              (this._initialIndex = t.getItemIndex(this));
          } else
            this.started.next({ source: this }),
              (this._initialContainer = this._initialIndex = void 0);
          this._parentPositions.cache(t ? t.getScrollableParents() : []);
        }
        _initializeDragSequence(e, t) {
          this._parentDragRef && t.stopPropagation();
          const i = this.isDragging(),
            r = Qo(t),
            s = !r && 0 !== t.button,
            o = this._rootElement,
            a = Mn(t),
            l =
              !r &&
              this._lastTouchEventTime &&
              this._lastTouchEventTime + 800 > Date.now(),
            c = r ? Pf(t) : Of(t);
          if (
            (a && a.draggable && "mousedown" === t.type && t.preventDefault(),
            i || s || l || c)
          )
            return;
          if (this._handles.length) {
            const h = o.style;
            (this._rootElementTapHighlight = h.webkitTapHighlightColor || ""),
              (h.webkitTapHighlightColor = "transparent");
          }
          (this._hasStartedDragging = this._hasMoved = !1),
            this._removeSubscriptions(),
            (this._pointerMoveSubscription =
              this._dragDropRegistry.pointerMove.subscribe(this._pointerMove)),
            (this._pointerUpSubscription =
              this._dragDropRegistry.pointerUp.subscribe(this._pointerUp)),
            (this._scrollSubscription = this._dragDropRegistry
              .scrolled(this._getShadowRoot())
              .subscribe((h) => this._updateOnScroll(h))),
            this._boundaryElement &&
              (this._boundaryRect = Bf(this._boundaryElement));
          const u = this._previewTemplate;
          this._pickupPositionInElement =
            u && u.template && !u.matchSize
              ? { x: 0, y: 0 }
              : this._getPointerPositionInElement(e, t);
          const d =
            (this._pickupPositionOnPage =
            this._lastKnownPointerPosition =
              this._getPointerPositionOnPage(t));
          (this._pointerDirectionDelta = { x: 0, y: 0 }),
            (this._pointerPositionAtLastDirectionChange = { x: d.x, y: d.y }),
            (this._dragStartTime = Date.now()),
            this._dragDropRegistry.startDragging(this, t);
        }
        _cleanupDragArtifacts(e) {
          aE(this._rootElement, !0, jf),
            this._anchor.parentNode.replaceChild(
              this._rootElement,
              this._anchor
            ),
            this._destroyPreview(),
            this._destroyPlaceholder(),
            (this._boundaryRect =
              this._previewRect =
              this._initialTransform =
                void 0),
            this._ngZone.run(() => {
              const t = this._dropContainer,
                i = t.getItemIndex(this),
                r = this._getPointerPositionOnPage(e),
                s = this._getDragDistance(r),
                o = t._isOverContainer(r.x, r.y);
              this.ended.next({ source: this, distance: s, dropPoint: r }),
                this.dropped.next({
                  item: this,
                  currentIndex: i,
                  previousIndex: this._initialIndex,
                  container: t,
                  previousContainer: this._initialContainer,
                  isPointerOverContainer: o,
                  distance: s,
                  dropPoint: r,
                }),
                t.drop(
                  this,
                  i,
                  this._initialIndex,
                  this._initialContainer,
                  o,
                  s,
                  r
                ),
                (this._dropContainer = this._initialContainer);
            });
        }
        _updateActiveDropContainer({ x: e, y: t }, { x: i, y: r }) {
          let s = this._initialContainer._getSiblingContainerFromPosition(
            this,
            e,
            t
          );
          !s &&
            this._dropContainer !== this._initialContainer &&
            this._initialContainer._isOverContainer(e, t) &&
            (s = this._initialContainer),
            s &&
              s !== this._dropContainer &&
              this._ngZone.run(() => {
                this.exited.next({
                  item: this,
                  container: this._dropContainer,
                }),
                  this._dropContainer.exit(this),
                  (this._dropContainer = s),
                  this._dropContainer.enter(
                    this,
                    e,
                    t,
                    s === this._initialContainer && s.sortingDisabled
                      ? this._initialIndex
                      : void 0
                  ),
                  this.entered.next({
                    item: this,
                    container: s,
                    currentIndex: s.getItemIndex(this),
                  });
              }),
            this.isDragging() &&
              (this._dropContainer._startScrollingIfNecessary(i, r),
              this._dropContainer._sortItem(
                this,
                e,
                t,
                this._pointerDirectionDelta
              ),
              this._applyPreviewTransform(
                e - this._pickupPositionInElement.x,
                t - this._pickupPositionInElement.y
              ));
        }
        _createPreviewElement() {
          const e = this._previewTemplate,
            t = this.previewClass,
            i = e ? e.template : null;
          let r;
          if (i && e) {
            const s = e.matchSize
                ? this._rootElement.getBoundingClientRect()
                : null,
              o = e.viewContainer.createEmbeddedView(i, e.context);
            o.detectChanges(),
              (r = yE(o, this._document)),
              (this._previewRef = o),
              e.matchSize
                ? vE(r, s)
                : (r.style.transform = ic(
                    this._pickupPositionOnPage.x,
                    this._pickupPositionOnPage.y
                  ));
          } else {
            const s = this._rootElement;
            (r = dE(s)),
              vE(r, s.getBoundingClientRect()),
              this._initialTransform &&
                (r.style.transform = this._initialTransform);
          }
          return (
            Lf(
              r.style,
              {
                "pointer-events": "none",
                margin: "0",
                position: "fixed",
                top: "0",
                left: "0",
                "z-index": `${this._config.zIndex || 1e3}`,
              },
              jf
            ),
            Ds(r, !1),
            r.classList.add("cdk-drag-preview"),
            r.setAttribute("dir", this._direction),
            t &&
              (Array.isArray(t)
                ? t.forEach((s) => r.classList.add(s))
                : r.classList.add(t)),
            r
          );
        }
        _animatePreviewToPlaceholder() {
          if (!this._hasMoved) return Promise.resolve();
          const e = this._placeholder.getBoundingClientRect();
          this._preview.classList.add("cdk-drag-animating"),
            this._applyPreviewTransform(e.left, e.top);
          const t = (function (n) {
            const e = getComputedStyle(n),
              t = Vf(e, "transition-property"),
              i = t.find((a) => "transform" === a || "all" === a);
            if (!i) return 0;
            const r = t.indexOf(i),
              s = Vf(e, "transition-duration"),
              o = Vf(e, "transition-delay");
            return lE(s[r]) + lE(o[r]);
          })(this._preview);
          return 0 === t
            ? Promise.resolve()
            : this._ngZone.runOutsideAngular(
                () =>
                  new Promise((i) => {
                    const r = (o) => {
                        var a;
                        (!o ||
                          (Mn(o) === this._preview &&
                            "transform" === o.propertyName)) &&
                          (null == (a = this._preview) ||
                            a.removeEventListener("transitionend", r),
                          i(),
                          clearTimeout(s));
                      },
                      s = setTimeout(r, 1.5 * t);
                    this._preview.addEventListener("transitionend", r);
                  })
              );
        }
        _createPlaceholderElement() {
          const e = this._placeholderTemplate,
            t = e ? e.template : null;
          let i;
          return (
            t
              ? ((this._placeholderRef = e.viewContainer.createEmbeddedView(
                  t,
                  e.context
                )),
                this._placeholderRef.detectChanges(),
                (i = yE(this._placeholderRef, this._document)))
              : (i = dE(this._rootElement)),
            i.classList.add("cdk-drag-placeholder"),
            i
          );
        }
        _getPointerPositionInElement(e, t) {
          const i = this._rootElement.getBoundingClientRect(),
            r = e === this._rootElement ? null : e,
            s = r ? r.getBoundingClientRect() : i,
            o = Qo(t) ? t.targetTouches[0] : t,
            a = this._getViewportScrollPosition();
          return {
            x: s.left - i.left + (o.pageX - s.left - a.left),
            y: s.top - i.top + (o.pageY - s.top - a.top),
          };
        }
        _getPointerPositionOnPage(e) {
          const t = this._getViewportScrollPosition(),
            i = Qo(e)
              ? e.touches[0] || e.changedTouches[0] || { pageX: 0, pageY: 0 }
              : e,
            r = i.pageX - t.left,
            s = i.pageY - t.top;
          if (this._ownerSVGElement) {
            const o = this._ownerSVGElement.getScreenCTM();
            if (o) {
              const a = this._ownerSVGElement.createSVGPoint();
              return (a.x = r), (a.y = s), a.matrixTransform(o.inverse());
            }
          }
          return { x: r, y: s };
        }
        _getConstrainedPointerPosition(e) {
          const t = this._dropContainer ? this._dropContainer.lockAxis : null;
          let { x: i, y: r } = this.constrainPosition
            ? this.constrainPosition(e, this)
            : e;
          if (
            ("x" === this.lockAxis || "x" === t
              ? (r = this._pickupPositionOnPage.y)
              : ("y" === this.lockAxis || "y" === t) &&
                (i = this._pickupPositionOnPage.x),
            this._boundaryRect)
          ) {
            const { x: s, y: o } = this._pickupPositionInElement,
              a = this._boundaryRect,
              l = this._previewRect,
              c = a.top + o,
              u = a.bottom - (l.height - o);
            (i = _E(i, a.left + s, a.right - (l.width - s))), (r = _E(r, c, u));
          }
          return { x: i, y: r };
        }
        _updatePointerDirectionDelta(e) {
          const { x: t, y: i } = e,
            r = this._pointerDirectionDelta,
            s = this._pointerPositionAtLastDirectionChange,
            o = Math.abs(t - s.x),
            a = Math.abs(i - s.y);
          return (
            o > this._config.pointerDirectionChangeThreshold &&
              ((r.x = t > s.x ? 1 : -1), (s.x = t)),
            a > this._config.pointerDirectionChangeThreshold &&
              ((r.y = i > s.y ? 1 : -1), (s.y = i)),
            r
          );
        }
        _toggleNativeDragInteractions() {
          if (!this._rootElement || !this._handles) return;
          const e = this._handles.length > 0 || !this.isDragging();
          e !== this._nativeInteractionsEnabled &&
            ((this._nativeInteractionsEnabled = e), Ds(this._rootElement, e));
        }
        _removeRootElementListeners(e) {
          e.removeEventListener("mousedown", this._pointerDown, gE),
            e.removeEventListener("touchstart", this._pointerDown, mE);
        }
        _applyRootElementTransform(e, t) {
          const i = ic(e, t),
            r = this._rootElement.style;
          null == this._initialTransform &&
            (this._initialTransform =
              r.transform && "none" != r.transform ? r.transform : ""),
            (r.transform = nc(i, this._initialTransform));
        }
        _applyPreviewTransform(e, t) {
          var s;
          const i = (null == (s = this._previewTemplate) ? void 0 : s.template)
              ? void 0
              : this._initialTransform,
            r = ic(e, t);
          this._preview.style.transform = nc(r, i);
        }
        _getDragDistance(e) {
          const t = this._pickupPositionOnPage;
          return t ? { x: e.x - t.x, y: e.y - t.y } : { x: 0, y: 0 };
        }
        _cleanupCachedDimensions() {
          (this._boundaryRect = this._previewRect = void 0),
            this._parentPositions.clear();
        }
        _containInsideBoundaryOnResize() {
          let { x: e, y: t } = this._passiveTransform;
          if (
            (0 === e && 0 === t) ||
            this.isDragging() ||
            !this._boundaryElement
          )
            return;
          const i = this._boundaryElement.getBoundingClientRect(),
            r = this._rootElement.getBoundingClientRect();
          if (
            (0 === i.width && 0 === i.height) ||
            (0 === r.width && 0 === r.height)
          )
            return;
          const s = i.left - r.left,
            o = r.right - i.right,
            a = i.top - r.top,
            l = r.bottom - i.bottom;
          i.width > r.width ? (s > 0 && (e += s), o > 0 && (e -= o)) : (e = 0),
            i.height > r.height
              ? (a > 0 && (t += a), l > 0 && (t -= l))
              : (t = 0),
            (e !== this._passiveTransform.x ||
              t !== this._passiveTransform.y) &&
              this.setFreeDragPosition({ y: t, x: e });
        }
        _getDragStartDelay(e) {
          const t = this.dragStartDelay;
          return "number" == typeof t ? t : Qo(e) ? t.touch : t ? t.mouse : 0;
        }
        _updateOnScroll(e) {
          const t = this._parentPositions.handleScroll(e);
          if (t) {
            const i = Mn(e);
            this._boundaryRect &&
              i !== this._boundaryElement &&
              i.contains(this._boundaryElement) &&
              Yo(this._boundaryRect, t.top, t.left),
              (this._pickupPositionOnPage.x += t.left),
              (this._pickupPositionOnPage.y += t.top),
              this._dropContainer ||
                ((this._activeTransform.x -= t.left),
                (this._activeTransform.y -= t.top),
                this._applyRootElementTransform(
                  this._activeTransform.x,
                  this._activeTransform.y
                ));
          }
        }
        _getViewportScrollPosition() {
          const e = this._parentPositions.positions.get(this._document);
          return e
            ? e.scrollPosition
            : this._viewportRuler.getViewportScrollPosition();
        }
        _getShadowRoot() {
          return (
            void 0 === this._cachedShadowRoot &&
              (this._cachedShadowRoot = kf(this._rootElement)),
            this._cachedShadowRoot
          );
        }
        _getPreviewInsertionPoint(e, t) {
          const i = this._previewContainer || "global";
          if ("parent" === i) return e;
          if ("global" === i) {
            const r = this._document;
            return (
              t ||
              r.fullscreenElement ||
              r.webkitFullscreenElement ||
              r.mozFullScreenElement ||
              r.msFullscreenElement ||
              r.body
            );
          }
          return He(i);
        }
      }
      function ic(n, e) {
        return `translate3d(${Math.round(n)}px, ${Math.round(e)}px, 0)`;
      }
      function _E(n, e, t) {
        return Math.max(e, Math.min(t, n));
      }
      function Qo(n) {
        return "t" === n.type[0];
      }
      function yE(n, e) {
        const t = n.rootNodes;
        if (1 === t.length && t[0].nodeType === e.ELEMENT_NODE) return t[0];
        const i = e.createElement("div");
        return t.forEach((r) => i.appendChild(r)), i;
      }
      function vE(n, e) {
        (n.style.width = `${e.width}px`),
          (n.style.height = `${e.height}px`),
          (n.style.transform = ic(e.left, e.top));
      }
      function Xo(n, e) {
        return Math.max(0, Math.min(e, n));
      }
      class IB {
        constructor(e, t, i, r, s) {
          (this._dragDropRegistry = t),
            (this._ngZone = r),
            (this._viewportRuler = s),
            (this.disabled = !1),
            (this.sortingDisabled = !1),
            (this.autoScrollDisabled = !1),
            (this.autoScrollStep = 2),
            (this.enterPredicate = () => !0),
            (this.sortPredicate = () => !0),
            (this.beforeStarted = new q()),
            (this.entered = new q()),
            (this.exited = new q()),
            (this.dropped = new q()),
            (this.sorted = new q()),
            (this._isDragging = !1),
            (this._itemPositions = []),
            (this._previousSwap = { drag: null, delta: 0, overlaps: !1 }),
            (this._draggables = []),
            (this._siblings = []),
            (this._orientation = "vertical"),
            (this._activeSiblings = new Set()),
            (this._direction = "ltr"),
            (this._viewportScrollSubscription = Oe.EMPTY),
            (this._verticalScrollDirection = 0),
            (this._horizontalScrollDirection = 0),
            (this._stopScrollTimers = new q()),
            (this._cachedShadowRoot = null),
            (this._startScrollInterval = () => {
              this._stopScrolling(),
                (function (n = 0, e = xf) {
                  return n < 0 && (n = 0), $D(n, n, e);
                })(0, jD)
                  .pipe(ni(this._stopScrollTimers))
                  .subscribe(() => {
                    const o = this._scrollNode,
                      a = this.autoScrollStep;
                    1 === this._verticalScrollDirection
                      ? o.scrollBy(0, -a)
                      : 2 === this._verticalScrollDirection && o.scrollBy(0, a),
                      1 === this._horizontalScrollDirection
                        ? o.scrollBy(-a, 0)
                        : 2 === this._horizontalScrollDirection &&
                          o.scrollBy(a, 0);
                  });
            }),
            (this.element = He(e)),
            (this._document = i),
            this.withScrollableParents([this.element]),
            t.registerDropContainer(this),
            (this._parentPositions = new uE(i, s));
        }
        dispose() {
          this._stopScrolling(),
            this._stopScrollTimers.complete(),
            this._viewportScrollSubscription.unsubscribe(),
            this.beforeStarted.complete(),
            this.entered.complete(),
            this.exited.complete(),
            this.dropped.complete(),
            this.sorted.complete(),
            this._activeSiblings.clear(),
            (this._scrollNode = null),
            this._parentPositions.clear(),
            this._dragDropRegistry.removeDropContainer(this);
        }
        isDragging() {
          return this._isDragging;
        }
        start() {
          this._draggingStarted(), this._notifyReceivingSiblings();
        }
        enter(e, t, i, r) {
          let s;
          this._draggingStarted(),
            null == r
              ? ((s = this.sortingDisabled ? this._draggables.indexOf(e) : -1),
                -1 === s &&
                  (s = this._getItemIndexFromPointerPosition(e, t, i)))
              : (s = r);
          const o = this._activeDraggables,
            a = o.indexOf(e),
            l = e.getPlaceholderElement();
          let c = o[s];
          if (
            (c === e && (c = o[s + 1]),
            a > -1 && o.splice(a, 1),
            c && !this._dragDropRegistry.isDragging(c))
          ) {
            const u = c.getRootElement();
            u.parentElement.insertBefore(l, u), o.splice(s, 0, e);
          } else if (this._shouldEnterAsFirstChild(t, i)) {
            const u = o[0].getRootElement();
            u.parentNode.insertBefore(l, u), o.unshift(e);
          } else He(this.element).appendChild(l), o.push(e);
          (l.style.transform = ""),
            this._cacheItemPositions(),
            this._cacheParentPositions(),
            this._notifyReceivingSiblings(),
            this.entered.next({
              item: e,
              container: this,
              currentIndex: this.getItemIndex(e),
            });
        }
        exit(e) {
          this._reset(), this.exited.next({ item: e, container: this });
        }
        drop(e, t, i, r, s, o, a) {
          this._reset(),
            this.dropped.next({
              item: e,
              currentIndex: t,
              previousIndex: i,
              container: this,
              previousContainer: r,
              isPointerOverContainer: s,
              distance: o,
              dropPoint: a,
            });
        }
        withItems(e) {
          const t = this._draggables;
          return (
            (this._draggables = e),
            e.forEach((i) => i._withDropContainer(this)),
            this.isDragging() &&
              (t.filter((r) => r.isDragging()).every((r) => -1 === e.indexOf(r))
                ? this._reset()
                : this._cacheItems()),
            this
          );
        }
        withDirection(e) {
          return (this._direction = e), this;
        }
        connectedTo(e) {
          return (this._siblings = e.slice()), this;
        }
        withOrientation(e) {
          return (this._orientation = e), this;
        }
        withScrollableParents(e) {
          const t = He(this.element);
          return (
            (this._scrollableElements =
              -1 === e.indexOf(t) ? [t, ...e] : e.slice()),
            this
          );
        }
        getScrollableParents() {
          return this._scrollableElements;
        }
        getItemIndex(e) {
          return this._isDragging
            ? ("horizontal" === this._orientation && "rtl" === this._direction
                ? this._itemPositions.slice().reverse()
                : this._itemPositions
              ).findIndex((i) => i.drag === e)
            : this._draggables.indexOf(e);
        }
        isReceiving() {
          return this._activeSiblings.size > 0;
        }
        _sortItem(e, t, i, r) {
          if (
            this.sortingDisabled ||
            !this._clientRect ||
            !cE(this._clientRect, 0.05, t, i)
          )
            return;
          const s = this._itemPositions,
            o = this._getItemIndexFromPointerPosition(e, t, i, r);
          if (-1 === o && s.length > 0) return;
          const a = "horizontal" === this._orientation,
            l = s.findIndex((m) => m.drag === e),
            c = s[o],
            d = c.clientRect,
            h = l > o ? 1 : -1,
            f = this._getItemOffsetPx(s[l].clientRect, d, h),
            p = this._getSiblingOffsetPx(l, s, h),
            g = s.slice();
          (function (n, e, t) {
            const i = Xo(e, n.length - 1),
              r = Xo(t, n.length - 1);
            if (i === r) return;
            const s = n[i],
              o = r < i ? -1 : 1;
            for (let a = i; a !== r; a += o) n[a] = n[a + o];
            n[r] = s;
          })(s, l, o),
            this.sorted.next({
              previousIndex: l,
              currentIndex: o,
              container: this,
              item: e,
            }),
            s.forEach((m, y) => {
              if (g[y] === m) return;
              const _ = m.drag === e,
                D = _ ? f : p,
                E = _ ? e.getPlaceholderElement() : m.drag.getRootElement();
              (m.offset += D),
                a
                  ? ((E.style.transform = nc(
                      `translate3d(${Math.round(m.offset)}px, 0, 0)`,
                      m.initialTransform
                    )),
                    Yo(m.clientRect, 0, D))
                  : ((E.style.transform = nc(
                      `translate3d(0, ${Math.round(m.offset)}px, 0)`,
                      m.initialTransform
                    )),
                    Yo(m.clientRect, D, 0));
            }),
            (this._previousSwap.overlaps = Hf(d, t, i)),
            (this._previousSwap.drag = c.drag),
            (this._previousSwap.delta = a ? r.x : r.y);
        }
        _startScrollingIfNecessary(e, t) {
          if (this.autoScrollDisabled) return;
          let i,
            r = 0,
            s = 0;
          if (
            (this._parentPositions.positions.forEach((o, a) => {
              a === this._document ||
                !o.clientRect ||
                i ||
                (cE(o.clientRect, 0.05, e, t) &&
                  (([r, s] = (function (n, e, t, i) {
                    const r = DE(e, i),
                      s = EE(e, t);
                    let o = 0,
                      a = 0;
                    if (r) {
                      const l = n.scrollTop;
                      1 === r
                        ? l > 0 && (o = 1)
                        : n.scrollHeight - l > n.clientHeight && (o = 2);
                    }
                    if (s) {
                      const l = n.scrollLeft;
                      1 === s
                        ? l > 0 && (a = 1)
                        : n.scrollWidth - l > n.clientWidth && (a = 2);
                    }
                    return [o, a];
                  })(a, o.clientRect, e, t)),
                  (r || s) && (i = a)));
            }),
            !r && !s)
          ) {
            const { width: o, height: a } =
                this._viewportRuler.getViewportSize(),
              l = { width: o, height: a, top: 0, right: o, bottom: a, left: 0 };
            (r = DE(l, t)), (s = EE(l, e)), (i = window);
          }
          i &&
            (r !== this._verticalScrollDirection ||
              s !== this._horizontalScrollDirection ||
              i !== this._scrollNode) &&
            ((this._verticalScrollDirection = r),
            (this._horizontalScrollDirection = s),
            (this._scrollNode = i),
            (r || s) && i
              ? this._ngZone.runOutsideAngular(this._startScrollInterval)
              : this._stopScrolling());
        }
        _stopScrolling() {
          this._stopScrollTimers.next();
        }
        _draggingStarted() {
          const e = He(this.element).style;
          this.beforeStarted.next(),
            (this._isDragging = !0),
            (this._initialScrollSnap =
              e.msScrollSnapType || e.scrollSnapType || ""),
            (e.scrollSnapType = e.msScrollSnapType = "none"),
            this._cacheItems(),
            this._viewportScrollSubscription.unsubscribe(),
            this._listenToScrollEvents();
        }
        _cacheParentPositions() {
          const e = He(this.element);
          this._parentPositions.cache(this._scrollableElements),
            (this._clientRect =
              this._parentPositions.positions.get(e).clientRect);
        }
        _cacheItemPositions() {
          const e = "horizontal" === this._orientation;
          this._itemPositions = this._activeDraggables
            .map((t) => {
              const i = t.getVisibleElement();
              return {
                drag: t,
                offset: 0,
                initialTransform: i.style.transform || "",
                clientRect: Bf(i),
              };
            })
            .sort((t, i) =>
              e
                ? t.clientRect.left - i.clientRect.left
                : t.clientRect.top - i.clientRect.top
            );
        }
        _reset() {
          this._isDragging = !1;
          const e = He(this.element).style;
          (e.scrollSnapType = e.msScrollSnapType = this._initialScrollSnap),
            this._activeDraggables.forEach((t) => {
              var r;
              const i = t.getRootElement();
              if (i) {
                const s =
                  null == (r = this._itemPositions.find((o) => o.drag === t))
                    ? void 0
                    : r.initialTransform;
                i.style.transform = s || "";
              }
            }),
            this._siblings.forEach((t) => t._stopReceiving(this)),
            (this._activeDraggables = []),
            (this._itemPositions = []),
            (this._previousSwap.drag = null),
            (this._previousSwap.delta = 0),
            (this._previousSwap.overlaps = !1),
            this._stopScrolling(),
            this._viewportScrollSubscription.unsubscribe(),
            this._parentPositions.clear();
        }
        _getSiblingOffsetPx(e, t, i) {
          const r = "horizontal" === this._orientation,
            s = t[e].clientRect,
            o = t[e + -1 * i];
          let a = s[r ? "width" : "height"] * i;
          if (o) {
            const l = r ? "left" : "top",
              c = r ? "right" : "bottom";
            -1 === i
              ? (a -= o.clientRect[l] - s[c])
              : (a += s[l] - o.clientRect[c]);
          }
          return a;
        }
        _getItemOffsetPx(e, t, i) {
          const r = "horizontal" === this._orientation;
          let s = r ? t.left - e.left : t.top - e.top;
          return (
            -1 === i && (s += r ? t.width - e.width : t.height - e.height), s
          );
        }
        _shouldEnterAsFirstChild(e, t) {
          if (!this._activeDraggables.length) return !1;
          const i = this._itemPositions,
            r = "horizontal" === this._orientation;
          if (i[0].drag !== this._activeDraggables[0]) {
            const o = i[i.length - 1].clientRect;
            return r ? e >= o.right : t >= o.bottom;
          }
          {
            const o = i[0].clientRect;
            return r ? e <= o.left : t <= o.top;
          }
        }
        _getItemIndexFromPointerPosition(e, t, i, r) {
          const s = "horizontal" === this._orientation,
            o = this._itemPositions.findIndex(({ drag: a, clientRect: l }) => {
              if (a === e) return !1;
              if (r) {
                const c = s ? r.x : r.y;
                if (
                  a === this._previousSwap.drag &&
                  this._previousSwap.overlaps &&
                  c === this._previousSwap.delta
                )
                  return !1;
              }
              return s
                ? t >= Math.floor(l.left) && t < Math.floor(l.right)
                : i >= Math.floor(l.top) && i < Math.floor(l.bottom);
            });
          return -1 !== o && this.sortPredicate(o, e, this) ? o : -1;
        }
        _cacheItems() {
          (this._activeDraggables = this._draggables.slice()),
            this._cacheItemPositions(),
            this._cacheParentPositions();
        }
        _isOverContainer(e, t) {
          return null != this._clientRect && Hf(this._clientRect, e, t);
        }
        _getSiblingContainerFromPosition(e, t, i) {
          return this._siblings.find((r) => r._canReceive(e, t, i));
        }
        _canReceive(e, t, i) {
          if (
            !this._clientRect ||
            !Hf(this._clientRect, t, i) ||
            !this.enterPredicate(e, this)
          )
            return !1;
          const r = this._getShadowRoot().elementFromPoint(t, i);
          if (!r) return !1;
          const s = He(this.element);
          return r === s || s.contains(r);
        }
        _startReceiving(e, t) {
          const i = this._activeSiblings;
          !i.has(e) &&
            t.every(
              (r) =>
                this.enterPredicate(r, this) || this._draggables.indexOf(r) > -1
            ) &&
            (i.add(e),
            this._cacheParentPositions(),
            this._listenToScrollEvents());
        }
        _stopReceiving(e) {
          this._activeSiblings.delete(e),
            this._viewportScrollSubscription.unsubscribe();
        }
        _listenToScrollEvents() {
          this._viewportScrollSubscription = this._dragDropRegistry
            .scrolled(this._getShadowRoot())
            .subscribe((e) => {
              if (this.isDragging()) {
                const t = this._parentPositions.handleScroll(e);
                t &&
                  (this._itemPositions.forEach(({ clientRect: i }) => {
                    Yo(i, t.top, t.left);
                  }),
                  this._itemPositions.forEach(({ drag: i }) => {
                    this._dragDropRegistry.isDragging(i) &&
                      i._sortFromLastPointerPosition();
                  }));
              } else this.isReceiving() && this._cacheParentPositions();
            });
        }
        _getShadowRoot() {
          if (!this._cachedShadowRoot) {
            const e = kf(He(this.element));
            this._cachedShadowRoot = e || this._document;
          }
          return this._cachedShadowRoot;
        }
        _notifyReceivingSiblings() {
          const e = this._activeDraggables.filter((t) => t.isDragging());
          this._siblings.forEach((t) => t._startReceiving(this, e));
        }
      }
      function DE(n, e) {
        const { top: t, bottom: i, height: r } = n,
          s = 0.05 * r;
        return e >= t - s && e <= t + s ? 1 : e >= i - s && e <= i + s ? 2 : 0;
      }
      function EE(n, e) {
        const { left: t, right: i, width: r } = n,
          s = 0.05 * r;
        return e >= t - s && e <= t + s ? 1 : e >= i - s && e <= i + s ? 2 : 0;
      }
      const rc = rr({ passive: !1, capture: !0 });
      let TB = (() => {
        class n {
          constructor(t, i) {
            (this._ngZone = t),
              (this._dropInstances = new Set()),
              (this._dragInstances = new Set()),
              (this._activeDragInstances = []),
              (this._globalListeners = new Map()),
              (this._draggingPredicate = (r) => r.isDragging()),
              (this.pointerMove = new q()),
              (this.pointerUp = new q()),
              (this.scroll = new q()),
              (this._preventDefaultWhileDragging = (r) => {
                this._activeDragInstances.length > 0 && r.preventDefault();
              }),
              (this._persistentTouchmoveListener = (r) => {
                this._activeDragInstances.length > 0 &&
                  (this._activeDragInstances.some(this._draggingPredicate) &&
                    r.preventDefault(),
                  this.pointerMove.next(r));
              }),
              (this._document = i);
          }
          registerDropContainer(t) {
            this._dropInstances.has(t) || this._dropInstances.add(t);
          }
          registerDragItem(t) {
            this._dragInstances.add(t),
              1 === this._dragInstances.size &&
                this._ngZone.runOutsideAngular(() => {
                  this._document.addEventListener(
                    "touchmove",
                    this._persistentTouchmoveListener,
                    rc
                  );
                });
          }
          removeDropContainer(t) {
            this._dropInstances.delete(t);
          }
          removeDragItem(t) {
            this._dragInstances.delete(t),
              this.stopDragging(t),
              0 === this._dragInstances.size &&
                this._document.removeEventListener(
                  "touchmove",
                  this._persistentTouchmoveListener,
                  rc
                );
          }
          startDragging(t, i) {
            if (
              !(this._activeDragInstances.indexOf(t) > -1) &&
              (this._activeDragInstances.push(t),
              1 === this._activeDragInstances.length)
            ) {
              const r = i.type.startsWith("touch");
              this._globalListeners
                .set(r ? "touchend" : "mouseup", {
                  handler: (s) => this.pointerUp.next(s),
                  options: !0,
                })
                .set("scroll", {
                  handler: (s) => this.scroll.next(s),
                  options: !0,
                })
                .set("selectstart", {
                  handler: this._preventDefaultWhileDragging,
                  options: rc,
                }),
                r ||
                  this._globalListeners.set("mousemove", {
                    handler: (s) => this.pointerMove.next(s),
                    options: rc,
                  }),
                this._ngZone.runOutsideAngular(() => {
                  this._globalListeners.forEach((s, o) => {
                    this._document.addEventListener(o, s.handler, s.options);
                  });
                });
            }
          }
          stopDragging(t) {
            const i = this._activeDragInstances.indexOf(t);
            i > -1 &&
              (this._activeDragInstances.splice(i, 1),
              0 === this._activeDragInstances.length &&
                this._clearGlobalListeners());
          }
          isDragging(t) {
            return this._activeDragInstances.indexOf(t) > -1;
          }
          scrolled(t) {
            const i = [this.scroll];
            return (
              t &&
                t !== this._document &&
                i.push(
                  new Se((r) =>
                    this._ngZone.runOutsideAngular(() => {
                      const o = (a) => {
                        this._activeDragInstances.length && r.next(a);
                      };
                      return (
                        t.addEventListener("scroll", o, !0),
                        () => {
                          t.removeEventListener("scroll", o, !0);
                        }
                      );
                    })
                  )
                ),
              pa(...i)
            );
          }
          ngOnDestroy() {
            this._dragInstances.forEach((t) => this.removeDragItem(t)),
              this._dropInstances.forEach((t) => this.removeDropContainer(t)),
              this._clearGlobalListeners(),
              this.pointerMove.complete(),
              this.pointerUp.complete();
          }
          _clearGlobalListeners() {
            this._globalListeners.forEach((t, i) => {
              this._document.removeEventListener(i, t.handler, t.options);
            }),
              this._globalListeners.clear();
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(b(oe), b(Q));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const AB = { dragStartThreshold: 5, pointerDirectionChangeThreshold: 5 };
      let wE = (() => {
        class n {
          constructor(t, i, r, s) {
            (this._document = t),
              (this._ngZone = i),
              (this._viewportRuler = r),
              (this._dragDropRegistry = s);
          }
          createDrag(t, i = AB) {
            return new xB(
              t,
              i,
              this._document,
              this._ngZone,
              this._viewportRuler,
              this._dragDropRegistry
            );
          }
          createDropList(t) {
            return new IB(
              t,
              this._dragDropRegistry,
              this._document,
              this._ngZone,
              this._viewportRuler
            );
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(b(Q), b(oe), b(Af), b(TB));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const Uf = new x("CDK_DRAG_PARENT"),
        RB = new x("CDK_DRAG_CONFIG"),
        OB = new x("CdkDropList"),
        zf = new x("CdkDragHandle");
      let PB = (() => {
        class n {
          constructor(t, i) {
            (this.element = t),
              (this._stateChanges = new q()),
              (this._disabled = !1),
              (this._parentDrag = i);
          }
          get disabled() {
            return this._disabled;
          }
          set disabled(t) {
            (this._disabled = At(t)), this._stateChanges.next(this);
          }
          ngOnDestroy() {
            this._stateChanges.complete();
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(v(ge), v(Uf, 12));
          }),
          (n.ɵdir = O({
            type: n,
            selectors: [["", "cdkDragHandle", ""]],
            hostAttrs: [1, "cdk-drag-handle"],
            inputs: { disabled: ["cdkDragHandleDisabled", "disabled"] },
            features: [fe([{ provide: zf, useExisting: n }])],
          })),
          n
        );
      })();
      const FB = new x("CdkDragPlaceholder"),
        NB = new x("CdkDragPreview");
      let VB = (() => {
          class n {
            constructor(t, i, r, s, o, a, l, c, u, d, h) {
              (this.element = t),
                (this.dropContainer = i),
                (this._ngZone = s),
                (this._viewContainerRef = o),
                (this._dir = l),
                (this._changeDetectorRef = u),
                (this._selfHandle = d),
                (this._parentDrag = h),
                (this._destroyed = new q()),
                (this.started = new ce()),
                (this.released = new ce()),
                (this.ended = new ce()),
                (this.entered = new ce()),
                (this.exited = new ce()),
                (this.dropped = new ce()),
                (this.moved = new Se((f) => {
                  const p = this._dragRef.moved
                    .pipe(
                      Et((g) => ({
                        source: this,
                        pointerPosition: g.pointerPosition,
                        event: g.event,
                        delta: g.delta,
                        distance: g.distance,
                      }))
                    )
                    .subscribe(f);
                  return () => {
                    p.unsubscribe();
                  };
                })),
                (this._dragRef = c.createDrag(t, {
                  dragStartThreshold:
                    a && null != a.dragStartThreshold
                      ? a.dragStartThreshold
                      : 5,
                  pointerDirectionChangeThreshold:
                    a && null != a.pointerDirectionChangeThreshold
                      ? a.pointerDirectionChangeThreshold
                      : 5,
                  zIndex: null == a ? void 0 : a.zIndex,
                })),
                (this._dragRef.data = this),
                n._dragInstances.push(this),
                a && this._assignDefaults(a),
                i &&
                  (this._dragRef._withDropContainer(i._dropListRef),
                  i.addItem(this)),
                this._syncInputs(this._dragRef),
                this._handleEvents(this._dragRef);
            }
            get disabled() {
              return (
                this._disabled ||
                (this.dropContainer && this.dropContainer.disabled)
              );
            }
            set disabled(t) {
              (this._disabled = At(t)),
                (this._dragRef.disabled = this._disabled);
            }
            getPlaceholderElement() {
              return this._dragRef.getPlaceholderElement();
            }
            getRootElement() {
              return this._dragRef.getRootElement();
            }
            reset() {
              this._dragRef.reset();
            }
            getFreeDragPosition() {
              return this._dragRef.getFreeDragPosition();
            }
            ngAfterViewInit() {
              this._ngZone.runOutsideAngular(() => {
                this._ngZone.onStable
                  .pipe(Os(1), ni(this._destroyed))
                  .subscribe(() => {
                    this._updateRootElement(),
                      this._setupHandlesListener(),
                      this.freeDragPosition &&
                        this._dragRef.setFreeDragPosition(
                          this.freeDragPosition
                        );
                  });
              });
            }
            ngOnChanges(t) {
              const i = t.rootElementSelector,
                r = t.freeDragPosition;
              i && !i.firstChange && this._updateRootElement(),
                r &&
                  !r.firstChange &&
                  this.freeDragPosition &&
                  this._dragRef.setFreeDragPosition(this.freeDragPosition);
            }
            ngOnDestroy() {
              this.dropContainer && this.dropContainer.removeItem(this);
              const t = n._dragInstances.indexOf(this);
              t > -1 && n._dragInstances.splice(t, 1),
                this._ngZone.runOutsideAngular(() => {
                  this._destroyed.next(),
                    this._destroyed.complete(),
                    this._dragRef.dispose();
                });
            }
            _updateRootElement() {
              var r;
              const t = this.element.nativeElement;
              let i = t;
              this.rootElementSelector &&
                (i =
                  void 0 !== t.closest
                    ? t.closest(this.rootElementSelector)
                    : null == (r = t.parentElement)
                    ? void 0
                    : r.closest(this.rootElementSelector)),
                this._dragRef.withRootElement(i || t);
            }
            _getBoundaryElement() {
              const t = this.boundaryElement;
              return t
                ? "string" == typeof t
                  ? this.element.nativeElement.closest(t)
                  : He(t)
                : null;
            }
            _syncInputs(t) {
              t.beforeStarted.subscribe(() => {
                if (!t.isDragging()) {
                  const i = this._dir,
                    r = this.dragStartDelay,
                    s = this._placeholderTemplate
                      ? {
                          template: this._placeholderTemplate.templateRef,
                          context: this._placeholderTemplate.data,
                          viewContainer: this._viewContainerRef,
                        }
                      : null,
                    o = this._previewTemplate
                      ? {
                          template: this._previewTemplate.templateRef,
                          context: this._previewTemplate.data,
                          matchSize: this._previewTemplate.matchSize,
                          viewContainer: this._viewContainerRef,
                        }
                      : null;
                  (t.disabled = this.disabled),
                    (t.lockAxis = this.lockAxis),
                    (t.dragStartDelay = "object" == typeof r && r ? r : Cf(r)),
                    (t.constrainPosition = this.constrainPosition),
                    (t.previewClass = this.previewClass),
                    t
                      .withBoundaryElement(this._getBoundaryElement())
                      .withPlaceholderTemplate(s)
                      .withPreviewTemplate(o)
                      .withPreviewContainer(this.previewContainer || "global"),
                    i && t.withDirection(i.value);
                }
              }),
                t.beforeStarted.pipe(Os(1)).subscribe(() => {
                  var r;
                  if (this._parentDrag)
                    return void t.withParent(this._parentDrag._dragRef);
                  let i = this.element.nativeElement.parentElement;
                  for (; i; ) {
                    if (i.classList.contains("cdk-drag")) {
                      t.withParent(
                        (null ==
                        (r = n._dragInstances.find(
                          (s) => s.element.nativeElement === i
                        ))
                          ? void 0
                          : r._dragRef) || null
                      );
                      break;
                    }
                    i = i.parentElement;
                  }
                });
            }
            _handleEvents(t) {
              t.started.subscribe(() => {
                this.started.emit({ source: this }),
                  this._changeDetectorRef.markForCheck();
              }),
                t.released.subscribe(() => {
                  this.released.emit({ source: this });
                }),
                t.ended.subscribe((i) => {
                  this.ended.emit({
                    source: this,
                    distance: i.distance,
                    dropPoint: i.dropPoint,
                  }),
                    this._changeDetectorRef.markForCheck();
                }),
                t.entered.subscribe((i) => {
                  this.entered.emit({
                    container: i.container.data,
                    item: this,
                    currentIndex: i.currentIndex,
                  });
                }),
                t.exited.subscribe((i) => {
                  this.exited.emit({ container: i.container.data, item: this });
                }),
                t.dropped.subscribe((i) => {
                  this.dropped.emit({
                    previousIndex: i.previousIndex,
                    currentIndex: i.currentIndex,
                    previousContainer: i.previousContainer.data,
                    container: i.container.data,
                    isPointerOverContainer: i.isPointerOverContainer,
                    item: this,
                    distance: i.distance,
                    dropPoint: i.dropPoint,
                  });
                });
            }
            _assignDefaults(t) {
              const {
                lockAxis: i,
                dragStartDelay: r,
                constrainPosition: s,
                previewClass: o,
                boundaryElement: a,
                draggingDisabled: l,
                rootElementSelector: c,
                previewContainer: u,
              } = t;
              (this.disabled = null != l && l),
                (this.dragStartDelay = r || 0),
                i && (this.lockAxis = i),
                s && (this.constrainPosition = s),
                o && (this.previewClass = o),
                a && (this.boundaryElement = a),
                c && (this.rootElementSelector = c),
                u && (this.previewContainer = u);
            }
            _setupHandlesListener() {
              this._handles.changes
                .pipe(
                  tc(this._handles),
                  Ko((t) => {
                    const i = t
                      .filter((r) => r._parentDrag === this)
                      .map((r) => r.element);
                    this._selfHandle &&
                      this.rootElementSelector &&
                      i.push(this.element),
                      this._dragRef.withHandles(i);
                  }),
                  Je((t, i) => {
                    let r = null,
                      o = !1;
                    const a = () => o && !r && i.complete();
                    t.subscribe(
                      new et(
                        i,
                        (l) => {
                          null == r || r.unsubscribe(),
                            qt(
                              ((t) =>
                                pa(
                                  ...t.map((i) => i._stateChanges.pipe(tc(i)))
                                ))(l)
                            ).subscribe(
                              (r = new et(
                                i,
                                (d) => i.next(d),
                                () => {
                                  (r = null), a();
                                }
                              ))
                            );
                        },
                        () => {
                          (o = !0), a();
                        }
                      )
                    );
                  }),
                  ni(this._destroyed)
                )
                .subscribe((t) => {
                  const i = this._dragRef,
                    r = t.element.nativeElement;
                  t.disabled ? i.disableHandle(r) : i.enableHandle(r);
                });
            }
          }
          return (
            (n._dragInstances = []),
            (n.ɵfac = function (t) {
              return new (t || n)(
                v(ge),
                v(OB, 12),
                v(Q),
                v(oe),
                v(_n),
                v(RB, 8),
                v(KD, 8),
                v(wE),
                v(wo),
                v(zf, 10),
                v(Uf, 12)
              );
            }),
            (n.ɵdir = O({
              type: n,
              selectors: [["", "cdkDrag", ""]],
              contentQueries: function (t, i, r) {
                if (
                  (1 & t && (yi(r, NB, 5), yi(r, FB, 5), yi(r, zf, 5)), 2 & t)
                ) {
                  let s;
                  Ut((s = zt())) && (i._previewTemplate = s.first),
                    Ut((s = zt())) && (i._placeholderTemplate = s.first),
                    Ut((s = zt())) && (i._handles = s);
                }
              },
              hostAttrs: [1, "cdk-drag"],
              hostVars: 4,
              hostBindings: function (t, i) {
                2 & t &&
                  kt("cdk-drag-disabled", i.disabled)(
                    "cdk-drag-dragging",
                    i._dragRef.isDragging()
                  );
              },
              inputs: {
                data: ["cdkDragData", "data"],
                lockAxis: ["cdkDragLockAxis", "lockAxis"],
                rootElementSelector: [
                  "cdkDragRootElement",
                  "rootElementSelector",
                ],
                boundaryElement: ["cdkDragBoundary", "boundaryElement"],
                dragStartDelay: ["cdkDragStartDelay", "dragStartDelay"],
                freeDragPosition: [
                  "cdkDragFreeDragPosition",
                  "freeDragPosition",
                ],
                disabled: ["cdkDragDisabled", "disabled"],
                constrainPosition: [
                  "cdkDragConstrainPosition",
                  "constrainPosition",
                ],
                previewClass: ["cdkDragPreviewClass", "previewClass"],
                previewContainer: [
                  "cdkDragPreviewContainer",
                  "previewContainer",
                ],
              },
              outputs: {
                started: "cdkDragStarted",
                released: "cdkDragReleased",
                ended: "cdkDragEnded",
                entered: "cdkDragEntered",
                exited: "cdkDragExited",
                dropped: "cdkDragDropped",
                moved: "cdkDragMoved",
              },
              exportAs: ["cdkDrag"],
              features: [fe([{ provide: Uf, useExisting: n }]), ft],
            })),
            n
          );
        })(),
        BB = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = be({ type: n })),
            (n.ɵinj = pe({ providers: [wE], imports: [Jl] })),
            n
          );
        })();
      class ME {}
      const ii = "*";
      function SE(n, e = null) {
        return { type: 2, steps: n, options: e };
      }
      function or(n) {
        return { type: 6, styles: n, offset: null };
      }
      function kE(n) {
        Promise.resolve(null).then(n);
      }
      class Es {
        constructor(e = 0, t = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = e + t);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          kE(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        reset() {
          this._started = !1;
        }
        setPosition(e) {
          this._position = this.totalTime ? e * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((i) => i()), (t.length = 0);
        }
      }
      class TE {
        constructor(e) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = e);
          let t = 0,
            i = 0,
            r = 0;
          const s = this.players.length;
          0 == s
            ? kE(() => this._onFinish())
            : this.players.forEach((o) => {
                o.onDone(() => {
                  ++t == s && this._onFinish();
                }),
                  o.onDestroy(() => {
                    ++i == s && this._onDestroy();
                  }),
                  o.onStart(() => {
                    ++r == s && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (o, a) => Math.max(o, a.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((e) => e.init());
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((e) => e()),
            (this._onStartFns = []));
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((e) => e.play());
        }
        pause() {
          this.players.forEach((e) => e.pause());
        }
        restart() {
          this.players.forEach((e) => e.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((e) => e.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((e) => e.destroy()),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((e) => e.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(e) {
          const t = e * this.totalTime;
          this.players.forEach((i) => {
            const r = i.totalTime ? Math.min(1, t / i.totalTime) : 1;
            i.setPosition(r);
          });
        }
        getPosition() {
          const e = this.players.reduce(
            (t, i) => (null === t || i.totalTime > t.totalTime ? i : t),
            null
          );
          return null != e ? e.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach((e) => {
            e.beforeDestroy && e.beforeDestroy();
          });
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((i) => i()), (t.length = 0);
        }
      }
      function AE() {
        return "undefined" != typeof window && void 0 !== window.document;
      }
      function qf() {
        return (
          "undefined" != typeof process &&
          "[object process]" === {}.toString.call(process)
        );
      }
      function Ei(n) {
        switch (n.length) {
          case 0:
            return new Es();
          case 1:
            return n[0];
          default:
            return new TE(n);
        }
      }
      function RE(n, e, t, i, r = {}, s = {}) {
        const o = [],
          a = [];
        let l = -1,
          c = null;
        if (
          (i.forEach((u) => {
            const d = u.offset,
              h = d == l,
              f = (h && c) || {};
            Object.keys(u).forEach((p) => {
              let g = p,
                m = u[p];
              if ("offset" !== p)
                switch (((g = e.normalizePropertyName(g, o)), m)) {
                  case "!":
                    m = r[p];
                    break;
                  case ii:
                    m = s[p];
                    break;
                  default:
                    m = e.normalizeStyleValue(p, g, m, o);
                }
              f[g] = m;
            }),
              h || a.push(f),
              (c = f),
              (l = d);
          }),
          o.length)
        ) {
          const u = "\n - ";
          throw new Error(
            `Unable to animate due to the following errors:${u}${o.join(u)}`
          );
        }
        return a;
      }
      function Kf(n, e, t, i) {
        switch (e) {
          case "start":
            n.onStart(() => i(t && Yf(t, "start", n)));
            break;
          case "done":
            n.onDone(() => i(t && Yf(t, "done", n)));
            break;
          case "destroy":
            n.onDestroy(() => i(t && Yf(t, "destroy", n)));
        }
      }
      function Yf(n, e, t) {
        const i = t.totalTime,
          s = Qf(
            n.element,
            n.triggerName,
            n.fromState,
            n.toState,
            e || n.phaseName,
            null == i ? n.totalTime : i,
            !!t.disabled
          ),
          o = n._data;
        return null != o && (s._data = o), s;
      }
      function Qf(n, e, t, i, r = "", s = 0, o) {
        return {
          element: n,
          triggerName: e,
          fromState: t,
          toState: i,
          phaseName: r,
          totalTime: s,
          disabled: !!o,
        };
      }
      function $t(n, e, t) {
        let i;
        return (
          n instanceof Map
            ? ((i = n.get(e)), i || n.set(e, (i = t)))
            : ((i = n[e]), i || (i = n[e] = t)),
          i
        );
      }
      function OE(n) {
        const e = n.indexOf(":");
        return [n.substring(1, e), n.substr(e + 1)];
      }
      let Xf = (n, e) => !1,
        Zf = (n, e) => !1,
        PE = (n, e, t) => [];
      const FE = qf();
      (FE || "undefined" != typeof Element) &&
        ((Xf = AE()
          ? (n, e) => {
              for (; e && e !== document.documentElement; ) {
                if (e === n) return !0;
                e = e.parentNode || e.host;
              }
              return !1;
            }
          : (n, e) => n.contains(e)),
        (Zf = (() => {
          if (FE || Element.prototype.matches) return (n, e) => n.matches(e);
          {
            const n = Element.prototype,
              e =
                n.matchesSelector ||
                n.mozMatchesSelector ||
                n.msMatchesSelector ||
                n.oMatchesSelector ||
                n.webkitMatchesSelector;
            return e ? (t, i) => e.apply(t, [i]) : Zf;
          }
        })()),
        (PE = (n, e, t) => {
          let i = [];
          if (t) {
            const r = n.querySelectorAll(e);
            for (let s = 0; s < r.length; s++) i.push(r[s]);
          } else {
            const r = n.querySelector(e);
            r && i.push(r);
          }
          return i;
        }));
      let ar = null,
        NE = !1;
      function Jf(n) {
        ar ||
          ((ar = ("undefined" != typeof document ? document.body : null) || {}),
          (NE = !!ar.style && "WebkitAppearance" in ar.style));
        let e = !0;
        return (
          ar.style &&
            !(function (n) {
              return "ebkit" == n.substring(1, 6);
            })(n) &&
            ((e = n in ar.style),
            !e &&
              NE &&
              (e =
                "Webkit" + n.charAt(0).toUpperCase() + n.substr(1) in
                ar.style)),
          e
        );
      }
      const ep = Zf,
        tp = Xf,
        np = PE;
      function LE(n) {
        const e = {};
        return (
          Object.keys(n).forEach((t) => {
            const i = t.replace(/([a-z])([A-Z])/g, "$1-$2");
            e[i] = n[t];
          }),
          e
        );
      }
      let VE = (() => {
          class n {
            validateStyleProperty(t) {
              return Jf(t);
            }
            matchesElement(t, i) {
              return ep(t, i);
            }
            containsElement(t, i) {
              return tp(t, i);
            }
            query(t, i, r) {
              return np(t, i, r);
            }
            computeStyle(t, i, r) {
              return r || "";
            }
            animate(t, i, r, s, o, a = [], l) {
              return new Es(r, s);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        ip = (() => {
          class n {}
          return (n.NOOP = new VE()), n;
        })();
      const rp = "ng-enter",
        sc = "ng-leave",
        oc = "ng-trigger",
        ac = ".ng-trigger",
        HE = "ng-animating",
        sp = ".ng-animating";
      function lr(n) {
        if ("number" == typeof n) return n;
        const e = n.match(/^(-?[\.\d]+)(m?s)/);
        return !e || e.length < 2 ? 0 : op(parseFloat(e[1]), e[2]);
      }
      function op(n, e) {
        return "s" === e ? 1e3 * n : n;
      }
      function lc(n, e, t) {
        return n.hasOwnProperty("duration")
          ? n
          : (function (n, e, t) {
              let r,
                s = 0,
                o = "";
              if ("string" == typeof n) {
                const a = n.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === a)
                  return (
                    e.push(`The provided timing value "${n}" is invalid.`),
                    { duration: 0, delay: 0, easing: "" }
                  );
                r = op(parseFloat(a[1]), a[2]);
                const l = a[3];
                null != l && (s = op(parseFloat(l), a[4]));
                const c = a[5];
                c && (o = c);
              } else r = n;
              if (!t) {
                let a = !1,
                  l = e.length;
                r < 0 &&
                  (e.push(
                    "Duration values below 0 are not allowed for this animation step."
                  ),
                  (a = !0)),
                  s < 0 &&
                    (e.push(
                      "Delay values below 0 are not allowed for this animation step."
                    ),
                    (a = !0)),
                  a &&
                    e.splice(
                      l,
                      0,
                      `The provided timing value "${n}" is invalid.`
                    );
              }
              return { duration: r, delay: s, easing: o };
            })(n, e, t);
      }
      function ws(n, e = {}) {
        return (
          Object.keys(n).forEach((t) => {
            e[t] = n[t];
          }),
          e
        );
      }
      function wi(n, e, t = {}) {
        if (e) for (let i in n) t[i] = n[i];
        else ws(n, t);
        return t;
      }
      function UE(n, e, t) {
        return t ? e + ":" + t + ";" : "";
      }
      function zE(n) {
        let e = "";
        for (let t = 0; t < n.style.length; t++) {
          const i = n.style.item(t);
          e += UE(0, i, n.style.getPropertyValue(i));
        }
        for (const t in n.style)
          n.style.hasOwnProperty(t) &&
            !t.startsWith("_") &&
            (e += UE(0, KB(t), n.style[t]));
        n.setAttribute("style", e);
      }
      function Hn(n, e, t) {
        n.style &&
          (Object.keys(e).forEach((i) => {
            const r = lp(i);
            t && !t.hasOwnProperty(i) && (t[i] = n.style[r]),
              (n.style[r] = e[i]);
          }),
          qf() && zE(n));
      }
      function cr(n, e) {
        n.style &&
          (Object.keys(e).forEach((t) => {
            const i = lp(t);
            n.style[i] = "";
          }),
          qf() && zE(n));
      }
      function Zo(n) {
        return Array.isArray(n) ? (1 == n.length ? n[0] : SE(n)) : n;
      }
      const ap = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function $E(n) {
        let e = [];
        if ("string" == typeof n) {
          let t;
          for (; (t = ap.exec(n)); ) e.push(t[1]);
          ap.lastIndex = 0;
        }
        return e;
      }
      function cc(n, e, t) {
        const i = n.toString(),
          r = i.replace(ap, (s, o) => {
            let a = e[o];
            return (
              e.hasOwnProperty(o) ||
                (t.push(`Please provide a value for the animation param ${o}`),
                (a = "")),
              a.toString()
            );
          });
        return r == i ? n : r;
      }
      function uc(n) {
        const e = [];
        let t = n.next();
        for (; !t.done; ) e.push(t.value), (t = n.next());
        return e;
      }
      const qB = /-+([a-z0-9])/g;
      function lp(n) {
        return n.replace(qB, (...e) => e[1].toUpperCase());
      }
      function KB(n) {
        return n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function GE(n, e) {
        return 0 === n || 0 === e;
      }
      function WE(n, e, t) {
        const i = Object.keys(t);
        if (i.length && e.length) {
          let s = e[0],
            o = [];
          if (
            (i.forEach((a) => {
              s.hasOwnProperty(a) || o.push(a), (s[a] = t[a]);
            }),
            o.length)
          )
            for (var r = 1; r < e.length; r++) {
              let a = e[r];
              o.forEach(function (l) {
                a[l] = cp(n, l);
              });
            }
        }
        return e;
      }
      function Gt(n, e, t) {
        switch (e.type) {
          case 7:
            return n.visitTrigger(e, t);
          case 0:
            return n.visitState(e, t);
          case 1:
            return n.visitTransition(e, t);
          case 2:
            return n.visitSequence(e, t);
          case 3:
            return n.visitGroup(e, t);
          case 4:
            return n.visitAnimate(e, t);
          case 5:
            return n.visitKeyframes(e, t);
          case 6:
            return n.visitStyle(e, t);
          case 8:
            return n.visitReference(e, t);
          case 9:
            return n.visitAnimateChild(e, t);
          case 10:
            return n.visitAnimateRef(e, t);
          case 11:
            return n.visitQuery(e, t);
          case 12:
            return n.visitStagger(e, t);
          default:
            throw new Error(
              `Unable to resolve animation metadata node #${e.type}`
            );
        }
      }
      function cp(n, e) {
        return window.getComputedStyle(n)[e];
      }
      function YB(n, e) {
        const t = [];
        return (
          "string" == typeof n
            ? n.split(/\s*,\s*/).forEach((i) =>
                (function (n, e, t) {
                  if (":" == n[0]) {
                    const l = (function (n, e) {
                      switch (n) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (t, i) => parseFloat(i) > parseFloat(t);
                        case ":decrement":
                          return (t, i) => parseFloat(i) < parseFloat(t);
                        default:
                          return (
                            e.push(
                              `The transition alias value "${n}" is not supported`
                            ),
                            "* => *"
                          );
                      }
                    })(n, t);
                    if ("function" == typeof l) return void e.push(l);
                    n = l;
                  }
                  const i = n.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == i || i.length < 4)
                    return (
                      t.push(
                        `The provided transition expression "${n}" is not supported`
                      ),
                      e
                    );
                  const r = i[1],
                    s = i[2],
                    o = i[3];
                  e.push(qE(r, o));
                  "<" == s[0] && !("*" == r && "*" == o) && e.push(qE(o, r));
                })(i, t, e)
              )
            : t.push(n),
          t
        );
      }
      const hc = new Set(["true", "1"]),
        fc = new Set(["false", "0"]);
      function qE(n, e) {
        const t = hc.has(n) || fc.has(n),
          i = hc.has(e) || fc.has(e);
        return (r, s) => {
          let o = "*" == n || n == r,
            a = "*" == e || e == s;
          return (
            !o && t && "boolean" == typeof r && (o = r ? hc.has(n) : fc.has(n)),
            !a && i && "boolean" == typeof s && (a = s ? hc.has(e) : fc.has(e)),
            o && a
          );
        };
      }
      const ZB = new RegExp("s*:selfs*,?", "g");
      function up(n, e, t) {
        return new JB(n).build(e, t);
      }
      class JB {
        constructor(e) {
          this._driver = e;
        }
        build(e, t) {
          const i = new n2(t);
          return this._resetContextStyleTimingState(i), Gt(this, Zo(e), i);
        }
        _resetContextStyleTimingState(e) {
          (e.currentQuerySelector = ""),
            (e.collectedStyles = {}),
            (e.collectedStyles[""] = {}),
            (e.currentTime = 0);
        }
        visitTrigger(e, t) {
          let i = (t.queryCount = 0),
            r = (t.depCount = 0);
          const s = [],
            o = [];
          return (
            "@" == e.name.charAt(0) &&
              t.errors.push(
                "animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"
              ),
            e.definitions.forEach((a) => {
              if ((this._resetContextStyleTimingState(t), 0 == a.type)) {
                const l = a,
                  c = l.name;
                c
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((u) => {
                    (l.name = u), s.push(this.visitState(l, t));
                  }),
                  (l.name = c);
              } else if (1 == a.type) {
                const l = this.visitTransition(a, t);
                (i += l.queryCount), (r += l.depCount), o.push(l);
              } else
                t.errors.push(
                  "only state() and transition() definitions can sit inside of a trigger()"
                );
            }),
            {
              type: 7,
              name: e.name,
              states: s,
              transitions: o,
              queryCount: i,
              depCount: r,
              options: null,
            }
          );
        }
        visitState(e, t) {
          const i = this.visitStyle(e.styles, t),
            r = (e.options && e.options.params) || null;
          if (i.containsDynamicStyles) {
            const s = new Set(),
              o = r || {};
            if (
              (i.styles.forEach((a) => {
                if (pc(a)) {
                  const l = a;
                  Object.keys(l).forEach((c) => {
                    $E(l[c]).forEach((u) => {
                      o.hasOwnProperty(u) || s.add(u);
                    });
                  });
                }
              }),
              s.size)
            ) {
              const a = uc(s.values());
              t.errors.push(
                `state("${
                  e.name
                }", ...) must define default values for all the following style substitutions: ${a.join(
                  ", "
                )}`
              );
            }
          }
          return {
            type: 0,
            name: e.name,
            style: i,
            options: r ? { params: r } : null,
          };
        }
        visitTransition(e, t) {
          (t.queryCount = 0), (t.depCount = 0);
          const i = Gt(this, Zo(e.animation), t);
          return {
            type: 1,
            matchers: YB(e.expr, t.errors),
            animation: i,
            queryCount: t.queryCount,
            depCount: t.depCount,
            options: ur(e.options),
          };
        }
        visitSequence(e, t) {
          return {
            type: 2,
            steps: e.steps.map((i) => Gt(this, i, t)),
            options: ur(e.options),
          };
        }
        visitGroup(e, t) {
          const i = t.currentTime;
          let r = 0;
          const s = e.steps.map((o) => {
            t.currentTime = i;
            const a = Gt(this, o, t);
            return (r = Math.max(r, t.currentTime)), a;
          });
          return (
            (t.currentTime = r), { type: 3, steps: s, options: ur(e.options) }
          );
        }
        visitAnimate(e, t) {
          const i = (function (n, e) {
            let t = null;
            if (n.hasOwnProperty("duration")) t = n;
            else if ("number" == typeof n) return dp(lc(n, e).duration, 0, "");
            const i = n;
            if (
              i
                .split(/\s+/)
                .some((s) => "{" == s.charAt(0) && "{" == s.charAt(1))
            ) {
              const s = dp(0, 0, "");
              return (s.dynamic = !0), (s.strValue = i), s;
            }
            return (t = t || lc(i, e)), dp(t.duration, t.delay, t.easing);
          })(e.timings, t.errors);
          t.currentAnimateTimings = i;
          let r,
            s = e.styles ? e.styles : or({});
          if (5 == s.type) r = this.visitKeyframes(s, t);
          else {
            let o = e.styles,
              a = !1;
            if (!o) {
              a = !0;
              const c = {};
              i.easing && (c.easing = i.easing), (o = or(c));
            }
            t.currentTime += i.duration + i.delay;
            const l = this.visitStyle(o, t);
            (l.isEmptyStep = a), (r = l);
          }
          return (
            (t.currentAnimateTimings = null),
            { type: 4, timings: i, style: r, options: null }
          );
        }
        visitStyle(e, t) {
          const i = this._makeStyleAst(e, t);
          return this._validateStyleAst(i, t), i;
        }
        _makeStyleAst(e, t) {
          const i = [];
          Array.isArray(e.styles)
            ? e.styles.forEach((o) => {
                "string" == typeof o
                  ? o == ii
                    ? i.push(o)
                    : t.errors.push(
                        `The provided style string value ${o} is not allowed.`
                      )
                  : i.push(o);
              })
            : i.push(e.styles);
          let r = !1,
            s = null;
          return (
            i.forEach((o) => {
              if (pc(o)) {
                const a = o,
                  l = a.easing;
                if ((l && ((s = l), delete a.easing), !r))
                  for (let c in a)
                    if (a[c].toString().indexOf("{{") >= 0) {
                      r = !0;
                      break;
                    }
              }
            }),
            {
              type: 6,
              styles: i,
              easing: s,
              offset: e.offset,
              containsDynamicStyles: r,
              options: null,
            }
          );
        }
        _validateStyleAst(e, t) {
          const i = t.currentAnimateTimings;
          let r = t.currentTime,
            s = t.currentTime;
          i && s > 0 && (s -= i.duration + i.delay),
            e.styles.forEach((o) => {
              "string" != typeof o &&
                Object.keys(o).forEach((a) => {
                  if (!this._driver.validateStyleProperty(a))
                    return void t.errors.push(
                      `The provided animation property "${a}" is not a supported CSS property for animations`
                    );
                  const l = t.collectedStyles[t.currentQuerySelector],
                    c = l[a];
                  let u = !0;
                  c &&
                    (s != r &&
                      s >= c.startTime &&
                      r <= c.endTime &&
                      (t.errors.push(
                        `The CSS property "${a}" that exists between the times of "${c.startTime}ms" and "${c.endTime}ms" is also being animated in a parallel animation between the times of "${s}ms" and "${r}ms"`
                      ),
                      (u = !1)),
                    (s = c.startTime)),
                    u && (l[a] = { startTime: s, endTime: r }),
                    t.options &&
                      (function (n, e, t) {
                        const i = e.params || {},
                          r = $E(n);
                        r.length &&
                          r.forEach((s) => {
                            i.hasOwnProperty(s) ||
                              t.push(
                                `Unable to resolve the local animation param ${s} in the given list of values`
                              );
                          });
                      })(o[a], t.options, t.errors);
                });
            });
        }
        visitKeyframes(e, t) {
          const i = { type: 5, styles: [], options: null };
          if (!t.currentAnimateTimings)
            return (
              t.errors.push(
                "keyframes() must be placed inside of a call to animate()"
              ),
              i
            );
          let s = 0;
          const o = [];
          let a = !1,
            l = !1,
            c = 0;
          const u = e.steps.map((y) => {
            const _ = this._makeStyleAst(y, t);
            let D =
                null != _.offset
                  ? _.offset
                  : (function (n) {
                      if ("string" == typeof n) return null;
                      let e = null;
                      if (Array.isArray(n))
                        n.forEach((t) => {
                          if (pc(t) && t.hasOwnProperty("offset")) {
                            const i = t;
                            (e = parseFloat(i.offset)), delete i.offset;
                          }
                        });
                      else if (pc(n) && n.hasOwnProperty("offset")) {
                        const t = n;
                        (e = parseFloat(t.offset)), delete t.offset;
                      }
                      return e;
                    })(_.styles),
              E = 0;
            return (
              null != D && (s++, (E = _.offset = D)),
              (l = l || E < 0 || E > 1),
              (a = a || E < c),
              (c = E),
              o.push(E),
              _
            );
          });
          l &&
            t.errors.push(
              "Please ensure that all keyframe offsets are between 0 and 1"
            ),
            a &&
              t.errors.push(
                "Please ensure that all keyframe offsets are in order"
              );
          const d = e.steps.length;
          let h = 0;
          s > 0 && s < d
            ? t.errors.push(
                "Not all style() steps within the declared keyframes() contain offsets"
              )
            : 0 == s && (h = 1 / (d - 1));
          const f = d - 1,
            p = t.currentTime,
            g = t.currentAnimateTimings,
            m = g.duration;
          return (
            u.forEach((y, _) => {
              const D = h > 0 ? (_ == f ? 1 : h * _) : o[_],
                E = D * m;
              (t.currentTime = p + g.delay + E),
                (g.duration = E),
                this._validateStyleAst(y, t),
                (y.offset = D),
                i.styles.push(y);
            }),
            i
          );
        }
        visitReference(e, t) {
          return {
            type: 8,
            animation: Gt(this, Zo(e.animation), t),
            options: ur(e.options),
          };
        }
        visitAnimateChild(e, t) {
          return t.depCount++, { type: 9, options: ur(e.options) };
        }
        visitAnimateRef(e, t) {
          return {
            type: 10,
            animation: this.visitReference(e.animation, t),
            options: ur(e.options),
          };
        }
        visitQuery(e, t) {
          const i = t.currentQuerySelector,
            r = e.options || {};
          t.queryCount++, (t.currentQuery = e);
          const [s, o] = (function (n) {
            const e = !!n.split(/\s*,\s*/).find((t) => ":self" == t);
            return (
              e && (n = n.replace(ZB, "")),
              (n = n
                .replace(/@\*/g, ac)
                .replace(/@\w+/g, (t) => ac + "-" + t.substr(1))
                .replace(/:animating/g, sp)),
              [n, e]
            );
          })(e.selector);
          (t.currentQuerySelector = i.length ? i + " " + s : s),
            $t(t.collectedStyles, t.currentQuerySelector, {});
          const a = Gt(this, Zo(e.animation), t);
          return (
            (t.currentQuery = null),
            (t.currentQuerySelector = i),
            {
              type: 11,
              selector: s,
              limit: r.limit || 0,
              optional: !!r.optional,
              includeSelf: o,
              animation: a,
              originalSelector: e.selector,
              options: ur(e.options),
            }
          );
        }
        visitStagger(e, t) {
          t.currentQuery ||
            t.errors.push("stagger() can only be used inside of query()");
          const i =
            "full" === e.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : lc(e.timings, t.errors, !0);
          return {
            type: 12,
            animation: Gt(this, Zo(e.animation), t),
            timings: i,
            options: null,
          };
        }
      }
      class n2 {
        constructor(e) {
          (this.errors = e),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = {}),
            (this.options = null);
        }
      }
      function pc(n) {
        return !Array.isArray(n) && "object" == typeof n;
      }
      function ur(n) {
        return (
          n
            ? (n = ws(n)).params &&
              (n.params = (function (n) {
                return n ? ws(n) : null;
              })(n.params))
            : (n = {}),
          n
        );
      }
      function dp(n, e, t) {
        return { duration: n, delay: e, easing: t };
      }
      function hp(n, e, t, i, r, s, o = null, a = !1) {
        return {
          type: 1,
          element: n,
          keyframes: e,
          preStyleProps: t,
          postStyleProps: i,
          duration: r,
          delay: s,
          totalTime: r + s,
          easing: o,
          subTimeline: a,
        };
      }
      class mc {
        constructor() {
          this._map = new Map();
        }
        consume(e) {
          let t = this._map.get(e);
          return t ? this._map.delete(e) : (t = []), t;
        }
        append(e, t) {
          let i = this._map.get(e);
          i || this._map.set(e, (i = [])), i.push(...t);
        }
        has(e) {
          return this._map.has(e);
        }
        clear() {
          this._map.clear();
        }
      }
      const l2 = new RegExp(":enter", "g"),
        u2 = new RegExp(":leave", "g");
      function fp(n, e, t, i, r, s = {}, o = {}, a, l, c = []) {
        return new d2().buildKeyframes(n, e, t, i, r, s, o, a, l, c);
      }
      class d2 {
        buildKeyframes(e, t, i, r, s, o, a, l, c, u = []) {
          c = c || new mc();
          const d = new pp(e, t, c, r, s, u, []);
          (d.options = l),
            d.currentTimeline.setStyles([o], null, d.errors, l),
            Gt(this, i, d);
          const h = d.timelines.filter((f) => f.containsAnimation());
          if (h.length && Object.keys(a).length) {
            const f = h[h.length - 1];
            f.allowOnlyTimelineStyles() || f.setStyles([a], null, d.errors, l);
          }
          return h.length
            ? h.map((f) => f.buildKeyframes())
            : [hp(t, [], [], [], 0, 0, "", !1)];
        }
        visitTrigger(e, t) {}
        visitState(e, t) {}
        visitTransition(e, t) {}
        visitAnimateChild(e, t) {
          const i = t.subInstructions.consume(t.element);
          if (i) {
            const r = t.createSubContext(e.options),
              s = t.currentTimeline.currentTime,
              o = this._visitSubInstructions(i, r, r.options);
            s != o && t.transformIntoNewTimeline(o);
          }
          t.previousNode = e;
        }
        visitAnimateRef(e, t) {
          const i = t.createSubContext(e.options);
          i.transformIntoNewTimeline(),
            this.visitReference(e.animation, i),
            t.transformIntoNewTimeline(i.currentTimeline.currentTime),
            (t.previousNode = e);
        }
        _visitSubInstructions(e, t, i) {
          let s = t.currentTimeline.currentTime;
          const o = null != i.duration ? lr(i.duration) : null,
            a = null != i.delay ? lr(i.delay) : null;
          return (
            0 !== o &&
              e.forEach((l) => {
                const c = t.appendInstructionToTimeline(l, o, a);
                s = Math.max(s, c.duration + c.delay);
              }),
            s
          );
        }
        visitReference(e, t) {
          t.updateOptions(e.options, !0),
            Gt(this, e.animation, t),
            (t.previousNode = e);
        }
        visitSequence(e, t) {
          const i = t.subContextCount;
          let r = t;
          const s = e.options;
          if (
            s &&
            (s.params || s.delay) &&
            ((r = t.createSubContext(s)),
            r.transformIntoNewTimeline(),
            null != s.delay)
          ) {
            6 == r.previousNode.type &&
              (r.currentTimeline.snapshotCurrentStyles(),
              (r.previousNode = gc));
            const o = lr(s.delay);
            r.delayNextStep(o);
          }
          e.steps.length &&
            (e.steps.forEach((o) => Gt(this, o, r)),
            r.currentTimeline.applyStylesToKeyframe(),
            r.subContextCount > i && r.transformIntoNewTimeline()),
            (t.previousNode = e);
        }
        visitGroup(e, t) {
          const i = [];
          let r = t.currentTimeline.currentTime;
          const s = e.options && e.options.delay ? lr(e.options.delay) : 0;
          e.steps.forEach((o) => {
            const a = t.createSubContext(e.options);
            s && a.delayNextStep(s),
              Gt(this, o, a),
              (r = Math.max(r, a.currentTimeline.currentTime)),
              i.push(a.currentTimeline);
          }),
            i.forEach((o) => t.currentTimeline.mergeTimelineCollectedStyles(o)),
            t.transformIntoNewTimeline(r),
            (t.previousNode = e);
        }
        _visitTiming(e, t) {
          if (e.dynamic) {
            const i = e.strValue;
            return lc(t.params ? cc(i, t.params, t.errors) : i, t.errors);
          }
          return { duration: e.duration, delay: e.delay, easing: e.easing };
        }
        visitAnimate(e, t) {
          const i = (t.currentAnimateTimings = this._visitTiming(e.timings, t)),
            r = t.currentTimeline;
          i.delay && (t.incrementTime(i.delay), r.snapshotCurrentStyles());
          const s = e.style;
          5 == s.type
            ? this.visitKeyframes(s, t)
            : (t.incrementTime(i.duration),
              this.visitStyle(s, t),
              r.applyStylesToKeyframe()),
            (t.currentAnimateTimings = null),
            (t.previousNode = e);
        }
        visitStyle(e, t) {
          const i = t.currentTimeline,
            r = t.currentAnimateTimings;
          !r && i.getCurrentStyleProperties().length && i.forwardFrame();
          const s = (r && r.easing) || e.easing;
          e.isEmptyStep
            ? i.applyEmptyStep(s)
            : i.setStyles(e.styles, s, t.errors, t.options),
            (t.previousNode = e);
        }
        visitKeyframes(e, t) {
          const i = t.currentAnimateTimings,
            r = t.currentTimeline.duration,
            s = i.duration,
            a = t.createSubContext().currentTimeline;
          (a.easing = i.easing),
            e.styles.forEach((l) => {
              a.forwardTime((l.offset || 0) * s),
                a.setStyles(l.styles, l.easing, t.errors, t.options),
                a.applyStylesToKeyframe();
            }),
            t.currentTimeline.mergeTimelineCollectedStyles(a),
            t.transformIntoNewTimeline(r + s),
            (t.previousNode = e);
        }
        visitQuery(e, t) {
          const i = t.currentTimeline.currentTime,
            r = e.options || {},
            s = r.delay ? lr(r.delay) : 0;
          s &&
            (6 === t.previousNode.type ||
              (0 == i &&
                t.currentTimeline.getCurrentStyleProperties().length)) &&
            (t.currentTimeline.snapshotCurrentStyles(), (t.previousNode = gc));
          let o = i;
          const a = t.invokeQuery(
            e.selector,
            e.originalSelector,
            e.limit,
            e.includeSelf,
            !!r.optional,
            t.errors
          );
          t.currentQueryTotal = a.length;
          let l = null;
          a.forEach((c, u) => {
            t.currentQueryIndex = u;
            const d = t.createSubContext(e.options, c);
            s && d.delayNextStep(s),
              c === t.element && (l = d.currentTimeline),
              Gt(this, e.animation, d),
              d.currentTimeline.applyStylesToKeyframe(),
              (o = Math.max(o, d.currentTimeline.currentTime));
          }),
            (t.currentQueryIndex = 0),
            (t.currentQueryTotal = 0),
            t.transformIntoNewTimeline(o),
            l &&
              (t.currentTimeline.mergeTimelineCollectedStyles(l),
              t.currentTimeline.snapshotCurrentStyles()),
            (t.previousNode = e);
        }
        visitStagger(e, t) {
          const i = t.parentContext,
            r = t.currentTimeline,
            s = e.timings,
            o = Math.abs(s.duration),
            a = o * (t.currentQueryTotal - 1);
          let l = o * t.currentQueryIndex;
          switch (s.duration < 0 ? "reverse" : s.easing) {
            case "reverse":
              l = a - l;
              break;
            case "full":
              l = i.currentStaggerTime;
          }
          const u = t.currentTimeline;
          l && u.delayNextStep(l);
          const d = u.currentTime;
          Gt(this, e.animation, t),
            (t.previousNode = e),
            (i.currentStaggerTime =
              r.currentTime - d + (r.startTime - i.currentTimeline.startTime));
        }
      }
      const gc = {};
      class pp {
        constructor(e, t, i, r, s, o, a, l) {
          (this._driver = e),
            (this.element = t),
            (this.subInstructions = i),
            (this._enterClassName = r),
            (this._leaveClassName = s),
            (this.errors = o),
            (this.timelines = a),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = gc),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = l || new _c(this._driver, t, 0)),
            a.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(e, t) {
          if (!e) return;
          const i = e;
          let r = this.options;
          null != i.duration && (r.duration = lr(i.duration)),
            null != i.delay && (r.delay = lr(i.delay));
          const s = i.params;
          if (s) {
            let o = r.params;
            o || (o = this.options.params = {}),
              Object.keys(s).forEach((a) => {
                (!t || !o.hasOwnProperty(a)) &&
                  (o[a] = cc(s[a], o, this.errors));
              });
          }
        }
        _copyOptions() {
          const e = {};
          if (this.options) {
            const t = this.options.params;
            if (t) {
              const i = (e.params = {});
              Object.keys(t).forEach((r) => {
                i[r] = t[r];
              });
            }
          }
          return e;
        }
        createSubContext(e = null, t, i) {
          const r = t || this.element,
            s = new pp(
              this._driver,
              r,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(r, i || 0)
            );
          return (
            (s.previousNode = this.previousNode),
            (s.currentAnimateTimings = this.currentAnimateTimings),
            (s.options = this._copyOptions()),
            s.updateOptions(e),
            (s.currentQueryIndex = this.currentQueryIndex),
            (s.currentQueryTotal = this.currentQueryTotal),
            (s.parentContext = this),
            this.subContextCount++,
            s
          );
        }
        transformIntoNewTimeline(e) {
          return (
            (this.previousNode = gc),
            (this.currentTimeline = this.currentTimeline.fork(this.element, e)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(e, t, i) {
          const r = {
              duration: null != t ? t : e.duration,
              delay:
                this.currentTimeline.currentTime +
                (null != i ? i : 0) +
                e.delay,
              easing: "",
            },
            s = new h2(
              this._driver,
              e.element,
              e.keyframes,
              e.preStyleProps,
              e.postStyleProps,
              r,
              e.stretchStartingKeyframe
            );
          return this.timelines.push(s), r;
        }
        incrementTime(e) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
        }
        delayNextStep(e) {
          e > 0 && this.currentTimeline.delayNextStep(e);
        }
        invokeQuery(e, t, i, r, s, o) {
          let a = [];
          if ((r && a.push(this.element), e.length > 0)) {
            e = (e = e.replace(l2, "." + this._enterClassName)).replace(
              u2,
              "." + this._leaveClassName
            );
            let c = this._driver.query(this.element, e, 1 != i);
            0 !== i &&
              (c = i < 0 ? c.slice(c.length + i, c.length) : c.slice(0, i)),
              a.push(...c);
          }
          return (
            !s &&
              0 == a.length &&
              o.push(
                `\`query("${t}")\` returned zero elements. (Use \`query("${t}", { optional: true })\` if you wish to allow this.)`
              ),
            a
          );
        }
      }
      class _c {
        constructor(e, t, i, r) {
          (this._driver = e),
            (this.element = t),
            (this.startTime = i),
            (this._elementTimelineStylesLookup = r),
            (this.duration = 0),
            (this._previousKeyframe = {}),
            (this._currentKeyframe = {}),
            (this._keyframes = new Map()),
            (this._styleSummary = {}),
            (this._pendingStyles = {}),
            (this._backFill = {}),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._localTimelineStyles = Object.create(this._backFill, {})),
            (this._globalTimelineStyles =
              this._elementTimelineStylesLookup.get(t)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                t,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.getCurrentStyleProperties().length > 0;
            default:
              return !0;
          }
        }
        getCurrentStyleProperties() {
          return Object.keys(this._currentKeyframe);
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(e) {
          const t =
            1 == this._keyframes.size &&
            Object.keys(this._pendingStyles).length;
          this.duration || t
            ? (this.forwardTime(this.currentTime + e),
              t && this.snapshotCurrentStyles())
            : (this.startTime += e);
        }
        fork(e, t) {
          return (
            this.applyStylesToKeyframe(),
            new _c(
              this._driver,
              e,
              t || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = Object.create(this._backFill, {})),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(e) {
          this.applyStylesToKeyframe(),
            (this.duration = e),
            this._loadKeyframe();
        }
        _updateStyle(e, t) {
          (this._localTimelineStyles[e] = t),
            (this._globalTimelineStyles[e] = t),
            (this._styleSummary[e] = { time: this.currentTime, value: t });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(e) {
          e && (this._previousKeyframe.easing = e),
            Object.keys(this._globalTimelineStyles).forEach((t) => {
              (this._backFill[t] = this._globalTimelineStyles[t] || ii),
                (this._currentKeyframe[t] = ii);
            }),
            (this._currentEmptyStepKeyframe = this._currentKeyframe);
        }
        setStyles(e, t, i, r) {
          t && (this._previousKeyframe.easing = t);
          const s = (r && r.params) || {},
            o = (function (n, e) {
              const t = {};
              let i;
              return (
                n.forEach((r) => {
                  "*" === r
                    ? ((i = i || Object.keys(e)),
                      i.forEach((s) => {
                        t[s] = ii;
                      }))
                    : wi(r, !1, t);
                }),
                t
              );
            })(e, this._globalTimelineStyles);
          Object.keys(o).forEach((a) => {
            const l = cc(o[a], s, i);
            (this._pendingStyles[a] = l),
              this._localTimelineStyles.hasOwnProperty(a) ||
                (this._backFill[a] = this._globalTimelineStyles.hasOwnProperty(
                  a
                )
                  ? this._globalTimelineStyles[a]
                  : ii),
              this._updateStyle(a, l);
          });
        }
        applyStylesToKeyframe() {
          const e = this._pendingStyles,
            t = Object.keys(e);
          0 != t.length &&
            ((this._pendingStyles = {}),
            t.forEach((i) => {
              this._currentKeyframe[i] = e[i];
            }),
            Object.keys(this._localTimelineStyles).forEach((i) => {
              this._currentKeyframe.hasOwnProperty(i) ||
                (this._currentKeyframe[i] = this._localTimelineStyles[i]);
            }));
        }
        snapshotCurrentStyles() {
          Object.keys(this._localTimelineStyles).forEach((e) => {
            const t = this._localTimelineStyles[e];
            (this._pendingStyles[e] = t), this._updateStyle(e, t);
          });
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const e = [];
          for (let t in this._currentKeyframe) e.push(t);
          return e;
        }
        mergeTimelineCollectedStyles(e) {
          Object.keys(e._styleSummary).forEach((t) => {
            const i = this._styleSummary[t],
              r = e._styleSummary[t];
            (!i || r.time > i.time) && this._updateStyle(t, r.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const e = new Set(),
            t = new Set(),
            i = 1 === this._keyframes.size && 0 === this.duration;
          let r = [];
          this._keyframes.forEach((a, l) => {
            const c = wi(a, !0);
            Object.keys(c).forEach((u) => {
              const d = c[u];
              "!" == d ? e.add(u) : d == ii && t.add(u);
            }),
              i || (c.offset = l / this.duration),
              r.push(c);
          });
          const s = e.size ? uc(e.values()) : [],
            o = t.size ? uc(t.values()) : [];
          if (i) {
            const a = r[0],
              l = ws(a);
            (a.offset = 0), (l.offset = 1), (r = [a, l]);
          }
          return hp(
            this.element,
            r,
            s,
            o,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class h2 extends _c {
        constructor(e, t, i, r, s, o, a = !1) {
          super(e, t, o.delay),
            (this.keyframes = i),
            (this.preStyleProps = r),
            (this.postStyleProps = s),
            (this._stretchStartingKeyframe = a),
            (this.timings = {
              duration: o.duration,
              delay: o.delay,
              easing: o.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let e = this.keyframes,
            { delay: t, duration: i, easing: r } = this.timings;
          if (this._stretchStartingKeyframe && t) {
            const s = [],
              o = i + t,
              a = t / o,
              l = wi(e[0], !1);
            (l.offset = 0), s.push(l);
            const c = wi(e[0], !1);
            (c.offset = QE(a)), s.push(c);
            const u = e.length - 1;
            for (let d = 1; d <= u; d++) {
              let h = wi(e[d], !1);
              (h.offset = QE((t + h.offset * i) / o)), s.push(h);
            }
            (i = o), (t = 0), (r = ""), (e = s);
          }
          return hp(
            this.element,
            e,
            this.preStyleProps,
            this.postStyleProps,
            i,
            t,
            r,
            !0
          );
        }
      }
      function QE(n, e = 3) {
        const t = Math.pow(10, e - 1);
        return Math.round(n * t) / t;
      }
      class mp {}
      class p2 extends mp {
        normalizePropertyName(e, t) {
          return lp(e);
        }
        normalizeStyleValue(e, t, i, r) {
          let s = "";
          const o = i.toString().trim();
          if (m2[t] && 0 !== i && "0" !== i)
            if ("number" == typeof i) s = "px";
            else {
              const a = i.match(/^[+-]?[\d\.]+([a-z]*)$/);
              a &&
                0 == a[1].length &&
                r.push(`Please provide a CSS unit value for ${e}:${i}`);
            }
          return o + s;
        }
      }
      const m2 = (() =>
        (function (n) {
          const e = {};
          return n.forEach((t) => (e[t] = !0)), e;
        })(
          "width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(
            ","
          )
        ))();
      function XE(n, e, t, i, r, s, o, a, l, c, u, d, h) {
        return {
          type: 0,
          element: n,
          triggerName: e,
          isRemovalTransition: r,
          fromState: t,
          fromStyles: s,
          toState: i,
          toStyles: o,
          timelines: a,
          queriedElements: l,
          preStyleProps: c,
          postStyleProps: u,
          totalTime: d,
          errors: h,
        };
      }
      const gp = {};
      class ZE {
        constructor(e, t, i) {
          (this._triggerName = e), (this.ast = t), (this._stateStyles = i);
        }
        match(e, t, i, r) {
          return (function (n, e, t, i, r) {
            return n.some((s) => s(e, t, i, r));
          })(this.ast.matchers, e, t, i, r);
        }
        buildStyles(e, t, i) {
          const r = this._stateStyles["*"],
            s = this._stateStyles[e],
            o = r ? r.buildStyles(t, i) : {};
          return s ? s.buildStyles(t, i) : o;
        }
        build(e, t, i, r, s, o, a, l, c, u) {
          const d = [],
            h = (this.ast.options && this.ast.options.params) || gp,
            p = this.buildStyles(i, (a && a.params) || gp, d),
            g = (l && l.params) || gp,
            m = this.buildStyles(r, g, d),
            y = new Set(),
            _ = new Map(),
            D = new Map(),
            E = "void" === r,
            L = { params: Z(Z({}, h), g) },
            de = u ? [] : fp(e, t, this.ast.animation, s, o, p, m, L, c, d);
          let _e = 0;
          if (
            (de.forEach((ct) => {
              _e = Math.max(ct.duration + ct.delay, _e);
            }),
            d.length)
          )
            return XE(t, this._triggerName, i, r, E, p, m, [], [], _, D, _e, d);
          de.forEach((ct) => {
            const ut = ct.element,
              ri = $t(_, ut, {});
            ct.preStyleProps.forEach((xn) => (ri[xn] = !0));
            const si = $t(D, ut, {});
            ct.postStyleProps.forEach((xn) => (si[xn] = !0)),
              ut !== t && y.add(ut);
          });
          const Dt = uc(y.values());
          return XE(t, this._triggerName, i, r, E, p, m, de, Dt, _, D, _e);
        }
      }
      class y2 {
        constructor(e, t, i) {
          (this.styles = e), (this.defaultParams = t), (this.normalizer = i);
        }
        buildStyles(e, t) {
          const i = {},
            r = ws(this.defaultParams);
          return (
            Object.keys(e).forEach((s) => {
              const o = e[s];
              null != o && (r[s] = o);
            }),
            this.styles.styles.forEach((s) => {
              if ("string" != typeof s) {
                const o = s;
                Object.keys(o).forEach((a) => {
                  let l = o[a];
                  l.length > 1 && (l = cc(l, r, t));
                  const c = this.normalizer.normalizePropertyName(a, t);
                  (l = this.normalizer.normalizeStyleValue(a, c, l, t)),
                    (i[c] = l);
                });
              }
            }),
            i
          );
        }
      }
      class b2 {
        constructor(e, t, i) {
          (this.name = e),
            (this.ast = t),
            (this._normalizer = i),
            (this.transitionFactories = []),
            (this.states = {}),
            t.states.forEach((r) => {
              this.states[r.name] = new y2(
                r.style,
                (r.options && r.options.params) || {},
                i
              );
            }),
            JE(this.states, "true", "1"),
            JE(this.states, "false", "0"),
            t.transitions.forEach((r) => {
              this.transitionFactories.push(new ZE(e, r, this.states));
            }),
            (this.fallbackTransition = (function (n, e, t) {
              return new ZE(
                n,
                {
                  type: 1,
                  animation: { type: 2, steps: [], options: null },
                  matchers: [(o, a) => !0],
                  options: null,
                  queryCount: 0,
                  depCount: 0,
                },
                e
              );
            })(e, this.states));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(e, t, i, r) {
          return (
            this.transitionFactories.find((o) => o.match(e, t, i, r)) || null
          );
        }
        matchStyles(e, t, i) {
          return this.fallbackTransition.buildStyles(e, t, i);
        }
      }
      function JE(n, e, t) {
        n.hasOwnProperty(e)
          ? n.hasOwnProperty(t) || (n[t] = n[e])
          : n.hasOwnProperty(t) && (n[e] = n[t]);
      }
      const D2 = new mc();
      class E2 {
        constructor(e, t, i) {
          (this.bodyNode = e),
            (this._driver = t),
            (this._normalizer = i),
            (this._animations = {}),
            (this._playersById = {}),
            (this.players = []);
        }
        register(e, t) {
          const i = [],
            r = up(this._driver, t, i);
          if (i.length)
            throw new Error(
              `Unable to build the animation due to the following errors: ${i.join(
                "\n"
              )}`
            );
          this._animations[e] = r;
        }
        _buildPlayer(e, t, i) {
          const r = e.element,
            s = RE(0, this._normalizer, 0, e.keyframes, t, i);
          return this._driver.animate(
            r,
            s,
            e.duration,
            e.delay,
            e.easing,
            [],
            !0
          );
        }
        create(e, t, i = {}) {
          const r = [],
            s = this._animations[e];
          let o;
          const a = new Map();
          if (
            (s
              ? ((o = fp(this._driver, t, s, rp, sc, {}, {}, i, D2, r)),
                o.forEach((u) => {
                  const d = $t(a, u.element, {});
                  u.postStyleProps.forEach((h) => (d[h] = null));
                }))
              : (r.push(
                  "The requested animation doesn't exist or has already been destroyed"
                ),
                (o = [])),
            r.length)
          )
            throw new Error(
              `Unable to create the animation due to the following errors: ${r.join(
                "\n"
              )}`
            );
          a.forEach((u, d) => {
            Object.keys(u).forEach((h) => {
              u[h] = this._driver.computeStyle(d, h, ii);
            });
          });
          const c = Ei(
            o.map((u) => {
              const d = a.get(u.element);
              return this._buildPlayer(u, {}, d);
            })
          );
          return (
            (this._playersById[e] = c),
            c.onDestroy(() => this.destroy(e)),
            this.players.push(c),
            c
          );
        }
        destroy(e) {
          const t = this._getPlayer(e);
          t.destroy(), delete this._playersById[e];
          const i = this.players.indexOf(t);
          i >= 0 && this.players.splice(i, 1);
        }
        _getPlayer(e) {
          const t = this._playersById[e];
          if (!t)
            throw new Error(
              `Unable to find the timeline player referenced by ${e}`
            );
          return t;
        }
        listen(e, t, i, r) {
          const s = Qf(t, "", "", "");
          return Kf(this._getPlayer(e), i, s, r), () => {};
        }
        command(e, t, i, r) {
          if ("register" == i) return void this.register(e, r[0]);
          if ("create" == i) return void this.create(e, t, r[0] || {});
          const s = this._getPlayer(e);
          switch (i) {
            case "play":
              s.play();
              break;
            case "pause":
              s.pause();
              break;
            case "reset":
              s.reset();
              break;
            case "restart":
              s.restart();
              break;
            case "finish":
              s.finish();
              break;
            case "init":
              s.init();
              break;
            case "setPosition":
              s.setPosition(parseFloat(r[0]));
              break;
            case "destroy":
              this.destroy(e);
          }
        }
      }
      const ew = "ng-animate-queued",
        tw = "ng-animate-disabled",
        nw = ".ng-animate-disabled",
        S2 = [],
        iw = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        I2 = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        },
        on = "__ng_removed";
      class _p {
        constructor(e, t = "") {
          this.namespaceId = t;
          const i = e && e.hasOwnProperty("value");
          if (((this.value = null != (n = i ? e.value : e) ? n : null), i)) {
            const s = ws(e);
            delete s.value, (this.options = s);
          } else this.options = {};
          var n;
          this.options.params || (this.options.params = {});
        }
        get params() {
          return this.options.params;
        }
        absorbOptions(e) {
          const t = e.params;
          if (t) {
            const i = this.options.params;
            Object.keys(t).forEach((r) => {
              null == i[r] && (i[r] = t[r]);
            });
          }
        }
      }
      const Jo = "void",
        yp = new _p(Jo);
      class k2 {
        constructor(e, t, i) {
          (this.id = e),
            (this.hostElement = t),
            (this._engine = i),
            (this.players = []),
            (this._triggers = {}),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + e),
            an(t, this._hostClassName);
        }
        listen(e, t, i, r) {
          if (!this._triggers.hasOwnProperty(t))
            throw new Error(
              `Unable to listen on the animation trigger event "${i}" because the animation trigger "${t}" doesn't exist!`
            );
          if (null == i || 0 == i.length)
            throw new Error(
              `Unable to listen on the animation trigger "${t}" because the provided event is undefined!`
            );
          if ("start" != (n = i) && "done" != n)
            throw new Error(
              `The provided animation trigger event "${i}" for the animation trigger "${t}" is not supported!`
            );
          var n;
          const s = $t(this._elementListeners, e, []),
            o = { name: t, phase: i, callback: r };
          s.push(o);
          const a = $t(this._engine.statesByElement, e, {});
          return (
            a.hasOwnProperty(t) ||
              (an(e, oc), an(e, oc + "-" + t), (a[t] = yp)),
            () => {
              this._engine.afterFlush(() => {
                const l = s.indexOf(o);
                l >= 0 && s.splice(l, 1), this._triggers[t] || delete a[t];
              });
            }
          );
        }
        register(e, t) {
          return !this._triggers[e] && ((this._triggers[e] = t), !0);
        }
        _getTrigger(e) {
          const t = this._triggers[e];
          if (!t)
            throw new Error(
              `The provided animation trigger "${e}" has not been registered!`
            );
          return t;
        }
        trigger(e, t, i, r = !0) {
          const s = this._getTrigger(t),
            o = new vp(this.id, t, e);
          let a = this._engine.statesByElement.get(e);
          a ||
            (an(e, oc),
            an(e, oc + "-" + t),
            this._engine.statesByElement.set(e, (a = {})));
          let l = a[t];
          const c = new _p(i, this.id);
          if (
            (!(i && i.hasOwnProperty("value")) &&
              l &&
              c.absorbOptions(l.options),
            (a[t] = c),
            l || (l = yp),
            c.value !== Jo && l.value === c.value)
          ) {
            if (
              !(function (n, e) {
                const t = Object.keys(n),
                  i = Object.keys(e);
                if (t.length != i.length) return !1;
                for (let r = 0; r < t.length; r++) {
                  const s = t[r];
                  if (!e.hasOwnProperty(s) || n[s] !== e[s]) return !1;
                }
                return !0;
              })(l.params, c.params)
            ) {
              const g = [],
                m = s.matchStyles(l.value, l.params, g),
                y = s.matchStyles(c.value, c.params, g);
              g.length
                ? this._engine.reportError(g)
                : this._engine.afterFlush(() => {
                    cr(e, m), Hn(e, y);
                  });
            }
            return;
          }
          const h = $t(this._engine.playersByElement, e, []);
          h.forEach((g) => {
            g.namespaceId == this.id &&
              g.triggerName == t &&
              g.queued &&
              g.destroy();
          });
          let f = s.matchTransition(l.value, c.value, e, c.params),
            p = !1;
          if (!f) {
            if (!r) return;
            (f = s.fallbackTransition), (p = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: e,
              triggerName: t,
              transition: f,
              fromState: l,
              toState: c,
              player: o,
              isFallbackTransition: p,
            }),
            p ||
              (an(e, ew),
              o.onStart(() => {
                Ms(e, ew);
              })),
            o.onDone(() => {
              let g = this.players.indexOf(o);
              g >= 0 && this.players.splice(g, 1);
              const m = this._engine.playersByElement.get(e);
              if (m) {
                let y = m.indexOf(o);
                y >= 0 && m.splice(y, 1);
              }
            }),
            this.players.push(o),
            h.push(o),
            o
          );
        }
        deregister(e) {
          delete this._triggers[e],
            this._engine.statesByElement.forEach((t, i) => {
              delete t[e];
            }),
            this._elementListeners.forEach((t, i) => {
              this._elementListeners.set(
                i,
                t.filter((r) => r.name != e)
              );
            });
        }
        clearElementCache(e) {
          this._engine.statesByElement.delete(e),
            this._elementListeners.delete(e);
          const t = this._engine.playersByElement.get(e);
          t &&
            (t.forEach((i) => i.destroy()),
            this._engine.playersByElement.delete(e));
        }
        _signalRemovalForInnerTriggers(e, t) {
          const i = this._engine.driver.query(e, ac, !0);
          i.forEach((r) => {
            if (r[on]) return;
            const s = this._engine.fetchNamespacesByElement(r);
            s.size
              ? s.forEach((o) => o.triggerLeaveAnimation(r, t, !1, !0))
              : this.clearElementCache(r);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              i.forEach((r) => this.clearElementCache(r))
            );
        }
        triggerLeaveAnimation(e, t, i, r) {
          const s = this._engine.statesByElement.get(e);
          if (s) {
            const o = [];
            if (
              (Object.keys(s).forEach((a) => {
                if (this._triggers[a]) {
                  const l = this.trigger(e, a, Jo, r);
                  l && o.push(l);
                }
              }),
              o.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, e, !0, t),
                i && Ei(o).onDone(() => this._engine.processLeaveNode(e)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(e) {
          const t = this._elementListeners.get(e),
            i = this._engine.statesByElement.get(e);
          if (t && i) {
            const r = new Set();
            t.forEach((s) => {
              const o = s.name;
              if (r.has(o)) return;
              r.add(o);
              const l = this._triggers[o].fallbackTransition,
                c = i[o] || yp,
                u = new _p(Jo),
                d = new vp(this.id, o, e);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: e,
                  triggerName: o,
                  transition: l,
                  fromState: c,
                  toState: u,
                  player: d,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(e, t) {
          const i = this._engine;
          if (
            (e.childElementCount && this._signalRemovalForInnerTriggers(e, t),
            this.triggerLeaveAnimation(e, t, !0))
          )
            return;
          let r = !1;
          if (i.totalAnimations) {
            const s = i.players.length ? i.playersByQueriedElement.get(e) : [];
            if (s && s.length) r = !0;
            else {
              let o = e;
              for (; (o = o.parentNode); )
                if (i.statesByElement.get(o)) {
                  r = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(e), r))
            i.markElementAsRemoved(this.id, e, !1, t);
          else {
            const s = e[on];
            (!s || s === iw) &&
              (i.afterFlush(() => this.clearElementCache(e)),
              i.destroyInnerAnimations(e),
              i._onRemovalComplete(e, t));
          }
        }
        insertNode(e, t) {
          an(e, this._hostClassName);
        }
        drainQueuedTransitions(e) {
          const t = [];
          return (
            this._queue.forEach((i) => {
              const r = i.player;
              if (r.destroyed) return;
              const s = i.element,
                o = this._elementListeners.get(s);
              o &&
                o.forEach((a) => {
                  if (a.name == i.triggerName) {
                    const l = Qf(
                      s,
                      i.triggerName,
                      i.fromState.value,
                      i.toState.value
                    );
                    (l._data = e), Kf(i.player, a.phase, l, a.callback);
                  }
                }),
                r.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      r.destroy();
                    })
                  : t.push(i);
            }),
            (this._queue = []),
            t.sort((i, r) => {
              const s = i.transition.ast.depCount,
                o = r.transition.ast.depCount;
              return 0 == s || 0 == o
                ? s - o
                : this._engine.driver.containsElement(i.element, r.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(e) {
          this.players.forEach((t) => t.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, e);
        }
        elementContainsData(e) {
          let t = !1;
          return (
            this._elementListeners.has(e) && (t = !0),
            (t = !!this._queue.find((i) => i.element === e) || t),
            t
          );
        }
      }
      class T2 {
        constructor(e, t, i) {
          (this.bodyNode = e),
            (this.driver = t),
            (this._normalizer = i),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (r, s) => {});
        }
        _onRemovalComplete(e, t) {
          this.onRemovalComplete(e, t);
        }
        get queuedPlayers() {
          const e = [];
          return (
            this._namespaceList.forEach((t) => {
              t.players.forEach((i) => {
                i.queued && e.push(i);
              });
            }),
            e
          );
        }
        createNamespace(e, t) {
          const i = new k2(e, t, this);
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, t)
              ? this._balanceNamespaceList(i, t)
              : (this.newHostElements.set(t, i), this.collectEnterElement(t)),
            (this._namespaceLookup[e] = i)
          );
        }
        _balanceNamespaceList(e, t) {
          const i = this._namespaceList.length - 1;
          if (i >= 0) {
            let r = !1;
            for (let s = i; s >= 0; s--)
              if (
                this.driver.containsElement(
                  this._namespaceList[s].hostElement,
                  t
                )
              ) {
                this._namespaceList.splice(s + 1, 0, e), (r = !0);
                break;
              }
            r || this._namespaceList.splice(0, 0, e);
          } else this._namespaceList.push(e);
          return this.namespacesByHostElement.set(t, e), e;
        }
        register(e, t) {
          let i = this._namespaceLookup[e];
          return i || (i = this.createNamespace(e, t)), i;
        }
        registerTrigger(e, t, i) {
          let r = this._namespaceLookup[e];
          r && r.register(t, i) && this.totalAnimations++;
        }
        destroy(e, t) {
          if (!e) return;
          const i = this._fetchNamespace(e);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(i.hostElement),
              delete this._namespaceLookup[e];
            const r = this._namespaceList.indexOf(i);
            r >= 0 && this._namespaceList.splice(r, 1);
          }),
            this.afterFlushAnimationsDone(() => i.destroy(t));
        }
        _fetchNamespace(e) {
          return this._namespaceLookup[e];
        }
        fetchNamespacesByElement(e) {
          const t = new Set(),
            i = this.statesByElement.get(e);
          if (i) {
            const r = Object.keys(i);
            for (let s = 0; s < r.length; s++) {
              const o = i[r[s]].namespaceId;
              if (o) {
                const a = this._fetchNamespace(o);
                a && t.add(a);
              }
            }
          }
          return t;
        }
        trigger(e, t, i, r) {
          if (yc(t)) {
            const s = this._fetchNamespace(e);
            if (s) return s.trigger(t, i, r), !0;
          }
          return !1;
        }
        insertNode(e, t, i, r) {
          if (!yc(t)) return;
          const s = t[on];
          if (s && s.setForRemoval) {
            (s.setForRemoval = !1), (s.setForMove = !0);
            const o = this.collectedLeaveElements.indexOf(t);
            o >= 0 && this.collectedLeaveElements.splice(o, 1);
          }
          if (e) {
            const o = this._fetchNamespace(e);
            o && o.insertNode(t, i);
          }
          r && this.collectEnterElement(t);
        }
        collectEnterElement(e) {
          this.collectedEnterElements.push(e);
        }
        markElementAsDisabled(e, t) {
          t
            ? this.disabledNodes.has(e) ||
              (this.disabledNodes.add(e), an(e, tw))
            : this.disabledNodes.has(e) &&
              (this.disabledNodes.delete(e), Ms(e, tw));
        }
        removeNode(e, t, i, r) {
          if (yc(t)) {
            const s = e ? this._fetchNamespace(e) : null;
            if (
              (s ? s.removeNode(t, r) : this.markElementAsRemoved(e, t, !1, r),
              i)
            ) {
              const o = this.namespacesByHostElement.get(t);
              o && o.id !== e && o.removeNode(t, r);
            }
          } else this._onRemovalComplete(t, r);
        }
        markElementAsRemoved(e, t, i, r) {
          this.collectedLeaveElements.push(t),
            (t[on] = {
              namespaceId: e,
              setForRemoval: r,
              hasAnimation: i,
              removedBeforeQueried: !1,
            });
        }
        listen(e, t, i, r, s) {
          return yc(t) ? this._fetchNamespace(e).listen(t, i, r, s) : () => {};
        }
        _buildInstruction(e, t, i, r, s) {
          return e.transition.build(
            this.driver,
            e.element,
            e.fromState.value,
            e.toState.value,
            i,
            r,
            e.fromState.options,
            e.toState.options,
            t,
            s
          );
        }
        destroyInnerAnimations(e) {
          let t = this.driver.query(e, ac, !0);
          t.forEach((i) => this.destroyActiveAnimationsForElement(i)),
            0 != this.playersByQueriedElement.size &&
              ((t = this.driver.query(e, sp, !0)),
              t.forEach((i) => this.finishActiveQueriedAnimationOnElement(i)));
        }
        destroyActiveAnimationsForElement(e) {
          const t = this.playersByElement.get(e);
          t &&
            t.forEach((i) => {
              i.queued ? (i.markedForDestroy = !0) : i.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(e) {
          const t = this.playersByQueriedElement.get(e);
          t && t.forEach((i) => i.finish());
        }
        whenRenderingDone() {
          return new Promise((e) => {
            if (this.players.length) return Ei(this.players).onDone(() => e());
            e();
          });
        }
        processLeaveNode(e) {
          const t = e[on];
          if (t && t.setForRemoval) {
            if (((e[on] = iw), t.namespaceId)) {
              this.destroyInnerAnimations(e);
              const i = this._fetchNamespace(t.namespaceId);
              i && i.clearElementCache(e);
            }
            this._onRemovalComplete(e, t.setForRemoval);
          }
          this.driver.matchesElement(e, nw) &&
            this.markElementAsDisabled(e, !1),
            this.driver.query(e, nw, !0).forEach((i) => {
              this.markElementAsDisabled(i, !1);
            });
        }
        flush(e = -1) {
          let t = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((i, r) =>
                this._balanceNamespaceList(i, r)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let i = 0; i < this.collectedEnterElements.length; i++)
              an(this.collectedEnterElements[i], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const i = [];
            try {
              t = this._flushAnimations(i, e);
            } finally {
              for (let r = 0; r < i.length; r++) i[r]();
            }
          } else
            for (let i = 0; i < this.collectedLeaveElements.length; i++)
              this.processLeaveNode(this.collectedLeaveElements[i]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((i) => i()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const i = this._whenQuietFns;
            (this._whenQuietFns = []),
              t.length
                ? Ei(t).onDone(() => {
                    i.forEach((r) => r());
                  })
                : i.forEach((r) => r());
          }
        }
        reportError(e) {
          throw new Error(
            `Unable to process animations due to the following failed trigger transitions\n ${e.join(
              "\n"
            )}`
          );
        }
        _flushAnimations(e, t) {
          const i = new mc(),
            r = [],
            s = new Map(),
            o = [],
            a = new Map(),
            l = new Map(),
            c = new Map(),
            u = new Set();
          this.disabledNodes.forEach((S) => {
            u.add(S);
            const R = this.driver.query(S, ".ng-animate-queued", !0);
            for (let j = 0; j < R.length; j++) u.add(R[j]);
          });
          const d = this.bodyNode,
            h = Array.from(this.statesByElement.keys()),
            f = ow(h, this.collectedEnterElements),
            p = new Map();
          let g = 0;
          f.forEach((S, R) => {
            const j = rp + g++;
            p.set(R, j), S.forEach((te) => an(te, j));
          });
          const m = [],
            y = new Set(),
            _ = new Set();
          for (let S = 0; S < this.collectedLeaveElements.length; S++) {
            const R = this.collectedLeaveElements[S],
              j = R[on];
            j &&
              j.setForRemoval &&
              (m.push(R),
              y.add(R),
              j.hasAnimation
                ? this.driver
                    .query(R, ".ng-star-inserted", !0)
                    .forEach((te) => y.add(te))
                : _.add(R));
          }
          const D = new Map(),
            E = ow(h, Array.from(y));
          E.forEach((S, R) => {
            const j = sc + g++;
            D.set(R, j), S.forEach((te) => an(te, j));
          }),
            e.push(() => {
              f.forEach((S, R) => {
                const j = p.get(R);
                S.forEach((te) => Ms(te, j));
              }),
                E.forEach((S, R) => {
                  const j = D.get(R);
                  S.forEach((te) => Ms(te, j));
                }),
                m.forEach((S) => {
                  this.processLeaveNode(S);
                });
            });
          const L = [],
            de = [];
          for (let S = this._namespaceList.length - 1; S >= 0; S--)
            this._namespaceList[S].drainQueuedTransitions(t).forEach((j) => {
              const te = j.player,
                Ke = j.element;
              if ((L.push(te), this.collectedEnterElements.length)) {
                const Un = Ke[on];
                if (Un && Un.setForMove) return void te.destroy();
              }
              const jn = !d || !this.driver.containsElement(d, Ke),
                Wt = D.get(Ke),
                Ti = p.get(Ke),
                Re = this._buildInstruction(j, i, Ti, Wt, jn);
              if (Re.errors && Re.errors.length) de.push(Re);
              else {
                if (jn)
                  return (
                    te.onStart(() => cr(Ke, Re.fromStyles)),
                    te.onDestroy(() => Hn(Ke, Re.toStyles)),
                    void r.push(te)
                  );
                if (j.isFallbackTransition)
                  return (
                    te.onStart(() => cr(Ke, Re.fromStyles)),
                    te.onDestroy(() => Hn(Ke, Re.toStyles)),
                    void r.push(te)
                  );
                Re.timelines.forEach((Un) => (Un.stretchStartingKeyframe = !0)),
                  i.append(Ke, Re.timelines),
                  o.push({ instruction: Re, player: te, element: Ke }),
                  Re.queriedElements.forEach((Un) => $t(a, Un, []).push(te)),
                  Re.preStyleProps.forEach((Un, ca) => {
                    const Vc = Object.keys(Un);
                    if (Vc.length) {
                      let mr = l.get(ca);
                      mr || l.set(ca, (mr = new Set())),
                        Vc.forEach((Zp) => mr.add(Zp));
                    }
                  }),
                  Re.postStyleProps.forEach((Un, ca) => {
                    const Vc = Object.keys(Un);
                    let mr = c.get(ca);
                    mr || c.set(ca, (mr = new Set())),
                      Vc.forEach((Zp) => mr.add(Zp));
                  });
              }
            });
          if (de.length) {
            const S = [];
            de.forEach((R) => {
              S.push(`@${R.triggerName} has failed due to:\n`),
                R.errors.forEach((j) => S.push(`- ${j}\n`));
            }),
              L.forEach((R) => R.destroy()),
              this.reportError(S);
          }
          const _e = new Map(),
            Dt = new Map();
          o.forEach((S) => {
            const R = S.element;
            i.has(R) &&
              (Dt.set(R, R),
              this._beforeAnimationBuild(
                S.player.namespaceId,
                S.instruction,
                _e
              ));
          }),
            r.forEach((S) => {
              const R = S.element;
              this._getPreviousPlayers(
                R,
                !1,
                S.namespaceId,
                S.triggerName,
                null
              ).forEach((te) => {
                $t(_e, R, []).push(te), te.destroy();
              });
            });
          const ct = m.filter((S) => lw(S, l, c)),
            ut = new Map();
          sw(ut, this.driver, _, c, ii).forEach((S) => {
            lw(S, l, c) && ct.push(S);
          });
          const si = new Map();
          f.forEach((S, R) => {
            sw(si, this.driver, new Set(S), l, "!");
          }),
            ct.forEach((S) => {
              const R = ut.get(S),
                j = si.get(S);
              ut.set(S, Z(Z({}, R), j));
            });
          const xn = [],
            Is = [],
            ks = {};
          o.forEach((S) => {
            const { element: R, player: j, instruction: te } = S;
            if (i.has(R)) {
              if (u.has(R))
                return (
                  j.onDestroy(() => Hn(R, te.toStyles)),
                  (j.disabled = !0),
                  j.overrideTotalTime(te.totalTime),
                  void r.push(j)
                );
              let Ke = ks;
              if (Dt.size > 1) {
                let Wt = R;
                const Ti = [];
                for (; (Wt = Wt.parentNode); ) {
                  const Re = Dt.get(Wt);
                  if (Re) {
                    Ke = Re;
                    break;
                  }
                  Ti.push(Wt);
                }
                Ti.forEach((Re) => Dt.set(Re, Ke));
              }
              const jn = this._buildAnimation(j.namespaceId, te, _e, s, si, ut);
              if ((j.setRealPlayer(jn), Ke === ks)) xn.push(j);
              else {
                const Wt = this.playersByElement.get(Ke);
                Wt && Wt.length && (j.parentPlayer = Ei(Wt)), r.push(j);
              }
            } else
              cr(R, te.fromStyles),
                j.onDestroy(() => Hn(R, te.toStyles)),
                Is.push(j),
                u.has(R) && r.push(j);
          }),
            Is.forEach((S) => {
              const R = s.get(S.element);
              if (R && R.length) {
                const j = Ei(R);
                S.setRealPlayer(j);
              }
            }),
            r.forEach((S) => {
              S.parentPlayer ? S.syncPlayerEvents(S.parentPlayer) : S.destroy();
            });
          for (let S = 0; S < m.length; S++) {
            const R = m[S],
              j = R[on];
            if ((Ms(R, sc), j && j.hasAnimation)) continue;
            let te = [];
            if (a.size) {
              let jn = a.get(R);
              jn && jn.length && te.push(...jn);
              let Wt = this.driver.query(R, sp, !0);
              for (let Ti = 0; Ti < Wt.length; Ti++) {
                let Re = a.get(Wt[Ti]);
                Re && Re.length && te.push(...Re);
              }
            }
            const Ke = te.filter((jn) => !jn.destroyed);
            Ke.length ? P2(this, R, Ke) : this.processLeaveNode(R);
          }
          return (
            (m.length = 0),
            xn.forEach((S) => {
              this.players.push(S),
                S.onDone(() => {
                  S.destroy();
                  const R = this.players.indexOf(S);
                  this.players.splice(R, 1);
                }),
                S.play();
            }),
            xn
          );
        }
        elementContainsData(e, t) {
          let i = !1;
          const r = t[on];
          return (
            r && r.setForRemoval && (i = !0),
            this.playersByElement.has(t) && (i = !0),
            this.playersByQueriedElement.has(t) && (i = !0),
            this.statesByElement.has(t) && (i = !0),
            this._fetchNamespace(e).elementContainsData(t) || i
          );
        }
        afterFlush(e) {
          this._flushFns.push(e);
        }
        afterFlushAnimationsDone(e) {
          this._whenQuietFns.push(e);
        }
        _getPreviousPlayers(e, t, i, r, s) {
          let o = [];
          if (t) {
            const a = this.playersByQueriedElement.get(e);
            a && (o = a);
          } else {
            const a = this.playersByElement.get(e);
            if (a) {
              const l = !s || s == Jo;
              a.forEach((c) => {
                c.queued || (!l && c.triggerName != r) || o.push(c);
              });
            }
          }
          return (
            (i || r) &&
              (o = o.filter(
                (a) => !((i && i != a.namespaceId) || (r && r != a.triggerName))
              )),
            o
          );
        }
        _beforeAnimationBuild(e, t, i) {
          const s = t.element,
            o = t.isRemovalTransition ? void 0 : e,
            a = t.isRemovalTransition ? void 0 : t.triggerName;
          for (const l of t.timelines) {
            const c = l.element,
              u = c !== s,
              d = $t(i, c, []);
            this._getPreviousPlayers(c, u, o, a, t.toState).forEach((f) => {
              const p = f.getRealPlayer();
              p.beforeDestroy && p.beforeDestroy(), f.destroy(), d.push(f);
            });
          }
          cr(s, t.fromStyles);
        }
        _buildAnimation(e, t, i, r, s, o) {
          const a = t.triggerName,
            l = t.element,
            c = [],
            u = new Set(),
            d = new Set(),
            h = t.timelines.map((p) => {
              const g = p.element;
              u.add(g);
              const m = g[on];
              if (m && m.removedBeforeQueried)
                return new Es(p.duration, p.delay);
              const y = g !== l,
                _ = (function (n) {
                  const e = [];
                  return aw(n, e), e;
                })((i.get(g) || S2).map((_e) => _e.getRealPlayer())).filter(
                  (_e) => !!_e.element && _e.element === g
                ),
                D = s.get(g),
                E = o.get(g),
                L = RE(0, this._normalizer, 0, p.keyframes, D, E),
                de = this._buildPlayer(p, L, _);
              if ((p.subTimeline && r && d.add(g), y)) {
                const _e = new vp(e, a, g);
                _e.setRealPlayer(de), c.push(_e);
              }
              return de;
            });
          c.forEach((p) => {
            $t(this.playersByQueriedElement, p.element, []).push(p),
              p.onDone(() =>
                (function (n, e, t) {
                  let i;
                  if (n instanceof Map) {
                    if (((i = n.get(e)), i)) {
                      if (i.length) {
                        const r = i.indexOf(t);
                        i.splice(r, 1);
                      }
                      0 == i.length && n.delete(e);
                    }
                  } else if (((i = n[e]), i)) {
                    if (i.length) {
                      const r = i.indexOf(t);
                      i.splice(r, 1);
                    }
                    0 == i.length && delete n[e];
                  }
                  return i;
                })(this.playersByQueriedElement, p.element, p)
              );
          }),
            u.forEach((p) => an(p, HE));
          const f = Ei(h);
          return (
            f.onDestroy(() => {
              u.forEach((p) => Ms(p, HE)), Hn(l, t.toStyles);
            }),
            d.forEach((p) => {
              $t(r, p, []).push(f);
            }),
            f
          );
        }
        _buildPlayer(e, t, i) {
          return t.length > 0
            ? this.driver.animate(
                e.element,
                t,
                e.duration,
                e.delay,
                e.easing,
                i
              )
            : new Es(e.duration, e.delay);
        }
      }
      class vp {
        constructor(e, t, i) {
          (this.namespaceId = e),
            (this.triggerName = t),
            (this.element = i),
            (this._player = new Es()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = {}),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(e) {
          this._containsRealPlayer ||
            ((this._player = e),
            Object.keys(this._queuedCallbacks).forEach((t) => {
              this._queuedCallbacks[t].forEach((i) => Kf(e, t, void 0, i));
            }),
            (this._queuedCallbacks = {}),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(e.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(e) {
          this.totalTime = e;
        }
        syncPlayerEvents(e) {
          const t = this._player;
          t.triggerCallback && e.onStart(() => t.triggerCallback("start")),
            e.onDone(() => this.finish()),
            e.onDestroy(() => this.destroy());
        }
        _queueEvent(e, t) {
          $t(this._queuedCallbacks, e, []).push(t);
        }
        onDone(e) {
          this.queued && this._queueEvent("done", e), this._player.onDone(e);
        }
        onStart(e) {
          this.queued && this._queueEvent("start", e), this._player.onStart(e);
        }
        onDestroy(e) {
          this.queued && this._queueEvent("destroy", e),
            this._player.onDestroy(e);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(e) {
          this.queued || this._player.setPosition(e);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(e) {
          const t = this._player;
          t.triggerCallback && t.triggerCallback(e);
        }
      }
      function yc(n) {
        return n && 1 === n.nodeType;
      }
      function rw(n, e) {
        const t = n.style.display;
        return (n.style.display = null != e ? e : "none"), t;
      }
      function sw(n, e, t, i, r) {
        const s = [];
        t.forEach((l) => s.push(rw(l)));
        const o = [];
        i.forEach((l, c) => {
          const u = {};
          l.forEach((d) => {
            const h = (u[d] = e.computeStyle(c, d, r));
            (!h || 0 == h.length) && ((c[on] = I2), o.push(c));
          }),
            n.set(c, u);
        });
        let a = 0;
        return t.forEach((l) => rw(l, s[a++])), o;
      }
      function ow(n, e) {
        const t = new Map();
        if ((n.forEach((a) => t.set(a, [])), 0 == e.length)) return t;
        const r = new Set(e),
          s = new Map();
        function o(a) {
          if (!a) return 1;
          let l = s.get(a);
          if (l) return l;
          const c = a.parentNode;
          return (l = t.has(c) ? c : r.has(c) ? 1 : o(c)), s.set(a, l), l;
        }
        return (
          e.forEach((a) => {
            const l = o(a);
            1 !== l && t.get(l).push(a);
          }),
          t
        );
      }
      const vc = "$$classes";
      function an(n, e) {
        if (n.classList) n.classList.add(e);
        else {
          let t = n[vc];
          t || (t = n[vc] = {}), (t[e] = !0);
        }
      }
      function Ms(n, e) {
        if (n.classList) n.classList.remove(e);
        else {
          let t = n[vc];
          t && delete t[e];
        }
      }
      function P2(n, e, t) {
        Ei(t).onDone(() => n.processLeaveNode(e));
      }
      function aw(n, e) {
        for (let t = 0; t < n.length; t++) {
          const i = n[t];
          i instanceof TE ? aw(i.players, e) : e.push(i);
        }
      }
      function lw(n, e, t) {
        const i = t.get(n);
        if (!i) return !1;
        let r = e.get(n);
        return r ? i.forEach((s) => r.add(s)) : e.set(n, i), t.delete(n), !0;
      }
      class bc {
        constructor(e, t, i) {
          (this.bodyNode = e),
            (this._driver = t),
            (this._normalizer = i),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (r, s) => {}),
            (this._transitionEngine = new T2(e, t, i)),
            (this._timelineEngine = new E2(e, t, i)),
            (this._transitionEngine.onRemovalComplete = (r, s) =>
              this.onRemovalComplete(r, s));
        }
        registerTrigger(e, t, i, r, s) {
          const o = e + "-" + r;
          let a = this._triggerCache[o];
          if (!a) {
            const l = [],
              c = up(this._driver, s, l);
            if (l.length)
              throw new Error(
                `The animation trigger "${r}" has failed to build due to the following errors:\n - ${l.join(
                  "\n - "
                )}`
              );
            (a = (function (n, e, t) {
              return new b2(n, e, t);
            })(r, c, this._normalizer)),
              (this._triggerCache[o] = a);
          }
          this._transitionEngine.registerTrigger(t, r, a);
        }
        register(e, t) {
          this._transitionEngine.register(e, t);
        }
        destroy(e, t) {
          this._transitionEngine.destroy(e, t);
        }
        onInsert(e, t, i, r) {
          this._transitionEngine.insertNode(e, t, i, r);
        }
        onRemove(e, t, i, r) {
          this._transitionEngine.removeNode(e, t, r || !1, i);
        }
        disableAnimations(e, t) {
          this._transitionEngine.markElementAsDisabled(e, t);
        }
        process(e, t, i, r) {
          if ("@" == i.charAt(0)) {
            const [s, o] = OE(i);
            this._timelineEngine.command(s, t, o, r);
          } else this._transitionEngine.trigger(e, t, i, r);
        }
        listen(e, t, i, r, s) {
          if ("@" == i.charAt(0)) {
            const [o, a] = OE(i);
            return this._timelineEngine.listen(o, t, a, s);
          }
          return this._transitionEngine.listen(e, t, i, r, s);
        }
        flush(e = -1) {
          this._transitionEngine.flush(e);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      function cw(n, e) {
        let t = null,
          i = null;
        return (
          Array.isArray(e) && e.length
            ? ((t = bp(e[0])), e.length > 1 && (i = bp(e[e.length - 1])))
            : e && (t = bp(e)),
          t || i ? new L2(n, t, i) : null
        );
      }
      let L2 = (() => {
        class n {
          constructor(t, i, r) {
            (this._element = t),
              (this._startStyles = i),
              (this._endStyles = r),
              (this._state = 0);
            let s = n.initialStylesByElement.get(t);
            s || n.initialStylesByElement.set(t, (s = {})),
              (this._initialStyles = s);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                Hn(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (Hn(this._element, this._initialStyles),
                this._endStyles &&
                  (Hn(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (n.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (cr(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (cr(this._element, this._endStyles),
                  (this._endStyles = null)),
                Hn(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (n.initialStylesByElement = new WeakMap()), n;
      })();
      function bp(n) {
        let e = null;
        const t = Object.keys(n);
        for (let i = 0; i < t.length; i++) {
          const r = t[i];
          V2(r) && ((e = e || {}), (e[r] = n[r]));
        }
        return e;
      }
      function V2(n) {
        return "display" === n || "position" === n;
      }
      const uw = "animation",
        dw = "animationend";
      class j2 {
        constructor(e, t, i, r, s, o, a) {
          (this._element = e),
            (this._name = t),
            (this._duration = i),
            (this._delay = r),
            (this._easing = s),
            (this._fillMode = o),
            (this._onDoneFn = a),
            (this._finished = !1),
            (this._destroyed = !1),
            (this._startTime = 0),
            (this._position = 0),
            (this._eventFn = (l) => this._handleCallback(l));
        }
        apply() {
          (function (n, e) {
            const t = Dp(n, "").trim();
            let i = 0;
            t.length &&
              ((function (n, e) {
                let t = 0;
                for (let i = 0; i < n.length; i++) "," === n.charAt(i) && t++;
                return t;
              })(t) + 1,
              (e = `${t}, ${e}`)),
              Cc(n, "", e);
          })(
            this._element,
            `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`
          ),
            pw(this._element, this._eventFn, !1),
            (this._startTime = Date.now());
        }
        pause() {
          hw(this._element, this._name, "paused");
        }
        resume() {
          hw(this._element, this._name, "running");
        }
        setPosition(e) {
          const t = fw(this._element, this._name);
          (this._position = e * this._duration),
            Cc(this._element, "Delay", `-${this._position}ms`, t);
        }
        getPosition() {
          return this._position;
        }
        _handleCallback(e) {
          const t = e._ngTestManualTimestamp || Date.now(),
            i = 1e3 * parseFloat(e.elapsedTime.toFixed(3));
          e.animationName == this._name &&
            Math.max(t - this._startTime, 0) >= this._delay &&
            i >= this._duration &&
            this.finish();
        }
        finish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFn(),
            pw(this._element, this._eventFn, !0));
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.finish(),
            (function (n, e) {
              const i = Dp(n, "").split(","),
                r = Cp(i, e);
              r >= 0 && (i.splice(r, 1), Cc(n, "", i.join(",")));
            })(this._element, this._name));
        }
      }
      function hw(n, e, t) {
        Cc(n, "PlayState", t, fw(n, e));
      }
      function fw(n, e) {
        const t = Dp(n, "");
        return t.indexOf(",") > 0 ? Cp(t.split(","), e) : Cp([t], e);
      }
      function Cp(n, e) {
        for (let t = 0; t < n.length; t++) if (n[t].indexOf(e) >= 0) return t;
        return -1;
      }
      function pw(n, e, t) {
        t ? n.removeEventListener(dw, e) : n.addEventListener(dw, e);
      }
      function Cc(n, e, t, i) {
        const r = uw + e;
        if (null != i) {
          const s = n.style[r];
          if (s.length) {
            const o = s.split(",");
            (o[i] = t), (t = o.join(","));
          }
        }
        n.style[r] = t;
      }
      function Dp(n, e) {
        return n.style[uw + e] || "";
      }
      class mw {
        constructor(e, t, i, r, s, o, a, l) {
          (this.element = e),
            (this.keyframes = t),
            (this.animationName = i),
            (this._duration = r),
            (this._delay = s),
            (this._finalStyles = a),
            (this._specialStyles = l),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this.currentSnapshot = {}),
            (this._state = 0),
            (this.easing = o || "linear"),
            (this.totalTime = r + s),
            this._buildStyler();
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        destroy() {
          this.init(),
            !(this._state >= 4) &&
              ((this._state = 4),
              this._styler.destroy(),
              this._flushStartFns(),
              this._flushDoneFns(),
              this._specialStyles && this._specialStyles.destroy(),
              this._onDestroyFns.forEach((e) => e()),
              (this._onDestroyFns = []));
        }
        _flushDoneFns() {
          this._onDoneFns.forEach((e) => e()), (this._onDoneFns = []);
        }
        _flushStartFns() {
          this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
        }
        finish() {
          this.init(),
            !(this._state >= 3) &&
              ((this._state = 3),
              this._styler.finish(),
              this._flushStartFns(),
              this._specialStyles && this._specialStyles.finish(),
              this._flushDoneFns());
        }
        setPosition(e) {
          this._styler.setPosition(e);
        }
        getPosition() {
          return this._styler.getPosition();
        }
        hasStarted() {
          return this._state >= 2;
        }
        init() {
          this._state >= 1 ||
            ((this._state = 1),
            this._styler.apply(),
            this._delay && this._styler.pause());
        }
        play() {
          this.init(),
            this.hasStarted() ||
              (this._flushStartFns(),
              (this._state = 2),
              this._specialStyles && this._specialStyles.start()),
            this._styler.resume();
        }
        pause() {
          this.init(), this._styler.pause();
        }
        restart() {
          this.reset(), this.play();
        }
        reset() {
          (this._state = 0),
            this._styler.destroy(),
            this._buildStyler(),
            this._styler.apply();
        }
        _buildStyler() {
          this._styler = new j2(
            this.element,
            this.animationName,
            this._duration,
            this._delay,
            this.easing,
            "forwards",
            () => this.finish()
          );
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((i) => i()), (t.length = 0);
        }
        beforeDestroy() {
          this.init();
          const e = {};
          if (this.hasStarted()) {
            const t = this._state >= 3;
            Object.keys(this._finalStyles).forEach((i) => {
              "offset" != i &&
                (e[i] = t ? this._finalStyles[i] : cp(this.element, i));
            });
          }
          this.currentSnapshot = e;
        }
      }
      class q2 extends Es {
        constructor(e, t) {
          super(),
            (this.element = e),
            (this._startingStyles = {}),
            (this.__initialized = !1),
            (this._styles = LE(t));
        }
        init() {
          this.__initialized ||
            !this._startingStyles ||
            ((this.__initialized = !0),
            Object.keys(this._styles).forEach((e) => {
              this._startingStyles[e] = this.element.style[e];
            }),
            super.init());
        }
        play() {
          !this._startingStyles ||
            (this.init(),
            Object.keys(this._styles).forEach((e) =>
              this.element.style.setProperty(e, this._styles[e])
            ),
            super.play());
        }
        destroy() {
          !this._startingStyles ||
            (Object.keys(this._startingStyles).forEach((e) => {
              const t = this._startingStyles[e];
              t
                ? this.element.style.setProperty(e, t)
                : this.element.style.removeProperty(e);
            }),
            (this._startingStyles = null),
            super.destroy());
        }
      }
      class _w {
        constructor() {
          this._count = 0;
        }
        validateStyleProperty(e) {
          return Jf(e);
        }
        matchesElement(e, t) {
          return ep(e, t);
        }
        containsElement(e, t) {
          return tp(e, t);
        }
        query(e, t, i) {
          return np(e, t, i);
        }
        computeStyle(e, t, i) {
          return window.getComputedStyle(e)[t];
        }
        buildKeyframeElement(e, t, i) {
          i = i.map((a) => LE(a));
          let r = `@keyframes ${t} {\n`,
            s = "";
          i.forEach((a) => {
            s = " ";
            const l = parseFloat(a.offset);
            (r += `${s}${100 * l}% {\n`),
              (s += " "),
              Object.keys(a).forEach((c) => {
                const u = a[c];
                switch (c) {
                  case "offset":
                    return;
                  case "easing":
                    return void (
                      u && (r += `${s}animation-timing-function: ${u};\n`)
                    );
                  default:
                    return void (r += `${s}${c}: ${u};\n`);
                }
              }),
              (r += `${s}}\n`);
          }),
            (r += "}\n");
          const o = document.createElement("style");
          return (o.textContent = r), o;
        }
        animate(e, t, i, r, s, o = [], a) {
          const l = o.filter((m) => m instanceof mw),
            c = {};
          GE(i, r) &&
            l.forEach((m) => {
              let y = m.currentSnapshot;
              Object.keys(y).forEach((_) => (c[_] = y[_]));
            });
          const u = (function (n) {
            let e = {};
            return (
              n &&
                (Array.isArray(n) ? n : [n]).forEach((i) => {
                  Object.keys(i).forEach((r) => {
                    "offset" == r || "easing" == r || (e[r] = i[r]);
                  });
                }),
              e
            );
          })((t = WE(e, t, c)));
          if (0 == i) return new q2(e, u);
          const d = "gen_css_kf_" + this._count++,
            h = this.buildKeyframeElement(e, d, t);
          (function (n) {
            var t;
            const e = null == (t = n.getRootNode) ? void 0 : t.call(n);
            return "undefined" != typeof ShadowRoot && e instanceof ShadowRoot
              ? e
              : document.head;
          })(e).appendChild(h);
          const p = cw(e, t),
            g = new mw(e, t, d, i, r, s, u, p);
          return (
            g.onDestroy(() => {
              var n;
              (n = h).parentNode.removeChild(n);
            }),
            g
          );
        }
      }
      class vw {
        constructor(e, t, i, r) {
          (this.element = e),
            (this.keyframes = t),
            (this.options = i),
            (this._specialStyles = r),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = {}),
            (this._duration = i.duration),
            (this._delay = i.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const e = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            e,
            this.options
          )),
            (this._finalKeyframe = e.length ? e[e.length - 1] : {}),
            this.domPlayer.addEventListener("finish", () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _triggerWebAnimation(e, t, i) {
          return e.animate(t, i);
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((e) => e()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        setPosition(e) {
          void 0 === this.domPlayer && this.init(),
            (this.domPlayer.currentTime = e * this.time);
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const e = {};
          this.hasStarted() &&
            Object.keys(this._finalKeyframe).forEach((t) => {
              "offset" != t &&
                (e[t] = this._finished
                  ? this._finalKeyframe[t]
                  : cp(this.element, t));
            }),
            (this.currentSnapshot = e);
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((i) => i()), (t.length = 0);
        }
      }
      class Z2 {
        constructor() {
          (this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(
            bw().toString()
          )),
            (this._cssKeyframesDriver = new _w());
        }
        validateStyleProperty(e) {
          return Jf(e);
        }
        matchesElement(e, t) {
          return ep(e, t);
        }
        containsElement(e, t) {
          return tp(e, t);
        }
        query(e, t, i) {
          return np(e, t, i);
        }
        computeStyle(e, t, i) {
          return window.getComputedStyle(e)[t];
        }
        overrideWebAnimationsSupport(e) {
          this._isNativeImpl = e;
        }
        animate(e, t, i, r, s, o = [], a) {
          if (!a && !this._isNativeImpl)
            return this._cssKeyframesDriver.animate(e, t, i, r, s, o);
          const u = {
            duration: i,
            delay: r,
            fill: 0 == r ? "both" : "forwards",
          };
          s && (u.easing = s);
          const d = {},
            h = o.filter((p) => p instanceof vw);
          GE(i, r) &&
            h.forEach((p) => {
              let g = p.currentSnapshot;
              Object.keys(g).forEach((m) => (d[m] = g[m]));
            });
          const f = cw(e, (t = WE(e, (t = t.map((p) => wi(p, !1))), d)));
          return new vw(e, t, u, f);
        }
      }
      function bw() {
        return (AE() && Element.prototype.animate) || {};
      }
      let eH = (() => {
        class n extends ME {
          constructor(t, i) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = t.createRenderer(i.body, {
                id: "0",
                encapsulation: wt.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(t) {
            const i = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const r = Array.isArray(t) ? SE(t) : t;
            return (
              Cw(this._renderer, null, i, "register", [r]),
              new tH(i, this._renderer)
            );
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(b(Yi), b(Q));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class tH extends class {} {
        constructor(e, t) {
          super(), (this._id = e), (this._renderer = t);
        }
        create(e, t) {
          return new nH(this._id, e, t || {}, this._renderer);
        }
      }
      class nH {
        constructor(e, t, i, r) {
          (this.id = e),
            (this.element = t),
            (this._renderer = r),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", i);
        }
        _listen(e, t) {
          return this._renderer.listen(this.element, `@@${this.id}:${e}`, t);
        }
        _command(e, ...t) {
          return Cw(this._renderer, this.element, this.id, e, t);
        }
        onDone(e) {
          this._listen("done", e);
        }
        onStart(e) {
          this._listen("start", e);
        }
        onDestroy(e) {
          this._listen("destroy", e);
        }
        init() {
          this._command("init");
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command("play"), (this._started = !0);
        }
        pause() {
          this._command("pause");
        }
        restart() {
          this._command("restart");
        }
        finish() {
          this._command("finish");
        }
        destroy() {
          this._command("destroy");
        }
        reset() {
          this._command("reset"), (this._started = !1);
        }
        setPosition(e) {
          this._command("setPosition", e);
        }
        getPosition() {
          var e, t;
          return null !=
            (t =
              null == (e = this._renderer.engine.players[+this.id])
                ? void 0
                : e.getPosition())
            ? t
            : 0;
        }
      }
      function Cw(n, e, t, i, r) {
        return n.setProperty(e, `@@${t}:${i}`, r);
      }
      const Dw = "@.disabled";
      let iH = (() => {
        class n {
          constructor(t, i, r) {
            (this.delegate = t),
              (this.engine = i),
              (this._zone = r),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (i.onRemovalComplete = (s, o) => {
                const a = null == o ? void 0 : o.parentNode(s);
                a && o.removeChild(a, s);
              });
          }
          createRenderer(t, i) {
            const s = this.delegate.createRenderer(t, i);
            if (!(t && i && i.data && i.data.animation)) {
              let u = this._rendererCache.get(s);
              return (
                u ||
                  ((u = new Ew("", s, this.engine)),
                  this._rendererCache.set(s, u)),
                u
              );
            }
            const o = i.id,
              a = i.id + "-" + this._currentId;
            this._currentId++, this.engine.register(a, t);
            const l = (u) => {
              Array.isArray(u)
                ? u.forEach(l)
                : this.engine.registerTrigger(o, a, t, u.name, u);
            };
            return i.data.animation.forEach(l), new rH(this, a, s, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(t, i, r) {
            t >= 0 && t < this._microtaskId
              ? this._zone.run(() => i(r))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach((s) => {
                        const [o, a] = s;
                        o(a);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([i, r]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(b(Yi), b(bc), b(oe));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class Ew {
        constructor(e, t, i) {
          (this.namespaceId = e),
            (this.delegate = t),
            (this.engine = i),
            (this.destroyNode = this.delegate.destroyNode
              ? (r) => t.destroyNode(r)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy();
        }
        createElement(e, t) {
          return this.delegate.createElement(e, t);
        }
        createComment(e) {
          return this.delegate.createComment(e);
        }
        createText(e) {
          return this.delegate.createText(e);
        }
        appendChild(e, t) {
          this.delegate.appendChild(e, t),
            this.engine.onInsert(this.namespaceId, t, e, !1);
        }
        insertBefore(e, t, i, r = !0) {
          this.delegate.insertBefore(e, t, i),
            this.engine.onInsert(this.namespaceId, t, e, r);
        }
        removeChild(e, t, i) {
          this.engine.onRemove(this.namespaceId, t, this.delegate, i);
        }
        selectRootElement(e, t) {
          return this.delegate.selectRootElement(e, t);
        }
        parentNode(e) {
          return this.delegate.parentNode(e);
        }
        nextSibling(e) {
          return this.delegate.nextSibling(e);
        }
        setAttribute(e, t, i, r) {
          this.delegate.setAttribute(e, t, i, r);
        }
        removeAttribute(e, t, i) {
          this.delegate.removeAttribute(e, t, i);
        }
        addClass(e, t) {
          this.delegate.addClass(e, t);
        }
        removeClass(e, t) {
          this.delegate.removeClass(e, t);
        }
        setStyle(e, t, i, r) {
          this.delegate.setStyle(e, t, i, r);
        }
        removeStyle(e, t, i) {
          this.delegate.removeStyle(e, t, i);
        }
        setProperty(e, t, i) {
          "@" == t.charAt(0) && t == Dw
            ? this.disableAnimations(e, !!i)
            : this.delegate.setProperty(e, t, i);
        }
        setValue(e, t) {
          this.delegate.setValue(e, t);
        }
        listen(e, t, i) {
          return this.delegate.listen(e, t, i);
        }
        disableAnimations(e, t) {
          this.engine.disableAnimations(e, t);
        }
      }
      class rH extends Ew {
        constructor(e, t, i, r) {
          super(t, i, r), (this.factory = e), (this.namespaceId = t);
        }
        setProperty(e, t, i) {
          "@" == t.charAt(0)
            ? "." == t.charAt(1) && t == Dw
              ? this.disableAnimations(e, (i = void 0 === i || !!i))
              : this.engine.process(this.namespaceId, e, t.substr(1), i)
            : this.delegate.setProperty(e, t, i);
        }
        listen(e, t, i) {
          if ("@" == t.charAt(0)) {
            const r = (function (n) {
              switch (n) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return n;
              }
            })(e);
            let s = t.substr(1),
              o = "";
            return (
              "@" != s.charAt(0) &&
                ([s, o] = (function (n) {
                  const e = n.indexOf(".");
                  return [n.substring(0, e), n.substr(e + 1)];
                })(s)),
              this.engine.listen(this.namespaceId, r, s, o, (a) => {
                this.factory.scheduleListenerCallback(a._data || -1, i, a);
              })
            );
          }
          return this.delegate.listen(e, t, i);
        }
      }
      let aH = (() => {
        class n extends bc {
          constructor(t, i, r) {
            super(t.body, i, r);
          }
          ngOnDestroy() {
            this.flush();
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(b(Q), b(ip), b(mp));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const xs = new x("AnimationModuleType"),
        ww = [
          { provide: ME, useClass: eH },
          {
            provide: mp,
            useFactory: function () {
              return new p2();
            },
          },
          { provide: bc, useClass: aH },
          {
            provide: Yi,
            useFactory: function (n, e, t) {
              return new iH(n, e, t);
            },
            deps: [ql, bc, oe],
          },
        ],
        Mw = [
          {
            provide: ip,
            useFactory: function () {
              return "function" == typeof bw() ? new Z2() : new _w();
            },
          },
          { provide: xs, useValue: "BrowserAnimations" },
          ...ww,
        ],
        dH = [
          { provide: ip, useClass: VE },
          { provide: xs, useValue: "NoopAnimations" },
          ...ww,
        ];
      let hH = (() => {
        class n {
          static withConfig(t) {
            return { ngModule: n, providers: t.disableAnimations ? dH : Mw };
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵmod = be({ type: n })),
          (n.ɵinj = pe({ providers: Mw, imports: [FD] })),
          n
        );
      })();
      const xw = new Xi("13.0.2"),
        Sw = new Xi("13.0.2"),
        pH = new x("mat-sanity-checks", {
          providedIn: "root",
          factory: function () {
            return !0;
          },
        });
      let Qe = (() => {
        class n {
          constructor(t, i, r) {
            (this._hasDoneGlobalChecks = !1),
              (this._document = r),
              t._applyBodyHighContrastModeCssClasses(),
              (this._sanityChecks = i),
              this._hasDoneGlobalChecks ||
                (this._checkDoctypeIsDefined(),
                this._checkThemeIsPresent(),
                this._checkCdkVersionMatch(),
                (this._hasDoneGlobalChecks = !0));
          }
          _checkIsEnabled(t) {
            return (
              !(!bh() || Tf()) &&
              ("boolean" == typeof this._sanityChecks
                ? this._sanityChecks
                : !!this._sanityChecks[t])
            );
          }
          _checkDoctypeIsDefined() {
            this._checkIsEnabled("doctype") &&
              !this._document.doctype &&
              console.warn(
                "Current document does not have a doctype. This may cause some Angular Material components not to behave as expected."
              );
          }
          _checkThemeIsPresent() {
            if (
              !this._checkIsEnabled("theme") ||
              !this._document.body ||
              "function" != typeof getComputedStyle
            )
              return;
            const t = this._document.createElement("div");
            t.classList.add("mat-theme-loaded-marker"),
              this._document.body.appendChild(t);
            const i = getComputedStyle(t);
            i &&
              "none" !== i.display &&
              console.warn(
                "Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming"
              ),
              t.remove();
          }
          _checkCdkVersionMatch() {
            this._checkIsEnabled("version") &&
              Sw.full !== xw.full &&
              console.warn(
                "The Angular Material version (" +
                  Sw.full +
                  ") does not match the Angular CDK version (" +
                  xw.full +
                  ").\nPlease ensure the versions of these two packages exactly match."
              );
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(b(vB), b(pH, 8), b(Q));
          }),
          (n.ɵmod = be({ type: n })),
          (n.ɵinj = pe({ imports: [[qo], qo] })),
          n
        );
      })();
      function Iw(n) {
        return class extends n {
          constructor(...e) {
            super(...e), (this._disabled = !1);
          }
          get disabled() {
            return this._disabled;
          }
          set disabled(e) {
            this._disabled = At(e);
          }
        };
      }
      function Ep(n, e) {
        return class extends n {
          constructor(...t) {
            super(...t), (this.defaultColor = e), (this.color = e);
          }
          get color() {
            return this._color;
          }
          set color(t) {
            const i = t || this.defaultColor;
            i !== this._color &&
              (this._color &&
                this._elementRef.nativeElement.classList.remove(
                  `mat-${this._color}`
                ),
              i && this._elementRef.nativeElement.classList.add(`mat-${i}`),
              (this._color = i));
          }
        };
      }
      function Ec(n) {
        return class extends n {
          constructor(...e) {
            super(...e), (this._disableRipple = !1);
          }
          get disableRipple() {
            return this._disableRipple;
          }
          set disableRipple(e) {
            this._disableRipple = At(e);
          }
        };
      }
      function mH(n, e = 0) {
        return class extends n {
          constructor(...t) {
            super(...t), (this._tabIndex = e), (this.defaultTabIndex = e);
          }
          get tabIndex() {
            return this.disabled ? -1 : this._tabIndex;
          }
          set tabIndex(t) {
            this._tabIndex = null != t ? Cf(t) : this.defaultTabIndex;
          }
        };
      }
      let kw = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵmod = be({ type: n })),
          (n.ɵinj = pe({ imports: [[Qe], Qe] })),
          n
        );
      })();
      class vH {
        constructor(e, t, i) {
          (this._renderer = e),
            (this.element = t),
            (this.config = i),
            (this.state = 3);
        }
        fadeOut() {
          this._renderer.fadeOutRipple(this);
        }
      }
      const Tw = { enterDuration: 225, exitDuration: 150 },
        wp = rr({ passive: !0 }),
        Aw = ["mousedown", "touchstart"],
        Rw = ["mouseup", "mouseleave", "touchend", "touchcancel"];
      class CH {
        constructor(e, t, i, r) {
          (this._target = e),
            (this._ngZone = t),
            (this._isPointerDown = !1),
            (this._activeRipples = new Set()),
            (this._pointerUpEventsRegistered = !1),
            r.isBrowser && (this._containerElement = He(i));
        }
        fadeInRipple(e, t, i = {}) {
          const r = (this._containerRect =
              this._containerRect ||
              this._containerElement.getBoundingClientRect()),
            s = Z(Z({}, Tw), i.animation);
          i.centered &&
            ((e = r.left + r.width / 2), (t = r.top + r.height / 2));
          const o =
              i.radius ||
              (function (n, e, t) {
                const i = Math.max(Math.abs(n - t.left), Math.abs(n - t.right)),
                  r = Math.max(Math.abs(e - t.top), Math.abs(e - t.bottom));
                return Math.sqrt(i * i + r * r);
              })(e, t, r),
            a = e - r.left,
            l = t - r.top,
            c = s.enterDuration,
            u = document.createElement("div");
          u.classList.add("mat-ripple-element"),
            (u.style.left = a - o + "px"),
            (u.style.top = l - o + "px"),
            (u.style.height = 2 * o + "px"),
            (u.style.width = 2 * o + "px"),
            null != i.color && (u.style.backgroundColor = i.color),
            (u.style.transitionDuration = `${c}ms`),
            this._containerElement.appendChild(u),
            window.getComputedStyle(u).getPropertyValue("opacity"),
            (u.style.transform = "scale(1)");
          const d = new vH(this, u, i);
          return (
            (d.state = 0),
            this._activeRipples.add(d),
            i.persistent || (this._mostRecentTransientRipple = d),
            this._runTimeoutOutsideZone(() => {
              const h = d === this._mostRecentTransientRipple;
              (d.state = 1),
                !i.persistent && (!h || !this._isPointerDown) && d.fadeOut();
            }, c),
            d
          );
        }
        fadeOutRipple(e) {
          const t = this._activeRipples.delete(e);
          if (
            (e === this._mostRecentTransientRipple &&
              (this._mostRecentTransientRipple = null),
            this._activeRipples.size || (this._containerRect = null),
            !t)
          )
            return;
          const i = e.element,
            r = Z(Z({}, Tw), e.config.animation);
          (i.style.transitionDuration = `${r.exitDuration}ms`),
            (i.style.opacity = "0"),
            (e.state = 2),
            this._runTimeoutOutsideZone(() => {
              (e.state = 3), i.remove();
            }, r.exitDuration);
        }
        fadeOutAll() {
          this._activeRipples.forEach((e) => e.fadeOut());
        }
        fadeOutAllNonPersistent() {
          this._activeRipples.forEach((e) => {
            e.config.persistent || e.fadeOut();
          });
        }
        setupTriggerEvents(e) {
          const t = He(e);
          !t ||
            t === this._triggerElement ||
            (this._removeTriggerEvents(),
            (this._triggerElement = t),
            this._registerEvents(Aw));
        }
        handleEvent(e) {
          "mousedown" === e.type
            ? this._onMousedown(e)
            : "touchstart" === e.type
            ? this._onTouchStart(e)
            : this._onPointerUp(),
            this._pointerUpEventsRegistered ||
              (this._registerEvents(Rw),
              (this._pointerUpEventsRegistered = !0));
        }
        _onMousedown(e) {
          const t = Of(e),
            i =
              this._lastTouchStartEvent &&
              Date.now() < this._lastTouchStartEvent + 800;
          !this._target.rippleDisabled &&
            !t &&
            !i &&
            ((this._isPointerDown = !0),
            this.fadeInRipple(e.clientX, e.clientY, this._target.rippleConfig));
        }
        _onTouchStart(e) {
          if (!this._target.rippleDisabled && !Pf(e)) {
            (this._lastTouchStartEvent = Date.now()),
              (this._isPointerDown = !0);
            const t = e.changedTouches;
            for (let i = 0; i < t.length; i++)
              this.fadeInRipple(
                t[i].clientX,
                t[i].clientY,
                this._target.rippleConfig
              );
          }
        }
        _onPointerUp() {
          !this._isPointerDown ||
            ((this._isPointerDown = !1),
            this._activeRipples.forEach((e) => {
              !e.config.persistent &&
                (1 === e.state ||
                  (e.config.terminateOnPointerUp && 0 === e.state)) &&
                e.fadeOut();
            }));
        }
        _runTimeoutOutsideZone(e, t = 0) {
          this._ngZone.runOutsideAngular(() => setTimeout(e, t));
        }
        _registerEvents(e) {
          this._ngZone.runOutsideAngular(() => {
            e.forEach((t) => {
              this._triggerElement.addEventListener(t, this, wp);
            });
          });
        }
        _removeTriggerEvents() {
          this._triggerElement &&
            (Aw.forEach((e) => {
              this._triggerElement.removeEventListener(e, this, wp);
            }),
            this._pointerUpEventsRegistered &&
              Rw.forEach((e) => {
                this._triggerElement.removeEventListener(e, this, wp);
              }));
        }
      }
      const wH = new x("mat-ripple-global-options");
      let ta = (() => {
          class n {
            constructor(t, i, r, s, o) {
              (this._elementRef = t),
                (this._animationMode = o),
                (this.radius = 0),
                (this._disabled = !1),
                (this._isInitialized = !1),
                (this._globalOptions = s || {}),
                (this._rippleRenderer = new CH(this, i, t, r));
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(t) {
              t && this.fadeOutAllNonPersistent(),
                (this._disabled = t),
                this._setupTriggerEventsIfEnabled();
            }
            get trigger() {
              return this._trigger || this._elementRef.nativeElement;
            }
            set trigger(t) {
              (this._trigger = t), this._setupTriggerEventsIfEnabled();
            }
            ngOnInit() {
              (this._isInitialized = !0), this._setupTriggerEventsIfEnabled();
            }
            ngOnDestroy() {
              this._rippleRenderer._removeTriggerEvents();
            }
            fadeOutAll() {
              this._rippleRenderer.fadeOutAll();
            }
            fadeOutAllNonPersistent() {
              this._rippleRenderer.fadeOutAllNonPersistent();
            }
            get rippleConfig() {
              return {
                centered: this.centered,
                radius: this.radius,
                color: this.color,
                animation: Z(
                  Z(
                    Z({}, this._globalOptions.animation),
                    "NoopAnimations" === this._animationMode
                      ? { enterDuration: 0, exitDuration: 0 }
                      : {}
                  ),
                  this.animation
                ),
                terminateOnPointerUp: this._globalOptions.terminateOnPointerUp,
              };
            }
            get rippleDisabled() {
              return this.disabled || !!this._globalOptions.disabled;
            }
            _setupTriggerEventsIfEnabled() {
              !this.disabled &&
                this._isInitialized &&
                this._rippleRenderer.setupTriggerEvents(this.trigger);
            }
            launch(t, i = 0, r) {
              return "number" == typeof t
                ? this._rippleRenderer.fadeInRipple(
                    t,
                    i,
                    Z(Z({}, this.rippleConfig), r)
                  )
                : this._rippleRenderer.fadeInRipple(
                    0,
                    0,
                    Z(Z({}, this.rippleConfig), t)
                  );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(v(ge), v(oe), v(ti), v(wH, 8), v(xs, 8));
            }),
            (n.ɵdir = O({
              type: n,
              selectors: [
                ["", "mat-ripple", ""],
                ["", "matRipple", ""],
              ],
              hostAttrs: [1, "mat-ripple"],
              hostVars: 2,
              hostBindings: function (t, i) {
                2 & t && kt("mat-ripple-unbounded", i.unbounded);
              },
              inputs: {
                color: ["matRippleColor", "color"],
                unbounded: ["matRippleUnbounded", "unbounded"],
                centered: ["matRippleCentered", "centered"],
                radius: ["matRippleRadius", "radius"],
                animation: ["matRippleAnimation", "animation"],
                disabled: ["matRippleDisabled", "disabled"],
                trigger: ["matRippleTrigger", "trigger"],
              },
              exportAs: ["matRipple"],
            })),
            n
          );
        })(),
        wc = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = be({ type: n })),
            (n.ɵinj = pe({ imports: [[Qe, WD], Qe] })),
            n
          );
        })(),
        Ow = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = be({ type: n })),
            (n.ɵinj = pe({ imports: [[Qe]] })),
            n
          );
        })();
      const { isArray: SH } = Array,
        { getPrototypeOf: IH, prototype: kH, keys: TH } = Object;
      function OH(n, e) {
        return n.reduce((t, i, r) => ((t[i] = e[r]), t), {});
      }
      function Pw(...n) {
        const e = (function (n) {
            return $(Kc(n)) ? n.pop() : void 0;
          })(n),
          { args: t, keys: i } = (function (n) {
            if (1 === n.length) {
              const e = n[0];
              if (SH(e)) return { args: e, keys: null };
              if (
                (function (n) {
                  return n && "object" == typeof n && IH(n) === kH;
                })(e)
              ) {
                const t = TH(e);
                return { args: t.map((i) => e[i]), keys: t };
              }
            }
            return { args: n, keys: null };
          })(n),
          r = new Se((s) => {
            const { length: o } = t;
            if (!o) return void s.complete();
            const a = new Array(o);
            let l = o,
              c = o;
            for (let u = 0; u < o; u++) {
              let d = !1;
              qt(t[u]).subscribe(
                new et(
                  s,
                  (h) => {
                    d || ((d = !0), c--), (a[u] = h);
                  },
                  () => l--,
                  void 0,
                  () => {
                    (!l || !d) && (c || s.next(i ? OH(i, a) : a), s.complete());
                  }
                )
              );
            }
          });
        return e ? r.pipe(VD(e)) : r;
      }
      function Fw(n) {
        return Je((e, t) => {
          let s,
            i = null,
            r = !1;
          (i = e.subscribe(
            new et(t, void 0, void 0, (o) => {
              (s = qt(n(o, Fw(n)(e)))),
                i ? (i.unsubscribe(), (i = null), s.subscribe(t)) : (r = !0);
            })
          )),
            r && (i.unsubscribe(), (i = null), s.subscribe(t));
        });
      }
      class NH {}
      class Mi {
        constructor(e) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            e
              ? (this.lazyInit =
                  "string" == typeof e
                    ? () => {
                        (this.headers = new Map()),
                          e.split("\n").forEach((t) => {
                            const i = t.indexOf(":");
                            if (i > 0) {
                              const r = t.slice(0, i),
                                s = r.toLowerCase(),
                                o = t.slice(i + 1).trim();
                              this.maybeSetNormalizedName(r, s),
                                this.headers.has(s)
                                  ? this.headers.get(s).push(o)
                                  : this.headers.set(s, [o]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(e).forEach((t) => {
                            let i = e[t];
                            const r = t.toLowerCase();
                            "string" == typeof i && (i = [i]),
                              i.length > 0 &&
                                (this.headers.set(r, i),
                                this.maybeSetNormalizedName(t, r));
                          });
                      })
              : (this.headers = new Map());
        }
        has(e) {
          return this.init(), this.headers.has(e.toLowerCase());
        }
        get(e) {
          this.init();
          const t = this.headers.get(e.toLowerCase());
          return t && t.length > 0 ? t[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(e) {
          return this.init(), this.headers.get(e.toLowerCase()) || null;
        }
        append(e, t) {
          return this.clone({ name: e, value: t, op: "a" });
        }
        set(e, t) {
          return this.clone({ name: e, value: t, op: "s" });
        }
        delete(e, t) {
          return this.clone({ name: e, value: t, op: "d" });
        }
        maybeSetNormalizedName(e, t) {
          this.normalizedNames.has(t) || this.normalizedNames.set(t, e);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Mi
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((e) => this.applyUpdate(e)),
              (this.lazyUpdate = null)));
        }
        copyFrom(e) {
          e.init(),
            Array.from(e.headers.keys()).forEach((t) => {
              this.headers.set(t, e.headers.get(t)),
                this.normalizedNames.set(t, e.normalizedNames.get(t));
            });
        }
        clone(e) {
          const t = new Mi();
          return (
            (t.lazyInit =
              this.lazyInit && this.lazyInit instanceof Mi
                ? this.lazyInit
                : this),
            (t.lazyUpdate = (this.lazyUpdate || []).concat([e])),
            t
          );
        }
        applyUpdate(e) {
          const t = e.name.toLowerCase();
          switch (e.op) {
            case "a":
            case "s":
              let i = e.value;
              if (("string" == typeof i && (i = [i]), 0 === i.length)) return;
              this.maybeSetNormalizedName(e.name, t);
              const r = ("a" === e.op ? this.headers.get(t) : void 0) || [];
              r.push(...i), this.headers.set(t, r);
              break;
            case "d":
              const s = e.value;
              if (s) {
                let o = this.headers.get(t);
                if (!o) return;
                (o = o.filter((a) => -1 === s.indexOf(a))),
                  0 === o.length
                    ? (this.headers.delete(t), this.normalizedNames.delete(t))
                    : this.headers.set(t, o);
              } else this.headers.delete(t), this.normalizedNames.delete(t);
          }
        }
        forEach(e) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((t) =>
              e(this.normalizedNames.get(t), this.headers.get(t))
            );
        }
      }
      class LH {
        encodeKey(e) {
          return Nw(e);
        }
        encodeValue(e) {
          return Nw(e);
        }
        decodeKey(e) {
          return decodeURIComponent(e);
        }
        decodeValue(e) {
          return decodeURIComponent(e);
        }
      }
      const BH = /%(\d[a-f0-9])/gi,
        HH = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "2B": "+",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function Nw(n) {
        return encodeURIComponent(n).replace(BH, (e, t) => {
          var i;
          return null != (i = HH[t]) ? i : e;
        });
      }
      function Lw(n) {
        return `${n}`;
      }
      class xi {
        constructor(e = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = e.encoder || new LH()),
            e.fromString)
          ) {
            if (e.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function (n, e) {
              const t = new Map();
              return (
                n.length > 0 &&
                  n
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((r) => {
                      const s = r.indexOf("="),
                        [o, a] =
                          -1 == s
                            ? [e.decodeKey(r), ""]
                            : [
                                e.decodeKey(r.slice(0, s)),
                                e.decodeValue(r.slice(s + 1)),
                              ],
                        l = t.get(o) || [];
                      l.push(a), t.set(o, l);
                    }),
                t
              );
            })(e.fromString, this.encoder);
          } else
            e.fromObject
              ? ((this.map = new Map()),
                Object.keys(e.fromObject).forEach((t) => {
                  const i = e.fromObject[t];
                  this.map.set(t, Array.isArray(i) ? i : [i]);
                }))
              : (this.map = null);
        }
        has(e) {
          return this.init(), this.map.has(e);
        }
        get(e) {
          this.init();
          const t = this.map.get(e);
          return t ? t[0] : null;
        }
        getAll(e) {
          return this.init(), this.map.get(e) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(e, t) {
          return this.clone({ param: e, value: t, op: "a" });
        }
        appendAll(e) {
          const t = [];
          return (
            Object.keys(e).forEach((i) => {
              const r = e[i];
              Array.isArray(r)
                ? r.forEach((s) => {
                    t.push({ param: i, value: s, op: "a" });
                  })
                : t.push({ param: i, value: r, op: "a" });
            }),
            this.clone(t)
          );
        }
        set(e, t) {
          return this.clone({ param: e, value: t, op: "s" });
        }
        delete(e, t) {
          return this.clone({ param: e, value: t, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((e) => {
                const t = this.encoder.encodeKey(e);
                return this.map
                  .get(e)
                  .map((i) => t + "=" + this.encoder.encodeValue(i))
                  .join("&");
              })
              .filter((e) => "" !== e)
              .join("&")
          );
        }
        clone(e) {
          const t = new xi({ encoder: this.encoder });
          return (
            (t.cloneFrom = this.cloneFrom || this),
            (t.updates = (this.updates || []).concat(e)),
            t
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((e) => this.map.set(e, this.cloneFrom.map.get(e))),
              this.updates.forEach((e) => {
                switch (e.op) {
                  case "a":
                  case "s":
                    const t =
                      ("a" === e.op ? this.map.get(e.param) : void 0) || [];
                    t.push(Lw(e.value)), this.map.set(e.param, t);
                    break;
                  case "d":
                    if (void 0 === e.value) {
                      this.map.delete(e.param);
                      break;
                    }
                    {
                      let i = this.map.get(e.param) || [];
                      const r = i.indexOf(Lw(e.value));
                      -1 !== r && i.splice(r, 1),
                        i.length > 0
                          ? this.map.set(e.param, i)
                          : this.map.delete(e.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class jH {
        constructor() {
          this.map = new Map();
        }
        set(e, t) {
          return this.map.set(e, t), this;
        }
        get(e) {
          return (
            this.map.has(e) || this.map.set(e, e.defaultValue()),
            this.map.get(e)
          );
        }
        delete(e) {
          return this.map.delete(e), this;
        }
        keys() {
          return this.map.keys();
        }
      }
      function Vw(n) {
        return "undefined" != typeof ArrayBuffer && n instanceof ArrayBuffer;
      }
      function Bw(n) {
        return "undefined" != typeof Blob && n instanceof Blob;
      }
      function Hw(n) {
        return "undefined" != typeof FormData && n instanceof FormData;
      }
      class na {
        constructor(e, t, i, r) {
          let s;
          if (
            ((this.url = t),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = e.toUpperCase()),
            (function (n) {
              switch (n) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || r
              ? ((this.body = void 0 !== i ? i : null), (s = r))
              : (s = i),
            s &&
              ((this.reportProgress = !!s.reportProgress),
              (this.withCredentials = !!s.withCredentials),
              s.responseType && (this.responseType = s.responseType),
              s.headers && (this.headers = s.headers),
              s.context && (this.context = s.context),
              s.params && (this.params = s.params)),
            this.headers || (this.headers = new Mi()),
            this.context || (this.context = new jH()),
            this.params)
          ) {
            const o = this.params.toString();
            if (0 === o.length) this.urlWithParams = t;
            else {
              const a = t.indexOf("?");
              this.urlWithParams =
                t + (-1 === a ? "?" : a < t.length - 1 ? "&" : "") + o;
            }
          } else (this.params = new xi()), (this.urlWithParams = t);
        }
        serializeBody() {
          return null === this.body
            ? null
            : Vw(this.body) ||
              Bw(this.body) ||
              Hw(this.body) ||
              ("undefined" != typeof URLSearchParams &&
                this.body instanceof URLSearchParams) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof xi
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || Hw(this.body)
            ? null
            : Bw(this.body)
            ? this.body.type || null
            : Vw(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof xi
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(e = {}) {
          var d;
          const t = e.method || this.method,
            i = e.url || this.url,
            r = e.responseType || this.responseType,
            s = void 0 !== e.body ? e.body : this.body,
            o =
              void 0 !== e.withCredentials
                ? e.withCredentials
                : this.withCredentials,
            a =
              void 0 !== e.reportProgress
                ? e.reportProgress
                : this.reportProgress;
          let l = e.headers || this.headers,
            c = e.params || this.params;
          const u = null != (d = e.context) ? d : this.context;
          return (
            void 0 !== e.setHeaders &&
              (l = Object.keys(e.setHeaders).reduce(
                (h, f) => h.set(f, e.setHeaders[f]),
                l
              )),
            e.setParams &&
              (c = Object.keys(e.setParams).reduce(
                (h, f) => h.set(f, e.setParams[f]),
                c
              )),
            new na(t, i, s, {
              params: c,
              headers: l,
              context: u,
              reportProgress: a,
              responseType: r,
              withCredentials: o,
            })
          );
        }
      }
      var Xe = (() => (
        ((Xe = Xe || {})[(Xe.Sent = 0)] = "Sent"),
        (Xe[(Xe.UploadProgress = 1)] = "UploadProgress"),
        (Xe[(Xe.ResponseHeader = 2)] = "ResponseHeader"),
        (Xe[(Xe.DownloadProgress = 3)] = "DownloadProgress"),
        (Xe[(Xe.Response = 4)] = "Response"),
        (Xe[(Xe.User = 5)] = "User"),
        Xe
      ))();
      class Mp extends class {
        constructor(e, t = 200, i = "OK") {
          (this.headers = e.headers || new Mi()),
            (this.status = void 0 !== e.status ? e.status : t),
            (this.statusText = e.statusText || i),
            (this.url = e.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      } {
        constructor(e = {}) {
          super(e),
            (this.type = Xe.Response),
            (this.body = void 0 !== e.body ? e.body : null);
        }
        clone(e = {}) {
          return new Mp({
            body: void 0 !== e.body ? e.body : this.body,
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0,
          });
        }
      }
      function xp(n, e) {
        return {
          body: e,
          headers: n.headers,
          context: n.context,
          observe: n.observe,
          params: n.params,
          reportProgress: n.reportProgress,
          responseType: n.responseType,
          withCredentials: n.withCredentials,
        };
      }
      let Uw = (() => {
        class n {
          constructor(t) {
            this.handler = t;
          }
          request(t, i, r = {}) {
            let s;
            if (t instanceof na) s = t;
            else {
              let l, c;
              (l = r.headers instanceof Mi ? r.headers : new Mi(r.headers)),
                r.params &&
                  (c =
                    r.params instanceof xi
                      ? r.params
                      : new xi({ fromObject: r.params })),
                (s = new na(t, i, void 0 !== r.body ? r.body : null, {
                  headers: l,
                  context: r.context,
                  params: c,
                  reportProgress: r.reportProgress,
                  responseType: r.responseType || "json",
                  withCredentials: r.withCredentials,
                }));
            }
            const o = Di(s).pipe(
              (function (n, e) {
                return $(e) ? As(n, e, 1) : As(n, 1);
              })((l) => this.handler.handle(l))
            );
            if (t instanceof na || "events" === r.observe) return o;
            const a = o.pipe(Xl((l) => l instanceof Mp));
            switch (r.observe || "body") {
              case "body":
                switch (s.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      Et((l) => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return l.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      Et((l) => {
                        if (null !== l.body && !(l.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return l.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      Et((l) => {
                        if (null !== l.body && "string" != typeof l.body)
                          throw new Error("Response is not a string.");
                        return l.body;
                      })
                    );
                  default:
                    return a.pipe(Et((l) => l.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${r.observe}}`
                );
            }
          }
          delete(t, i = {}) {
            return this.request("DELETE", t, i);
          }
          get(t, i = {}) {
            return this.request("GET", t, i);
          }
          head(t, i = {}) {
            return this.request("HEAD", t, i);
          }
          jsonp(t, i) {
            return this.request("JSONP", t, {
              params: new xi().append(i, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(t, i = {}) {
            return this.request("OPTIONS", t, i);
          }
          patch(t, i, r = {}) {
            return this.request("PATCH", t, xp(r, i));
          }
          post(t, i, r = {}) {
            return this.request("POST", t, xp(r, i));
          }
          put(t, i, r = {}) {
            return this.request("PUT", t, xp(r, i));
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(b(NH));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const WH = ["*"];
      let Mc;
      function ia(n) {
        var e;
        return (
          (null ==
          (e = (function () {
            if (void 0 === Mc && ((Mc = null), "undefined" != typeof window)) {
              const n = window;
              void 0 !== n.trustedTypes &&
                (Mc = n.trustedTypes.createPolicy("angular#components", {
                  createHTML: (e) => e,
                }));
            }
            return Mc;
          })())
            ? void 0
            : e.createHTML(n)) || n
        );
      }
      function zw(n) {
        return Error(`Unable to find icon with the name "${n}"`);
      }
      function $w(n) {
        return Error(
          `The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${n}".`
        );
      }
      function Gw(n) {
        return Error(
          `The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${n}".`
        );
      }
      class dr {
        constructor(e, t, i) {
          (this.url = e), (this.svgText = t), (this.options = i);
        }
      }
      let xc = (() => {
        class n {
          constructor(t, i, r, s) {
            (this._httpClient = t),
              (this._sanitizer = i),
              (this._errorHandler = s),
              (this._svgIconConfigs = new Map()),
              (this._iconSetConfigs = new Map()),
              (this._cachedIconsByUrl = new Map()),
              (this._inProgressUrlFetches = new Map()),
              (this._fontCssClassesByAlias = new Map()),
              (this._resolvers = []),
              (this._defaultFontSetClass = "material-icons"),
              (this._document = r);
          }
          addSvgIcon(t, i, r) {
            return this.addSvgIconInNamespace("", t, i, r);
          }
          addSvgIconLiteral(t, i, r) {
            return this.addSvgIconLiteralInNamespace("", t, i, r);
          }
          addSvgIconInNamespace(t, i, r, s) {
            return this._addSvgIconConfig(t, i, new dr(r, null, s));
          }
          addSvgIconResolver(t) {
            return this._resolvers.push(t), this;
          }
          addSvgIconLiteralInNamespace(t, i, r, s) {
            const o = this._sanitizer.sanitize(ne.HTML, r);
            if (!o) throw Gw(r);
            const a = ia(o);
            return this._addSvgIconConfig(t, i, new dr("", a, s));
          }
          addSvgIconSet(t, i) {
            return this.addSvgIconSetInNamespace("", t, i);
          }
          addSvgIconSetLiteral(t, i) {
            return this.addSvgIconSetLiteralInNamespace("", t, i);
          }
          addSvgIconSetInNamespace(t, i, r) {
            return this._addSvgIconSetConfig(t, new dr(i, null, r));
          }
          addSvgIconSetLiteralInNamespace(t, i, r) {
            const s = this._sanitizer.sanitize(ne.HTML, i);
            if (!s) throw Gw(i);
            const o = ia(s);
            return this._addSvgIconSetConfig(t, new dr("", o, r));
          }
          registerFontClassAlias(t, i = t) {
            return this._fontCssClassesByAlias.set(t, i), this;
          }
          classNameForFontAlias(t) {
            return this._fontCssClassesByAlias.get(t) || t;
          }
          setDefaultFontSetClass(t) {
            return (this._defaultFontSetClass = t), this;
          }
          getDefaultFontSetClass() {
            return this._defaultFontSetClass;
          }
          getSvgIconFromUrl(t) {
            const i = this._sanitizer.sanitize(ne.RESOURCE_URL, t);
            if (!i) throw $w(t);
            const r = this._cachedIconsByUrl.get(i);
            return r
              ? Di(Sc(r))
              : this._loadSvgIconFromConfig(new dr(t, null)).pipe(
                  Ko((s) => this._cachedIconsByUrl.set(i, s)),
                  Et((s) => Sc(s))
                );
          }
          getNamedSvgIcon(t, i = "") {
            const r = Ww(i, t);
            let s = this._svgIconConfigs.get(r);
            if (s) return this._getSvgFromConfig(s);
            if (((s = this._getIconConfigFromResolvers(i, t)), s))
              return this._svgIconConfigs.set(r, s), this._getSvgFromConfig(s);
            const o = this._iconSetConfigs.get(i);
            return o
              ? this._getSvgFromIconSetConfigs(t, o)
              : (function (n, e) {
                  const t = $(n) ? n : () => n,
                    i = (r) => r.error(t());
                  return new Se(i);
                })(zw(r));
          }
          ngOnDestroy() {
            (this._resolvers = []),
              this._svgIconConfigs.clear(),
              this._iconSetConfigs.clear(),
              this._cachedIconsByUrl.clear();
          }
          _getSvgFromConfig(t) {
            return t.svgText
              ? Di(Sc(this._svgElementFromConfig(t)))
              : this._loadSvgIconFromConfig(t).pipe(Et((i) => Sc(i)));
          }
          _getSvgFromIconSetConfigs(t, i) {
            const r = this._extractIconWithNameFromAnySet(t, i);
            return r
              ? Di(r)
              : Pw(
                  i
                    .filter((o) => !o.svgText)
                    .map((o) =>
                      this._loadSvgIconSetFromConfig(o).pipe(
                        Fw((a) => {
                          const c = `Loading icon set URL: ${this._sanitizer.sanitize(
                            ne.RESOURCE_URL,
                            o.url
                          )} failed: ${a.message}`;
                          return (
                            this._errorHandler.handleError(new Error(c)),
                            Di(null)
                          );
                        })
                      )
                    )
                ).pipe(
                  Et(() => {
                    const o = this._extractIconWithNameFromAnySet(t, i);
                    if (!o) throw zw(t);
                    return o;
                  })
                );
          }
          _extractIconWithNameFromAnySet(t, i) {
            for (let r = i.length - 1; r >= 0; r--) {
              const s = i[r];
              if (s.svgText && s.svgText.toString().indexOf(t) > -1) {
                const o = this._svgElementFromConfig(s),
                  a = this._extractSvgIconFromSet(o, t, s.options);
                if (a) return a;
              }
            }
            return null;
          }
          _loadSvgIconFromConfig(t) {
            return this._fetchIcon(t).pipe(
              Ko((i) => (t.svgText = i)),
              Et(() => this._svgElementFromConfig(t))
            );
          }
          _loadSvgIconSetFromConfig(t) {
            return t.svgText
              ? Di(null)
              : this._fetchIcon(t).pipe(Ko((i) => (t.svgText = i)));
          }
          _extractSvgIconFromSet(t, i, r) {
            const s = t.querySelector(`[id="${i}"]`);
            if (!s) return null;
            const o = s.cloneNode(!0);
            if ((o.removeAttribute("id"), "svg" === o.nodeName.toLowerCase()))
              return this._setSvgAttributes(o, r);
            if ("symbol" === o.nodeName.toLowerCase())
              return this._setSvgAttributes(this._toSvgElement(o), r);
            const a = this._svgElementFromString(ia("<svg></svg>"));
            return a.appendChild(o), this._setSvgAttributes(a, r);
          }
          _svgElementFromString(t) {
            const i = this._document.createElement("DIV");
            i.innerHTML = t;
            const r = i.querySelector("svg");
            if (!r) throw Error("<svg> tag not found");
            return r;
          }
          _toSvgElement(t) {
            const i = this._svgElementFromString(ia("<svg></svg>")),
              r = t.attributes;
            for (let s = 0; s < r.length; s++) {
              const { name: o, value: a } = r[s];
              "id" !== o && i.setAttribute(o, a);
            }
            for (let s = 0; s < t.childNodes.length; s++)
              t.childNodes[s].nodeType === this._document.ELEMENT_NODE &&
                i.appendChild(t.childNodes[s].cloneNode(!0));
            return i;
          }
          _setSvgAttributes(t, i) {
            return (
              t.setAttribute("fit", ""),
              t.setAttribute("height", "100%"),
              t.setAttribute("width", "100%"),
              t.setAttribute("preserveAspectRatio", "xMidYMid meet"),
              t.setAttribute("focusable", "false"),
              i && i.viewBox && t.setAttribute("viewBox", i.viewBox),
              t
            );
          }
          _fetchIcon(t) {
            var c;
            const { url: i, options: r } = t,
              s = null != (c = null == r ? void 0 : r.withCredentials) && c;
            if (!this._httpClient)
              throw Error(
                "Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports."
              );
            if (null == i) throw Error(`Cannot fetch icon from URL "${i}".`);
            const o = this._sanitizer.sanitize(ne.RESOURCE_URL, i);
            if (!o) throw $w(i);
            const a = this._inProgressUrlFetches.get(o);
            if (a) return a;
            const l = this._httpClient
              .get(o, { responseType: "text", withCredentials: s })
              .pipe(
                Et((u) => ia(u)),
                (function (n) {
                  return Je((e, t) => {
                    try {
                      e.subscribe(t);
                    } finally {
                      t.add(n);
                    }
                  });
                })(() => this._inProgressUrlFetches.delete(o)),
                wm()
              );
            return this._inProgressUrlFetches.set(o, l), l;
          }
          _addSvgIconConfig(t, i, r) {
            return this._svgIconConfigs.set(Ww(t, i), r), this;
          }
          _addSvgIconSetConfig(t, i) {
            const r = this._iconSetConfigs.get(t);
            return r ? r.push(i) : this._iconSetConfigs.set(t, [i]), this;
          }
          _svgElementFromConfig(t) {
            if (!t.svgElement) {
              const i = this._svgElementFromString(t.svgText);
              this._setSvgAttributes(i, t.options), (t.svgElement = i);
            }
            return t.svgElement;
          }
          _getIconConfigFromResolvers(t, i) {
            for (let r = 0; r < this._resolvers.length; r++) {
              const s = this._resolvers[r](i, t);
              if (s)
                return QH(s) ? new dr(s.url, null, s.options) : new dr(s, null);
            }
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(b(Uw, 8), b(zo), b(Q, 8), b(On));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function Sc(n) {
        return n.cloneNode(!0);
      }
      function Ww(n, e) {
        return n + ":" + e;
      }
      function QH(n) {
        return !(!n.url || !n.options);
      }
      const XH = Ep(
          class {
            constructor(n) {
              this._elementRef = n;
            }
          }
        ),
        ZH = new x("mat-icon-location", {
          providedIn: "root",
          factory: function () {
            const n = Ou(Q),
              e = n ? n.location : null;
            return { getPathname: () => (e ? e.pathname + e.search : "") };
          },
        }),
        qw = [
          "clip-path",
          "color-profile",
          "src",
          "cursor",
          "fill",
          "filter",
          "marker",
          "marker-start",
          "marker-mid",
          "marker-end",
          "mask",
          "stroke",
        ],
        ej = qw.map((n) => `[${n}]`).join(", "),
        tj = /^url\(['"]?#(.*?)['"]?\)$/;
      let Kw = (() => {
          class n extends XH {
            constructor(t, i, r, s, o) {
              super(t),
                (this._iconRegistry = i),
                (this._location = s),
                (this._errorHandler = o),
                (this._inline = !1),
                (this._currentIconFetch = Oe.EMPTY),
                r || t.nativeElement.setAttribute("aria-hidden", "true");
            }
            get inline() {
              return this._inline;
            }
            set inline(t) {
              this._inline = At(t);
            }
            get svgIcon() {
              return this._svgIcon;
            }
            set svgIcon(t) {
              t !== this._svgIcon &&
                (t
                  ? this._updateSvgIcon(t)
                  : this._svgIcon && this._clearSvgElement(),
                (this._svgIcon = t));
            }
            get fontSet() {
              return this._fontSet;
            }
            set fontSet(t) {
              const i = this._cleanupFontValue(t);
              i !== this._fontSet &&
                ((this._fontSet = i), this._updateFontIconClasses());
            }
            get fontIcon() {
              return this._fontIcon;
            }
            set fontIcon(t) {
              const i = this._cleanupFontValue(t);
              i !== this._fontIcon &&
                ((this._fontIcon = i), this._updateFontIconClasses());
            }
            _splitIconName(t) {
              if (!t) return ["", ""];
              const i = t.split(":");
              switch (i.length) {
                case 1:
                  return ["", i[0]];
                case 2:
                  return i;
                default:
                  throw Error(`Invalid icon name: "${t}"`);
              }
            }
            ngOnInit() {
              this._updateFontIconClasses();
            }
            ngAfterViewChecked() {
              const t = this._elementsWithExternalReferences;
              if (t && t.size) {
                const i = this._location.getPathname();
                i !== this._previousPath &&
                  ((this._previousPath = i), this._prependPathToReferences(i));
              }
            }
            ngOnDestroy() {
              this._currentIconFetch.unsubscribe(),
                this._elementsWithExternalReferences &&
                  this._elementsWithExternalReferences.clear();
            }
            _usingFontIcon() {
              return !this.svgIcon;
            }
            _setSvgElement(t) {
              this._clearSvgElement();
              const i = t.querySelectorAll("style");
              for (let s = 0; s < i.length; s++) i[s].textContent += " ";
              const r = this._location.getPathname();
              (this._previousPath = r),
                this._cacheChildrenWithExternalReferences(t),
                this._prependPathToReferences(r),
                this._elementRef.nativeElement.appendChild(t);
            }
            _clearSvgElement() {
              const t = this._elementRef.nativeElement;
              let i = t.childNodes.length;
              for (
                this._elementsWithExternalReferences &&
                this._elementsWithExternalReferences.clear();
                i--;

              ) {
                const r = t.childNodes[i];
                (1 !== r.nodeType || "svg" === r.nodeName.toLowerCase()) &&
                  r.remove();
              }
            }
            _updateFontIconClasses() {
              if (!this._usingFontIcon()) return;
              const t = this._elementRef.nativeElement,
                i = this.fontSet
                  ? this._iconRegistry.classNameForFontAlias(this.fontSet)
                  : this._iconRegistry.getDefaultFontSetClass();
              i != this._previousFontSetClass &&
                (this._previousFontSetClass &&
                  t.classList.remove(this._previousFontSetClass),
                i && t.classList.add(i),
                (this._previousFontSetClass = i)),
                this.fontIcon != this._previousFontIconClass &&
                  (this._previousFontIconClass &&
                    t.classList.remove(this._previousFontIconClass),
                  this.fontIcon && t.classList.add(this.fontIcon),
                  (this._previousFontIconClass = this.fontIcon));
            }
            _cleanupFontValue(t) {
              return "string" == typeof t ? t.trim().split(" ")[0] : t;
            }
            _prependPathToReferences(t) {
              const i = this._elementsWithExternalReferences;
              i &&
                i.forEach((r, s) => {
                  r.forEach((o) => {
                    s.setAttribute(o.name, `url('${t}#${o.value}')`);
                  });
                });
            }
            _cacheChildrenWithExternalReferences(t) {
              const i = t.querySelectorAll(ej),
                r = (this._elementsWithExternalReferences =
                  this._elementsWithExternalReferences || new Map());
              for (let s = 0; s < i.length; s++)
                qw.forEach((o) => {
                  const a = i[s],
                    l = a.getAttribute(o),
                    c = l ? l.match(tj) : null;
                  if (c) {
                    let u = r.get(a);
                    u || ((u = []), r.set(a, u)),
                      u.push({ name: o, value: c[1] });
                  }
                });
            }
            _updateSvgIcon(t) {
              if (
                ((this._svgNamespace = null),
                (this._svgName = null),
                this._currentIconFetch.unsubscribe(),
                t)
              ) {
                const [i, r] = this._splitIconName(t);
                i && (this._svgNamespace = i),
                  r && (this._svgName = r),
                  (this._currentIconFetch = this._iconRegistry
                    .getNamedSvgIcon(r, i)
                    .pipe(Os(1))
                    .subscribe(
                      (s) => this._setSvgElement(s),
                      (s) => {
                        this._errorHandler.handleError(
                          new Error(
                            `Error retrieving icon ${i}:${r}! ${s.message}`
                          )
                        );
                      }
                    ));
              }
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(
                v(ge),
                v(xc),
                Ir("aria-hidden"),
                v(ZH),
                v(On)
              );
            }),
            (n.ɵcmp = Sn({
              type: n,
              selectors: [["mat-icon"]],
              hostAttrs: ["role", "img", 1, "mat-icon", "notranslate"],
              hostVars: 7,
              hostBindings: function (t, i) {
                2 & t &&
                  (st(
                    "data-mat-icon-type",
                    i._usingFontIcon() ? "font" : "svg"
                  )("data-mat-icon-name", i._svgName || i.fontIcon)(
                    "data-mat-icon-namespace",
                    i._svgNamespace || i.fontSet
                  ),
                  kt("mat-icon-inline", i.inline)(
                    "mat-icon-no-color",
                    "primary" !== i.color &&
                      "accent" !== i.color &&
                      "warn" !== i.color
                  ));
              },
              inputs: {
                color: "color",
                inline: "inline",
                svgIcon: "svgIcon",
                fontSet: "fontSet",
                fontIcon: "fontIcon",
              },
              exportAs: ["matIcon"],
              features: [ie],
              ngContentSelectors: WH,
              decls: 1,
              vars: 0,
              template: function (t, i) {
                1 & t && (ts(), Wi(0));
              },
              styles: [
                ".mat-icon{-webkit-user-select:none;-moz-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        nj = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = be({ type: n })),
            (n.ɵinj = pe({ imports: [[Qe], Qe] })),
            n
          );
        })();
      const ij = ["mat-button", ""],
        rj = ["*"],
        oj = [
          "mat-button",
          "mat-flat-button",
          "mat-icon-button",
          "mat-raised-button",
          "mat-stroked-button",
          "mat-mini-fab",
          "mat-fab",
        ],
        aj = Ep(
          Iw(
            Ec(
              class {
                constructor(n) {
                  this._elementRef = n;
                }
              }
            )
          )
        );
      let Yw = (() => {
          class n extends aj {
            constructor(t, i, r) {
              super(t),
                (this._focusMonitor = i),
                (this._animationMode = r),
                (this.isRoundButton = this._hasHostAttributes(
                  "mat-fab",
                  "mat-mini-fab"
                )),
                (this.isIconButton =
                  this._hasHostAttributes("mat-icon-button"));
              for (const s of oj)
                this._hasHostAttributes(s) &&
                  this._getHostElement().classList.add(s);
              t.nativeElement.classList.add("mat-button-base"),
                this.isRoundButton && (this.color = "accent");
            }
            ngAfterViewInit() {
              this._focusMonitor.monitor(this._elementRef, !0);
            }
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef);
            }
            focus(t, i) {
              t
                ? this._focusMonitor.focusVia(this._getHostElement(), t, i)
                : this._getHostElement().focus(i);
            }
            _getHostElement() {
              return this._elementRef.nativeElement;
            }
            _isRippleDisabled() {
              return this.disableRipple || this.disabled;
            }
            _hasHostAttributes(...t) {
              return t.some((i) => this._getHostElement().hasAttribute(i));
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(v(ge), v(Ff), v(xs, 8));
            }),
            (n.ɵcmp = Sn({
              type: n,
              selectors: [
                ["button", "mat-button", ""],
                ["button", "mat-raised-button", ""],
                ["button", "mat-icon-button", ""],
                ["button", "mat-fab", ""],
                ["button", "mat-mini-fab", ""],
                ["button", "mat-stroked-button", ""],
                ["button", "mat-flat-button", ""],
              ],
              viewQuery: function (t, i) {
                if ((1 & t && us(ta, 5), 2 & t)) {
                  let r;
                  Ut((r = zt())) && (i.ripple = r.first);
                }
              },
              hostAttrs: [1, "mat-focus-indicator"],
              hostVars: 5,
              hostBindings: function (t, i) {
                2 & t &&
                  (st("disabled", i.disabled || null),
                  kt(
                    "_mat-animation-noopable",
                    "NoopAnimations" === i._animationMode
                  )("mat-button-disabled", i.disabled));
              },
              inputs: {
                disabled: "disabled",
                disableRipple: "disableRipple",
                color: "color",
              },
              exportAs: ["matButton"],
              features: [ie],
              attrs: ij,
              ngContentSelectors: rj,
              decls: 4,
              vars: 5,
              consts: [
                [1, "mat-button-wrapper"],
                [
                  "matRipple",
                  "",
                  1,
                  "mat-button-ripple",
                  3,
                  "matRippleDisabled",
                  "matRippleCentered",
                  "matRippleTrigger",
                ],
                [1, "mat-button-focus-overlay"],
              ],
              template: function (t, i) {
                1 & t &&
                  (ts(),
                  T(0, "span", 0),
                  Wi(1),
                  A(),
                  ot(2, "span", 1),
                  ot(3, "span", 2)),
                  2 & t &&
                    (ee(2),
                    kt(
                      "mat-button-ripple-round",
                      i.isRoundButton || i.isIconButton
                    ),
                    ve("matRippleDisabled", i._isRippleDisabled())(
                      "matRippleCentered",
                      i.isIconButton
                    )("matRippleTrigger", i._getHostElement()));
              },
              directives: [ta],
              styles: [
                ".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}.cdk-high-contrast-active .mat-button-base.cdk-keyboard-focused,.cdk-high-contrast-active .mat-button-base.cdk-program-focused{outline:solid 3px}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        lj = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = be({ type: n })),
            (n.ɵinj = pe({ imports: [[wc, Qe], Qe] })),
            n
          );
        })();
      class Sp {
        attach(e) {
          return (this._attachedHost = e), e.attach(this);
        }
        detach() {
          let e = this._attachedHost;
          null != e && ((this._attachedHost = null), e.detach());
        }
        get isAttached() {
          return null != this._attachedHost;
        }
        setAttachedHost(e) {
          this._attachedHost = e;
        }
      }
      class cj extends Sp {
        constructor(e, t, i, r) {
          super(),
            (this.component = e),
            (this.viewContainerRef = t),
            (this.injector = i),
            (this.componentFactoryResolver = r);
        }
      }
      class uj extends Sp {
        constructor(e, t, i) {
          super(),
            (this.templateRef = e),
            (this.viewContainerRef = t),
            (this.context = i);
        }
        get origin() {
          return this.templateRef.elementRef;
        }
        attach(e, t = this.context) {
          return (this.context = t), super.attach(e);
        }
        detach() {
          return (this.context = void 0), super.detach();
        }
      }
      class dj extends Sp {
        constructor(e) {
          super(), (this.element = e instanceof ge ? e.nativeElement : e);
        }
      }
      class fj extends class {
        constructor() {
          (this._isDisposed = !1), (this.attachDomPortal = null);
        }
        hasAttached() {
          return !!this._attachedPortal;
        }
        attach(e) {
          return e instanceof cj
            ? ((this._attachedPortal = e), this.attachComponentPortal(e))
            : e instanceof uj
            ? ((this._attachedPortal = e), this.attachTemplatePortal(e))
            : this.attachDomPortal && e instanceof dj
            ? ((this._attachedPortal = e), this.attachDomPortal(e))
            : void 0;
        }
        detach() {
          this._attachedPortal &&
            (this._attachedPortal.setAttachedHost(null),
            (this._attachedPortal = null)),
            this._invokeDisposeFn();
        }
        dispose() {
          this.hasAttached() && this.detach(),
            this._invokeDisposeFn(),
            (this._isDisposed = !0);
        }
        setDisposeFn(e) {
          this._disposeFn = e;
        }
        _invokeDisposeFn() {
          this._disposeFn && (this._disposeFn(), (this._disposeFn = null));
        }
      } {
        constructor(e, t, i, r, s) {
          super(),
            (this.outletElement = e),
            (this._componentFactoryResolver = t),
            (this._appRef = i),
            (this._defaultInjector = r),
            (this.attachDomPortal = (o) => {
              const a = o.element,
                l = this._document.createComment("dom-portal");
              a.parentNode.insertBefore(l, a),
                this.outletElement.appendChild(a),
                (this._attachedPortal = o),
                super.setDisposeFn(() => {
                  l.parentNode && l.parentNode.replaceChild(a, l);
                });
            }),
            (this._document = s);
        }
        attachComponentPortal(e) {
          const i = (
            e.componentFactoryResolver || this._componentFactoryResolver
          ).resolveComponentFactory(e.component);
          let r;
          return (
            e.viewContainerRef
              ? ((r = e.viewContainerRef.createComponent(
                  i,
                  e.viewContainerRef.length,
                  e.injector || e.viewContainerRef.injector
                )),
                this.setDisposeFn(() => r.destroy()))
              : ((r = i.create(e.injector || this._defaultInjector)),
                this._appRef.attachView(r.hostView),
                this.setDisposeFn(() => {
                  this._appRef.detachView(r.hostView), r.destroy();
                })),
            this.outletElement.appendChild(this._getComponentRootNode(r)),
            (this._attachedPortal = e),
            r
          );
        }
        attachTemplatePortal(e) {
          let t = e.viewContainerRef,
            i = t.createEmbeddedView(e.templateRef, e.context);
          return (
            i.rootNodes.forEach((r) => this.outletElement.appendChild(r)),
            i.detectChanges(),
            this.setDisposeFn(() => {
              let r = t.indexOf(i);
              -1 !== r && t.remove(r);
            }),
            (this._attachedPortal = e),
            i
          );
        }
        dispose() {
          super.dispose(), this.outletElement.remove();
        }
        _getComponentRootNode(e) {
          return e.hostView.rootNodes[0];
        }
      }
      let pj = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵmod = be({ type: n })),
          (n.ɵinj = pe({})),
          n
        );
      })();
      const Qw = OV();
      class mj {
        constructor(e, t) {
          (this._viewportRuler = e),
            (this._previousHTMLStyles = { top: "", left: "" }),
            (this._isEnabled = !1),
            (this._document = t);
        }
        attach() {}
        enable() {
          if (this._canBeEnabled()) {
            const e = this._document.documentElement;
            (this._previousScrollPosition =
              this._viewportRuler.getViewportScrollPosition()),
              (this._previousHTMLStyles.left = e.style.left || ""),
              (this._previousHTMLStyles.top = e.style.top || ""),
              (e.style.left = Be(-this._previousScrollPosition.left)),
              (e.style.top = Be(-this._previousScrollPosition.top)),
              e.classList.add("cdk-global-scrollblock"),
              (this._isEnabled = !0);
          }
        }
        disable() {
          if (this._isEnabled) {
            const e = this._document.documentElement,
              i = e.style,
              r = this._document.body.style,
              s = i.scrollBehavior || "",
              o = r.scrollBehavior || "";
            (this._isEnabled = !1),
              (i.left = this._previousHTMLStyles.left),
              (i.top = this._previousHTMLStyles.top),
              e.classList.remove("cdk-global-scrollblock"),
              Qw && (i.scrollBehavior = r.scrollBehavior = "auto"),
              window.scroll(
                this._previousScrollPosition.left,
                this._previousScrollPosition.top
              ),
              Qw && ((i.scrollBehavior = s), (r.scrollBehavior = o));
          }
        }
        _canBeEnabled() {
          if (
            this._document.documentElement.classList.contains(
              "cdk-global-scrollblock"
            ) ||
            this._isEnabled
          )
            return !1;
          const t = this._document.body,
            i = this._viewportRuler.getViewportSize();
          return t.scrollHeight > i.height || t.scrollWidth > i.width;
        }
      }
      class gj {
        constructor(e, t, i, r) {
          (this._scrollDispatcher = e),
            (this._ngZone = t),
            (this._viewportRuler = i),
            (this._config = r),
            (this._scrollSubscription = null),
            (this._detach = () => {
              this.disable(),
                this._overlayRef.hasAttached() &&
                  this._ngZone.run(() => this._overlayRef.detach());
            });
        }
        attach(e) {
          this._overlayRef = e;
        }
        enable() {
          if (this._scrollSubscription) return;
          const e = this._scrollDispatcher.scrolled(0);
          this._config && this._config.threshold && this._config.threshold > 1
            ? ((this._initialScrollPosition =
                this._viewportRuler.getViewportScrollPosition().top),
              (this._scrollSubscription = e.subscribe(() => {
                const t = this._viewportRuler.getViewportScrollPosition().top;
                Math.abs(t - this._initialScrollPosition) >
                this._config.threshold
                  ? this._detach()
                  : this._overlayRef.updatePosition();
              })))
            : (this._scrollSubscription = e.subscribe(this._detach));
        }
        disable() {
          this._scrollSubscription &&
            (this._scrollSubscription.unsubscribe(),
            (this._scrollSubscription = null));
        }
        detach() {
          this.disable(), (this._overlayRef = null);
        }
      }
      class Xw {
        enable() {}
        disable() {}
        attach() {}
      }
      function Ip(n, e) {
        return e.some(
          (t) =>
            n.bottom < t.top ||
            n.top > t.bottom ||
            n.right < t.left ||
            n.left > t.right
        );
      }
      function Zw(n, e) {
        return e.some(
          (t) =>
            n.top < t.top ||
            n.bottom > t.bottom ||
            n.left < t.left ||
            n.right > t.right
        );
      }
      class _j {
        constructor(e, t, i, r) {
          (this._scrollDispatcher = e),
            (this._viewportRuler = t),
            (this._ngZone = i),
            (this._config = r),
            (this._scrollSubscription = null);
        }
        attach(e) {
          this._overlayRef = e;
        }
        enable() {
          this._scrollSubscription ||
            (this._scrollSubscription = this._scrollDispatcher
              .scrolled(this._config ? this._config.scrollThrottle : 0)
              .subscribe(() => {
                if (
                  (this._overlayRef.updatePosition(),
                  this._config && this._config.autoClose)
                ) {
                  const t =
                      this._overlayRef.overlayElement.getBoundingClientRect(),
                    { width: i, height: r } =
                      this._viewportRuler.getViewportSize();
                  Ip(t, [
                    {
                      width: i,
                      height: r,
                      bottom: r,
                      right: i,
                      top: 0,
                      left: 0,
                    },
                  ]) &&
                    (this.disable(),
                    this._ngZone.run(() => this._overlayRef.detach()));
                }
              }));
        }
        disable() {
          this._scrollSubscription &&
            (this._scrollSubscription.unsubscribe(),
            (this._scrollSubscription = null));
        }
        detach() {
          this.disable(), (this._overlayRef = null);
        }
      }
      let yj = (() => {
        class n {
          constructor(t, i, r, s) {
            (this._scrollDispatcher = t),
              (this._viewportRuler = i),
              (this._ngZone = r),
              (this.noop = () => new Xw()),
              (this.close = (o) =>
                new gj(
                  this._scrollDispatcher,
                  this._ngZone,
                  this._viewportRuler,
                  o
                )),
              (this.block = () => new mj(this._viewportRuler, this._document)),
              (this.reposition = (o) =>
                new _j(
                  this._scrollDispatcher,
                  this._viewportRuler,
                  this._ngZone,
                  o
                )),
              (this._document = s);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(b(VV), b(Af), b(oe), b(Q));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      class vj {
        constructor(e) {
          if (
            ((this.scrollStrategy = new Xw()),
            (this.panelClass = ""),
            (this.hasBackdrop = !1),
            (this.backdropClass = "cdk-overlay-dark-backdrop"),
            (this.disposeOnNavigation = !1),
            e)
          ) {
            const t = Object.keys(e);
            for (const i of t) void 0 !== e[i] && (this[i] = e[i]);
          }
        }
      }
      class bj {
        constructor(e, t) {
          (this.connectionPair = e), (this.scrollableViewProperties = t);
        }
      }
      let Jw = (() => {
          class n {
            constructor(t) {
              (this._attachedOverlays = []), (this._document = t);
            }
            ngOnDestroy() {
              this.detach();
            }
            add(t) {
              this.remove(t), this._attachedOverlays.push(t);
            }
            remove(t) {
              const i = this._attachedOverlays.indexOf(t);
              i > -1 && this._attachedOverlays.splice(i, 1),
                0 === this._attachedOverlays.length && this.detach();
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(b(Q));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        Cj = (() => {
          class n extends Jw {
            constructor(t) {
              super(t),
                (this._keydownListener = (i) => {
                  const r = this._attachedOverlays;
                  for (let s = r.length - 1; s > -1; s--)
                    if (r[s]._keydownEvents.observers.length > 0) {
                      r[s]._keydownEvents.next(i);
                      break;
                    }
                });
            }
            add(t) {
              super.add(t),
                this._isAttached ||
                  (this._document.body.addEventListener(
                    "keydown",
                    this._keydownListener
                  ),
                  (this._isAttached = !0));
            }
            detach() {
              this._isAttached &&
                (this._document.body.removeEventListener(
                  "keydown",
                  this._keydownListener
                ),
                (this._isAttached = !1));
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(b(Q));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        Dj = (() => {
          class n extends Jw {
            constructor(t, i) {
              super(t),
                (this._platform = i),
                (this._cursorStyleIsSet = !1),
                (this._pointerDownListener = (r) => {
                  this._pointerDownEventTarget = Mn(r);
                }),
                (this._clickListener = (r) => {
                  const s = Mn(r),
                    o =
                      "click" === r.type && this._pointerDownEventTarget
                        ? this._pointerDownEventTarget
                        : s;
                  this._pointerDownEventTarget = null;
                  const a = this._attachedOverlays.slice();
                  for (let l = a.length - 1; l > -1; l--) {
                    const c = a[l];
                    if (
                      !(c._outsidePointerEvents.observers.length < 1) &&
                      c.hasAttached()
                    ) {
                      if (
                        c.overlayElement.contains(s) ||
                        c.overlayElement.contains(o)
                      )
                        break;
                      c._outsidePointerEvents.next(r);
                    }
                  }
                });
            }
            add(t) {
              if ((super.add(t), !this._isAttached)) {
                const i = this._document.body;
                i.addEventListener(
                  "pointerdown",
                  this._pointerDownListener,
                  !0
                ),
                  i.addEventListener("click", this._clickListener, !0),
                  i.addEventListener("auxclick", this._clickListener, !0),
                  i.addEventListener("contextmenu", this._clickListener, !0),
                  this._platform.IOS &&
                    !this._cursorStyleIsSet &&
                    ((this._cursorOriginalValue = i.style.cursor),
                    (i.style.cursor = "pointer"),
                    (this._cursorStyleIsSet = !0)),
                  (this._isAttached = !0);
              }
            }
            detach() {
              if (this._isAttached) {
                const t = this._document.body;
                t.removeEventListener(
                  "pointerdown",
                  this._pointerDownListener,
                  !0
                ),
                  t.removeEventListener("click", this._clickListener, !0),
                  t.removeEventListener("auxclick", this._clickListener, !0),
                  t.removeEventListener("contextmenu", this._clickListener, !0),
                  this._platform.IOS &&
                    this._cursorStyleIsSet &&
                    ((t.style.cursor = this._cursorOriginalValue),
                    (this._cursorStyleIsSet = !1)),
                  (this._isAttached = !1);
              }
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(b(Q), b(ti));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        e0 = (() => {
          class n {
            constructor(t, i) {
              (this._platform = i), (this._document = t);
            }
            ngOnDestroy() {
              var t;
              null == (t = this._containerElement) || t.remove();
            }
            getContainerElement() {
              return (
                this._containerElement || this._createContainer(),
                this._containerElement
              );
            }
            _createContainer() {
              const t = "cdk-overlay-container";
              if (this._platform.isBrowser || Tf()) {
                const r = this._document.querySelectorAll(
                  `.${t}[platform="server"], .${t}[platform="test"]`
                );
                for (let s = 0; s < r.length; s++) r[s].remove();
              }
              const i = this._document.createElement("div");
              i.classList.add(t),
                Tf()
                  ? i.setAttribute("platform", "test")
                  : this._platform.isBrowser ||
                    i.setAttribute("platform", "server"),
                this._document.body.appendChild(i),
                (this._containerElement = i);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(b(Q), b(ti));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })();
      class Ej {
        constructor(e, t, i, r, s, o, a, l, c) {
          (this._portalOutlet = e),
            (this._host = t),
            (this._pane = i),
            (this._config = r),
            (this._ngZone = s),
            (this._keyboardDispatcher = o),
            (this._document = a),
            (this._location = l),
            (this._outsideClickDispatcher = c),
            (this._backdropElement = null),
            (this._backdropClick = new q()),
            (this._attachments = new q()),
            (this._detachments = new q()),
            (this._locationChanges = Oe.EMPTY),
            (this._backdropClickHandler = (u) => this._backdropClick.next(u)),
            (this._keydownEvents = new q()),
            (this._outsidePointerEvents = new q()),
            r.scrollStrategy &&
              ((this._scrollStrategy = r.scrollStrategy),
              this._scrollStrategy.attach(this)),
            (this._positionStrategy = r.positionStrategy);
        }
        get overlayElement() {
          return this._pane;
        }
        get backdropElement() {
          return this._backdropElement;
        }
        get hostElement() {
          return this._host;
        }
        attach(e) {
          let t = this._portalOutlet.attach(e);
          return (
            !this._host.parentElement &&
              this._previousHostParent &&
              this._previousHostParent.appendChild(this._host),
            this._positionStrategy && this._positionStrategy.attach(this),
            this._updateStackingOrder(),
            this._updateElementSize(),
            this._updateElementDirection(),
            this._scrollStrategy && this._scrollStrategy.enable(),
            this._ngZone.onStable.pipe(Os(1)).subscribe(() => {
              this.hasAttached() && this.updatePosition();
            }),
            this._togglePointerEvents(!0),
            this._config.hasBackdrop && this._attachBackdrop(),
            this._config.panelClass &&
              this._toggleClasses(this._pane, this._config.panelClass, !0),
            this._attachments.next(),
            this._keyboardDispatcher.add(this),
            this._config.disposeOnNavigation &&
              (this._locationChanges = this._location.subscribe(() =>
                this.dispose()
              )),
            this._outsideClickDispatcher.add(this),
            t
          );
        }
        detach() {
          if (!this.hasAttached()) return;
          this.detachBackdrop(),
            this._togglePointerEvents(!1),
            this._positionStrategy &&
              this._positionStrategy.detach &&
              this._positionStrategy.detach(),
            this._scrollStrategy && this._scrollStrategy.disable();
          const e = this._portalOutlet.detach();
          return (
            this._detachments.next(),
            this._keyboardDispatcher.remove(this),
            this._detachContentWhenStable(),
            this._locationChanges.unsubscribe(),
            this._outsideClickDispatcher.remove(this),
            e
          );
        }
        dispose() {
          var t;
          const e = this.hasAttached();
          this._positionStrategy && this._positionStrategy.dispose(),
            this._disposeScrollStrategy(),
            this._disposeBackdrop(this._backdropElement),
            this._locationChanges.unsubscribe(),
            this._keyboardDispatcher.remove(this),
            this._portalOutlet.dispose(),
            this._attachments.complete(),
            this._backdropClick.complete(),
            this._keydownEvents.complete(),
            this._outsidePointerEvents.complete(),
            this._outsideClickDispatcher.remove(this),
            null == (t = this._host) || t.remove(),
            (this._previousHostParent = this._pane = this._host = null),
            e && this._detachments.next(),
            this._detachments.complete();
        }
        hasAttached() {
          return this._portalOutlet.hasAttached();
        }
        backdropClick() {
          return this._backdropClick;
        }
        attachments() {
          return this._attachments;
        }
        detachments() {
          return this._detachments;
        }
        keydownEvents() {
          return this._keydownEvents;
        }
        outsidePointerEvents() {
          return this._outsidePointerEvents;
        }
        getConfig() {
          return this._config;
        }
        updatePosition() {
          this._positionStrategy && this._positionStrategy.apply();
        }
        updatePositionStrategy(e) {
          e !== this._positionStrategy &&
            (this._positionStrategy && this._positionStrategy.dispose(),
            (this._positionStrategy = e),
            this.hasAttached() && (e.attach(this), this.updatePosition()));
        }
        updateSize(e) {
          (this._config = Z(Z({}, this._config), e)), this._updateElementSize();
        }
        setDirection(e) {
          (this._config = gr(Z({}, this._config), { direction: e })),
            this._updateElementDirection();
        }
        addPanelClass(e) {
          this._pane && this._toggleClasses(this._pane, e, !0);
        }
        removePanelClass(e) {
          this._pane && this._toggleClasses(this._pane, e, !1);
        }
        getDirection() {
          const e = this._config.direction;
          return e ? ("string" == typeof e ? e : e.value) : "ltr";
        }
        updateScrollStrategy(e) {
          e !== this._scrollStrategy &&
            (this._disposeScrollStrategy(),
            (this._scrollStrategy = e),
            this.hasAttached() && (e.attach(this), e.enable()));
        }
        _updateElementDirection() {
          this._host.setAttribute("dir", this.getDirection());
        }
        _updateElementSize() {
          if (!this._pane) return;
          const e = this._pane.style;
          (e.width = Be(this._config.width)),
            (e.height = Be(this._config.height)),
            (e.minWidth = Be(this._config.minWidth)),
            (e.minHeight = Be(this._config.minHeight)),
            (e.maxWidth = Be(this._config.maxWidth)),
            (e.maxHeight = Be(this._config.maxHeight));
        }
        _togglePointerEvents(e) {
          this._pane.style.pointerEvents = e ? "" : "none";
        }
        _attachBackdrop() {
          const e = "cdk-overlay-backdrop-showing";
          (this._backdropElement = this._document.createElement("div")),
            this._backdropElement.classList.add("cdk-overlay-backdrop"),
            this._config.backdropClass &&
              this._toggleClasses(
                this._backdropElement,
                this._config.backdropClass,
                !0
              ),
            this._host.parentElement.insertBefore(
              this._backdropElement,
              this._host
            ),
            this._backdropElement.addEventListener(
              "click",
              this._backdropClickHandler
            ),
            "undefined" != typeof requestAnimationFrame
              ? this._ngZone.runOutsideAngular(() => {
                  requestAnimationFrame(() => {
                    this._backdropElement &&
                      this._backdropElement.classList.add(e);
                  });
                })
              : this._backdropElement.classList.add(e);
        }
        _updateStackingOrder() {
          this._host.nextSibling &&
            this._host.parentNode.appendChild(this._host);
        }
        detachBackdrop() {
          const e = this._backdropElement;
          if (!e) return;
          let t;
          const i = () => {
            e &&
              (e.removeEventListener("click", this._backdropClickHandler),
              e.removeEventListener("transitionend", i),
              this._disposeBackdrop(e)),
              this._config.backdropClass &&
                this._toggleClasses(e, this._config.backdropClass, !1),
              clearTimeout(t);
          };
          e.classList.remove("cdk-overlay-backdrop-showing"),
            this._ngZone.runOutsideAngular(() => {
              e.addEventListener("transitionend", i);
            }),
            (e.style.pointerEvents = "none"),
            (t = this._ngZone.runOutsideAngular(() => setTimeout(i, 500)));
        }
        _toggleClasses(e, t, i) {
          const r = LD(t || []).filter((s) => !!s);
          r.length && (i ? e.classList.add(...r) : e.classList.remove(...r));
        }
        _detachContentWhenStable() {
          this._ngZone.runOutsideAngular(() => {
            const e = this._ngZone.onStable
              .pipe(ni(pa(this._attachments, this._detachments)))
              .subscribe(() => {
                (!this._pane ||
                  !this._host ||
                  0 === this._pane.children.length) &&
                  (this._pane &&
                    this._config.panelClass &&
                    this._toggleClasses(
                      this._pane,
                      this._config.panelClass,
                      !1
                    ),
                  this._host &&
                    this._host.parentElement &&
                    ((this._previousHostParent = this._host.parentElement),
                    this._host.remove()),
                  e.unsubscribe());
              });
          });
        }
        _disposeScrollStrategy() {
          const e = this._scrollStrategy;
          e && (e.disable(), e.detach && e.detach());
        }
        _disposeBackdrop(e) {
          e &&
            (e.remove(),
            this._backdropElement === e && (this._backdropElement = null));
        }
      }
      const t0 = "cdk-overlay-connected-position-bounding-box",
        wj = /([A-Za-z%]+)$/;
      class Mj {
        constructor(e, t, i, r, s) {
          (this._viewportRuler = t),
            (this._document = i),
            (this._platform = r),
            (this._overlayContainer = s),
            (this._lastBoundingBoxSize = { width: 0, height: 0 }),
            (this._isPushed = !1),
            (this._canPush = !0),
            (this._growAfterOpen = !1),
            (this._hasFlexibleDimensions = !0),
            (this._positionLocked = !1),
            (this._viewportMargin = 0),
            (this._scrollables = []),
            (this._preferredPositions = []),
            (this._positionChanges = new q()),
            (this._resizeSubscription = Oe.EMPTY),
            (this._offsetX = 0),
            (this._offsetY = 0),
            (this._appliedPanelClasses = []),
            (this.positionChanges = this._positionChanges),
            this.setOrigin(e);
        }
        get positions() {
          return this._preferredPositions;
        }
        attach(e) {
          this._validatePositions(),
            e.hostElement.classList.add(t0),
            (this._overlayRef = e),
            (this._boundingBox = e.hostElement),
            (this._pane = e.overlayElement),
            (this._isDisposed = !1),
            (this._isInitialRender = !0),
            (this._lastPosition = null),
            this._resizeSubscription.unsubscribe(),
            (this._resizeSubscription = this._viewportRuler
              .change()
              .subscribe(() => {
                (this._isInitialRender = !0), this.apply();
              }));
        }
        apply() {
          if (this._isDisposed || !this._platform.isBrowser) return;
          if (
            !this._isInitialRender &&
            this._positionLocked &&
            this._lastPosition
          )
            return void this.reapplyLastPosition();
          this._clearPanelClasses(),
            this._resetOverlayElementStyles(),
            this._resetBoundingBoxStyles(),
            (this._viewportRect = this._getNarrowedViewportRect()),
            (this._originRect = this._getOriginRect()),
            (this._overlayRect = this._pane.getBoundingClientRect());
          const e = this._originRect,
            t = this._overlayRect,
            i = this._viewportRect,
            r = [];
          let s;
          for (let o of this._preferredPositions) {
            let a = this._getOriginPoint(e, o),
              l = this._getOverlayPoint(a, t, o),
              c = this._getOverlayFit(l, t, i, o);
            if (c.isCompletelyWithinViewport)
              return (this._isPushed = !1), void this._applyPosition(o, a);
            this._canFitWithFlexibleDimensions(c, l, i)
              ? r.push({
                  position: o,
                  origin: a,
                  overlayRect: t,
                  boundingBoxRect: this._calculateBoundingBoxRect(a, o),
                })
              : (!s || s.overlayFit.visibleArea < c.visibleArea) &&
                (s = {
                  overlayFit: c,
                  overlayPoint: l,
                  originPoint: a,
                  position: o,
                  overlayRect: t,
                });
          }
          if (r.length) {
            let o = null,
              a = -1;
            for (const l of r) {
              const c =
                l.boundingBoxRect.width *
                l.boundingBoxRect.height *
                (l.position.weight || 1);
              c > a && ((a = c), (o = l));
            }
            return (
              (this._isPushed = !1),
              void this._applyPosition(o.position, o.origin)
            );
          }
          if (this._canPush)
            return (
              (this._isPushed = !0),
              void this._applyPosition(s.position, s.originPoint)
            );
          this._applyPosition(s.position, s.originPoint);
        }
        detach() {
          this._clearPanelClasses(),
            (this._lastPosition = null),
            (this._previousPushAmount = null),
            this._resizeSubscription.unsubscribe();
        }
        dispose() {
          this._isDisposed ||
            (this._boundingBox &&
              hr(this._boundingBox.style, {
                top: "",
                left: "",
                right: "",
                bottom: "",
                height: "",
                width: "",
                alignItems: "",
                justifyContent: "",
              }),
            this._pane && this._resetOverlayElementStyles(),
            this._overlayRef &&
              this._overlayRef.hostElement.classList.remove(t0),
            this.detach(),
            this._positionChanges.complete(),
            (this._overlayRef = this._boundingBox = null),
            (this._isDisposed = !0));
        }
        reapplyLastPosition() {
          if (
            !this._isDisposed &&
            (!this._platform || this._platform.isBrowser)
          ) {
            (this._originRect = this._getOriginRect()),
              (this._overlayRect = this._pane.getBoundingClientRect()),
              (this._viewportRect = this._getNarrowedViewportRect());
            const e = this._lastPosition || this._preferredPositions[0],
              t = this._getOriginPoint(this._originRect, e);
            this._applyPosition(e, t);
          }
        }
        withScrollableContainers(e) {
          return (this._scrollables = e), this;
        }
        withPositions(e) {
          return (
            (this._preferredPositions = e),
            -1 === e.indexOf(this._lastPosition) && (this._lastPosition = null),
            this._validatePositions(),
            this
          );
        }
        withViewportMargin(e) {
          return (this._viewportMargin = e), this;
        }
        withFlexibleDimensions(e = !0) {
          return (this._hasFlexibleDimensions = e), this;
        }
        withGrowAfterOpen(e = !0) {
          return (this._growAfterOpen = e), this;
        }
        withPush(e = !0) {
          return (this._canPush = e), this;
        }
        withLockedPosition(e = !0) {
          return (this._positionLocked = e), this;
        }
        setOrigin(e) {
          return (this._origin = e), this;
        }
        withDefaultOffsetX(e) {
          return (this._offsetX = e), this;
        }
        withDefaultOffsetY(e) {
          return (this._offsetY = e), this;
        }
        withTransformOriginOn(e) {
          return (this._transformOriginSelector = e), this;
        }
        _getOriginPoint(e, t) {
          let i, r;
          if ("center" == t.originX) i = e.left + e.width / 2;
          else {
            const s = this._isRtl() ? e.right : e.left,
              o = this._isRtl() ? e.left : e.right;
            i = "start" == t.originX ? s : o;
          }
          return (
            (r =
              "center" == t.originY
                ? e.top + e.height / 2
                : "top" == t.originY
                ? e.top
                : e.bottom),
            { x: i, y: r }
          );
        }
        _getOverlayPoint(e, t, i) {
          let r, s;
          return (
            (r =
              "center" == i.overlayX
                ? -t.width / 2
                : "start" === i.overlayX
                ? this._isRtl()
                  ? -t.width
                  : 0
                : this._isRtl()
                ? 0
                : -t.width),
            (s =
              "center" == i.overlayY
                ? -t.height / 2
                : "top" == i.overlayY
                ? 0
                : -t.height),
            { x: e.x + r, y: e.y + s }
          );
        }
        _getOverlayFit(e, t, i, r) {
          const s = r0(t);
          let { x: o, y: a } = e,
            l = this._getOffset(r, "x"),
            c = this._getOffset(r, "y");
          l && (o += l), c && (a += c);
          let h = 0 - a,
            f = a + s.height - i.height,
            p = this._subtractOverflows(s.width, 0 - o, o + s.width - i.width),
            g = this._subtractOverflows(s.height, h, f),
            m = p * g;
          return {
            visibleArea: m,
            isCompletelyWithinViewport: s.width * s.height === m,
            fitsInViewportVertically: g === s.height,
            fitsInViewportHorizontally: p == s.width,
          };
        }
        _canFitWithFlexibleDimensions(e, t, i) {
          if (this._hasFlexibleDimensions) {
            const r = i.bottom - t.y,
              s = i.right - t.x,
              o = n0(this._overlayRef.getConfig().minHeight),
              a = n0(this._overlayRef.getConfig().minWidth),
              c = e.fitsInViewportHorizontally || (null != a && a <= s);
            return (e.fitsInViewportVertically || (null != o && o <= r)) && c;
          }
          return !1;
        }
        _pushOverlayOnScreen(e, t, i) {
          if (this._previousPushAmount && this._positionLocked)
            return {
              x: e.x + this._previousPushAmount.x,
              y: e.y + this._previousPushAmount.y,
            };
          const r = r0(t),
            s = this._viewportRect,
            o = Math.max(e.x + r.width - s.width, 0),
            a = Math.max(e.y + r.height - s.height, 0),
            l = Math.max(s.top - i.top - e.y, 0),
            c = Math.max(s.left - i.left - e.x, 0);
          let u = 0,
            d = 0;
          return (
            (u =
              r.width <= s.width
                ? c || -o
                : e.x < this._viewportMargin
                ? s.left - i.left - e.x
                : 0),
            (d =
              r.height <= s.height
                ? l || -a
                : e.y < this._viewportMargin
                ? s.top - i.top - e.y
                : 0),
            (this._previousPushAmount = { x: u, y: d }),
            { x: e.x + u, y: e.y + d }
          );
        }
        _applyPosition(e, t) {
          if (
            (this._setTransformOrigin(e),
            this._setOverlayElementStyles(t, e),
            this._setBoundingBoxStyles(t, e),
            e.panelClass && this._addPanelClasses(e.panelClass),
            (this._lastPosition = e),
            this._positionChanges.observers.length)
          ) {
            const i = this._getScrollVisibility(),
              r = new bj(e, i);
            this._positionChanges.next(r);
          }
          this._isInitialRender = !1;
        }
        _setTransformOrigin(e) {
          if (!this._transformOriginSelector) return;
          const t = this._boundingBox.querySelectorAll(
            this._transformOriginSelector
          );
          let i,
            r = e.overlayY;
          i =
            "center" === e.overlayX
              ? "center"
              : this._isRtl()
              ? "start" === e.overlayX
                ? "right"
                : "left"
              : "start" === e.overlayX
              ? "left"
              : "right";
          for (let s = 0; s < t.length; s++)
            t[s].style.transformOrigin = `${i} ${r}`;
        }
        _calculateBoundingBoxRect(e, t) {
          const i = this._viewportRect,
            r = this._isRtl();
          let s, o, a, u, d, h;
          if ("top" === t.overlayY)
            (o = e.y), (s = i.height - o + this._viewportMargin);
          else if ("bottom" === t.overlayY)
            (a = i.height - e.y + 2 * this._viewportMargin),
              (s = i.height - a + this._viewportMargin);
          else {
            const f = Math.min(i.bottom - e.y + i.top, e.y),
              p = this._lastBoundingBoxSize.height;
            (s = 2 * f),
              (o = e.y - f),
              s > p &&
                !this._isInitialRender &&
                !this._growAfterOpen &&
                (o = e.y - p / 2);
          }
          if (("end" === t.overlayX && !r) || ("start" === t.overlayX && r))
            (h = i.width - e.x + this._viewportMargin),
              (u = e.x - this._viewportMargin);
          else if (
            ("start" === t.overlayX && !r) ||
            ("end" === t.overlayX && r)
          )
            (d = e.x), (u = i.right - e.x);
          else {
            const f = Math.min(i.right - e.x + i.left, e.x),
              p = this._lastBoundingBoxSize.width;
            (u = 2 * f),
              (d = e.x - f),
              u > p &&
                !this._isInitialRender &&
                !this._growAfterOpen &&
                (d = e.x - p / 2);
          }
          return { top: o, left: d, bottom: a, right: h, width: u, height: s };
        }
        _setBoundingBoxStyles(e, t) {
          const i = this._calculateBoundingBoxRect(e, t);
          !this._isInitialRender &&
            !this._growAfterOpen &&
            ((i.height = Math.min(i.height, this._lastBoundingBoxSize.height)),
            (i.width = Math.min(i.width, this._lastBoundingBoxSize.width)));
          const r = {};
          if (this._hasExactPosition())
            (r.top = r.left = "0"),
              (r.bottom = r.right = r.maxHeight = r.maxWidth = ""),
              (r.width = r.height = "100%");
          else {
            const s = this._overlayRef.getConfig().maxHeight,
              o = this._overlayRef.getConfig().maxWidth;
            (r.height = Be(i.height)),
              (r.top = Be(i.top)),
              (r.bottom = Be(i.bottom)),
              (r.width = Be(i.width)),
              (r.left = Be(i.left)),
              (r.right = Be(i.right)),
              (r.alignItems =
                "center" === t.overlayX
                  ? "center"
                  : "end" === t.overlayX
                  ? "flex-end"
                  : "flex-start"),
              (r.justifyContent =
                "center" === t.overlayY
                  ? "center"
                  : "bottom" === t.overlayY
                  ? "flex-end"
                  : "flex-start"),
              s && (r.maxHeight = Be(s)),
              o && (r.maxWidth = Be(o));
          }
          (this._lastBoundingBoxSize = i), hr(this._boundingBox.style, r);
        }
        _resetBoundingBoxStyles() {
          hr(this._boundingBox.style, {
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            height: "",
            width: "",
            alignItems: "",
            justifyContent: "",
          });
        }
        _resetOverlayElementStyles() {
          hr(this._pane.style, {
            top: "",
            left: "",
            bottom: "",
            right: "",
            position: "",
            transform: "",
          });
        }
        _setOverlayElementStyles(e, t) {
          const i = {},
            r = this._hasExactPosition(),
            s = this._hasFlexibleDimensions,
            o = this._overlayRef.getConfig();
          if (r) {
            const u = this._viewportRuler.getViewportScrollPosition();
            hr(i, this._getExactOverlayY(t, e, u)),
              hr(i, this._getExactOverlayX(t, e, u));
          } else i.position = "static";
          let a = "",
            l = this._getOffset(t, "x"),
            c = this._getOffset(t, "y");
          l && (a += `translateX(${l}px) `),
            c && (a += `translateY(${c}px)`),
            (i.transform = a.trim()),
            o.maxHeight &&
              (r ? (i.maxHeight = Be(o.maxHeight)) : s && (i.maxHeight = "")),
            o.maxWidth &&
              (r ? (i.maxWidth = Be(o.maxWidth)) : s && (i.maxWidth = "")),
            hr(this._pane.style, i);
        }
        _getExactOverlayY(e, t, i) {
          let r = { top: "", bottom: "" },
            s = this._getOverlayPoint(t, this._overlayRect, e);
          this._isPushed &&
            (s = this._pushOverlayOnScreen(s, this._overlayRect, i));
          let o = this._overlayContainer
            .getContainerElement()
            .getBoundingClientRect().top;
          return (
            (s.y -= o),
            "bottom" === e.overlayY
              ? (r.bottom =
                  this._document.documentElement.clientHeight -
                  (s.y + this._overlayRect.height) +
                  "px")
              : (r.top = Be(s.y)),
            r
          );
        }
        _getExactOverlayX(e, t, i) {
          let o,
            r = { left: "", right: "" },
            s = this._getOverlayPoint(t, this._overlayRect, e);
          return (
            this._isPushed &&
              (s = this._pushOverlayOnScreen(s, this._overlayRect, i)),
            (o = this._isRtl()
              ? "end" === e.overlayX
                ? "left"
                : "right"
              : "end" === e.overlayX
              ? "right"
              : "left"),
            "right" === o
              ? (r.right =
                  this._document.documentElement.clientWidth -
                  (s.x + this._overlayRect.width) +
                  "px")
              : (r.left = Be(s.x)),
            r
          );
        }
        _getScrollVisibility() {
          const e = this._getOriginRect(),
            t = this._pane.getBoundingClientRect(),
            i = this._scrollables.map((r) =>
              r.getElementRef().nativeElement.getBoundingClientRect()
            );
          return {
            isOriginClipped: Zw(e, i),
            isOriginOutsideView: Ip(e, i),
            isOverlayClipped: Zw(t, i),
            isOverlayOutsideView: Ip(t, i),
          };
        }
        _subtractOverflows(e, ...t) {
          return t.reduce((i, r) => i - Math.max(r, 0), e);
        }
        _getNarrowedViewportRect() {
          const e = this._document.documentElement.clientWidth,
            t = this._document.documentElement.clientHeight,
            i = this._viewportRuler.getViewportScrollPosition();
          return {
            top: i.top + this._viewportMargin,
            left: i.left + this._viewportMargin,
            right: i.left + e - this._viewportMargin,
            bottom: i.top + t - this._viewportMargin,
            width: e - 2 * this._viewportMargin,
            height: t - 2 * this._viewportMargin,
          };
        }
        _isRtl() {
          return "rtl" === this._overlayRef.getDirection();
        }
        _hasExactPosition() {
          return !this._hasFlexibleDimensions || this._isPushed;
        }
        _getOffset(e, t) {
          return "x" === t
            ? null == e.offsetX
              ? this._offsetX
              : e.offsetX
            : null == e.offsetY
            ? this._offsetY
            : e.offsetY;
        }
        _validatePositions() {}
        _addPanelClasses(e) {
          this._pane &&
            LD(e).forEach((t) => {
              "" !== t &&
                -1 === this._appliedPanelClasses.indexOf(t) &&
                (this._appliedPanelClasses.push(t),
                this._pane.classList.add(t));
            });
        }
        _clearPanelClasses() {
          this._pane &&
            (this._appliedPanelClasses.forEach((e) => {
              this._pane.classList.remove(e);
            }),
            (this._appliedPanelClasses = []));
        }
        _getOriginRect() {
          const e = this._origin;
          if (e instanceof ge) return e.nativeElement.getBoundingClientRect();
          if (e instanceof Element) return e.getBoundingClientRect();
          const t = e.width || 0,
            i = e.height || 0;
          return {
            top: e.y,
            bottom: e.y + i,
            left: e.x,
            right: e.x + t,
            height: i,
            width: t,
          };
        }
      }
      function hr(n, e) {
        for (let t in e) e.hasOwnProperty(t) && (n[t] = e[t]);
        return n;
      }
      function n0(n) {
        if ("number" != typeof n && null != n) {
          const [e, t] = n.split(wj);
          return t && "px" !== t ? null : parseFloat(e);
        }
        return n || null;
      }
      function r0(n) {
        return {
          top: Math.floor(n.top),
          right: Math.floor(n.right),
          bottom: Math.floor(n.bottom),
          left: Math.floor(n.left),
          width: Math.floor(n.width),
          height: Math.floor(n.height),
        };
      }
      const s0 = "cdk-global-overlay-wrapper";
      class xj {
        constructor() {
          (this._cssPosition = "static"),
            (this._topOffset = ""),
            (this._bottomOffset = ""),
            (this._leftOffset = ""),
            (this._rightOffset = ""),
            (this._alignItems = ""),
            (this._justifyContent = ""),
            (this._width = ""),
            (this._height = "");
        }
        attach(e) {
          const t = e.getConfig();
          (this._overlayRef = e),
            this._width && !t.width && e.updateSize({ width: this._width }),
            this._height && !t.height && e.updateSize({ height: this._height }),
            e.hostElement.classList.add(s0),
            (this._isDisposed = !1);
        }
        top(e = "") {
          return (
            (this._bottomOffset = ""),
            (this._topOffset = e),
            (this._alignItems = "flex-start"),
            this
          );
        }
        left(e = "") {
          return (
            (this._rightOffset = ""),
            (this._leftOffset = e),
            (this._justifyContent = "flex-start"),
            this
          );
        }
        bottom(e = "") {
          return (
            (this._topOffset = ""),
            (this._bottomOffset = e),
            (this._alignItems = "flex-end"),
            this
          );
        }
        right(e = "") {
          return (
            (this._leftOffset = ""),
            (this._rightOffset = e),
            (this._justifyContent = "flex-end"),
            this
          );
        }
        width(e = "") {
          return (
            this._overlayRef
              ? this._overlayRef.updateSize({ width: e })
              : (this._width = e),
            this
          );
        }
        height(e = "") {
          return (
            this._overlayRef
              ? this._overlayRef.updateSize({ height: e })
              : (this._height = e),
            this
          );
        }
        centerHorizontally(e = "") {
          return this.left(e), (this._justifyContent = "center"), this;
        }
        centerVertically(e = "") {
          return this.top(e), (this._alignItems = "center"), this;
        }
        apply() {
          if (!this._overlayRef || !this._overlayRef.hasAttached()) return;
          const e = this._overlayRef.overlayElement.style,
            t = this._overlayRef.hostElement.style,
            i = this._overlayRef.getConfig(),
            { width: r, height: s, maxWidth: o, maxHeight: a } = i,
            l = !(
              ("100%" !== r && "100vw" !== r) ||
              (o && "100%" !== o && "100vw" !== o)
            ),
            c = !(
              ("100%" !== s && "100vh" !== s) ||
              (a && "100%" !== a && "100vh" !== a)
            );
          (e.position = this._cssPosition),
            (e.marginLeft = l ? "0" : this._leftOffset),
            (e.marginTop = c ? "0" : this._topOffset),
            (e.marginBottom = this._bottomOffset),
            (e.marginRight = this._rightOffset),
            l
              ? (t.justifyContent = "flex-start")
              : "center" === this._justifyContent
              ? (t.justifyContent = "center")
              : "rtl" === this._overlayRef.getConfig().direction
              ? "flex-start" === this._justifyContent
                ? (t.justifyContent = "flex-end")
                : "flex-end" === this._justifyContent &&
                  (t.justifyContent = "flex-start")
              : (t.justifyContent = this._justifyContent),
            (t.alignItems = c ? "flex-start" : this._alignItems);
        }
        dispose() {
          if (this._isDisposed || !this._overlayRef) return;
          const e = this._overlayRef.overlayElement.style,
            t = this._overlayRef.hostElement,
            i = t.style;
          t.classList.remove(s0),
            (i.justifyContent =
              i.alignItems =
              e.marginTop =
              e.marginBottom =
              e.marginLeft =
              e.marginRight =
              e.position =
                ""),
            (this._overlayRef = null),
            (this._isDisposed = !0);
        }
      }
      let Sj = (() => {
          class n {
            constructor(t, i, r, s) {
              (this._viewportRuler = t),
                (this._document = i),
                (this._platform = r),
                (this._overlayContainer = s);
            }
            global() {
              return new xj();
            }
            flexibleConnectedTo(t) {
              return new Mj(
                t,
                this._viewportRuler,
                this._document,
                this._platform,
                this._overlayContainer
              );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(b(Af), b(Q), b(ti), b(e0));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        Ij = 0,
        kp = (() => {
          class n {
            constructor(t, i, r, s, o, a, l, c, u, d, h) {
              (this.scrollStrategies = t),
                (this._overlayContainer = i),
                (this._componentFactoryResolver = r),
                (this._positionBuilder = s),
                (this._keyboardDispatcher = o),
                (this._injector = a),
                (this._ngZone = l),
                (this._document = c),
                (this._directionality = u),
                (this._location = d),
                (this._outsideClickDispatcher = h);
            }
            create(t) {
              const i = this._createHostElement(),
                r = this._createPaneElement(i),
                s = this._createPortalOutlet(r),
                o = new vj(t);
              return (
                (o.direction = o.direction || this._directionality.value),
                new Ej(
                  s,
                  i,
                  r,
                  o,
                  this._ngZone,
                  this._keyboardDispatcher,
                  this._document,
                  this._location,
                  this._outsideClickDispatcher
                )
              );
            }
            position() {
              return this._positionBuilder;
            }
            _createPaneElement(t) {
              const i = this._document.createElement("div");
              return (
                (i.id = "cdk-overlay-" + Ij++),
                i.classList.add("cdk-overlay-pane"),
                t.appendChild(i),
                i
              );
            }
            _createHostElement() {
              const t = this._document.createElement("div");
              return (
                this._overlayContainer.getContainerElement().appendChild(t), t
              );
            }
            _createPortalOutlet(t) {
              return (
                this._appRef || (this._appRef = this._injector.get(fs)),
                new fj(
                  t,
                  this._componentFactoryResolver,
                  this._appRef,
                  this._injector,
                  this._document
                )
              );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(
                b(yj),
                b(e0),
                b(Ki),
                b(Sj),
                b(Cj),
                b(ye),
                b(oe),
                b(Q),
                b(KD),
                b(aD),
                b(Dj)
              );
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      const Aj = {
        provide: new x("cdk-connected-overlay-scroll-strategy"),
        deps: [kp],
        useFactory: function (n) {
          return () => n.scrollStrategies.reposition();
        },
      };
      let Rj = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵmod = be({ type: n })),
          (n.ɵinj = pe({ providers: [kp, Aj], imports: [[qo, pj, YD], YD] })),
          n
        );
      })();
      const Nj = {
        provide: new x("mat-menu-scroll-strategy"),
        deps: [kp],
        useFactory: function (n) {
          return () => n.scrollStrategies.reposition();
        },
      };
      let Lj = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵmod = be({ type: n })),
          (n.ɵinj = pe({
            providers: [Nj],
            imports: [[df, Qe, wc, Rj], Jl, Qe],
          })),
          n
        );
      })();
      const ln = new x("NgValueAccessor");
      let O3 = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = be({ type: n })),
            (n.ɵinj = pe({ imports: [[Qe], Qe] })),
            n
          );
        })(),
        q3 = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = be({ type: n })),
            (n.ɵinj = pe({ imports: [[kw, wc, Qe, Ow, df], kw, Qe, Ow, O3] })),
            n
          );
        })();
      const pr = JSON.parse(
        '{"deck1":"\u0421\u0432\u044a\u0440\u0437\u0432\u0430\u043d\u0435 \u0447\u0440\u0435\u0437 \u0435\u043c\u043e\u0446\u0438\u0438","deck2":"\u041d\u0430\u043c\u0438\u0440\u0430\u043d\u0435 \u043d\u0430 \u043f\u043e\u0441\u043e\u043a\u0430","deck3":"\u041e\u043f\u0440\u0435\u0434\u0435\u043b\u044f\u043d\u0435 \u043d\u0430 \u0441\u0438\u043b\u043d\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043d\u0438","deck4":"\u0421\u0438\u0441\u0442\u0435\u043c\u043d\u043e \u043c\u0438\u0441\u043b\u0435\u043d\u0435","SELECT_CARDS":"Select cards","ZOOM":"zoom","SHOW_ALL":"Show all","POSITION_RESET":"Position reset","CLEAR_BOARD":"Clear board"}'
      );
      class K3 {
        constructor(e, t, i) {
          (this.id = e),
            (this.side = t),
            (this.deckId = i),
            (this.checked = !1);
        }
      }
      const oM = [
        {
          id: 1,
          title: pr.deck1,
          color: "#d4412d",
          backSide: !1,
          empty: !1,
          accentIcons: [0, 1, 3, 4, 5, 6, 8, 9, 10, 11, 13, 14],
          accentColor: "whitesmoke",
          iconColor: "black",
        },
        {
          id: 2,
          title: pr.deck2,
          color: "#0b4790",
          backSide: !1,
          empty: !1,
          accentIcons: [],
          accentColor: "whitesmoke",
          iconColor: "black",
        },
        {
          id: 3,
          title: pr.deck3,
          color: "#f9cb16",
          backSide: !1,
          empty: !1,
          accentIcons: [],
          accentColor: "whitesmoke",
          iconColor: "black",
        },
        {
          id: 4,
          title: pr.deck4,
          color: "#1d7543",
          backSide: !1,
          empty: !1,
          accentIcons: [],
          accentColor: "whitesmoke",
          iconColor: "black",
        },
      ];
      let aM = (() => {
          class n {
            constructor() {
              (this.TEXT = pr),
                (this.lastZindex = 0),
                (this.deckState = Array(5).fill("")),
                (this.cards = []),
                (this.decks = oM),
                (this.openCards = Array(60).fill("inactive")),
                (this.mousePosition = { x: 0, y: 0 }),
                (this.magnifiedCard = Array(60).fill(!1)),
                (this.minify = !1),
                (this.dragged = Array(60).fill({})),
                (this.selectionMode = !1),
                (this.checkboxHide = !0),
                (this.checkedIcons = !1),
                (this.dropCard = new ce()),
                (this.dragEvent = !1);
              const t = localStorage.getItem("openCards");
              t && (this.cards = JSON.parse(t));
              const i = localStorage.getItem("deckCards");
              i && i.length > 2 && (this.decks = JSON.parse(i)),
                this.saveState(),
                this.dropCard.subscribe(() => {
                  (this.dragEvent = !0),
                    setTimeout(() => {
                      this.dragEvent = !1;
                    }, 400);
                });
            }
            checkToggleCard(t, i) {
              (t.checked = i), this.hasCheckedIcons();
            }
            hasCheckedIcons() {
              this.checkedIcons = !!this.cards.filter((t) => t.checked).length;
            }
            checkAllEmptyDecks() {
              this.decks.forEach((t) => {
                t.empty = !!this.isEmptyDeck(t.id);
              }),
                this.saveState();
            }
            randomIntFromInterval(t, i) {
              return Math.floor(Math.random() * (i - t + 1) + t);
            }
            checkOpened(t) {
              return "active" === this.openCards[t];
            }
            filterSelected() {
              (this.selectionMode = !1),
                (this.cards = this.cards.filter(
                  (t) => !!t.checked && ((t.checked = !1), !0)
                )),
                this.checkAllEmptyDecks(),
                this.hasCheckedIcons(),
                this.saveState();
            }
            showAllCards(t) {
              if (!t || this.deckCardsLeft(t)) {
                if (
                  (this.positionReset(),
                  this.cards.forEach((i) => (i.checked = !0)),
                  t)
                )
                  do {} while (this.takeCard(t));
                else
                  this.decks.forEach((i) => {
                    do {} while (this.takeCard(i));
                  });
                this.hasCheckedIcons(), (this.selectionMode = !0);
              }
            }
            deckCardsLeft(t) {
              return (
                15 - this.cards.filter((s) => s.deckId === t.id).length > 0
              );
            }
            positionReset() {
              this.cards.map((t) => {
                (t.position = void 0), (t.magnified = !1);
              }),
                this.saveState();
            }
            flipDeck(t) {
              (t.backSide = !t.backSide), this.saveState();
            }
            flipCard(t) {
              this.dragEvent ||
                ((t.side = t.side ? "" : "b"), this.saveState());
            }
            flipSelectCard(t) {
              this.flipCard(t), this.checkToggleCard(t, !0);
            }
            takeCard(t) {
              return (
                !this.checkedIcons &&
                (this.getCard(t),
                this.saveState(),
                !this.isEmptyDeck(t.id) || ((t.empty = !0), !1))
              );
            }
            getCard(t) {
              if (this.isEmptyDeck(t.id)) return;
              let i;
              do {
                i = this.randomIntFromInterval(0, 14);
              } while (
                this.cards
                  .filter((r) => r.deckId === t.id)
                  .map((r) => r.id)
                  .includes(i)
              );
              this.cards.push(new K3(i, t.backSide ? "b" : "", t.id)),
                this.checkOnlyOneDeckOpen();
            }
            checkOnlyOneDeckOpen() {
              this.selectionMode = !!this.onlyOneDeckOpen();
            }
            isEmptyDeck(t) {
              return this.cards.filter((i) => i.deckId === t).length > 14;
            }
            allCardsDragged() {
              return (
                this.cards.filter((i) => void 0 !== i.position).length ===
                this.cards.length
              );
            }
            getDeckState(t) {
              return this.deckState[t] ? "_front" : "_back";
            }
            getDeckBG(t) {
              return (
                "url(./assets/cards/deck_" +
                t.id +
                (t.backSide ? "b" : "") +
                ".jpg)"
              );
            }
            getIconColor(t) {
              var i;
              const r = this.decks.filter((s) => s.id === t.deckId)[0];
              return (
                null === (i = r.accentIcons) || void 0 === i
                  ? void 0
                  : i.includes(t.id)
              )
                ? r.accentColor
                : r.iconColor;
            }
            getDeckColor(t) {
              return (t.backSide && t.accentIcons.includes("b")) ||
                t.accentIcons.includes("f")
                ? t.accentColor
                : t.iconColor;
            }
            removeCard(t) {
              if (this.dragEvent) return;
              const i = this.cards.findIndex(
                  (s) => s.id === t.id && s.deckId === t.deckId
                ),
                r = this.decks.findIndex((s) => s.id === t.deckId);
              -1 != i &&
                (this.cards.splice(i, 1),
                (this.decks[r].empty = !!this.isEmptyDeck(t.deckId)),
                this.saveState()),
                this.checkOnlyOneDeckOpen();
            }
            onlyOneDeckOpen() {
              return !(
                15 !== this.cards.length ||
                1 !=
                  this.cards
                    .map((i) => i.deckId)
                    .filter((i, r, s) => s.indexOf(i) === r).length
              );
            }
            magnify(t, i) {
              if (this.dragEvent) return;
              i.magnified = !i.magnified;
              const r = t.path[2].style;
              (this.lastZindex += 10),
                (r.zIndex = this.lastZindex),
                this.saveState();
            }
            saveState() {
              localStorage.setItem("openCards", JSON.stringify(this.cards)),
                localStorage.setItem("deckCards", JSON.stringify(this.decks));
            }
            resetGame() {
              (this.cards = []),
                (this.decks = []),
                (this.checkedIcons = !1),
                this.saveState(),
                (this.decks = oM),
                this.checkAllEmptyDecks();
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        lM = (() => {
          class n {
            create(t) {
              return "undefined" == typeof MutationObserver
                ? null
                : new MutationObserver(t);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        Y3 = (() => {
          class n {
            constructor(t) {
              (this._mutationObserverFactory = t),
                (this._observedElements = new Map());
            }
            ngOnDestroy() {
              this._observedElements.forEach((t, i) =>
                this._cleanupObserver(i)
              );
            }
            observe(t) {
              const i = He(t);
              return new Se((r) => {
                const o = this._observeElement(i).subscribe(r);
                return () => {
                  o.unsubscribe(), this._unobserveElement(i);
                };
              });
            }
            _observeElement(t) {
              if (this._observedElements.has(t))
                this._observedElements.get(t).count++;
              else {
                const i = new q(),
                  r = this._mutationObserverFactory.create((s) => i.next(s));
                r &&
                  r.observe(t, {
                    characterData: !0,
                    childList: !0,
                    subtree: !0,
                  }),
                  this._observedElements.set(t, {
                    observer: r,
                    stream: i,
                    count: 1,
                  });
              }
              return this._observedElements.get(t).stream;
            }
            _unobserveElement(t) {
              this._observedElements.has(t) &&
                (this._observedElements.get(t).count--,
                this._observedElements.get(t).count ||
                  this._cleanupObserver(t));
            }
            _cleanupObserver(t) {
              if (this._observedElements.has(t)) {
                const { observer: i, stream: r } =
                  this._observedElements.get(t);
                i && i.disconnect(),
                  r.complete(),
                  this._observedElements.delete(t);
              }
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(b(lM));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        Q3 = (() => {
          class n {
            constructor(t, i, r) {
              (this._contentObserver = t),
                (this._elementRef = i),
                (this._ngZone = r),
                (this.event = new ce()),
                (this._disabled = !1),
                (this._currentSubscription = null);
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(t) {
              (this._disabled = At(t)),
                this._disabled ? this._unsubscribe() : this._subscribe();
            }
            get debounce() {
              return this._debounce;
            }
            set debounce(t) {
              (this._debounce = Cf(t)), this._subscribe();
            }
            ngAfterContentInit() {
              !this._currentSubscription && !this.disabled && this._subscribe();
            }
            ngOnDestroy() {
              this._unsubscribe();
            }
            _subscribe() {
              this._unsubscribe();
              const t = this._contentObserver.observe(this._elementRef);
              this._ngZone.runOutsideAngular(() => {
                this._currentSubscription = (
                  this.debounce
                    ? t.pipe(
                        (function (n, e = xf) {
                          return Je((t, i) => {
                            let r = null,
                              s = null,
                              o = null;
                            const a = () => {
                              if (r) {
                                r.unsubscribe(), (r = null);
                                const c = s;
                                (s = null), i.next(c);
                              }
                            };
                            function l() {
                              const c = o + n,
                                u = e.now();
                              if (u < c)
                                return (
                                  (r = this.schedule(void 0, c - u)),
                                  void i.add(r)
                                );
                              a();
                            }
                            t.subscribe(
                              new et(
                                i,
                                (c) => {
                                  (s = c),
                                    (o = e.now()),
                                    r || ((r = e.schedule(l, n)), i.add(r));
                                },
                                () => {
                                  a(), i.complete();
                                },
                                void 0,
                                () => {
                                  s = r = null;
                                }
                              )
                            );
                          });
                        })(this.debounce)
                      )
                    : t
                ).subscribe(this.event);
              });
            }
            _unsubscribe() {
              var t;
              null == (t = this._currentSubscription) || t.unsubscribe();
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(v(Y3), v(ge), v(oe));
            }),
            (n.ɵdir = O({
              type: n,
              selectors: [["", "cdkObserveContent", ""]],
              inputs: {
                disabled: ["cdkObserveContentDisabled", "disabled"],
                debounce: "debounce",
              },
              outputs: { event: "cdkObserveContent" },
              exportAs: ["cdkObserveContent"],
            })),
            n
          );
        })(),
        X3 = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = be({ type: n })),
            (n.ɵinj = pe({ providers: [lM] })),
            n
          );
        })();
      const Z3 = ["input"],
        J3 = function (n) {
          return { enterDuration: n };
        },
        eU = ["*"],
        tU = new x("mat-checkbox-default-options", {
          providedIn: "root",
          factory: cM,
        });
      function cM() {
        return { color: "accent", clickAction: "check-indeterminate" };
      }
      let nU = 0;
      const uM = cM(),
        iU = { provide: ln, useExisting: ae(() => dM), multi: !0 };
      class rU {}
      const sU = mH(
        Ep(
          Ec(
            Iw(
              class {
                constructor(n) {
                  this._elementRef = n;
                }
              }
            )
          )
        )
      );
      let dM = (() => {
          class n extends sU {
            constructor(t, i, r, s, o, a, l) {
              super(t),
                (this._changeDetectorRef = i),
                (this._focusMonitor = r),
                (this._ngZone = s),
                (this._animationMode = a),
                (this._options = l),
                (this.ariaLabel = ""),
                (this.ariaLabelledby = null),
                (this._uniqueId = "mat-checkbox-" + ++nU),
                (this.id = this._uniqueId),
                (this.labelPosition = "after"),
                (this.name = null),
                (this.change = new ce()),
                (this.indeterminateChange = new ce()),
                (this._onTouched = () => {}),
                (this._currentAnimationClass = ""),
                (this._currentCheckState = 0),
                (this._controlValueAccessorChangeFn = () => {}),
                (this._checked = !1),
                (this._disabled = !1),
                (this._indeterminate = !1),
                (this._options = this._options || uM),
                (this.color = this.defaultColor =
                  this._options.color || uM.color),
                (this.tabIndex = parseInt(o) || 0);
            }
            get inputId() {
              return `${this.id || this._uniqueId}-input`;
            }
            get required() {
              return this._required;
            }
            set required(t) {
              this._required = At(t);
            }
            ngAfterViewInit() {
              this._focusMonitor
                .monitor(this._elementRef, !0)
                .subscribe((t) => {
                  t ||
                    Promise.resolve().then(() => {
                      this._onTouched(), this._changeDetectorRef.markForCheck();
                    });
                }),
                this._syncIndeterminate(this._indeterminate);
            }
            ngAfterViewChecked() {}
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef);
            }
            get checked() {
              return this._checked;
            }
            set checked(t) {
              t != this.checked &&
                ((this._checked = t), this._changeDetectorRef.markForCheck());
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(t) {
              const i = At(t);
              i !== this.disabled &&
                ((this._disabled = i), this._changeDetectorRef.markForCheck());
            }
            get indeterminate() {
              return this._indeterminate;
            }
            set indeterminate(t) {
              const i = t != this._indeterminate;
              (this._indeterminate = At(t)),
                i &&
                  (this._transitionCheckState(
                    this._indeterminate ? 3 : this.checked ? 1 : 2
                  ),
                  this.indeterminateChange.emit(this._indeterminate)),
                this._syncIndeterminate(this._indeterminate);
            }
            _isRippleDisabled() {
              return this.disableRipple || this.disabled;
            }
            _onLabelTextChange() {
              this._changeDetectorRef.detectChanges();
            }
            writeValue(t) {
              this.checked = !!t;
            }
            registerOnChange(t) {
              this._controlValueAccessorChangeFn = t;
            }
            registerOnTouched(t) {
              this._onTouched = t;
            }
            setDisabledState(t) {
              this.disabled = t;
            }
            _getAriaChecked() {
              return this.checked
                ? "true"
                : this.indeterminate
                ? "mixed"
                : "false";
            }
            _transitionCheckState(t) {
              let i = this._currentCheckState,
                r = this._elementRef.nativeElement;
              if (
                i !== t &&
                (this._currentAnimationClass.length > 0 &&
                  r.classList.remove(this._currentAnimationClass),
                (this._currentAnimationClass =
                  this._getAnimationClassForCheckStateTransition(i, t)),
                (this._currentCheckState = t),
                this._currentAnimationClass.length > 0)
              ) {
                r.classList.add(this._currentAnimationClass);
                const s = this._currentAnimationClass;
                this._ngZone.runOutsideAngular(() => {
                  setTimeout(() => {
                    r.classList.remove(s);
                  }, 1e3);
                });
              }
            }
            _emitChangeEvent() {
              const t = new rU();
              (t.source = this),
                (t.checked = this.checked),
                this._controlValueAccessorChangeFn(this.checked),
                this.change.emit(t),
                this._inputElement &&
                  (this._inputElement.nativeElement.checked = this.checked);
            }
            toggle() {
              this.checked = !this.checked;
            }
            _onInputClick(t) {
              var r;
              const i = null == (r = this._options) ? void 0 : r.clickAction;
              t.stopPropagation(),
                this.disabled || "noop" === i
                  ? !this.disabled &&
                    "noop" === i &&
                    ((this._inputElement.nativeElement.checked = this.checked),
                    (this._inputElement.nativeElement.indeterminate =
                      this.indeterminate))
                  : (this.indeterminate &&
                      "check" !== i &&
                      Promise.resolve().then(() => {
                        (this._indeterminate = !1),
                          this.indeterminateChange.emit(this._indeterminate);
                      }),
                    this.toggle(),
                    this._transitionCheckState(this._checked ? 1 : 2),
                    this._emitChangeEvent());
            }
            focus(t, i) {
              t
                ? this._focusMonitor.focusVia(this._inputElement, t, i)
                : this._inputElement.nativeElement.focus(i);
            }
            _onInteractionEvent(t) {
              t.stopPropagation();
            }
            _getAnimationClassForCheckStateTransition(t, i) {
              if ("NoopAnimations" === this._animationMode) return "";
              let r = "";
              switch (t) {
                case 0:
                  if (1 === i) r = "unchecked-checked";
                  else {
                    if (3 != i) return "";
                    r = "unchecked-indeterminate";
                  }
                  break;
                case 2:
                  r = 1 === i ? "unchecked-checked" : "unchecked-indeterminate";
                  break;
                case 1:
                  r = 2 === i ? "checked-unchecked" : "checked-indeterminate";
                  break;
                case 3:
                  r =
                    1 === i
                      ? "indeterminate-checked"
                      : "indeterminate-unchecked";
              }
              return `mat-checkbox-anim-${r}`;
            }
            _syncIndeterminate(t) {
              const i = this._inputElement;
              i && (i.nativeElement.indeterminate = t);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(
                v(ge),
                v(wo),
                v(Ff),
                v(oe),
                Ir("tabindex"),
                v(xs, 8),
                v(tU, 8)
              );
            }),
            (n.ɵcmp = Sn({
              type: n,
              selectors: [["mat-checkbox"]],
              viewQuery: function (t, i) {
                if ((1 & t && (us(Z3, 5), us(ta, 5)), 2 & t)) {
                  let r;
                  Ut((r = zt())) && (i._inputElement = r.first),
                    Ut((r = zt())) && (i.ripple = r.first);
                }
              },
              hostAttrs: [1, "mat-checkbox"],
              hostVars: 12,
              hostBindings: function (t, i) {
                2 & t &&
                  (Ud("id", i.id),
                  st("tabindex", null),
                  kt("mat-checkbox-indeterminate", i.indeterminate)(
                    "mat-checkbox-checked",
                    i.checked
                  )("mat-checkbox-disabled", i.disabled)(
                    "mat-checkbox-label-before",
                    "before" == i.labelPosition
                  )(
                    "_mat-animation-noopable",
                    "NoopAnimations" === i._animationMode
                  ));
              },
              inputs: {
                disableRipple: "disableRipple",
                color: "color",
                tabIndex: "tabIndex",
                ariaLabel: ["aria-label", "ariaLabel"],
                ariaLabelledby: ["aria-labelledby", "ariaLabelledby"],
                ariaDescribedby: ["aria-describedby", "ariaDescribedby"],
                id: "id",
                required: "required",
                labelPosition: "labelPosition",
                name: "name",
                value: "value",
                checked: "checked",
                disabled: "disabled",
                indeterminate: "indeterminate",
              },
              outputs: {
                change: "change",
                indeterminateChange: "indeterminateChange",
              },
              exportAs: ["matCheckbox"],
              features: [fe([iU]), ie],
              ngContentSelectors: eU,
              decls: 17,
              vars: 21,
              consts: [
                [1, "mat-checkbox-layout"],
                ["label", ""],
                [1, "mat-checkbox-inner-container"],
                [
                  "type",
                  "checkbox",
                  1,
                  "mat-checkbox-input",
                  "cdk-visually-hidden",
                  3,
                  "id",
                  "required",
                  "checked",
                  "disabled",
                  "tabIndex",
                  "change",
                  "click",
                ],
                ["input", ""],
                [
                  "matRipple",
                  "",
                  1,
                  "mat-checkbox-ripple",
                  "mat-focus-indicator",
                  3,
                  "matRippleTrigger",
                  "matRippleDisabled",
                  "matRippleRadius",
                  "matRippleCentered",
                  "matRippleAnimation",
                ],
                [1, "mat-ripple-element", "mat-checkbox-persistent-ripple"],
                [1, "mat-checkbox-frame"],
                [1, "mat-checkbox-background"],
                [
                  "version",
                  "1.1",
                  "focusable",
                  "false",
                  "viewBox",
                  "0 0 24 24",
                  0,
                  "xml",
                  "space",
                  "preserve",
                  "aria-hidden",
                  "true",
                  1,
                  "mat-checkbox-checkmark",
                ],
                [
                  "fill",
                  "none",
                  "stroke",
                  "white",
                  "d",
                  "M4.1,12.7 9,17.6 20.3,6.3",
                  1,
                  "mat-checkbox-checkmark-path",
                ],
                [1, "mat-checkbox-mixedmark"],
                [1, "mat-checkbox-label", 3, "cdkObserveContent"],
                ["checkboxLabel", ""],
                [2, "display", "none"],
              ],
              template: function (t, i) {
                if (
                  (1 & t &&
                    (ts(),
                    T(0, "label", 0, 1),
                    T(2, "span", 2),
                    T(3, "input", 3, 4),
                    se("change", function (s) {
                      return i._onInteractionEvent(s);
                    })("click", function (s) {
                      return i._onInputClick(s);
                    }),
                    A(),
                    T(5, "span", 5),
                    ot(6, "span", 6),
                    A(),
                    ot(7, "span", 7),
                    T(8, "span", 8),
                    yu(),
                    T(9, "svg", 9),
                    ot(10, "path", 10),
                    A(),
                    (V.lFrame.currentNamespace = null),
                    ot(11, "span", 11),
                    A(),
                    A(),
                    T(12, "span", 12, 13),
                    se("cdkObserveContent", function () {
                      return i._onLabelTextChange();
                    }),
                    T(14, "span", 14),
                    Te(15, "\xa0"),
                    A(),
                    Wi(16),
                    A(),
                    A()),
                  2 & t)
                ) {
                  const r = Rd(1),
                    s = Rd(13);
                  st("for", i.inputId),
                    ee(2),
                    kt(
                      "mat-checkbox-inner-container-no-side-margin",
                      !s.textContent || !s.textContent.trim()
                    ),
                    ee(1),
                    ve("id", i.inputId)("required", i.required)(
                      "checked",
                      i.checked
                    )("disabled", i.disabled)("tabIndex", i.tabIndex),
                    st("value", i.value)("name", i.name)(
                      "aria-label",
                      i.ariaLabel || null
                    )("aria-labelledby", i.ariaLabelledby)(
                      "aria-checked",
                      i._getAriaChecked()
                    )("aria-describedby", i.ariaDescribedby),
                    ee(2),
                    ve("matRippleTrigger", r)(
                      "matRippleDisabled",
                      i._isRippleDisabled()
                    )("matRippleRadius", 20)("matRippleCentered", !0)(
                      "matRippleAnimation",
                      gb(
                        19,
                        J3,
                        "NoopAnimations" === i._animationMode ? 0 : 150
                      )
                    );
                }
              },
              directives: [ta, Q3],
              styles: [
                "@keyframes mat-checkbox-fade-in-background{0%{opacity:0}50%{opacity:1}}@keyframes mat-checkbox-fade-out-background{0%,50%{opacity:1}100%{opacity:0}}@keyframes mat-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:22.910259}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1)}100%{stroke-dashoffset:0}}@keyframes mat-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mat-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);stroke-dashoffset:0}to{stroke-dashoffset:-22.910259}}@keyframes mat-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1);opacity:1;transform:rotate(0deg)}to{opacity:0;transform:rotate(45deg)}}@keyframes mat-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);opacity:0;transform:rotate(45deg)}to{opacity:1;transform:rotate(360deg)}}@keyframes mat-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1);opacity:0;transform:rotate(-45deg)}to{opacity:1;transform:rotate(0deg)}}@keyframes mat-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);opacity:1;transform:rotate(0deg)}to{opacity:0;transform:rotate(315deg)}}@keyframes mat-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;opacity:1;transform:scaleX(1)}32.8%,100%{opacity:0;transform:scaleX(0)}}.mat-checkbox-background,.mat-checkbox-frame{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:2px;box-sizing:border-box;pointer-events:none}.mat-checkbox{display:inline-block;transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);cursor:pointer;-webkit-tap-highlight-color:transparent}._mat-animation-noopable.mat-checkbox{transition:none;animation:none}.mat-checkbox .mat-ripple-element:not(.mat-checkbox-persistent-ripple){opacity:.16}.mat-checkbox .mat-checkbox-ripple{position:absolute;left:calc(50% - 20px);top:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}.cdk-high-contrast-active .mat-checkbox.cdk-keyboard-focused .mat-checkbox-ripple{outline:solid 3px}.mat-checkbox-layout{-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.mat-checkbox-label{-webkit-user-select:auto;-moz-user-select:auto;user-select:auto}.mat-checkbox-inner-container{display:inline-block;height:16px;line-height:0;margin:auto;margin-right:8px;order:0;position:relative;vertical-align:middle;white-space:nowrap;width:16px;flex-shrink:0}[dir=rtl] .mat-checkbox-inner-container{margin-left:8px;margin-right:auto}.mat-checkbox-inner-container-no-side-margin{margin-left:0;margin-right:0}.mat-checkbox-frame{background-color:transparent;transition:border-color 90ms cubic-bezier(0, 0, 0.2, 0.1);border-width:2px;border-style:solid}._mat-animation-noopable .mat-checkbox-frame{transition:none}.mat-checkbox-background{align-items:center;display:inline-flex;justify-content:center;transition:background-color 90ms cubic-bezier(0, 0, 0.2, 0.1),opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);-webkit-print-color-adjust:exact;color-adjust:exact}._mat-animation-noopable .mat-checkbox-background{transition:none}.cdk-high-contrast-active .mat-checkbox .mat-checkbox-background{background:none}.mat-checkbox-persistent-ripple{display:block;width:100%;height:100%;transform:none}.mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{opacity:.04}.mat-checkbox.cdk-keyboard-focused .mat-checkbox-persistent-ripple{opacity:.12}.mat-checkbox-persistent-ripple,.mat-checkbox.mat-checkbox-disabled .mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{opacity:0}@media(hover: none){.mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{display:none}}.mat-checkbox-checkmark{top:0;left:0;right:0;bottom:0;position:absolute;width:100%}.mat-checkbox-checkmark-path{stroke-dashoffset:22.910259;stroke-dasharray:22.910259;stroke-width:2.1333333333px}.cdk-high-contrast-black-on-white .mat-checkbox-checkmark-path{stroke:#000 !important}.mat-checkbox-mixedmark{width:calc(100% - 6px);height:2px;opacity:0;transform:scaleX(0) rotate(0deg);border-radius:2px}.cdk-high-contrast-active .mat-checkbox-mixedmark{height:0;border-top:solid 2px;margin-top:2px}.mat-checkbox-label-before .mat-checkbox-inner-container{order:1;margin-left:8px;margin-right:auto}[dir=rtl] .mat-checkbox-label-before .mat-checkbox-inner-container{margin-left:auto;margin-right:8px}.mat-checkbox-checked .mat-checkbox-checkmark{opacity:1}.mat-checkbox-checked .mat-checkbox-checkmark-path{stroke-dashoffset:0}.mat-checkbox-checked .mat-checkbox-mixedmark{transform:scaleX(1) rotate(-45deg)}.mat-checkbox-indeterminate .mat-checkbox-checkmark{opacity:0;transform:rotate(45deg)}.mat-checkbox-indeterminate .mat-checkbox-checkmark-path{stroke-dashoffset:0}.mat-checkbox-indeterminate .mat-checkbox-mixedmark{opacity:1;transform:scaleX(1) rotate(0deg)}.mat-checkbox-unchecked .mat-checkbox-background{background-color:transparent}.mat-checkbox-disabled{cursor:default}.cdk-high-contrast-active .mat-checkbox-disabled{opacity:.5}.mat-checkbox-anim-unchecked-checked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-in-background}.mat-checkbox-anim-unchecked-checked .mat-checkbox-checkmark-path{animation:180ms linear 0ms mat-checkbox-unchecked-checked-checkmark-path}.mat-checkbox-anim-unchecked-indeterminate .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-in-background}.mat-checkbox-anim-unchecked-indeterminate .mat-checkbox-mixedmark{animation:90ms linear 0ms mat-checkbox-unchecked-indeterminate-mixedmark}.mat-checkbox-anim-checked-unchecked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-out-background}.mat-checkbox-anim-checked-unchecked .mat-checkbox-checkmark-path{animation:90ms linear 0ms mat-checkbox-checked-unchecked-checkmark-path}.mat-checkbox-anim-checked-indeterminate .mat-checkbox-checkmark{animation:90ms linear 0ms mat-checkbox-checked-indeterminate-checkmark}.mat-checkbox-anim-checked-indeterminate .mat-checkbox-mixedmark{animation:90ms linear 0ms mat-checkbox-checked-indeterminate-mixedmark}.mat-checkbox-anim-indeterminate-checked .mat-checkbox-checkmark{animation:500ms linear 0ms mat-checkbox-indeterminate-checked-checkmark}.mat-checkbox-anim-indeterminate-checked .mat-checkbox-mixedmark{animation:500ms linear 0ms mat-checkbox-indeterminate-checked-mixedmark}.mat-checkbox-anim-indeterminate-unchecked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-out-background}.mat-checkbox-anim-indeterminate-unchecked .mat-checkbox-mixedmark{animation:300ms linear 0ms mat-checkbox-indeterminate-unchecked-mixedmark}.mat-checkbox-input{bottom:0;left:50%}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        hM = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = be({ type: n })),
            (n.ɵinj = pe({})),
            n
          );
        })(),
        lU = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = be({ type: n })),
            (n.ɵinj = pe({ imports: [[wc, Qe, X3, hM], Qe, hM] })),
            n
          );
        })();
      function cU(n, e) {
        if (1 & n) {
          const t = _i();
          T(0, "button", 12),
            T(1, "mat-icon", 9),
            se("click", function (r) {
              Nt(t);
              const s = re().$implicit;
              return re().showAllCards(s), r.stopPropagation();
            }),
            Te(2, "apps "),
            A(),
            A();
        }
        if (2 & n) {
          const t = re().$implicit,
            i = re();
          ee(1), _t("color", i.gs.getDeckColor(t));
        }
      }
      function uU(n, e) {
        if ((1 & n && (T(0, "span", 13), Te(1), A()), 2 & n)) {
          const t = re().$implicit;
          _t("color", t.color), ee(1), po("", t.title, " ");
        }
      }
      function dU(n, e) {
        if (1 & n) {
          const t = _i();
          T(0, "div", 7),
            se("click", function () {
              const s = Nt(t).$implicit;
              return re().gs.takeCard(s);
            }),
            T(1, "button", 8),
            T(2, "mat-icon", 9),
            se("click", function (r) {
              const o = Nt(t).$implicit;
              return re().gs.flipDeck(o), r.stopPropagation();
            }),
            Te(3, "360 "),
            A(),
            A(),
            It(4, cU, 3, 2, "button", 10),
            It(5, uU, 2, 3, "span", 11),
            A();
        }
        if (2 & n) {
          const t = e.$implicit,
            i = re();
          _t("color", i.gs.getDeckColor(t))("background", i.gs.getDeckBG(t)),
            ve("ngClass", t.empty || i.gs.checkedIcons ? "emptyDeck" : ""),
            ee(2),
            _t("color", i.gs.getDeckColor(t)),
            ee(2),
            ve("ngIf", !i.gs.checkedIcons && !t.empty),
            ee(1),
            ve("ngIf", t.backSide);
        }
      }
      function hU(n, e) {
        1 & n && (T(0, "div", 14), ot(1, "div", 15), A());
      }
      function fU(n, e) {
        if (1 & n) {
          const t = _i();
          T(0, "div", 21),
            T(1, "mat-icon", 22),
            se("click", function (r) {
              Nt(t);
              const s = re().$implicit;
              return re().gs.flipCard(s), r.stopPropagation();
            }),
            Te(2, "360"),
            A(),
            T(3, "mat-icon", 23),
            se("click", function (r) {
              Nt(t);
              const s = re().$implicit;
              return re().gs.magnify(r, s), r.stopPropagation();
            }),
            Te(4, " image_search "),
            A(),
            T(5, "mat-icon", 24),
            se("click", function () {
              Nt(t);
              const r = re().$implicit;
              return re().gs.removeCard(r);
            }),
            Te(6, "delete "),
            A(),
            A();
        }
        if (2 & n) {
          const t = re().$implicit,
            i = re();
          ee(1),
            _t("color", i.gs.getIconColor(t)),
            ee(2),
            _t("color", i.gs.getIconColor(t)),
            ee(2),
            _t("color", i.gs.getIconColor(t));
        }
      }
      function pU(n, e) {
        if (1 & n) {
          const t = _i();
          T(0, "div", 21),
            T(1, "mat-icon", 22),
            se("click", function (r) {
              Nt(t);
              const s = re().$implicit;
              return re().gs.flipCard(s), r.stopPropagation();
            }),
            Te(2, "360"),
            A(),
            A();
        }
        if (2 & n) {
          const t = re().$implicit,
            i = re();
          ee(1), _t("color", i.gs.getIconColor(t));
        }
      }
      function mU(n, e) {
        1 & n &&
          (T(0, "div", 25),
          yu(),
          T(1, "svg", 26),
          ot(2, "path", 27),
          ot(3, "path", 28),
          A(),
          A());
      }
      function gU(n, e) {
        if (1 & n) {
          const t = _i();
          T(0, "mat-checkbox", 29),
            se("change", function (r) {
              Nt(t);
              const s = re().$implicit;
              return re().gs.checkToggleCard(s, r.checked);
            }),
            A();
        }
        if (2 & n) {
          const t = re().$implicit,
            i = re();
          ve("checked", t.checked)("color", i.gs.getIconColor(t));
        }
      }
      const _U = function () {
        return { x: 0, y: 0 };
      };
      function yU(n, e) {
        if (1 & n) {
          const t = _i();
          T(0, "div", 16),
            se("cdkDragStarted", function (r) {
              const o = Nt(t).$implicit;
              return re().dragMove(r, o);
            })("cdkDragEnded", function (r) {
              const o = Nt(t).$implicit;
              return re().dragEnd(r, o);
            }),
            T(1, "div", 17),
            se("mousedown", function (r) {
              return Nt(t), re().mouseDown(r);
            }),
            It(2, fU, 7, 6, "div", 18),
            It(3, pU, 3, 2, "div", 18),
            It(4, mU, 4, 0, "div", 19),
            It(5, gU, 1, 2, "mat-checkbox", 20),
            A(),
            A();
        }
        if (2 & n) {
          const t = e.$implicit,
            i = re();
          _t("position", t.position ? "absolute" : ""),
            ve("cdkDragDisabled", i.gs.selectionMode)(
              "cdkDragFreeDragPosition",
              t.position
                ? t.position
                : (function (n, e, t) {
                    const i = pt() + n,
                      r = C();
                    return r[i] === z
                      ? Nn(r, i, t ? e.call(t) : e())
                      : (function (n, e) {
                          return n[e];
                        })(r, i);
                  })(11, _U)
            ),
            ee(1),
            _t(
              "background-image",
              "url(./assets/cards/YOKO_" +
                t.deckId +
                "_" +
                t.id +
                (t.side || "") +
                ".jpg)"
            ),
            ve("ngClass", t.magnified ? "magnify" : ""),
            ee(1),
            ve("ngIf", !i.gs.selectionMode && !i.dragEvent),
            ee(1),
            ve("ngIf", i.gs.selectionMode),
            ee(1),
            ve("ngIf", i.isMobileDevice()),
            ee(1),
            ve("ngIf", i.gs.selectionMode);
        }
      }
      let vU = (() => {
        class n {
          constructor(t) {
            (this.gs = t),
              (this.componentDestroyed$ = new q()),
              (this.windowWidth = window.innerWidth),
              (this.windowHeight = window.innerHeight),
              (this.TEXT = pr),
              (this.mousePosition = { x: 0, y: 0 }),
              (this.lastZindex = 0),
              (this.dragEvent = !1);
          }
          onResize(t) {
            (this.windowWidth = window.innerWidth),
              (this.windowHeight = window.innerHeight);
          }
          ngOnInit() {
            this.gs.checkAllEmptyDecks(), this.gs.checkOnlyOneDeckOpen();
          }
          dragMove(t, i) {
            const r = t.source.element.nativeElement.style;
            (this.dragEvent = !0),
              (this.lastZindex += 10),
              (r.zIndex = this.lastZindex);
          }
          showAllCards(t) {
            this.gs.showAllCards(t);
          }
          isMobileDevice() {
            if (this.windowWidth < 550 || this.windowHeight < 550) return !0;
            const t = navigator.userAgent;
            return !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
              t
            );
          }
          dragEnd(t, i) {
            this.dragEvent = !1;
            const r = t.source.element.nativeElement.style,
              s = t.source.element.nativeElement.clientHeight < 200,
              o = t.source.getRootElement().getBoundingClientRect();
            (i.position = t.source.getFreeDragPosition()),
              r.position ||
                (i.position = {
                  x:
                    o.left -
                    (s ? 80 : 50) -
                    (window.innerWidth < 415 ? -80 : -20) -
                    window.innerWidth / 2.5,
                  y:
                    o.top -
                    (window.innerWidth < 415 ? 180 : 0) -
                    window.innerHeight / 3 +
                    (s ? 80 : 0),
                }),
              this.gs.dropCard.emit(),
              this.gs.saveState();
          }
          getPosition(t) {
            let i = 0,
              r = 0;
            for (; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop); )
              (i += t.offsetLeft - t.scrollLeft),
                (r += t.offsetTop - t.scrollTop),
                (t = t.offsetParent);
            return { top: r, left: i };
          }
          mouseDown(t) {
            (this.mousePosition.x = t.screenX),
              (this.mousePosition.y = t.screenY);
          }
          ngOnDestroy() {
            this.componentDestroyed$.next(0),
              this.componentDestroyed$.complete();
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(v(aM));
          }),
          (n.ɵcmp = Sn({
            type: n,
            selectors: [["app-card"]],
            hostBindings: function (t, i) {
              1 & t &&
                se(
                  "resize",
                  function (s) {
                    return i.onResize(s);
                  },
                  !1,
                  Kg
                );
            },
            decls: 7,
            vars: 3,
            consts: [
              ["fxFlex", "", 1, "container", "tp-wrapper"],
              ["fxLayout", "row", 1, "card-container", "tp-wrapper"],
              [
                "class",
                "deck",
                3,
                "color",
                "ngClass",
                "background",
                "click",
                4,
                "ngFor",
                "ngForOf",
              ],
              [1, "clear"],
              [1, "card-container", "tp-wrapper", "top10"],
              ["class", "tp-box", 4, "ngIf"],
              [
                "class",
                "tp-box",
                "cdkDrag",
                "",
                3,
                "cdkDragDisabled",
                "cdkDragFreeDragPosition",
                "position",
                "cdkDragStarted",
                "cdkDragEnded",
                4,
                "ngFor",
                "ngForOf",
              ],
              [1, "deck", 3, "ngClass", "click"],
              ["mat-icon-button", "", 1, "flipIcon"],
              [3, "click"],
              ["mat-icon-button", "", "class", "showDeckIcon", 4, "ngIf"],
              ["class", "deckTitle", 3, "color", 4, "ngIf"],
              ["mat-icon-button", "", 1, "showDeckIcon"],
              [1, "deckTitle"],
              [1, "tp-box"],
              [1, "firstCard"],
              [
                "cdkDrag",
                "",
                1,
                "tp-box",
                3,
                "cdkDragDisabled",
                "cdkDragFreeDragPosition",
                "cdkDragStarted",
                "cdkDragEnded",
              ],
              [1, "card", 3, "ngClass", "mousedown"],
              ["class", "cardButtons", 4, "ngIf"],
              ["class", "example-handle", "cdkDragHandle", "", 4, "ngIf"],
              ["class", "check", 3, "checked", "color", "change", 4, "ngIf"],
              [1, "cardButtons"],
              [1, "flipCard", "left", 3, "click"],
              [1, "middle", 3, "click"],
              [1, "delete", 3, "click"],
              ["cdkDragHandle", "", 1, "example-handle"],
              ["width", "24px", "fill", "currentColor", "viewBox", "0 0 24 24"],
              [
                "d",
                "M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z",
              ],
              ["d", "M0 0h24v24H0z", "fill", "none"],
              [1, "check", 3, "checked", "color", "change"],
            ],
            template: function (t, i) {
              1 & t &&
                (T(0, "div", 0),
                T(1, "div", 1),
                It(2, dU, 6, 9, "div", 2),
                A(),
                ot(3, "div", 3),
                T(4, "div", 4),
                It(5, hU, 2, 0, "div", 5),
                It(6, yU, 6, 12, "div", 6),
                A(),
                A()),
                2 & t &&
                  (ee(2),
                  ve("ngForOf", i.gs.decks),
                  ee(3),
                  ve("ngIf", i.gs.allCardsDragged()),
                  ee(1),
                  ve("ngForOf", i.gs.cards));
            },
            directives: [_D, Ul, sf, Yw, Kw, VB, PB, dM],
            styles: [
              "[_nghost-%COMP%]{width:100%;height:100%}.tp-box[_ngcontent-%COMP%]{width:180px;height:258px;margin:10px;position:static}.card[_ngcontent-%COMP%]{background-size:contain!important;height:250px;width:180px;background-color:#465658;border:1px solid rgba(255,255,255,.6);position:static;border-radius:12px;color:#fff;text-align:center;cursor:pointer;-webkit-user-select:none;user-select:none;z-index:1}.container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center;min-height:250px;width:100%;margin-bottom:20px;margin-top:20px}.card-container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center;min-height:250px}.card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(:last-child){margin-right:0}.clear[_ngcontent-%COMP%]{width:100%;border:none;margin:0;padding:0}.cdk-drag-preview[_ngcontent-%COMP%]{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.deck[_ngcontent-%COMP%]{all:unset;border-radius:12px;position:relative;background-size:contain!important;background-repeat:no-repeat;height:217px;width:148px;margin:10px 8px 16px;padding:16px;display:flex;cursor:pointer;z-index:0}.leaveSelected[_ngcontent-%COMP%]{position:fixed;color:#fff;top:0px;left:55%}.flipCard[_ngcontent-%COMP%]{position:relative;z-index:999999;top:10px;left:10px}.flipIcon[_ngcontent-%COMP%]{position:relative;z-index:999999;top:-10px;left:-10px}.showDeckIcon[_ngcontent-%COMP%]{display:none;position:relative;z-index:999999;top:-10px;right:-73px}.check[_ngcontent-%COMP%]{color:#fff;cursor:pointer;position:relative;z-index:999999;top:-24px}.middle[_ngcontent-%COMP%]{color:#000;display:none;position:absolute;z-index:999999;top:10px;left:44%;cursor:pointer}.delete[_ngcontent-%COMP%]{color:#000;display:none;position:absolute;top:10px;right:5px;cursor:pointer}.left[_ngcontent-%COMP%]{color:#000;display:none;position:absolute;top:10px;left:5px;cursor:pointer}.card[_ngcontent-%COMP%]:hover   .delete[_ngcontent-%COMP%], .card[_ngcontent-%COMP%]:hover   .middle[_ngcontent-%COMP%], .card[_ngcontent-%COMP%]:hover   .flipIcon[_ngcontent-%COMP%], .card[_ngcontent-%COMP%]:hover   .flipCard[_ngcontent-%COMP%], .deck[_ngcontent-%COMP%]:hover   .showDeckIcon[_ngcontent-%COMP%]{display:block;opacity:.8}.cardButtons[_ngcontent-%COMP%]{left:5px;width:97%;position:relative}.magnify[_ngcontent-%COMP%]{height:327px;width:238px}.emptyDeck[_ngcontent-%COMP%]{cursor:default;opacity:.6}.deckTitle[_ngcontent-%COMP%]{text-align:center;top:39%;left:0px;padding:8px;position:absolute;font-size:20px;font-weight:bold;width:89%}.mat-checkbox-checked.mat-accent[_ngcontent-%COMP%]   .mat-checkbox-background[_ngcontent-%COMP%]{background-color:#000!important}.checkDelete[_ngcontent-%COMP%]{position:absolute;bottom:20px}.top10[_ngcontent-%COMP%]{margin-top:10px}@media screen and (max-width: 831px),screen and (max-height: 500px){.example-handle[_ngcontent-%COMP%]{display:block;position:absolute;bottom:10px;right:10px;color:#ccc;cursor:move;width:24px;height:24px}.deck[_ngcontent-%COMP%]{left:8%;height:115px;width:72px;border-radius:8px}.tp-box[_ngcontent-%COMP%]{height:148px;width:103px}.card[_ngcontent-%COMP%]{height:140px;width:100px;border-radius:8px}.leaveSelected[_ngcontent-%COMP%]{left:60%!important}.magnify[_ngcontent-%COMP%]{zoom:2}.magnify[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{zoom:.7}.card-container[_ngcontent-%COMP%]{top:-10px;min-height:190px}.cardButtons[_ngcontent-%COMP%]{zoom:.75}.emptyDeck[_ngcontent-%COMP%]{cursor:default;opacity:.6}.flipIcon[_ngcontent-%COMP%]{position:relative;z-index:999999;top:-15px;left:-15px}.filterIcon[_ngcontent-%COMP%]{right:0px}.showDeckIcon[_ngcontent-%COMP%]{position:relative;z-index:999999;top:-15px;right:-5px}.card-container[_ngcontent-%COMP%], .container[_ngcontent-%COMP%]{width:95%}.deckTitle[_ngcontent-%COMP%]{text-align:center;top:30%;left:0px;padding:5px;position:absolute;font-size:14px;width:85%}}",
            ],
          })),
          n
        );
      })();
      const bU = ["board"];
      function CU(n, e) {
        1 & n && (T(0, "mat-icon"), Te(1, "zoom_in"), A()),
          2 & n && _t("color", "white");
      }
      function DU(n, e) {
        1 & n && (T(0, "mat-icon"), Te(1, "zoom_out"), A()),
          2 & n && _t("color", "white");
      }
      function EU(n, e) {
        if (1 & n) {
          const t = _i();
          T(0, "button", 10),
            se("click", function () {
              return Nt(t), re().filterSelected();
            }),
            T(1, "mat-icon"),
            Te(2, "apps"),
            A(),
            T(3, "span"),
            Te(4),
            A(),
            A();
        }
        if (2 & n) {
          const t = re();
          ee(4), is(t.TEXT.SELECT_CARDS);
        }
      }
      let wU = (() => {
          class n {
            constructor(t) {
              (this.gs = t), (this.TEXT = pr), (this.marginTop = 0);
            }
            resetGame() {
              this.toggleZoom(!1), this.gs.resetGame();
            }
            showAllCards() {
              this.gs.checkedIcons ||
                ((this.gs.checkboxHide = !1),
                (this.gs.minify = !0),
                this.gs.showAllCards());
            }
            positionReset() {
              this.gs.positionReset();
            }
            filterSelected() {
              this.toggleZoom(!1), this.gs.filterSelected();
            }
            toggleZoom(t) {
              (this.gs.checkboxHide = !0),
                (this.gs.minify = void 0 !== t ? t : !this.gs.minify);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(v(aM));
            }),
            (n.ɵcmp = Sn({
              type: n,
              selectors: [["app-root"]],
              viewQuery: function (t, i) {
                if ((1 & t && us(bU, 5), 2 & t)) {
                  let r;
                  Ut((r = zt())) && (i.board = r.first);
                }
              },
              decls: 32,
              vars: 12,
              consts: [
                [
                  "fxLayout",
                  "row",
                  "id",
                  "content",
                  "role",
                  "main",
                  3,
                  "ngClass",
                ],
                ["board", ""],
                ["fxLayoutAlign", "space-around center", 1, "buttons"],
                ["mat-button", "", 3, "disabled", "click"],
                [1, "btnText"],
                ["mat-button", "", 3, "click"],
                [3, "color", 4, "ngIf"],
                [
                  "class",
                  "filterIcon",
                  "mat-button",
                  "",
                  3,
                  "click",
                  4,
                  "ngIf",
                ],
                [
                  "fxLayout",
                  "row",
                  "fxLayoutAlign",
                  "space-around center",
                  1,
                  "footer1",
                ],
                ["flex", "50"],
                ["mat-button", "", 1, "filterIcon", 3, "click"],
              ],
              template: function (t, i) {
                1 & t &&
                  (T(0, "div", 0, 1),
                  T(2, "div", 2),
                  T(3, "button", 3),
                  se("click", function () {
                    return i.showAllCards();
                  }),
                  T(4, "mat-icon"),
                  Te(5, "apps"),
                  A(),
                  T(6, "span", 4),
                  Te(7),
                  A(),
                  A(),
                  T(8, "button", 5),
                  se("click", function () {
                    return i.positionReset();
                  }),
                  T(9, "mat-icon"),
                  Te(10, "restart_alt"),
                  A(),
                  T(11, "span", 4),
                  Te(12),
                  A(),
                  A(),
                  T(13, "button", 3),
                  se("click", function () {
                    return i.resetGame();
                  }),
                  T(14, "mat-icon"),
                  Te(15, "clear"),
                  A(),
                  T(16, "span", 4),
                  Te(17),
                  A(),
                  A(),
                  T(18, "button", 5),
                  se("click", function () {
                    return i.toggleZoom();
                  }),
                  It(19, CU, 2, 2, "mat-icon", 6),
                  It(20, DU, 2, 2, "mat-icon", 6),
                  T(21, "span", 4),
                  Te(22),
                  A(),
                  A(),
                  It(23, EU, 5, 1, "button", 7),
                  A(),
                  ot(24, "h2"),
                  ot(25, "p"),
                  ot(26, "app-card"),
                  T(27, "div", 8),
                  T(28, "div", 9),
                  Te(29, "Cards demo"),
                  A(),
                  T(30, "div", 9),
                  Te(31, "Cards demo123"),
                  A(),
                  A(),
                  A()),
                  2 & t &&
                    (_t("margin-top", i.marginTop),
                    ve(
                      "ngClass",
                      i.gs.minify || !i.gs.checkboxHide ? "allBoard" : ""
                    ),
                    ee(3),
                    ve("disabled", i.gs.checkedIcons),
                    ee(4),
                    is(i.TEXT.SHOW_ALL),
                    ee(5),
                    is(i.TEXT.POSITION_RESET),
                    ee(1),
                    ve("disabled", i.gs.checkedIcons),
                    ee(4),
                    is(i.TEXT.CLEAR_BOARD),
                    ee(2),
                    ve("ngIf", i.gs.minify),
                    ee(1),
                    ve("ngIf", !i.gs.minify),
                    ee(2),
                    po("", i.TEXT.ZOOM, " "),
                    ee(1),
                    ve("ngIf", i.gs.checkedIcons));
              },
              directives: [sf, Yw, Kw, Ul, vU],
              styles: [
                '[_nghost-%COMP%]{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";font-size:14px;color:#333;box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{margin:8px 0}p[_ngcontent-%COMP%]{margin:0}.toolbar[_ngcontent-%COMP%]{position:relative;top:0;left:0;right:0;height:60px;display:flex;align-items:center;background-color:#7b9093;color:#fff;opacity:.8;font-weight:600;padding-left:40px;z-index:999999}#content[_ngcontent-%COMP%]{position:absolute;width:100%;display:flex;padding:0;min-width:300px;flex-direction:column;align-items:center}mat-icon[_ngcontent-%COMP%]{cursor:pointer}footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:flex;align-items:center}.filterIcon[_ngcontent-%COMP%]{position:absolute;right:5%}[_nghost-%COMP%]     .allBoard .deck{height:115px;width:72px;border-radius:7px}[_nghost-%COMP%]     .allBoard .tp-box{height:148px;width:103px}[_nghost-%COMP%]     .allBoard .card{height:140px;width:100px;border-radius:4px}[_nghost-%COMP%]     .allBoard .magnify{zoom:2}[_nghost-%COMP%]     .allBoard .magnify mat-icon{zoom:.7}[_nghost-%COMP%]     .allBoard .card-container{top:-10px;min-height:190px}[_nghost-%COMP%]     .allBoard .cardButtons{zoom:.75}[_nghost-%COMP%]     .allBoard .emptyDeck{cursor:default;opacity:.6}[_nghost-%COMP%]     .allBoard .flipIcon{position:relative;z-index:999999;top:-15px;left:-15px}[_nghost-%COMP%]     .allBoard .showDeckIcon{position:relative;z-index:999999;top:-15px;right:-5px}[_nghost-%COMP%]     .allBoard .card-container{min-width:300px}[_nghost-%COMP%]     .allBoard .deckTitle{text-align:center;top:30%;left:0px;position:absolute;font-size:14px;width:85%}.buttons[_ngcontent-%COMP%]{color:#fff!important;opacity:.8;position:fixed;z-index:999999999;background-color:#465658;border-radius:0 0 8px 8px}.footer1[_ngcontent-%COMP%]{width:100%;z-index:999999999;position:fixed;bottom:0;background-color:#465658}.footer[_ngcontent-%COMP%]{background-color:#465658;z-index:999999999;position:fixed;bottom:0;color:#fff;opacity:.95;width:100%;height:30px}@media screen and (max-width: 831px),screen and (max-height: 500px){.filterIcon[_ngcontent-%COMP%]{right:0px}}.spacer[_ngcontent-%COMP%]{flex:1 1 auto}',
              ],
            })),
            n
          );
        })(),
        MU = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = be({ type: n, bootstrap: [wU] })),
            (n.ɵinj = pe({
              providers: [],
              imports: [[FD, hH, BB, nj, lj, lU, q3, Lj]],
            })),
            n
          );
        })();
      (function () {
        if (nC)
          throw new Error("Cannot enable prod mode after platform setup.");
        tC = !1;
      })(),
        nV()
          .bootstrapModule(MU)
          .catch((n) => console.error(n));
    },
  },
  ($) => {
    $(($.s = 814));
  },
]);
