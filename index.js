const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
  },
  {
    type: "input",
    name: "description",
    message: "Description of the application and functionality",
  },
  {
    type: "input",
    name: "installation",
    message: "List any required installation files to make the applicaton run",
  },
  {
    type: "input",
    name: "usage",
    message: "Enter the exptected usage of the application",
  },
  {
    type: "list",
    name: "license",
    message: "Select the license of your application",
    choices: ["Apache", "MIT", "BSD 2", "BSD 3", "Boost", "none"],
  },
  {
    type: "input",
    name: "test",
    message: "Describe any tests needed to verify the application",
  },
  {
    type: "input",
    name: "contributing",
    message: "List any contriputors to the project",
  },
  // {type: 'input', name: 'questions', message: ""},
  { type: "input", name: "email", message: "Enter your email address" },
  { type: "input", name: "creator", message: "Enter your GitHub username" },
];

function renderLicenseBadge(license) {
  if (license !== "none") {
    return `![Github license](https://img.shields.io/badge/license-${license}-blue.svg)`;
  }
  return "";
}

function generateMarkdown(data) {
  let markdown = `# ${data.title} 
${data.license !== "none" ? renderLicenseBadge(data.license) : ""}
## Description
${data.description}`;

  let tableOfContents = `
## Table of Contents
* [Description](#description)
${data.installation !== "N/A" ? "* [Installation](#installation)" : ""}
${data.usage !== "N/A" ? "* [Usage](#usage)" : ""}
${data.license !== "none" ? "* [License](#license)" : ""}
${data.test !== "N/A" ? "* [Testing](#test)" : ""}
${data.contributing !== "N/A" ? "* [Contributing](#contributing)" : ""}
* [Questions](#questions)`;

  markdown += tableOfContents;

  if (data.installation !== "N/A") {
    markdown += `
## Installation
${data.installation}`;
  }

  if (data.usage !== "N/A") {
    markdown += `
## How to Use This Application
${data.usage}`;
  }

  if (data.license !== "none") {
    markdown += `
## License
This project is licensed under the ${data.license} license.`;
  }

  if (data.test !== "N/A") {
    markdown += `
## Testing
${data.test}`;
  }

  if (data.contributing !== "N/A") {
    markdown += `
## Contributors
${data.contributing}`;
  }

  markdown += `
## Questions
Please send your questions [here](mailto:${data.email}) or visit [github/${data.creator}](https://github.com/${data.creator}).
`;

  return markdown;
}

function writeToFile(fileName, data) {
  return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

function init() {
  inquirer.prompt(questions).then((responses) => {
    console.log("Creating Professional README.md File...");
    writeToFile("./README.md", generateMarkdown({ ...responses }));
  });
}
init();
