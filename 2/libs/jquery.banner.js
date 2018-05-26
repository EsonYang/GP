;
(function() {
    $.fn.BannerPlugin = function(options) {
        var defaults = { //默认值  
            sliderMain: ".slider_main", //获取li的长度  
            sliderNav: ".slider_nav li",
            prev: "#pre",
            next: "#next",
            playAuto: true //是否支持自动播放  
        };
        var settings = $.extend({}, defaults, options);
        this.each(function(index, el) {
            len = $(settings.sliderMain).find("li").length,
                index = 0,
                Interval = null, //设置定时器  
                sliderWidth = this.find("li img").width(),
                slilerprev = this.find(settings.prev),
                slilernext = this.find(settings.next);
            console.log("len:" + len);

            function eleNext(index) {
                //根据index值计算ul元素的left值  
                var nowLeft = -index * sliderWidth;
                $(settings.sliderMain).css({ "width": len * sliderWidth + "px" });
                $(settings.sliderMain).stop(true, false).animate({ "left": nowLeft }); //图片移动   
            }

            //上一页  
            function sliderPrev() {
                index--;
                if (index < 0) {
                    index = len - 1;
                }
                eleNext(index)
            }
            //下一页  
            function sliderNext() {
                index++;
                if (index > len - 1) {
                    index = 0;
                }
                eleNext(index)
            }
            if (settings.prev || settings.next) {
                slilerprev.add(slilernext).click(function(event) {
                    clearInterval(Interval);
                    $(this).is(slilernext) ? sliderNext() : sliderPrev();
                });
            }
            //设置定时器  
            function playAuto() {
                Interval = setInterval(function() {
                    index++;
                    if (index > len - 1) {
                        index = 0;
                    }
                    eleNext(index)
                }, 3000);
            }
            if (settings.playAuto == true) {
                playAuto();
            }
        }.bind(this));
        //返回  
        return this;
    }
})(jQuery);