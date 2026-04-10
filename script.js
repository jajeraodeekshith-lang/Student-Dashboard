let students = [];

    const table = document.getElementById("studentTable");

    document.getElementById("addBtn").addEventListener("click", addStudent);

    function addStudent() {
        let name = document.getElementById("name").value.trim();
        let roll = document.getElementById("roll").value.trim();
        let marks = document.getElementById("marks").value.trim();

        if (name === "" || roll === "" || marks === "") {
            alert("Please fill all fields");
            return;
        }

        if (students.some(student => student.roll === roll)) {
            alert("This roll number already exists. Please enter a unique roll number.");
            return;
        }

        const numericMarks = Number(marks);
        if (!Number.isInteger(numericMarks) || numericMarks < 1 || numericMarks > 100) {
            alert("Marks must be an integer between 1 and 100.");
            return;
        }

        let student = { name, roll, marks: numericMarks };
        students.push(student);

        renderTable();

        // clear inputs
        document.getElementById("name").value = "";
        document.getElementById("roll").value = "";
        document.getElementById("marks").value = "";
    }

    function renderTable() {
        table.innerHTML = "";

        students.forEach((stu, index) => {
            let row = document.createElement("tr");

            // pass/fail logic
            if (stu.marks >= 40) {
                row.classList.add("pass");
            } else {
                row.classList.add("fail");
            }

            // cells
            let serialnum = document.createElement("td");
            serialnum.textContent = index + 1;

            let nameCell = document.createElement("td");
            nameCell.textContent = stu.name;

            let rollCell = document.createElement("td");
            rollCell.textContent = stu.roll;

            let marksCell = document.createElement("td");
            marksCell.textContent = stu.marks;

            let statusCell = document.createElement("td");
            statusCell.textContent = stu.marks >= 40 ? "Pass" : "Fail";

            let actionCell = document.createElement("td");
            let delBtn = document.createElement("button");
            delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            delBtn.classList.add("delete");

            delBtn.addEventListener("click", () => {
                students.splice(index, 1);
                renderTable();
            });

            actionCell.appendChild(delBtn);

            // append cells
            row.appendChild(serialnum);
            row.appendChild(nameCell);
            row.appendChild(rollCell);
            row.appendChild(marksCell);
            row.appendChild(statusCell);
            row.appendChild(actionCell);

            table.appendChild(row);
        });
    }