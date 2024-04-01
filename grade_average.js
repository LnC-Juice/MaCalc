const path = "#content div.objective div.objective-assessments div.assessment-score span"
let count = 0;
let total = 0;
window.addEventListener('load', function () {

  for (let i of document.querySelectorAll(path)) {
    count += 1
    total += parseInt(i.textContent[0])
  };
  console.log(total/(count))
});
