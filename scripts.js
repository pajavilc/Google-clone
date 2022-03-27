var isAppsVisible = false;
var isSetingVisible = false;

window.onload = () => {
    getLocation();
    if (localStorage.getItem('theme') === null) {
        localStorage.setItem('theme', 'light');
    }
    else {
        var body = document.getElementById('body');
        body.className = localStorage.getItem('theme');
    }
    updateSwitchText();
    document.getElementById('apps').addEventListener('click', toggleApps);
    document.getElementById('settings').addEventListener('click', toggleSettings);
    document.getElementById('user_image').addEventListener('click', redirectToLogin);
    document.getElementById('themeSwitcher').addEventListener('click', switchThemes);
    document.getElementById("text").addEventListener('input', checkInputValue);
    document.getElementById("cross").addEventListener('click', deleteInputText);
    document.getElementById("body").addEventListener('click', checkClickInside);
    onloadHandler();
}

function toggleApps() {
    window.isAppsVisible = !window.isAppsVisible;
    var drop = document.getElementById('drop');
    drop.className = (window.isAppsVisible ? 'show' : 'hide');
}
function toggleSettings() {
    window.isSetingVisible = !window.isSetingVisible;
    var settings = document.getElementById('settings');
    settings.className = `settings ${(window.isSetingVisible ? 'show' : 'hide')}`
}

function redirectToLogin() {
    window.location.href = "https://myaccount.google.com/"
}


function searchForm(event) {
    event.preventDefault();
    var url = 'https://www.google.com/search?q=' + document.forms["form"]["text"].value;
    window.location.href = url;
}

function luckyReGo() {
    window.location.href = 'https://www.google.com/doodles';
}
function checkClickInside(event) {
    if (window.isAppsVisible) {
        var apps = document.getElementById("drop");
        if (!apps.contains(event.target)) {
            toggleApps();
        }
    }
    if (window.isSetingVisible) {
        var settings = document.getElementById("settings");
        if (!settings.contains(event.target)) {
            toggleSettings();
        }
    }
}
function checkInputValue(e) {
    var text = document.getElementById("text");
    var cross = document.getElementById("cross");

    text.innerHTML = e.target.value;
    if (text.value !== '') {
        cross.className = 'show'
    }
    else {
        cross.className = '';
    }
}

function deleteInputText(e) {
    var text = document.getElementById("text");
    text.value = ''
}

function getLocation() {
    if (localStorage.getItem('location') === null) {

        fetch('https://api.ipregistry.co/?key=tryout')
            .then((response) => response.json())
            .then((data) => {
                var country = data.location.country.name;
                localStorage.setItem('location', country);
                document.getElementById('location').innerText = location;
            })
    }
    else {
        document.getElementById('location').innerText = localStorage.getItem('location');
    }

}

function switchThemes() {
    var body = document.getElementById('body');
    localStorage.setItem('theme', (localStorage.getItem('theme') === 'light') ? 'dark' : 'light');
    body.className = localStorage.getItem('theme');
    updateSwitchText();
}
function updateSwitchText() {
    document.getElementById('themeSwitcher').innerText = `Dark theme: ${(localStorage.getItem('theme') === 'light' ? 'off' : 'on')}`
}