{

const cat_path = "#content .objective-wrapper .objective";
const score_path = "div.objective-assessments div.assessment-score span";
const ld_path = "#mastery_level_chart > h2";
const sd_path = "#mastery_level_chart > h3";

let cat_score = [];
let cat_percent = [];

let score = 0;
let total_score = 0;
let score_count = 0;

let percent = 0;
let percent_count = 0;
let total_percent = 0;

let gpa = 0;
let gpa_total = [];
let gpa_f = 0;

let link = '';







function get(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr.responseText);
        };
    };
    xhr.open("GET", url, true);
    xhr.send();
}

let parser = new DOMParser();




window.addEventListener('pageshow', function () {

    for (let i of document.querySelectorAll('.preview_graph_container')) {
        i.remove();
    }



    for (let i of document.querySelectorAll('#content .classroom > .classroom_details')) {
        link = i.querySelector('a').href;


        get(link + '/progress', function (html) {


            let div = document.createElement('div')
            div.setAttribute('class','score');
            div.style.display = 'flex';
            div.style.flexDirection = 'column';
            div.style.alignItems = 'center';
            div.style.justifyContent = 'center';

            div.style.width = '200px';
            div.style.height = '100%';
            div.style.position = 'absolute';
            div.style.top = '0';
            div.style.right = '0';
            div.style.alignContent = 'center';



            let barcontanier = document.createElement('div');
            barcontanier.style.border = '1px solid #000';
            barcontanier.style.borderRadius = '10px';
            barcontanier.style.width = '150px';
            barcontanier.style.height = '15px';
            barcontanier.style.overflow = 'hidden';


            let bar_b = document.createElement('div');
            bar_b.style.display = 'block';
            bar_b.style.float = 'left';
            bar_b.style.height = '15px';
            bar_b.style.width = '0px';
            bar_b.style.backgroundColor = '#1566b2';

            let bar_g = document.createElement('div');
            bar_g.style.display = 'block';
            bar_g.style.float = 'left';
            bar_g.style.height = '15px';
            bar_g.style.width = '0px';
            bar_g.style.backgroundColor = '#76bb00';

            let bar_y = document.createElement('div');
            bar_y.style.display = 'block';
            bar_y.style.float = 'left';
            bar_y.style.height = '15px';
            bar_y.style.width = '0px';
            bar_y.style.backgroundColor = '#f3cf00';

            let bar_r = document.createElement('div');
            bar_r.style.display = 'block';
            bar_r.style.float = 'left';
            bar_r.style.height = '15px';
            bar_r.style.width = '0px';
            bar_r.style.backgroundColor = '#e50900';






            classid = i.querySelector('a').href.slice(47);

            cat_score = [];
            cat_percent = [];
            score = 0;
            total_score = 0;
            score_count = 0;
            percent = 0;
            percent_count = 0;
            total_percent = 0;


            let page = parser.parseFromString(html, "text/html");



            for (let [c, element] of page.querySelectorAll(cat_path).entries()) {
                c ++;
                let count = 0;
                let total = 0;
                if (page.querySelector(cat_path+':nth-of-type('+c+') '+score_path) != null) {
                    for (let i of page.querySelectorAll(cat_path+':nth-of-type('+c+') '+score_path)) {
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

            // console.log(score, classid)

            // letter 
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
                console.log('err in letter calc');
            };

            gpa_total.push(gpa);

            let div_2 = document.createElement('div')
            let h1 = document.createElement('h1');
            let strong = document.createElement('strong');
            let h1_2 = document.createElement('h1');
            let strong_2 = document.createElement('strong');

            div_2.style.display = 'flex';
            div_2.style.justifyContent = 'space-between';
            div_2.style.width = '120px';

            h1_2.setAttribute('class', 'letter_score');

            h1.style.fontSize = '25px';
            h1_2.style.fontSize = '25px';

            strong.textContent = score;
            strong_2.textContent = letter;

            h1.appendChild(strong);
            h1_2.appendChild(strong_2);

            div_2.appendChild(h1);
            div_2.appendChild(h1_2);

            div.appendChild(div_2);


            
            bar_r.style.width = (score*150)+'px';
            if ((score*150) > 150) {
                bar_r.style.width = (150-(score*150-150))+'px';
                bar_y.style.width = (score*150-150)+'px';

                if ((score*150) > 300) {
                    bar_r.style.width = '0px';
                    bar_y.style.width = (150-(score*150-300))+'px';
                    bar_g.style.width = (score*150-300)+'px';

                    if ((score*150) > 450) {
                        bar_y.style.width = '0px';
                        bar_g.style.width = (150-(score*150-450))+'px';
                        bar_b.style.width = (score*150-450)+'px';
            }}}


            barcontanier.appendChild(bar_b);
            barcontanier.appendChild(bar_g);
            barcontanier.appendChild(bar_y);
            barcontanier.appendChild(bar_r);

            div.appendChild(barcontanier);

            document.querySelector('#content #classroom_'+classid+'.classroom > .classroom_details').appendChild(div);


            for (let i = 1; i < document.querySelectorAll('.classroom').length; i += 2) {
                document.querySelectorAll('.classroom')[i].style.backgroundColor = '#eee';
            }
        });

    };



    // add settings if
    for (let i of document.querySelectorAll('ul.sortable')) {
        i.style.transform = 'rotate(180deg)';
    }
    for (let i of document.querySelectorAll('ul.sortable > li')) {
        i.style.transform = 'rotate(-180deg)';
    }


    let gpa_status = document.createElement('div')
    gpa_status.style.border = '1px solid #000';
    gpa_status.style.borderRadius = '10px';
    gpa_status.style.width = '300px';
    gpa_status.style.height = '100%';
    gpa_status.style.overflow = 'hidden';

    let gpa_status_b = document.createElement('div')
    gpa_status_b.style.display = 'block';
    gpa_status_b.style.float = 'left';
    gpa_status_b.style.width = '300px';
    gpa_status_b.style.height = '100px';
    gpa_status_b.style.backgroundColor = '#1566b2';

    let gpa_status_g = document.createElement('div')
    gpa_status_g.style.display = 'block';
    gpa_status_g.style.float = 'left';
    gpa_status_g.style.width = '300px';
    gpa_status_g.style.height = '100px';
    gpa_status_g.style.backgroundColor = '#76bb00';

    let gpa_status_y = document.createElement('div')
    gpa_status_y.style.display = 'block';
    gpa_status_y.style.float = 'left';
    gpa_status_y.style.width = '300px';
    gpa_status_y.style.height = '100px';
    gpa_status_y.style.backgroundColor = '#f3cf00';

    let gpa_status_r = document.createElement('div')
    gpa_status_r.style.display = 'block';
    gpa_status_r.style.float = 'left';
    gpa_status_r.style.width = '300px';
    gpa_status_r.style.height = '100px';
    gpa_status_r.style.backgroundColor = '#e50900';






    if (gpa_total.length == document.querySelectorAll('#content .classroom > .classroom_details').length) {
        console.log(gpa_total);
    }

    setTimeout(() => {
        
        if (gpa_total.length == 0) gpa_status.setAttribute("hidden");


        for (let gpa_i of gpa_total) {
            gpa_f += gpa_i;
        }
        gpa = (gpa_f/(gpa_total.length))*100;




        gpa_status_r.style.height = (gpa)+'%';
        if (gpa > 100) {
            gpa_status_r.style.height = (100-(gpa))+'%';
            gpa_status_y.style.height = (gpa-100)+'%';

            if (gpa > 200) {
                gpa_status_r.style.height = '0px';
                gpa_status_y.style.height = (100-(gpa-100))+'%';
                gpa_status_g.style.height = (gpa-200)+'%';

                if (gpa > 30) {
                    gpa_status_y.style.height = '0px';
                    gpa_status_g.style.height = (100-(gpa-200))+'%';
                    gpa_status_b.style.height = (gpa-300)+'%';
        }}}







        gpa_status.appendChild(gpa_status_b);
        gpa_status.appendChild(gpa_status_g);
        gpa_status.appendChild(gpa_status_y);
        gpa_status.appendChild(gpa_status_r);
    
    
    
    
    
    
        let h1_gpa = document.createElement('h1');
        let h1_gpa_strong = document.createElement('strong');
        let gpa_div = document.createElement('div');
        
        gpa_div.style.width = '300px';
        gpa_div.style.height = 'auto';
        gpa_div.style.display = 'grid';


        h1_gpa.style.alignSelf = 'center';
        h1_gpa.style.justifySelf = 'center';
        h1_gpa.style.position = 'absolute';
        h1_gpa.style.fontSize = '50px';


        h1_gpa_strong.textContent = (gpa/100).toFixed(2);



        document.getElementById('only_column').style.width = '70%';
    
        document.getElementById('content').style.display = 'flex';
        document.getElementById('content').style.justifyContent = 'space-between';
    
        
        
        document.getElementById('main').style.margin = '12px 6vw';
        document.getElementById('main').style.width = 'auto';
    
    
    
    
        h1_gpa.appendChild(h1_gpa_strong);
        gpa_div.appendChild(h1_gpa);
        gpa_div.appendChild(gpa_status);
        
        document.getElementById('content').appendChild(gpa_div);

    }, 1000);

});


};