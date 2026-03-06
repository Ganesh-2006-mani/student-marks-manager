const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const marksInput = document.getElementById("marks");
const studentList = document.getElementById("studentList");

let students = JSON.parse(localStorage.getItem("students")) || [];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addStudent();
});

function addStudent() {
  const name = nameInput.value.trim();
  const marks = marksInput.value.trim();

  if (name === "" || marks === "") {
    alert("Enter both name and marks");
    return;
  }

  if (marks < 0 || marks > 100) {
    alert("Marks must be between 0 and 100");
    return;
  }

  const student = {
    name,
    marks: Number(marks),
    grade: calculateGrade(marks)
  };

  students.push(student);
  saveData();
  displayStudents();

  nameInput.value = "";
  marksInput.value = "";
}

function calculateGrade(marks) {
  if (marks >= 90) return "A";
  else if (marks >= 80) return "B";
  else if (marks >= 65) return "C";
  else if (marks >= 55) return "D";
  else if (marks >=35) return "E";
  else return "F";
}

function displayStudents() {
  studentList.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.marks}</td>
      <td>${student.grade}</td>
      <td><button class="delete-btn" onclick="deleteStudent(${index})">Delete</button></td>
    `;

    studentList.appendChild(row);
  });
}

function deleteStudent(index) {
  students.splice(index, 1);
  saveData();
  displayStudents();
}

function saveData() {
  localStorage.setItem("students", JSON.stringify(students));
}

displayStudents();
