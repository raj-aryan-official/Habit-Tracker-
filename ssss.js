const daysInMonth = 31;
let habitStatus = {};

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
        });

        calendarContainer.appendChild(dayDiv);
    }
}

function showHabitStatus() {
    for (let day = 1; day <= daysInMonth; day++) {
        console.log(`Day ${day}: ${habitStatus[day] ? 'Completed' : 'Not Completed'}`);
    }
}

window.onload = generateCalendar;