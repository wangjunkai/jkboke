/**
 * Created by wangjunkai
 */

window.YUYUN = {};
YUYUN.dom = (function() {
    var sTimer = null,
        iTimer = null;

    return {
        //封装浏览器高级选择器,兼容ie8+以及各大浏览器
        querys: function(selecter) {
            if (arguments.length > 1) {
                return arguments[0].querySelectorAll(selecter);
            } else {
                if (typeof selecter !== 'string') {
                    return false;
                } else {
                    return document.querySelectorAll(arguments[0]);
                }
            }
        },
        query: function(selecter) {
            if (arguments.length > 1) {
                return arguments[0].querySelector(selecter);
            } else {
                if (typeof selecter !== 'string') {
                    return false;
                } else {
                    return document.querySelector(arguments[0]);
                }
            }
        },
        //通过dom id获取该元素
        getDomById: function(selecter) {
            return document.getElementById(/[^#].*/.exec(selecter)[0]);
        },
        //通过dom class获取该元素
        getDomByClass: function(selecter) {
            return document.getElementsByClassName(/[^.].*/.exec(selecter)[0]);
        },
        //删除所选元素的指定class,返回替换后的class
        removeClass: function(target, selecter) {
            var newStr = target.className;
            var find = new RegExp("\\s+\\b" + selecter + "\\b");
            if (newStr.match(find)) {
                //替换为空
                newStr = newStr.replace(find, "");
            }
            return newStr;
        },
        //创建指定dom元素,并循环复制属性
        createDom: function(target, obj) {
            var dom = document.createElement(target);
            for (var o in obj) {
                dom[o] = obj[o];
            }
            return dom;
        },
        //删除指定dom元素
        deleteDom: function(selecter) {
            var dom = typeof selecter === 'string' ? Ele.queryDom(document, selecter) : selecter;
            dom.parentNode.removeChild(dom);
        },
        //设置元素style样式
        setCss: function(target, obj) {
            for (var o in obj) {
                switch (o) {
                    case 'left':
                        target.style[o] = obj[o] + 'px';
                        break;
                    case 'top':
                        target.style[o] = obj[o] + 'px';
                        break;
                    case 'right':
                        target.style[o] = obj[o] + 'px';
                        break;
                    case 'bottom':
                        target.style[o] = obj[o] + 'px';
                        break;
                    case 'backgroundPositionY':
                        target.style[o] = obj[o] + 'px';
                        break;
                    case 'marginTop':
                        target.style[o] = obj[o] + 'px';
                        break;
                    case 'opacity':
                        //兼容ie8+滤镜
                        target.style.opacity = obj[o];
                        target.style.filter = 'Alpha(opacity=' + obj[o] * 100 + ')';
                        break;
                    default:
                        target.style[o] = obj[o];
                        break;
                }
            }

            return this;
        },
        //计算宽度和距离
        getPosition: {
            //获取距离浏览器文档左边的距离,兼容ie,display:table
            left: function(target) {
                var left = 0;
                while (target != null) {
                    left += target.offsetLeft;
                    target = target.offsetParent;
                }
                return left;
            },
            //获取距离浏览器文档上边的距离
            top: function(target) {
                var top = 0;
                while (target != null) {
                    top += target.offsetTop;
                    target = target.offsetParent;
                }
                return top;
            },
            //获取元素包括边宽的宽度
            width: function(target) {
                return target.offsetWidth;
            },
            //获取元素包括边宽的高度
            height: function(target) {
                return target.offsetHeight;
            },
            //获取元素包括滚动条的宽度
            bodyWidth: function() {
                return document.body.offsetWidth;
            },
            //获取元素包括滚动条的高度
            bodyHeight: function() {
                return document.body.offsetHeight;
            },
            //滚动条的滚动的高度 兼容
            scrollTop: function() {
                var top = 0;
                if (window.pageYOffset) {
                    top = window.pageYOffset;
                } else if (document.compatMode == 'CSS1Compat') {
                    top = document.documentElement.scrollTop;
                } else {
                    top = document.body.scrollTop;
                }
                return top;
            }
        },
        //设置文档滚动条的位置,兼容ie
        setPosition: {
            scollTop: function(top) {
                document.documentElement.scrollTop = top;
                document.body.scrollTop = top;
            }
        },
    }
}())

YUYUN.even = (function() {
    return {

        //通用注册事件,兼容ie5+ 以及各大浏览器
        bindListenerEven: function(target, type, handler) {
            if (target.addEventListener) {
                target.addEventListener(type, handler, 'false');
            } else {
                target.attachEvent('on' + type, handler);
            }
        }
    }
}())

YUYUN.fun = (function() {
    return {

        //card标签渐变动画 type（out:鼠标移出）
        setAnimate: function(target, type) {
            var num = 0;
            var that = this;
            if (type == 'out') {
                //清除计时器
                clearTimeout(Ele.stimer);
                clearInterval(Ele.itimer);
                that.setCss(target, {
                    'opacity': 0
                });
                that.setCss(target, {
                    'visibility': 'hidden'
                });
            } else {
                function repeat() {
                    //每隔30毫秒渐变
                    Ele.itimer = setInterval(function() {
                        num = num + 0.2;
                        if (num > 1) {
                            num = 1;
                        }
                        that.setCss(target, {
                            'opacity': num
                        });
                        if (num == 1) {
                            clearInterval(Ele.itimer);
                        }
                    }, 30);
                }

                Ele.stimer = setTimeout(repeat, 500);
            }
        },
        clone: function(obj) {
            var o = '';
            if (obj != null && typeof obj === 'object') {
                if (obj instanceof Array) {
                    o = [];
                    for (var i = 0; i < obj.length; i++) {
                        o[i] = arguments.callee(obj[i]);
                    }
                } else {
                    o = {};
                    for (var a in obj) {
                        o[a] = arguments.callee(obj[a]);
                    }
                }
            } else {
                o = obj;
            }
            return o;
        },
        clonetwo: function(obj) {
            var o, i, j;
            //函数typeof 为function
            if (obj != null && !(obj instanceof RegExp) && !(obj instanceof Date) && typeof obj === 'object') {
                if (obj instanceof Array) {
                    o = [];
                    for (i = 0; i < obj.length; i++) {
                        o[i] = arguments.callee(obj[i]);
                    }
                } else {
                    o = {};
                    for (j in obj) {
                        o[j] = arguments.callee(obj[j]);
                    }
                }
            } else {
                o = obj;
            }
            return o;
        },
        clonefor: function(parent, child) {
            child = child || {};
            for (var i in parent) {
                if (parent.hasOwnProperty(i)) {
                    if (typeof parent[i] === 'object' && parent[i] != null && !(parent[i] instanceof RegExp) && !(parent[i] instanceof Date)) {
                        child[i] = parent[i] instanceof Array ? [] : {};
                        arguments.callee(parent[i], child[i]);
                    } else {
                        child[i] = parent[i];
                    }
                }
            }
            return child;
        },
        //ES5
        clonetre: function(obj) {
            var o;
            o = JSON.stringify(obj);
            return JSON.parse(o);
        },
        //获取对象类别
        classtype: function(obj) {
            if (obj === null) return 'null';
            if (obj === undefined) return 'undefined';
            return Object.prototype.toString.call(obj).slice(8, -1);
        },
        //通过原型继承创建一个对象
        inherit: function(obj) {
            var type = typeof obj;
            if (type != 'object' || type == 'function' || obj == null) return null;

            if (Object.create) {
                return Object.create(obj);
            }

            function Fun() {}

            Fun.prototype = obj;
            return new Fun();

        },
        extend: function(prototype, methed) {
            for (var p in methed) {
                prototype[p] = methed[p];
            }
        },
        //nextSibling
        //previousSibling
        //firstChild
        //lastChild
        //childNodes
        //nodeValue
        //nodeName
        //nodeType

        //parentNode
        //appendChild
        //insertBefore
        //replaceChild
        //removeChild
        traverse: function(target) {
            var array = [];
            var childs = target.childNodes;
            var len = childs.length;
            for (var i = 0; i < len; i++) {
                array = Array.prototype.concat(array, arguments.callee(childs[i]));
            }
            return array;
        },
        //去除array相同的项
        arrayDiffer: function(a, b) {
            var ary = [];
            var i, j;
            ary = ary.concat(a, b);
            for (i = 0; i < ary.length; i++) {
                j = ary.lastIndexOf(ary[i], -1);
                if (ary.indexOf(ary[i], 0) !== j) {
                    ary.splice(j, 1);
                    i = 0;
                }
            }
            return ary;
        },
        //向后插入元素
        insertAfter: function(obj, newcreat) {
            var parent = obj.parentNode;
            if (parent.lastChild != obj) {
                parent.insertBefore(newcreat, obj.nextSibling);
            } else {
                parent.appendChild(newcreat);
            }
        }
    }
}())

YUYUN.yuyun = (function() {
    var boke = angular.module('bokeApp', ['ui.router']);
    return {
        bokeApp: function() {
            return boke;
        }
    }
}())