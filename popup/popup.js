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
    


    const displays = {letter:'letter', sbl:'sbl', gpa:'gpa', default:'default', none:'none'}

    chrome.storage.sync.get('large_display', function(data) {
        let ld = (data.large_display);
        displays[ld] ? ld : ld = 'sbl';
        document.querySelector('#ld-setting option[value="'+displays[ld]+'"]').setAttribute('selected', 'True')
    })

    chrome.storage.sync.get('small_display', function(data) {
        let sd = (data.small_display);
        displays[sd] ? sd : sd = 180;
        document.querySelector('#sd-setting option[value="'+displays[sd]+'"]').setAttribute('selected', 'True')
    })




    const wheel = {grid:'grid', none:'none'};
    chrome.storage.sync.get('wheel_settings', function(data) {
        let ws = (data.wheel_settings);
        wheel[ws] ? ws : ws = 'grid';
        document.querySelector('#wh-setting option[value="'+wheel[ws]+'"]').setAttribute('selected', 'True')
    })
    const listflip = {'180':'180', '0':'0'};
    chrome.storage.sync.get('listflip_settings', function(data) {
        let lf = (data.listflip_settings);
        listflip[lf] ? lf : lf = 180;
        document.querySelector('#lf-setting option[value="'+listflip[lf]+'"]').setAttribute('selected', 'True')
    })
    const bandedcolor = {'#FFF':'#FFF', '#EEE':'#EEE'};
    chrome.storage.sync.get('bandedcolor_settings', function(data) {
        let bc = (data.bandedcolor_settings);
        bandedcolor[bc] ? bc : bc = '#EEE';
        document.querySelector('#bc-setting option[value="'+bandedcolor[bc]+'"]').setAttribute('selected', 'True')
    })
});