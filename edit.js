let habits = JSON.parse(localStorage.getItem('habits')) || []; 

const addHabitForm = document.getElementById('addHabitForm');
const habitList = document.getElementById('habitList');
const commonGoals = document.getElementById('commonGoals');
const habitNameInput = document.getElementById('habitName');
const habitTimeInput = document.getElementById('habitTime'); 

if (commonGoals) {
  commonGoals.addEventListener('change', () => {
    habitNameInput.value = commonGoals.value;
  });
}

function renderHabits() {
  if (habitList) {
    habitList.innerHTML = '<h2>Your Habits</h2>';
    habits.forEach((habit) => {
      const habitItem = document.createElement('div');
      habitItem.className = 'habit-item';
      habitItem.innerHTML = `
        <div>
          <strong>${habit.name}</strong> - ${habit.description} | Time Spent: ${habit.timeSpent} hours
        </div>
        ${location.pathname.includes('update') ? `
        <div class="habit-actions">
          <button onclick="editHabit(${habit.id})">Edit</button>
        </div>` : ''}
        ${location.pathname.includes('remove') ? `
        <div class="habit-actions">
          <button onclick="deleteHabit(${habit.id})">Delete</button>
        </div>` : ''}
      `;
      habitList.appendChild(habitItem);
    });
  }
}

if (addHabitForm) {
  addHabitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = habitNameInput.value;
    const description = document.getElementById('habitDescription').value;
    const timeSpent = parseFloat(habitTimeInput.value); 

    const newHabit = {
      id: Date.now(),
      name,
      description,
      timeSpent,  
    };

    habits.push(newHabit);
    localStorage.setItem('habits', JSON.stringify(habits)); 
    renderHabits();
    addHabitForm.reset();
    alert('Habit added successfully!');
  });
}

function editHabit(id) {
  const habit = habits.find((h) => h.id === id);
  if (habit) {
    const newName = prompt('Edit Habit Name:', habit.name);
    const newDescription = prompt('Edit Description:', habit.description);
    const newTimeSpent = parseFloat(prompt('Edit Time Spent (in hours):', habit.timeSpent));

    if (newName) habit.name = newName;
    if (newDescription) habit.description = newDescription;
    if (!isNaN(newTimeSpent)&& newTimeSpent>0) habit.timeSpent = newTimeSpent;

    localStorage.setItem('habits', JSON.stringify(habits)); 
    renderHabits();
    alert('Habit updated successfully!');
  }
}

function deleteHabit(id) {
  habits = habits.filter((h) => h.id !== id); 
  localStorage.setItem('habits', JSON.stringify(habits)); 
  renderHabits();
  alert('Habit deleted successfully!');
}

renderHabits();