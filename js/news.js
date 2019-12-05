var newsList;
var newsData;
var newsDataIndexes;

const sortByDefault = 3;
const itemsShowingDefault = 9;

var pagination;
var page;

var eventsDataArray;
var eventList;



$(document).ready(function () {
    $('select').formSelect();
    $('.sidenav').sidenav();

    newsData = ["news1.jpg;Astronomers find surprisingly complex magnetic fields in a galaxy’s halo;2019-12-03",
        "news2.jpg;This space anthropologist is chronicling astronauts' lives in orbit;2019-12-02",
        "news3.jpg;First interstellar comet may soon break apart as it nears the Sun;2019-11-29",
        "news4.jpg;These so-called 'super-puff' worlds could be exoplanets with ring;2019-11-27",
        "news5.jpg;Hubble spots a galaxy brimming with young suns;2019-11-26",
        "news6.jpg;The Sky This Week from November 29 to December 8;2019-11-26",
        "news7.jpg;A new method of hunting nearby black holes turns up a monster;2019-11-26",
        "news8.jpg;Jupiter's Great Red Spot may not be disappearing;2019-11-24",
        "news9.jpg;Earth may have recently destroyed one of its own minimoons;2019-11-21",
        "news10.jpg;What if the Moon disappeared tomorrow?;2019-11-20",
        "news11.jpg;The Sky This Week from November 22 to December 1;2019-11-19",
        "news12.jpg;Few NASA astronauts may be on the International Space Station in upcoming months;2019-11-19",
        "news13.jpg;Three supermassive black holes found lurking in one galaxy;2019-11-17",
        "news14.jpg;Strange galaxy cluster ignores massive black hole, forms stars;2019-11-16",
        "news15.jpg;Astronomers look inside meteorites and find the sugars needed for life;2019-11-13",
        "news16.jpg;SpaceX loses first Starship prototype during testing;2019-11-11",
        "news17.jpg;NASA is developing a lunar dust-busting paint;2019-11-07",
        "news18.jpg;Huge black holes may have cannibalistic baby black holes orbiting around them;2019-11-07",
        "news19.jpg;NASA instrument spots its brightest X-ray burst ever;2019-11-06",
        "news20.jpg;Astronomers catch water erupting from plumes on Jupiter’s icy moon Europa;2019-11-05",
        "news21.jpg;The Sky This Week from November 15 to 24;2019-11-02",
        "news22.jpg;This spacecraft will detect if exoplanet skies are cloudy, hazy, or clear;2019-11-01",
        "news23.jpg;SpaceX releases 60 more Starlink satellites to orbit;2019-10-28"];
    newsDataIndexes = [];
    for (index in newsData)
        newsDataIndexes.push(index);

    newsList = document.getElementById("newsList");
    page = 1;
    sortArrayOfIndexesByDate(newsDataIndexes, newsData, true);
    populateNewsList(newsDataIndexes, itemsShowingDefault, page);

    pagination = $(".pagination");

    for (let i = 0; i < pagination.length; i++) {
        var paginationItems = $(pagination[i]).find("li");

        $(paginationItems[0].children[0]).click(nextOrPreviousPage);
        for (var j = 1; j < paginationItems.length - 1; j++)
            $(paginationItems[j].children[0]).click(jumpToPage);
        $(paginationItems[j].children[0]).click(nextOrPreviousPage);
    }

    eventsDataArray = ["event1.jpg;January 3, 4 - Quadrantids Meteor Shower.",
    "event2.jpg;January 6 - New Moon.",
    "event3.jpg;January 6 - Venus at Greatest Western Elongation.",
    "event4.jpg;January 6 - Partial Solar Eclipse.",
    "event5.jpg;January 21 - Full Moon, Supermoon.",
    "event6.jpg;January 22 - Conjunction of Venus and Jupiter. ",
    "event7.jpg;January 20 & 21 - Total Lunar Eclipse.",
    "event2.jpg;February 4 - New Moon.",
    "event5.jpg;February 19 - Full Moon, Supermoon.",
    "event3.jpg;February 27 - Mercury at Greatest Eastern Elongation.",
    "event2.jpg;March 6 - New Moon."];
    eventList = document.getElementById("eventList");
    populateEventList();

});

function populateNewsList(indexArray, numOfItemsShowing, page) {
    $(newsList).empty();

    var startIndex = (page-1) * numOfItemsShowing;
    var endIndex = startIndex + numOfItemsShowing;
    if(endIndex > indexArray.length)
        endIndex = indexArray.length;

    var animationDelay = 0;
    for (let i = startIndex; i < endIndex; i++) {
        let newsListItem = createNewsListItem(newsData[indexArray[i]].split(";")[0], newsData[indexArray[i]].split(";")[1], newsData[indexArray[i]].split(";")[2]);

        newsList.appendChild(newsListItem);
        $(newsListItem).css("opacity","0");

        setTimeout(function(){
            $(newsListItem).fadeTo(1000, 1.0);
        }, animationDelay*50);
        animationDelay++;
    }
}
function createNewsListItem(img, title, date) {
    var container = document.createElement("div");
    container.classList.add("col-12","col-sm-6","col-lg-4", "newsListItem","mb-3");

    var dateTag = document.createElement("p");
    dateTag.appendChild(document.createTextNode(`Date : ${date}`));

    var image = document.createElement("img");
    image.src = `images/news/${img}`;
    image.alt = "News cover";

    var titleLinkTag = document.createElement("a");
    titleLinkTag.href = "#";

    var titleHeading = document.createElement("h4");
    titleHeading.appendChild(document.createTextNode(title));

    titleLinkTag.appendChild(titleHeading);

    container.appendChild(dateTag);
    container.appendChild(image);
    container.appendChild(titleLinkTag);

    container.animate
    return container;
}
// function getItemsSelectIndexByValue(value) {
//     switch (value) {
//         case "9":
//             return parseInt("0");
//         case "12":
//             return parseInt("1");
//         case "15":
//             return parseInt("2");
//     }
// }
function sortArrayOfIndexesByDate(indexArray, datesArray, desc) {
    for (let i = 0; i < indexArray.length - 1; i++)
        for (let j = 0; j < indexArray.length - 1; j++) {
            let currentDate = new Date(datesArray[indexArray[j]].split(";")[2]);
            let nextDate = new Date(datesArray[indexArray[j + 1]].split(";")[2]);

            if (!desc) {
                if (currentDate.getTime() > nextDate.getTime()) {
                    let c = indexArray[j];
                    indexArray[j] = indexArray[j + 1];
                    indexArray[j + 1] = c;
                }
            }
            else
                if (currentDate.getTime() < nextDate.getTime()) {
                    let c = indexArray[j];
                    indexArray[j] = indexArray[j + 1];
                    indexArray[j + 1] = c;
                }
        }
}
function jumpToPage(event){
    event.preventDefault();

    var linkParent = this.parentElement;
    if(linkParent.classList.contains("active"))
        return;

    var pageNum = parseInt(this.textContent);
    page = pageNum;
    
    populateNewsList(newsDataIndexes, itemsShowingDefault, pageNum);
    updatePaginationArrows();
    updateActivePage();

}
function nextOrPreviousPage(event){
    event.preventDefault();

    var linkParent = this.parentElement;

    var incrementFor = parseInt(linkParent.dataset.increment);

    var nextPage = page + incrementFor;
    var numOfPages = pagination[0].children.length - 2;

    if(nextPage < 1 || nextPage > numOfPages)
        return;

    populateNewsList(newsDataIndexes, itemsShowingDefault, nextPage);
    page = nextPage;

    updatePaginationArrows();
    updateActivePage();
}

function updatePaginationArrows() {
    for (let i = 0; i < pagination.length; i++) {
        var childrenCount = pagination[i].children.length;
        pagination[i].children[0].classList.remove("disabled");
        pagination[i].children[childrenCount - 1].classList.remove("disabled");
        
        if (page == 1)
            pagination[i].children[0].classList.add("disabled");
        else if (page == 3)
            pagination[i].children[childrenCount - 1].classList.add("disabled");
    }
}
function updateActivePage(){
    $(pagination).find("li.active").removeClass("active");
    for(let i = 0; i < pagination.length; i++)
        $(pagination[i]).find("li")[page].classList.add("active");
}

function populateEventList(){

    for (eventItem of eventsDataArray) {
        var eventData = eventItem.split(";");

        var listItem = document.createElement("li");
        listItem.classList.add("collection-item", "avatar");

        var listItemImage = document.createElement("img");
        listItemImage.src = `images/event-icons/${eventData[0]}`;
        listItemImage.classList.add("circle");

        var listItemTitle = document.createElement("span");
        listItemTitle.appendChild(document.createTextNode(eventData[1]));

        listItem.appendChild(listItemImage);
        listItem.appendChild(listItemTitle);

        eventList.appendChild(listItem);
    }
}