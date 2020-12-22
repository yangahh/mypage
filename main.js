"user strict";

// Navigation
const navMenuBtn = document.querySelector(".nav-btn-item");
const navMenuList = document.querySelector(".navbar-menu");

// 메뉴 버튼이 클릭될 때마다 이벤트 처리
navMenuBtn.addEventListener("click", () => {
  // 클릭했을 때 active가 있다면 넣어주고 없으면 빼기
  navMenuList.classList.toggle("active");
});

// Game page
// input box에 글자 입력하면 값 받아오기
