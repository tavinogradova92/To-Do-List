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

// -- I failed to read local file, see bellow functions I tried :-(
//-- Hope to fix it after hosting on github
var insertedTasks = '[{"id": 1,"day": "Monday","time": "08:00","description": "Laugh to Your Heart’s Content"},{"id": 2,"day": "Monday","time": "11:00","description": "Dance Like No One’s Watching"},{"id": 3,"day": "Monday","time": "16:00","description": "Make Dinner for homeless guy"},{"id": 4,"day": "Tuesday","time": "07:00","description": "Change Your Morning Routine"},{"id": 5,"day": "Tuesday","time": "10:00","description": "Go People Watching"},{"id": 6,"day": "Tuesday","time": "18:00","description": "Do Something Stupid"},{"id": 7,"day": "Wednesday","time": "08:00","description": "Sing in the Shower"},{"id": 8,"day": "Wednesday","time": "13:00","description": "Listen to Nature Sounds"},{"id": 9,"day": "Wednesday","time": "15:00","description": "Join a Club"},{"id": 10,"day": "Thursday","time": "06:00","description": "Strike a Pose"},{"id": 11,"day": "Thursday","time": "09:00","description": " Challenge Yourself"},{"id": 12,"day": "Thursday","time": "20:00","description": "Reconnect with an Old Friend"},{"id": 13,"day": "Friday","time": "09:00","description": "Learn a Joke"},{"id": 14,"day": "Friday","time": "12:00","description": "Become an Expert"},{"id": 15,"day": "Friday","time": "19:00","description": "Take a Class"},{"id": 16,"day": "Saturday","time": "07:00","description": "Change Your Look"},{"id": 17,"day": "Saturday","time": "12:00","description": "Excite Your Palate"},{"id": 18,"day": "Saturday","time": "21:00","description": "Begin a Diary"},{"id": 19,"day": "Sunday","time": "10:00","description": "Embrace Your Curiosity"},{"id": 20,"day": "Sunday","time": "11:00","description": "Pretend to Be a Tourist"},{"id": 21,"day": "Sunday","time": "17:00","description": "Drive Away with No Destination in Mind"}]';
const json=JSON.parse(insertedTasks);
let todaysTasks = json.filter(task => task.day === weekdays);
//console.log(todaysTasks);


let paragraphToChange=document.getElementById("whatTask");
let createTable = document.createElement("table");

showTaskButton.addEventListener("click", function() {
    let table = document.createElement('table');
    table.setAttribute('border','0');
    table.setAttribute('width','100%');

    let header = table.createTHead();
    let row = header.insertRow(0);    
    let cell = row.insertCell(0);
    cell.innerHTML = `<b>Your tasks on ${weekdays}</b>`;

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

    document.getElementById("whatTask").appendChild(table);
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

//------------------------------------------------
// Functions I tried to load local JSON 
// but failed to do it locally
//------------------------------------------------
function load_json_fetch() {
    fetch('tasks.json', {mode: 'no-cors'})
    .then(response => response.text())
    .then(data=> console.log(data))
    .catch(error => console.error(error));
}
//  Error
//  Fetch API cannot load file:///D:/docs/Tanya/Frontend/Wiredelta/assets/javascript/tasks.json. URL scheme "file" is not supported.

function load_json_XmlReq(callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'tasks.json', true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
 //  Error
//  read_json_demo.js:29 Access to XMLHttpRequest at 'file:///D:/docs/Tanya/Frontend/Wiredelta/assets/javascript/tasks.json' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.


