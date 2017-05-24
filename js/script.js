//Question Constructor
function Question(question, options, answer) {
    this.question = question;
    this.options = options;
    this.answer = answer;
}

//condition if answer matchs choice
Question.prototype.correctAnswer = function (choice) {
    return this.answer === choice;
}





//Quiz Constructor
function Quiz(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
}

//if guess is true increase score and question index number
Quiz.prototype.guess = function (answer) {
    if (this.currentQuestion().correctAnswer(answer)) {
        this.score++;
    }
    this.currentQuestionIndex++;
}

//current question array number
Quiz.prototype.currentQuestion = function () {
    return this.questions[this.currentQuestionIndex];
}

//condition true if it has reached last index number
Quiz.prototype.hasEnded = function () {
    return this.currentQuestionIndex >= this.questions.length;
}





//Quiz UI
const QuizUI = {
    //display score if all questions asked or print next question with options
    nextQuestion: function () {
        if (capitalsQuiz.hasEnded()) {
            this.displayScore();
        } else {
            this.displayElements();
            this.displayQuestions();
            this.displayOptions();
        }
    },
    //select id and text to print to it
    selectElementById: function (id, text) {
        const element = document.getElementById(id);
        element.innerHTML = text;
    },
    //print question out
    displayQuestions: function () {
        this.selectElementById("question", capitalsQuiz.currentQuestion().question);
    },
    //print options out using a loop
    displayOptions: function () {
        let options = capitalsQuiz.currentQuestion().options;

        for (let i = 0; i < options.length; i++) {
            this.selectElementById("option" + i, options[i]);
            this.guessHandler("option" + i, options[i]);
        }
    },
    //on click its uses .guess() to see if the array number matches the answer
    guessHandler: function (id, option) {
        const button = document.getElementById(id);
        button.onclick = function () {
            capitalsQuiz.guess(option);
            QuizUI.nextQuestion();
        }
    },
    //display final score
    displayScore: function () {
        let html = '<div id="finished">';
        html += '<h2>Quiz Finished</h2>';
        html += '<p>You scored ' + capitalsQuiz.score + '/' + capitalsQuiz.questions.length + '.</p>';
        html += this.scoreAchievements();
        html += '</div>';
        this.selectElementById("section", html);
    },
    //display retry button if not all answers are correct
    scoreAchievements: function () {
        let html = '';
        if (capitalsQuiz.score >= capitalsQuiz.questions.length) {
            html += '<img src="img/gold.png" />';
        } else if (capitalsQuiz.score >= (capitalsQuiz.questions.length - 1)) {
            html += '<img src="img/silver.png" />';
            html += '<a href="index.html">Retry</a>';
        } else if (capitalsQuiz.score >= (capitalsQuiz.questions.length - 2)) {
            html += '<img src="img/bronze.png" />';
            html += '<a href="index.html">Retry</a>';
        } else {
            html += '<a href="index.html">Retry</a>';
        }
        return html;
    },
    //html to display question and answers 
    createElements: function () {
        let html = '<div id="question"></div>';
        html += '<button id="option0" class="options"></button>';
        html += '<button id="option1" class="options"></button>';
        html += '<button id="option2" class="options"></button>';
        html += '<button id="option3" class="options"></button>';
        return html;
    },
    displayElements: function () {
        this.selectElementById("section", this.createElements());
    }
}



//Create Instances
const capitalsQuestions = [
    new Question("What is the capital of France?", ["Lens", "Lille", "Lyon", "Paris"], "Paris"),
    new Question("What is the capital of Spain?", ["Malaga", "Barcelona", "Madrid", "Valencia"], "Madrid"),
    new Question("What is the capital of Germany?", ["Berlin", "Hamburg", "Stuttgart", "Munich"], "Berlin")
];

const capitalsQuiz = new Quiz(capitalsQuestions);

const startButton = document.getElementById('start');
startButton.onclick = function () {
    QuizUI.nextQuestion();
}