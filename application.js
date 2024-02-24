$(document).ready(getTasks);

function getTasks() {
  $.ajax({
    type: "GET",
    url: "https://fewd-todolist-api.onrender.com/tasks?api_key=1201",
    dataType: "json",
    success: function (response, textStatus) {
      console.log(response);
      $("#todo-list").empty();
      response.tasks.forEach(function (task) {
          let checkedValue = "";
          if (task.completed){
            checkedValue = "checked";
          }
        $("#todo-list").append(
          "<div>" +
            task.content +
            '<button style="margin-left: 10px;" onclick="deleteTask(' +
            task.id +
            ')">Delete</button>' +
            '<button style="margin-left: 10px;" onclick="completeTask(' +
            task.id +
            ')">Complete</button>' +
            '<input style="margin-left: 10px;" type="checkbox" ' + checkedValue +'>'
            +"</div>"
        );
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });

  console.log("js is working today");
}

var createTask = function () {
  console.log("test");
  $.ajax({
    type: "POST",
    url: "https://fewd-todolist-api.onrender.com/tasks?api_key=1201",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      task: {
        content: $("#new-task-content").val(),
      },
    }),
    success: function (response, textStatus) {
      console.log({ response });
    },
    error: function (request, textStatus, errorMessage) {
      console.log({ errorMessage });
    },
  });
  getTasks();
};

var deleteTask = function (id) {
  $.ajax({
    type: "DELETE",
    url: "https://fewd-todolist-api.onrender.com/tasks/" + id + "?api_key=1201",
    contentType: "application/json",
    dataType: "json",
    success: function (response, textStatus, errorMessage) {
      console.log({ response, errorMessage });
    },
    error: function (request, textStatus, errorMessage) {
      console.log({ request, textStatus, errorMessage });
    },
  });
  getTasks();
};

var completeTask = function (id) {
  $.ajax({
    type: "PUT",
    url:
      "https://fewd-todolist-api.onrender.com/tasks/" +
      id +
      "/mark_complete?api_key=1201",
    contentType: "application/json",
    dataType: "json",
    success: function (response, textStatus) {
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
  getTasks();
};
