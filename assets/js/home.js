var AIHELLOAUTOPILOT = AIHELLOAUTOPILOT || {};

(function($) {



    // USE STRICT
    "use strict";

    AIHELLOAUTOPILOT.initialize = {

        init: function() {
            AIHELLOAUTOPILOT.initialize.general();
            AIHELLOAUTOPILOT.initialize.tab();
            AIHELLOAUTOPILOT.initialize.sectionBackground();
            AIHELLOAUTOPILOT.initialize.sectionSwitch();
        
            AIHELLOAUTOPILOT.initialize.swiperSlider();

        },

        /*========================================================*/
        /*=           Collection of snippet and tweaks           =*/
        /*========================================================*/

        general: function() {

            //on item select
            $(".saaspik-dropdown li").on('click', function(e) {
                var $target = $(e.target);
                var $dropdown = $target.closest(".saaspik-dropdown");
                var $label = $dropdown.find("label");
                var $title = $label.find("span");
                var $toggle = $dropdown.find("input");

                if ($dropdown.hasClass("init") || ($toggle.is(":checked") && !$target.hasClass("selected"))) {
                    $dropdown.removeClass("init");
                    $dropdown.find("li.selected").removeClass("selected");
                    $target.addClass("selected");
                    $dropdown.attr("data-val", ($target.attr("data-val") || $target.attr("data-val") == "") ? $target.attr("data-val") : $target.text().trim());
                    $title.text($target.attr("data-text") ? $target.attr("data-text") : $target.text().trim());
                    $label.css("width", ($title.width() + 20) + "px");
                    $toggle.prop("checked", false);
                }
            });

            $('.saaspik-select').on('click', '.placeholder', function() {
                var parent = $(this).closest('.saaspik-select');
                if (!parent.hasClass('is-open')) {
                    parent.addClass('is-open');
                    $('.saaspik-select.is-open').not(parent).removeClass('is-open');
                } else {
                    parent.removeClass('is-open');
                }
            }).on('click', 'ul>li', function() {
                var parent = $(this).closest('.saaspik-select');
                parent.removeClass('is-open').find('.placeholder').text($(this).text());
            });

            //initialize with 1st option
            $(".lng-dropdown.init li:first-child").click();

            var wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: false,
                live: true,
                scrollContainer: null,
            });
            wow.init();

            /* Bootstrap Accordion  */
            $('.faq .card').each(function() {
                var $this = $(this);
                $this.on('click', function(e) {
                    var has = $this.hasClass('active');
                    $('.faq .card').removeClass('active');
                    if (has) {
                        $this.removeClass('active');
                    } else {
                        $this.addClass('active');
                    }
                });
            });

            /* Magnefic Popup */
            $('.popup-video').each(function() {
                $('.popup-video').magnificPopup({
                    type: 'iframe'
                });
            })


            /** Pricing Tabs */
            $('.pricing-tab-switcher, .tab-btn').on('click', function() {
                $('.pricing-tab-switcher, .tab-btn').toggleClass('active');
                $(".pricing-tab").toggleClass('seleceted');

                $('.pricing-amount').toggleClass('change-subs-duration');
                
                
            });

            

            if ($('.tabs-box').length) {
                $('.tabs-box .pricing-tab  .tab-btn').on('click', function(e) {
                    e.preventDefault();
                    var target = $($(this).attr('data-tab'));

                    if ($(target).is(':visible')) {
                        return false;
                    } else {
                        target.parents('.tabs-box').find('.pricing-tab ').find('.tab-btn').removeClass('active-btn');
                        $(this).addClass('active-btn');
                        target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
                        target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab animated fadeIn');
                        $(target).fadeIn(300);
                        $(target).addClass('active-tab animated fadeIn');
                    }
                });
            }

            // Show first content by default
            $('#pix-tabs-nav li:nth-child(1)').addClass('active');
            $('#pix-tabs-content .content').hide();
            $('#pix-tabs-content .content:nth-child(1)').show();

            // click function
            $('#pix-tabs-nav li').on('click', function() {
               // var $parent = $(this).parent();
               $(this).siblings().removeClass('active');
                //$('#pix-tabs-nav li').removeClass('active');
                $(this).addClass('active');
                // FIXME this is not correct!!
               $('#pix-tabs-content .content').hide();
// $(this).parent().siblings.children().hide();
                var activeTab = $(this).find('a').attr('href');
                $(activeTab).fadeIn(400);
                return false;
            });
           
          

  

            /*  Active Menu */
            $('.site-main-menu li a').each(function() {
                if ($(this).attr('href') == location.href.split("/").slice(-1)) {
                    $(this).addClass('current_page');
                }
            });



        },

        /*====================================*/
        /*=           Swiper Slider          =*/
        /*====================================*/

        swiperSlider: function() {
            $('.swiper-container').each(function() {
                var interleaveOffset = 0.5;

                var $this = $(this),
                    id = $(this).attr('id'),
                    perpage = $(this).data('perpage') || 1,
                    loop = $(this).data('loop') || true,
                    speed = $(this).data('speed') || 700,
                    autoplay = $(this).data('autoplay') || 5000,
                    slidegroup = $(this).data('slidegroup') || 1,
                    space = $(this).data('space') || 0,
                    effect = $(this).data('effect'),
                    direction = $(this).data('direction') || 'horizontal',
                    breakpoints = $(this).data('breakpoints');


                var swiper = new Swiper($this, {
                    slidesPerView: perpage,
                    spaceBetween: space,
                    slidesPerGroup: slidegroup,
                    loop: loop,
                    speed: speed,
                    effect: effect,
                    direction: direction,
                    breakpoints: breakpoints,
                    watchSlidesVisibility: true,
                    slideVisibleClass: 'swiper-slide-visible',
                    autoplay: {
                        delay: autoplay,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },

                });
            });

        },

  /*==============================*/
        /*=           TAB          =*/
        /*==============================*/
        tab: function() {
            $(".tab-nav-item > .acc-btn").on("click", function() {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    $(this)
                        .siblings(".content")
                        .slideUp(400);
                    $(".tab-nav-item > .acc-btn i")
                        .removeClass("fa-minus")
                        .addClass("fa-plus");
                } else {
                    $(".tab-nav-item > .acc-btn i")
                        .removeClass("fa-minus")
                        .addClass("fa-plus");
                    $(this)
                        .find("i")
                        .removeClass("fa-plus")
                        .addClass("fa-minus");
                    $(".tab-nav-item > .acc-btn").removeClass("active");
                    $(this).addClass("active");
                    $(".content").slideUp(400);
                    $(this)
                        .siblings(".content")
                        .slideDown(400);
                }
            });



            var tabItems = $('.gp-tabs-navigation li'),
                tabContentWrapper = $('.gp-tabs-content');

            tabItems.on('click', function(event) {
                event.preventDefault();
                var selectedItem = $(this);
                if (!selectedItem.hasClass('active-tab')) {
                    var selectedTab = selectedItem.data('content'),
                        selectedContent = tabContentWrapper.find('.pix-tab-item[data-content="' + selectedTab + '"]'),
                        slectedContentHeight = selectedContent.innerHeight();

                    tabItems.removeClass('active-tab');
                    selectedItem.addClass('active-tab');
                    selectedContent.addClass('active-tab').siblings('.pix-tab-item').removeClass('active-tab');
                    //animate tabContentWrapper height when content changes
                    tabContentWrapper.animate({
                        'height': slectedContentHeight
                    }, 500);
                }
            });

            //hide the .gp-tabs::after element when tabbed navigation has scrolled to the end (mobile version)
            checkScrolling($('.gp-tabs nav'));
            $(window).on('resize', function() {
                checkScrolling($('.gp-tabs nav'));
                tabContentWrapper.css('height', 'auto');
            });

            $('.gp-tabs nav').on('scroll', function() {
                checkScrolling($(this));
            });

            function checkScrolling(tabs) {
                var totalTabWidth = parseInt(tabs.children('.gp-tabs-navigation').width()),
                    tabsViewport = parseInt(tabs.width());
                if (tabs.scrollLeft() >= totalTabWidth - tabsViewport) {
                    tabs.parent('.gp-tabs').addClass('is-ended');
                } else {
                    tabs.parent('.gp-tabs').removeClass('is-ended');
                }
            }
        },

        /*==================================*/
        /*=           Mobile Menu          =*/
        /*==================================*/

        mobileMenu: function() {

            var windowSize = $(window).width();

            if (windowSize < 991) {
                $('.site-main-menu li.active').addClass('open').children('ul').show();
                $('.site-main-menu li.menu-item-has-children>a').on('click', function() {
                    $(this).removeAttr('href');
                    var element = $(this).parent('li');
                    if (element.hasClass('open')) {
                        element.removeClass('open');
                        element.find('li').removeClass('open');
                        element.find('ul').slideUp(400);
                    } else {
                        element.addClass('open');
                        element.children('ul').slideDown(400);
                        element.siblings('li').children('ul').slideUp(400);
                        element.siblings('li').removeClass('open');
                        element.siblings('li').find('li').removeClass('open');
                        element.siblings('li').find('ul').slideUp(400);
                    }
                });
            }

            $('.toggle-menu').on('click', function(e) {
                e.preventDefault();
                var mask = '<div class="mask-overlay">';

                $('body').toggleClass('open-menu');
                $(mask).hide().appendTo('body').fadeIn('fast');
                $('.mask-overlay, .close-menu').on('click', function() {
                    $('body').removeClass('open-menu');
                    $('.mask-overlay').remove();
                });
            });
        },

        /*==========================================*/
        /*=           Section Background           =*/
        /*==========================================*/

        sectionBackground: function() {

            // Section Background Image
            $('[data-bg-image]').each(function() {
                var img = $(this).data('bg-image');
                $(this).css({
                    backgroundImage: 'url(' + img + ')',
                });
            });
        },

        /*=====================================*/
        /*=           Section Switch          =*/
        /*=====================================*/

        sectionSwitch: function() {
            $('[data-type="section-switch"], #menu-home li a, .scroll-btn').on('click', function() {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    if (target.length > 0) {

                        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });
        },





    };

    AIHELLOAUTOPILOT.documentOnReady = {
        init: function() {
            AIHELLOAUTOPILOT.initialize.init();

        },
    };

    AIHELLOAUTOPILOT.documentOnLoad = {
        init: function() {
            $(".page-loader").fadeOut("slow");
        },
    };

    AIHELLOAUTOPILOT.documentOnResize = {
        init: function() {

        },
    };

    AIHELLOAUTOPILOT.documentOnScroll = {
        init: function() {
            AIHELLOAUTOPILOT.initialize.sectionBackground();

            if ($(window).scrollTop() > 300) {
                $('.return-to-top').addClass('back-top');
            } else {
                $('.return-to-top').removeClass('back-top');
            }
        },
    };

    // Initialize Functions
    $(document).ready(AIHELLOAUTOPILOT.documentOnReady.init);
    $(window).on('load', AIHELLOAUTOPILOT.documentOnLoad.init);
    $(window).on('resize', AIHELLOAUTOPILOT.documentOnResize.init);
    $(window).on('scroll', AIHELLOAUTOPILOT.documentOnScroll.init);

})(jQuery);