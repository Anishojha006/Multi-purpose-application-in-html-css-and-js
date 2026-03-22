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

// openFeatures();

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

// todoList();