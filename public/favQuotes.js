  $(".delquote").on("click", function(event) {
    var id = $(this).data("quoteid");

    // Send the DELETE request.
    $.ajax("/api/quotefavorites/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted id ", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $("#addquotefavorite").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    console.log("KJS 1.---------->", newQuote)
    event.preventDefault();

    var newQuote = {
      quote: $("#addquotefavorite [name=quotefavorite]").val().trim()
    };

    console.log("KJS 2.---------->", newQuote)

    // Send the POST request.
    $.ajax("/api/quotefavorites", {
      type: "POST",
      data: newQuote
    }).then(
      function() {
        console.log("KJS 3.---------->", newQuote)
        console.log("added new quotefavorite");
        // Reload the page to get the updated list
        location.reload();
      }
      );
      console.log("KJS 4.---------->", newQuote)
    });
