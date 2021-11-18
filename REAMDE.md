### vuepress 搭建博客
	+ vuepress 一个以 Vue 驱动的主题系统的简约静态网站生成工具，和一个为编写技术文档而优化的默认主题。它是为了支持 Vue 子项目的文档需求而创建的。
	+ vuepress-theme-reco 一款简洁而优雅的 vuepress 博客 & 文档 主题。
### 目录结构
	+ docs/.vuepress: 用于存放全局的配置、组件、静态资源等。
	+ docs/.vuepress/components: 该目录中的 Vue 组件将会被自动注册为全局组件。
	+ docs/.vuepress/theme: 用于存放本地主题。
	+ docs/.vuepress/styles: 用于存放样式相关的文件。
	+ docs/.vuepress/styles/index.styl: 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。
	+ docs/.vuepress/styles/palette.styl: 用于重写默认颜色常量，或者设置新的 stylus 颜色常量。
	+ docs/.vuepress/public: 静态资源目录。
	+ docs/.vuepress/templates: 存储 HTML 模板文件。
	+ docs/.vuepress/templates/dev.html: 用于开发环境的 HTML 模板文件。
	+ docs/.vuepress/templates/ssr.html: 构建时基于 Vue SSR 的 HTML 模板文件。
	+ docs/.vuepress/enhanceApp.js: 客户端应用的增强。
	+ docs/.vuepress/config.js: 配置文件的入口文件，也可以是 YML 或 toml。
### 部署
	+ 