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

async function getQuotes() {
  try {
    let res = await fetch(
      "https://api.api-ninjas.com/v2/quotes?categories=success,wisdom",
      {
        method: "GET",
        headers: {
          "X-Api-Key": "YOUR_API_KEY_HERE"
        }
      }
    );

    if (!res.ok) {
      throw new Error("Request failed");
    }

    let data = await res.json();
    console.log(data);

  } catch (err) {
    console.log("Error:", err);
  }
}

getQuotes();

  