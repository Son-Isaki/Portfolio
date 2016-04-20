/**
 * Created by Romain on 27/03/2016.
 */

$(document).ready(function () {
    // Les variables
    var previewList = $(".projects > .gallery > ul > li > a"),
        overlay = $(".overlay"),
        content = $(".project-content"),
        animationDuration = 300,
        animationInterval = 50;

    previewList.click(function () {
        showContent();
    });

    content.find(".close").click(function () {
        hideContent();
    });

    // Ouvre le le splash screen affichant le contenu des articles
    function showContent() {
        overlay.animate({
            "width": "100vw",
            "height": "100vh"
        }, animationDuration, "linear", function () {
            overlay.addClass("show");
            setTimeout(function () {
                content.animate({
                    "opacity": "1"
                }, animationDuration, "linear", function () {
                    content.addClass("show");
                });
            }, animationInterval);
        });
    }

    // Ferme le le splash screen affichant le contenu des articles
    function hideContent() {
        moveToAnchor("projects");
        content.animate({
            "opacity": "0"
        }, animationDuration, "linear", function () {
            content.removeClass("show");
            setTimeout(function () {
                overlay.animate({
                    "width": "0",
                    "height": "0"
                }, animationDuration, "linear", function () {
                    overlay.removeClass("show");
                });
            }, animationInterval);
        });
    }

    function moveToAnchor(id) {
        var element = $("#" + id);
        if (element != null) {
            $(document).scrollTop(element.offset().top);
        }
    }

    $(".like").click(function () {
        $(this).toggleClass("youlike");
        doLike();
    });

    function doLike() {
        $(".like").each(function () {
            if ($(this).hasClass("youlike")) {
                $(this).find("span").html("Vous aimez");
            }
            else {
                $(this).find("span").html("J'aime ce projet");
            }
        });
    }

    doLike();
});