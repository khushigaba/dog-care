/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?
const dayButtons = document.querySelectorAll('.day-selector li');

const fullButton = document.getElementById('full');
const halfButton = document.getElementById('half');

const clearButton = document.getElementById('clear-button');

const calculatedCostElement = document.getElementById('calculated-cost');

let selectedDays = [];
let dailyRate = 40;

/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!
// Attach click event listeners to day buttons
dayButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        toggleDay(button);
    });
});

// Attach click event listeners to rate buttons
fullButton.addEventListener('click', function() {
    changeRate('full');
});

halfButton.addEventListener('click', function() {
    changeRate('half');
});

// Attach click event listener to clear button
clearButton.addEventListener('click', function() {
    clearDays();
});

// Function to toggle selected days
function toggleDay(button) {
    const day = button.id;
    
    if (!selectedDays.includes(day)) {
        selectedDays.push(day);
        button.classList.add('clicked');
    } else {
        selectedDays = selectedDays.filter(function(selectedDay) {
            return selectedDay !== day;
        });
        button.classList.remove('clicked');
    }
    
    calculateCost();
}
/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.
document.getElementById('clear-button').addEventListener('click', function () {
    clearDays();
});



/********* change rate *********/

function changeRate(rateType) {
    if (rateType === 'half') {
        // when the half-day button is clicked, set the daily rate to $25, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.
        dailyRate = 25;
        halfButton.classList.add('clicked');
        fullButton.classList.remove('clicked');
    } else if (rateType === 'full') {
        // when the full-day button is clicked, the daily rate is set back to $40, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.
        dailyRate = 40;
        fullButton.classList.add('clicked');
        halfButton.classList.remove('clicked');
    }
    calculateCost();
}

//clear days
function clearDays() {
    dayButtons.forEach(function(button) {
        button.classList.remove('clicked');
    });
    selectedDays = [];
    calculateCost();
}

/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value
function calculateCost() {
    const totalCost = selectedDays.length * dailyRate;
    calculatedCostElement.textContent = totalCost;
}

calculateCost();

