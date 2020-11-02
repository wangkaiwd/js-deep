### 常用`http`请求和响应头

#### Gzip
压缩文件
* client: Accept-Encoding: gzip, deflate, br
* server: Content-Encoding: 

Node.js zlib 提供createGzip()方法来创建gzip,用于压缩文件

gzip压缩对重复性较高的内容压缩效果比较明显

#### referrer
资源的来源

请求头: Host, referer

Host: 指定请求正在发送的服务器的主机和端口号

防盗链，和Host进行比较

#### 
