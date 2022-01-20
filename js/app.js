const filterBtns = document.querySelectorAll(".filter-btn");
const skillsWrap = document.querySelector(".skills");
const skillsBars = document.querySelectorAll(".skill-progress");
const recordsWrapper = document.querySelector(".records");
const recordsNums = document.querySelectorAll(".number");
const footerInput = document.querySelector(".footer-input");
const pofolioEl = document.querySelector(".portfolio");
const scrollUpBtn = document.querySelector(".back-btn-wrap");


// Sử lí footer input

footerInput.addEventListener("focus", () => {
  footerInput.classList.add("focus")
})

footerInput.addEventListener("blur", () => {
  if(footerInput.value != "") return;
  footerInput.classList.remove("focus")
})

//Sử lí Phân loại ở pofolio (Sử dụng fameworks Isotope)
filterBtns.forEach( btn => {
  btn.addEventListener("click", () => {
      filterBtns.forEach( button => {button.classList.remove("active")});
      btn.classList.add("active");

      let filterValue = btn.dataset.filter;

      $(".grid").isotope({filter: filterValue});
  })
});

$('.grid').isotope({

  itemSelector: '.grid-item',
  layoutMode: 'fitRows',
  transitionDuration :"0.6s",
});

// Sử lý chạy thanh About
window.addEventListener("scroll", ()=>{
  skillsEffect();
  countUp();
  crollEvents();
  scrollUp();
})

function checkScroll(el){
  let rect = el.getBoundingClientRect();
  if(window.innerHeight >= rect.top + el.offsetHeight) return true;
  return false;
}

function checkScrollReversed(el){
  let rect = el.getBoundingClientRect();
  if(window.innerHeight <= rect.top + el.offsetHeight) return true;
  return false;
}

function skillsEffect(){
  
  skillsBars.forEach(skill => skill.style.width = skill.dataset.progress)
}

function countUp(){
  if(!checkScroll(recordsWrapper)) return;
  recordsNums.forEach(numb => {
    const updateCount = () => {
      let currentNum = +numb.innerText;
      let maxNum = +numb.dataset.num;
      let speed = 100;
      const increment = Math.ceil(maxNum/speed)

      if(currentNum < maxNum){
        numb.innerText = currentNum + increment;
        setTimeout(updateCount, 1)
      }else{
        numb.innerText = maxNum;
      }
    }

    setTimeout(updateCount,400);
  })
}

function crollEvents (){
  if(!checkScroll(pofolioEl)) return;
  scrollUpBtn.style.display = 'flex';
}

function scrollUp () {
  if(!checkScrollReversed(pofolioEl)) return;
  scrollUpBtn.style.display = 'none';
}