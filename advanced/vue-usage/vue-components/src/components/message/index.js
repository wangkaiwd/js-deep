import Vue from 'vue';
import MessageComponent from './message';

// 创建一个Vue子类
const MessageCtor = Vue.extend(MessageComponent);
const Message = (options) => {
  // 传入的data会和组件内的data进行合并
  const instance = new MessageCtor({ data: options });
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.visible = true;
};
['success', 'error', 'warning'].forEach(type => {
  Message[type] = function (options) {
    options.type = type;
    return Message(options);
  };
});

export { Message };
