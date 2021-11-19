module.exports = {
    title: "李享的中文印记",
    description: '一款简洁而优雅的博客文章',
    dest: 'deploy', //打包路径
    head: [
        ['link', { rel: 'icon', href: '/lixiang.ico' }],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    base: '/blogs/deploy/', // 部署到GitHub相关的配蛋 仓库名称
    theme: require.resolve('../../packages/vuepress-theme-reco'), // 主题 theme: 'reco',
    themeConfig: {
        nav: [
            { text: '主页', link: '/', icon: 'reco-home' },
            { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
            //   { text: '侧边栏', link: '/views/sidebar/' },
            //   { text: '侧边栏组', link: '/views/sidebargroup/' }
        ],
        sidebar: {
            '/views/sidebar/': [
                '',
                'bar1',
                'bar2'
            ],
            '/views/sidebargroup/': [
                {
                    title: '基础',
                    collapsable: true,
                    children: [
                        '',
                        'bar1'
                    ]
                },
                {
                    title: '进阶',
                    collapsable: true,
                    children: [
                        'bar2'
                    ]
                },
            ]
        },
        type: 'blog',
        // 博客设置
        blogConfig: {
            category: {
                location: 2, // 在导航栏菜单中所占的位置，默认2
                text: '分类' // 默认 “分类”
            },
            tag: {
                location: 3, // 在导航栏菜单中所占的位置，默认3
                text: '标签' // 默认 “标签”
            },
            socialLinks: [     // 信息栏展示社交信息
                { icon: 'reco-github', link: 'https://github.com/mirtok' },
                { icon: 'reco-npm', link: 'https://www.npmjs.com/package/vue-toastification-mini' }
            ]
        },
        logo: '/lixiang.png',
        authorAvatar: '/lixiang.png',
        // 搜索设置
        search: true,
        searchMaxSuggestions: 10,
        // 自动形成侧边导航
        // sidebar: 'auto',
        sidebarDepth: 4,
        // 最后更新时间 
        lastUpdated: 'Last Updated',
        // 作者
        author: 'Li Xiang',
        // 备案号
        record: 'xxxxxxxxxxxxxxxx',
        // 项目开始时间
        startYear: '2019',
        /**
         * 密钥 (if your blog is private)
         */
        friendLink: [
            {
                title: '午后南杂',
                desc: 'Enjoy when you can, and endure when you must.',
                email: '1156743527@qq.com',
                link: 'https://www.recoluan.com'
            },
            {
                title: 'vuepress-theme-reco',
                desc: 'A simple and beautiful vuepress Blog & Doc theme.',
                avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
                link: 'https://vuepress-theme-reco.recoluan.com'
            },
        ],
        codeTheme: 'tomorrow'
        /**
         * support codeTheme for
         * '' | 'default'
         * 'coy'
         * 'dark'
         * 'funky'
         * 'okaidia'
         * 'solarizedlight'
         * 'tomorrow'
         * 'twilight'
         */
    }
}
