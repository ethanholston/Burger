$(function() {
  registerPartial("burger-block", "#burgers-block-partial");
  displayPage();
  setupEventHandlers();
});

function registerPartial(name, partialId) {
  var source = $(partialId).text();
  Handlebars.registerPartial(name, source);
}

function displayPage() {
  $.get("/api/burgers/").then(
    function(burgers) {
      renderTemplate({burgers: burgers});
      console.log(burgers);
    }
  );
}

function renderTemplate(data) {
  var source = $("#page-template").text();
  var template = Handlebars.compile(source);
  var html = template(data);
  $("#app").html(html);
}

function setupEventHandlers() {
  $(document).on("click", ".devour", function(event) {
    var id = $(this).data("id");

    var devouredState = {
      devoured: true
    };

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: devouredState
    }).then(
      function() {
        console.log("devoured");
        displayPage();
      }
    );
  });

  $(document).on("submit", ".create-form", function(event) {
    event.preventDefault();

    var newBurger = {
      name: $("#ba").val().trim(),
    };

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        displayPage();
      }
    );
  });
};
