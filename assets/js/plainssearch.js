var baseURL = "https://api.magicthegathering.io/v1"

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

// When Displaying the results of One Card
function DisplayCard(card){
    console.log($('#single-card > img'));
    $('#card-single > img').attr("src",card.imageUrl);
}

$(document).ready(function(){

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
            console.log(result);
            if(result.length > 1)
            {
                console.log("Adding multiple results");
                var listGroup = $('<div>');
                listGroup.addClass('list-group');

                for (var i = 0; i < result.length; i++) {
                    var button = $('<button>');
                    button.addClass('list-group-item list-group-item-action')
                        .text(result[i].name);

                    listGroup.append(button);
                }
                $('#card-multiple').empty().append(listGroup);
                ShowResults("multiple");
            }
            if(result.length == 1){
                console.log("Adding Single Result", result["0"]);
                DisplayCard(result["0"]);
                ShowResults("single");
            }
        });
    });
});