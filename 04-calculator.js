// ===========================================================================================
//
// project: toolbox/calculator.js
// date: 14.02.2024
// simple calculator that uses the math.js library
// to perform basic operations like addition, subtraction,
// multiplication, and division.
// and px to rem conversion / rem to px conversion
// taking user input from the command line
// using the console.log to display the results
//
// ===========================================================================================

// dependencies==============================================================================

const readline = require("readline");
const math = require("mathjs");

// import the functions from other files======================================================

const { runMatrix } = require("./common.js");

// Function to convert pixels to rem===========================================================

function pxToRem(px, baseSize = 16) {
  return px / baseSize;
}

// Function to convert rem to pixels===========================================================

function remToPx(rem, baseSize = 16) {
  return rem * baseSize;
}

// Function to ask a question and get user input================================================

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

// Function to start the calculator=============================================================

async function startCalculator(goBackCallback) {
  const option = await askQuestion(
    "\n<============== Calculator ==============>\n\nPlease select an option: \n\n1. Calculate a mathematical expression \n2. Convert pixels to REM \n3. Convert REM to pixels \n\n4. Back\n5. Exit \n\n> "
  );

  switch (option) {
    case "1":
      const expression = await askQuestion(
        "\n----------------------------------------\n\nPlease enter a mathematical expression:\n\n> "
      );
      try {
        const result = math.evaluate(expression);
        console.log(`\n= ${result}\n`);
      } catch (error) {
        console.log(
          "\nInvalid expression:\nMake sure to use proper operators (+, -, *, /) and numbers.\n"
        );
      }
      await startCalculator(goBackCallback);
      break;

    case "2":
      const px = await askQuestion(
        "\n----------------------------------------\n\nPlease enter the number of pixels:\n\n> "
      );
      const rem = pxToRem(Number(px));
      if (isNaN(rem)) {
        console.log("\nInvalid input for pixels. Please enter a number.\n"); // Improved error message
      } else {
        console.log(`\n${px} pixels is equal to ${rem} REM.\n`);
      }
      await startCalculator(goBackCallback);
      break;

    case "3":
      const remInput = await askQuestion(
        "\n----------------------------------------\n\nPlease enter the number of REM:\n\n> "
      );
      const pxResult = remToPx(Number(remInput));
      if (isNaN(pxResult)) {
        console.log("\nInvalid input for REM. Please enter a number.\n");
      } else {
        console.log(`\n${remInput} REM is equal to ${pxResult} pixels.\n`);
      }
      await startCalculator(goBackCallback);
      break;

    case "4":
    case "b":
    case "B":
      goBackCallback();
      break;

    case "5":
    case "e":
    case "E":
      // console.log("\n--------------------------------------------------\n");
      // console.log("\nExiting the app. Goodbye!");
      runMatrix();
      // process.exit(0);
      break;

    default:
      console.log(
        `\nInvalid option:\n\nPlease type in one of the following options:\n\n"1" for Mathematical expression\n"2" for Convert pixels to REM\n"3" for Convert REM to pixels\n"4", "b", "B" for Go back\n"5", "e", "E" for Exit the app\n`
      );
      await startCalculator(goBackCallback);
      break;
  }
}

// Call the function============================================================

// startCalculator();

// exports======================================================================

module.exports = { startCalculator };

// ==============================================================================
