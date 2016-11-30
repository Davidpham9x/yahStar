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

            this.initFormElements();
            this.initAutocomplete();
            this.initShowMenuMobile();
            this.initShowSearchMobile();

            if ( $('.page--home').length ) {
                yahStar.Global.initModalCreateEvent();
            }

            if ( $('.page--video').length ) {
                yahStar.Global.initModalYoutube();
            }

            $(document.body).click(function(e) {
                if ( $(e.target).hasClass('txt-search') ) {
                    return;
                } else {
                    $('.autocomplete').hide();
                }
            });

            $('#link-view-all').click(function (e) {
                e.preventDefault();

                $('.full-info').slideToggle('normal');
            });
        },

        initFormElements: function() {
            $('.radio-wrapper .input-radio').each(function() {
                if ($(this).is(':checked')) {
                    $('.input-radio[name="' + $(this).attr('name') + '"]').parents('.radio-selected').removeClass('radio-selected');
                    $(this).parents('.radio-wrapper').addClass('radio-selected');
                }
            });

            $(document).on('change', '.radio-wrapper .input-radio', function() {
                $('input[name="' + $(this).attr('name') + '"]').each(function() {
                    if ($(this).not(':checked')) {
                        $(this).parent().removeClass('radio-selected');
                    }
                });

                if ($(this).is(':checked')) {
                    $(this).parents('.radio-wrapper').addClass('radio-selected');
                }
            });

            //Checkbox Wrapper
            $('.checkbox-wrapper .input-checkbox').each(function() {
                if ($(this).is(':checked')) {
                    $(this).parents('.checkbox-wrapper').addClass('checked');
                }
            });

            $(document).on('click', '.checkbox-wrapper .input-checkbox', function() {
                if ($(this).is(':checked')) {
                    $(this).parents('.checkbox-wrapper').addClass('checked');
                } else if ($(this).not(':checked')) {
                    $(this).parents('.checkbox-wrapper').removeClass('checked');
                }
            });

            //Select Wrapper
            $('.select-wrapper').each(function() {
                if ($(this).find('span').length <= 0) {
                    $(this).prepend('<span>' + $(this).find('select option:selected').text() + '</span>');
                }
            });

            $(document).on('change', '.select-wrapper select', function() {
                $(this).prev('span').replaceWith('<span>' + $(this).find('option:selected').text() + '</span>');
            });
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

        initModalYoutube: function() {
            $.magnificPopup.open({
                items: {
                    src: '#modal--youtube'
                },
                type: 'inline',
                removalDelay: 500, // Delay removal by X to allow out-animation
                callbacks: {
                    beforeOpen: function() {
                        this.st.mainClass = 'mfp-zoom-out';
                    },
                    open: function () {
                        new Foundation.Equalizer( $('.trending__row') ).applyHeight();
                        new Foundation.Equalizer( $('#modal__row-youtube') ).applyHeight();

                        $('#youtube-tabs').on('change.zf.tabs', function() {
                            new Foundation.Equalizer( $('#modal__row-youtube') ).applyHeight();
                        });
                    }
                },
                midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
            });

            $('#modal--youtube').find('.close').off('click').on('click', function(e) {
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
