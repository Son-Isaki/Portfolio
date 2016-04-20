/**
 * Created by Romain on 27/03/2016.
 */

$(document).ready(function () {
    // Les variables
    var mobileToDesktopWidth = 680;

    $(window).resize(function () {
        rearrange();
    });

    // Changement automatique de la position du curseur du menu
    function rearrange() {
        $(".about > .group").each(function (key, value) {
            var group = $(this),
                cell = group.find(".cell"),
                list = cell.find("img, p");

            if (!isDesktop()) {
                if (list.first().is("p")) {
                    cell.each(function () {
                        $(this).prependTo($(this).parent());
                    });
                }
            }
            else {
                if ((list.first().is("p") && key % 2 == 0) || (!list.first().is("p") && key % 2 == 1)) {
                    cell.each(function () {
                        $(this).prependTo($(this).parent());
                    });
                }
            }
        });
    }

    // retourne si le la largeur de la page correspond à un format desktop
    function isDesktop() {
        return $(window).width() >= mobileToDesktopWidth;
    }

    rearrange();
});