/**
 * Created by Romain on 15/04/2016.
 */

$(document).ready(function () {
    var timer = 0,
        currentText = "",
        currentOffset = 0,
        textArray = null,
        div = null;

    write($("#lettering"), "<div class='big inline'>Bonjour, </div> " +
        "<div class='big inline'>Je suis <span class='orange'>Romain Tiger</span> !</div> ", 80);

    function write(element, text, interval) {
        textArray = text.split("");
        currentOffset = 0;
        timer = setInterval(onTick, interval);
        div = element;
        currentText = "";
    }

    function onTick() {

        // si c'est un espace
        if (textArray[currentOffset] == " ") {
            currentText += textArray[currentOffset];
            currentOffset++;
        }

        // on évite le html
        if (textArray[currentOffset] == "<") {
            var text = "";

            while (currentOffset <= textArray.length) {
                text += textArray[currentOffset];
                currentOffset++;
                if (textArray[currentOffset - 1] === ">") break;
            }

            currentText += text;
        }

        // ajout du caractère courant
        currentText += textArray[currentOffset];
        div.html(currentText);

        currentOffset++;

        // si au bout du texte
        if (currentOffset == textArray.length) {
            clearInterval(timer);
            return;
        }
    }
});