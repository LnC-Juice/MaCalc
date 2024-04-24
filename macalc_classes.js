{

const cat_path = "#content .objective-wrapper .objective";
const score_path = "div.objective-assessments div.assessment-score span";

let cat_score = [];
let cat_percent = [];

let score = 0;
let total_score = 0;
let score_count = 0;

let gpa = 0;
let gpa_total = [];
let gpa_f = 0;

let link = '';







function get(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let responseText = xhr.responseText;
            
            // Remove <script> and <link> elements before parsing
            responseText = responseText.replace(/<script[\s\S]*?<\/script>/g, ""); // Remove all script tags
            responseText = responseText.replace(/<link[\s\S]*?>/g, ""); // Remove all link tags
            responseText = responseText.replace(/<style[\s\S]*?<\/style>/g, ""); // Removing all style tags
            responseText = responseText.replace(/<img[\s\S]*?\/>/g, ""); // Remove all img tags
            responseText = responseText.replace(/<meta[\s\S]*?>/g, ""); // Remove all meta tags
            
            // Now parse the cleaned HTML content
            let parser = new DOMParser();
            let doc = parser.parseFromString(responseText, "text/html");
            
            callback(doc);
        }
    };
    xhr.open("GET", url, true);
    xhr.responseType = "text"; // Make sure response is treated as text
    xhr.send();
}



// Kind of a quick & easy way to write this, not at all the most efficient
class Batch {
    
    constructor(callback) {
        this.callback = callback;
        this.batch = [];
    }

    add(id) {
        this.batch.push(id);
    }

    remove(id) {
        this.batch = this.batch.splice((this.batch.indexOf(id), 1))
        if (this.batch.length === 0) this.callback();
    }
}




window.addEventListener('pageshow', function () {

    for (let i of document.querySelectorAll('.preview_graph_container')) {
        i.remove();
    }

    let gpa_status = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    gpa_status.setAttribute('width','250px');
    gpa_status.setAttribute('height','250px');
    gpa_status.setAttribute('viewBox', '0 0 250 250');

    let gpa_status_b = document.createElementNS("http://www.w3.org/2000/svg",'circle');
    gpa_status_b.setAttribute('r', '100');
    gpa_status_b.setAttribute('cx', '125');
    gpa_status_b.setAttribute('cy', '125');
    gpa_status_b.setAttribute('stroke', '#1566b2');
    gpa_status_b.setAttribute('stroke-width', '30');
    gpa_status_b.setAttribute('fill', 'none');
    gpa_status_b.setAttribute('stroke-dashoffset', (Math.PI*100*2*0.25));

    let gpa_status_g = document.createElementNS("http://www.w3.org/2000/svg",'circle');
    gpa_status_g.setAttribute('r', '100');
    gpa_status_g.setAttribute('cx', '125');
    gpa_status_g.setAttribute('cy', '125');
    gpa_status_g.setAttribute('stroke', '#76bb00');
    gpa_status_g.setAttribute('stroke-width', '30');
    gpa_status_g.setAttribute('fill', 'none');
    gpa_status_g.setAttribute('stroke-dashoffset', (Math.PI*100*2*0.25));

    let gpa_status_y = document.createElementNS("http://www.w3.org/2000/svg",'circle');
    gpa_status_y.setAttribute('r', '100');
    gpa_status_y.setAttribute('cx', '125');
    gpa_status_y.setAttribute('cy', '125');
    gpa_status_y.setAttribute('stroke', '#f3cf00');
    gpa_status_y.setAttribute('stroke-width', '30');
    gpa_status_y.setAttribute('fill', 'none');
    gpa_status_y.setAttribute('stroke-dashoffset', (Math.PI*100*2*0.25));

    let gpa_status_r = document.createElementNS("http://www.w3.org/2000/svg",'circle');
    gpa_status_r.setAttribute('r', '100');
    gpa_status_r.setAttribute('cx', '125');
    gpa_status_r.setAttribute('cy', '125');
    gpa_status_r.setAttribute('stroke', '#e50900');
    gpa_status_r.setAttribute('stroke-width', '30');
    gpa_status_r.setAttribute('fill', 'none');
    gpa_status_r.setAttribute('stroke-dashoffset', (Math.PI*100*2*0.25));
    

    let gpa_status_out = document.createElementNS("http://www.w3.org/2000/svg",'circle');
    gpa_status_out.setAttribute('r', '100');
    gpa_status_out.setAttribute('cx', '125');
    gpa_status_out.setAttribute('cy', '125');
    gpa_status_out.setAttribute('stroke', '#000000');
    gpa_status_out.setAttribute('stroke-width', '33');
    gpa_status_out.setAttribute('fill', 'none');
    gpa_status_out.setAttribute('stroke-dashoffset', (Math.PI*102*2*0.25));
    gpa_status_out.setAttribute('stroke-dasharray', (Math.PI*102*2)+' 0');
    
    const gpaCallback = () => {
            
            
            
        for (let gpa_i of gpa_total) {
            gpa_f += gpa_i;
        }
        gpa = (gpa_f/(gpa_total.length));
        
        
        
        // (Math.PI*100*2)*p
        gpa_status_r.setAttribute('stroke-dasharray', (Math.PI*100*2)+' 0');
        if (gpa > 1) {
            gpa_status_r.setAttribute('stroke-dashoffset', (Math.PI*100*2*0.25)+(Math.PI*100*2*(-gpa+2)));
            gpa_status_r.setAttribute('stroke-dasharray', (Math.PI*100*2*(-gpa+2))+' '+(Math.PI*100*2*(gpa-1)));
            gpa_status_y.setAttribute('stroke-dasharray', (Math.PI*100*2*(gpa-1))+' '+(Math.PI*100*2*(-gpa+2)));
            
            if (gpa > 2) {
                gpa_status_r.setAttribute('stroke-dasharray', '0 '+(Math.PI*100*2));
                gpa_status_y.setAttribute('stroke-dashoffset', (Math.PI*100*2*0.25)+(Math.PI*100*2*(-gpa+3)));
                gpa_status_y.setAttribute('stroke-dasharray', (Math.PI*100*2*(-gpa+3))+' '+(Math.PI*100*2*(gpa-2)));
                gpa_status_g.setAttribute('stroke-dashoffset', (Math.PI*100*2)*0.25);
                gpa_status_g.setAttribute('stroke-dasharray', (Math.PI*100*2*(gpa-2))+' '+(Math.PI*100*2*(-gpa+3)));
                
                if (gpa > 3) {
                    gpa_status_y.setAttribute('stroke-dasharray', '0 '+(Math.PI*100*2));
                    gpa_status_g.setAttribute('stroke-dashoffset', (Math.PI*100*2*0.25)+(Math.PI*100*2*(-gpa+4)));
                    gpa_status_g.setAttribute('stroke-dasharray', (Math.PI*100*2*(-gpa+4))+' '+(Math.PI*100*2*(gpa-3)));
                    gpa_status_b.setAttribute('stroke-dashoffset', (Math.PI*100*2)*0.25);
                    gpa_status_b.setAttribute('stroke-dasharray', (Math.PI*100*2*(gpa-3))+' '+(Math.PI*100*2*(-gpa+4)));
        }}}




        gpa_status.appendChild(gpa_status_out);
        gpa_status.appendChild(gpa_status_b);
        gpa_status.appendChild(gpa_status_g);
        gpa_status.appendChild(gpa_status_y);
        gpa_status.appendChild(gpa_status_r);




        let textdiv_gpa = document.createElement('div');
        let h3_gpa = document.createElement('h3');
        let h1_gpa = document.createElement('h1');
        let gpa_div = document.createElement('div');
        
        gpa_div.style.paddingTop = '75px';
        gpa_div.style.width = '250px';
        gpa_div.style.height = '250px';
        gpa_div.style.display = 'grid';


        textdiv_gpa.style.position = 'absolute';
        textdiv_gpa.style.alignSelf = 'center';
        textdiv_gpa.style.justifySelf = 'center';

        h3_gpa.style.textAlign = 'center';
        h3_gpa.style.fontSize = '25px';
        h3_gpa.style.fontWeight = '600';
        h3_gpa.style.color = 'grey';
        h3_gpa.style.margin = '0px';
        h3_gpa.textContent = 'Year GPA:';
        
        
        h1_gpa.style.textAlign = 'center';
        h1_gpa.style.fontSize = '50px';
        h1_gpa.style.fontWeight = '800';
        h1_gpa.style.margin = '0px';
        h1_gpa.textContent = gpa.toFixed(2);





        const wheel = {grid:'grid', none:'none'};
        chrome.storage.sync.get('wheel_settings', function(data) {
            let ws = (data.wheel_settings);
            wheel[ws] ? ws : ws = 'grid';
            gpa_div.style.display = wheel[ws];
            
            
            if (wheel[ws] == 'grid') {
                document.getElementById('only_column').style.width = '80%';

                document.getElementById('content').style.display = 'flex';
                document.getElementById('content').style.justifyContent = 'space-between';

                document.getElementById('main').style.margin = '12px 8vw';
                document.getElementById('main').style.width = 'auto';
            }
        });



        textdiv_gpa.appendChild(h3_gpa);
        textdiv_gpa.appendChild(h1_gpa);
        gpa_div.appendChild(textdiv_gpa);
        gpa_div.appendChild(gpa_status);
        
        document.getElementById('content').appendChild(gpa_div);

    }

    let gradeRequests = new Batch(gpaCallback);
    gradeRequests.add("Start");
    for (let i of document.querySelectorAll('#content .classroom > .classroom_details')) {
        link = i.querySelector('a').href;

        gradeRequests.add(link);


        get(link + '/progress', function (page) {


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
            

            if (cat_score.length === 0) {
                gradeRequests.remove(link);
                return;
            }

            for (let i of cat_score) {
                score_count ++;
                total_score += parseFloat(i);
            };
            score = (total_score/score_count).toFixed(2);



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



            gradeRequests.remove(link);
        });

    };
    gradeRequests.remove("Start");
    
    
    
    const listflip = {'180':'180', '0':'0'};
    chrome.storage.sync.get('listflip_settings', function(data) {
        let lf = (data.listflip_settings);
        listflip[lf] ? lf : lf = 180;
        for (let i of document.querySelectorAll('ul.sortable')) {
            i.style.transform = 'rotate('+listflip[lf]+'deg)';
        }
        for (let i of document.querySelectorAll('ul.sortable > li')) {
            i.style.transform = 'rotate(-'+listflip[lf]+'deg)';
        }
        
    });
    


    const bandedcolor = {'#FFF':'#FFF', '#EEE':'#EEE'};
    chrome.storage.sync.get('bandedcolor_settings', function(data) {
        let bc = (data.bandedcolor_settings);
        bandedcolor[bc] ? bc : bc = '#EEE';
        for (let i = 1; i < document.querySelectorAll('.classroom').length; i += 2) {
            document.querySelectorAll('.classroom')[i].style.backgroundColor = bandedcolor[bc];
        }
    });

});


};