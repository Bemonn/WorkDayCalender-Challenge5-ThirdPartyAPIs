//code wrap and dayjs
const localeSettings = {};
dayjs.locale(localeSettings);
$(function () {

  const currentHour = dayjs().format('HH');

  //function to change colour of each time block dependent on whether its "past", "present" or "future" according to the current hour
  function hourlyColor() {
    const blocks = document.querySelectorAll('.time-block');
    blocks.forEach((block) => {
      const blockHour = parseInt(block.id);
      block.classList.toggle('past', blockHour < currentHour);
      block.classList.toggle('present', blockHour === currentHour);
      block.classList.toggle('future', blockHour > currentHour);
    });
  }
//end

//function to save the user's input in a textarea when the corresponding save button is clicked to the localStorage
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
//end

//function to change colour of time blocks according to time of day
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
//end

//retrieves user input for the localStorage to keep textarea values
  $('.time-block').each(function() {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });
//end

 //Three main call functions to make the page function properly
  (function() {
    hourlyColor();
    textEntry();
    refreshColor();
  })();
  //end

  //function to set the time every second at the top of the page
  function updateTime() {
    const dateElement = $('#date');
    const timeElement = $('#time');
    const currentDate = dayjs().format('dddd, MMMM D, YYYY');
    const currentTime = dayjs().format('hh:mm:ss A');
    dateElement.text(currentDate);
    timeElement.text(currentTime);
  }
   //end

   //updates the time every second
  setInterval(updateTime, 1000);
});
