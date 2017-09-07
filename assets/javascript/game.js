$(document).ready(function () {

    /* VARIABLES */

    // Creates variable to hold questions
    var questions = [
       // question 1 - Expanse
        {
            "id": 0,
            "image_loc": "assets/images/one.jpg",
            "description": "A police detective in the asteroid belt, the first officer of an interplanetary ice freighter and an earth-bound United Nations executive slowly discover a vast conspiracy that threatens the Earth's rebellious colony on the asteroid belt.",
            "choices": ["Expanse", "Dark Matter", "Continuum"],
            //location of answer in choices array
            "answer": 0,
            "status": '',
       },
       // question 2 - BSG
        {
            "id": 1,
            "image_loc": "assets/images/two.jpg",
            "description": "When an old enemy, the Cylons, resurface and obliterate the 12 colonies, the crew of an aged military vessel protect a small civilian fleet - the last of humanity - as they journey toward the fabled 13th colony, Earth.",
            "choices": ["Stargate SG-1", "Battlestar Galactica", "Dark Matter"],
            //location of answer in choices array
            "answer": 1,
            "status": '',
       }
];

    // Creates variable to hold 
    var correctAnswers = 0;
    // Creates variable to hold 
    var incorrectAnswers = 0;
    // Creates variable to hold 
    var unansweredQuestions = questions.length;

    var counter = 30;

    console.log(unansweredQuestions);

    /* FUNCTIONS */

    // Function to check if element is empty
    function isEmpty(el) {
        return !$.trim(el.html())
    }

    // Function to empty all the game populated sections
    function clearGameDivs() {
        //$('#charSelcCont').empty();

    }

    // Function to hide a specific element or section
    function hideItem(tag) {
        $(tag).addClass('hidden');
    }

    // Function to un-hide a specific element or section
    function unhideItem(tag) {
        $(tag).removeClass('hidden');
    }

    // Function to create characters for Character Select
    function questionCreation() {
        for (var i = 0; i < questions.length; i++) {
            // Create an showChar
            var showImage = $("<img>");

            // Add css image classes to image
            showImage.addClass("show-image img-rounded img-responsive");

            // Each showChar will be given a src link to the current questions's image
            showImage.attr("src", questions[i].image_loc);

            var questionOuterDiv = $("<div>");
            questionOuterDiv.addClass("panel panel-default");

            var questionHeaderText = "<div class='panel-heading bg-black'><h3 class='panel-title'>Show " + (i + 1) + "</h3></div>";

            var questionAnswerList = $("<ul>");
            questionAnswerList.addClass("list-group answer-list").attr("questnum", i);

            for (var a = 0; a < questions[i].choices.length; a++) {
                var newChoice = $("<li>");
                newChoice.addClass("list-group-item answer").attr("indexnum", a).text(questions[i].choices[a]);
                questionAnswerList.append(newChoice);
            }
            var questionInnerBlock = $("<div>");
            questionInnerBlock.addClass("question-block");

            var questionDescription = "<p class='question-text'>" + questions[i].description + "</p>";
            questionInnerBlock.append(showImage, questionDescription, "<h4 class='question-title'>Select Answer Below</h4>", questionAnswerList);

            var questionInnerDiv = $("<div>");
            questionInnerDiv.addClass("question-box panel-body");
            questionInnerDiv.append(questionInnerBlock);

            questionOuterDiv.append(questionHeaderText, questionInnerDiv);

            $(".questions").append(questionOuterDiv);
        }
    }

    // Function that resets the game back to the starting point
    function reset() {

        // Remove previous game data
        //clearGameDivs();

        // Create Characters for Character Select
        questionCreation();
        
        //Start Timer
        timerWrapper();
        
        //Hide score section
        $(".score").hide();
    }

    //INITIALIZE GAME ON FIRST LOAD
    reset();



    /* TIMER STUFF*/

    function timerWrapper() {
        clock = setInterval(countDown, 1000);

        function countDown() {
            if (counter === 0) {
                clearInterval(clock);
                console.log("timeout");
                $(".questions").hide();
                $(".score").show();
                document.querySelector('.correctCnt').innerHTML = correctAnswers;
                document.querySelector('.incorrectCnt').innerHTML = incorrectAnswers;
                document.querySelector('.unansweredCnt').innerHTML = unansweredQuestions;
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer-box").html(timeConverter(counter));
        }

        function timeConverter(t) {
            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            if (minutes === 0) {
                minutes = "00";
            } else if (minutes < 10) {
                minutes = "0" + minutes;
            }
            return minutes + ":" + seconds;
        }


    }


    

    /* ON CLICK EVENTS */
    $(".answer").click(function () {
        $(this).parent().find('li').removeClass('active');
        $(this).addClass("active");

        var answerId = $(this).attr("indexnum");
        answerId = parseInt(answerId);

        var questionId = $(this).parent().attr("questnum")

        var currentStatus = "";
        console.log('correct ' + correctAnswers);
        console.log('incorrect ' + incorrectAnswers);


        if (answerId === questions[questionId].answer) {
            currentStatus = "c";
        } else {
            currentStatus = "i";
        }
        console.log(currentStatus);
        console.log(questions[questionId].status);

        if (currentStatus === questions[questionId].status) {
            console.log('same status');
        } else if (questions[questionId].status === '') {
            questions[questionId].status = currentStatus;
            console.log('first try');
            unansweredQuestions--;
            if (currentStatus === 'c') {
                correctAnswers++;
            } else {
                incorrectAnswers++;
            }
        } else {
            questions[questionId].status = currentStatus;
            console.log('changed');
            if (currentStatus === 'c') {
                correctAnswers++;
                incorrectAnswers--;
            } else {
                correctAnswers--;
                incorrectAnswers++;
            }
        }
        console.log('correct ' + correctAnswers);
        console.log('incorrect ' + incorrectAnswers);
        console.log('-----------');



    });

});
