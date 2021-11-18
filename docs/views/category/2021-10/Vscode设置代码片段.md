---
title: Vscode设置代码片段
date: 2021-10-15
tags:
  - Vs Code
categories:
  - 编辑器
---

### 1、点击【文件】---【首选项】---【用户代码片段】
![158103320190917142508657263217093.png](http://www.lxit365.com/fileUpload/static/upload/image/20200926/eaae26c48bc14f14938efd9073791d21.png)
### 2、新建或修改vue.json
![1581033201909171426301172046722705 1.png](http://www.lxit365.com/fileUpload/static/upload/image/20200926/ba183bffb8d84f689a36273dba9967b8.png)
###  3、将下列代码粘贴上去（可根据自己需要添加/删除）
```json
{
    "Print to console": {
        "prefix": "vue",
        "body": [
            "<template>",
            "    <div>\n",
            "    </div>",
            "</template>\n",
            "<script>",
            "export default {",
            "    data() {",
            "        return {\n",
            "        };",
            "    },",
            "    created() {\n",
            "    },",
            "    mounted() {\n",
            "    },",
            "    methods: {\n",
            "    }",
            "};",
            "</script>\n",
            "<style scoped lang=\"${1:less}\">\n",
            "</style>\n",
        ],
        "description": "Create vue template"
    }
}
```
###  4、在编辑器里面输入vue + Tab 键即可