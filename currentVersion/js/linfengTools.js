// 使用严格模式 IE10前无法使用
"use strict";

// 立即执行函数
(() => {
    console.log("欢迎使用林风工具");
})()


// 设置默认值
const defaultConfig = {
    text: {
        judgeSpace: true,
    },
    date: {
        fmt: "YYYY-MM-DD hh:mm:ss",
        week: true,
    },
    animat: {
        floatText: [0, 1]
    }
}

/**
 * 判断数据类型
 * @param {*} param 需要判断数据类型的数据
 * @returns 以string形式返回判断结果
 */
function judgeDataType(param) {
    // 如果不是object类型的数据，直接用typeof就能判断出来
    // 弃用typeof，否则需要判断string和String两个比较麻烦
    // let type = typeof param;
    // if (type !== 'object') return type;
    // 如果是object类型数据，准确判断类型必须使用Object.prototype.toString.call(param)的方式才能判断
    const result = Object.prototype.toString.call(param).replace(/^\[object (\S+)\]$/, '$1');
    // Object.prototype.toString.call(Object.prototype)
    return result
}


/**
 * 设置cookie
 * @param {string} name 键
 * @param {string} value 值
 * @param {number} time 能存多长时间分钟
 */
function setCookie(name, value, time = 30) {
    const now = new Date();
    // 设置时间
    now.setMinutes(now.getMinutes() + time)
    // 设置cookie
    document.cookie = name + "=" + value + ";expires=" + now.toUTCString();
}

/**
 * 查找cookie的指定值
 * @param {string} value 需要检索的的内容
 * @returns 返回检索值
 */
function getCookie(value) {
    let name = value + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return false;
}

/**
 * 
 * @param {string} name 需要删除的cookie的键
 */
function delCookie(name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(name);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}

/**
 * 获取导航栏的参数
 * @param {string} variable 
 * @returns 查询到返回值，查询不到返回false
 * 使用方式：id = myToolGetQueryVariable('id')
 */
function myToolGetQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

/**
 * 根据指定格式进行格式化日期
 * Y年 M月 D日 h时 m分 s秒
 * @param {String} fmt 格式 默认为："YYYY-MM-DD hh:mm:ss"
 * @param {Date} date 日期对象
 * @param {Boolean} week true为天false为日，默认true
 * @returns 返回格式化完成的字符串
 */
function dateFormat(date, fmt, week = defaultConfig.date.week) {
    const dateType = judgeDataType(date)
    if (dateType != 'Date' && dateType != 'Undefind' && dateType != 'Null') throw new Error("异常数据类型，请传入合法数据\nError function:dateFormat()")
    if (judgeDataType(fmt) != 'String' || judgeNullValue(fmt)) {
        fmt = defaultConfig.date.fmt
    }
    let ret = "null";
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "M+": (date.getMonth() + 1).toString(),     // 月
        "D+": date.getDate().toString(),            // 日
        "h+": date.getHours().toString(),           // 时
        "m+": date.getMinutes().toString(),         // 分
        "s+": date.getSeconds().toString(),         // 秒
        "w+": date.getDay() ? date.getDay().toString() : "7", // 周
        "W+": date.getDay(),
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    switch (opt["W+"]) {
        case 0:
            if (week) opt["W+"] = "天";
            else opt["W+"] = "日"; break;
        case 1: opt["W+"] = "一"; break;
        case 2: opt["W+"] = "二"; break;
        case 3: opt["W+"] = "三"; break;
        case 4: opt["W+"] = "四"; break;
        case 5: opt["W+"] = "五"; break;
        case 6: opt["W+"] = "六"; break;
        default: opt["W=="] = "Error";
    }
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}


/**
 * 判断是否为空值
 * @param {*} param 需要判断的值
 * @param {Boolean} space 为是否去除空格，默认去除
 * @returns 若是空值返回true否则返回false
 * @returns 若为数值，0返回true，非0返回false
 */
function judgeNullValue(param, space = defaultConfig.text.judgeSpace) {
    const type = judgeDataType(param);
    if (type === "Undefined" || type === "Null") {
        return true
    } else if (type === "String") {
        if (space) {
            return param.trim().length ? false : true;
        } else {
            return param.length ? false : true;
        }
    } else if (type === "Number") {
        // 判断是否为0
        return (Number.parseFloat(param)) ? false : true;
    } else if (type === "Array") {
        // 判断是否为空数组
        return param.length ? false : true;
    } else if (type === "Object") {
        // 判断是否为空对象
        return JSON.stringify(param) === "{}"
    } else if (type === "Date") {
        // 判断日期是否为计算机默认起始日期
        return dateFormat(param) === "1970-01-01 00:00:00" ? true : false;
    } else {
        // 排除其余数据类型
        throw new Error("异常数据类型，请传入合法数据\nError function:judgeNullValue()")
    }
}


/**
 * 使用文字上浮消失效果
 * @param {*} textArr 
 * 传入的参数是你想要设定的参数
 * 若不设定会用默认值
 * 注意：该功能需要引入linfeng.css
 */
function linfengToolsAnimationFloatText(textArr = defaultConfig.animat.floatText) {
    if (judgeDataType(textArr) != "Array") throw new Error("您传递的数据不为数组\nError function:linfengToolsAnimationFloatText()")
    if (judgeNullValue(textArr)) throw new Error("数组不可为空\nError function:linfengToolsAnimationFloatText()")
    let getRandomColor = () =>
        "#" + (
            h => new Array(7 - h.length).join("0") + h
        )(
            (Math.random() * 0x1000000 << 0).toString(16)
        )

    let showText = textArr => {
        if (!textArr || textArr.length == 0) { return };
        let index = 0;
        document.documentElement.addEventListener("click", function (e) {
            let x = e.pageX;
            let y = e.pageY;
            //创建一个span
            let text = document.createElement("span");
            //给span添加了一个class
            text.setAttribute("class", "text_popup");
            //设置文本内容
            this.appendChild(text);
            if (textArr[index]) {
                text.innerHTML = textArr[index];
            } else {
                index = 0;
                text.innerHTML = textArr[index];
            }
            //给文本添加颜色
            text.style.color = getRandomColor();
            text.addEventListener("animationend", function () {
                text.parentNode.removeChild(text);
            }, false)
            if (x < text.clientWidth) {
                text.style.left = x + "px";
            } else if (text.clientWidth > (document.documentElement.clientWidth - x)) {
                text.style.left = (x - text.clientWidth) + "px";
            } else {
                text.style.left = (x - text.clientWidth / 2) + "px";
            }

            text.style.top = (y - text.clientHeight / 2) + "px";
            index++;
        }, false)
    }

    showText(textArr)
}

/**
 * 色值转换
 */
const linfengToolsColorChange = {
    /**
     * RGB(A)颜色转换为HEX十六进制的颜色值
     * @param {string} val rgb(r,g,b)例如：rgb(155,10,20)
     * 当然，也可以是rgba，rgb(155,10,20,0.5)
     * @returns 以对象形式返回alpha、r、g、b和hex十六进制色值
     */
    rgbToHex: function (val) {  //RGB(A)颜色转换为HEX十六进制的颜色值
        let r, g, b, a,
            regRgba = /rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(,([.\d]+))?\)/,    //判断rgb颜色值格式的正则表达式，如rgba(255,20,10,.54)
            rsa = val.replace(/\s+/g, '').match(regRgba);
        if (!!rsa) {
            r = parseInt(rsa[1]).toString(16);
            r = r.length == 1 ? '0' + r : r;
            g = (+rsa[2]).toString(16);
            g = g.length == 1 ? '0' + g : g;
            b = (+rsa[3]).toString(16);
            b = b.length == 1 ? '0' + b : b;
            a = (+(rsa[5] ? rsa[5] : 1)) * 100;
            return { hex: '#' + r + g + b, r: parseInt(r, 16), g: parseInt(g, 16), b: parseInt(b, 16), alpha: Math.ceil(a) };
        } else {
            return { hex: '无效', alpha: 100 };
        }
    },
    /**
     * HEX十六进制颜色值转换为RGB(A)颜色值
     * @param {string} val 十六进制色值，例如：#ff0000
     * 当然也可以是三色值，例如#ff0
     * @returns 以对象形式返回rgb、r、g、b
     */
    hexToRgb: function (val) {   //HEX十六进制颜色值转换为RGB(A)颜色值
        // 16进制颜色值的正则
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        // 把颜色值变成小写
        let color = val.toLowerCase();
        let result = '';
        if (reg.test(color)) {
            // 如果只有三位的值，需变成六位，如：#fff => #ffffff
            if (color.length === 4) {
                let colorNew = "#";
                for (let i = 1; i < 4; i += 1) {
                    colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
                }
                color = colorNew;
            }
            // 处理六位的颜色值，转为RGB
            let colorChange = [];
            for (let i = 1; i < 7; i += 2) {
                colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
            }
            result = "rgb(" + colorChange.join(",") + ")";
            return { rgb: result, r: colorChange[0], g: colorChange[1], b: colorChange[2] };
        } else {
            result = '无效';
            return { rgb: result };
        }

    }
};

/**
 * 文本切换
 * @param {string} leave 离开时的文本，可为空 
 * @param {string} retur 刚返回时文本，可为空
 * @param {string} selectedTitleText 返回后的文本，可为空
 * 默认返回后文本为原来title，可不写
 */
function myToolTitleText(leave, retur, selectedTitleText) {
    let titleTime = 0
    // 获取当前title
    const selfTitle = document.title;
    // 默认文本
    const arrTitleTexts = ['(┬＿┬)别不理我', 'o(*￣▽￣*)ブ欢迎回来', selfTitle]
    if (!judgeNullValue(leave)) {
        arrTitleTexts[0] = leave;
    }
    if (!judgeNullValue(retur)) {
        arrTitleTexts[1] = retur;
    }
    if (!judgeNullValue(selectedTitleText)) {
        arrTitleTexts[2] = selectedTitleText;
    }

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            document.title = arrTitleTexts[0];
            clearTimeout(titleTime);
        } else {
            document.title = arrTitleTexts[1];
            titleTime = setTimeout(function () {
                document.title = arrTitleTexts[2];
            }, 2000);
        }
    });
}

/**
 * 检测是否为移动端
 */
function myToolMobileCheck() {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        return true
    }
    return false
}

/**
 * 检测是否为移动端
 * @returns 移动端true否则false
 */
function filesMobile() {
    // 市面上的主流使用环境
    return /Andriod|iphone|ipad|webOs|Windows Phone|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * 检测设备Andriod，iphone，ipad
 * PC端显示未定义，不推荐使用
 */
function equipmentCheckForAED() {
    let userMessage = navigator.userAgent.toLowerCase();
    if (/android|adr/gi.test(userMessage)) {
        // 当前为Andriod环境
        return 'android'
    } else if (/\(i[^;]+;( U;)? CPU.+Mac OS X/gi.test(userMessage)) {
        // 当前为iphone环境
        return 'iphone'
    } else if (/iPad/gi.test(userMessage)) {
        // 当前为iPad环境 
        return 'ipad'
    }
}



const linfeng = {
    type: judgeDataType,
    date: dateFormat,
    isNull: judgeNullValue,
    // 色值转换
    color: {
        toHex: linfengToolsColorChange.rgbToHex,
        toRgb: linfengToolsColorChange.hexToRgb,
    },
    // 浏览器标题（title）文本切换
    titleText: myToolTitleText,
    text: {

    },
    // 动画
    animat: {
        floatText: linfengToolsAnimationFloatText,
    },
    // cookie操作
    cookie: {
        set: setCookie,
        get: getCookie,
        del: delCookie,
    },
    // 设备检测
    equipment: {
        // 检测是否为移动端
        mobile: myToolMobileCheck,
        // 检测是否为移动端，不推荐使用
        move: filesMobile,
        // 区分Andriod，iphone，ipad，不推荐使用
        aed: equipmentCheckForAED,
    },
    // 其它工具
    query: myToolGetQueryVariable
}
