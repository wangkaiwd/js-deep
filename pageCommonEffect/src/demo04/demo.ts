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
    this.init();
  }

  init () {
    this.createHtmlTemplate();
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

  bindEvents () {

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

  }

  close () {

  }
}

// 如何使用dialog

// 结合`jQuery`源码技巧

// const dialog = new Dialog(selector,options)
// options = {
//   title: '',
//   buttons: [],
//   onCancel,
//   onOk
// }

const dialog = new Dialog('.wk-dialog-container', {
  title: 'wk-dialog title',
  buttonTexts: ['continue', 'close'],
  content: 'Try hitting the tab key* and notice how the focus stays within the wk-dialog itself. To close wk-dialog hit the esc',
  onCancel: () => {console.log('cancel');},
  onOk: () => {console.log('ok');}
});
