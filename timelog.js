let selectedHabit;
let selectedInterval;
let userName = ''; 

function startTracking() {
   
    const habitSelect = document.getElementById('habitSelect');
    const timeInterval = document.getElementById('timeInterval');
    const status = document.getElementById('status');

    selectedHabit = habitSelect.value;
    selectedInterval = parseInt(timeInterval.value);

    const startTime = new Date();
    const timeSpent = formatTime(selectedInterval);

    logTimeSpent(userName, startTime, selectedHabit, timeSpent);

    status.textContent = `Logged ${selectedHabit} for ${timeSpent}.`;
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs} hour${hrs !== 1 ? 's' : ''} ${mins} minute${mins !== 1 ? 's' : ''} ${secs} second${secs !== 1 ? 's' : ''}`;
}

function logTimeSpent(userName, date, habit, timeSpent) {
    const historyList = document.getElementById('historyList');
    const listItem = document.createElement('li');
    listItem.textContent = `${userName} on ${date.toLocaleDateString()}: ${habit} = ${timeSpent}`;
    historyList.appendChild(listItem);


    let history = JSON.parse(localStorage.getItem('habitHistory')) || [];
    history.push({ userName, date: date.toLocaleDateString(), habit, timeSpent });
    localStorage.setItem('habitHistory', JSON.stringify(history));

    
    console.log("History saved: ", JSON.stringify(history));
}

function showHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';  
    let history = JSON.parse(localStorage.getItem('habitHistory')) || [];

    console.log("Loaded history: ", history);

    history.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.userName} on ${entry.date}: ${entry.habit} = ${entry.timeSpent}`;
        historyList.appendChild(listItem);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; 
});
