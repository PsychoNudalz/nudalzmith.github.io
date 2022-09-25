"use strict";
var projectContainer = document.getElementById("project-entry-zone")

function test() {

    fetch("./ProjectsInfo/Projects.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            console.log(data);
        });
}

function LoadProjects() {

    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', "./ProjectsInfo/Projects.json");
    ourRequest.onload = function () {
        var ourData = JSON.parse(ourRequest.responseText);
        //console.log(ourData.projects[1]);
        console.log(renderHTML_Projects(ourData.projects));
    };
    ourRequest.send();
}

function LoadTopProjects() {

    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', "./ProjectsInfo/Projects.json");
    ourRequest.onload = function () {
        var ourData = JSON.parse(ourRequest.responseText);
        //console.log(ourData.projects[1]);
        console.log(renderHTML2_TopProjects(ourData.projects));
    };
    ourRequest.send();
}

function renderHTML_Projects(data) {
    var htmlString = " <ul class=\"row project-entry-zone align-content-center\">";

    var projectContainer = document.getElementById("project-entry-zone");

    // <h1 className="text-center">Game</h1>
    // <img src="img/MoA.png">
    //     <h2>Purpose</h2>
    //     <h3>Achievement</h3>
    //     <p>Description</p>
    let i;
    console.log(data.length)
    for (i = 0; i < data.length; i++) {
        htmlString += "<li class=\'col-sm-12 col-md-6 col-lg-4\' ><div class=\"row project-entry   \">" +
            "<a target='_blank' class='' href=" + data[i].itchLink + " >" + data[i].projectName + "</a>" +
            " <img src=\"" + data[i].img + "\">" +
            "<h2>" + data[i].purpose + "</h2>" +
            "<h3>" + data[i].achievement + "</h3>" +
            "<p>" + data[i].description + "</p>" +

            "</div></li>";
    }
    htmlString += "</ul>"

    //projectContainer.insertAdjacentHTML("beforeend", htmlString);
    projectContainer.innerHTML = htmlString;
    console.log(htmlString);
    return htmlString;
}

function renderHTML2_TopProjects(data) {
    var htmlString = " <ul class=\"row project-entry-zone align-content-center\">";

    var projectContainer = document.getElementById("project-entry-zone");

    // <h1 className="text-center">Game</h1>
    // <img src="img/MoA.png">
    //     <h2>Purpose</h2>
    //     <h3>Achievement</h3>
    //     <p>Description</p>
    let i;
    console.log(data.length)
    for (i = 0; i < data.length; i++) {
        if (data[i].top != "") {

            htmlString += "<li class=\'col-sm-12 col-md-6 col-lg-6\' ><div class=\"row project-entry   \">" +
                "<a target='_blank' class='' href=" + data[i].htmlLink + " >" + data[i].projectName + "</a>" +
                " <img src=\"" + data[i].img + "\">" +
                "<h1>" + data[i].genre + "</h1>" +
                "<hr>" +
                "<h2>" + data[i].purpose + "</h2>" +
                "<h3>" + data[i].achievement + "</h3>" +

                "</div></li>";
        }
    }
    htmlString += "</ul>"

    //projectContainer.insertAdjacentHTML("beforeend", htmlString);
    projectContainer.innerHTML = htmlString;
    console.log(htmlString);
    return htmlString;
}
