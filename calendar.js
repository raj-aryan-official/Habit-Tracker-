const daysInMonth = 31;
let habitStatus = JSON.parse(localStorage.getItem('habitStatus')) || {};

function generateCalendar() {
    const calendarContainer = document.getElementById('calendar-container');
    const habitCheckbox = document.getElementById('habit-checkbox');

    calendarContainer.innerHTML = '';

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('calendar-day');
        dayDiv.textContent = day;

        if (habitStatus[day]) {
            dayDiv.classList.add('completed');
        }

        dayDiv.addEventListener('click', () => {
            if (habitCheckbox.checked) {
                habitStatus[day] = true;
            } else {
                habitStatus[day] = false;
            }

            dayDiv.classList.toggle('completed', habitStatus[day]);
            localStorage.setItem('habitStatus', JSON.stringify(habitStatus));
        });

        calendarContainer.appendChild(dayDiv);
    }
}

function showHabitStatus() {
    const habitStatusList = document.getElementById('habit-status-list');
    habitStatusList.innerHTML = ''; // Clear the list

    for (let day = 1; day <= daysInMonth; day++) {
        const listItem = document.createElement('li');
        listItem.textContent = `Day ${day}: ${habitStatus[day] ? 'Completed' : 'Not Completed'}`;
        habitStatusList.appendChild(listItem);
    }
}

window.onload = generateCalendar;
