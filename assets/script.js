// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const localeSettings = {};
dayjs.locale(localeSettings);
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  const currentHour = dayjs().format('HH');

  function hourlyColor() {
    const blocks = document.querySelectorAll('.time-block');
    blocks.forEach((block) => {
      const blockHour = parseInt(block.id);
      block.classList.toggle('past', blockHour < currentHour);
      block.classList.toggle('present', blockHour === currentHour);
      block.classList.toggle('future', blockHour > currentHour);
    });
  }

  function textEntry() {
    const buttons = document.querySelectorAll('.saveBtn');
    
    buttons.forEach((button) => {
      button.addEventListener('click', function() {
        const key = this.parentElement.getAttribute('id');
        const value = this.previousElementSibling.value;
        localStorage.setItem(key, value);
      });
    });
  }

  function refreshColor() {
    $('.time-block').each(function() {
      const blockHour = parseInt(this.id);
      if (blockHour == currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else if (blockHour < currentHour) {
        $(this).removeClass('future present').addClass('past');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  $('.time-block').each(function() {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });

  function updateTime() {
    const dateElement = $('#date');
    const timeElement = $('#time');
    const currentDate = dayjs().format('dddd, MMMM D, YYYY');
    const currentTime = dayjs().format('hh:mm:ss A');
    dateElement.text(currentDate);
    timeElement.text(currentTime);
  }
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  (function() {
    hourlyColor();
    textEntry();
    refreshColor();
  })();
  // TODO: Add code to display the current date in the header of the page.
  setInterval(updateTime, 1000);
});
