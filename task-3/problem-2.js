const readline = require("readline");
// Create an interface to read input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function fibonacciSeries(limit) {
  // Inital value
  let fibSeries = [0, 1];
  let nextTerm = 0;

  while (
    (nextTerm =
      fibSeries[fibSeries.length - 1] + fibSeries[fibSeries.length - 2]) < limit
  ) {
    fibSeries.push(nextTerm);
  }

  return fibSeries;
}

// Get user input
rl.question("Please enter a number: ", function (userInput) {
  const inputNumber = parseInt(userInput);
  // Check if the input is a valid positive integer
  if (isNaN(inputNumber) || inputNumber <= 0) {
    console.log("Invalid input. Please enter a positive integer.");
  } else {
    // Call the function to print the fibonacci Series
    const result = fibonacciSeries(inputNumber);
    console.log("Program output:");
    console.log(result.join(", "));
  }
  // Close the interface
  rl.close();
});
