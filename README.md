<h1 style='text-align:center;color:red;'>林风工具使用指南</h1>



# 前言

本工具整合了一些常用的功能，分别有linfengTools.js和linfengTools.css组成，大部分功能可以只用linfengTools.js来实现，但是仍有少部分功能需要linfengTools.css来结合完成。

> 注意：
>
> 在css中，已经对元素进行了格式化（清除内外边距、去除外边框线、清除浮动等）
>
> 若不需要可在linfengTools.css中进行修改





# 目录

- [基础工具](#base)
  - [类型判断](#judgedatatype)
  - [空值判断](#judgenullvalue)
  - [日期格式化](#dateformat)
- [动画](#animation)
  - [文字上浮并消失](#floattext)







# <span id="base">基础工具</span>

工具集合中有多个常用的工具，一般都是对数据的处理、类型的判断等



## <span id="judgedatatype">类型判断</span>

该功能用于对数据类型的判断，即传递一个参数后以字符串形式返回该参数的数据类型

**传递参数：**

| 参数  | 详解                                |
| ----- | ----------------------------------- |
| param | 【必填】<any>需要判断数据类型的数据 |

**返回结果：**

以string形式返回判断结果

| 传递参数                          | 返回结果    |
| --------------------------------- | ----------- |
| `123` 或 `new Number(123)`        | *Number*    |
| `'abcdef'` 或 `new String("asd")` | *String*    |
| `true` 或 `false`                 | *Boolean*   |
| `[1, 2, 3, 4]`                    | *Array*     |
| `{name:'wenzi', age:25}`          | *Object*    |
| `function(){}`                    | *Function*  |
| `undefined`                       | *Undefined* |
| `null`                            | *Null*      |
| `new Date()`                      | *Date*      |
| `/^[a-zA-Z]{5,20}$/`              | *RegExp*    |
| `new Error()`                     | *Error*     |

**使用方法：**

格式：`linfeng.type(param)`

例子：

```js
const result = linfeng.type("asd")// String
```



## <span id="judgenullvalue">空值判断</span>

本功能可以用来判断参数是否为空，若是空值则返回true，否则返回false

**参数传递：**

| 参数  | 详解                                     |
| ----- | ---------------------------------------- |
| param | 【必填】<any\>需要判断的值               |
| space | 【选填】<Boolean\>是否去除空格，默认去除 |

**返回结果：**

返回结果会根据你传递的参数类型不同，返回结果也会不同，具体如下

| 参数数据类型          | 返回结果                                                  |
| --------------------- | --------------------------------------------------------- |
| `undefined` 或 `null` | true                                                      |
| `String`              | 空值返回true<br />非空值返回false<br />可调整是否去除空格 |
| `Number`              | 0返回true，非0返回false                                   |
| `Array`               | 空数组返回true<br />非空数组返回false                     |
| `Object`              | 空对象返回true<br />非空对象返回false                     |
| `Date`                | 计算机默认起始日期返回true<br />其余日期返回false         |
| 其它数据类型          | 抛出异常Error                                             |

**使用方法：**

格式：`linfeng.null(param, space)`

例子：

```js
const result = linfeng.null("asd")// false
```



## <span id="dateformat">日期格式化</span>

该工具用来指定格式，格式化日期。

**传递参数：**

| 参数 | 详解                                                         |
| ---- | ------------------------------------------------------------ |
| date | 【选填】<Date\>Date对象，不填则用当前时间                    |
| fmt  | 【选填】<String\>格式化的格式，具体格式化字符如下：<br />`Y`：年、`M`：月、`D`：日、`h`：时、`m`：分、`s`：秒、`w`：周(数字1~7)、`W`：周(汉字一~天)<br />默认格式为：`"YYYY-MM-DD hh:mm:ss"` |
| week | 【选填】<Boolean\>汉字周7返回值<br />true则返回**天**，false则返回**日**<br />默认true |

**返回结果：**

一般情况下返回String的格式化后的日期，若传递的参数不为Date类型，则会抛出异常

**使用方法：**

格式：`linfeng.date(date, fmt, week)`

例子：

```js
const result = linfeng.date(new Date("2066/6/6"))// 2066-06-06 00:00:00
```







# cookie操作



## 添加cookie

改方法可以添加指定cookie，化简了cookie的使用

**参数传递**

| 参数  | 详情                       |
| ----- | -------------------------- |
| name  | 键                         |
| value | 值                         |
| time  | 时间 单位分钟 默认值30分钟 |

**返回结果**

无返回值

**使用方法**

格式：`linfeng.cookie.set(name, value, time)`

例子：

```js
linfeng.cookie.set("cookie", "publciwkdkdsajukh", 10)
```



## 获取cookie

**参数传递**

| 参数  | 详解         |
| ----- | ------------ |
| value | 需要查询的键 |

**返回结果**

若查询到cookie则会返回false

若没有查到cookie则会返回空的字符串

**使用方法**

格式：`linfeng.cookie.get()`

例子：

```js
const res = linfeng.cookie.get("cookie")
```



## 删除cookie

**参数传递**

| 参数 | 详解                 |
| ---- | -------------------- |
| name | 需要删除的cookie的键 |

**返回结果**

无返回值

**使用方法**

格式：`linfeng.cookie.del()`

例子：

```js
linfeng.cookie.del("cookie")
```







# <span id="animation">动画</span>

注意：动画大部分功能需要用到linfengTools.css来配合，否则很多动画无法实现效果



## <span id="floattext">文字上浮消失动画</span>

羡慕别人博客拥有一些炫酷的单击出现漂浮文字特效吗？来，往这边看来，这个功能可以让你拥有同样的效果

> 注意：该功能需要结合linfengTools.css工具，否则没有动态效果

**传递参数：**

| 参数    | 详解                                                 |
| ------- | ---------------------------------------------------- |
| textArr | 【选填】<Array\>传入数组，数组元素支持Number和String |

**返回结果：**

无返回值

**效果：**

将数组内的元素以点击的方式触发轮流显示

**使用方法：**

格式：`linfeng.animat.floatText(textArr)`

例子：

```js
linfeng.animat.floatText()
```

