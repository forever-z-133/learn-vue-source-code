import Dep from './dep';

export class Observer {
  constructor(value) {
    this.value = value;
    if (Array.isArray(value)) {
      // 下章再处理 Array
    } else {
      this.walk(value);
    }
  }
  walk(obj) {
    Object.keys(obj).map(key => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

function defineReactive(obj, key, val) {
  if (typeof val === 'object') {
    new Observer(val);
  }
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend();
      return val;
    },
    set(newVal) {
      if (val === newVal) return;
      val = newVal;
      dep.notify();
    }
  });
}
