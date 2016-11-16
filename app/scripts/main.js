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

            this.initAutocomplete();
            this.initShowMenuMobile();
            this.initShowSearchMobile();
            /*this.initModalCreateEvent();*/
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
        },

        initModalCreateEvent: function() {
            $.magnificPopup.open({
                items: {
                    src: '#modal--create-event'
                },
                type: 'inline',
                removalDelay: 500, // Delay removal by X to allow out-animation
                callbacks: {
                    beforeOpen: function() {
                        this.st.mainClass = 'mfp-zoom-out';
                    }
                },
                midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
            });

            $('#modal--create-event').find('.close').off('click').on('click', function(e) {
                e.preventDefault();

                var magnificPopup = $.magnificPopup.instance;
                magnificPopup.close(); // Close popup that is currently opened
            });
        },

        initAutocomplete: function () {
            var autocompleteContent = $('.autocomplete');

            $('#txt-search').click(function () {
                autocompleteContent.show().css({
                    'top': $(this).offset().top + $(this).outerHeight() + 5,
                    'left': $(this).offset().left,
                    'width': $(this).outerWidth()
                });
            });
        }
    };
})(jQuery);

$(document).ready(function() {
    yahStar.Global.init();
});
