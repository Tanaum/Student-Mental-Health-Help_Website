// JOURNAL CODE
// ALL VARIABLES
var diaryEntry = $('.diaryEntry');
var diaryEntryButton = $('.diaryEntryButton');
var diaryEntries = $('.diaryEntries');

//stores all of the keys so that they can be arranged
const timestampKeys = [];

// EVENT LISTNER
diaryEntryButton.on("click", saveDiaryContent);

// On document ready, only display entries if the container exists (PrvEnt.html)
$(document).ready(displayPreviousEntries);

// FUNCTION

//SAVING CONTENT GIVEN BY THE USER
function saveDiaryContent(){
    //DATE
    var d = new Date()
    var date = d.getDate();
    var month = d.getMonth()+1;
    var year = d.getFullYear();

    //DIARY PAGE OBJECT
    const diaryPage = {
        todaysDate : `${date}/${month}/${year}`,
        diaryContent : diaryEntry.val()
    };

    if (diaryPage.diaryContent !== ""){
        localStorage.setItem(`${Date.now()}`,JSON.stringify(diaryPage));
    }

    diaryEntry.val(''); // Clear the textarea after submission

    var entryHTML = `
            <div class="diaryentryBox">
                <p><strong>${diaryPage.todaysDate}:</strong></p>
                <p>${diaryPage.diaryContent}</p>
            </div>
        `;

    diaryEntries.append(entryHTML);
};

function displayPreviousEntries(){
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        timestampKeys.push(Number(key));
    }

    // Sort keys ascending (oldest to newest)
    timestampKeys.sort((a, b) => a - b);

    // Now loop through in order
    timestampKeys.forEach(keyNum => {
        let diaryEntry = JSON.parse(localStorage.getItem(keyNum.toString()));
    //  alert(`${diaryEntry.todaysDate}: ${diaryEntry.diaryContent}`);
        
        var entryHTML = `
            <div class="diaryentryBox">
                <p><strong>${diaryEntry.todaysDate}:</strong></p>
                <p>${diaryEntry.diaryContent}</p>
            </div>
        `;

        diaryEntries.append(entryHTML);
    });
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