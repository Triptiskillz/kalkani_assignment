const readline = require("readline");

// Create an interface to read input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function printPattern(luckyNumber) {
  // Print upper half of the pattern
  for (let i = 1; i <= luckyNumber; i++) {
    let row = "";
    // Add leading spaces
    for (let j = 0; j < luckyNumber - i; j++) {
      row += "  ";
    }
    // Add numbers
    for (let j = 1; j <= 2 * i - 1; j += 2) {
      row += j + " ";
    }
    // Add letters
    let currentLetter = 65;
    for (let j = 1; j < i; j++) {
      row += String.fromCharCode(currentLetter) + " ";
      currentLetter++;
    }
    console.log(row);
  }

  // Print lower half of the pattern
  for (let i = luckyNumber - 1; i >= 1; i--) {
    let row = "";
    // Add leading spaces
    for (let j = 0; j < luckyNumber - i; j++) {
      row += "  ";
    }
    // Add numbers
    for (let j = 1; j <= 2 * i - 1; j += 2) {
      row += j + " ";
    }
    // Add letters
    let currentLetter = 65;
    for (let j = 1; j < i; j++) {
      row += String.fromCharCode(currentLetter) + " ";
      currentLetter++;
    }
    console.log(row);
  }
}

// Get user input
rl.question("Please enter your lucky number: ", function (luckyNumber) {
  // Check if the input is a valid positive integer
  if (Number.isInteger(Number(luckyNumber)) && luckyNumber > 0) {
    // Call the function to print the pattern
    printPattern(Number(luckyNumber));
  } else {
    console.log("Invalid input. Please enter a positive integer.");
  }

  // Close the interface
  rl.close();
});
