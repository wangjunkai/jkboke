(function () {
    var y = YUYUN;
    var index = function () {
        //this._initFun.call(this);
    }
    index.prototype = {
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

        },
        _initFun: function () {
            //初始化变量
            this.init();
            //初始化浏览器滚动条
            this.scrollInit();
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

                _proto.scrollInit();

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
            var pageY = this._getScrollTop(),
                bg1 = this.bg1,
                bg2 = this.bg2,
                a = (this.saveScroll.prevscroll - pageY) / 10,
                b = (pageY - this.saveScroll.prevscroll) / 100,
                num = 0;

            this.saveScroll.prevscroll = pageY;
            clearInterval(this.stimer);
            this.timer = setInterval(function () {
                    var bg1y = bg1.style.backgroundPositionY == '' ? 0 : parseFloat(bg1.style.backgroundPositionY.slice(0, bg1.style.backgroundPositionY.indexOf('p'))),
                        bg2y = bg2.style.backgroundPositionY == '' ? 450 : parseFloat(bg2.style.backgroundPositionY.slice(0, bg2.style.backgroundPositionY.indexOf('p'))),
                        m = a < 0 ? -Math.ceil(Math.abs(a / 5)) : Math.ceil(a / 5),
                        n = b < 0 ? -Math.ceil(Math.abs(b / 5)) : Math.ceil(b / 5);
                    num = Math.abs(m) + num;
                    num >= Math.abs(a) ? clearInterval(this.stimer) : '';
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
            clearInterval(this.atimer);
            var active = y.dom.query('.active'),
                navspan = y.dom.query('.nav-span');
            var _this = this;
            this.atimer = setInterval(function () {
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
        }
    };

    //初始化
    y.even.bindListenerEven(window, 'load', function () {
        y.yuyun.index = new index();
        y.yuyun.index._initFun();
    })

}());
