# zclz-esg

vue2.7结合vite3.0打造的后台管理系统模板。

### 项目安装启动

```sh
npm install
```

### 本地启动

```sh
npm run dev
```

### 打包

```sh
npm run build
```

### 预览

```sh
npm run preview
```

### 文件结构

```
zclz-esg
├─ .editorconfig
├─ .env.development
├─ .env.production
├─ .eslintignore
├─ .eslintrc.js    代码检查，安装插件eslint生效
├─ .gitignore
├─ .prettierignore
├─ .prettierrc.js   文件格式规范文件，安装插件prettier生效
├─ .stylelintignore
├─ .stylelintrc.js
├─ index.html    页面入口
├─ jsconfig.json    即时编译文件路径提示
├─ mock    mock数据
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public    不需要打包的文件，原样输出
├─ README.md
├─ src
│  ├─ api    接口定义
│  ├─ assets  静态资源，图片样式、字体等
│  ├─ components  全局组件
│  ├─ icons   svg图片
│  ├─ layout   主页面结构定义
│  ├─ pages   页面列表
│  │  └─ index
│  │     ├─ App.vue   页面入口vue
│  │     ├─ components  页面组件
│  │     ├─ main.js   页面入口js
│  │     ├─ permission.js  路由权限控制
│  │     ├─ router  路由
│  │     ├─ store   页面公共数据
│  │     └─ views   视图图列表
│  ├─ settings.js  全局设置
│  ├─ styles  样式文件
│  └─ utils   工具类，包括request、response拦截
└─ vite.config.js
```

### 书写规范
整体样式由prettier插件控制，详情请见文件prettierrc.js，开启保存自动格式化
+ 文件命名方式
  页面文件使用小写，js文件及组件使用驼峰命名
+ css
  使用sass编译，每写完一个类样式空一行，书写样式属性时，按照一定规律，大小-位置-边框-字体-背景，样式多个关键词命名样式时使用"-"连字符。
   ```css
   .test{
    width: 100px;
    height: 100px;
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
    border: 1px solid #fff;
    font-size: 14px;
    color: #000;
    background-color:#f00;
    //空一行写下一个样式
    .detail-des{
      ...
    }
   }
   ```

+ template
  尽量不使用行内样式绑定，如有必要可使用vue3新特性，在template中绑定class，css中渲染实力中定义的样式属性，无子元素的标签采用自闭和写法。
  ```html
  <template>
    <div>
      <div :class="$style.test">css变量绑定</div>
    </div>
  </template>
  ```
  ```javascript
  <script>
  export default{
    data() {
      return {
        color: #fff;
      }
    }
  }
  </script>
  ```

  ```css
  <style module>
  .test {
    width: 100px;
    height: 100px;
    margin: 10px;
    color: v-bind(color);
    background: #f00;
  }
  </style>
  ```

+ script
  使用vue3的新特性时，为了与vue2的写法统一,建议使用setup配置项的写法。
  ```javascript
  <script>
    export defalt{
      setup() {
        ...
        return {...};
      }
    }
  </script>
  ```


### git提交规范
dev分支作为主开发分支，main分支作为线上分支，所有新开发的功能先拉dev，在这个分支上新建新分支，开发自测完成之后再合并到dev上，合并前确认是否有冲突，解决冲突之后再合并到dev,每次提交必须填写本次所涉及的修改信息，提交规范如下
```
<type>: <message>
```
type类型如下
+ feat：新功能（feature）。
+ fix：修复bug。
+ docs：文档。
+ refactor：重构（即不是新增功能，也不是修改bug的代码变动）。
+ perf：优化相关，比如提升性能、体验。
+ chore：构建过程或辅助工具的变动。
+ merge：代码合并。
+ sync：同步主线或分支的Bug。
  
message
本次提交信息描述，不超过50字。