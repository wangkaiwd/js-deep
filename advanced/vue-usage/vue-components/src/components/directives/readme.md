## `InfiniteScroll`
* [Object.entries](https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes)
  * It can get object key value pairs conveniently by destructure assignment
* [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
* [share information across hooks](https://github.com/vuejs/vue/issues/314#issuecomment-46197950)
* [Attributes and properties](https://javascript.info/dom-attributes-and-properties)
* [Element.scrollHeight](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight)

### immediate implement logic
* execute load method when user scroll container
* observe change of container content
  * if height of list item of container less height of container, execute load method
  * otherwise, stop execute load method
  
