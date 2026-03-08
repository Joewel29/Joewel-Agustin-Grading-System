
// Go back
function goBack() {
    window.location.href = "index.html";
}

// Display Records
function displayRecords() {
    const table = document.getElementById('recordTable');
    table.innerHTML = '';

    let records = JSON.parse(localStorage.getItem('records')) || [];

    records.forEach((record, index) => {
        table.innerHTML += `
            <tr>
                <td>${record.name}</td>
                <td>${record.section}</td>
                <td>${record.average}</td>
                <td><button onclick="viewDetails(${index})">View</button></td>
                <td><button onclick="deleteRecord(${index})">Delete</button></td>
            </tr>
        `;
    });
}

// View Full Grades
function viewDetails(index) {
    let records = JSON.parse(localStorage.getItem('records')) || [];
    const record = records[index];

    let message = `Student: ${record.name}\nSection: ${record.section}\nAverage: ${record.average}\n\nGrades:\n`;

    const subjects = ["IAS 302","SA 301","SIA 302","IT ELECT 3","IT ELEC 4","CAP301"];

    record.scores.forEach((score, i) => {
        message += `${subjects[i]}: ${score}%\n`;
    });

    alert(message);
}

// Delete
function deleteRecord(index) {
    if(confirm("Delete this record?")) {
        let records = JSON.parse(localStorage.getItem('records')) || [];
        records.splice(index,1);
        localStorage.setItem('records', JSON.stringify(records));
        displayRecords();
    }
}

window.onload = displayRecords;
