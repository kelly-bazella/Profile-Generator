var inquirer = require("inquirer");
var fs = require("fs");
var axios = require("axios");
var generateHTML = require("./generateHTML");
const htmlPdf = require('html-pdf-chrome');
const options = { format: "Letter", charset: "utf-8" }; 
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
        "green",
        new inquirer.Separator(),
        "blue",
        new inquirer.Separator(),
        "pink",
        new inquirer.Separator(),
        "red"
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
        avi: response.data.avatar_url,
        followers: response.data.followers,
        repos:response.data.public_repos,
        following:response.data.following,
        bio:response.data.bio,
        star: response.data.public_gists,
        fullname: response.data.name,
        company:response.data.company,
        location:response.data.location,
        linkedin:response.data.blog,
        github:response.data.url
      };
     const htmlPage =  generateHTML(info);
     fs.writeFile("profile.html", htmlPage, function(err){
       if(err){
         return console.log("Error!")
       }else{
         console.log("Success!")
        htmlPdf.create(htmlPage, options).then((pdf) => pdf.toFile('profile.pdf'));
        htmlPdf.create(htmlPage, options).then((pdf) => pdf.toBase64());
        htmlPdf.create(htmlPage, options).then((pdf) => pdf.toBuffer());
       }
     })
    });
  });
