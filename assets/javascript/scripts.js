let dateButton=document.getElementById("calendar");

//Changing date format

let currentDatetime = new Date();
const months = ["January", "February" , "March",
                "April"  , "May"      , "June", 
                "July"   , "August"   , "September", 
                "October", "November" , "December"  ];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let dateEnding="th";



function dateEndingChanger() {
    let iDate=currentDatetime.getDate();
    if ([1, 21, 31].includes(iDate)) {
        dateEnding="st";
    } else if ([2, 22].includes(iDate))  {
        dateEnding="nd";
    } else if ([3, 23].includes(iDate))  {
        dateEnding="d";
    } else {
        dateEnding="th";
    }
}


dateButton.addEventListener("click", dateEndingChanger());

let formattedDate =   days[currentDatetime.getDay()]         + " "
                    + currentDatetime.getDate() + dateEnding + " " 
                    + months[currentDatetime.getMonth()]     + " " 
                    + currentDatetime.getFullYear();

//Switching HTML element into the date

dateButton.addEventListener("click", function() {
    document.getElementById("whatDay").innerHTML="Today is " + formattedDate;
});

//Switching HTML element into the time

let timeButton=document.getElementById("timeNow");

function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM'; /*Short version of if...else statement*/
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes; /*Changes the time into a string, nevertheless, it avoids writing e.g. 4.4PM*/
    let formattedTime = hours + '.' + minutes + ' ' + ampm;
    return formattedTime;
  }

timeButton.addEventListener("click", function() {
    document.getElementById("whatTime").innerHTML=formatAMPM(new Date());
});

//Showing today's task
let showTaskButton=document.getElementById("ToDo");
let weekdays=days[currentDatetime.getDay()];
showTaskButton.addEventListener("click", function() {
    let table = document.createElement('table');
    table.setAttribute('border','0');
    table.setAttribute('width','100%');
    let header = table.createTHead();
    let row = header.insertRow(0);    
    let cell = row.insertCell(0);
    cell.innerHTML = `<b>Your tasks on ${weekdays}</b>`;
    
    fetch('https://cors-anywhere.herokuapp.com/git.wd-agency.com/snippets/2/raw')
    .then(response => response.json())
    .then(tasks =>{
         let todaysTasks = tasks.filter(task => task.day === weekdays);
         console.log(todaysTasks);
        for (let x in todaysTasks) {
            row = table.insertRow(x);
            cell = row.insertCell();
            cell.setAttribute('align','left');
            text = document.createTextNode(todaysTasks[x].description);
            cell.appendChild(text);
            cell = row.insertCell();
            cell.setAttribute('align','left');
            text = document.createTextNode(todaysTasks[x].time);
            cell.appendChild(text);
            }
            document.getElementById("whatTask").firstChild.remove();
            document.getElementById("whatTask").appendChild(table);
        })
    .catch(error   => console.error(error));
});

// Title changer
let changeTitleButton=document.getElementById("newTitle");
changeTitleButton.addEventListener("click", function(event) {
    let new_title=document.getElementById("ourField").value;
    if (new_title) {
        document.title = new_title;
    } else{
        alert('Title should not be empty');
    }
});

// Background color changer

let colorSelector= document.getElementById("colorSelector")
colorSelector.addEventListener("change", function() {
    let new_bc=document.getElementById("colorSelector").value;
    document.body.style.background = new_bc;
});
