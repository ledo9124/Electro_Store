//Toggle Dark Mode
const btnDarkMode = document.querySelector('.btn-toggle-dark-mode input');

btnDarkMode.onclick = function() {
    document.body.classList.toggle('dark-mode-variables');
}

//Slide Show
const slideShow = document.querySelector('.slide-show .list-items');
const slideListItems = document.querySelectorAll('.slide-show .item');
const dots = document.querySelectorAll('.slide-show .dots li');
console.log(slideShow , slideListItems , dots);

let activeSlide = 0;
let lengthSlide = slideListItems.length - 1;
let refeshSlide = setInterval(() => {
    activeSlide++;
    reloadSlider();
} , 5000);

function reloadSlider() {
    activeSlide = activeSlide > lengthSlide ? 0 : activeSlide;

    let checkLeft = slideListItems[activeSlide].offsetLeft;
    slideShow.style.left = -checkLeft + 'px';

    let activeItem = document.querySelector('.slide-show .item.active');
    activeItem.classList.remove('active');

    slideListItems[activeSlide].classList.add('active');

    let activeDot = document.querySelector('.slide-show .dots li.active');
    activeDot.classList.remove('active');

    dots[activeSlide].classList.add('active');

    clearInterval(refeshSlide);
    refeshSlide = setInterval(() => {
        activeSlide++;
        reloadSlider();
    } , 5000);
};

dots.forEach((li , key) => {
    li.addEventListener('click' , function() {
        activeSlide = key;
        reloadSlider();
    })
});

