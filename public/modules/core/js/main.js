(function() {
    var y = YUYUN;
    var bokeApp = YUYUN.yuyun.bokeApp();
    var index = function() {
        this.init.call(this);
    }
    index.prototype = {
        init: function() {
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
            this.stimer = null;
            this.atimer = null;
            //导航条
            this.navparent = y.dom.query('.nav-navigation');
            this.nav = y.dom.querys('.nav-navigation > li');
            this.navview = y.dom.query('.view-active');

            var _proto = this;
            //绑定滚动
            y.even.bindListenerEven(window, 'scroll', function() {
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
            y.even.bindListenerEven(navparent, 'mouseover', function(event) {
                var even = event || window.event;
                if (even.target.tagName.toLowerCase() === 'li') {
                    _proto.setanimate(even.target, 'over');
                }
            });
            y.even.bindListenerEven(navparent, 'mouseout', function(event) {
                var even = event || window.event;
                if (even.target.tagName.toLowerCase() === 'li') {
                    _proto.setanimate(even.target, 'out');
                }
            });
            y.even.bindListenerEven(navparent, 'click', function(event) {
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
        _getScrollTop: function() {
            return y.dom.getPosition.scrollTop();
        },
        //初始化浏览器滚动条
        scrollInit: function() {
            var pageY = this._getScrollTop(),
                bg1 = this.bg1,
                bg2 = this.bg2,
                a = (this.saveScroll.prevscroll - pageY) / 10,
                b = (pageY - this.saveScroll.prevscroll) / 100,
                num = 0;

            this.saveScroll.prevscroll = pageY;
            clearInterval(this.stimer);
            this.timer = setInterval(function() {
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
        setanimate: function(target, type) {
            clearInterval(this.atimer);
            var active = y.dom.query('.active'),
                navspan = y.dom.query('.nav-span');
            this.atimer = setInterval(function() {
                var activetop = active.offsetTop,
                    navspantop = navspan.offsetTop,
                    targettop = target.offsetTop;
                if (type == 'over') {
                    var top = targettop - navspantop;
                    if (top == 0) {
                        clearInterval(this.atimer);
                    }
                } else {
                    var top = activetop - navspantop;
                    if (navspantop == activetop || top == 0) {
                        clearInterval(this.atimer);
                    }
                }

                top = top < 0 ? -Math.ceil(Math.abs(top / 10)) : Math.ceil(top / 10);

                y.dom.setCss(navspan, {
                    'top': navspan.offsetTop + top
                });
            }, 10);
        },
        aliHeightInit: function() {
            var that = this;
            return function() {
                y.dom.setCss(that.navspan, {
                    'height': that.activeli.offsetHeight
                });
            }();
        }
    }


    y.even.bindListenerEven(window, 'load', function() {

        var newindex = new index();

        //初始化浏览器滚动条
        newindex.scrollInit();
        //初始化活动标签span
        newindex.aliHeightInit();

    })

    bokeApp.controller('section', ['$scope', function($scope) {
        $scope.initload = function() {
            var navview = y.dom.query('.view-active'),
                sectionname = navview.getAttribute('section-name'),
                viewlist = y.dom.querys('.nav-navigation li'),
                navspan = y.dom.query('.nav-span');

            for (var i = 0; i < viewlist.length; i++) {
                viewlist[i].className = viewlist[i].getAttribute('section-name') == sectionname ? 'active' : '';
            }
            var liactive = y.dom.query('.nav-navigation li.active');
            y.dom.setCss(navspan, {
                'top': liactive.offsetTop
            });
            navview.style.display = 'block';
        }
    }]);
}())