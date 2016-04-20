/**
 * Created by Romain on 27/03/2016.
 */

$(document).ready(function () {

    $(window).scroll(update);

    $(".tooltip").each(function () {
        var parent = $(this);
        var title = parent.find(".title");

        //parent.data("status", "close");

        /*title.click(function () {
         if (parent.data("status") == "close") {
         open(parent);
         }
         else {
         close(parent);
         }
         update();
         });*/

        title.focus(function () {
            console.log("blah");
            open(parent);
            update();
        });

        title.blur(function () {
            console.log("blah");
            close(parent);
            update();
        });
    });

    function open(parent) {
        var content = parent.find(".content");

        /*$(".tooltip").each(function () {
         $(this).data("status", "close");
         close($(this));
         });

         parent.data("status", "open");*/

        content.css("display", "block");
        content.stop().animate({
            opacity: 1
        }, 300, "linear", function () {
            content.css("opacity", "1");
        });
    }

    function close(parent) {
        var content = parent.find(".content");

        //parent.data("status", "close");

        content.stop().animate({
            opacity: 0
        }, 300, "linear", function () {
            content.css("display", "none");
            content.css("opacity", "0");
        });
    }

    function update() {
        $(".tooltip").each(function () {
            var content = $(this).find(".content");
            var scrollY = $(window).scrollTop();

            if (content.offset().top - 20 < scrollY + $("nav").height()) {
                content.removeClass("top");
                content.addClass("bottom");
            }
            else if (content.offset().top + content.height() + 40 > scrollY + $(window).height()) {
                content.removeClass("bottom");
                content.addClass("top");
            }
        });
    }

});