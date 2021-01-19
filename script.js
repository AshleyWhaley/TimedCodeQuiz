// Variable set for timer, event listener, quiz Q and A
var remainingSeconds = 60;
var timerEl = document.querySelector(".timer");
var timerStart;
var start = document.querySelector(".startQuiz");
var buttons = document.querySelector(".buttons");
var container = document.querySelector(".container");
var submit = document.querySelector(".submit");
var scores = [];
var save = [];
var highScoresEl = document.querySelector(".highScoresLink");
var clear = document.querySelector(".clear");
var form = document.querySelector(".submitForm");
var index = 0;
var score = 0;

// Setting an array for the question variable to include questions, answers and correct answers 
var questionList = [
    {
      question: "1. What does HTML stand for?",
      answers: [
        "Hypertext Machine Language",
        "Hightech Madeup Language",
        "Hypertext Markup Language", 
        "Hyper Technical Markup Language"
      ],
      rightAnswer: "Hypertext Markup Language"
    },
    {
      question: "2. Which of the following attributes is used to add link to any element?",
      answers: [
        "link",
        "ref",
        "href", 
        "click"
      ],
      rightAnswer: "href"
    },
    {
      question: "3. How can you open a link in a new browser window?",
      answers: [
        "A href='url' target='_blank'",
        "A href='url' new",
        "A href='url' target='new'",
        "A href='url' target='_window'"
      ], 
      rightAnswer: "A href='url' target='_blank'"
    },
    {
      question:
        "4. What is the name of every homepage on the WWW?",
        answers: [
          "home.html",
          "index.html",
         "Anything you want it to be.html",
         "The name of your website.html"
        ], 
      rightAnswer: "index.html"
    },
    {
      question:
        "5. What is a useful tool used during development and debugging for printing content to the debugger?",
      answers: [
        "for loops",
        "The terminal",
        "console.log",
        "Download an extension"
      ],
      rightAnswer: "for loops"
    },
    { 
      question:
      "6. Where in an HTML document is the correct place to refer to an external style sheet?",
      answers: [
          "In the head section", 
          "At the end of the document",
          "At the top of the document",
          "In the body section"
      ],
      rightAnswer: "In the head section"
  },
  { 
      question:
      "7. What is the correct way to write a JavaScript array?",
      answers: [
          "var colors = 'red', 'green', 'blue'",
          "var colors = (1:'red', 2:'green', 3:'blue')",
          "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
          "var colors = ['red', 'green', 'blue']"
      ],
      rightAnswer: "var colors = ['red', 'green', 'blue']"
  },
  { 
      question:
      "8. How does a FOR loop start?",
      answers: [
          "for (i = 0; i <= 5)",
          "for i = 1 to 5",
          "for (i = 0; i <= 5; i++)", 
          "for (i <= 5; i++)"
      ],
      rightAnswer: "for (i = 0; i <= 5; i++)"
  },
  { 
      question:
      "9. How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
      answers: [
          "if (i != 5)",  
          "if i <> 5",
          "if (i <> 5)",
          "if i =! 5 then"
      ],
      rightAnswer: "if (i != 5)"
  },
  { 
      question:
      "10. How do you call a function named 'myFunction'?",
      answers: [
          "call myFunction();",
          "run myFunction();",
          "call function myFunction();",
          "myFunction();"  
      ],
      rightAnswer: "myFunction();"
  },
  ];

// Event Listener to "Start Quiz" timer:
function startQuiz() {
    start.addEventListener("click", function(event) {
      if (remainingSeconds < 60) {
        event.preventDefault();
      } else {
        timerEl.textContent = "Time: " + remainingSeconds; 
        timer();
        insertQuestion();
      }
    });
  }


// Timer function to countdown from remainingSeconds:
function timer() {
    var timerInterval = setInterval(function() {
      remainingSeconds--;
      timerEl.textContent = "Time: " + remainingSeconds;
      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        timerEl.textContent = "Time's up, You have FAILED!";
      }
    }, 1000);
  }

// In order for the user to be prompted with a questions and for the questions to be in a "new screen"
function insertQuestion() {
  container.innerHTML = "<h2>" + questionList[index].question + "</h2>";
  container.style.textAlign = "center";
  for (var i = 0; i < questionList[index].answers.length; i++) {
    document.querySelector(".answer" + i).innerHTML =
      "<button type='button' class='btn btn-primary'>" +
      questionList[index].answers[i] +
      "</button>";
  }
};
// Adding an event listener for the right answer choice/ button 
buttons.addEventListener("click", function(event) {
  event.preventDefault();
 

  if (event.target.textContent === questionList[index].rightAnswer) {
    score = score + 10;
  } else {
    remainingSeconds = remainingSeconds - 10;
  }
  if (index < questionList.length - 1) {
    index++;
    insertQuestion();
  } else {
    remainingSeconds = 0;
    enterScore();
  }
});

function correctAnswer() {
  return;
}

function enterScore() {
  container.innerHTML = "<h2>You've made it out alive!</h2><br>";
  buttons.innerHTML = "Final score  " + score + "." + "<br><br>";
    var form = document.createElement("form");
    submit.appendChild(form);
    innerHTML = enterInitials;
    var initialsButton = document.querySelector(".initialButton");
  initialsButton.addEventListener("click", function(event) {
    event.preventDefault(); 
    if (localStorage.getItem("user,score") !== null) {
      scores = JSON.parse(localStorage.getItem("user,score"));
    }

    if (scores.length > 0) {
      for (var b = 0; b < scores.length; b++) {
        save.push(scores[b]);
      }
    }


    var userInitials = document.querySelector(".initInput").value;
    var userScore = { userInitials, score };

    save.push(userScore);

    localStorage.setItem("user,score", JSON.stringify(save));
    viewScore();
  });
}

function viewScore() {
  container.innerHTML = "<h2>High Scores!</h2><br>";
  for (var a = 0; a < save.length; a++) {
    var scoreList = document.createElement("div");
    scoreList.textContent =
      "User: " +
      save[a].userInitials +
      "----------------" +
      "   Score: " +
      save[a].score;
    container.appendChild(scoreList);
  }
  buttons.innerHTML = "<button type='button' class='btn btn-primary'>" + "Clear Scores" +
  "</button>";
  form.innerHTML = "<div></div>";
}
startQuiz();