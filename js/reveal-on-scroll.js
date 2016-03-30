/**
 * Created by Romain on 28/03/2016.
 */

$(document).ready(function () {
    var $window = $(window),
        win_height_padded = $window.height() * 1.1,
        isTouch = Modernizr.touch,
        animation = "fadeInUp";

    $window.on('scroll', revealOnScroll);

    $(".revealOnScroll").css("opacity", "0");

    function revealOnScroll() {
        var scrolled = $window.scrollTop();

        $(".revealOnScroll").each(function () {
            var $this = $(this),
                offsetTop = $this.offset().top;

            if (scrolled + win_height_padded > offsetTop) {
                if (!$this.hasClass(animation)) {
                    $this.addClass("animated " + animation);
                }
            }
            else {
                if ($this.hasClass(animation)) {
                    $this.removeClass(animation);

                    $this.css("opacity", "0");
                }
            }
        });
    }
});