# Transcat的Bob插件
这是Transcat的一个Bob插件，必须搭配Transcat服务端使用，服务端的配置请参考[Transcat](https://github.com/xingty/transcat)。

目前支持的翻译引擎如下:

* 自动模式 - 取决于Transcat的服务端的配置，如果是负载均衡，就自动负载均衡;如果是Select，就是Select。
* DeepLX 
* Google翻译
* 微软翻译
* 腾讯翻译君
* 彩云小译
* 百度翻译

请注意，transcat的bob插件选中了翻译引擎并不意味着就能使用，具体是否支持，取决于服务端。如果服务端没有配置对应的翻译引擎，即使客户端选中了，依然会返回不支持的错误。



## 使用方法

1. 安装transcat服务端
2. 在transcat插件填入url地址

![](https://user-images.githubusercontent.com/3600657/244466143-a0740766-9104-43bd-a6c4-90f9fc3d9a34.png)

![](https://user-images.githubusercontent.com/3600657/244465829-e54f000c-0bca-4c19-bdef-d57bc37a0047.png)

## 相关插件

[有道词典+](https://github.com/xingty/bob-plugin-youdao-dict-enhance)，一个增强版的有道词典



## License

MIT