# HTTP

## HTTP

HTTP 协议是个无状态协议，基于 TCP/IP 通信协议来传递数据.

HTTP 报文由 header 和 body 两部分组成。

HTTP 报文分为请求报文和响应报文

### header

- 起始行

请求报文起始行由`请求方法 + 路径 + http版本`:

```
GET /home HTTP/1.1
```

响应报文起始行也叫状态行，由`http版本 + 状态码 + 描述`:

```
HTTP/1.1 200 OK
```

- 头部

头部由一系列键值组成，通常包括一些服务端和客户端的一些信息和约定的字段。列举几个常见字段：

| 字段             | 请求头/响应头 | 描述                                          |
| ---------------- | ------------- | --------------------------------------------- |
| content-type     | 请求/响应     | 发送的 body 类型 mime type                    |
| Host             | 请求          | 请求方的主机，一般是域名或者 ip               |
| User-Agent       | 请求          | 标识浏览器类型                                |
| Accept           | 请求          | 可以接收的 body 类型 mime type,比如 text/html |
| Content-Encoding | 请求/响应     | 发送的编码格式                                |
| date             | 响应          | 服务端时间                                    |

- 空行

用来`区分头部和实体`。

- 实体

body，请求报文对应请求体, 响应报文对应响应体。

## HTTPS

HTTPS 是在 HTTP 和 TCP 之间建立了一个安全层，HTTP 与 TCP 通信的时候，必须先进过一个安全层，对数据包进行加密，然后将加密后的数据包传送给 TCP，相应的 TCP 必须将数据包解密，才能传给上面的 HTTP。

加密是在传输层与应用层之前通过 SSL/TLS 协议进行加密（SSL 是 TLS 的前身）。

TLS 使用了对称加密和非对称加密算法。

对称加密：

对称加密主要用于对信息进行加密，也就是双方拥有相同的秘钥，双方都知道如何将密文加密解密。

非对称加密：

有公钥私钥，公钥用于数据加密，用相应的私密才能解密，私钥只有分发公钥的一方才知道。

HTTPS 将对称加密与非对称加密结合起来，充分利用两者各自的优势。在交换密钥环节使用非对称加密方式，之后的建立通信交换报文阶段则使用对称加密方式。

具体做法是：发送密文的一方使用公钥进行加密处理“密钥”，对方收到被加密的信息后，再使用自己的私有密钥进行解密。这样可以确保交换的密钥是安全的前提下，之后使用对称加密方式进行通信交换报文。所以，HTTPS 采用对称加密和非对称加密两者并用的混合加密机制。

### HTTPS 和 HTTP 的区别

1. HTTP 明文传输，数据都是未加密的，安全性较差，HTTPS（TLS+HTTP） 数据传输过程是加密的，安全性较好。
2. 使用 HTTPS 协议需要到 CA（Certificate Authority，数字证书认证机构） 申请证书，一般免费证书较少，因而需要一定费用。
3. HTTP 页面响应速度比 HTTPS 快，主要是因为 HTTP 使用 TCP 三次握手建立连接，客户端和服务器需要交换 3 个包，而 HTTPS 除了 TCP 的三个包，还要加上 TLS 握手需要的 9 个包，所以一共是 12 个包。
4. HTTPS 标准端口 443，HTTP 标准端口 80。
5. HTTPS 其实就是建构在 SSL/TLS 之上的 HTTP 协议，所以，要比较 HTTPS 比 HTTP 要更耗费服务器资源。
6. HTTPS 基于传输层，HTTP 基于应用层。
7. HTTPS 对搜索引擎更友好，利于 SEO，谷歌、百度优先索引 HTTPS 网页。

## HTTP2.0

### 二进制传输

这个是 HTTP 2.0 加强性能的核心。在之前的 HTTP 版本中是通过文本的方式传输数据。在 HTTP 2.0 中引入了新的编码机制，所有传输的数据都会被分割，并采用二进制格式编码。

为了保证 HTTP 不受影响，那就需要在应用层（HTTP2.0）和传输层（TCP or UDP）之间增加一个二进制分帧层。在二进制分帧层上，HTTP2.0 会将所有传输的信息分为更小的消息和帧，并采用`二进制格式编码`，其中 HTTP1.x 的首部信息会被封装到 Headers 帧，而 Request Body 则封装到 Data 帧。

### 多路复用

HTTP2.0 中,基于二进制分帧层，HTTP2.0 可以在共享 TCP 连接的基础上同时发送请求和响应。HTTP 消息被分解为独立的帧，而不破坏消息本身的语义，交错发出去，在另一端根据流标识符和首部将他们重新组装起来。 通过该技术，可以避免 HTTP 旧版本的队头阻塞问题，极大提高传输性能。

### Header 压缩

在 HTTP1.0 中，使用文本的形式传输 header，在 header 中携带 cookie 的话，每次都需要重复传输几百到几千的字节，这着实是一笔不小的开销。

在 HTTP2.0 中，使用了 HPACK（HTTP2 头部压缩算法）压缩格式对传输的 header 进行编码，减少了 header 的大小。并在两端维护了索引表，用于记录出现过的 header，后面在传输过程中就可以传输已经记录过的 header 的键名，对端收到数据后就可以通过键名找到对应的值。

### 服务端 Push

HTTP2.0 新增的一个强大的新功能，就是服务器可以对一个客户端请求发送多个响应。服务器向客户端推送资源无需客户端明确的请求。
服务端根据客户端的请求，提前返回多个响应，推送额外的资源给客户端。

### HTTP2缺点

虽然 HTTP/2 解决了很多之前旧版本的问题，但是它还是存在一个巨大的问题，主要是底层支撑的 TCP 协议造成的。HTTP/2 的缺点主要有以下几点：

TCP 以及 TCP+TLS 建立连接的延时
HTTP/2 都是使用 TCP 协议来传输的，而如果使用 HTTPS 的话，还需要使用 TLS 协议进行安全传输，而使用 TLS 也需要一个握手过程，这样就需要有两个握手延迟过程：

在建立 TCP 连接的时候，需要和服务器进行三次握手来确认连接成功，也就是说需要在消耗完 1.5 个 RTT 之后才能进行数据传输。

进行 TLS 连接，TLS 有两个版本——TLS1.2 和 TLS1.3，每个版本建立连接所花的时间不同，大致是需要 1~2 个 RTT。

总之，在传输数据之前，我们需要花掉 3 ～ 4 个 RTT。

TCP 的队头阻塞并没有彻底解决
在 HTTP/2 中，多个请求是跑在一个 TCP 管道中的。但当出现了丢包时，HTTP/2 的表现反倒不如 HTTP/1 了。因为 TCP 为了保证可靠传输，有个特别的“丢包重传”机制，丢失的包必须要等待重新传输确认，HTTP/2 出现丢包时，整个 TCP 都要开始等待重传，那么就会阻塞该 TCP 连接中的所有请求。而对于 HTTP/1.1 来说，可以开启多个 TCP 连接，出现这种情况反到只会影响其中一个连接，剩余的 TCP 连接还可以正常传输数据。

## HTTP3.0

Google 在推 SPDY 的时候就已经意识到了这些问题，于是就另起炉灶搞了一个基于 UDP 协议的“QUIC”协议，让 HTTP 跑在 QUIC 上而不是 TCP 上。而这个“HTTP over QUIC”就是 HTTP 协议的下一个大版本，HTTP/3。它在 HTTP/2 的基础上又实现了质的飞跃，真正“完美”地解决了“队头阻塞”问题。

### QUIC 新功能

QUIC 基于 UDP，而 UDP 是“无连接”的，根本就不需要“握手”和“挥手”，所以就比 TCP 来得快。此外 QUIC 也实现了可靠传输，保证数据一定能够抵达目的地。它还引入了类似 HTTP/2 的“流”和“多路复用”，单个“流"是有序的，可能会因为丢包而阻塞，但其他“流”不会受到影响。具体来说 QUIC 协议有以下特点：

- 实现了类似 TCP 的流量控制、传输可靠性的功能。

  - 虽然 UDP 不提供可靠性的传输，但 QUIC 在 UDP 的基础之上增加了一层来保证数据可靠性传输。它提供了数据包重传、拥塞控制以及其他一些 TCP 中存在的特性。

- 实现了快速握手功能

  - 由于 QUIC 是基于 UDP 的，所以 QUIC 可以实现使用 0-RTT 或者 1-RTT 来建立连接，这意味着 QUIC 可以用最快的速度来发送和接收数据，这样可以大大提升首次打开页面的速度。0RTT 建连可以说是 QUIC 相比 HTTP2 最大的性能优势。

- 集成了 TLS 加密功能。

  - 目前 QUIC 使用的是 TLS1.3，相较于早期版本 TLS1.3 有更多的优点，其中最重要的一点是减少了握手所花费的 RTT 个数。

- 多路复用，彻底解决 TCP 中队头阻塞的问题

  - 和 TCP 不同，QUIC 实现了在同一物理连接上可以有多个独立的逻辑数据流。实现了数据流的单独传输，就解决了 TCP 中队头阻塞的问题。

## TCP

TCP 协议是面向连接的，提供可靠数据传输服务的传输层协议。

特点：

TCP 协议是面向连接的，在通信双方进行通信前，需要通过三次握手建立连接。它需要在端系统中维护双方连接的状态信息。

TCP 协议通过序号、确认号、定时重传、检验和等机制，来提供可靠的数据传输服务。

TCP 协议提供的是点对点的服务，即它是在单个发送方和单个接收方之间的连接。

TCP 协议提供的是全双工的服务，也就是说连接的双方的能够向对方发送和接收数据。

TCP 提供了拥塞控制机制，在网络拥塞的时候会控制发送数据的速率，有助于减少数据包的丢失和减轻网络中的拥塞程度。

TCP 提供了流量控制机制，保证了通信双方的发送和接收速率相同。如果接收方可接收的缓存很小时，发送方会降低发送 速率，避免因为缓存填满而造成的数据包的丢失。

## UDP

UDP 是一种无连接的，不可靠的传输层协议。它只提供了传输层需要实现的最低限度的功能，除了复用/分解功能和少量的差 错检测外，它几乎没有对 IP 增加其他的东西。UDP 协议适用于对实时性要求高的应用场景。

特点：

使用 UDP 时，在发送报文段之前，通信双方没有握手的过程，因此 UDP 被称为是无连接的传输层协议。因为没有握手 过程，相对于 TCP 来说，没有建立连接的时延。因为没有连接，所以不需要在端系统中保存连接的状态。

UDP 提供尽力而为的交付服务，也就是说 UDP 协议不保证数据的可靠交付。

UDP 没有拥塞控制和流量控制的机制，所以 UDP 报文段的发送速率没有限制。

因为一个 UDP 套接字只使用目的地址和目的端口来标识，所以 UDP 可以支持一对一、一对多、多对一和多对多的交互 通信。

UDP 首部小，只有 8 个字节。
  
## TCP 三次握手

第一次握手，客户端向服务器发送一个 SYN 连接请求报文段，报文段的首部中 SYN 标志位置为 1，序号字段是一个任选的 随机数。它代表的是客户端数据的初始序号。

第二次握手，服务器端接收到客户端发送的 SYN 连接请求报文段后，服务器首先会为该连接分配 TCP 缓存和变量，然后向 客户端发送 SYN ACK 报文段，报文段的首部中 SYN 和 ACK 标志位都被置为 1，代表这是一个对 SYN 连接请求的确认， 同时序号字段是服务器端产生的一个任选的随机数，它代表的是服务器端数据的初始序号。确认号字段为客户端发送的序号加 一。

第三次握手，客户端接收到服务器的肯定应答后，它也会为这次 TCP 连接分配缓存和变量，同时向服务器端发送一个对服务 器端的报文段的确认。第三次握手可以在报文段中携带数据。

在我看来，TCP 三次握手的建立连接的过程就是相互确认初始序号的过程，告诉对方，什么样序号的报文段能够被正确接收。 第三次握手的作用是客户端对服务器端的初始序号的确认。如果只使用两次握手，那么服务器就没有办法知道自己的序号是否 已被确认。同时这样也是为了防止失效的请求报文段被服务器接收，而出现错误的情况。

## TCP 四次挥手

因为 TCP 连接是全双工的，也就是说通信的双方都可以向对方发送和接收消息，所以断开连接需要双方的确认。

第一次挥手，客户端认为没有数据要再发送给服务器端，它就向服务器发送一个 FIN 报文段，申请断开客户端到服务器端的 连接。发送后客户端进入 FIN_WAIT_1 状态。

第二次挥手，服务器端接收到客户端释放连接的请求后，向客户端发送一个确认报文段，表示已经接收到了客户端释放连接的 请求，以后不再接收客户端发送过来的数据。但是因为连接是全双工的，所以此时，服务器端还可以向客户端发送数据。服务 器端进入 CLOSE_WAIT 状态。客户端收到确认后，进入 FIN_WAIT_2 状态。

第三次挥手，服务器端发送完所有数据后，向客户端发送 FIN 报文段，申请断开服务器端到客户端的连接。发送后进入 LAS T_ACK 状态。

第四次挥手，客户端接收到 FIN 请求后，向服务器端发送一个确认应答，并进入 TIME_WAIT 阶段。该阶段会持续一段时间， 这个时间为报文段在网络中的最大生存时间，如果该时间内服务端没有重发请求的话，客户端进入 CLOSED 的状态。如果收到 服务器的重发请求就重新发送确认报文段。服务器端收到客户端的确认报文段后就进入 CLOSED 状态，这样全双工的连接就被 释放了。

TCP 使用四次挥手的原因是因为 TCP 的连接是全双工的，所以需要双方分别释放到对方的连接，单独一方的连接释放，只代 表不能再向对方发送数据，连接处于的是半释放的状态。

最后一次挥手中，客户端会等待一段时间再关闭的原因，是为了防止发送给服务器的确认报文段丢失或者出错，从而导致服务器 端不能正常关闭。