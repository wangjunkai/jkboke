(function () {
    var y = YUYUN;
    //
    y.yuyun.index = function () {
        //this._initFun.call(this);
    };
    y.yuyun.index.prototype = {
        init: function () {
            //页面右侧图片
            this.bg1 = y.dom.query('.bg-1');
            this.bg2 = y.dom.query('.bg-2');
            //导航活动标签
            this.activeli = y.dom.query('.nav-navigation .active');
            this.navspan = y.dom.query('.nav-span');
            //记录上一次滚动类型
            this.saveScroll = {
                'prevScroll': 0
            };
            //计时器
            //this.stimer = null;
            //this.atimer = null;
            //this.sectiontimer = null;
            //导航条
            this.navparent = y.dom.query('.nav-navigation');
            this.nav = y.dom.querys('.nav-navigation > li');
            this.navview = y.dom.query('.view-active');
            //右侧tag标签
            this.tags = y.dom.querys('.tag-detail > a');

        },
        _initFun: function () {
            //初始化变量
            this.init();
            //初始化浏览器滚动条
            //this.scrollInit();
            //初始化活动标签span
            this.aliHeightInit();

            var _proto = this;
            //绑定滚动
            y.even.bindListenerEven(window, 'scroll', function () {
                var header = y.dom.query('.header'),
                    parentnode = header.parentNode,
                    init = y.dom.query('.header-init'),
                    scroll = y.dom.query('.header-scroll'),
                    search = y.dom.query('.header-search'),
                    scrolltop = _proto._getScrollTop();
                var id, sd, mt, hc;

                //_proto.scrollInit();

                scrolltop > 75 ? (id = 'none', sd = 'block', mt = '-14', hc = 'header h35') : (id = 'block', sd = 'none', mt = '0', hc = 'header h75');
                y.dom.setCss(init, {
                    'display': id
                });
                y.dom.setCss(scroll, {
                    'display': sd
                });
                y.dom.setCss(search, {
                    'marginTop': mt
                });
                header.className = hc;
            });
            //委托绑定导航
            var navparent = document.querySelector('.nav-navigation');
            y.even.bindListenerEven(navparent, 'mouseover', function (event) {
                var even = event || window.event;
                if (even.target.tagName.toLowerCase() === 'li') {
                    _proto.setAnimate(even.target, 'over');
                }
            });
            y.even.bindListenerEven(navparent, 'mouseout', function (event) {
                var even = event || window.event;
                if (even.target.tagName.toLowerCase() === 'li') {
                    _proto.setAnimate(even.target, 'out');
                }
            });
            y.even.bindListenerEven(navparent, 'click', function (event) {
                var even = event || window.event;
                if (even.target.tagName.toLowerCase() === 'li') {
                    for (var j = 0; j < _proto.nav.length; j++) {
                        _proto.nav[j].className = '';
                    }
                    even.target.className = 'active';

                }
            });
            //ag 绑定注册事件

        },
        //返回滚动条高度
        _getScrollTop: function () {
            return y.dom.getPosition.scrollTop();
        },
        //初始化浏览器滚动条
        scrollInit: function () {
            var _this = this;
            var pageY = _this._getScrollTop(),
                bg1 = _this.bg1,
                bg2 = _this.bg2,
                a = (_this.saveScroll.prevscroll - pageY) / 10,
                b = (pageY - _this.saveScroll.prevscroll) / 100,
                num = 0;

            _this.saveScroll.prevscroll = pageY;
            clearInterval(_this.stimer);
            _this.timer = setInterval(function () {
                    var bg1y = bg1.style.backgroundPositionY == '' ? 0 : parseFloat(bg1.style.backgroundPositionY.slice(0, bg1.style.backgroundPositionY.indexOf('p'))),
                        bg2y = bg2.style.backgroundPositionY == '' ? 450 : parseFloat(bg2.style.backgroundPositionY.slice(0, bg2.style.backgroundPositionY.indexOf('p'))),
                        m = a < 0 ? -Math.ceil(Math.abs(a / 5)) : Math.ceil(a / 5),
                        n = b < 0 ? -Math.ceil(Math.abs(b / 5)) : Math.ceil(b / 5);
                    num = Math.abs(m) + num;
                    num >= Math.abs(a) ? clearInterval(_this.stimer) : '';
                    y.dom.setCss(bg1, {
                        'backgroundPositionY': bg1y + n
                    });
                    y.dom.setCss(bg2, {
                        'backgroundPositionY': bg2y + m
                    });
                },
                50);
        },
        //导航动画
        setAnimate: function (target, type) {
            var _this = this;
            clearInterval(_this.atimer);
            var active = y.dom.query('.active'),
                navspan = y.dom.query('.nav-span');
            _this.atimer = setInterval(function () {
                var activetop = active.offsetTop,
                    navspantop = navspan.offsetTop,
                    targettop = target.offsetTop;
                if (type == 'over') {
                    var top = targettop - navspantop;
                    if (top == 0) {
                        clearInterval(_this.atimer);
                    }
                } else {
                    var top = activetop - navspantop;
                    if (navspantop == activetop || top == 0) {
                        clearInterval(_this.atimer);
                    }
                }

                top = top < 0 ? -Math.ceil(Math.abs(top / 10)) : Math.ceil(top / 10);

                y.dom.setCss(navspan, {
                    'top': navspan.offsetTop + top
                });
            }, 10);
        },
        aliHeightInit: function () {
            var _this = this;
            return function () {
                y.dom.setCss(_this.navspan, {
                    'height': _this.activeli.offsetHeight
                });
            }();
        },
        bdShare: function () {

            window._bd_share_config = {
                share: [{
                    "tag": 'detail_share',
                    "bdSize": 16,
                    "bdCustomStyle": '/modules/boke/css/share.css'
                }]
            };
            var content = document.getElementsByTagName('head')[0] || body;
            var script = content.appendChild(document.createElement('script'));
            script.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5);
        },
        //section初始化
        sectionAnimate: function () {
            var _this = this;
            var sectionname = y.dom.query('.view-active').getAttribute('section-name');
            for (var i = 0; i < _this.nav.length; i++) {
                _this.nav[i].className = _this.nav[i].getAttribute('section-name') == sectionname ? 'active' : '';
            }
            _this.init.call(_this);
            y.dom.setPosition.scollTop(0);
            y.dom.setCss(_this.navspan, {
                'top': _this.activeli.offsetTop
            });
            y.dom.setCss(_this.navview, {
                'left': _this.navview.offsetWidth,
                'visibility': 'visible'
            });
            clearInterval(_this.sectiontimer);
            _this.sectiontimer = self.setInterval(_this._setLeft.bind(_this), 20);
        },
        _setLeft: function () {
            var _this = this;
            var navview = _this.navview.offsetLeft - 10;
            if (navview <= 0) {
                _this.navview.style.left = 0 + 'px';
                clearInterval(_this.sectiontimer);
            }
            else {
                y.dom.setCss(_this.navview, {
                    'left': navview - Math.ceil(navview / 4)
                });
            }
        },
        setTags: function () {

        }
    };


    //螺旋标签
    y.yuyun.tags = function () {
        this.init.apply(this, arguments);
    }

    y.yuyun.tags.prototype = {
        init: function () {
            this.main = y.dom.query('.tag-detail');
            this.list = y.dom.querys('.tag-detail > a');
            this.llength = this.list.length;
            this.mainw = this.main.offsetWidth / 2 - 40;
            this.mainh = this.main.offsetHeight / 2 - 20;
            this.r = this.mainw / 2 + 50;
            this.tags = [];
            this.doimage();
            this.dostart();

            var _this = this;
            y.even.bindListenerEven(this.main, 'mouseover', function (event) {
                var even = event || window.event;
                _this.nostart();
                if (even.target.tagName.toLowerCase() === 'a') {
                    even.target.style.borderBottom = '1px solid ' + even.target.style.color;
                }
            });
            y.even.bindListenerEven(this.main, 'mouseout', function (event) {
                var even = event || window.event;
                _this.dostart();
                if (even.target.tagName.toLowerCase() === 'a') {
                    even.target.style.borderBottom = '0px';
                }
            });
        },
        doimage: function () {
            for (var i = 0; i < this.llength; i++) {
                var k = 2 * i / (this.llength - 1) - 1;//-1~1
                var a = Math.acos(k);//a(0~π) 弧度
                var b = a * Math.sqrt(this.llength * Math.PI);//b(0~2π)
                var z = this.r * Math.sin(a) * Math.cos(b);
                var x = this.r * Math.sin(a) * Math.sin(b);
                var y = this.r * Math.cos(a);
                var obj = {
                    ele: this.list[i],
                    left: x,
                    top: y,
                    zIndex: z,
                    color: "rgb(" + parseInt((Math.random()) * 150) + "," + parseInt((Math.random()) * 150) + "," + parseInt((Math.random()) * 150) + ")"
                };
                this.tags.push(obj);
            }
            this.domove();
        },
        domove: function () {
            var _this = this;
            for (var i = 0; i < _this.tags.length; i++) {
                var alpha = (_this.tags[i].zIndex + _this.r) / (2 * _this.r);
                _this.tags[i].ele.style.color = _this.tags[i].color;
                _this.tags[i].ele.style.opacity = 1.2 - (alpha);
                _this.tags[i].ele.style.filter = "alpha(opacity = " + (1.2 - (alpha)) * 100 + ")";
                _this.tags[i].ele.style.zIndex = parseInt(1000 + _this.tags[i].zIndex);
                _this.tags[i].ele.style.left = _this.tags[i].left + _this.mainw + "px";
                _this.tags[i].ele.style.top = _this.tags[i].top + _this.mainh + "px";
            }
        },
        dostart: function () {
            var _this = this;
            var rad = 0.0016;
            var maxrad = 6.28;
            this.stime = setInterval(function () {
                for (var i = 0; i < _this.tags.length; i++) {
                    var z = _this.tags[i].zIndex;
                    var x = _this.tags[i].left;
                    var y = _this.tags[i].top;
                    _this.tags[i].zIndex = z * Math.cos(rad) - x * Math.sin(rad);
                    _this.tags[i].left = z * Math.sin(rad) + x * Math.cos(rad);
                    _this.tags[i].top = y;
                }

                _this.domove();
            }, 5);

        },
        nostart: function () {
            clearInterval(this.stime);
        }
    };
    //初始化
    angular.element(document).ready(function () {
        //手动创建angular模块
        angular.bootstrap(document, ['bokeApp']);
        new y.yuyun.tags();
        y.yuyun.bokeinit();

    });

}());
