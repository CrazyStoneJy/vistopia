## 看理想音频抓取工具

## 直接安装cli使用
>$ npm i vistopia

## 下载源码使用

#### clone代码
>$ git clone git@github.com:CrazyStoneJy/vistopia.git

#### 安装依赖
>$ nmp install

#### 编译  
>$ npm run build

#### 使用
>$ npm link  

   ![npm link success](./img/img_pm_link.jpg)


## 命令手册

**搜索**
>$ vistopia search <keyword>

**通过`collection id`获取`episode`列表**
>$ vistopia find <collection_id>

**下载**

通过`collection_id`下载该节目下的**所有**单集
>$ vistopia download -o <output_directory> <collection_id>

下载**单集**
> vistopia download -o <output_directory> -e <episode_id>

**push to phone**
>$ vistopia push <resource_directory> <phone_directory>
