document.addEventListener("DOMContentLoaded", () => {
    const pages = {
        home: document.getElementById('home-page'),
        topics: document.getElementById('topics-page'),
        quiz: document.getElementById('quiz-page'),
    };

    const startQuizButton = document.getElementById('start-quiz');
    const startPlannerButton = document.getElementById("start-planner");
    const topicButtons = document.querySelectorAll('.topic-button');
    const backButtonQuiz = document.getElementById('back-button-quiz');
    const backButtonTopics = document.getElementById('back-button-topics');
    const choiceButtons = document.querySelectorAll('.choice-button');
    const questionContainer = document.getElementById('question-container');
    const topicTitle = document.getElementById('topic-title');
    const timerElement = document.getElementById('timer');
    const scoreElement = document.getElementById('score-value');
    const sidebar = document.getElementById('sidebar');
    const completionDialog = document.getElementById('completion-dialog');
    const finalScoreElement = document.getElementById('final-score');
    const closeDialogButton = document.getElementById('close-dialog');
    const questionNumberElement = document.getElementById('question-number'); // Added this line
    const correctSound = document.getElementById('correct-sound');
    const incorrectSound = document.getElementById('incorrect-sound');
    const confettiSound = document.getElementById('confetti-sound'); // Add this line
    const aboutButton = document.getElementById('about-button');
    const aboutDialog = document.getElementById('about-dialog');
    const closeAboutDialogButton = document.getElementById('close-about-dialog');

    let currentTopic = '';
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 15;

    const questions = {
        agripower: [
            {
                question: 'It is the filling up of water in the pump to evacuate the entrapped air through a vent and create a liquid seal inside the casing.',
                choices: ['Feeding', 'Recharging', 'Priming', 'None of the above'],
                correct: 2,
            },
            {
                question: 'Question',
                choices: ['0', '1', '2', '3'],
                correct: 1,
            },
            {
                question: 'Question?',
                choices: ['0', '1', '2', '3'],
                correct: 0,
            },
            // Add more questions as needed
        ],
        agrimachinery: [
            {
                question: 'Warranty of parts and services for heated air mechanical grain dryer based in PAES Standard within _______ after the acceptance of the machine.',
                choices: ['6 months', '10 months', '18 months', 'None of the above'],
                correct: 3,
            },
            {
                question: 'It is the ratio of the heat released by the fuel of a heated air mechanical dryer to the theoretical heat available from the fuel.',
                choices: ['burner efficiency', 'furnace efficiency ', 'combustion efficiency', 'None of the above'],
                correct: 2,
            },
            {
                question: 'Holding capacity of the mechanical dryer during testing as prescribed by PAES should be based on the _______and other accompanying information such as moisture content and purity.',
                choices: ['volume', 'weight', 'density', 'None of the above'],
                correct: 1,
            },
            {
                question: 'Milling test samples during the test of mechanical grain dryer based on the PAES standard test should be conducted at least ______ after drying test.',
                choices: ['24 hours', '48 hours', '36 hours', 'None of the above'],
                correct: 1,
            },
            {
                question: 'Question',
                choices: ['0', '1', '2', '3'],
                correct: 1,
            },
            {
                question: 'Question?',
                choices: ['0', '1', '2', '3'],
                correct: 0,
            },
            // Add more questions as needed
        ],
        abelaw: [
            {
                question: 'Question',
                choices: ['0', '1', '2', '3'],
                correct: 1,
            },
            {
                question: 'Question?',
                choices: ['0', '1', '2', '3'],
                correct: 0,
            },
            // Add more questions as needed
        ],
        agristructures: [
            {
                question: 'Question',
                choices: ['0', '1', '2', '3'],
                correct: 1,
            },
            {
                question: 'Question?',
                choices: ['0', '1', '2', '3'],
                correct: 0,
            },
            // Add more questions as needed
        ],
        agrieconomics_and_marketing: [
            {
                question: 'Question',
                choices: ['0', '1', '2', '3'],
                correct: 1,
            },
            {
                question: 'Question?',
                choices: ['0', '1', '2', '3'],
                correct: 0,
            },
            // Add more questions as needed
        ],
        part1: [
            {
                question: 'Question',
                choices: ['0', '1', '2', '3'],
                correct: 1,
            },
            {
                question: 'Question?',
                choices: ['0', '1', '2', '3'],
                correct: 0,
            },
            // Add more questions as needed
        ],
        // Add more topics as needed
    };

    const showPage = (page) => {
        Object.keys(pages).forEach(key => {
            pages[key].classList.remove('active');
        });
        pages[page].classList.add('active');
        if (page === 'home') {
            sidebar.classList.remove('hidden');
        } else {
            sidebar.classList.add('hidden');
        }
    };

    const startTimer = () => {
        timeLeft = 15;
        timerElement.querySelector('span').textContent = timeLeft; // Update span inside timer
        timer = setInterval(() => {
            timeLeft--;
            timerElement.querySelector('span').textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                proceedToNextQuestion();
            }
        }, 1000);
    };

    const loadQuestion = () => {
        if (currentQuestionIndex < questions[currentTopic].length) {
            const currentQuestion = questions[currentTopic][currentQuestionIndex];
            document.getElementById('question').textContent = currentQuestion.question;
            choiceButtons.forEach((button, index) => {
                button.textContent = currentQuestion.choices[index];
                button.classList.remove('correct', 'incorrect');
                button.disabled = false;
            });
            questionNumberElement.textContent = `Question ${currentQuestionIndex + 1}`; // Update question number
            startTimer();
        } else {
            showResults();
        }
    };

    const proceedToNextQuestion = () => {
        currentQuestionIndex++;
        loadQuestion();
    };

    const showResults = () => {
        finalScoreElement.textContent = score;
        completionDialog.classList.remove('hidden');

        confettiSound.play(); 

        confetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    const closeDialog = () => {
        completionDialog.classList.add('hidden');
        showPage('home');
    };

    startQuizButton.addEventListener('click', () => {
        showPage('topics');
    });

    startPlannerButton.addEventListener("click", () => {
        alert("Planner feature coming soon!");
    });

    topicButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentTopic = button.getAttribute('data-topic');
            topicTitle.textContent = `Topic: ${currentTopic}`;
            score = 0;
            scoreElement.textContent = score;
            currentQuestionIndex = 0;
            showPage('quiz');
            loadQuestion();
        });
    });

    choiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            clearInterval(timer);
            const selectedChoice = parseInt(button.getAttribute('data-choice'));
            const correctChoice = questions[currentTopic][currentQuestionIndex].correct;

            if (selectedChoice === correctChoice) {
                button.classList.add('correct');
                score++;
                scoreElement.textContent = score;
                correctSound.play(); // Play correct sound
            } else {
                button.classList.add('incorrect');
                incorrectSound.play(); // Play incorrect sound
            }

            choiceButtons.forEach(btn => btn.disabled = true);

            setTimeout(proceedToNextQuestion, 1000);
        });
    });

    backButtonQuiz.addEventListener('click', () => showPage('topics'));
    backButtonTopics.addEventListener('click', () => showPage('home'));

    closeDialogButton.addEventListener('click', closeDialog);

    // Initialize app
    showPage('home');

    // Show About dialog box
    aboutButton.addEventListener('click', () => {
        aboutDialog.classList.remove('hidden');
    });
    
    // Hide About dialog box
    closeAboutDialogButton.addEventListener('click', () => {
        aboutDialog.classList.add('hidden');
    });
    
    // Close dialog if clicked outside of the content area
    aboutDialog.addEventListener('click', (event) => {
        if (event.target === aboutDialog) {
            aboutDialog.classList.add('hidden');
        }
    });
});
