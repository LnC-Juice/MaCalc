const path = "#content div.objective div.objective-assessments div.assessment-score span"
let count = 0;
let total = 0;
const score_path = "#mastery_level_chart > h2"

window.addEventListener('load', function () {

  for (let i of document.querySelectorAll(path)) {
    count += 1;
    total += parseInt(i.textContent[0]);
  };

  // sbl score
  let score = (total/count).toFixed(2);
  document.querySelector(score_path).innerHTML = score

  document.querySelector(score_path).style.left = '15px'
  document.querySelector(score_path).style.right = '35px'


});

