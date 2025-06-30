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
        console.log(renderHTML_TopProjects(ourData.projects));
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
        htmlString += "<li class=\'col-sm-12 col-md-6 col-xl-4\' ><div class=\"row project-entry container-fluid  \">" +
            "<a target='_blank' class='align-middle text-center col-12 p-0' href=" + data[i].itchLink + " >" + data[i].projectName + "</a>" +
            FancyBoxImg(data[i].img, data[i].youtubeLink) +
            "<h2>" + data[i].purpose + "</h2>" +
            "<h3>" + ConvertAchievement(data[i].achievement) + "</h3>" +

            "<div class='project-entry-zone-skills container-fluid  row'>" +
            "<h3>" + "Developed Skills and Systems:" + "</h3>" +
            "<div class='col-11 align-items-center justify-content-center p-0'>" +
            "<h3 class='text-center '>" + ConvertSkills(data[i].skills) + "</h3>" +
            "</div></div>" +
            "<hr>" +
            "<p>" + ConvertDescription(data[i].description) + "</p>" +

            "</div></li>";
    }
    htmlString += "</ul>"

    //projectContainer.insertAdjacentHTML("beforeend", htmlString);
    projectContainer.innerHTML = htmlString;
    // console.log(htmlString);
    LoadFancyBox();
    return htmlString;
}

function renderHTML_TopProjects(data) {
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

            htmlString += "<li class=\'col-sm-12 col-md-12 col-lg-6 col-xl-4\' ><div class=\"row project-entry container-fluid  \">" +
                "<a target='_blank' class='align-middle text-center col-12' href=" + data[i].htmlLink + " >" + data[i].projectName + "</a>" +
                FancyBoxImg(data[i].img, data[i].youtubeLink) +
                "<h1>" + data[i].genre + "</h1>" +
                "<hr>" +
                "<h2>" + data[i].purpose + "</h2>" +
                "<h3>" + ConvertAchievement(data[i].achievement) + "</h3>" +
                // "<hr>" +

                "<div class='project-entry-zone-skills container-fluid align-items-center justify-content-center row'>" +
                "<h3>" + "Developed Skills and Systems:" + "</h3>" +
                "<div class='col-11 align-items-center justify-content-center p-0'>" +
                "<h3 class='text-center'>" + ConvertSkills(data[i].skills) + "</h3>" +
                "</div></div>" +
                "<hr>" +
                "<p>" + ConvertDescription(data[i].description) + "</p>" +
                "</div></li>";
        }
    }
    htmlString += "</ul>"

    //projectContainer.insertAdjacentHTML("beforeend", htmlString);
    projectContainer.innerHTML = htmlString;
    // console.log(htmlString);
    LoadFancyBox();

    return htmlString;
}


function ConvertDescription(text) {
    text = text.replaceAll("\\n\n", "</p><p>")
    text = text.replaceAll("\\n", "</p><p>")
    text = text.replaceAll("\n", "")
    text = text.replaceAll("\\n", "")
    return text
}

function ConvertAchievement(text) {
    text = text.replaceAll("\\n\n", "</h3><h3>")
    text = text.replaceAll("\\n", "</h3><h3>")

    return text
}

function ConvertSkills(text) {
    var listSkills = text.split("/")
    var returnText = "<ul '>\n"

    for (let t in listSkills) {
        returnText += "<li>" + listSkills[t] + "<\li>"
    }

    returnText += "</ul>\n"
    return returnText;
}

function FancyBoxImg(img, link) {
    return "<a class='fancybox fancybox.iframe align-middle text-center col-12 p-0' data-fancybox=\'gallery\'href=\"" + link + "\">" + "<img class='align-middle text-center' src=\"" + img + "\"></img></a>"

}

function LoadFancyBox() {
    Fancybox.bind('[data-fancybox="gallery"]', {
        dragToClose: false,

        Toolbar: false,
        closeButton: "top",

        Image: {
            zoom: false,
        }
    });
}
