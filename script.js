var questionEl = $('.question');
var timerEl = $('.timer');
var answered = false;
var questionOrder = [question0, question1, question2, question3, question4];
var newQuestionOrder = [];
var selectedQuestion = {};
var time = 0;
var questionIndex = 0;
// make an answer key that can be referenced.
var question0 = {question: 'HTML stands for what?', answers: ['Hot Tomatoes Make Lasagna', 'Handy Tool Modern Language', 'Have Teacher Mark Letter','HyperText Markup Language'], correctAnswer: 'HyperText Markup Language'};
var question1 = {question: 'What is means by which browsers decide which CSS property values are the most relevant to an element?', answers: ['Specificity', 'Cool Factor', 'Order','It is random'], correctAnswer: 'Specificity'};
var question2 = {question: 'Which is NOT a JavaScript data type?', answers: ['String', 'Number', 'Cheese','Object'], correctAnswer: 'Cheese'};
var question3 = {question: 'What is JSON used for?', answers: ['Adding large numbers very quickly', 'To send data between computers', 'Make boolean comparisons of variables','Nothing, it is just fancy notation'], correctAnswer: 'To send data between computers'};
var question4 = {question: 'The parts that make up an object are...?', answers: ['Gears', 'Emotions', 'Algebra','Properties'], correctAnswer: 'Properties'};


function timer() {
  time = time - 1;
  timerEl.text(`Time left: ${time}`);
}

function initialize() {
  time = 30;
  timerEl.text(`Time left: ${time}`);
  let k = questionOrder.length;
  for (let index = 0; index < 5; index++) {
    let j = Math.floor(Math.random() * k.length);
    let select = k.splice(j, 1);
    newQuestionOrder.push() = select;
  }
}

function displayQuestion() {
  selectedQuestion = newQuestionOrder[questionIndex];
  let questionTitle = $('<h2>');
  var answer = [$('<button>'), $('<button>'), $('<button>'), $('<button>')];
  questionTitle.text(selectedQuestion.question);
  let k = selectedQuestion.answers;
  for (i = 0; i < 4; i++) {
    let j = Math.floor(Math.random() * k.length);
    answer[i].text(selectedQuestion.answers[j]);
    k.splice(j, 1);
  }
  questionEl.append(questionTitle, answer[0], answer[1], answer[2], answer[3]);
}

function highScore() {
  var timeScore = time;
  timerEl.empty();
  questionEl.empty();
  let scoreList = $('<ul>');
  let iniForm = $('<textarea>');
  let submit = $('<button>');
  questionEl.append(scoreList, iniForm, submit);
  submit.on('click', function(event) {
    event.preventDefault();
    var score = {
      initials: iniForm.val(),
      score: timeScore
    };
    localStorage.setItem('score', JSON.stringify(score));
    var lastScore = JSON.parse(localStorage.getItem('score'));
    if (lastScore !== null) {
      let scoreEl = $('<p>');
      scoreEl.text(lastScore);
      scoreList.append(scoreEl);
    }
  })
}

function compareAnswer(event) {
  if (event.data === selectedQuestion.correctAnswer) {
    if (questionIndex === 4) {
      return highScore();
    }
    else {
    questionIndex++;
    displayQuestion();
    }
  }
  else {
    time = time - 5;
  }
}

function gameOver() {
  questionEl.empty();
  let end = $('<h2>');
  end.text('Game Over');
  questionEl.append(end);
}

function quizGame() {
  while (timer > 0) {
    setInterval(timer, 1000);
    answer[0].on('click', answer[0].text(), compareAnswer);
    answer[1].on('click', answer[1].text(), compareAnswer);
    answer[2].on('click', answer[2].text(), compareAnswer);
    answer[3].on('click', answer[3].text(), compareAnswer);
  }

}
