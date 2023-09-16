"use strict";
import studentss from "./Studentinfo.js";
console.log(studentss);

let students = JSON.parse(localStorage.getItem("studentslist")) || studentss;
// Add Completestatus to students
if (!localStorage.getItem("studentslist"))
  students.forEach((e) => {
    e.CompleteStatus = false;
  });
let contentbox = document.querySelector(".contenteach");
let input = document.querySelector(".inputbox input");
let markbtn = document.querySelector(".markbtn");
let completed = document.querySelector(".completed");
let incompleted = document.querySelector(".incompleted");
let complete = 0;
let incomplete = 0;
let incompletelistbtn = document.querySelector(".incompletelist");
let completelistbtn = document.querySelector(".completelist");
let bothlistbtn = document.querySelector(".bothlist");
let makenewbtn = document.querySelector(".makenew");
let modeloverlay = document.querySelector(".modeloverlay");
let modeloption = document.querySelectorAll(".option");
input.focus();

// Finding the Complete and Incomplete Length
let findstatuslength = function () {
  incomplete = 0;
  complete = 0;
  students.forEach((e) => {
    if (e.CompleteStatus == false) incomplete++;
    else complete++;
  });
};

findstatuslength();
let unmarkItem = function (p, index) {
  p.style.textDecoration = "none";
  p.style.backgroundColor = "#666";
  complete -= 1;
  incomplete += 1;
  incompleted.textContent = incomplete;
  completed.textContent = complete;
  p.dataset.complete = false;
  students[index].CompleteStatus = false;
};

// Model Yes or NO Control
let modalYesButton = document.querySelector(".option-yes");
let modalNoButton = document.querySelector(".option-no");

let yesopertion = function (p, index) {
  modeloverlay.classList.remove("displaymodel");
  unmarkItem(p, index);
  console.log("hello yes");
  modalYesButton.removeEventListener("click", myListener);
  modalNoButton.removeEventListener("click", noopertion);
};
let noopertion = function () {
  modeloverlay.classList.remove("displaymodel");
  console.log("hello no");
  modalYesButton.removeEventListener("click", myListener);
  modalNoButton.removeEventListener("click", noopertion);
};
let myListener;
let ShowOverRideModel = function (p, index) {
  modeloverlay.classList.add("displaymodel");
  document.querySelector(".model-container h1 span").textContent =
    p.textContent;
  myListener = function (event) {
    yesopertion(p, index);
  };
  modalYesButton.addEventListener("click", myListener);
  modalNoButton.addEventListener("click", noopertion);
};

let strick = function (p, index) {
  if (p.style.textDecoration != "line-through") {
    p.style.textDecoration = "line-through";
    p.style.backgroundColor = "#ccc";
    complete += 1;
    incomplete -= 1;
    incompleted.textContent = incomplete;
    completed.textContent = complete;
    p.dataset.complete = true;
    students[index].CompleteStatus = true;
  } else if (p.style.textDecoration == "line-through") {
    ShowOverRideModel(p, index);
  }
  localStorage.setItem("studentslist", JSON.stringify(students));
};

let makestudentlist = function (maketype) {
  if (maketype == "both") {
    students.forEach((e, index) => {
      let p = document.createElement("p");
      // p.textContent = `<p>${e.Sno} ${e.RegNo} ${e.Name}</p>`;
      p.textContent = `${e.Sno} ${e.RegNo} ${e.Name}`;
      p.dataset.regno = e.RegNo;
      // p.addEventListener("");
      p.addEventListener("click", () => strick(p, index));

      if (e.CompleteStatus == true) {
        p.style.textDecoration = "line-through";
        p.style.backgroundColor = "#ccc";
      }
      contentbox.appendChild(p);
      // incomplete += 1;
      incompleted.textContent = incomplete;
      completed.textContent = complete;
      // contentbox.innerHTML += list;
    });
  } else if (maketype == "complete") {
    students.forEach((e, index) => {
      if (e.CompleteStatus == true) {
        let p = document.createElement("p");
        p.textContent = `${e.Sno} ${e.RegNo} ${e.Name}`;
        p.dataset.regno = e.RegNo;
        p.addEventListener("click", () => strick(p, index));
        contentbox.appendChild(p);
        incompleted.textContent = incomplete;
        completed.textContent = complete;
      }
    });
  } else if (maketype == "incomplete") {
    students.forEach((e, index) => {
      console.log(e.CompleteStatus);
      if (e.CompleteStatus == false) {
        let p = document.createElement("p");
        p.textContent = `${e.Sno} ${e.RegNo} ${e.Name}`;
        p.dataset.regno = e.RegNo;
        p.addEventListener("click", () => strick(p, index));
        contentbox.appendChild(p);
        incompleted.textContent = incomplete;
        completed.textContent = complete;
      }
    });
  }
};

makestudentlist("both");

let contentlist = document.querySelectorAll(".contenteach p");

let findstudent = function (rno) {
  contentlist.forEach((p, index) => {
    if (p.dataset.regno == rno) strick(p, index);
  });
};

let markstudent = function () {
  if (input.value) {
    let val = input.value;
    let rno;
    if (val.length == 2) rno = "731521130" + val;
    else rno = "73152113" + val;
    findstudent(rno);
    input.value = "";
    input.focus();
  } else alert("Empty Field");
};

markbtn.addEventListener("click", markstudent);
document.addEventListener("keypress", (e) => {
  if (e.key == "Enter") markstudent();
});

let findincomplete = function () {
  contentbox.innerHTML = "";
  makestudentlist("incomplete");
};
let findcomplete = function () {
  contentbox.innerHTML = "";
  makestudentlist("complete");
};
let findboth = function () {
  contentbox.innerHTML = "";
  makestudentlist("both");
};
incompletelistbtn.addEventListener("click", findincomplete);
completelistbtn.addEventListener("click", findcomplete);
bothlistbtn.addEventListener("click", findboth);

// Making new list
let makenewlist = function () {
  students = studentss;
  students.forEach((e) => {
    e.CompleteStatus = false;
  });
  localStorage.setItem("studentslist", JSON.stringify(students));
  findstatuslength();
  contentbox.innerHTML = "";
  makestudentlist("both");
};

makenewbtn.addEventListener("click", makenewlist);
