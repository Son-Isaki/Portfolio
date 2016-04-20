/**
 * Created by Romain on 27/03/2016.
 */

$(document).ready(function () {
    // Les variables
    var filters = $(".filters > button");

    // Au clique sur un filtre
    filters.click(function () {
        filters.removeClass("selected");
        $(this).addClass("selected");

        updateContent($(this).data("filter"));
    });
});

function updateContent(value, isMobile) {
    if (isMobile) {
        setDesktopFilter(value);
    }
    else {
        setMobileFilter(value);
    }

    doFiltering(value);
}

function setMobileFilter(value) {
    $(".select-filters > .cs-options > ul > li").each(function () {
        if ($(this).data("value") == value) {
            $(this).addClass("cs-selected");

            var text = $(this).find("span").html();
            $(".select-filters > .cs-placeholder").html(text);
        }
        else {
            $(this).removeClass("cs-selected");
        }
    });
}

function setDesktopFilter(value) {
    $(".filters > button").each(function () {
        if ($(this).data("filter") == value) {
            $(this).addClass("selected");
        }
        else {
            $(this).removeClass("selected");
        }
    });
}

function doFiltering(value) {
    if (value == "all") {
        $(".gallery > ul > li").show();
    }
    else {
        $(".gallery > ul > li").hide();
        $(".gallery > ul > li." + value).show();
    }
}