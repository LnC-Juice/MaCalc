window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('back').addEventListener('click', function () {
        for (let i of document.querySelectorAll('.mainhide')) {
            i.setAttribute('class', 'mainhide')
            document.getElementById('main').setAttribute('class','active');
        }
    });
    document.getElementById('settingsbutton').addEventListener('click', function () {
            document.getElementById('main').setAttribute('class', 'hidden');
            document.getElementById('settings').setAttribute('class', document.getElementById('settings').getAttribute('class') + ' active');
    });
    document.getElementById('gradesallbutton').addEventListener('click', function () {
        document.getElementById('main').setAttribute('class', 'hidden');
        document.getElementById('gradesall').setAttribute('class', document.getElementById('gradesall').getAttribute('class') + ' active');
    });
});