export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.cb = cb;
    this.getter = parsePath(expOrFn);
    this.value = this.get();
  }
  get() {
    window.target = this;
    const vm = this.vm;
    let value = this.getter.call(vm, vm);
    window.target = undefined;
    return value;
  }
  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }
}

/**
 * 达到类似 eval('data.a.b.c') 的效果，找到对象相应路径下的值
 * 例如：parsePath('a.b.c')({a:{b:{c:2}}})  // 2
 */
export function parsePath(path) {
  const segments = path.split('.');
  return function(obj) {
    for (let i = 0; i < segments.length; i++) {
      obj = obj[segments[i]];
    }
    return obj;
  };
}
