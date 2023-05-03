function saveEmp() {
    var ID = document.getElementById("ID").value;
    var FName = document.getElementById("FName").value;
    var LName = document.getElementById("LName").value;
    var Age = document.getElementById("Age").value;
    var Salary = document.getElementById("salary").value;
    var Department = document.getElementById("department").value;

    var data = {
        firstName: FName,
        lastName: LName,
        age: Age,
        salary: Salary,
        department: Department,
    };
    if (ID == "") {
        var xhr = new XMLHttpRequest();

        xhr.open(
            "POST",
            "https://employee-app-622d9-default-rtdb.firebaseio.com/Employee.json",
            true
        );
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    showEmp();
                }
            } else {
                console.log("Error in data");
            }
        };

        xhr.send(JSON.stringify(data));
    } else {
        var xhr2 = new XMLHttpRequest();
        xhr2.open(
            "PATCH",
            `https://employee-app-622d9-default-rtdb.firebaseio.com/Employee/${ID}/.json`,
            true
        );
        xhr2.setRequestHeader("Content-Type", "application/json");
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState == 4) {
                if (xhr2.status == 200) {
                    clearData();
                    showEmp();
                }
            } else {
                console.log("Error in data");
            }
        };
        xhr2.send(JSON.stringify(data));
    }
}
function showEmp() {
    var tableBody = document.querySelector("#StudentData>tbody");
    tableBody.innerHTML = "";
    var xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        "https://employee-app-622d9-default-rtdb.firebaseio.com/Employee.json",
        true
    );
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var info = xhr.response;
                var infoParsed = JSON.parse(info);
                console.log(infoParsed);
                for (let emp in infoParsed) {
                    var row = `<tr>
                    <td>${emp}</td>
                    <td>${infoParsed[emp].firstName}</td>
                    <td>${infoParsed[emp].lastName}</td>
                    <td>${infoParsed[emp].age}</td>
                    <td>${infoParsed[emp].salary}</td>
                    <td>${infoParsed[emp].department}</td>
                    <td>
                        <button class="btn btn-warning" onclick="setValueToUpdateStd('${emp}','${infoParsed[emp].firstName}','${infoParsed[emp].lastName}','${infoParsed[emp].age}','${infoParsed[emp].salary}','${infoParsed[emp].department}')"><i class="fas fa-edit"></i>Edit</button>
                        <button class="btn btn-danger" onclick="deleteEmp('${emp}')"><i class="fas fa-trash-alt"></i>Delete</button>
                    </td>
                `;
                    tableBody.innerHTML += row;
                }
            }
        } else {
            console.log("Error in data");
        }
    };
    xhr.send();
}

function setValueToUpdateStd(ID, FN, LN, age, Sal, depart) {
    document.getElementById("ID").value = ID;
    document.getElementById("FName").value = FN;
    document.getElementById("LName").value = LN;
    document.getElementById("Age").value = age;
    document.getElementById("salary").value = Sal;
    document.getElementById("department").value = depart;
}

function clearData() {
    document.getElementById("ID").value = "";
    document.getElementById("FName").value = "";
    document.getElementById("LName").value = "";
    document.getElementById("Age").value = "";
    document.getElementById("salary").value = "";
}

function deleteEmp(id) {
    var xhr = new XMLHttpRequest();
    let confirm1 = confirm("Are You Sure Delete this Item ?");
    if (confirm1) {
        xhr.open(
            "DELETE",
            `https://employee-app-622d9-default-rtdb.firebaseio.com/Employee/${id}/.json`,
            true
        );
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    showEmp();
                }
            } else {
                console.log("Error in data");
            }
        };
        xhr.send();
    }
}


function deleteAll() {
    var xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        "https://employee-app-622d9-default-rtdb.firebaseio.com/Employee.json",
        true
    );
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var info = xhr.response;
                var infoParsed = JSON.parse(info);
                let confirm1 = confirm("Are You Sure Delete All Items ?");
                if (confirm1) {
                    for (let emp in infoParsed) {
                        var deleteXhr = new XMLHttpRequest();
                        deleteXhr.open(
                            "DELETE",
                            `https://employee-app-622d9-default-rtdb.firebaseio.com/Employee/${emp}.json`,
                            true
                        );
                        deleteXhr.onreadystatechange = function () {
                            if (deleteXhr.readyState == 4) {
                                if (deleteXhr.status == 200) {
                                    console.log(`Employees deleted`);
                                } else {
                                    console.log(`Error deleting employees`);
                                }
                            }
                        };
                        deleteXhr.send();
                    }
                    showEmp();
                }
            } else {
                console.log("Error in data");
            }
        }
    };
    xhr.send();
}

function getEmpById() {
    let empId = document.getElementById("empId").value;
    var tableBody = document.querySelector("#StudentData>tbody");
    tableBody.innerHTML = "";
    var xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        `https://employee-app-622d9-default-rtdb.firebaseio.com/Employee/${empId}/.json`,
        true
    );
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var info = xhr.response;
                var infoParsed = JSON.parse(info);
                var row = `<tr>
                    <td>${empId}</td>
                    <td>${infoParsed.firstName}</td>
                    <td>${infoParsed.lastName}</td>
                    <td>${infoParsed.age}</td>
                    <td>${infoParsed.salary}</td>
                    <td>${infoParsed.department}</td>
                `;
                tableBody.innerHTML += row;
            } else {
                console.log("Error in data");
            }
        }
    };
    xhr.send();
}