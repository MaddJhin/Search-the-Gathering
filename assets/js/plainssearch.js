var baseURL = "https://api.magicthegathering.io/v1";

// Start with an empty object array for card result
var cardList = [];

function AddCard(card) {
    // Check if a card with the same name has been added already
    if(cardList.some(function(e) { return e.name == card.name;}))
    {   // Card With name exists 
        console.log("Card is Already In array", card.name);      
        
        // Compare Set of new card with the last printing of the card
        // If it's the card is the last printed set
        if(card.set == card.printings[card.printings.length-1])
        {   // Check the index the old card was and substitute it with the new card
            var cardIndex = cardList.map(function(e) { return e.name;}).indexOf(card.name);
            cardList[cardIndex] = card;
            console.log("Substituting Card with Latest Printing at index: ", cardIndex);
        }
    }
    else 
    {
        cardList.push(card);
    }
}

function DrawCards(list){
    // Clear Previous Search
    console.log("Clearing old Search");
    $('#card-multiple').empty();

    // For every card returned in the result, make a clickable button with the image and name
    for (var i = 0; i < list.length; i++) 
    {   // Make a card class div
        console.log("Adding Card",list[i]);

        var b = $('<button>');
        b.addClass('btn btn-transparent');
        b.data("card", list[i]);
        b.on("click", DisplayCard);

        // Make the div that contains the card contents
        var card = $('<div>');
        card.addClass('card');

        // // Header for the card to hold name
        // var header = $('<div>');
        // header.addClass('card-header')
        //     .text(list[i].name);

        // Card Image to display
        var bImage = $('<img>');
        bImage.addClass('card-img-top')
            .attr("src", list[i].imageUrl);

        // Append header and image to button, button to card, card to card group
        
        b.append(bImage);
        card.append(b);
        $('#card-multiple').append(card);
    }
}

// When a user clicks on a card result
function DisplayCard(){
    console.log("Displaying Card", $(this).data("card"));
    // $('#card-single > img').attr("src",card.imageUrl);
}

$(document).ready(function(){

    $("#search-button").on("click", function(e){
        e.preventDefault();
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
            console.log("Cards to be displayed",cardList);
            
            // Take the newly filled array
            DrawCards(cardList);
        });
    });
});