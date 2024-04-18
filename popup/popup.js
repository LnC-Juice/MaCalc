window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('back').addEventListener('click', function () {
        for (let i of document.querySelectorAll('.mainhide')) {
            i.setAttribute('class', 'mainhide')
            document.getElementById('main').setAttribute('class','active');
        }
    });
    document.getElementById('progressbutton').addEventListener('click', function () {
            document.getElementById('main').setAttribute('class', 'hidden');
            document.getElementById('progress').setAttribute('class', document.getElementById('progress').getAttribute('class') + ' active');
    });
    document.getElementById('generalbuttom').addEventListener('click', function () {
        document.getElementById('main').setAttribute('class', 'hidden');
        document.getElementById('general').setAttribute('class', document.getElementById('general').getAttribute('class') + ' active');
    });
});