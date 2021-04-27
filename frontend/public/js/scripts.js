// Initializing Animate On Scroll (AOS) plugin
// AOS.init({
//     offset: 200,
//     duration: 2000
// });


console.log('hello world');

// LOGIC FOR THE FUNCTIONALITY OF THE MENU BAR IN SMALLER SCREEN
const hamburger = document.querySelector(".hamburger");

const navLinks = document.querySelector(".nav-links");

const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () =>{
    navLinks.classList.toggle("open");

    links.forEach(link =>{
        link.classList.toggle('fade');
    });
});


// Logic for the welcome/details section registration form
const slidePage = document.querySelector(".slidepage");
const firstNextBtn = document.querySelector(".nextBtn");
const nextBtnSec = document.querySelector(".next-1");
// const nextBtnThird = document.querySelector(".next-2");
const prevBtnSec = document.querySelector(".prev-1");
const prevBtnThird = document.querySelector(".prev-2");
// const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");

let max = 4;
let current = 1;

firstNextBtn.addEventListener("click", function(){
	slidePage.style.marginLeft = '-25%';
	bullet[current - 1].classList.add('active');
	progressCheck[current - 1].classList.add('active');
	progressText[current - 1].classList.add('active');
	current += 1;
});

nextBtnSec.addEventListener("click", function(){
	slidePage.style.marginLeft = '-50%';
	bullet[current - 1].classList.add('active');
	progressCheck[current - 1].classList.add('active');
	progressText[current - 1].classList.add('active');
	current += 1;
});
// nextBtnThird.addEventListener("click", function(){
// 	slidePage.style.marginLeft = '-75%';
// 	bullet[current - 1].classList.add('active');
// 	progressCheck[current - 1].classList.add('active');
// 	progressText[current - 1].classList.add('active');
// 	current += 1;
// });
submitBtn.addEventListener("click", function(){
	bullet[current - 1].classList.add('active');
	progressCheck[current - 1].classList.add('active');
	progressText[current - 1].classList.add('active');
	current += 1;

	// setTimeout(function(){
	// 	alert("backend functionality COMING SOON!!!");
	// 	location.reload();
	// }, 1500);
});
prevBtnSec.addEventListener("click", function(){
	slidePage.style.marginLeft = '0%';
	bullet[current - 2].classList.remove('active');
	progressCheck[current - 2].classList.remove('active');
	progressText[current - 2].classList.remove('active');
	current -= 1;
});
prevBtnThird.addEventListener("click", function(){
	slidePage.style.marginLeft = '-25%';
	bullet[current - 2].classList.remove('active');
	progressCheck[current - 2].classList.remove('active');
	progressText[current - 2].classList.remove('active');
	current -= 1;
});
// prevBtnFourth.addEventListener("click", function(){
// 	slidePage.style.marginLeft = '-50%';
// 	bullet[current - 2].classList.remove('active');
// 	progressCheck[current - 2].classList.remove('active');
// 	progressText[current - 2].classList.remove('active');
// 	current -= 1;
// });

