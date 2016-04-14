/**
 * Created by Romain on 27/03/2016.
 */

$(document).ready(function () {
    // Les variables
    var nav = $("nav"),
        cursor = $("nav > .cursor"),
        menu = $("nav > ul"),
        menuItems = $("nav > ul > li"),
        sections = $("#intro, #about, #projects, #skills, #contact"),
        hamburger = $(".hamburger"),
        currentSection = $(".current-section"),
        mouseHoverMenu = false,
        currentItem = null,
        smallGreaterThan = 70;

    // Position par défaut
    cursor.css("transition-duration", "0ms");
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

    $(window).resize(function () {
        setCursorToItem(currentItem);
    });

    // Fonction qui change la position du curseur
    function setCursorToItem(item) {
        if (isDesktop()) {
            cursor.css("width", item.width() + "px");
            cursor.css("left", item.offset().left + "px");
            setHeight();
        }
    }

    // Fonction qui change la position du curseur
    function setSectionLabel(item) {
        if (!isDesktop()) {
            currentSection.html(item.find("a").html());
        }
    }

    // Fontion qui redéfini la hauteur
    // Exportée de setCursorToItem dans une nouvelle fn car plus simple :
    // J'en ai besoin aussi lorsque l'on scroll, au changement d'affichage du menu :)
    function setHeight() {
        if (nav.hasClass("small")) {
            cursor.css("bottom", 0);
        }
        else {
            cursor.css("bottom", 20 + "px");
        }
    }

    // Au hover du menu
    menuItems.hover(function () {
        mouseHoverMenu = true;
    });

    // Si on sort la souris de la zone du menu, on remet le curseur à sa position par défaut
    menu.mouseleave(function () {
        mouseHoverMenu = false;
        updateCursorPosition();
    });

    // Au scroll, on change le type d'affichage du menu
    $(window).scroll(function () {
        switchMenuType();

        if (!mouseHoverMenu) {
            updateCursorPosition();
        }
    });

    // Changement du type d'affichage du menu
    function switchMenuType() {
        if ($(this).scrollTop() > smallGreaterThan) {
            nav.addClass("small");
        }
        else {
            nav.removeClass("small");
        }
        setHeight();
    }

    // Changement automatique de la position du curseur du menu
    function updateCursorPosition() {
        if (isDesktop()) {
            var scrollPos = $(this).scrollTop();

            sections.each(function (key, value) {
                var sectionPos = $(this).offset().top,
                    height = $(this).height(),
                    windowHeight = $(window).height(),
                    pos = sectionPos - scrollPos + height / 2;

                // Si le milieu de l'element se trouve (en ce moment) affiché à l'écran
                if (pos > 0 && pos < windowHeight) {
                    currentItem = menuItems.eq(key);
                    setCursorToItem(currentItem);
                    setSectionLabel(currentItem);
                }
            });
        }
    }

    // Au clique sur le hamburger
    hamburger.click(function () {
        toggleMenu();
    });

    // Au clique sur un item du menu
    menuItems.find("a").click(function () {
        toggleMenu();
    });

    function toggleMenu() {
        nav.toggleClass("opened");

        if (!isDesktop()) {
            if (nav.hasClass("opened")) {
                menu.slideDown(300);
            } else {
                menu.slideUp(300);
            }
        }
    }

    function isDesktop() {
        return $(window).width() >= 680;
    }

    updateCursorPosition();
});