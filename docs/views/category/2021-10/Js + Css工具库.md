---
title: Js + Css工具库
date: 2021-10-15
tags:
  - Javascript
  - CSS
categories:
  - 前端
---

### js 工具库
```js
/**
 * js常用工具类
 */

/**
 * 方法作用：【格式化时间】
 * 使用方法
 * 示例：
 *      使用方式一：
 *      var now = new Date();
 *      var nowStr = now.dateFormat("yyyy-MM-dd hh:mm:ss");
 *      使用方式二：
 *      new Date().dateFormat("yyyy年MM月dd日");
 *      new Date().dateFormat("MM/dd/yyyy");
 *      new Date().dateFormat("yyyyMMdd");
 *      new Date().dateFormat("yyyy-MM-dd hh:mm:ss");
 * @param format {date} 传入要格式化的日期类型
 * @returns {2015-01-31 16:30:00}
 */
Date.prototype.dateFormat = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

/**
 * 判断一个数组元素是不是在数组里面
 * @param obj
 * @returns {boolean}
 */
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

/**
* 获取数组最大的值
* @returns {number}
*/
Array.prototype.arrayMax = function () {
    return Math.max.apply(null, this);
};

/**
* 获取数组中最小的值
* @returns {number}
*/
Array.prototype.arrayMin = function () {
    return Math.min.apply(null, this);
};

/**
* 过滤数组中重复的，如果是数组对象就传递一个参数进去
* dataSet.uniqueFn("id"),那么就是根据id过滤数组对象
**/
Array.prototype.uniqueFn = function (key) {
    var arr = this;
    var n = [arr[0]];
    for (var i = 1; i < arr.length; i++) {
        if (key === undefined) {
            if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
        } else {
            inner: {
                var has = false;
                for (var j = 0; j < n.length; j++) {
                    if (arr[i][key] == n[j][key]) {
                        has = true;
                        break inner;
                    }
                }
            }
            if (!has) {
                n.push(arr[i]);
            }
        }
    }
    return n;
};

/***********************************************************************
 *                           日期时间工具类                            *
 *                     注：调用方式，deteUtil.方法名                   *
 * ********************************************************************/
var dateUtil = {
    /*
     * 方法作用：【取传入日期是星期几】
     * 使用方法：dateUtil.nowFewWeeks(new Date());
     * @param date{date} 传入日期类型
     * @returns {星期四，...}
     */
    nowFewWeeks: function (date) {
        if (date instanceof Date) {
            var dayNames = new Array("星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
            return dayNames[date.getDay()];
        } else {
            return "Param error,date type!";
        }
    },
    /*
     * 方法作用：【字符串转换成日期】
     * 使用方法：dateUtil.strTurnDate("2010-01-01");
     * @param str {String}字符串格式的日期，传入格式：yyyy-mm-dd(2015-01-31)
     * @return {Date}由字符串转换成的日期
     */
    strTurnDate: function (str) {
        var re = /^(\d{4})\S(\d{1,2})\S(\d{1,2})$/;
        var dt;
        if (re.test(str)) {
            dt = new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3);
        }
        return dt;
    },
    /*
     * 方法作用：【计算2个日期之间的天数】
     * 传入格式：yyyy-mm-dd(2015-01-31)
     * 使用方法：dateUtil.dayMinus(startDate,endDate);
     * @startDate {Date}起始日期
     * @endDate {Date}结束日期
     * @return endDate - startDate的天数差
     */
    dayMinus: function (startDate, endDate) {
        if (startDate instanceof Date && endDate instanceof Date) {
            var days = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
            return days;
        } else {
            return "Param error,date type!";
        }
    }
};

/***********************************************************************
 *                           加载工具类                                *
 *                     注：调用方式，loadUtil.方法名                   *
 * ********************************************************************/
var loadUtil = {
    /*
     * 方法说明：【动态加载js文件css文件】
     * 使用方法：loadUtil.loadjscssfile("http://libs.baidu.com/jquery/1.9.1/jquery.js","js")
     * @param fileurl 文件路径，
     * @param filetype 文件类型，支持传入类型，js、css
     */
    loadjscssfile: function (fileurl, filetype) {
        if (filetype == "js") {
            var fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", fileurl);
        } else if (filetype == "css") {

            var fileref = document.createElement('link');
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", fileurl);
        }
        if (typeof fileref != "undefined") {
            document.getElementsByTagName("head")[0].appendChild(fileref);
        } else {
            alert("loadjscssfile method error!");
        }
    }
};

/***********************************************************************
 *                           字符串操作工具类                          *
 *                     注：调用方式，strUtil.方法名                   *
 * ********************************************************************/
var strUtil = {
    /*
     * 判断字符串是否为空
     * @param str 传入的字符串
     * @returns {}
     */
    isEmpty: function (str) {
        if (str != null && str.length > 0) {
            return true;
        } else {
            return false;
        }
    },
    /*
     * 判断两个字符串子否相同
     * @param str1
     * @param str2
     * @returns {Boolean}
     */
    isEquals: function (str1, str2) {
        if (str1 == str2) {
            return true;
        } else {
            return false;
        }
    },
    /*
     * 忽略大小写判断字符串是否相同
     * @param str1
     * @param str2
     * @returns {Boolean}
     */
    isEqualsIgnorecase: function (str1, str2) {
        if (str1.toUpperCase() == str2.toUpperCase()) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 判断是否是数字
     * @param value
     * @returns {Boolean}
     */
    isNum: function (value) {
        if (value != null && value.length > 0 && isNaN(value) == false) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 判断是否是中文
     * @param str
     * @returns {Boolean}
     */
    isChine: function (str) {
        var reg = /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/;
        if (reg.test(str)) {
            return false;
        }
        return true;
    },

    /**
     * 去除字符串两边的空格
     * @param str
     * @returns {number|Number}
     * 调用方法：var str = utils.trim("abcd")
     */
    trim: function (str) {
        String.prototype.trim = function () {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
    },
}

/***********************************************************************
 *                           关于文件及字符操作js工具类                *
 *                     注：调用方式，strUtil.方法名                   *
 * ********************************************************************/
var filesUtil = {
    /**
     * 文件大小转换为MB GB KB格式
     * @param {Object} size
     */
    countFileSize: function (size) {
        var fsize = parseFloat(size, 2);
        var fileSizeString;
        if (fsize < 1024) {
            fileSizeString = fsize.toFixed(2) + "B";
        } else if (fsize < 1048576) {
            fileSizeString = (fsize / 1024).toFixed(2) + "KB";
        } else if (fsize < 1073741824) {
            fileSizeString = (fsize / 1024 / 1024).toFixed(2) + "MB";
        } else if (fsize < 1024 * 1024 * 1024) {
            fileSizeString = (fsize / 1024 / 1024 / 1024).toFixed(2) + "GB";
        } else {
            fileSizeString = "0B";
        }
        return fileSizeString;
    },

    /**
     * 获取文件的后缀名
     * @param {Object} fileName
     */
    getFileExtName: function (fileName) {
        if (fileName.lastIndexOf(".") == -1)
            return fileName;
        var pos = fileName.lastIndexOf(".") + 1;
        return fileName.substring(pos, fileName.length).toLowerCase();
    },

    /**
     * 获取文件名称
     * @param {Object} fileName
     */
    getFileName: function (fileName) {
        var pos = fileName.lastIndexOf(".");
        if (pos == -1) {
            return fileName;
        } else {
            return fileName.substring(pos, fileName.length);
        }
    },

    /**
     * 生成一个随机数
     */
    random: function () {
        return new Date().getTime();
    },

    /**
     * 过滤html代码(把<>转换)
     * @param {Object} str
     */
    filterTag: function (str) {
        str = str.replace(/&/ig, "&amp;");
        str = str.replace(/</ig, "&lt;");
        str = str.replace(/>/ig, "&gt;");
        str = str.replace(" ", "&nbsp;");
        return str;
    },

    /**
     * 过滤<script></script>转换
     * @param {Object} str
     */
    filterScript: function (str) {
        return str.replace(/(<script)/ig, "&lt;script").replace(/(<script>)/ig, "&lt;script&gt;").replace(/(<\/script>)/ig, "&lt;/script&gt;");
    },
    /**
    * 验证是否为图片
    * @param {String} fileName 
    */
    tmCheckImage: function (fileName) {
        return /(gif|jpg|jpeg|png|GIF|JPG|PNG)$/ig.test(fileName);
    },

    /*验证是否为视频*/
    tmCheckVideo: function (fileName) {
        return /(mp4|mp3|flv|wav)$/ig.test(fileName);
    },

    /**
    * 验证是否为文档
    * @param {String} fileName 
    */
    tmCheckDocument: function (fileName) {
        return /(doc|docx|xls|xlsx|pdf|txt|ppt|pptx|rar|zip|html|jsp|sql|htm|shtml|xml)$/ig.test(fileName);
    },

    /**
     * 验证是否为文档Excel
     * @param {String} fileName 
     */
    tmCheckOffice: function (fileName) {
        return /(doc|docx|xls|xlsx|pdf|txt|ppt|pptx)$/ig.test(fileName);
    },
}


/***********************************************************************
 *                      windowjs工具类                *
 *                     注：调用方式，strUtil.方法名                   *
 * ********************************************************************/

var clipboardUtil = {
    /**
     * 往剪切板里赋值
     * @param {String} txt 
     */
    SetClipboard: function (txt) {
        if (window.clipboardData) {
            window.clipboardData.clearData();
            window.clipboardData.setData("Text", txt);
        } else if (navigator.userAgent.indexOf("Opera") != -1) {
            window.location = txt;
        } else if (window.netscape) {
            try {
                netscape.security.PrivilegeManager
                    .enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("您的firefox安全限制限制您进行剪贴板操作，请打开'about:config'将signed.applets.codebase_principal_support'设置为true'之后重试，相对路径为firefox根目录/greprefs/all.js");
                return false;
            }
            var clip = Components.classes['@mozilla.org/widget/clipboard;1']
                .createInstance(Components.interfaces.nsIClipboard);
            if (!clip)
                return;
            var trans = Components.classes['@mozilla.org/widget/transferable;1']
                .createInstance(Components.interfaces.nsITransferable);
            if (!trans)
                return;
            trans.addDataFlavor('text/unicode');
            var str = Components.classes["@mozilla.org/supports-string;1"]
                .createInstance(Components.interfaces.nsISupportsString);
            var copytext = txt;
            str.data = copytext;
            trans.setTransferData("text/unicode", str, copytext.length * 2);
            var clipid = Components.interfaces.nsIClipboard;
            if (!clip)
                return false;
            clip.setData(trans, null, clipid.kGlobalClipboard);
        }
    },
    /**
     * 获取剪切板中的内容
     */
    getClipboard: function () {
        if (window.clipboardData) {
            return (window.clipboardData.getData('text'));
        } else {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager
                        .enablePrivilege("UniversalXPConnect");
                    var clip = Components.classes["@mozilla.org/widget/clipboard;1"]
                        .createInstance(Components.interfaces.nsIClipboard);
                    if (!clip) {
                        return;
                    }
                    var trans = Components.classes["@mozilla.org/widget/transferable;1"]
                        .createInstance(Components.interfaces.nsITransferable);
                    if (!trans) {
                        return;
                    }
                    trans.addDataFlavor("text/unicode");
                    clip.getData(trans, clip.kGlobalClipboard);
                    var str = new Object();
                    var len = new Object();
                    trans.getTransferData("text/unicode", str, len);
                } catch (e) {
                    alert("您的firefox安全限制限制您进行剪贴板操作，请打开'about:config'将signed.applets.codebase_principal_support'设置为true'之后重试，相对路径为firefox根目录/greprefs/all.js");
                    return null;
                }
                if (str) {
                    if (Components.interfaces.nsISupportsWString) {
                        str = str.value
                            .QueryInterface(Components.interfaces.nsISupportsWString);
                    } else {
                        if (Components.interfaces.nsISupportsString) {
                            str = str.value
                                .QueryInterface(Components.interfaces.nsISupportsString);
                        } else {
                            str = null;
                        }
                    }
                }
                if (str) {
                    return (str.data.substring(0, len.value / 2));
                }
            }
        }
        return null;
    },

    /**
     * 设置光标的处的值
     * @param ctrl
     * @returns {number}
     */
    getCursortPosition: function (ctrl) {
        var CaretPos = 0; // IE Support
        if (document.selection) {
            ctrl.focus();
            var Sel = document.selection.createRange();
            Sel.moveStart('character', -ctrl.value.length);
            CaretPos = Sel.text.length;
        }
        // Firefox support
        else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
            CaretPos = ctrl.selectionStart;
        }
        return (CaretPos);
    },
    /**
     * 获取光标处内容
     * @param inputDom
     * @param startIndex
     * @param endIndex
     */
    setCaretPosition: function (inputDom, startIndex, endIndex) {
        if (inputDom.setSelectionRange) {
            inputDom.setSelectionRange(startIndex, endIndex);
        } else if (inputDom.createTextRange) // IE
        {
            var range = inputDom.createTextRange();
            range.collapse(true);
            range.moveStart('character', startIndex);
            range.moveEnd('character', endIndex - startIndex - 1);
            range.select();
        }
        inputDom.focus();
    },
    /**
    * 获取选中文本
    * @param inputDom
    * @returns {string}
    */
    getSelectedText: function (inputDom) {
        if (document.selection) // IE
        {
            return document.selection.createRange().text;
        } else {
            return inputDom.value.substring(inputDom.selectionStart,
                inputDom.selectionEnd);
        }
    },
    /**
    * 获取十六进制随机颜色
    * @returns {string}
    */
    getRandomColor: function () {
        return '#' + (function (h) {
            return new Array(7 - h.length).join("0") + h;
        })((Math.random() * 0x1000000 << 0).toString(16));
    },
}
```
### css 工具库
```css
/* 禁止选中文本 */
.usn{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    -o-user-select:none;
    user-select:none;
}
/* 浮动 */
.fl { float: left; }
.fr { float: right; }
.cf { zoom: 1; }
.cf:after {
    content:".";
    display:block;
    clear:both;
    visibility:hidden;
    height:0;
    overflow:hidden;
}
 
/* 元素类型 */
.db { display: block; }
.dn { display: none; }
.di { display: inline }
.dib {display: inline-block;}
.transparent { opacity: 0 }
 
 
/*文字排版、颜色*/
.f12 { font-size:12px }
.f14 { font-size:14px }
.f16 { font-size:16px }
.f18 { font-size:18px }
.f20 { font-size:20px }
.fb { font-weight:bold }
.fn { font-weight:normal }
.t2 { text-indent:2em }
.red,a.red { color:#cc0031 }
.darkblue,a.darkblue { color:#039 }
.gray,a.gray { color:#878787 }
.lh150 { line-height:150% }
.lh180 { line-height:180% }
.lh200 { line-height:200% }
.unl { text-decoration:underline; }
.no_unl { text-decoration:none; }
.tl { text-align: left; }
.tc { text-align: center; }
.tr { text-align: right; }
.tj { text-align: justify; text-justify: inter-ideograph; }
.wn { /* 强制不换行 */
    word-wrap:normal;
    white-space:nowrap;
}
.wb { /* 强制换行 */
    white-space:normal;
    word-wrap:break-word;
    word-break:break-all;
}
.wp { /* 保持空白序列*/
    overflow:hidden;text-align:left;white-space:pre-wrap;word-wrap:break-word;word-break:break-all;
}
.wes { /* 多出部分用省略号表示 , 用于一行 */
    overflow:hidden;
    word-wrap:normal;
    white-space:nowrap;
    text-overflow:ellipsis;
}
.wes-2 { /* 适用于webkit内核和移动端 */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
} 
.wes-3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
.wes-4 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
}
 
/* 溢出样式 */
.ofh { overflow: hidden; }
.ofs {overflow: scroll; }
.ofa {overflow: auto; }
.ofv {overflow: visible; }
 
/* 定位方式 */
.ps {position: static; }
.pr {position: relative;zoom:1; }
.pa {position: absolute; }
.pf {position: fixed; }
 
 
/* 垂直对齐方式 */
.vt {vertical-align: top; }
.vm {vertical-align: middle; }
.vb {vertical-align: bottom; }
 
 
/* 鼠标样式 */
.csd {cursor: default; }
.csp {cursor: pointer; }
.csh {cursor: help; }
.csm {cursor: move; }
 
/* flex布局 */
.df-sb {
    display:flex;
    align-items: center;
    justify-content: space-between;
}
.df-sa {
    display:flex;
    align-items: center;
    justify-content: space-around;
}
 
/* 垂直居中 */
.df-c {
    display: flex;
    align-items: center;
    justify-content: center;
}
.tb-c {
    text-align:center;
    display:table-cell;
    vertical-align:middle;
}
.ts-c {
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
}
.ts-mc {
    position: absolute;
    left: 0;right: 0;
    bottom: 0; top: 0;
    margin: auto;
}
 
/* 辅助 */
.mask-fixed-wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    left:0;top:0;
    background: rgba(0, 0, 0, 0.65);
    z-index: 999;
}
.bg-cover {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
.bg-cover-all {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
}
```