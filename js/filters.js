/**
 * Created by Romain on 27/03/2016.
 */

$(document).ready(function () {
    // Les variables
    var filters = $(".filters > button");

    // Au clique sur le hamburger
    filters.click(function () {
        filters.removeClass("selected");
        $(this).addClass("selected");
    });
});