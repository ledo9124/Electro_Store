//Toggle Dark Mode
const btnDarkMode = document.querySelector('.btn-toggle-dark-mode input');

btnDarkMode.onclick = function() {
    document.body.classList.toggle('dark-mode-variables')
}