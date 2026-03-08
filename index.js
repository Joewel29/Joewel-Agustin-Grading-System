
let editIndex = null;


/* ================================
   LIVE STUDENT NAME + SECTION
================================ */

document.getElementById('studentName').addEventListener('input', function () {
    document.getElementById('displayName').innerText = this.value || '-';
});

document.getElementById('studentSection').addEventListener('input', function () {
    document.getElementById('displaySection').innerText = this.value || '-';
});

/* ================================
   SUBJECT LIST
================================ */

let subjects = [
    "IAS 302",
    "SA 301",
    "SIA 302",
    "IT ELECT 3",
    "IT ELECT 4",
    "CAP 301"
];

/* ================================
   LOAD SUBJECTS
================================ */

function loadSubjects() {

    const select = document.getElementById("subjectIndex");
    const table = document.getElementById("subjectTable");

    select.innerHTML = "";
    table.innerHTML = "";

    subjects.forEach((subject, index) => {

        const option = document.createElement("option");
        option.value = index;
        option.text = subject;
        select.appendChild(option);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${subject}</td>
            <td><input type="number" class="score" min="0" max="100" oninput="calculateAverage()"></td>
            <td class="remark"></td>
        `;

        table.appendChild(row);

    });

}

/* ================================
   ADD SUBJECT
================================ */

function addSubject() {

    const newName = document.getElementById("newSubject").value.trim();

    if (newName === "") {
        alert("Enter subject name.");
        return;
    }

    subjects.push(newName);

    document.getElementById("newSubject").value = "";

    loadSubjects();

    showNotification("New Subject Added!");

}

/* ================================
   EDIT SUBJECT
================================ */

function changeSubject() {

    const select = document.getElementById("subjectIndex");
    const newName = document.getElementById("newSubject").value.trim();

    if (newName === "") {
        alert("Please enter a new subject name.");
        return;
    }

    const index = select.selectedIndex;

    subjects[index] = newName;

    document.getElementById("newSubject").value = "";

    loadSubjects();

    showNotification("Subject Updated!");

}

/* ================================
   DELETE SUBJECT
================================ */

function deleteSubject() {

    const select = document.getElementById("subjectIndex");
    const index = select.selectedIndex;

    if (subjects.length === 0) {
        alert("No subjects to delete.");
        return;
    }

    if (!confirm("Delete this subject?")) return;

    subjects.splice(index, 1);

    loadSubjects();

    showNotification("Subject Deleted!");

}

/* ================================
   REMARK SYSTEM
================================ */

function getRemark(score) {

    if (score >= 90) return "Excellent";
    if (score >= 85) return "Very Good";
    if (score >= 80) return "Good";
    if (score >= 75) return "Passed";
    if (score >= 70) return "Fair";

    return "Failed";

}

/* ================================
   CALCULATE AVERAGE
================================ */

function calculateAverage() {

    const scores = document.querySelectorAll('.score');
    const remarks = document.querySelectorAll('.remark');

    let total = 0;
    let count = 0;

    scores.forEach((input, i) => {

        const value = parseFloat(input.value);

        if (!isNaN(value)) {

            total += value;
            count++;

            remarks[i].innerText = getRemark(value);

        } else {

            remarks[i].innerText = "";

        }

    });

    const average = count ? (total / count).toFixed(2) : 0;

    document.getElementById("average").innerText =
        "Total Average: " + average + "%";

    const status = document.getElementById("resultStatus");

    if (average >= 75) {

        status.innerHTML =
            "<span style='color:#00ff88;font-size:22px;font-weight:bold'>PASSED</span>";

    } else {

        status.innerHTML =
            "<span style='color:#ff4d4d;font-size:22px;font-weight:bold'>FAILED</span>";

    }

}

/* ================================
   SAVE RECORD (LOCAL STORAGE)
================================ */

function saveRecord() {

    const name = document.getElementById('studentName').value.trim();
    const section = document.getElementById('studentSection').value.trim();

    if (name === "" || section === "") {
        alert("Please enter student name and section.");
        return;
    }

    const scores = [];

    document.querySelectorAll('.score').forEach(input => {
        scores.push(input.value);
    });

    const average = document.getElementById('average').innerText
        .replace("Total Average: ", "")
        .replace("%", "");

    const record = { name, section, scores, average };

    let records = JSON.parse(localStorage.getItem("records")) || [];

    if (editIndex !== null) {

        records[editIndex] = record;
        editIndex = null;

    } else {

        records.push(record);

    }

    localStorage.setItem("records", JSON.stringify(records));

    resetForm();

    showNotification("Record Saved Successfully!");

}

/* ================================
   RESET FORM
================================ */

function resetForm() {

    document.getElementById('studentName').value = '';
    document.getElementById('studentSection').value = '';

    document.getElementById('displayName').innerText = '-';
    document.getElementById('displaySection').innerText = '-';

    document.querySelectorAll('.score').forEach(input => input.value = '');

    document.querySelectorAll('.remark').forEach(cell => cell.innerText = '');

    document.getElementById('average').innerText = "Total Average: 0%";

    document.getElementById('resultStatus').innerHTML = "";

}

/* ================================
   NOTIFICATION
================================ */

function showNotification(message, duration = 2000) {

    const notification = document.getElementById('notification');

    notification.innerText = message;

    notification.style.opacity = 1;
    notification.style.transform = "translateX(-50%) translateY(0)";

    setTimeout(() => {

        notification.style.opacity = 0;
        notification.style.transform = "translateX(-50%) translateY(50px)";

    }, duration);

}




/* ================================
   LOAD PAGE
================================ */

window.onload = function () {
    

    loadSubjects();

};