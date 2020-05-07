// 观察者模式：
//  观察者和被观察者之间是有关系的

class Subject { // 被观察者
  name = '';
  caches = [];
  state = 'pending';

  constructor (name) {
    this.name = name;
  }

  // attach: 附加，附属
  attach (observe) {
    this.caches.push(observe);
  }

  setState (state) {
    this.state = state;
    // 更新状态的时候，通知所有观察者
    this.caches.forEach(cache => {
      cache.update(this);
    });
  }
}

class Observe { // 观察者
  name = '';

  constructor (name) {
    this.name = name;
  }

  // 被观察者更新的时候通知观察者
  update (subject) {
    console.log(`subject:${subject.name} ${subject.state} ; observe:${this.name}`);
  }
}

const baby = new Subject('baby');

const father = new Observe('father');
const mother = new Observe('mother');
baby.attach(father);
baby.attach(mother);
baby.setState('resolved'); // 只要更新状态，所有的观察者都会受到消息
baby.setState('rejected');
