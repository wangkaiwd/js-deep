## fs
* read file
* write file
* make directory
  * recursive make directory: must first to create parent directory
  * sync make
  * async make: how to implement async loop ? 
    * next
    * index
    * invoke next method when previous async task complete and index increase
* delete directory
  * sync delete directory
  * deep first algorithm
  * wide first algorithm
* fs.access: 测试指定路径的目录或文件的用户权限
  * check if the file exist in the current directory
  * check if the file is readable
  * check if the file is writable
* fs.stat
* async delete directory
  * 异步串行执行
  * 异步并行执行
  * Promise + await/async 删除目录
