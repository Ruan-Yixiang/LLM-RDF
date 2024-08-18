"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CUSTOM_FIELD_INJECTION_KEY: () => CUSTOM_FIELD_INJECTION_KEY,
  cancelRaf: () => cancelRaf,
  doubleRaf: () => doubleRaf,
  flattenVNodes: () => flattenVNodes,
  getScrollParent: () => getScrollParent,
  inBrowser: () => inBrowser,
  onMountedOrActivated: () => onMountedOrActivated,
  raf: () => raf,
  sortChildren: () => sortChildren,
  supportsPassive: () => supportsPassive,
  useChildren: () => useChildren,
  useClickAway: () => useClickAway,
  useCountDown: () => useCountDown,
  useCustomFieldValue: () => useCustomFieldValue,
  useEventListener: () => useEventListener,
  usePageVisibility: () => usePageVisibility,
  useParent: () => useParent,
  useRect: () => useRect,
  useScrollParent: () => useScrollParent,
  useToggle: () => useToggle,
  useWindowSize: () => useWindowSize
});
module.exports = __toCommonJS(src_exports);

// src/utils.ts
var inBrowser = typeof window !== "undefined";
var supportsPassive = true;
function raf(fn) {
  return inBrowser ? requestAnimationFrame(fn) : -1;
}
function cancelRaf(id) {
  if (inBrowser) {
    cancelAnimationFrame(id);
  }
}
function doubleRaf(fn) {
  raf(() => raf(fn));
}

// src/useRect/index.ts
var import_vue = require("vue");
var isWindow = (val) => val === window;
var makeDOMRect = (width2, height2) => ({
  top: 0,
  left: 0,
  right: width2,
  bottom: height2,
  width: width2,
  height: height2
});
var useRect = (elementOrRef) => {
  const element = (0, import_vue.unref)(elementOrRef);
  if (isWindow(element)) {
    const width2 = element.innerWidth;
    const height2 = element.innerHeight;
    return makeDOMRect(width2, height2);
  }
  if (element == null ? void 0 : element.getBoundingClientRect) {
    return element.getBoundingClientRect();
  }
  return makeDOMRect(0, 0);
};

// src/useToggle/index.ts
var import_vue2 = require("vue");
function useToggle(defaultValue = false) {
  const state = (0, import_vue2.ref)(defaultValue);
  const toggle = (value = !state.value) => {
    state.value = value;
  };
  return [state, toggle];
}

// src/useRelation/useParent.ts
var import_vue3 = require("vue");
function useParent(key) {
  const parent = (0, import_vue3.inject)(key, null);
  if (parent) {
    const instance = (0, import_vue3.getCurrentInstance)();
    const { link, unlink, internalChildren } = parent;
    link(instance);
    (0, import_vue3.onUnmounted)(() => unlink(instance));
    const index = (0, import_vue3.computed)(() => internalChildren.indexOf(instance));
    return {
      parent,
      index
    };
  }
  return {
    parent: null,
    index: (0, import_vue3.ref)(-1)
  };
}

// src/useRelation/useChildren.ts
var import_vue4 = require("vue");
function flattenVNodes(children) {
  const result = [];
  const traverse = (children2) => {
    if (Array.isArray(children2)) {
      children2.forEach((child) => {
        var _a;
        if ((0, import_vue4.isVNode)(child)) {
          result.push(child);
          if ((_a = child.component) == null ? void 0 : _a.subTree) {
            result.push(child.component.subTree);
            traverse(child.component.subTree.children);
          }
          if (child.children) {
            traverse(child.children);
          }
        }
      });
    }
  };
  traverse(children);
  return result;
}
var findVNodeIndex = (vnodes, vnode) => {
  const index = vnodes.indexOf(vnode);
  if (index === -1) {
    return vnodes.findIndex(
      (item) => vnode.key !== void 0 && vnode.key !== null && item.type === vnode.type && item.key === vnode.key
    );
  }
  return index;
};
function sortChildren(parent, publicChildren, internalChildren) {
  const vnodes = flattenVNodes(parent.subTree.children);
  internalChildren.sort(
    (a, b) => findVNodeIndex(vnodes, a.vnode) - findVNodeIndex(vnodes, b.vnode)
  );
  const orderedPublicChildren = internalChildren.map((item) => item.proxy);
  publicChildren.sort((a, b) => {
    const indexA = orderedPublicChildren.indexOf(a);
    const indexB = orderedPublicChildren.indexOf(b);
    return indexA - indexB;
  });
}
function useChildren(key) {
  const publicChildren = (0, import_vue4.reactive)([]);
  const internalChildren = (0, import_vue4.reactive)([]);
  const parent = (0, import_vue4.getCurrentInstance)();
  const linkChildren = (value) => {
    const link = (child) => {
      if (child.proxy) {
        internalChildren.push(child);
        publicChildren.push(child.proxy);
        sortChildren(parent, publicChildren, internalChildren);
      }
    };
    const unlink = (child) => {
      const index = internalChildren.indexOf(child);
      publicChildren.splice(index, 1);
      internalChildren.splice(index, 1);
    };
    (0, import_vue4.provide)(
      key,
      Object.assign(
        {
          link,
          unlink,
          children: publicChildren,
          internalChildren
        },
        value
      )
    );
  };
  return {
    children: publicChildren,
    linkChildren
  };
}

// src/useCountDown/index.ts
var import_vue5 = require("vue");
var SECOND = 1e3;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
function parseTime(time) {
  const days = Math.floor(time / DAY);
  const hours = Math.floor(time % DAY / HOUR);
  const minutes = Math.floor(time % HOUR / MINUTE);
  const seconds = Math.floor(time % MINUTE / SECOND);
  const milliseconds = Math.floor(time % SECOND);
  return {
    total: time,
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  };
}
function isSameSecond(time1, time2) {
  return Math.floor(time1 / 1e3) === Math.floor(time2 / 1e3);
}
function useCountDown(options) {
  let rafId;
  let endTime;
  let counting;
  let deactivated;
  const remain = (0, import_vue5.ref)(options.time);
  const current = (0, import_vue5.computed)(() => parseTime(remain.value));
  const pause = () => {
    counting = false;
    cancelRaf(rafId);
  };
  const getCurrentRemain = () => Math.max(endTime - Date.now(), 0);
  const setRemain = (value) => {
    var _a, _b;
    remain.value = value;
    (_a = options.onChange) == null ? void 0 : _a.call(options, current.value);
    if (value === 0) {
      pause();
      (_b = options.onFinish) == null ? void 0 : _b.call(options);
    }
  };
  const microTick = () => {
    rafId = raf(() => {
      if (counting) {
        setRemain(getCurrentRemain());
        if (remain.value > 0) {
          microTick();
        }
      }
    });
  };
  const macroTick = () => {
    rafId = raf(() => {
      if (counting) {
        const remainRemain = getCurrentRemain();
        if (!isSameSecond(remainRemain, remain.value) || remainRemain === 0) {
          setRemain(remainRemain);
        }
        if (remain.value > 0) {
          macroTick();
        }
      }
    });
  };
  const tick = () => {
    if (!inBrowser) {
      return;
    }
    if (options.millisecond) {
      microTick();
    } else {
      macroTick();
    }
  };
  const start = () => {
    if (!counting) {
      endTime = Date.now() + remain.value;
      counting = true;
      tick();
    }
  };
  const reset = (totalTime = options.time) => {
    pause();
    remain.value = totalTime;
  };
  (0, import_vue5.onBeforeUnmount)(pause);
  (0, import_vue5.onActivated)(() => {
    if (deactivated) {
      counting = true;
      deactivated = false;
      tick();
    }
  });
  (0, import_vue5.onDeactivated)(() => {
    if (counting) {
      pause();
      deactivated = true;
    }
  });
  return {
    start,
    pause,
    reset,
    current
  };
}

// src/useClickAway/index.ts
var import_vue8 = require("vue");

// src/useEventListener/index.ts
var import_vue7 = require("vue");

// src/onMountedOrActivated/index.ts
var import_vue6 = require("vue");
function onMountedOrActivated(hook) {
  let mounted;
  (0, import_vue6.onMounted)(() => {
    hook();
    (0, import_vue6.nextTick)(() => {
      mounted = true;
    });
  });
  (0, import_vue6.onActivated)(() => {
    if (mounted) {
      hook();
    }
  });
}

// src/useEventListener/index.ts
function useEventListener(type, listener, options = {}) {
  if (!inBrowser) {
    return;
  }
  const { target = window, passive = false, capture = false } = options;
  let cleaned = false;
  let attached;
  const add = (target2) => {
    if (cleaned) {
      return;
    }
    const element = (0, import_vue7.unref)(target2);
    if (element && !attached) {
      element.addEventListener(type, listener, {
        capture,
        passive
      });
      attached = true;
    }
  };
  const remove = (target2) => {
    if (cleaned) {
      return;
    }
    const element = (0, import_vue7.unref)(target2);
    if (element && attached) {
      element.removeEventListener(type, listener, capture);
      attached = false;
    }
  };
  (0, import_vue7.onUnmounted)(() => remove(target));
  (0, import_vue7.onDeactivated)(() => remove(target));
  onMountedOrActivated(() => add(target));
  let stopWatch;
  if ((0, import_vue7.isRef)(target)) {
    stopWatch = (0, import_vue7.watch)(target, (val, oldVal) => {
      remove(oldVal);
      add(val);
    });
  }
  return () => {
    stopWatch == null ? void 0 : stopWatch();
    remove(target);
    cleaned = true;
  };
}

// src/useClickAway/index.ts
function useClickAway(target, listener, options = {}) {
  if (!inBrowser) {
    return;
  }
  const { eventName = "click" } = options;
  const onClick = (event) => {
    const targets = Array.isArray(target) ? target : [target];
    const isClickAway = targets.every((item) => {
      const element = (0, import_vue8.unref)(item);
      return element && !element.contains(event.target);
    });
    if (isClickAway) {
      listener(event);
    }
  };
  useEventListener(eventName, onClick, { target: document });
}

// src/useWindowSize/index.ts
var import_vue9 = require("vue");
var width;
var height;
function useWindowSize() {
  if (!width) {
    width = (0, import_vue9.ref)(0);
    height = (0, import_vue9.ref)(0);
    if (inBrowser) {
      const update = () => {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
      };
      update();
      window.addEventListener("resize", update, { passive: true });
      window.addEventListener("orientationchange", update, { passive: true });
    }
  }
  return { width, height };
}

// src/useScrollParent/index.ts
var import_vue10 = require("vue");
var overflowScrollReg = /scroll|auto|overlay/i;
var defaultRoot = inBrowser ? window : void 0;
function isElement(node) {
  const ELEMENT_NODE_TYPE = 1;
  return node.tagName !== "HTML" && node.tagName !== "BODY" && node.nodeType === ELEMENT_NODE_TYPE;
}
function getScrollParent(el, root = defaultRoot) {
  let node = el;
  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }
    node = node.parentNode;
  }
  return root;
}
function useScrollParent(el, root = defaultRoot) {
  const scrollParent = (0, import_vue10.ref)();
  (0, import_vue10.onMounted)(() => {
    if (el.value) {
      scrollParent.value = getScrollParent(el.value, root);
    }
  });
  return scrollParent;
}

// src/usePageVisibility/index.ts
var import_vue11 = require("vue");
var visibility;
function usePageVisibility() {
  if (!visibility) {
    visibility = (0, import_vue11.ref)("visible");
    if (inBrowser) {
      const update = () => {
        visibility.value = document.hidden ? "hidden" : "visible";
      };
      update();
      window.addEventListener("visibilitychange", update);
    }
  }
  return visibility;
}

// src/useCustomFieldValue/index.ts
var import_vue12 = require("vue");
var CUSTOM_FIELD_INJECTION_KEY = Symbol("van-field");
function useCustomFieldValue(customValue) {
  const field = (0, import_vue12.inject)(CUSTOM_FIELD_INJECTION_KEY, null);
  if (field && !field.customValue.value) {
    field.customValue.value = customValue;
    (0, import_vue12.watch)(customValue, () => {
      field.resetValidation();
      field.validateWithTrigger("onChange");
    });
  }
}
