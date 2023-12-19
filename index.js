const inquirer = require('inquirer');
const fs = require('fs');

const questions = [
    {type: 'input', name: 'title', message: 'What is the title of your project?'},
    {type: 'input', name: 'description', message: 'Description of the application and functionality'},
    {type: 'input', name: 'installation', message: 'List any required installation files to make the applicaton run'},
    {type: 'input', name: 'Usage', message: 'Enter the exptected usage of the application'},
    {type: 'list', name: 'license', message: 'Select the license of your application', choices: ['Apache', 'MIT', 'BSD 2', 'BSD 3', 'Boost', 'none']},
    {type: 'input', name: 'test', message: 'Describe any tests needed to verify the application'},
    {type: 'input', name: 'contributing', message: 'List any contriputors to the project'},
    {type: 'input', name: 'questions', message: ""}
];

inquirer.prompt(questions).then((answers) => {
    console.log(answers)
});

function renderLicenseBadge(license) {
    if (license !== "none") {
      return `![Github license](https://img.shields.io/badge/license-${license}-blue.svg)`;
    }
    return "";
  }
  function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
  }
  function generateMarkdown(data) {
    return `# ${data.title} 
  ${renderLicenseBadge(data.license)}
  ## Description
  ${data.description}
  ## Table of Contents
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Testing](#test)
  * [Contributing](#contributing)
  * [Questions](#questions)
  ## Description
  ${data.description}
  ## Installation
  ${data.installation}
  ## How to Use This Application:
  ${data.usage}
  ## License
  ${data.license}
  ## Testing
  ${data.test}
  ## Contributors
  ${data.contributors}
  ## Questions
  Please send your questions [here](mailto:${data.email} or visit [github/${data.creator}](https://github.com/${data.creator}).
  `;
  }
  
  module.exports = generateMarkdown;