const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Add Task function
function addTaskToList() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create a new list item
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `
        ${taskText}
        <span class="close">×</span>
    `;

    // Add a click event to mark the task as complete
    li.addEventListener("click", function () {
        this.classList.toggle("completed");
    });

    // Add a click event to delete the task
    const closeBtn = li.querySelector(".close");
    closeBtn.addEventListener("click", function () {
        li.remove();
    });

    // Append the new task to the list
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = "";
}

// Add a click event to the "Add Task" button
addTask.addEventListener("click", addTaskToList);

// Allow adding tasks when pressing Enter key
taskInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTaskToList();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const timerElement = document.getElementById("timer");
    const durationInput = document.getElementById("durationInput");
    const startButton = document.getElementById("startButton");

    let countdown;

    startButton.addEventListener("click", () => {
        const duration = parseInt(durationInput.value);
        if (isNaN(duration) || duration <= 0) {
            alert("Please enter a valid duration (in seconds).");
            return;
        }

        startTimer(duration);
    });

    function startTimer(duration) {
        clearInterval(countdown);
        const startTime = Date.now();
        const endTime = startTime + duration * 1000;

        updateTimer(duration);

        countdown = setInterval(() => {
            const currentTime = Date.now();
            const remainingTime = endTime - currentTime;
            if (remainingTime < 0) {
                clearInterval(countdown);
                return;
            }
            updateTimer(Math.ceil(remainingTime / 1000));
        }, 1000);
    }

    function updateTimer(seconds) {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
        const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
        timerElement.textContent = `${minutes}:${remainingSeconds}`;
    }
});
