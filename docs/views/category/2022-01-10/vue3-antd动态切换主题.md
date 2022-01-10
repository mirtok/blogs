## webpack-theme-color-replacer webpack插件 实现web项目 全局修改主题颜色



**webpack-theme-color-replacer:**

[https://github.com/hzsrc/webpack-theme-color-replacer](https://github.com/hzsrc/webpack-theme-color-replacer)

**引用下插件作者的思路：**

> 基本思路就是，webpack构建时，在emit事件（准备写入dist结果文件时）中，将即将生成的所有css文件的内容中 带有指定颜色的css规则单独提取出来，再合并为一个theme-colors.css输出文件。然后在切换主题色时，下载这个文件，并替换为需要的颜色，应用到页面上。这样，下载的样式中就只包含颜色相关的css规则，文件较小；同时它已经包含了项目中所有的css中的指定颜色样式，一次下载全部颜色样式都搞定。

**首先安装插件**

```sh
npm install ---save webpack-theme-color-replacer
yarn add webpack-theme-color-replacer -S
```

**然后引入插件，修改配置：**

[https://github.com/hzsrc/ant-design-pro-vue/commit/8f7600143be405cf8de6c950070ac7a80abb1235#diff-0e893b3578ae3d5c8b98bac1c80756a7](https://github.com/hzsrc/ant-design-pro-vue/commit/8f7600143be405cf8de6c950070ac7a80abb1235#diff-0e893b3578ae3d5c8b98bac1c80756a7)

**运行时修改主题颜色：**

[https://github.com/hzsrc/ant-design-pro-vue/commit/8f7600143be405cf8de6c950070ac7a80abb1235#diff-807ddb6f50da674fe8e2a75236722637](https://github.com/hzsrc/ant-design-pro-vue/commit/8f7600143be405cf8de6c950070ac7a80abb1235#diff-807ddb6f50da674fe8e2a75236722637)

**具体代码示例如下：**

```js
const ThemeColorReplacer = require('webpack-theme-color-replacer');
const forElementUI = require('webpack-theme-color-replacer/forElementUI')
const {generate} = require('@ant-design/colors/dist');

const publicPath = process.env.NODE_ENV === "production" ? "/" : "/";

const getAntdSerials = (color) => {
    // 淡化（即less的tint）
    const lightens = new Array(9).fill().map((t, i) => {
        return ThemeColorReplacer.varyColor.lighten(color, i / 10)
    })
    const colorPalettes = generate(color)
    const rgb = ThemeColorReplacer.varyColor.toNum3(color.replace('#', '')).join(',')
    return lightens.concat(colorPalettes).concat(rgb)
}

const themePluginOption = {
    fileName: `${publicPath}theme-colors-[contenthash:8].css`,
    // matchColors: getAntdSerials('#45A1FF'), // 主色系列 - 淡化
    matchColors: [...forElementUI.getElementUISeries('#45A1FF')], // 主色系列
    injectCss: true,
    changeSelector: forElementUI.changeSelector,
}
```



**vue.config.js configureWebpack 配置追加一下代码**

```js
plugins: [
    new ThemeColorReplacer(themePluginOption) // 配置如上
]
```

**themeColor.ts**

```js
import client from 'webpack-theme-color-replacer/client'
import forElementUI from 'webpack-theme-color-replacer/forElementUI'

export let curColor = '#45A1FF';

// 动态切换主题色
export function changeThemeColor(newColor) {
    const options = {
        newColors: [...forElementUI.getElementUISeries(newColor), '#45A1FF'],
    }
    return client.changer.changeColor(options, Promise).then(t => {
        curColor = newColor
        localStorage.setItem('theme_color', curColor)
    });
}

export function initThemeColor() {
    const savedColor = localStorage.getItem('theme_color') || curColor;
    if (savedColor) {
        curColor = savedColor
        changeThemeColor(savedColor)
    }
}
```

**App.vue**

```js
import { initThemeColor } from '@/config/themeColor'
onBeforeMount(()=> {
    initThemeColor() // 初始化
})
```

**切换主题**

```js
import {changeThemeColor} from '@/config/themeColor'
import {message} from "ant-design-vue";

changeThemeColor('#f00').then(t => {
    message.success('切换主题色成功')
}).catch(error => {
    message.error('切换主题色失败');
}).finally(() => {
})
```



