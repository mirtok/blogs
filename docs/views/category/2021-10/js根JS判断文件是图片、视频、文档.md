---
title: js根JS判断文件是图片、视频、文档
date: 2021-10-15
tags:
  - Javascript
categories:
  - 前端
---

### 1. 代码

```js
// 根据文件名后缀区分 文件类型
export function matchType(fileName) {
  // 后缀获取
  let suffix = ''
  // 获取类型结果
  let result
  try {
    const fileArr = fileName.split('.')
    suffix = fileArr[fileArr.length - 1]
  } catch (err) {
    suffix = ''
  }
  // fileName无后缀返回 false
  if (!suffix) {
    result = false
    return result
  }
  // 图片格式
  const imgList = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'svg', 'icon', 'ico']
  // 进行图片匹配
  result = imgList.some(function(item) {
    return item === suffix
  })
  if (result) {
    result = 'image'
    return result
  }
  // 匹配txt
  const txtList = ['txt']
  result = txtList.some(function(item) {
    return item === suffix
  })
  if (result) {
    result = 'txt'
    return result
  }
  // 匹配 excel
  const excelList = ['xls', 'xlsx']
  result = excelList.some(function(item) {
    return item === suffix
  })
  if (result) {
    result = 'excel'
    return result
  }
  // 匹配 word
  const wordList = ['doc', 'docx']
  result = wordList.some(function(item) {
    return item === suffix
  })
  if (result) {
    result = 'word'
    return result
  }
  // 匹配 pdf
  const pdfList = ['pdf']
  result = pdfList.some(function(item) {
    return item === suffix
  })
  if (result) {
    result = 'pdf'
    return result
  }
  // 匹配 ppt
  const pptList = ['ppt', 'pptx']
  result = pptList.some(function(item) {
    return item === suffix
  })
  if (result) {
    result = 'ppt'
    return result
  }
  // 匹配 视频
  const videoList = ['mp4', 'm2v', 'mkv']
  result = videoList.some(function(item) {
    return item === suffix
  })
  if (result) {
    result = 'video'
    return result
  }
  // 匹配 音频
  const radioList = ['mp3', 'wav', 'wmv']
  result = radioList.some(function(item) {
    return item === suffix
  })
  if (result) {
    result = 'radio'
    return result
  }
  // 其他 文件类型
  result = 'other'
  return result
}
```
### 2.调用
```js
this.matchType('demo.png'); // 返回的结果为 'image'
```