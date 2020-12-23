"user strict";

// target.addEventListener('발생 이벤트', '실행할 기능(보통 함수를 작성한다)')

//// Navigation
const navMenuBtn = document.querySelector(".nav-btn-item"); // 계속 querySelector를 쓰기 귀찮으니까 변수에 담아두고 사용한다.
const navMenuList = document.querySelector(".navbar-menu");

// 메뉴 버튼이 클릭될 때마다 이벤트 처리
navMenuBtn.addEventListener("click", () => {
  // navMenuBtn에 특정 이벤트 발생시 어떤 기능을 하도록 처리.
  // 클릭했을 때 active가 있다면 넣어주고 없으면 빼기
  navMenuList.classList.toggle("active");
  // classList.add() : 클래스를 필요에 따라 삽입 (주로 조건문이랑 같이 쓰임)
  // classList.remove() : 클래스를 필요에 따라 삭제 (주로 조건문이랑 같이 쓰임)
  // classList.contains : 값이 존재하는지 체크한다 (true/false)
  // classList.toggle(): 클래스값이 있는지 체크하고 없으면 더하고 있으면 제거한다 (위 3가지를 한번에 해결!)
});

///////////////////////////////////////////////////////////////////

//// Game
let wordDisplay = document.querySelector(".word-display");
let score = 0;
const GAME_TIME = 5;
let time = GAME_TIME;
let isPlaying = false;

const wordInput = document.querySelector(".word-input"); // input box에 글자 입력하면 값 받아오기
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const gameBtn = document.querySelector(".button");

// input event가 발생할때마다 값을 가져오기
wordInput.addEventListener("input", () => {
  // console.log(wordInput.value, wordDisplay.innerHTML.trim()); // trim() : 공백 제거
  // console.log(wordInput.value, wordDisplay.innerText); // 위에랑 같음. innerText : 여백없이 단순히 텍스트만 가져옴
  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    score++;
    scoreDisplay.innerText = score;
    wordInput.value = ""; // 한번 맞게 치면 input 값 초기화
  }
});

// 버튼을 클릭하면 버튼 스타일 바뀌고(innerText도 바뀜) 초 카운터가 시작됨
gameBtn.addEventListener("click", () => {
  buttonChange("loading");
  time = GAME_TIME; // 실행 전에 time 초기화
  isPlaying = true;
  timeInterval = setInterval(countDown, 1000);
});

// 초 카운트다운 함수 정의
function countDown() {
  time > 0 ? time-- : (isPlaying = false);
  if (!isPlaying) {
    clearInterval(timeInterval); // setInterval 멈추기
    buttonChange("Game Start");
  }
  timeDisplay.innerText = time;
}

// 게임 버튼 바꾸는 함수 정의
function buttonChange(text) {
  gameBtn.innerText = text;
  text === "loading"
    ? gameBtn.classList.add("loading-btn")
    : gameBtn.classList.remove("loading-btn");
}
