## 看理想音频抓取工具

### 环境
>$ nmp install

### 编译  
>$ npm run build

### 使用
>$ npm link  

   ![npm link success](./img/img_pm_link.jpg)

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
