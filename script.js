let form = document.querySelector(".addTask form");
function openFeatures() {
  let allElems = document.querySelectorAll(".elem");
  let allfullElemsPage = document.querySelectorAll(".fullElem");
  let allfullElemsBackBtn = document.querySelectorAll(".fullElem .back");
  allElems.forEach(function (elem) {
    elem.addEventListener("click", function (e) {
      console.log(elem.id);
      allfullElemsPage[elem.id].style.display = "block";
    });
  });
  allfullElemsBackBtn.forEach(function (back) {
    back.addEventListener("click", function (e) {
      let fullElem = e.target.closest(".fullElem");
      fullElem.style.display = "none";
    });
  });
}

let currentTask = [];
if (localStorage.getItem("currentTask")) {
  currentTask = JSON.parse(localStorage.getItem("currentTask"));
} else {
  console.log("Task list is empty");
}

openFeatures();

function todoList() {
  function renderTask() {
    localStorage.setItem("currentTask", JSON.stringify(currentTask));
    let allTask = document.querySelector(".allTask");
    let sum = "";
    currentTask.forEach((val, id) => {
      sum += `  <div  class="task">
                    <h5>${val.task} <span class=${val.imp}>imp</span></h5>
                   <div class="btnanddetail">
                     <details>
  <summary>Details</summary>
  <p>${val.details}</p>
</details>
                    <button id=${id} >Mark as Completed</button></div>
                   
                </div>`;
    });
    allTask.innerHTML = sum;
  }
  renderTask();

  let taskInput = document.querySelector(
    ".todo-container .addTask form #task-input",
  );
  let taskDetailInput = document.querySelector(".addTask form textarea");
  let taskCheckBox = document.querySelector(".addTask form #check");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailInput.value,
      imp: taskCheckBox.checked,
    });

    renderTask();
    taskInput.value = "";
    taskDetailInput.value = "";
    taskCheckBox.checked = false;
  });
  renderTask();
  document.querySelector(".allTask").addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      let index = Number(e.target.id);
      currentTask.splice(index, 1);
      renderTask();
    }
  });
}

todoList();
function dailyPlanner() {
  let dayPlanner = document.querySelector(".day-planner");
  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  let wholeDaySum = "";
  let hours = Array.from(
    { length: 18 },
    (elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`,
  );

  hours.forEach(function (elem, idx) {
    let savedData = dayPlanData[idx] || " ";

    wholeDaySum += ` <div class="day-planner-time">
                    <p>${elem}</p>
                    <input id=${idx} type="text" placeholder="..." value =${savedData}>
                </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;
  dayPlanner.addEventListener("input", function (e) {
    if (e.target.tagName === "INPUT") {
      dayPlanData[e.target.id] = e.target.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    }
  });
}
dailyPlanner();
function motivationalQoutes() {
  let Qoute = document.querySelector(".motivation-2 h1");
  let Author = document.querySelector(".motivation-3 h2");
  async function getQuotes() {
    let response = await fetch("https://api.quotable.io/random");
    let data = await response.json();
    console.log(Qoute);
    Qoute.innerHTML = data.content;
    Author.innerHTML = "- " + data.author;
  }
  getQuotes();
}
motivationalQoutes();

function Pomodoro(){
  let timer = document.querySelector(".pomo-timer h1");
let startBtn = document.querySelector(".pomo-timer .start-timer");
let pauseBtn = document.querySelector(".pomo-timer .pause-timer");
let resetBtn = document.querySelector(".pomo-timer .reset-timer");
let session = document.querySelector(".pomodoro-fullpage .session");
let isWorkSession = true;
let timerInterval = null;
let totalSeconds = 25 * 60;
function upDateTime() {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);
  seconds = seconds;
  timer.innerHTML = `${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')}`;
}

function pauseTimmer(){
  clearInterval(timerInterval);
  // timerInterval =null;
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
   if(isWorkSession){
   
       timerInterval = setInterval(() => {
    if (totalSeconds === 0) {
      pauseTimmer();
       timer.innerHTML = '05:00';
       session.innerHTML ="Take a Break";
       totalSeconds=5*60;
       session.style.backgroundColor ='var(--blue)';
      isWorkSession=false;

    } else {
      totalSeconds--;
      
      upDateTime();
    }
  }, 1000);
   }
   else{
     
       
       timerInterval = setInterval(() => {
    if (totalSeconds === 0) {
      pauseTimmer();
      session.innerHTML ="Work Session";
      session.style.backgroundColor ='var(--green)';
      totalSeconds =25*60;
      isWorkSession=true;
      upDateTime();

    } else {
      totalSeconds--;
      timer.innerHTML = '25:00';
      
      upDateTime();
    }
  },1000);
   }
 
   
}
function reset(){
  clearInterval(timerInterval);
  timerInterval = null;
  totalSeconds = 1500;
   session.innerHTML ="Work Session";
        session.style.backgroundColor ='var(--green)';
  upDateTime();
}

startBtn.addEventListener("click", function () {
  startTimer();
});
pauseBtn.addEventListener("click",function(){
  pauseTimmer();
})
resetBtn.addEventListener("click",function(){
  reset();
})



}
Pomodoro();
let lat =null;
let lon =null;


function navbarFunctionality(){
  function getLocation(){
 return  new Promise ((resolve,reject)=>{
   navigator.geolocation.getCurrentPosition(resolve, reject);
 })

}

let apiKey = 	`3b15ab7921914c5fa0305822262503`;
let data = null;
let headerDateH1 = document.querySelector(".header1 h1");
let headerDateH4 = document.querySelector(".header1 h4")
async function wheatherAPICall(){
   let position = await getLocation();

    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
 
  console.log(lat,lon);
  
  let response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`
  );
  data = await response.json();
  let state =  data.location.region;
  
  let town = data.location.name;
  headerDateH4.innerHTML = `${town} ${state}`;
  
}
wheatherAPICall();
var date =null;
function timeDate(){
  date = new Date();
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  let seconds = date.getSeconds();
  

 if (hours > 12) {
  headerDateH1.innerHTML = `${hours - 12}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds} PM ${dayName}`;
} else {
  headerDateH1.innerHTML = `${hours === 0 ? 12 : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds} AM ${dayName}`;
}
}
setInterval(timeDate,1000);

}
navbarFunctionality();