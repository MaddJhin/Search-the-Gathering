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



$(document).ready(function(){

    // When Displaying the results of One Card
    function DisplayCard(card){
        console.log("Displaying Card", card);
        $('#card-single > img').attr("src",card.imageUrl);
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
            console.log(result);
            if(result.length > 1)
            {
                console.log("Adding multiple results");
                var listGroup = $('<div>');
                listGroup.addClass('list-group');

                for (let i = 0; i < result.length; i++) {
                    console.log(result[i]);
                    var b = $('<button>');
                    b.addClass('list-group-item list-group-item-action');
                    b.text(result[i].name);
                    b.on("click", function(){
                        console.log("Calling Display on:", result[i]);
                        DisplayCard(result[i]);
                    });
                    
                    listGroup.append(b);
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