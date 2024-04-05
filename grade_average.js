const cat_path = "#content .objective-wrapper .objective";
const score_path = "div.objective-assessments div.assessment-score span";
const ld_path = "#mastery_level_chart > h2";
const sd_path = "#mastery_level_chart > h3";
let cat_score = [];
let cat_percent = [];

let score = 0;
let total_score = 0;
let score_count = 0;

let percent = 0
let percent_count = 0;
let total_percent = 0


window.addEventListener('pageshow', function () {


    for (let [c, element] of document.querySelectorAll(cat_path).entries()) {
        c ++;
        let count = 0;
        let total = 0;
        console.log(document.querySelector(cat_path+':nth-of-type('+c+') '+score_path) != null)
        if (document.querySelector(cat_path+':nth-of-type('+c+') '+score_path) != null) {
            for (let i of document.querySelectorAll(cat_path+':nth-of-type('+c+') '+score_path)) {
                count += parseInt(i.textContent[i.textContent.length - 1]);
                total += parseInt(i.textContent[0]);
            };
        cat_score.push(total/(count/4));
        cat_percent.push((total/count)*100);
        };
    };




    for (let i of cat_score) {
        score_count ++;
        total_score += parseFloat(i);
    };
    score = (total_score/score_count).toFixed(2);


    for (let i of cat_percent) {
        percent_count ++;
        total_percent += parseFloat(i);
    };
    percent = (total_percent/percent_count).toFixed(2);

    


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
        console.log('err in letter calc');
    };

    // large display
    chrome.storage.sync.get('large_display', function(data) {
        let ld = (data.large_display);
        if (ld == null) {
            document.querySelector(ld_path).innerHTML = score;
            document.querySelector(ld_path).style.left = '15px';
            document.querySelector(ld_path).style.right = '35px';
        } else if (ld != 'default') {
            if (ld == 'sbl') {
                document.querySelector(ld_path).innerHTML = score;
            } else if (ld == 'letter') {
                document.querySelector(ld_path).innerHTML = letter;
            } else if (ld == 'percent') {
                document.querySelector(ld_path).innerHTML = percent + '%';
            };
            
            document.querySelector(ld_path).style.left = '15px';
            document.querySelector(ld_path).style.right = '35px';
        };
    });


    // small display
    chrome.storage.sync.get('small_display', function(data) {
        let sd = (data.small_display);
        if (sd == null) {
            document.querySelector(sd_path).innerHTML = letter;
            document.querySelector(sd_path).style.fontSize = '25px';
            document.querySelector(sd_path).style.top = '100px';
        } else if (sd != 'default') {
            if (sd == 'letter') {
                document.querySelector(sd_path).innerHTML = letter;
            } else if (sd == 'sbl') {
                document.querySelector(sd_path).innerHTML = score;
            } else if (sd == 'percent') {
                document.querySelector(sd_path).innerHTML = percent + '%';
            } else if (sd == 'none') {
                document.querySelector(sd_path).innerHTML = '';
            }
            
            document.querySelector(sd_path).style.fontSize = '25px';
            document.querySelector(sd_path).style.top = '100px';
        };
    });


});
