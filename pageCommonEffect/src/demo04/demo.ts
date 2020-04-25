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
  // 这里的类型如何才能精确到HTMLDivElement
  dialog: HTMLElement = null!;// 初始值处理有没有更优雅的方法？
  content: HTMLElement = null!;
  mask: HTMLElement = null!;
  closeIcon: HTMLElement = null!;
  buttons: HTMLButtonElement[] = [];
  pressing: boolean = false;
  header: HTMLElement = null!;
  startX: number = 0;
  startY: number = 0;
  minX: number = 0;
  minY: number = 0;
  maxX: number = 0;
  maxY: number = 0;

  constructor (selector: string, options: IOptions) {
    this.element = document.querySelector<HTMLDivElement>(selector)!;
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
    this.onTransitionend = this.onTransitionend.bind(this);
    // this.onMouseDown = (e: MouseEvent) => this.onMouseDown(e);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onSelectStart = this.onSelectStart.bind(this);
  }

  init () {
    this.createHtmlTemplate();
    this.maxX = window.innerWidth - this.content.offsetWidth;
    this.maxY = window.innerHeight - this.content.offsetHeight;
    this.bindEvents();
  }

  createHtmlTemplate () {
    this.dialog = this.createElement('div', this.prefix);
    this.mask = this.createElement('div', `${this.prefix}-mask`);
    const { content: contentHtml, title, buttonTexts } = this.options;
    this.header = this.createElement('div', `${this.prefix}-header`, title);
    const body = this.createElement('div', `${this.prefix}-body`, contentHtml);
    const footer = this.createElement('div', `${this.prefix}-footer`, this.createButtons());
    // fixme:这里的类型如何进行处理
    this.buttons = (footer.children) as any;
    this.closeIcon = this.createElement('div', `${this.prefix}-close-icon`, '×');
    this.content = this.createElement('div', `${this.prefix}-content`);
    this.batchAppend(this.content, [this.header, body, footer, this.closeIcon]);
    this.batchAppend(this.dialog, [this.mask, this.content]);
    this.element.appendChild(this.dialog);
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
    this.buttons[1].addEventListener('click', this.onCancel);
    this.closeIcon.addEventListener('click', this.onCancel);
    // 绑定事件时保证事件处理函数中的this不被改变，还要能在另外一个函数中移除事件
    // 1. 全局定义箭头函数，该函数调用this.onMouseDown
    // 2. 全局定义this.onMouseDown通过bind绑定this后返回的函数
    this.header.addEventListener('mousedown', this.onMouseDown);

  }

  removeEvents () {
    this.buttons[0].removeEventListener('click', this.onOk);
    this.buttons[0].removeEventListener('click', this.onCancel);
    this.closeIcon.removeEventListener('click', this.onCancel);
    this.dialog.removeEventListener('transitionend', this.onTransitionend);
  }

  batchAppend (target: HTMLElement, source: HTMLElement[]) {
    source.forEach(item => target.appendChild(item));
  }

  createElement (htmlTag: keyof HTMLElementTagNameMap, className: string, innerHtml: string = '') {
    const element = document.createElement(htmlTag);
    element.classList.add(className);
    element.innerHTML = innerHtml;
    return element;
  }

  createButtons () {
    const { buttonTexts = ['确认', '取消'] } = this.options;
    return buttonTexts.map(text => `<button>${text}</button>`).join('\r\n');
  }

  onMouseDown (e: MouseEvent) {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('selectstart', this.onSelectStart);
    this.pressing = true;
    const { clientX, clientY } = e;
    const { left, top } = this.content.getBoundingClientRect();
    this.content.style.transition = 'none';
    this.startX = clientX - left;
    this.startY = clientY - top;
  }

  onMouseMove (e: MouseEvent) {
    if (!this.pressing) {return;}
    const { clientX, clientY } = e;
    let moveX = clientX - this.startX;
    let moveY = clientY - this.startY;
    if (moveX < this.minX) {moveX = this.minX;}
    if (moveX > this.maxX) {moveX = this.maxX;}
    if (moveY < this.minY) {moveY = this.minY;}
    if (moveY > this.maxY) {moveY = this.maxY;}
    this.content.style.transform = 'translate(0,0)';
    this.content.style.left = moveX + 'px';
    this.content.style.top = moveY + 'px';
  }

  onMouseUp (e: MouseEvent) {
    this.pressing = false;
    this.content.style.transition = 'all 0.3s';
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('selectstart', this.onSelectStart);
  }

  onSelectStart (e: Event) {
    e.preventDefault();
  }

  enterAnimation () {
    this.mask.style.opacity = '1';
    this.content.style.top = '50%';
    this.content.style.transform = 'translate(-50%,-50%)';
  }

  leaveAnimation () {
    this.mask.style.transition = `all 20s`;
    this.content.style.transition = `all 20s`;
    this.mask.style.opacity = '0';
    this.content.style.top = '0px';
    this.content.style.transform = 'translate(-50%,-100%)';
  }

  onTransitionend () {
    this.removeEvents();
    this.dialog.remove();
  }

  open () {
    if (this.dialog) {
      this.close();
    }
    this.init();
    // 回流和重绘(读写分离可以避免回流和重绘)
    this.leaveAnimation();
    // 强制回流
    this.mask.offsetWidth;
    this.enterAnimation();
  }

  close () {
    this.leaveAnimation();
    // 利用事件委托，将mask和content的transitionend事件都委托到dialog上
    this.dialog.addEventListener('transitionend', this.onTransitionend);
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
