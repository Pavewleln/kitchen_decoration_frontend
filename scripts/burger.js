const body = document.getElementById("body");
const menuBtn = document.getElementById("burger__menu-btn");
const menu = document.getElementById("menu__list");
menu.addEventListener('click', () => {
    body.classList.remove('active');
	menuBtn.classList.remove('active');
    menu.classList.remove('active');
})
menuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.toggle('active');
	menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
})