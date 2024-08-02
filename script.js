// JOURNAL CODE
// ALL VARIABLES
var diaryEntry = $('.diaryEntry');
var diaryEntryButton = $('.diaryEntryButton');
var diaryEntries = $('.diaryEntries');

// EVENT LISTNER
diaryEntryButton.on("click", insertDiaryEntry);

// FUNCTION
function insertDiaryEntry() {
  const date = new Date();

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var currentDate = `${day}/${month}/${year}`;

  var diaryEntryContents = diaryEntry.val();

  if (diaryEntryContents !== "") {
    var entryHTML = `
        <div class="diaryentryBox">
          <p><strong>${currentDate}:</strong></p>
          <p>${diaryEntryContents}</p>
        </div>
      `;

    diaryEntries.append(entryHTML);
    diaryEntry.val(''); // Clear the textarea after submission
  }
}

// DARK/LIGHT MODE
// VARIABLES
var body = $('body');
var changeModeButton = $('.changeModeButton');

// Check the saved mode on page load and apply it
$(document).ready(function() {
  if (localStorage.getItem('darkMode') === 'enabled') {
    body.addClass('darkMode');
  }
});

// EVENT LISTENER
changeModeButton.on('click', changeMode);

// FUNCTION
function changeMode() {
  body.toggleClass('darkMode');

  // Save the mode in localStorage
  if (body.hasClass('darkMode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.removeItem('darkMode');
  }
}