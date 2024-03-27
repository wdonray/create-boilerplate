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
const projectPath = path.join(process.cwd(), projectName);

async function createDirectory() {
  try {
    // Create a new project folder
    fs.mkdirSync(projectPath);
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

async function clonePayroll() {
  try {
    console.log("Downloading files... 📦");
    execSync(
      `git clone --depth 1 https://github.com/neonmoose/neon-dash.git ${projectPath}`
    );

    process.chdir(projectPath);

    console.log("Installing dependencies... 🚚");
    execSync("npm install");

    console.log("Removing files... 🧹");
    execSync("npx rimraf ./.git");
    fs.rmdirSync(path.join(projectPath, "bin"), { recursive: true });

    console.log("Welcome to Payroll's boilerplate! 🚀");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

createDirectory();
clonePayroll();
