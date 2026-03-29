let form = document.querySelector(".addTask form");
function openFeatures() {
  let allElems = document.querySelectorAll(".elem");
  let allfullElemsPage = document.querySelectorAll(".fullElem");
  let allfullElemsBackBtn = document.querySelectorAll(".fullElem .back");
  allElems.forEach(function (elem) {
    elem.addEventListener("click", function (e) {
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

function Pomodoro() {
  const timerEl = document.querySelector(".pomo-timer h1");
  const startBtn = document.querySelector(".start-timer");
  const pauseBtn = document.querySelector(".pause-timer");
  const resetBtn = document.querySelector(".reset-timer");
  const sessionEl = document.querySelector(".session");

  let isWorkSession = true;
  let duration = 25 * 60; // seconds
  let startTime = null;
  let pausedTime = 0;
  let interval = null;

  // 🔁 Load saved state (optional but powerful)
  function loadState() {
    const saved = JSON.parse(localStorage.getItem("pomoState"));
    if (saved) {
      isWorkSession = saved.isWorkSession;
      duration = saved.duration;
      startTime = saved.startTime;
      pausedTime = saved.pausedTime || 0;
    }
  }

  function saveState() {
    localStorage.setItem(
      "pomoState",
      JSON.stringify({
        isWorkSession,
        duration,
        startTime,
        pausedTime,
      })
    );
  }

  function updateUI(remaining) {
    let min = Math.floor(remaining / 60);
    let sec = remaining % 60;

    timerEl.innerText =
      `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  function updateSessionUI() {
    if (isWorkSession) {
      sessionEl.innerText = "Work Session";
      sessionEl.style.backgroundColor = "var(--green)";
    } else {
      sessionEl.innerText = "Break Time";
      sessionEl.style.backgroundColor = "var(--blue)";
    }
  }

  function tick() {
    let elapsed = Math.floor((Date.now() - startTime) / 1000);
    let remaining = duration - elapsed;

    if (remaining <= 0) {
      switchSession();
      return;
    }

    updateUI(remaining);
  }

  function startTimer() {
    if (!startTime) {
      startTime = Date.now() - pausedTime;
    }

    clearInterval(interval);

    interval = setInterval(() => {
      tick();
      saveState();
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(interval);
    pausedTime = Date.now() - startTime;
    saveState();
  }

  function resetTimer() {
    clearInterval(interval);
    isWorkSession = true;
    duration = 25 * 60;
    startTime = null;
    pausedTime = 0;

    updateSessionUI();
    updateUI(duration);
    localStorage.removeItem("pomoState");
  }

  function switchSession() {
    clearInterval(interval);

    if (isWorkSession) {
      alert("Work session completed!");
      isWorkSession = false;
      duration = 5 * 60;
    } else {
      alert("Break finished!");
      isWorkSession = true;
      duration = 25 * 60;
    }

    startTime = Date.now();
    pausedTime = 0;

    updateSessionUI();
    startTimer();
  }
  loadState();
  updateSessionUI();

  if (startTime) {
    startTimer(); // resume automatically
  } else {
    updateUI(duration);
  }

 
  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
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
let headerDateH4 = document.querySelector(".header1 h4");
let DateH2 = document.querySelector(".header1 h2");
let temp = document.querySelector(".header2 h2");
let possibilityOfWheather = document.querySelector(".header2 h4");
let wind = document.querySelector(".wind span");
let precipiatation = document.querySelector(".precipiatation span");
let humidity = document.querySelector(".humidity span");

// Updating and loading wheather
async function wheatherAPICall(){
   let position = await getLocation();

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`
  );
  data = await response.json();
  wind.innerHTML= `${data.current.wind_kph} Km/h`;
  precipiatation.innerHTML=`${data.current.precip_in} %`;
  humidity.innerHTML=`${data.current.
humidity} %`
  let state =  data.location.region;
  let town = data.location.name;
  headerDateH4.innerHTML = `${town} ${state}`;
  temp.innerHTML=`${data.current.temp_c}°C`
  possibilityOfWheather.innerHTML= `${data.current.condition.text}`
  
}

var date =null;
function timeDate(){
  date = new Date();
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  let seconds = date.getSeconds();

let day = date.getDate();
let month = date.toLocaleString('en-US', { month: 'long' });
let year = date.getFullYear();
let resultsDate =`${day} ${month} ${year}`;
DateH2.textContent =resultsDate;
wheatherAPICall();


  

 if (hours > 12) {
  headerDateH1.innerHTML = `${hours - 12}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds} PM ${dayName}`;
} else {
  headerDateH1.innerHTML = `${hours === 0 ? 12 : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds} AM ${dayName}`;
}
}
setInterval(timeDate,1000);

}
navbarFunctionality();

function changingTheme(){
  let theme = document.querySelector(".theme");
let rootElement = document.documentElement;
let flag = 0;
theme.addEventListener("click",  function(){
  if(flag ===0){
  rootElement.style.setProperty('--pri','#DFD0B8');
  rootElement.style.setProperty('--sec','#222831');
  rootElement.style.setProperty('--tri1','#948979');
  rootElement.style.setProperty('--tri2','#393E46');
    flag =1;
  }
  else if(flag === 1){
   rootElement.style.setProperty('--pri','#feba17');
  rootElement.style.setProperty('--sec','#74512d');
  rootElement.style.setProperty('--tri1','#948979');
  rootElement.style.setProperty('--tri2','#f8f4e1');
 flag=2;
  }
  else if(flag ===2){
   rootElement.style.setProperty('--pri','#B0E4CC');
  rootElement.style.setProperty('--sec','#408A71');
  rootElement.style.setProperty('--tri1','#285A48');
  rootElement.style.setProperty('--tri2','#091413');
  flag=3;
  }
  else if(flag === 3){
     rootElement.style.setProperty('--pri','#f8f4e1');
  rootElement.style.setProperty('--sec','#381c0a');
  rootElement.style.setProperty('--tri1','#feba17');
  rootElement.style.setProperty('--tri2','#74512d');
  flag=0;
  }
  
  
})

}
changingTheme();