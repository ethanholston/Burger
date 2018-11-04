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
        displayPage();
      }
    );
  });

  $(document).on("click", ".revive", function(event) {
    var id = $(this).data("id");

    var devouredState = {
      devoured: false
    };

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: devouredState
    }).then(
      function() {
        displayPage();
      }
    );
  });

  $(document).on("submit", ".create-form", function(event) {
    event.preventDefault();

    var newBurger = {
      name: $("#ba").val().trim(),
      desc: $("#bd").val().trim()
    };

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        displayPage();
      }
    );
  });
};
