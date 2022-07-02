import {data} from "./data.js";

const question = document.querySelector(".question");
const variants = document.querySelector(".variants");
const incorrectAlert = document.querySelector(".alert-danger");
const submitBtn = document.querySelector(".submit");

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const fillQuestion = () => {
  incorrectAlert.classList.remove("d-flex");
  incorrectAlert.classList.add("d-none");

  question.innerText = `${allTests[currectTestIndex].index + 1}. ${
    allTests[currectTestIndex].question
  }`;
  variants.querySelectorAll(".variant").forEach((v, index) => {
    v.querySelector("label").innerText =
      allTests[currectTestIndex].variants[index];
  });
};

const allTests = shuffleArray(Object.keys(data)).map((q, index) => {
  return {
    index,
    question: q,
    correctAnswer: data[q][0],
    variants: shuffleArray(data[q]),
  };
});
let currectTestIndex = 0;

fillQuestion();

submitBtn.addEventListener("click", () => {
  const selectedVariant = variants.querySelector("input:checked");
  if (!selectedVariant) {
    alert("Please choose a variant");
    return;
  }
  if (
    selectedVariant.nextElementSibling.innerText ===
    allTests[currectTestIndex].correctAnswer
  ) {
    currectTestIndex++;
    selectedVariant.checked = false;
    fillQuestion();
  } else {
    incorrectAlert.classList.add("d-flex");
    incorrectAlert.classList.remove("d-none");
  }
});
