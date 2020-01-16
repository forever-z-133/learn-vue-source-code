import { Observer } from './observer';
import Watcher from './observer/watch';

const obj = {
  age: 999,
  child: {
    name: 'z'
  }
};
new Observer(obj);

new Watcher(obj, 'age', (newValue, oldValue) => {
  console.log('------', newValue, oldValue);
});
new Watcher(obj, 'child.name', (newValue, oldValue) => {
  console.log('------', newValue, oldValue);
});

obj.age = 2;
obj.child.name = 'y';
