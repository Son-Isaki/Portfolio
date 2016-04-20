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
        smallGreaterThan = 70,
        mobileToDesktopWidth = 680,
        animationDuration = 300;

    // On assigne l'event au éléments du menu
    menuItems.each(function (key, value) {
        $(this).hover(function () {
            setCursorToItem($(this));
        });
    });

    $(window).resize(function () {
        setCursorToItem(currentItem);

        if (isDesktop()) {
            menu.attr("style", "");
        }
    });

    // Au hover du menu
    menuItems.hover(function () {
        mouseHoverMenu = true;
    });

    // Si on sort la souris de la zone du menu, on remet le curseur à sa position par défaut
    menu.mouseleave(function () {
        mouseHoverMenu = false;
        updateMenu();
    });

    // Au scroll, on change le type d'affichage du menu
    $(window).scroll(function () {
        if (isDesktop()) {
            switchMenuType();
        }

        if (!mouseHoverMenu) {
            updateMenu();
        }

    });

    // Au clique sur le hamburger
    hamburger.click(function () {
        toggleMenu();
    });

    // Au clique sur un item du menu
    menuItems.find("a").click(function () {
        if (!isDesktop()) {
            toggleMenu();
        }
    });

    // Fonction qui change la position du curseur
    function setCursorToItem(item) {
        if (item != null) {
            currentItem = item;
            cursor.css("width", item.width() + "px");
            cursor.css("left", item.offset().left + "px");
        }
    }

    // Fonction qui change la position du curseur
    function setSectionLabel(item) {
        currentSection.html(item.find("a").html());
    }

    // Changement du type d'affichage du menu
    function switchMenuType() {
        if ($(this).scrollTop() > smallGreaterThan) {
            nav.addClass("small");
        }
        else {
            nav.removeClass("small");
        }
    }

    // Changement automatique de la position du curseur du menu
    function updateMenu() {
        var scrollPos = $(this).scrollTop();

        sections.each(function (key, value) {
            var sectionPos = $(this).offset().top,
                height = $(this).height(),
                windowHeight = $(window).height(),
                pos = sectionPos - scrollPos + height / 2;

            // Si le milieu de l'element se trouve (en ce moment) affiché à l'écran
            if (pos > 0 && pos < windowHeight) {
                setCursorToItem(menuItems.eq(key));
                setSectionLabel(menuItems.eq(key));
            }
        });
    }

    // fonction qui affiche ou cache le menu mobile
    function toggleMenu() {
        nav.toggleClass("opened");

        if (nav.hasClass("opened")) {
            menu.slideDown(animationDuration);
        } else {
            menu.slideUp(animationDuration);
        }
    }

    // retourne si le la largeur de la page correspond à un format desktop
    function isDesktop() {
        return $(window).width() >= mobileToDesktopWidth;
    }

    // Position par défaut du curseur
    function defaultPosition() {
        cursor.css("transition-duration", "0ms");
        updateMenu();
        setTimeout(function () {
            cursor.css("transition-duration", animationDuration + "ms");
        }, 1);
    }

    defaultPosition();
});