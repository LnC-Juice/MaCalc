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
    document.getElementById('classesbuttom').addEventListener('click', function () {
        document.getElementById('main').setAttribute('class', 'hidden');
        document.getElementById('classes').setAttribute('class', document.getElementById('classes').getAttribute('class') + ' active');
    });
});