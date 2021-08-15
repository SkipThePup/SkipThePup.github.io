/*File: _js.js
Created on: August 11, 2021
GUI Assignment: HW5: Implementing a Bit of Scrabble with Drag-and-Drop
Description: File contains the creation of the board slots, creation of the player's letter tiles, and the drag and drop event handlers.

DISCLAIMER: Most of this code was obtained by reading w3schools.com tutorials. Most of the JQuery implementation was done using
https://api.jquery.com/ documentation. Any other source is cited in its respective place.

Rodrigo Choque Cardenas, UMass Lowell Computer Science, rodrigo_choquecardenas@student.uml.edu
Updated by RCC on August 11, 2021 at 10:38 AM
*/
$().ready(function () {
    //We create 15 divs. Each for each slot in the board
    //Each slot has an id with the slot number
    //We also assign the respective bonus letter and bonus word tiles
    for (var i = 0; i < 15; i++) {
        if (i == 2 || i == 12) {
            var board_slot = "<div class='board_slot_wbonus' id='slot" + i + "'></div>";
        }
        else if (i == 6 || i == 8) {
            var board_slot = "<div class='board_slot_lbonus' id='slot" + i + "'></div>";
        }
        else {
            var board_slot = "<div class='board_slot' id='slot" + i + "'></div>";
        }
        document.getElementById("board").innerHTML += board_slot;
    }

    /*Description:On this section we obtain the player's "hand" and put it on the tile holder.
     * Idea of generating a random alphabet letter obtained from: https://www.coderrocketfuel.com/article/generate-a-random-letter-from-the-alphabet-using-javascript
    */
    //Our alphabet...
    var scrabble_alphabet = "_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var j = 0; j < 7; j++) {
        //We generate a random letter
        var random_letter = scrabble_alphabet[Math.floor(Math.random() * scrabble_alphabet.length)];
        //Then we check if the random letter has number remaining > 0, if not, we generate a new random letter that has number - remanining > 0
        while (ScrabbleTiles[random_letter]["number-remaining"] <= 0) {
            console.log('Ran out of letter tile ' + random_letter + '!!! Choosing another letter...');
            random_letter = scrabble_alphabet[Math.floor(Math.random() * scrabble_alphabet.length)];
        }
        //Once we have a valid, still distributable random letter, we obtain its image from the images provided by the professor...
        //We also assign an id with their respective letter
        if (random_letter == "_") {
            var letter_tile = "<img class='letter' id='_' src='./graphics_data/scrabble_tiles/Scrabble_Tile_Blank.jpg'>";
        }
        else {
            var letter_tile = "<img class='letter' id='" + random_letter + "' src='./graphics_data/scrabble_tiles/Scrabble_Tile_" + random_letter + ".jpg'>"
        }
        //These images will be draggable. We add these to the div "holder"
        document.getElementById("holder").innerHTML += letter_tile;
        //We update the number of remaining tiles
        ScrabbleTiles[random_letter]["number-remaining"] -= 1;
    }

    $(function () {
        /*We make the images draggable with some characteristics:
         * It will on be dragable inside the main container
         * it will snap to the inner borders of each board slot
         * if it's not in a slot, it will revert to the holder
         */
        $("img").draggable({
            containment: '#mainContainer',
            stack: '#board div',
            revert: 'invalid',
            cursor: 'move'
        });
    });
    /* Here we make the differen types of slots droppable.
     * Once the item is dropped, the event dropEven will trigger
     */
    $(function () {
        $(".board_slot").droppable({
            drop: dropEvent,
            accept: '.letter'
        });
        $(".board_slot_lbonus").droppable({
            drop: dropEvent,
            accept: '.letter'
        });
        $(".board_slot_wbonus").droppable({
            drop: dropEvent,
            accept: '.letter'
        });

    });
    /* This handles what happens after the element is dropped in a droppable element
     * 
     */
    function dropEvent(event, ui) {
        var draggable = ui.draggable;

        //Obtain the id of the dragged element
        var id_letter = $(draggable).attr("id");

        //Obtain the id of the slot where the element is dropped
        var id_slot = $(this).attr("id");

        console.log("" + id_letter + " was dropped in " + id_slot);
        /* Make the letters snap nicely and intuitively into the board slots
         * This also assures the letter will not be recognized as dropped on unwanted board slots
         * This options were obtained by reading the tutorial at:
         * https://www.elated.com/drag-and-drop-with-jquery-your-essential-guide/
         */
        $(draggable).position({
            of: $(this),
            my: 'left top',
            at: 'left top'
        });

        //Let's tally the score
        var totalScore = document.getElementById("total").innerHTML;

        //obtain bonus for letter bonus tile
        if ($(this).attr("class") == "board_slot_lbonus ui-droppable") {
            totalScore = parseInt(totalScore) + (parseInt(ScrabbleTiles[$(draggable).attr("id")]["value"]) * 2);
        }
        else {
            totalScore = parseInt(totalScore) + ScrabbleTiles[$(draggable).attr("id")]["value"];
        }
        document.getElementById("total").innerHTML = totalScore;

        //Once the tile is on the game board, it cannot be moved
        $(draggable).draggable('disable');
        //Once the slot is full, it cannot receive any more tiles
        $(this).droppable('disable');
    }
})


//Reloads the app. Source: https://www.w3schools.com/jsref/met_loc_reload.asp
function restartGame() {
    location.reload();
}
