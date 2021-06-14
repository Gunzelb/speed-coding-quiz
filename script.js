var questionEl = $('.question');
var timerEl = $('.timer');
var start = $('#start');
var answered = false;

// make an answer key that can be referenced.
var question0 = {question: 'HTML stands for what?', answers: ['Hot Tomatoes Make Lasagna', 'Handy Tool Modern Language', 'Have Teacher Mark Letter','HyperText Markup Language'], correctAnswer: 'HyperText Markup Language'};
var question1 = {question: 'What is means by which browsers decide which CSS property values are the most relevant to an element?', answers: ['Specificity', 'Cool Factor', 'Order','It is random'], correctAnswer: 'Specificity'};
var question2 = {question: 'Which is NOT a JavaScript data type?', answers: ['String', 'Number', 'Cheese','Object'], correctAnswer: 'Cheese'};
var question3 = {question: 'What is JSON used for?', answers: ['Adding large numbers very quickly', 'To send data between computers', 'Make boolean comparisons of variables','Nothing, it is just fancy notation'], correctAnswer: 'To send data between computers'};
var question4 = {question: 'The parts that make up an object are...?', answers: ['Gears', 'Emotions', 'Algebra','Properties'], correctAnswer: 'Properties'};
var questionOrder = [question0, question1, question2, question3, question4];
var selectedQuestion = {};
var time = 0;
var clock;
var questionIndex = 0;


function timer() {
  time--;
  timerEl.text(`Time left: ${time}`);
  if (time === 0) {
    clearInterval(clock);
    gameOver();
  }
}

function initialize() {
  time = 30;
  timerEl.text(`Time left: ${time}`);
}

function displayQuestion() {
  selectedQuestion = questionOrder[questionIndex];
  var answer = [$('<button>'), $('<button>'), $('<button>'), $('<button>')];
  let questionTitle = $('<h2>');
  questionTitle.text(selectedQuestion.question);
  let k = selectedQuestion.answers;
  for (i = 0; i < 4; i++) {
    let j = Math.floor(Math.random() * k.length);
    answer[i].text(selectedQuestion.answers[j]);
    answer[i].addClass(`answer${i}`);
    k.splice(j, 1);
  }
  questionEl.append(questionTitle, answer[0], answer[1], answer[2], answer[3]);
}

function highScore() {
  clearInterval(clock);
  var timeScore = time;
  timerEl.empty();
  questionEl.empty();
  let scoreTitle = $('<h2>');
  scoreTitle.text('High Scores');
  let scoreList = $('<ul>');
  let iniForm = $('<textarea>');
  iniForm.addClass('m-3 col-8')
  let submit = $('<button>');
  submit.text('Submit');
  submit.addClass('m-3 col-8')
  questionEl.append(scoreTitle, scoreList, iniForm, submit);
  submit.on('click', function(event) {
    event.preventDefault();
    var score = {
      initials: iniForm.val(),
      score: timeScore
    };
    console.log(score);
    localStorage.setItem('score', JSON.stringify(score));
    var lastScore = JSON.parse(localStorage.getItem('score'));
    console.log(lastScore);
    if (lastScore !== null) {
      let scoreEl = $('<li>');
      scoreEl.text(`${lastScore.initials}: ${lastScore.score}`);
      scoreList.append(scoreEl);
    }
  })
}

function compareAnswer(event) {
  if (event.data === selectedQuestion.correctAnswer) {
    if (questionIndex === 4) {
      return highScore();
    }
  questionIndex++;
  questionEl.empty();
  return quizGame();
  }
  else {
    time = time - 5;
  }
}

function gameOver() {
  clearInterval(clock);
  questionEl.empty();
  let end = $('<h2>');
  end.text('Game Over');
  questionEl.append(end);
}

function quizGame() {
  displayQuestion();
  var answer0 = $('.answer0');
  var answer1 = $('.answer1');
  var answer2 = $('.answer2');
  var answer3 = $('.answer3'); 
  answer0.on('click', null, answer0.text(), compareAnswer);
  answer1.on('click', null, answer1.text(), compareAnswer);
  answer2.on('click', null, answer2.text(), compareAnswer);
  answer3.on('click', null, answer3.text(), compareAnswer);
}

start.on('click', function() {
  clock = setInterval(timer, 1000);
  questionEl.empty();
  initialize();
  quizGame();
});
