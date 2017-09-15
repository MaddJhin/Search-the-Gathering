var baseURL = "https://api.magicthegathering.io/v1";

function ShowResults(type){
    // if (type == "single")
    //     $('#card-multiple').css("display", "inline");
    // else if (type == "single")
    //     $('#card-single').css("display", "inline");
    // else if (type == "none")
    // {
    //     $('#card-multiple').css("display", "none");
    //     $('#card-single').css("display", "none");
    // }    
}
var cardList = [];

function AddCard(card) {
    // Check if a card with the same name has been added already
    if(cardList.some(function(e) { return e.name == card.name;}))
    {    // Card Exists
        console.log("Card is Already In array", card.name);                
        // Compare Printings
        // Keep last Printing
    }
    else
    {
        cardList.push(card);
    }
}

// Start with an empty object array for card result


$(document).ready(function(){

    // When Displaying the results of One Card
    function DisplayCard(card){
        console.log("Displaying Card", card);
        // $('#card-single > img').attr("src",card.imageUrl);
    }

    $("#search-button").on("click", function(e){
        e.preventDefault();
        ShowResults("none");
        var queryURL = baseURL + "/cards?name=" + $("#search-field").val();
        $("#search-field").val("");

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response){
            var result = response.cards;
            console.log("Returned Cards",result);

            // Pass Card Objects from search into empty array
            for (var i = 0; i < result.length; i++)
            {
                AddCard(result[i]);
            }

            console.log(cardList);

            // Take the newly filled array
                // Make a card button for every card in array
                // Display Card Deck



            ///////////////
            // OLD CODE
            ///////////////
            /*

            // Make a container to put all the cards
            var cardGroup = $('<div>');
            cardGroup.addClass('cards');

            // For every card returned in the result, display a panel with image of the card
            for (var i = 0; i < result.length; i++) 
            {   // Make a card class div
                console.log("Adding Card",result[i]);
                
                // Make the div that contains the card contents
                var card = $('<div>');
                card.addClass('card');

                // Button that wraps card contents for click function
                // var b = $('<button>');
                // b.on("click", function(){
                //     console.log("Calling Display on:", result[i]);
                //     DisplayCard(result[i]);
                // });

                // Header for the card to hold name
                var header = $('<div>');
                header.addClass('card-header')
                    .text(result[i].name);

                // Card Image to display
                var bImage = $('<img>');
                bImage.addClass('card-img-top')
                    .attr("src", result[i].imageUrl);

                // Append header and image to button, button to card, card to card group
                card.append(header).append(bImage);
                // card.append(b);
                cardGroup.append(card);
            }
                
                // Append the card image as a sub element
                // Append Card class div to result list

            // Append the entire list to the dom
            $('#card-multiple').empty().append(cardGroup);

            */
                // if(result.length == 1){
            //     console.log("Adding Single Result", result["0"]);
            //     DisplayCard(result["0"]);
            //     ShowResults("single");
            // }
        });
    });
});