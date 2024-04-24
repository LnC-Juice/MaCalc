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


function renderScores() {

    cat_score = [];
    total_score = 0;
    score_count = 0;
    for (let [c, element] of document.querySelectorAll(cat_path).entries()) {
        c ++;
        let count = 0;
        let total = 0;
        if (document.querySelector(cat_path+':nth-of-type('+c+') '+score_path) != null) {
            for (let i of document.querySelectorAll(cat_path+':nth-of-type('+c+') '+score_path)) {
                i.addEventListener("click", editGrades);
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
window.addEventListener('pageshow', renderScores);

// What if scores
/* TODO : FOLLOW SNAKE CASE NAMING CONVENTION.
    REVIEW AND CLEAN UP CODE
*/
const templateCategories = {
    "25": {text: "R", color: "#e50900"},
    "50": {text: "NM", color: "#f3cf00"},
    "75": {text: "M", color: "#76bb00"},
    "Default": {text: "XM", color: "#1566b2"}
}
const templateGrade = document.querySelector(cat_path+ "div.assessment-thumbnails > ul > li")?.cloneNode();
console.log(templateGrade);

// we use two forms because... the website is annoying about one form w/ a hidden button.
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

const denominator = numerator.cloneNode();
denominator.id = "mecalc-denominator"

const denominatorInput = numeratorInput.cloneNode();
denominatorInput.id = "macalc-denominator-input";


function finishEditingGrades(event) {
    let oldScores = event.currentTarget.parentElement.getAttribute("macalc-preserve-scores").split(/ +/g);
    let num = document.querySelector("#macalc-numerator-input").value
    let den = document.querySelector("#macalc-denominator-input").value

    let scores = (num.match(/^[0-9]*$/g) ? num : oldScores[0]) + " / " + (den.match(/^[0-9]*$/g) ? den : oldScores[2]);

    let assignment_banner = event.currentTarget.parentElement.parentElement.parentElement.querySelector(".assessment-mastery") // Wow, inheritance :D
    event.currentTarget.parentElement.removeAttribute("macalc-modified");
    event.currentTarget.parentElement.innerHTML = scores;

    scores = scores.split(" ");
    let percent = (scores[0]/scores[2]).toFixed(2)*100;
    // Modify assignment displays for visual effect
    let modifier;
    for (let i of Object.keys(templateCategories)) {
        if (percent > Number.parseInt(i, 10) && i !== "Default") continue;
        modifier = templateCategories[i]; 
        break;
    }
    assignment_banner.style["background-color"] = modifier.color;
    assignment_banner.firstElementChild.innerText = modifier.text;

    renderScores();
}


function editGrades(event) {
    // if (!editGrades) return;
    
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();

    if (event.currentTarget.getAttribute("macalc-modified") !== "true") {
        event.currentTarget.setAttribute("macalc-modified", "true");
        event.currentTarget.setAttribute("macalc-preserve-scores", event.currentTarget.textContent);
        let scores = event.currentTarget.textContent.split(/ +/g);
        if (document.querySelector("#macalc-numerator")) {
            finishEditingGrades({currentTarget: document.querySelector("#macalc-numerator")})
        }

        let num = numerator.cloneNode();
        num.appendChild(numeratorInput.cloneNode());
        num.firstChild.setAttribute("value", scores[0]);
        let den = numerator.cloneNode();
        den.appendChild(denominatorInput.cloneNode());
        den.firstChild.setAttribute("value", scores[2]);

        let slash = document.createElement("span");
        slash.innerText = " / "

        num.addEventListener("submit", finishEditingGrades);
        den.addEventListener("submit", finishEditingGrades);

        event.currentTarget.innerText = "";
        event.currentTarget.appendChild(num);
        event.currentTarget.appendChild(slash);
        event.currentTarget.appendChild(den);
    }
}

}