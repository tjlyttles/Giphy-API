$(document).ready(function() {
    var reactionArr = ['excited', 'crying', 'yes', 'no', 'amazing', 'omg', 'high five', 'blank stare', 'confused', 'swooning', 'flirting', 'aww', 'laughing']
    
    var buttonClicked = false   

    function renderButtons() {
        
        console.log(reactionArr)
        $("#buttons-view").empty()
        jQuery.unique(reactionArr)
        for (var i = 0; i < reactionArr.length; i++) {                    
            
            var newButton = $(`<button class='btn btn-success reaction-button' style='margin: 5px'>` + reactionArr[i] + `</button>`)
            newButton.attr("data-name", reactionArr[i])                       
            $("#buttons-view").append(newButton)
            $('#reaction-input').val('')
            
        }
    }

    function displayReaction() {
        var searchTerm = $(this).attr("data-name")
        var urlQuery = 'https://api.giphy.com/v1/gifs/search?api_key=FsmacnxWyMJ0NseTQttShgrZPj8kRhDM&q=' + searchTerm + '&limit=10&offset=0&rating=G&lang=en'

        

        $.ajax({
            url: urlQuery,
            method: 'GET'
        }).then(function (response){
            console.log(response)

            $('#gif-view').empty()
            var gifData = response.data
            var gifDiv = $('#gif-view')
            var image
            var ratingEl

            for (var i = 0; i < gifData.length; i++) {
                
                var rating = gifData[i].rating
                var imgStill = gifData[i].images.original_still.url
                var imgAnimate = gifData[i].images.original.url
                ratingEl = $("<p>").html("Rating: " + rating)
                ratingEl.css({'width': gifData[i].images.original.width, 'margin' : '0'})
                image = $(`<img src=` + imgStill + ` data-still=` + imgStill + ` data-animate=` + imgAnimate + ` data-state = 'still' class= 'gif' style='margin: 10px'>`)

                gifDiv.append(ratingEl)
                gifDiv.append(image)   

            }

            $(".gif").on("click", function() {
                
                var state = $(this).attr("data-state")
                
                if (state !== "still") {
                    $(this).attr("src", $(this).attr("data-still"))
                    $(this).attr("data-state", "still")
                } else {
                    $(this).attr("src", $(this).attr("data-animate"))
                    $(this).attr("data-state", "animate")
                }
            })
        })
        
    }

    $('#add-reaction').on('click', function(event){
        event.preventDefault()
        
        buttonClicked = true
        var reactInput = $('#reaction-input').val().trim()                
        reactionArr.push(reactInput)
        renderButtons()
    })

    $(document).on("click", ".reaction-button", displayReaction)
    renderButtons()           
})