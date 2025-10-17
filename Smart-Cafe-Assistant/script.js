var subtotal = 0;
var totalItems = 0;
var highestPrice = 0;
var lowestPrice = 999999; 
var password = "1234";
var totalOrders = 0;
var totalBill = 0;
var discount = 0;

var discountAmount = 0;
var finalBill = 0;

var outputDiv = document.getElementById("output"); // assume <div id="output"></div> in HTML

var choice;
do {
  choice = prompt(
    "Café Menu:\n1. Coffee - ₹50\n2. Tea - ₹30\n3. Sandwich - ₹80\n4. Pastry - ₹100\n0. Finish Ordering\n\nEnter choice (0-4):"
  );
  choice = Number(choice);

  if (choice === 1) {
    subtotal += 50;
    totalItems += 1;
    if (50 > highestPrice) highestPrice = 50;
    if (50 < lowestPrice) lowestPrice = 50;
    console.log("You ordered Coffee. Price: ₹50");
    outputDiv.innerHTML += "You ordered Coffee. Price: ₹50<br>";
    console.log("Current Total: ₹" + subtotal);
    outputDiv.innerHTML += "Current Total: ₹" + subtotal + "<br><br>";
  } else if (choice === 2) {
    subtotal += 30;
    totalItems += 1;
    if (30 > highestPrice) highestPrice = 30;
    if (30 < lowestPrice) lowestPrice = 30;
    console.log("You ordered Tea. Price: ₹30");
    outputDiv.innerHTML += "You ordered Tea. Price: ₹30<br>";
    console.log("Current Total: ₹" + subtotal);
    outputDiv.innerHTML += "Current Total: ₹" + subtotal + "<br><br>";
  } else if (choice === 3) {
    subtotal += 80;
    totalItems += 1;
    if (80 > highestPrice) highestPrice = 80;
    if (80 < lowestPrice) lowestPrice = 80;
    console.log("You ordered Sandwich. Price: ₹80");
    outputDiv.innerHTML += "You ordered Sandwich. Price: ₹80<br>";
    console.log("Current Total: ₹" + subtotal);
    outputDiv.innerHTML += "Current Total: ₹" + subtotal + "<br><br>";
  } else if (choice === 4) {
    subtotal += 100;
    totalItems += 1;
    if (100 > highestPrice) highestPrice = 100;
    if (100 < lowestPrice) lowestPrice = 100;
    console.log("You ordered Pastry. Price: ₹100");
    outputDiv.innerHTML += "You ordered Pastry. Price: ₹100<br>";
    console.log("Current Total: ₹" + subtotal);
    outputDiv.innerHTML += "Current Total: ₹" + subtotal + "<br><br>";
  } else if (choice === 0) {
    console.log("Finished ordering.");
    outputDiv.innerHTML += "Finished ordering.<br><br>";
  } else {
    console.log("Invalid choice. Try again.");
    outputDiv.innerHTML += "Invalid choice. Try again.<br><br>";
  }
} while (choice !== 0);

var gst = subtotal * 0.05; 
var grandTotal = subtotal + gst;

console.log("Subtotal: ₹" + subtotal);
console.log("GST (5%): ₹" + gst);
console.log("Grand Total: ₹" + grandTotal);

outputDiv.innerHTML += "<hr>";
outputDiv.innerHTML += "Subtotal: ₹" + subtotal + "<br>";
outputDiv.innerHTML += "GST (5%): ₹" + gst + "<br>";
outputDiv.innerHTML += "Grand Total: ₹" + grandTotal + "<br><br>";

if (subtotal > 1000) {
  discountAmount = subtotal * 0.2;
  discount = 20;
} else if (subtotal > 500) {
  discountAmount = subtotal * 0.1;
  discount = 10;
} else {
  discountAmount = 0;
  discount = 0;
}

finalBill = subtotal - discountAmount;

console.log("Original: ₹" + subtotal);
console.log("Discount: ₹" + discountAmount);
console.log("Final: ₹" + finalBill);

outputDiv.innerHTML += "<hr>";
outputDiv.innerHTML += "Original: ₹" + subtotal + "<br>";
outputDiv.innerHTML += "Discount: ₹" + discountAmount + "<br>";
outputDiv.innerHTML += "Final: ₹" + finalBill + "<br><br>";

totalOrders++;        
totalBill += finalBill;

var oldPass = prompt("Enter old password:");
if (oldPass === password) {
  var newPass = prompt("Enter new password:");
  password = newPass;
  console.log("Password changed successfully.");
  outputDiv.innerHTML += "<hr>Password changed successfully.<br>";
} else {
  console.log("Incorrect old password.");
  outputDiv.innerHTML += "<hr>Incorrect old password.<br>";
}

if (totalOrders > 0) {
  var avgBill = totalBill / totalOrders;

  console.log("------ Café Report ------");
  console.log("Total Orders: " + totalOrders);
  console.log("Total Bill: ₹" + totalBill);
  console.log("Average Bill: ₹" + avgBill.toFixed(2));
  console.log("Current Discount: " + discount + "%");

  outputDiv.innerHTML += "<hr><b>------ Café Report ------</b><br>";
  outputDiv.innerHTML += "Total Orders: " + totalOrders + "<br>";
  outputDiv.innerHTML += "Total Bill: ₹" + totalBill + "<br>";
  outputDiv.innerHTML += "Average Bill: ₹" + avgBill.toFixed(2) + "<br>";
  outputDiv.innerHTML += "Current Discount: " + discount + "%<br>";
} else {
  console.log("No orders placed yet.");
  outputDiv.innerHTML += "<hr>No orders placed yet.<br>";
}
