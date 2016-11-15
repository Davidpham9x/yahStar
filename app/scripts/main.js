'use strict';

var isMobile = {
    isAndroid: function() {
        return navigator.userAgent.match(/Android/i);
    },
    isBlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    isiOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    isOpera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    isWindows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.isAndroid() || isMobile.isBlackBerry() || isMobile.isiOS() || isMobile.isOpera() || isMobile.isWindows());
    }
};

var IE = (!!window.ActiveXObject && +(/msie\s(\d+)/i.exec(navigator.userAgent)[1])) || NaN;

var yahStar = window.yahStar || {}; //global namespace for YOUR yahStar, Please change yahStar to your yahStar name

(function($) {
    yahStar.Global = {
        init: function() { //initialization code goes here
            $.support.cors = true;

            this.initShowMenuMobile();
            this.initShowSearchMobile();
        },

        initShowMenuMobile: function() {
            var aTag = $('.icon-menu-bar'),
                menuContent = $('.main-menu');

            aTag.off('click').on('click', function(e) {
                e.preventDefault();

                $(this).toggleClass('active');
                menuContent.slideToggle('normal');
            });
        },

        initShowSearchMobile: function() {
            var aTag = $('.search--mobile'),
                menuContent = $('.from--search');

            aTag.off('click').on('click', function(e) {
                e.preventDefault();

                $(this).toggleClass('active');
                menuContent.slideToggle('normal');
            });
        }
    };
})(jQuery);

$(document).ready(function() {
    yahStar.Global.init();
});
