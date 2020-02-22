var inquirer = require("inquirer");
var fs = require("fs");
var axios = require("axios");
var generateHTML = require("./generateHTML");

// function to ask questions
// favorite color
// github username
// .then call axios
// data={
//     color:"selected color",
//     username: "given username"
// }
// function for axios call
//github api call
//.then call generateHTML and store in variable then pass var to pdf
// function to convert HTML to PDF
let userColor;
let userName;
inquirer
  .prompt([
    {
      type: "list",
      message: "What is your favorite color?",
      name: "color",
      choices: [
        "Green",
        new inquirer.Separator(),
        "Blue",
        new inquirer.Separator(),
        "Pink",
        new inquirer.Separator(),
        "Red"
      ]
    },
    {
      type: "input",
      message: "What is your GitHub username?",
      name: "username"
    }
  ])
  .then(function(data) {
    userColor = data.color;
    userName = data.username;
    let queryUrl = `https://api.github.com/users/${userName}`;
    axios.get(queryUrl).then(function(response) {
      var info = {
        color: userColor,
        user: userName,
        followers: response.data.followers,
        repos:response.data.public_repos,
        following:response.data.following,
        bio:response.data.bio,
        fullname: response.data.name,
        company:response.data.company,
        location:response.data.location,
        linkedin:response.data.blog,
        github:response.data.url
      };
      console.log(info)
      generateHTML(info);
    });
  });
