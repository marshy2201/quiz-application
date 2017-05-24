/*********************
 Question Constructor
*********************/
function Question(question, options, answer) {
    this.question = question;
    this.options = options;
    this.answer = answer;
}

//condition if answer matchs choice
Question.prototype.correctAnswer = function (choice) {
    return this.answer === choice;
}


/*********************
 Quiz Constructor
*********************/
function Quiz(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.answer = false;
}

//if guess is true increase score and question index number
Quiz.prototype.guess = function (answer) {
    if (this.currentQuestion().correctAnswer(answer)) {
        this.score++;
        this.answer = true;
    } else {
        this.answer = false;
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


/*********************
 Quiz UI Object Literal
*********************/
const QuizUI = {
    //display score if all questions asked or print next question with options
    nextQuestion: function () {
        if (capitalsQuiz.hasEnded()) {
            this.displayScore(); 
        } else {
            this.displayElements();
        }
    },
    //select id and text to print to it
    selectElementById: function (id, text) {
        $(id).html(text);
    },
    //print question out
    displayQuestions: function () {
        this.selectElementById("#question", capitalsQuiz.currentQuestion().question);
    },
    //print options out using a loop
    displayOptions: function () {
        const options = capitalsQuiz.currentQuestion().options;
        const $this = this;
        $.each(options, function (i, value) {
            $this.selectElementById("#option" + i, options[i]);
            $this.guessHandler("#option" + i, options[i]);
        });
    },
    //on click its uses .guess() to see if the array number matches the answer
    guessHandler: function (id, option) {
        $(id).click(function () {
            capitalsQuiz.guess(option);
            QuizUI.colorAnswer(id);
            QuizUI.fadeOutPage('#quiz', 500);
        });
    },
    //color the answer green or red if true or false
    colorAnswer: function (id) {
        const $id = $(id);
        if (capitalsQuiz.answer) {
            $id.css('background-color', '#36b55c');
        } else {
            $id.css('background-color', '#e21919');
        }
        $id.css('color', '#fff');
        $('button').prop('disabled', true);
    },
    //display final score
    displayScore: function () {
        let html = '<div id="finished">';
        html += '<h2>Quiz Finished</h2>';
        html += '<p>You scored ' + capitalsQuiz.score + '/' + capitalsQuiz.questions.length + '.</p>';
        html += this.scoreAchievements();
        html += '</div>';
        this.selectElementById("#section", html);
        this.fadeInPage('#finished');
    },
    //display retry button if not all answers are correct and image depending on score
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
            html += '<img src="img/thumbsdown.png" id="thumbsdown" />';
            html += '<a href="index.html">Retry</a>';
        }
        return html;
    },
    //create html to for question and answers 
    createElements: function () {
        let html = '<div id="quiz">';
        html += '<span>Q. ' + (capitalsQuiz.currentQuestionIndex + 1) + '/' + capitalsQuiz.questions.length + '</span>'
        html += '<div id="question"></div>';
        html += '<button id="option0" class="options"></button>';
        html += '<button id="option1" class="options"></button>';
        html += '<button id="option2" class="options"></button>';
        html += '<button id="option3" class="options"></button>';
        html += '</div>';
        return html;
    },
    //display the html
    displayElements: function () {
        this.selectElementById("#section", this.createElements());
        this.displayQuestions();
        this.displayOptions();
        this.fadeInPage('#quiz');
    },
    //element fade in
    fadeInPage: function (id) {
        $(id).hide().fadeIn('slow');
    },
    //element fade out
    fadeOutPage: function (id, value) {
        $(id).delay(value).fadeOut(800, function () {
            QuizUI.nextQuestion();
        });
    }
}


/***********************
 Create Instances
***********************/
const capitalsQuestions = [
    new Question("What is the capital of France?", ["Lens", "Lille", "Lyon", "Paris"], "Paris"),
    new Question("What is the capital of Spain?", ["Malaga", "Barcelona", "Madrid", "Valencia"], "Madrid"),
    new Question("What is the capital of Germany?", ["Berlin", "Hamburg", "Stuttgart", "Munich"], "Berlin"),
    new Question("What is the capital of Italy?", ["Torino", "Rome", "Milan", "Venice"], "Rome"),
    new Question("What is the capital of Portugal?", ["Porto", "Faro", "Coimbra", "Lisbon"], "Lisbon"),
    new Question("What is the capital of China?", ["Beijing", "Shanghai", "Tianjin", "Hangzhou"], "Beijing"),
    new Question("What is the capital of Australia?", ["Brisbane", "Canberra", "Perth", "Sydney"], "Canberra"),
    new Question("What is the capital of Brazil?", ["Rio de Janerio", "Sao Paulo", "Brasilia", "Salvador"], "Brasilia"),
    new Question("What is the capital of Canada?", ["Edmonton", "Toronto", "Ottawa", "Montreal"], "Ottawa"),
    new Question("What is the capital of Libya?", ["Benghazi", "Sabha", "Misrata", "Tripoli"], "Tripoli")
];

const capitalsQuiz = new Quiz(capitalsQuestions);

$('#start').click(function () {
    QuizUI.fadeOutPage('#start', 0);
});