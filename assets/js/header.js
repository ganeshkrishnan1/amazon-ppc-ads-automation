(function($, window, document) {
    "use strict";
    $(window).on("scroll load", function() {
        if ($(this).scrollTop() >= 30) {
            if ($(".site-header.header_trans-fixed").length) {
                $(".site-header.header_trans-fixed").not(".fixed-dark").addClass("pix-header-fixed");
                $(".fixed-dark").addClass("bg-fixed-dark");
                $(".sticky-logo, .header-button-scroll").show();
                $(".main-logo, .header-button-default").hide()
            }
            if ($(".right-menu.modern").length) {
                $(".right-menu.modern").closest(".fixed-header").addClass("fixed-header-scroll")
            }
        } else {
            if ($(".site-header.header_trans-fixed").length) {
                $(".site-header.header_trans-fixed").not(".fixed-dark").removeClass("pix-header-fixed");
                $(".fixed-dark").removeClass("bg-fixed-dark");
                $(".sticky-logo, .header-button-scroll").hide();
                $(".main-logo, .header-button-default").show()
            }
            if ($(".right-menu.modern").length) {
                $(".right-menu.modern").closest(".fixed-header").removeClass("fixed-header-scroll")
            }
        }
    });

    function activeSection() {
        if ($(".vc_row[id]").length) {
            var wintop = $(window).scrollTop();
            $(".vc_row[id]").each(function() {
                var $this = $(this);
                var currentId = $this.attr("id");
                if (currentId.length > 2) {
                    if (wintop >= $(this).offset().top - $(".header_trans-fixed").outerHeight() - $("#wpadminbar").outerHeight()) {
                        var reqLink = $(".site-main-menu li:not(.menu-item-has-children) > a").filter('[href="#' + currentId + '"]');
                        reqLink.closest("li:not(.menu-item-has-children)").addClass("active").siblings().removeClass("active")
                    }
                }
            })
        }
    }
    if ($(window).width() >= $(".menu-wrapper").data("top")) {
        $('.site-main-menu li:not(.menu-item-has-children) > a[href^="#"]').on("click", function(e) {
            e.preventDefault();
            var elem = $(this).attr("href");
            if ($(elem).length) {
                $("html,body").animate({
                    scrollTop: $(elem).offset().top - $(".header_trans-fixed").outerHeight() - $("#wpadminbar").outerHeight()
                }, "slow")
            }
        })
    }


    $(".toggle-menu").on("click", function(e) {
        e.preventDefault();
        var mask = '<div class="mask-overlay">';
        $(mask).hide().appendTo('body').fadeIn('fast');
        $("html").addClass("no-scroll sidebar-open").height(window.innerHeight + "px");
        if ($("#wpadminbar").length) {
            $(".sidebar-open .site-nav").css("top", "46px")
        } else {
            $(".sidebar-open .site-nav").css("top", "0")
        }
    });

    $(".close-menu, .mask-overlay").on("click", function(e) {
        e.preventDefault();

        $("html").removeClass("no-scroll sidebar-open").height("auto");
        $('.mask-overlay').remove();
    });

    function toggleAsideMenu() {

        $(".aside-nav").on("click", function() {
            $(".aside-menu").toggleClass("active-menu");
            $(".site-header").toggleClass("active-menu");
            return false
        });
        $(".menu-wrapper:not(.unit) .menu-item-has-children > a").on("click", function(e) {
            e.preventDefault()
        });
        var dataTop = $(".menu-wrapper").data("top");
        if (window.outerWidth >= dataTop) {
            $(".menu-wrapper").on("click", function(e) {
                if (!e.target.closest(".aside-menu")) {
                    $(".sub-menu-open").slideUp(250)
                }
            });
            $(".aside-menu .menu-item-has-children a").addClass("hide-drop");
            $(".aside-menu .menu-item a").on("click", function() {
                if ($(this).parent().hasClass("menu-item-has-children")) {
                    if ($(this).hasClass("hide-drop")) {
                        if ($(this).closest(".sub-menu").length) {
                            $(this).removeClass("hide-drop").next(".sub-menu").slideDown(250).removeClass("sub-menu-open");
                            $(this).parent().siblings().find(".sub-menu").slideUp(250).addClass("sub-menu-open")
                        } else {
                            $(".menu-item-has-children a").addClass("hide-drop").next(".sub-menu").hide(250).removeClass("sub-menu-open");
                            $(this).removeClass("hide-drop").next(".sub-menu").slideToggle(250).toggleClass("sub-menu-open")
                        }
                    } else {
                        $(this).addClass("hide-drop").next(".sub-menu").hide(250).find(".menu-item-has-children a").addClass("hide-drop").next(".sub-menu").hide(250);
                        $(this).next(".sub-menu").removeClass("sub-menu-open")
                    }
                }
            })
        } else {
            $(".menu-item-has-children a").removeClass("hide-drop")
        }
        if ($(".aside-fix").length && $(window).width() > dataTop) {
            var logoWidth = $(".logo span, .logo img").outerWidth();
            $(".logo").css("top", logoWidth + "px")
        }
    }

    function fixedMobileMenu() {
        var headerHeight = $(".site-header").not(".header_trans-fixed").outerHeight();
        var offsetTop;
        var dataTop = $(".menu-wrapper").data("top");
        var adminbarHeight = $("#wpadminbar").outerHeight();
        if ($("#wpadminbar").length) {
            offsetTop = adminbarHeight + headerHeight;
            $(".site-header").css("margin-top", adminbarHeight)
        } else {
            offsetTop = headerHeight
        }
        if ($(window).width() < dataTop) {
            $(".menu-wrapper").css("padding-top", offsetTop + "px")
        } else {
            if ($("#wpadminbar").length && $(".site-header").hasClass("header_trans-fixed")) {
                $(".menu-wrapper").css("padding-top", adminbarHeight + "px")
            } else {
                $(".menu-wrapper").css("padding-top", "0")
            }
        }
        if ($("#wpadminbar").length && $(window).width() < 768) {
            $("#wpadminbar").css({
                position: "fixed",
                top: "0"
            })
        }
    }

    function menuArrows() {
        var mobW = $(".menu-wrapper").attr("data-top");
        if (window.outerWidth < mobW || $(".site-header").hasClass("topmenu-arrow")) {
            if (!$(".menu-item-has-children i").length) {
                $("header .menu-item-has-children").append('<i class="fa fa-angle-down"></i>');
                $("header .menu-item-has-children i").addClass("hide-drop")
            }
            $("header .menu-item-has-children i").on("click", function() {
                if (!$(this).hasClass("animation")) {
                    $(this).parent().toggleClass("is-open");
                    $(this).addClass("animation");
                    $(this).parent().siblings().removeClass("is-open").find(".fa").removeClass("hide-drop").prev(".sub-menu").slideUp(250);
                    if ($(this).hasClass("hide-drop")) {
                        if ($(this).closest(".sub-menu").length) {
                            $(this).removeClass("hide-drop").prev(".sub-menu").slideToggle(250)
                        } else {
                            $(".menu-item-has-children i").addClass("hide-drop").next(".sub-menu").hide(250);
                            $(this).removeClass("hide-drop").prev(".sub-menu").slideToggle(250)
                        }
                    } else {
                        $(this).addClass("hide-drop").prev(".sub-menu").hide(100).find(".menu-item-has-children a").addClass("hide-drop").prev(".sub-menu").hide(250)
                    }
                }
                setTimeout(removeClass, 250);

                function removeClass() {
                    $("header .site-main-menu i").removeClass("animation")
                }
            })
        } else {
            $("header .menu-item-has-children i").remove()
        }
    }
    $(".search-icon-wrapper.ico-style .close-search").on("click", function() {
        $(this).parent().toggleClass("is-active");
        if ($(this).parent().hasClass("is-active")) {
            setTimeout(function() {
                $(".search-icon-wrapper.ico-style .search-field").focus()
            }, 300)
        }
    });
    $(document).on("click", function(e) {
        if (!$(e.target).closest(".search-icon-wrapper.ico-style").length) {
            $(".ico-style .close-search").parent().removeClass("is-active")
        }
        e.stopPropagation()
    });

    function calcOffsetMenu() {
        var offsetAdditionalMenu = $("#wpadminbar").length ? $("#wpadminbar").outerHeight() : 0;
        $(".additional-inner-wrap").css("top", offsetAdditionalMenu + "px")
    }
    $(".additional-nav").on("click", function(e) {
        e.preventDefault();
        $(".additional-menu-wrapper").addClass("menu-open");
        $(".menu-wrapper").addClass("additional-menu-open")
    });
    $(".additional-nav-close, .additional-menu-overlay").on("click", function() {
        $(".additional-menu-wrapper").removeClass("menu-open");
        $(".menu-wrapper").removeClass("additional-menu-open")
    });
    $(window).on("load", function() {
        toggleAsideMenu()
    });
    $(window).on("scroll", function() {
        activeSection()
    });
    $(window).on("load resize", function() {
        fixedMobileMenu();
        menuArrows();
        calcOffsetMenu();
        activeSection()
    });
    window.addEventListener("orientationchange", function() {
        calcOffsetMenu();
        fixedMobileMenu();
        menuArrows()
    })
})(jQuery, window, document);