const path = "#content div.objective div.objective-assessments div.assessment-score span";
let count = 0;
let total = 0;
const ld_path = "#mastery_level_chart > h2";
const sd_path = "#mastery_level_chart > h3";


window.addEventListener('pageshow', function () {

    for (let i of document.querySelectorAll(path)) {
    count += 1;
    total += parseInt(i.textContent[0]);
    };

    // sbl score
    let score = (total/count).toFixed(2);
    let percent = ((total/(count*4)).toFixed(2))*100;
    


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
