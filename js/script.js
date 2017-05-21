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

//current question array number
Quiz.prototype.currentQuestion = function () {
    return this.questions[this.currentQuestionIndex];
}

//if guess is true increase score and question index number
Quiz.prototype.guess = function () {
    if(this.currentQuestion().correctAnswer()) {
        this.score++;
    }
    this.currentQuestionIndex++;
}

//condition true if it has reached last index number
Quiz.prototype.hasEnded = function () {
    return this.currentQuestionIndex >= this.questions.length;
}





//Quiz UI
const QuizUI = {
    nextQuestion: function() {
        this.displayQuestions();
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
    //print options out
    displayOptions: function () {

    }

}



//Create Instances

const capitalsQuestions = [
    new Question("What is the capital of France?", ["Lens", "Lille", "Lyon", "Paris"], "Paris"),
    new Question("What.....", ["????"], "????")
];

const capitalsQuiz = new Quiz(capitalsQuestions);

QuizUI.nextQuestion();