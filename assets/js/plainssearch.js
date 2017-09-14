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
            var result = response.cards;
            if(result.length > 1)
            {
                var listGroup = $('<div>');
                listGroup.addClass('list-group');

                for (var i = 0; i < result.length; i++) {
                    var button = $('<button>');
                    button.addClass('list-group-item list-group-item-action')
                        .text(result.name);

                    listGroup.append(button);
                }
                $('#card-multiple').append(listGroup);
                ShowResults();
            }
        });
    });
});