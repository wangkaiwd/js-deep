class Node {
  constructor (element, next) {
    this.element = element;
    this.next = next;
  }
}

// 单向链表的一个特点，每次都要从头，根据next来查找，不能直接找到其中的某一项
class SimpleLinkedList {
  constructor () {
    this.head = null;
    this.size = 0;
  }

  _node (index) {
    if (index < 0 || index > this.size - 1) {
      return undefined;
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }

  add (index, element) {
    if (element == null) {
      element = index;
      index = this.size;
    }
    if (index === 0) {
      this.head = new Node(element, this.head);
    } else {
      const prevNode = this._node(index - 1);
      // 前一个节点的下一个节点为当前节点
      prevNode.next = new Node(element, prevNode.next);
    }
    this.size++;
  }

  get (index) {
    return this._node(index);
  }

  set (index, element) {
    const node = this._node(index);
    node.element = element;
  }

  remove (index) {
    if (index === 0) {
      this.head = this.head.next;
    } else {
      const prevNode = this._node(index - 1);
      prevNode.next = prevNode.next.next;
    }
    this.size--;
  }

  clear () {
    this.head = null;
    this.size = 0;
  }
}

const ll = new SimpleLinkedList();
ll.add(0);
ll.add(1);
ll.add(2);
ll.add(3);
// ll.clear();
console.log('ll', ll);

module.exports = SimpleLinkedList;
