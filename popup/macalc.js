window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit').addEventListener('click', submit);
    document.getElementById('submit1').addEventListener('click', submit1);
});

function submit() {
    wh = document.getElementById('wh-setting').value;
    lf = document.getElementById('lf-setting').value;
    bc = document.getElementById('bc-setting').value;

    chrome.storage.sync.set({ wheel_settings: wh });
    chrome.storage.sync.set({ listflip_settings: lf});
    chrome.storage.sync.set({ bandedcolor_settings: bc});
}
function submit1() {
    ld = document.getElementById('ld-setting').value;
    sd = document.getElementById('sd-setting').value;

    chrome.storage.sync.set({ large_display: ld });
    chrome.storage.sync.set({ small_display: sd });
}
