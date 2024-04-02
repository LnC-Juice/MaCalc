const path = "#content div.objective div.objective-assessments div.assessment-score span"
let count = 0;
let total = 0;
const score_path = "#mastery_level_chart > h2"
const letter_path = "#mastery_level_chart > h3"

window.addEventListener('pageshow', function () {

    for (let i of document.querySelectorAll(path)) {
    count += 1;
    total += parseInt(i.textContent[0]);
    };

    // sbl score
    let score = (total/count).toFixed(2);
    document.querySelector(score_path).innerHTML = score

    document.querySelector(score_path).style.left = '15px'
    document.querySelector(score_path).style.right = '35px'


    // letter 
    let a = [...Array(401).keys()].slice(325);
    let b = [...Array(325).keys()].slice(250);
    let c = [...Array(250).keys()].slice(200);
    let d = [...Array(200).keys()].slice(150);
    let f = [...Array(150).keys()];

    if (a.includes(parseInt(score*100))) {
        letter = 'A';
    } else if (b.includes(parseInt(score*100))) {
        letter = 'B';
    } else if (c.includes(parseInt(score*100))) {
        letter = 'C';
    } else if (d.includes(parseInt(score*100))) {
        letter = 'D';
    } else if (f.includes(parseInt(score*100))) {
        letter = 'F';
    } else {
        console.log('err in letter calc')
    }

    document.querySelector(letter_path).innerHTML = letter
    document.querySelector(letter_path).style.fontSize = '25px'
    document.querySelector(letter_path).style.top = '100px'


    
});




