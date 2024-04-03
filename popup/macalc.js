window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit').addEventListener('click', submit);
});

function submit() {
    ld = document.getElementById('ld-setting').value;
    sd = document.getElementById('sd-setting').value;

    chrome.storage.sync.set({ large_display: ld });
    chrome.storage.sync.set({ small_display: sd });
}
