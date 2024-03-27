#!/usr/bin/env node

// Importing the required modules
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// We verify that an app name is provided with no additional arguments
if (process.argv.length < 3) {
  console.log("You have to provide a name to your app.");
  console.log("For example :");
  console.log("    npx create-payroll my-app");
  process.exit(1);
}

const projectName = process.argv[2];

async function createDirectory() {
  try {
    // Create a new project folder
    fs.mkdirSync(path.join(process.cwd(), projectName));
  } catch (err) {
    // If the folder already exists, we stop the process
    if (err.code === "EEXIST") {
      console.log(
        `The file ${projectName} already exist in the current directory, please give it another name.`
      );
      process.exit(1);
    }
    // If there was another error, we stop the process
    console.log(err);
    process.exit(1);
  }
}

/**
 * This function runs a command in the terminal
 * @param {string} command - The command to run
 */
async function runCommand(command) {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function clonePayroll() {
  const cloneCommand = `git clone --depth 1 https://github.com/neonmoose/neon-dash.git ${projectName}`;
  const installCommand = `cd ${projectName} && npm install`;
  try {
    console.log("Downloading files... 📦");
    await runCommand(cloneCommand);

    console.log("Installing dependencies... 🚚");
    await runCommand(installCommand);

    console.log("Welcome to Payroll's boilerplate! 🚀");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

createDirectory();
clonePayroll();
