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


window.addEventListener('pageshow', function () {


    for (let [c, element] of document.querySelectorAll(cat_path).entries()) {
        c ++;
        let count = 0;
        let total = 0;
        if (document.querySelector(cat_path+':nth-of-type('+c+') '+score_path) != null) {
            for (let i of document.querySelectorAll(cat_path+':nth-of-type('+c+') '+score_path)) {
                count += parseInt(i.textContent[i.textContent.length - 1]);
                total += parseInt(i.textContent[0]);
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

    // large display
    chrome.storage.sync.get('large_display', function(data) {
        let ld = (data.large_display);
        if (ld == null) {
            document.querySelector(ld_path).textContent = score;
            document.querySelector(ld_path).style.left = '15px';
            document.querySelector(ld_path).style.right = '35px';
        } else if (ld != 'default') {
            if (ld == 'sbl') {
                document.querySelector(ld_path).textContent = score;
            } else if (ld == 'letter') {
                document.querySelector(ld_path).textContent = letter;
            };
            
            document.querySelector(ld_path).style.left = '15px';
            document.querySelector(ld_path).style.right = '35px';
        };
    });


    // small display
    chrome.storage.sync.get('small_display', function(data) {
        let sd = (data.small_display);
        if (sd == null) {
            document.querySelector(sd_path).textContent = letter;
            document.querySelector(sd_path).style.fontSize = '25px';
            document.querySelector(sd_path).style.top = '100px';
        } else if (sd != 'default') {
            if (sd == 'letter') {
                document.querySelector(sd_path).textContent = letter;
            } else if (sd == 'sbl') {
                document.querySelector(sd_path).textContent = score;
            } else if (sd == 'none') {
                document.querySelector(sd_path).textContent = '';
            };
            
            document.querySelector(sd_path).style.fontSize = '25px';
            document.querySelector(sd_path).style.top = '100px';
        };
    });
});


}