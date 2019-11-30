var currentImagePosition;
var slider;
var animating;
var sliderTextData;
var endDate;
var meteorTimer;
var supernovaSection;
var resizeTimer;
var supernovaData;


$(document).ready(function () {
    $('.sidenav').sidenav();

    currentImagePosition = 1;
    animating = false;
    slider = document.getElementById("sliderSection");
    sliderTextData = ["The Sun;The Sun has a mass of around 330,000 times that of Earth. It is three quarters hydrogen and most of its remaining mass is helium;It will continue to burn for about 130 million years after it burns through all of its hydrogen, instead burning helium;The energy created by the Sun’s core is nuclear fusion. This huge amount of energy is produced when four hydrogen nuclei are combined into one helium nucleus;The atmosphere of the Sun is composed of three layers: the photosphere, the chromosphere, and the corona",

        "Mercury;One solar day (the time from noon to noon on the planet’s surface) on Mercury lasts the equivalent of 176 Earth days;One of five planets visible with the naked eye a, Mercury is just 4,879 Kilometres across its equator, compared with 12,742 Kilometres for the Earth;Mercury has wrinkles. As the iron core of the planet cooled and contracted, the surface of the planet became wrinkled. Scientist have named these wrinkles, Lobate Scarps;Mercury has a molten core. In recent years scientists from NASA have come to believe the solid iron core of Mercury could in fact be molten",

        "Venus;Venus is sometimes called Earth’s sister planet. This is because their size is very similar (there is only a 638 km different in diameter) and Venus has around 81% of Earth’s mass;Billions of years ago, the climate of Venus may been similar to that of Earth and scientists believe that Venus once possessed large amounts of water or oceans;One day on Venus is longer than one year. Due to the slow rotation on its axis, it takes 243 Earth-days to complete one rotation;Venus is the second brightest natural object in the sky. The planet has an apparent magnitude of -3.8 to -4.6, which makes it visible on a bright, clear day",

        "Earth;Earth is the only planet not named after a god. The other seven planets in our solar system are all named after Roman gods or goddesses;Earth has a powerful magnetic field. This phenomenon is caused by the nickel-iron core of the planet, coupled with its rapid rotation;The Earth’s rotation is gradually slowing. This deceleration is happening almost imperceptibly, at approximately 17 milliseconds per hundred years;As a percentage of the size of the body it orbits, the Moon is the largest satellite of any planet in our solar system",

        "Mars;Mars has the largest dust storms in the solar system. They can last for months and cover the entire planet.;Mars is home to the tallest mountain in the solar system. Olympus Mons, a shield volcano, is 21km high and 600km in diameter;There are signs of liquid water on Mars. For years Mars has been known to have water in the form of ice;Only 18 missions to Mars have been successful. As of September 2014 there have been 40 missions to Mars, including orbiters, landers and rovers but not counting flybys",

        "Jupiter;The first recorded sighting of Jupiter were by the ancient Babylonians in around 7th or 8th BC;Jupiter has the shortest day of the eight planets. The planet rotates very quickly, turning on its axis once every 9 hours and 55 minutes;One orbit of the Sun takes Jupiter 11.86 Earth years. This means that when viewed from Earth, the planet appears to move very slowly in the sky;Jupiter has a faint ring system around it. Its ring is mostly comprised of dust particles from some of Jupiter’s moons during impacts from comets and asteroids",

        "Saturn;Saturn can be seen with the naked eye. It is the fifth brightest object in the solar system and is also easily studied through binoculars or a small telescope;Saturn is the flattest planet. Its polar diameter is 90% of its equatorial diameter, this is due to its low density and fast rotation;Saturn has oval-shaped storms similar to Jupiter’s. The region around its north pole has a hexagonal-shaped pattern of clouds;Saturn is made mostly of hydrogen. It exists in layers that get denser farther into the planet",

        "Uranus;Uranus turns on its axis once every 17 hours, 14 minutes. The planet rotates in a retrograde direction, opposite to the way Earth and most other planets turn; With minimum atmospheric temperature of -224°C Uranus is nearly coldest planet in the solar system;Only one spacecraft has flown by Uranus.In 1986, the Voyager 2 spacecraft swept past the planet at a distance of 81,500 km;Uranus has two sets of very thin dark coloured rings. The ring particles are small, ranging from a dust-sized particles to small boulders",

        "Neptune;Neptune has the second largest gravity of any planet in the solar system – second only to Jupiter;Neptune has a storm similar the Great Red Spot on Jupiter. It is commonly known as the Great Dark Spot and is roughly the size of Earth;Neptune spins very quickly on its axis. The planets equatorial clouds take 18 hours to complete one rotation;Neptune has 14 known moons. The largest of these moons is Titan – a frozen world which spits out particles of nitrogen ice and dust from below its surface"];

    supernovaData = ["Approximately one supernova occurs every second.", "Most chemical elements are made in a supernova.", "They’re brighter than a galaxy.", "Not all supernovae destroy stars.", "Supernovae can create incredibly beautiful remnants.", "The oldest recorded supernova dates back almost 2000 years.", "Supernovae are powerful particle accelerators.", "Supernovae produce radioactivity.", "A nearby supernova could cause a mass extinction.", "Supernovae were used to discover dark energy."];
    document.getElementById("solar-slider-nav-left").addEventListener("click", solarSliderChangeImage);
    document.getElementById("solar-slider-nav-right").addEventListener("click", solarSliderChangeImage);

    animateIntroHeading();
    addSliderText(1);

    meteorTimer = $("#meteorTimer");
    endDate = new Date("2020-04-21");
    setInterval(initializeMeteorRainTimer, 1000);

    supernovaSection = document.getElementById("supernovaSection");
    generateStars();

    window.addEventListener("resize", function () {
        var stars = $(supernovaSection).children("div");
        for (star of stars)
            supernovaSection.removeChild(star);

        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            generateStars();
        }, 500);
    });
});

function animateIntroHeading() {
    var headingTextMain = $("#introHeadingText").children("h1");
    var headingTextDesc = $("#introHeadingText").children("p");

    headingTextDesc.css("opacity", "0");

    slideFadeIn(headingTextMain, 50, 1000, function () {
        slideFadeIn(headingTextDesc, 50, 1000)
    });

}

function slideFadeIn(jqueryObject, travelDistance, duration, callback) {
    jqueryObject.css({
        "position": "relative",
        "top": `-${travelDistance}px`,
        "opacity": "0"
    });
    jqueryObject.animate({
        "top": "0px",
        "opacity": "1"
    }, duration, callback);
}

function solarSliderChangeImage() {

    if (!animating) {
        animating = true;

        var incrementFor = parseInt(this.dataset.incrementfor);

        currentImagePosition += incrementFor;

        if (currentImagePosition == 0)
            currentImagePosition = 9;
        else if (currentImagePosition == 10)
            currentImagePosition = 1;

        slider.style.backgroundImage = `url(images/solar-system/${currentImagePosition}.jpg)`;
        addSliderText(currentImagePosition);
        setTimeout(function () {
            animating = false;
        }, 3000);
    }
}

function addSliderText(sliderPosition) {
    sliderPosition--;

    var planetData = sliderTextData[sliderPosition].split(";");

    var planetName = $("#sliderTextWrapper h4");
    var planetDesc = $("#sliderTextWrapper p");

    planetName.fadeOut(2000, function () {
        planetName.text(planetData[0]);
        planetName.fadeIn(2000);
    });

    for (let i = 1; i < 5; i++) {
        $(planetDesc[i - 1]).fadeOut(2000, function () {
            $(planetDesc[i - 1]).text(planetData[i]);
            $(planetDesc[i - 1]).fadeIn(2000);
        });
    }

    var mobileTextParagraph = $("#sliderMobileText p");

    mobileTextParagraph.fadeOut(2000, function () {
        mobileTextParagraph.text("");
        for (let i = 1; i < 4; i++)
            mobileTextParagraph.text(mobileTextParagraph.text() + planetData[i] + ". ");
        mobileTextParagraph.fadeIn(2000);
    });

}

function initializeMeteorRainTimer() {
    var currentDate = new Date();

    var difference = parseInt((endDate.getTime() - currentDate.getTime()) / 1000);

    var days = parseInt(difference / (60 * 60 * 24));
    var hours = parseInt((difference % (60 * 60 * 24)) / 3600);
    var minutes = parseInt(((difference % (60 * 60 * 24)) % 3600) / 60);
    var seconds = parseInt(((difference % (60 * 60 * 24)) % 3600) % 60);

    // console.log("Days: " + days);
    // console.log("Hours: " + hours);
    // console.log("Minutes: " + minutes);
    // console.log("Seconds: " + seconds);

    updateTimerTag(days, hours, minutes, seconds);
}

function updateTimerTag(days, hours, minutes, seconds) {
    $($(meteorTimer.children()[0]).find("p span")).text(days);
    $($(meteorTimer.children()[1]).find("p span")).text(hours);
    $($(meteorTimer.children()[2]).find("p span")).text(minutes);
    $($(meteorTimer.children()[3]).find("p span")).text(seconds);
}

function generateStars() {

    var parentWidth = supernovaSection.offsetWidth;
    var parentHeight = supernovaSection.offsetHeight;

    var bubbleWidth = 150;
    var bubbleHeight = 125;

    var starWidthAndHeight = 50;

    for (let i = 0; i < supernovaData.length; i++) {
        var top = generateRandomNumber(0, parentHeight - bubbleHeight - starWidthAndHeight);
        var left = generateRandomNumber(0, parentWidth - bubbleWidth - starWidthAndHeight);



        var containerDiv = document.createElement("div");

        var star = createShiningStar(starWidthAndHeight, starWidthAndHeight);
        star.style.left = `${left}px`;
        star.style.top = `${top}px`;
        star.addEventListener("click", function () {
            $(this.nextElementSibling).stop(true, true).fadeToggle(1000);
        })

        var bubble = createTextBubble(supernovaData[i], bubbleWidth, bubbleHeight, "#FFF");
        bubble.style.left = `${left + starWidthAndHeight - 10}px`;
        bubble.style.top = `${top + starWidthAndHeight - 20}px`;

        containerDiv.appendChild(star);
        containerDiv.appendChild(bubble);

        supernovaSection.appendChild(containerDiv);
    }

}
function createTextBubble(text, width, height, color) {
    var bubble = document.createElement("div");
    bubble.style.cssText = `position: absolute; width: ${width}px; height: ${height}px; background-color: ${color};
    border: 1px solid black; border-radius: 5px; padding: 10px; color: black`;

    var textNode = document.createTextNode(text);
    bubble.appendChild(textNode);

    return bubble;
}
function createShiningStar(width, height) {
    var star = document.createElement("img");
    star.width = width;
    star.height = height;
    star.src = "images/shining-star-icon.png";

    star.style.cssText = `position: absolute;`;

    star.classList.add("shining-star");
    return star;
}
function generateRandomNumber(from, to) {
    var random = Math.floor(Math.random() * (to - from + 1) + from);
    return random;
}