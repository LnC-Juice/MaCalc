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

let link = ''







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
        i.remove()
    }



    for (let i of document.querySelectorAll('#content .classroom > .classroom_details')) {
        link = i.querySelector('a').href

        

        get(link + '/progress', function (html) {



            
            let div = document.createElement('div')
            div.setAttribute('class','score')
            div.style.display = 'flex'
            div.style.flexDirection = 'column'
            div.style.alignItems = 'center'
            div.style.justifyContent = 'center'

            div.style.width = '200px'
            div.style.height = '100%'
            div.style.position = 'absolute'
            div.style.top = '0'
            div.style.right = '0'
            div.style.alignContent = 'center'



            let barcontanier = document.createElement('div')
            barcontanier.style.border = '1px solid #000'
            barcontanier.style.borderRadius = '10px'
            barcontanier.style.width = '150px'
            barcontanier.style.height = '15px'
            barcontanier.style.overflow = 'hidden'


            let bar_b = document.createElement('div')
            bar_b.style.display = 'block'
            bar_b.style.float = 'left'
            bar_b.style.height = '15px'
            bar_b.style.width = '0px'
            bar_b.style.backgroundColor = '#1566b2'

            let bar_g = document.createElement('div')
            bar_g.style.display = 'block'
            bar_g.style.float = 'left'
            bar_g.style.height = '15px'
            bar_g.style.width = '0px'
            bar_g.style.backgroundColor = '#76bb00'

            let bar_y = document.createElement('div')
            bar_y.style.display = 'block'
            bar_y.style.float = 'left'
            bar_y.style.height = '15px'
            bar_y.style.width = '0px'
            bar_y.style.backgroundColor = '#f3cf00'

            let bar_r = document.createElement('div')
            bar_r.style.display = 'block'
            bar_r.style.float = 'left'
            bar_r.style.height = '15px'
            bar_r.style.width = '0px'
            bar_r.style.backgroundColor = '#e50900'






            classid = i.querySelector('a').href.slice(47)

            cat_score = [];
            cat_percent = [];
            score = 0;
            total_score = 0;
            score_count = 0;
            percent = 0
            percent_count = 0;
            total_percent = 0


            let page = parser.parseFromString(html, "text/html")



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


            let h1 = document.createElement('h1')
            let strong = document.createElement('strong')

            h1.style.fontSize = '30px'

            strong.textContent = score
            h1.appendChild(strong)
            div.appendChild(h1)


            
            bar_r.style.width = (score*150)+'px'
            if ((score*150) > 150) {
                bar_r.style.width = (150-(score*150-150))+'px'
                bar_y.style.width = (score*150-150)+'px'

                if ((score*150) > 300) {
                    bar_r.style.width = '0px'
                    bar_y.style.width = (150-(score*150-300))+'px'
                    bar_g.style.width = (score*150-300)+'px'

                    if ((score*150) > 450) {
                        bar_y.style.width = '0px'
                        bar_g.style.width = (150-(score*150-450))+'px'
                        bar_b.style.width = (score*150-450)+'px'
            }}}


            barcontanier.appendChild(bar_b)
            barcontanier.appendChild(bar_g)
            barcontanier.appendChild(bar_y)
            barcontanier.appendChild(bar_r)

            div.appendChild(barcontanier)

            document.querySelector('#content #classroom_'+classid+'.classroom > .classroom_details').appendChild(div)


            for (let i = 1; i < document.querySelectorAll('.classroom').length; i += 2) {
                document.querySelectorAll('.classroom')[i].style.backgroundColor = '#eee'
            }

        });
    };
});


