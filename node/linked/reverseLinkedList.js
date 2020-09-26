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

  loop () {
    // // 如何找到前一个节点？
    // const head = this.get(this.size - 1); // 将head更改之后，遍历会发生问题
    // for (let i = this.size - 1; i >= 0; i--) {
    //   let prev = undefined;
    //   const current = this.get(i);
    //   if (i - 1 >= 0) {
    //     prev = this.get(i - 1);
    //   }
    //   if (prev) {
    //     current.next = prev;
    //   } else {
    //     current.next = null;
    //   }
    // }
    // this.head = head;
    let newHead = null;
    for (let i = 0; i < this.size; i++) {
      let prev = undefined;
      const current = this.get(i);
      if (i - 1 >= 0) {
        prev = this.get(i - 1);
      }
      newHead = JSON.parse(JSON.stringify(current));
      if (prev) {
        newHead.next = prev;
      } else {
        newHead.next = null;
      }
    }
    this.head = newHead;
  }

  // 链表翻转
  reverse () {
    this.loop();
  }
}

const ll = new LinkedList();

ll.add(1);
ll.add(2);
ll.add(3);
ll.reverse();
console.log(ll);

