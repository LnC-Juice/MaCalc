// Copyright (C) 2024 LnC-Juice

{

const cat_path = "#content .objective-wrapper .objective";
const score_path = "div.objective-assessments div.assessment-score span";
const ld_path = "#mastery_level_chart > h2";
const sd_path = "#mastery_level_chart > h3";
let cat_score = [];

let score = 0;
let total_score = 0;
let score_count = 0;

let letter = 0;
let gpa = 0;

function firstRender() {
    for (let i of document.querySelectorAll('.expand-collapse-btn')) {
        i.style.position = 'absolute';
        i.style.width = '100%';
        i.style.height = '55px';
        i.style.top = '0';
        i.style.left = '0';
        i.style.margin = '0';
    }
    document.querySelectorAll(".objective div.assessment-thumbnails > ul").forEach(i => {
        const addAssignmentActive = addAssignment.cloneNode(true);
        addAssignmentActive.addEventListener("click", addDemoAssignment);
        i.appendChild(addAssignmentActive);
    });
    renderScores();
}

function renderScores() {
    cat_score = [];
    total_score = 0;
    score_count = 0;
    for (let [c] of document.querySelectorAll(cat_path).entries()) {
        c ++;
        let count = 0;
        let total = 0;
        if (document.querySelector(cat_path+':nth-of-type('+c+') '+score_path) != null) {
            for (let i of document.querySelectorAll(cat_path+':nth-of-type('+c+') '+score_path)) {
                i.addEventListener("click", editGrades);
                i.style.cursor = "text";
                i.setAttribute("title", "Click to test what-if Scores");
                let texts = i.textContent.split(/ +/g);
                count += parseInt(texts[2]);
                total += parseInt(texts[0]);
            };
            document.querySelector(cat_path+':nth-of-type('+c+') > .objective-mastery > .mastery-letter').textContent = (total/(count/4)).toFixed(2)
            cat_score.push(total/(count/4));
        };
    };



    for (let i of cat_score) {
        score_count ++;
        total_score += parseFloat(i);
    };
    score = (total_score/score_count).toFixed(2);



    // letter & gpa
    let a = [...Array(401).keys()].slice(325);
    let b = [...Array(325).keys()].slice(250);
    let c = [...Array(250).keys()].slice(200);
    let d = [...Array(200).keys()].slice(150);
    let f = [...Array(150).keys()];

    if (a.includes(parseInt(score*100))) {
        letter = 'A';
        gpa = 4;
    } else if (b.includes(parseInt(score*100))) {
        letter = 'B';
        gpa = 3;
    } else if (c.includes(parseInt(score*100))) {
        letter = 'C';
        gpa = 2;
    } else if (d.includes(parseInt(score*100))) {
        letter = 'D';
        gpa = 1;
    } else if (f.includes(parseInt(score*100))) {
        letter = 'F';
        gpa = 0;
    } else {
        console.log('err in letter/gpa calc');
    };

    const displays = {letter, sbl: score, gpa, none: ' '}

    // large display
    chrome.storage.sync.get('large_display', function(data) {
        let ld = (data.large_display);
        if (ld != 'default') {
            displays[ld] ? ld : ld = 'sbl';
            document.querySelector(ld_path).style.left = '15px';
            document.querySelector(ld_path).style.right = '35px';
            document.querySelector(ld_path).textContent = displays[ld];
        }
    });


    // small display
    chrome.storage.sync.get('small_display', function(data) {
        let sd = (data.small_display);
        if (sd != 'default') {
            displays[sd] ? sd : sd = 'letter';
            document.querySelector(sd_path).style.fontSize = '25px';
            document.querySelector(sd_path).style.top = '100px';
            document.querySelector(sd_path).textContent = displays[sd];
        }
    });
}
window.addEventListener('pageshow', firstRender);

// What if scores section



const template_categories = {
    "25": {text: "R", color: "#e50900"},
    "50": {text: "NM", color: "#f3cf00"},
    "75": {text: "M", color: "#76bb00"},
    "Default": {text: "XM", color: "#1566b2"}
}

// Add reset scores functionality
let reset_scores = document.createElement("button");
reset_scores.id = "reset-scores";
// feel free to modify the style ofc, just wanted something half decent
reset_scores.style.width = "200px";
reset_scores.style.height = "50px";
reset_scores.style.margin = "20px";
reset_scores.style.borderStyle = "solid";
reset_scores.textContent = "Reset What-If Scores";
// Without css, gotta resort to events to do styling like this
reset_scores.style.background = "linear-gradient(#0000, rgb(0 0 0/20%)) top/100% 800%";
reset_scores.style.transition = "0.2s";
reset_scores.addEventListener("mouseenter", () => {
    reset_scores.style.backgroundPosition = "bottom";
})
reset_scores.addEventListener("mouseleave", () => {
    reset_scores.style.backgroundPosition = "";
})

reset_scores.setAttribute("hidden", "true");
reset_scores.addEventListener("click", () => {
    reset_scores.setAttribute("hidden", "true");
    document.querySelectorAll("span[macalc-preserve-scores]").forEach(i => {
        let scores = i.getAttribute("macalc-preserve-scores");
        i.textContent = scores;
        scores = scores.split(/ +/g);
        modifyAssessmentDisplays(i.parentElement.parentElement.querySelector(".assessment-mastery"),
            (scores[0]/scores[2]).toFixed(2)*100);
        i.removeAttribute("macalc-preserve-scores");
        i.removeAttribute("macalc-modified");
    })
    document.querySelectorAll(".objective ul > li.macalc-demo-score").forEach(i => i.remove());
    document.querySelectorAll(".objective ul > span").forEach(i => i.remove());
    renderScores();
})

function modifyAssessmentDisplays(assessment_mastery, percent) {
    // Modify assignment displays for visual effect
    let modifier;
    for (let i of Object.keys(template_categories)) {
        if (percent > Number.parseInt(i, 10) && i !== "Default") continue;
        modifier = template_categories[i]; 
        break;
    }
    assessment_mastery.style["background-color"] = modifier.color;
    assessment_mastery.firstElementChild.textContent = modifier.text;
}

function checkScoreValidity() {
    if (document.querySelectorAll("span[macalc-preserve-scores]").length === 0 
        && document.querySelectorAll(".macalc-demo-score").length === 0) {
        reset_scores.setAttribute("hidden", "true");
    }
}

// Layout for the inputs 
// (FYI, this uses two forms because putting two inputs in a single form requires a submit type input, which MasteryConnect is funky with)
const numerator = document.createElement("form");
numerator.setAttribute("method", "dialog");
numerator.style.display = "inline";
numerator.id = "macalc-numerator"

const numeratorInput = document.createElement("input");
numeratorInput.setAttribute("type", "text");
numeratorInput.id = "macalc-numerator-input";
numeratorInput.style.width = "25%";
numeratorInput.setAttribute("maxlength", "2");
numeratorInput.setAttribute("pattern", "[0-9]{1,2}");
numerator.appendChild(numeratorInput);

const denominator = numerator.cloneNode();
denominator.id = "mecalc-denominator"

const denominatorInput = numeratorInput.cloneNode();
denominatorInput.id = "macalc-denominator-input";
denominator.appendChild(denominatorInput);

// Resets to original look, while modifying assignment aesthetic to match and properly recalculating grade.
function finishEditingGrades(event) {
    let old_scores = event.currentTarget.parentElement.getAttribute("macalc-preserve-scores").split(/ +/g);
    let num = document.querySelector("#macalc-numerator-input").value
    let den = document.querySelector("#macalc-denominator-input").value

    let scores = (num.match(/^[0-9]*$/g) ? num : old_scores[0]) + " / " + (den.match(/^[0-9]*$/g) ? den : old_scores[2]);

    if (old_scores.join(" ") === scores) {
        event.currentTarget.parentElement.removeAttribute("macalc-preserve-scores");
        checkScoreValidity();
    } else {
        reset_scores.removeAttribute("hidden");
    }

    let assignment_banner = event.currentTarget.parentElement.parentElement.parentElement.querySelector(".assessment-mastery") // Wow, inheritance :D
    event.currentTarget.parentElement.removeAttribute("macalc-modified");
    event.currentTarget.parentElement.innerHTML = scores;

    scores = scores.split(" ");
    let percent = (scores[0]/scores[2]).toFixed(2)*100;
    modifyAssessmentDisplays(assignment_banner, percent);

    renderScores();
}


function editGrades(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();

    if (event.currentTarget.getAttribute("macalc-modified") !== "true") {
        event.currentTarget.setAttribute("macalc-modified", "true");
        if (!event.currentTarget.hasAttribute("macalc-preserve-scores"))
            event.currentTarget.setAttribute("macalc-preserve-scores", event.currentTarget.textContent);
        let scores = event.currentTarget.textContent.split(/ +/g);

        // Only one grade edit can be active at a time.
        if (document.querySelector("#macalc-numerator")) {
            finishEditingGrades({currentTarget: document.querySelector("#macalc-numerator")})
        }

        let num = numerator.cloneNode(true);
        num.firstChild.setAttribute("value", scores[0]);
        let den = denominator.cloneNode(true);
        den.firstChild.setAttribute("value", scores[2]);

        let slash = document.createElement("span");
        slash.textContent = " / "

        num.addEventListener("submit", finishEditingGrades);
        den.addEventListener("submit", finishEditingGrades);

        event.currentTarget.textContent = "";
        event.currentTarget.appendChild(num);
        event.currentTarget.appendChild(slash);
        event.currentTarget.appendChild(den);
    }
}

window.addEventListener("pageshow", () => document.querySelector("#content .objective-wrapper").append(reset_scores));

// Demo Scores

// Demo Assignment
const demoAssignment = document.createElement("li");
let addAssignment;
function createDemoAssignment() {
    const demoContainer = document.createElement("div");
    demoContainer.classList.add("assessment-thumbnail");
    demoContainer.style.cursor = "pointer";
    // Using anon functions to not clutter consts or variables in the global space
    demoContainer.appendChild((function (){
        const img = document.createElement("img"); 
        img.setAttribute("alt", "assessment thumbnail"); img.classList.add("thumb"); 
        img.setAttribute("src", "https://cdn.masteryconnect.com/images/thumbnail.gif"); 
        return img;
    })());
    demoAssignment.appendChild(demoContainer);
    addAssignment = demoAssignment.cloneNode(true); // Since everything is the same up until after this point
    demoAssignment.classList.add("macalc-demo-score");
    demoContainer.appendChild((function (){
        const banner = document.createElement("div"); 
        const letter = document.createElement("div");
        letter.classList.add("mastery-letter"); 
        letter.textContent = "DEMO"; 
        banner.classList.add("assessment-mastery");
        banner.style.backgroundColor = "#666666"; 
        banner.appendChild(letter); 
        return banner;
    })());
    demoContainer.appendChild((function (){
        const scoreCont = document.createElement("div"); 
        const score = document.createElement("span");
        score.textContent = "0 / 4"; 
        scoreCont.classList.add("assessment-score"); 
        scoreCont.appendChild(score); 
        return scoreCont;
    })())
    const addContainer = addAssignment.querySelector("div.assessment-thumbnail");
    
    // Add Assignment Button (Styling is totally up to yall)
    addContainer.appendChild((function (){
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.setAttribute("xmlns", "https://www.w3.org/2000/svg");
        svg.setAttribute("height", "50px");
        svg.setAttribute("width", "50px");
        svg.setAttribute("style", "position: absolute; bottom: 35%; right: 15%;");
        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line1.setAttribute("stroke", "#888888");
        line1.setAttribute("stroke-width", "10px");
        line1.setAttribute("stroke-linecap", "round");
        const line2 = line1.cloneNode();
        line1.setAttribute("x1", "50");
        line1.setAttribute("y1", "20");
        line1.setAttribute("x2", "50");
        line1.setAttribute("y2", "80");
        
        line2.setAttribute("x1", "20");
        line2.setAttribute("y1", "50");
        line2.setAttribute("x2", "80");
        line2.setAttribute("y2", "50");
        svg.appendChild(line1);
        svg.appendChild(line2);
        return svg;
    })())
    addContainer.appendChild((function (){
        const div = document.createElement("div");
        div.style.padding = "8.5px";
        return div;
    })())
}
createDemoAssignment();

// My soul.... If I were you, I'd minimize that function and never look back. Or find a way to make it look much neater.
// If you can find away I will be forever in your debt.

function addDemoAssignment(event) {
    const demoAssignmentActive = demoAssignment.cloneNode(true);
    demoAssignmentActive.addEventListener("click", removeDemoAssignment);
    demoAssignmentActive.addEventListener("mouseenter", hoverEnterDemoAssignment);
    demoAssignmentActive.addEventListener("mouseleave", hoverExitDemoAssignment);
    event.currentTarget.parentElement.insertBefore(demoAssignmentActive, event.currentTarget);
    event.currentTarget.parentElement.insertBefore(spacer.cloneNode(true), event.currentTarget);
    reset_scores.removeAttribute("hidden");
    renderScores();
}

// For convenience, this is currently listening to the top li element. If accidentally removing assignments gets too annoying,
// that can be changed.
function removeDemoAssignment(event) {
    event.currentTarget.remove();
    document.querySelectorAll(".objective ul > :not(li.macalc-demo-score) + span").forEach(i => i.remove());
    checkScoreValidity();
    renderScores();
}

// Spacer (For consistency)
const spacer = document.createElement("span");
spacer.textContent = " ";

// Interactivity
function hoverEnterDemoAssignment(event) {
    event.currentTarget.querySelector("img").style.filter = "brightness(0.9)";
}
function hoverExitDemoAssignment(event) {
    event.currentTarget.querySelector("img").style.filter = "";
}

}
