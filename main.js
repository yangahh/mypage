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
const GAME_TIME = 10;
let wordDisplay = document.querySelector(".word-display");
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let words = [];
let timeInterval;
let checkInterval; // 아주 짧은 시간동안 계속 상태를 체크하는 함수

const wordInput = document.querySelector(".word-input"); // input box에 글자 입력하면 값 받아오기
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const gameBtn = document.querySelector(".button");

// 사용하는 변수들을 화면이 렌더링 되었을 때 바로 선언이 되도록하는 함수(초기값을 세팅하는 역할)
init();

function init() {
  // 이 함수 안에 초기값으로 세팅할 내용들을 다 넣기
  // 1. 단어 불러오기
  getWords();
  // 2. input event가 발생할때마다 값을 가져오기
  wordInput.addEventListener("input", checkWord); // checkWord()을 쓰면 여기서 바로 함수가 실행됨
  // 3. 게임 실행
  gameBtn.addEventListener("click", run);
}

// 단어 불러오는 함수
function getWords() {
  // 자바스크립트에서 제공하는 fetch메소드를 이용해서 api를 호출하는 방법도 있지만 여기서는 axios를 이용해서 api를 호출
  // Make a request for a user with a given ID
  axios
    .get("https://random-word-api.herokuapp.com/word?number=10000")
    .then(function (response) {
      // handle success
      words = response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

// 게임이 실행중인지 아닌지 계속 상태를 체크하는 함수
function checkStatus() {
  if (!isPlaying && time === 0) {
    // 게임이 실행중이지 않고 time이 0이라는 것은 게임이 종료 되었다는 뜻
    buttonChange("Game Start");
    clearInterval(checkInterval); // setInterval을 종료시키기
    // setTimeout(buttonChange(), 1000);
  }
}

// 게임 실행 함수 (버튼을 클릭했을 때 실행됨) >> 버튼을 클릭하면 버튼 스타일 바뀌고(innerText도 바뀜) 초 카운터가 시작됨
function run() {
  buttonChange("playing");
  isPlaying = true;
  time = GAME_TIME; // 실행 전에 time 초기화
  scoreDisplay.innerText = 0; // 점수 초기화
  wordInput.value = ""; // input박스도 초기화
  wordInput.focus(); // 마우스 커서가 input box에 가도록 설정
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 50); // 50ms마다 계속 게임 상태를 확인
}

// 단어 일치 체크하는 함수
function checkWord() {
  // console.log(wordInput.value, wordDisplay.innerHTML.trim()); // trim() : 공백 제거
  // console.log(wordInput.value, wordDisplay.innerText); // 위에랑 같음. innerText : 여백없이 단순히 텍스트만 가져옴
  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    wordInput.value = ""; // 한번 맞게 치면 input 값 초기화

    // 게임중이 아닐 때 입력을 하게 되면 score가 오르지 않도록 해야된다. 따라서 게임중이 아닐때는 return을 시켜서 아래 코드가 실행되지 않게 함
    if (!isPlaying) {
      return;
    }

    score++;
    scoreDisplay.innerText = score;
    const randomIndex = Math.floor(Math.random() * words.length); // Math.random() * num : 최대 num-1 까지의 랜덤한 수
    wordDisplay.innerText = words[randomIndex];
  }
}

// 초 카운트다운 함수 정의
function countDown() {
  time > 0 ? time-- : (isPlaying = false);
  if (!isPlaying) {
    clearInterval(timeInterval); // setInterval 멈추기
    // buttonChange("Game Start");
  }
  timeDisplay.innerText = time;
}

// 게임 버튼 바꾸는 함수 정의
function buttonChange(text) {
  gameBtn.innerText = text;
  text === "playing"
    ? gameBtn.classList.add("loading-btn")
    : gameBtn.classList.remove("loading-btn");
}
