
function getHabits() {
    const user = localStorage.getItem("currentUser");
    return JSON.parse(localStorage.getItem(`habits-${user}`)) || [];
  }
  

  function saveHabits(habits) {
    const user = localStorage.getItem("currentUser");
    localStorage.setItem(`habits-${user}`, JSON.stringify(habits));
  }
  

  function renderHabits() {
    const habitsContainer = document.getElementById("habits-container");
    habitsContainer.innerHTML = "";
  
    const habits = getHabits();
    habits.forEach((habit, index) => {
      const habitDiv = document.createElement("div");
      habitDiv.classList.add("habit");
  
      habitDiv.innerHTML = `
        <div class="habit-title">${habit.name}</div>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${habit.progressPercentage}%"></div>
        </div>
        <p>${habit.currentHours} / ${habit.targetHours} hours completed (${habit.progressPercentage.toFixed(1)}%)</p>
        <div class="update-container">
          <input type="number" class="update-hours" placeholder="Add hours" data-index="${index}">
          <button class="update-btn" data-index="${index}">Update</button>
        </div>
      `;
  
      habitsContainer.appendChild(habitDiv);
    });
  

    const updateButtons = document.querySelectorAll(".update-btn");
    updateButtons.forEach((btn) =>
      btn.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        const input = document.querySelector(`.update-hours[data-index="${index}"]`);
        const addedHours = parseFloat(input.value) || 0;
  
        if (addedHours > 0) {
          updateHabitProgress(index, addedHours);
        }
      })
    );
  }
  
 
  document.getElementById("add-habit-btn").addEventListener("click", () => {
    const habitName = document.getElementById("habit-name").value;
    const habitTarget = parseFloat(document.getElementById("habit-target").value);
  
    if (habitName && habitTarget > 0) {
      const habits = getHabits();
      habits.push({ name: habitName, targetHours: habitTarget, currentHours: 0, progressPercentage: 0 });
      saveHabits(habits);
      renderHabits();
  
     
      document.getElementById("habit-name").value = "";
      document.getElementById("habit-target").value = "";
    } else {
      alert("Please enter a valid habit name and target hours.");
    }
  });
  

  function updateHabitProgress(index, addedHours) {
    const habits = getHabits();
    const habit = habits[index];
  
    habit.currentHours += addedHours;
    if (habit.currentHours > habit.targetHours) {
      habit.currentHours = habit.targetHours; // Cap progress at target hours
    }
    habit.progressPercentage = (habit.currentHours / habit.targetHours) * 100;
    saveHabits(habits);
    renderHabits();
  }
  

  renderHabits();
  
