//variables for calculation
var result = 0.0;

//Object variable
const welcomeContainer = document.querySelector(".welcomeContainer");
const optionContainer = document.querySelector(".optionContainer");
const mainPopup = document.querySelector(".mainPopup");
const popup1Container = document.querySelector(".popUp1");
const popup2Container = document.querySelector(".popUp2");
const A_F = document.getElementById("AtoF");
const P_F = document.getElementById("PtoF");
const F_A = document.getElementById("FtoA");
const F_P = document.getElementById("FtoP");

const Data1Info = document.querySelector(".info1");
const Data2Info = document.querySelector(".info2");
const Data3Info = document.querySelector(".info3");
const Data1 = document.querySelector(".data1");
const Data2 = document.querySelector(".data2");
const Data3 = document.querySelector(".data3");
const back = document.querySelector(".back");
const next = document.querySelector(".next");

const finalInfo = document.querySelector(".finalInfo");
const initialInfo = document.querySelector(".initialValue");
const back1 = document.querySelector(".back1");

//결과 종류 변수
const type = [
  "미래 가치는",
  "미래 가치는",
  "매년 입금해야 할 돈은",
  "지금 입금해야 할 돈은",
];

//CLASS VARIABLE
const HIDE = "hide";
const _1SHOW = "oneShow";
const _2SHOW = "twoShow";

function A_to_F(pmt, i, nper) {
  result = pmt * (((1 + i) ** nper - 1) / i);
}

function P_to_F(npv, i, nper) {
  result = npv * (1 + i) ** nper;
}

function F_to_A(fv, i, nper) {
  result = fv * (i / ((1 + i) ** nper - 1));
}

function F_to_P(fv, i, nper) {
  result = fv * (1 / (1 + i) ** nper);
}

//초기 화면으로 돌려놓기
function initialPanal() {
  welcomeContainer.classList.remove(HIDE);
  optionContainer.classList.remove(HIDE);
  popup1Container.classList.add(HIDE);
  mainPopup.classList.add(HIDE);
  popup1Container.classList.remove(_1SHOW);
  Data1.value = "";
  Data2.value = "";
  Data3.value = "";
}

//기존 화면 지우고 새 화면 띄우기
function hide_show() {
  welcomeContainer.classList.add(HIDE);
  optionContainer.classList.add(HIDE);
  popup1Container.classList.remove(HIDE);
  mainPopup.classList.remove(HIDE);
  popup1Container.classList.add(_1SHOW);

  Data2Info.innerHTML = "이자율을 입력하세요 (연 복리 이자율)";
  Data3Info.innerHTML = "복리 횟수를 입력하세요";
}

//결과 화면 띄우기
function showResult(option, money, i, nper) {
  console.log(result);
  if (isNaN(result) !== true) {
    popup1Container.classList.add(HIDE);
    popup1Container.classList.remove(_1SHOW);
    popup2Container.classList.add(_2SHOW);
    popup2Container.classList.remove(HIDE);

    fifinal = new Intl.NumberFormat("en-CA", {
      style: "decimal",
    }).format(result);
    fimoney = new Intl.NumberFormat("en-CA", {
      style: "decimal",
    }).format(money);

    initialInfo.innerHTML = `금액: ${fimoney}원, 이자율: ${
      i * 100
    }%, 복리 횟수: ${nper}번`;
    finalInfo.innerHTML = `${type[option - 1]} ${fifinal}원 입니다.`;
    back1.addEventListener("click", event => {
      popup2Container.classList.add(HIDE);
      popup2Container.classList.remove(_2SHOW);
      initialPanal();
    });
  }
}

//입력값 및 변수 처리
function computerize(option) {
  if (option == 1) {
    const pmt = parseFloat(Data1.value);
    const i = parseFloat(Data2.value) / 100;
    const nper = parseInt(Data3.value);

    A_to_F(pmt, i, nper);
    showResult(option, pmt, i, nper);
  } else if (option == 2) {
    const npv = parseFloat(Data1.value);
    const i = parseFloat(Data2.value) / 100;
    const nper = parseInt(Data3.value);

    P_to_F(npv, i, nper);
    showResult(option, npv, i, nper);
  } else if (option == 3) {
    const fv = parseFloat(Data1.value);
    const i = parseFloat(Data2.value) / 100;
    const nper = parseInt(Data3.value);

    F_to_A(fv, i, nper);
    showResult(option, fv, i, nper);
  } else if (option == 4) {
    const fv = parseFloat(Data1.value);
    const i = parseFloat(Data2.value) / 100;
    const nper = parseInt(Data3.value);

    F_to_P(fv, i, nper);
    showResult(option, fv, i, nper);
  }
}

//입력 화면에서 원래화면으로 돌아갈지 or, 이 후 화면으로 갈 지.
function backOrNext(option) {
  back.addEventListener("click", initialPanal);
  next.addEventListener("click", event => {
    computerize(option);
  });
}

function optionClick() {
  //a/f버튼
  A_F.addEventListener("click", event => {
    hide_show();
    Data1Info.innerHTML = "매년 입금할 금액을 입력하세요";
    const option = 1;
    backOrNext(option);
  });
  P_F.addEventListener("click", event => {
    hide_show();
    Data1Info.innerHTML = "처음 일시불로 입금하는 금액을 입력하세요";
    const option = 2;
    backOrNext(option);
  });
  F_A.addEventListener("click", event => {
    hide_show();
    Data1Info.innerHTML = "원하는 미래 가치를 입력하세요";
    const option = 3;
    backOrNext(option);
  });
  F_P.addEventListener("click", event => {
    hide_show();
    Data1Info.innerHTML = "원하는 미래 가치를 입력하세요";
    const option = 4;
    backOrNext(option);
  });
}

function init() {
  optionClick();
}
init();
