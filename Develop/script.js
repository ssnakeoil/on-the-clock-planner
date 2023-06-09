// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  $(".saveBtn").on("click", function () {
    var text = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");
    localStorage.setItem(time, text);
  });
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  function timeBlocker() {
    var currentHour = dayjs().hour(); //gets current hour
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]); //split the id and get the second part of the array
      if (blockHour < currentHour) {//block hour is less than current hour
        $(this).addClass("past"); //add past class to "time-block" class objects
      } else if (blockHour === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
      } else { //all other conditions would be future
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    });
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  for (var i = 9; i < 18; i++) {//loop through the time blocks
    var text = localStorage.getItem("hour-" + i);
    $("#hour-" + i + " .description").val(text);
  }
  timeBlocker();
  
  // TODO: Add code to display the current date in the header of the page.
  //display current day
  $("#currentDay").text(dayjs().format("dddd, DD MMMM YYYY"));
});
