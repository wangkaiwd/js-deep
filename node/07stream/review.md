* Readable:
  * fs.createReadStream 参数
  * event:
    * open
    * data: 回调中返回的数据是buffer
    * end: 通过buffer.concat来合并多个字符串
    * error
    * close
  * method:
    * pause
    * resume
* Writeable
  * fs.createWriteStream 参数
  * event
    * drain
  * method
    * write
    * end: fs.write + close 
