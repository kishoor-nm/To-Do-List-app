document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("input");
    const add = document.getElementById("add");
    const table = document.querySelector("table tbody");
    const clearall = document.getElementById("clearall");
    const success = document.getElementById("success");

    let n = 1;

    //Alert Messages
    let alertMessage;
    function successAlert(message) {
        success.innerHTML = `${message} ToDo SuccessFully`;
        success.style.display = "block";
        clearTimeout(alertMessage);
        alertMessage = setTimeout(() => {
            success.style.display = "none";
        }, 5000);
    }


    //Add Button
    add.addEventListener("click", addList);

    function addList() {
        let inputValue = input.value.trim();
        if (inputValue) {
            createList(inputValue);
            localStorageTodo();
            input.value = "";
            successAlert("Added");
        } else {
            alert("Please enter your todo ");
        }
    }

    //Create List
    function createList(todoList) {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${n}</td>
                        <td>${todoList}</td>
                        <td><button class="clear btn btn-danger">X</button></td>`;
        table.appendChild(tr);
        n++;
    }

    //Clear Button
    document.addEventListener("click", clearList);

    function clearList(event) {
        if (event.target.innerHTML == "X") {
            event.target.parentNode.parentNode.remove();
            localStorageTodo();
            n--;
            successAlert("Deleted");
        }
    }

    //ClearAll Button
    clearall.addEventListener("click", clearAllList);

    function clearAllList() {
        if (document.querySelectorAll("td")) {
            document.querySelector("tbody").innerHTML = "";
            localStorage.removeItem("tasks");
            successAlert("Deleted All the");
            n = 1;
        }else{
            alert("There is no todo list");
        }
    }

    //Local Storage
    function localStorageTodo() {
        let tasks = [];
        document.querySelectorAll("table tbody tr").forEach((todo) => {
            tasks.push(todo.cells[1].textContent);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadFromLocalStorage() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task) => {
            createList(task);
        })
    }

    loadFromLocalStorage();


})