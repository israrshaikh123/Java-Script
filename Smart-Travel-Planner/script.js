const outputDiv = document.getElementById("output");

// Array to store destinations
const destinations = [];

// Ask user to input 3 destinations
for (let i = 0; i < 3; i++) {
  const dest = prompt(`Enter destination ${i + 1}:`);
  destinations.push(dest);
}

console.log("Destinations Entered:", destinations);
// Ask user for total budget
const totalBudget = Number(prompt("Enter your total budget in ₹:"));

let budgetMessage = "";

if (totalBudget < 10000) {
  budgetMessage = "Plan a short domestic trip.";
} else if (totalBudget <= 50000) {
  budgetMessage = "You can plan a long domestic trip.";
} else {
  budgetMessage = "International trip possible!";
}

console.log("Budget Suggestion:", budgetMessage);
// Ask user for number of travel days
const travelDays = Number(prompt("Enter number of travel days:"));

let tripType = "";

if (travelDays < 3) {
  tripType = "Weekend Getaway.";
} else if (travelDays <= 7) {
  tripType = "Perfect Holiday Trip.";
} else {
  tripType = "Extended Vacation.";
}

console.log("Trip Type:", tripType);
// Function to suggest hotel type based on budget per day
function hotelSuggestion(budget, days) {
  const budgetPerDay = budget / days;

  if (budgetPerDay < 2000) {
    return "Budget Hotels.";
  } else if (budgetPerDay <= 5000) {
    return "Mid-range Hotels.";
  } else {
    return "Luxury Hotels.";
  }
}
const hotelType = hotelSuggestion(totalBudget, travelDays);

console.log("Hotel Suggestion:", hotelType);
// Final Travel Summary
const travelSummary = `
Destinations Entered: [${destinations.join(", ")}]
Total Budget: ₹${totalBudget}
Days Planned: ${travelDays}
Trip Type: ${tripType}
Hotel Suggestion: ${hotelType}
Travel Summary: ${budgetMessage} You can enjoy your trip with comfort.
`;

console.log(travelSummary);
outputDiv.innerHTML += `<hr><b>Smart Travel Planner Summary:</b><br>
${destinations.join(", ")}<br>
Total Budget: ₹${totalBudget}<br>
Days Planned: ${travelDays}<br>
Trip Type: ${tripType}<br>
Hotel Suggestion: ${hotelType}<br>
Travel Summary: ${budgetMessage} You can enjoy your trip with comfort.<br><br>`;
