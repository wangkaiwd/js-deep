class Node {
  constructor (element, next) {
    this.element = element;
    this.next = next;
  }
}

class LinkedList {
  constructor () {
    this.head = null;
    this.size = 0;
  }

  // 直接根据索引添加,可以直接在末尾添加
  add (index, element) {
    // 格式化参数
    if (arguments.length === 1) {
      element = index;
      index = this.size;
    }
    console.log('index', index);
    if (index < 0 || index > this.size) {
      throw new Error('exceed corner case!');
    }
    // 开头插入，首先需要保存旧有head,然后将head前移
    // 当前元素为head, 当前元素的next为旧有head
    if (index === 0) {
      const head = this.head;
      this.head = new Node(element, head);
    } else {
      const prevNode = this.get(index - 1);
      prevNode.next = new Node(element, prevNode.next);
    }
    // 每次插入一个，链表的长度加1
    this.size++;
  }

  get (index) {
    if (index < 0 || index > this.size) {
      throw new Error('exceed corner case!');
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }

  set (index, element) {
    const node = this.get(index);
    node.element = element;
  }

  remove (index) {
    if (index === 0) {
      this.head = this.head.next;
    } else {
      const prevNode = this.get(index - 1);
      prevNode.next = prevNode.next.next;
    }
    this.size--;
  }

  clear () {
    this.head = null;
    this.size = 0;
  }
}

const ll = new LinkedList();
ll.add(0);
ll.add(1);
ll.add(2);
ll.remove(0);
ll.set(1, 1000);
console.log(ll);
