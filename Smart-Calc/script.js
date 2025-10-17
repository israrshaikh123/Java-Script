const outputDiv = document.getElementById("output"); // JS output display
function arithmeticCalculator(num1, num2, operator) {
  let result;
  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num2 !== 0 ? num1 / num2 : "Error: Divide by zero";
      break;
    case "%":
      result = num2 !== 0 ? num1 % num2 : "Error: Divide by zero";
      break;
    default:
      result = "Invalid operator";
  }
  return result;
}
function calculateSquare(num) {
  return num * num;
}

function calculateCube(num) {
  return num * num * num;
}
function factorial(num) {
  if (num < 0) return "Error: Negative number";
  if (num === 0 || num === 1) return 1;
  return num * factorial(num - 1);
}
function isEven(num) {
  return num % 2 === 0 ? "Even" : "Odd";
}

let choice;
do {
  choice = prompt(`Smart Calculator Menu:
1. Arithmetic Calculator
2. Square & Cube
3. Factorial
4. Even/Odd Checker
0. Exit
Enter your choice (0-4):`);

  choice = Number(choice);

  switch (choice) {
    case 1:
      let n1 = Number(prompt("Enter first number:"));
      let n2 = Number(prompt("Enter second number:"));
      let op = prompt("Enter operator (+, -, *, /, %):");

      let calcResult = arithmeticCalculator(n1, n2, op);

      console.log(`Result: ${n1} ${op} ${n2} = ${calcResult}`);
      outputDiv.innerHTML += `<hr><b>Arithmetic Calculator:</b><br>${n1} ${op} ${n2} = ${calcResult}<br><br>`;
      break;

    case 2:
      let number = Number(prompt("Enter a number for Square & Cube:"));

      let square = calculateSquare(number);
      let cube = calculateCube(number);

      console.log(`Number: ${number}, Square: ${square}, Cube: ${cube}`);
      outputDiv.innerHTML += `<hr><b>Square & Cube Calculator:</b><br>
                             Number: ${number}<br>
                             Square: ${square}<br>
                             Cube: ${cube}<br><br>`;
      break;

    case 3:
      let fNum = Number(prompt("Enter a number to find factorial:"));
      let factResult = factorial(fNum);

      console.log(`Factorial of ${fNum} = ${factResult}`);
      outputDiv.innerHTML += `<hr><b>Factorial Calculator:</b><br>
                             Factorial of ${fNum} = ${factResult}<br><br>`;
      break;

    case 4:
      let eNum = Number(prompt("Enter a number to check Even/Odd:"));
      let evenOdd = isEven(eNum);

      console.log(`Number ${eNum} is ${evenOdd}`);
      outputDiv.innerHTML += `<hr><b>Even/Odd Checker:</b><br>
                             Number ${eNum} is ${evenOdd}<br><br>`;
      break;

    case 0:
      alert("Exiting Smart Calculator. Goodbye!");
      break;
    default:
      alert("Invalid choice. Try again.");
  }
} while (choice !== 0);
