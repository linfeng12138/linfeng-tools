/**
 * 判断是否为空值
 * @param {*} value 
 * @returns boolean
 * 若为空返回true 也可检测数组
 */
function myToolNullValue(value) {
    if (value === null || value === undefined || value === '' || value.length === 0) {
        return true
    } else {
        return false
    }
}

/**
 * 判断是否为空，包括是否为空格
 * @param {String} par 需要判断是否为空的值
 * @returns 若为空返回true否则返回false
 */
// function ifNull(par) {
//     if (par === undefined || par === null || par === '' || par.trim().length === 0) {
//         return true
//     }
//     return false
// }

/**
 * 判断是否为空值，只能判断数值、string和数组
 * @param {any} param 需要判断的值
 * @returns 若为空则返回true
 */
function ifNull(param){
    if(typeof param === 'null' || typeof param === 'undefined'){
        // 空类型判断
        return true
    }else if(typeof param === 'string') {
        // 空string值判断
        const tmp = param.trim()
        if(tmp.length === 0){
            return true
        }
    }else if(param instanceof Array){
        // 空数组判断
        if(param.length === 0){
            return true
        }
    }
    return false
}

/**
 * 获取导航栏的参数
 * @param {string} variable 
 * @returns parm
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
 * 使用文字上浮消失
 * @param {Array} textArr
 * 传入的参数是你想要设定的参数
 * 若不设定会用默认值
 * 注意：该功能需要引入linfeng.css
 */
function myToolUseTheText(textArr) {
    var getRandomColor = function () {
        return '#' + (function (h) {
            return new Array(7 - h.length).join("0") + h
        })((Math.random() * 0x1000000 << 0).toString(16))
    }
    var showText = function (textArr) {
        if (!textArr || textArr.length == 0) {
            return;
        }
        var index = 0;
        document.documentElement.addEventListener('click', function (e) {
            var x = e.pageX;
            var y = e.pageY;
            //创建一个span
            var text = document.createElement('span');
            //给span添加了一个class
            text.setAttribute('class', 'text_popup');
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
            text.addEventListener('animationend', function () {
                text.parentNode.removeChild(text);
            }, false)
            if (x < text.clientWidth) {
                text.style.left = x + 'px';
            } else if (text.clientWidth > (document.documentElement.clientWidth - x)) {
                text.style.left = (x - text.clientWidth) + 'px';
            } else {
                text.style.left = (x - text.clientWidth / 2) + 'px';
            }

            text.style.top = (y - text.clientHeight / 2) + 'px';
            index++;
        }, false)
    }

    if (myToolNullValue(textArr)) {
        textArr = ['林风最帅', '冠哥666', '心之所向', '素履以往~', '浮生如梦', '岁月如舟']
    }
    showText(textArr)
}



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
    if (!myToolNullValue(leave)) {
        arrTitleTexts[0] = leave;
    }
    if (!myToolNullValue(retur)) {
        arrTitleTexts[1] = retur;
    }
    if (!myToolNullValue(selectedTitleText)) {
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
 * 检测是否为移动端并进行跳转
 * @param {string} url 需要跳转的移动端页面
 */
function myToolIfGoMobile(url) {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        if (!myToolNullValue(url)) {
            window.location.href = url;
        }
        return true
    }
    return false
}

/**
 * 检测是否为PC端
 * @returns 若为PC端返回true否则返回false
 */
function myToolIfMobile() {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        return false
    } else {
        return true
    }
}

/**
 * 日期默认转换为YY-MM-DD hh mm ss格式
 * @param {date} date 需要转换的日期 可不写
 * @returns 转换后的日期
 */
function myToolFormatDateDefault(date) {
    if (myToolNullValue(date)) {
        date = new Date()
    }
    let YY = date.getFullYear() + '-';
    let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return YY + MM + DD + " " + hh + mm + ss;
}

/**
 * 根据指定格式进行格式化日期
 * @param {string} fmt 格式 例如："YYYY-MM-DD hh:mm"
 * @param {date} date 日期对象
 * @returns 返回格式化完成的字符串
 * Y年 M月 D日 h时 m分 s秒
 */
function myToolFormatDate(date, fmt) {
    if (typeof date === 'string') {
        fmt = date
        date = new Date()
    }
    if (myToolNullValue(date)) {
        date = new Date()
    }
    if (myToolNullValue(fmt)) {
        fmt = "YYYY-MM-DD hh:mm:ss"
    }
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "M+": (date.getMonth() + 1).toString(),     // 月
        "D+": date.getDate().toString(),            // 日
        "h+": date.getHours().toString(),           // 时
        "m+": date.getMinutes().toString(),         // 分
        "s+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}



/**
 * @param {string} str 需要验证的字符串
 * @desc: 特殊字符校验 除了下划线
 */
function myToolRegexContainSpecial(str) {
    let containSpecial = RegExp(
        /[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/
    );
    return containSpecial.test(str);
}

/**
 * @param {string} str 需要验证的字符串
 * @desc: 特殊字符校验 除了下划线 斜杠 反斜杠 冒号
 */
function myToolRegexContainSpecialMore(str) {
    let containSpecial = RegExp(
        /[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\+)(\=)(\[)(\])(\{)(\})(\|)(\;)(\')(\")(\,)(\.)(\<)(\>)(\?)(\)]+/
    );
    return containSpecial.test(str);
}

/**
 * @param {string} str 需要验证的字符串
 * @desc: 中文校验
 */
function myToolRegexCheckChinese(val) {
    let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
    return reg.test(val);
}

/**
 * @param {string} str 需要验证的字符串
 * @desc: 特殊字符 除了下划线
 */
function myToolRegexUser(str) {
    boolOne = myToolRegexContainSpecial(str);
    boolTwo = myToolRegexCheckChinese(str);
    if (boolOne || boolTwo) {
        return true;
    } else {
        return false;
    }
}

/**
 * 用户名验证，只允许输入英文大小写和下划线
 * @author linfeng 林风
 * @param {String} str 需要判断的字符串
 * @param {int} star 长度最小值，可不写，默认6
 * @param {int} end 长度最大值，可不写，默认16
 * @returns 返回布尔值，符合条件为true，否则相反
 */
function mtlfRegexUser(str, star, end) {
    let reg
    let starNum = 6
    let endNum = 16
    if (!myToolNullValue(star)) starNum = star
    if (!myToolNullValue(end)) endNum = end
    reg = `^[a-zA-Z0-9_]{${starNum},${endNum}}$`
    const regexp = new RegExp(reg)
    return regexp.test(str)
}

/**
 * 用户名验证，只允许输入英文大小写和下划线
 * @param {String} str 需要判断的字符串
 * @param {JSON} json 两个参数star和end可不写，可漏写
 * @returns 
 */
function mtlfRegexUserJson(str, json) {
    let reg
    let starNum = 6
    let endNum = 16
    if (!myToolNullValue(json)) {
        if (!myToolNullValue(json.star)) starNum = json.star
        if (!myToolNullValue(json.end)) endNum = json.end
    }
    reg = `^[a-zA-Z0-9_]{${starNum},${endNum}}$`
    const regexp = new RegExp(reg)
    return regexp.test(str)
}






/**
 * 色值转换
 */
const myToolColorChange = {
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
 * 背景图片
 * 注意：该功能需要搭配linfengTools.css使用
 * @author linfeng 林风
 * @param {string} src 背景图片路径
 * @param {boolean} bgcBool 是否有遮罩层
 * @param {float} alpha 设置不透明度
 * @param {string} color 设置遮罩层十六进制色值
 */
function mtlfBgi(src, bgcBool, alpha, color, width) {
    let bool = false
    let al = 0.5
    const bgi = document.getElementsByTagName('html')[0]
    bgi.style.backgroundImage = `url(${src})`
    if (!myToolNullValue(bgcBool)) bool = bgcBool
    if (bool) {
        const body = document.getElementsByTagName('body')[0]
        const bgc = document.createElement('div')
        bgc.className = 'bigBgc'
        body.appendChild(bgc)
        if (!myToolNullValue(alpha)) {
            al = alpha
            bgc.style.backgroundColor = `rgba(0,0,0,${al})`
            if (!myToolNullValue(color)) {
                const temp = myToolColorChange.hexToRgb(color)
                bgc.style.backgroundColor = `rgba(${temp.r},${temp.g},${temp.b},${al})`
                if (!myToolNullValue(width)) {
                    bgc.style.width = width
                }
            }
        }
    }
}

/**
 * 正则验证工具
 * @param {String} reg 正则表达式，记得反斜杠写两个
 * @param {String} str 需要验证的文本
 * @returns 返回布尔值，符合条件为true否则相反
 */
function myToolregex(reg, str) {
    const regexp = new RegExp(`${reg}`);
    const temp = regexp.test(str);
    return temp
}


// 请求
function myToolAjax(url, data, method = 'POST') {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            method: method,
            data: data,
            success(res) {
                resolve(res)
            }
        })
    })
}


/**
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.img标签添加style属性：width:100%;height:auto
 * 3.修改所有style里的width属性为width:100%
 * 4.去掉<br/>标签
 * 5.向p标签中添加style="text-indent: 2em;margin: 10rpx 0;"
 * @param html
 * @returns {void|string|*}
 */
function formatRichText(html) {
    let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
        match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
        return match;
    });
    newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
        match = match.replace(/[^;]+;/gi, 'width:100%;').replace(/[^;]+;/gi, 'width:100%;');
        return match;
    });
    newContent = newContent.replace(/<br[^>]*\/>/gi, '');
    newContent = newContent.replace(/<img/gi, '<img style="width:100%;height:auto;display:block;margin:10px 0;"');
    newContent = newContent.replace(/<p>/gi, '<p style="text-indent: 2em;margin: 10rpx 0;">')
    return newContent;
}


const linfengTools = {
    // 获取导航参数
    getData: myToolGetQueryVariable,
    // 动画
    animat: {
        // 浮出彩色文字
        text: myToolUseTheText,
    },
    // 日期工具
    date: {
        // 简易格式化日期
        fd: myToolFormatDateDefault,
        // 自定义格式化日期
        format: myToolFormatDate,
    },
    // 色值转换
    color: {
        // rgb转十六进制
        toHex: myToolColorChange.rgbToHex,
        // 十六进制转rgb
        toRgb: myToolColorChange.hexToRgb,
    },
    // 背景图
    bgi: mtlfBgi,
    // 浏览器标题(title)文本切换
    titleText: myToolTitleText,
    // 设备检测
    equipment: {
        // PC检测
        pc: myToolIfMobile,
        // 移动检测并跳转
        mobile: myToolIfGoMobile,
    },
    // 判断是否为空
    ifNull,
    // 微信小程序富文本格式化工具
    richTextFormat: formatRichText,
    // 请求
    ajax: myToolAjax,
}