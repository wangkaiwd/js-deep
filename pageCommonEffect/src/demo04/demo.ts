interface IOptions {
  title: string;
  buttonTexts?: string[];
  onCancel: () => void;
  onOk: () => void;
  content: string;
}

class Dialog {
  options: IOptions;
  element: HTMLElement;
  prefix: string = 'wk-dialog';
  footer: HTMLElement = null!; // 初始值处理有没有更优雅的方法？
  closeIcon: HTMLElement = null!;
  buttons: HTMLButtonElement[] = [];

  constructor (selector: string, options: IOptions) {
    this.element = document.querySelector<HTMLElement>(selector)!;
    this.options = options;
    if (!this.element) {
      console.error('please pass correct selector!');
      return;
    }
    // 在进行事件绑定的时候，this指向会指向绑定事件的元素
    // 这样会将Dialog.prototype.onOk方法在通过bind指定this后
    // 赋值给实例的私有属性onOk
    // 在最终实例化后，实例会有一个自己私有的指定this的onOk方法
    // 和原型上的没有指定具体this的onOk方法
    this.onOk = this.onOk.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  init () {
    this.createHtmlTemplate();
    this.bindEvents();
  }

  createHtmlTemplate () {
    const mask = this.createElement('div', `${this.prefix}-mask`);
    const { content: contentHtml, title, buttonTexts } = this.options;
    const header = this.createElement('div', `${this.prefix}-header`, title);
    const body = this.createElement('div', `${this.prefix}-body`, contentHtml);
    this.footer = this.createElement('div', `${this.prefix}-footer`, this.createButtons());
    // fixme:这里的类型如何进行处理
    this.buttons = (this.footer.children) as any;
    this.closeIcon = this.createElement('div', `${this.prefix}-close-icon`, '×');
    const content = this.createElement('div', `${this.prefix}-content`);
    this.batchAppend(content, [header, body, this.footer, this.closeIcon]);
    this.batchAppend(this.element, [mask, content]);
  }

  onOk () {
    this.options.onOk();
    this.close();
  }

  onCancel () {
    this.options.onCancel();
    this.close();
  }

  bindEvents () {
    this.buttons[0].addEventListener('click', this.onOk);
    this.buttons[0].addEventListener('click', this.onCancel);
    this.closeIcon.addEventListener('click', this.onCancel);
  }

  removeEvents () {
    this.buttons[0].removeEventListener('click', this.onOk);
    this.buttons[0].removeEventListener('click', this.onCancel);
    this.closeIcon.removeEventListener('click', this.onCancel);
  }

  batchAppend (target: HTMLElement, source: HTMLElement[]) {
    source.forEach(item => target.appendChild(item));
  }

  createElement (htmlTag: string, className: string, innerHtml: string = '') {
    const element = document.createElement(htmlTag);
    element.classList.add(className);
    element.innerHTML = innerHtml;
    return element;
  }

  createButtons () {
    const { buttonTexts = ['确认', '取消'] } = this.options;
    return buttonTexts.map(text => `<button>${text}</button>`).join('\r\n');
  }

  open () {
    this.init();
  }

  close () {
    this.removeEvents();
    this.element.innerHTML = '';
  }
}

const button1 = document.querySelector<HTMLButtonElement>('#button1')!;
const dialog = new Dialog('.wk-dialog-container', {
  title: 'wk-dialog title',
  buttonTexts: ['continue', 'close'],
  content: 'Try hitting the tab key* and notice how the focus stays within the wk-dialog itself. To close wk-dialog hit the esc',
  onCancel: () => {console.log('cancel');},
  onOk: () => {console.log('ok');}
});

button1.onclick = function () {
  dialog.open();
};
