var baseURL = "https://api.magicthegathering.io/v1"

function ShowResults(){
    $('#search-results').css("display", "none");
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
            console.log(response.cards.length);

        });


    });

});