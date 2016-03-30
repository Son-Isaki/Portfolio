/**
 * Created by Romain on 27/03/2016.
 */

$(document).ready(function () {
    // Les variables
    var nav = $("nav");
    var cursor = nav.find("div.cursor");
    var menu = nav.find("ul");
    var menuItems = menu.find("li");
    var sections = $("header, main > section, footer");

    // Position par défaut
    cursor.css("transition-duration", "0");
    updateCursorPosition();
    setTimeout(function () {
        cursor.css("transition-duration", "300ms");
    }, 1);

    // On assigne l'event au éléments du menu
    menuItems.each(function (key, value) {
        $(this).hover(function () {
            setCursorToItem($(this));
        });
    });

    // Fonction qui change la position du curseur
    function setCursorToItem(item) {
        // item = item.find("a");

        cursor.css("width", item.width() + "px");
        cursor.css("left", item.offset().left + "px");
        setHeight();
    }

    // Fontion qui redéfini la hauteur
    // Exportée de setCursorToItem dans une nouvelle fn car plus simple :
    // J'en ai besoin aussi lorsque l'on scroll, au changement d'affichage du menu :)
    function setHeight() {
        if (nav.hasClass("sticky")) {
            cursor.css("bottom", 0);
        }
        else {
            cursor.css("bottom", 20 + "px");
        }
    }

    // Si on sort la souris de la zone du menu, on remet le curseur à sa position par défaut
    menu.mouseleave(function () {
        updateCursorPosition();
    });

    // Au scroll, on change le type d'affichage du menu
    $(window).scroll(function () {
        switchMenuType();
        updateCursorPosition();
    });

    // Changement du type d'affichage du menu
    function switchMenuType() {
        if ($(this).scrollTop() > 70) {
            nav.addClass("sticky");
            $("header > .intro").css("height", "100%");
        }
        else {
            nav.removeClass("sticky");
            $("header > .intro").css("height", "80%");
        }
        setHeight();
    }

    // Changement automatique de la position du curseur du menu
    function updateCursorPosition() {
        var scrollPos = $(this).scrollTop();

        sections.each(function (key, value) {
            var sectionPos = $(this).offset().top,
                height = $(this).height(),
                windowHeight = $(window).height(),
                pos = sectionPos - scrollPos + height / 2;

            // Si le milieu de l'element se trouve (en ce moment) affiché à l'écran
            if (pos > 0 && pos < windowHeight) {
                setCursorToItem(menuItems.eq(key));
            }
        });
    }

    updateCursorPosition();
});