### pagination
* pageSize
* total
* current
* pagerCount

#### pager render logic
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/Pagination2020-8-23-5-46.png)

* pager count is odd(current need to locate in center)
  * exclude start and end pager
  * current in center of reset pager
  
* reimplement pager render logic according to all circumstance
* draw diagram to presentation render logic
  
#### some knowledge
* [How to create an array contain 1...N](https://stackoverflow.com/a/33352604)
