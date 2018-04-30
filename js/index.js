window.onload = function () {
    
    var seconds = 00;
    var minutes = 00;
    var num = 1;
    var appendMinutes = document.getElementById("minutes");
    var appendSeconds = document.getElementById("seconds")
    var buttonStart = document.getElementById('button-start');
    var buttonStop = document.getElementById('button-stop');
    var buttonReset = document.getElementById('button-reset');
    var numValue = document.getElementById("num");
    var attemptList = document.getElementById("attemptList");
    var attempts = [];
    var last_seconds = 0;
    var Interval ;
    
    buttonStart.onclick = function() {
        
        clearInterval(Interval);
        Interval = setInterval(startTimer, 1000);
    }
    
    buttonStop.onclick = function() {
        clearInterval(Interval);
    }
    
    
    buttonReset.onclick = function() {
        clearInterval(Interval);
        seconds = "00";
        minutes = "00";
        num = 1;
        attempts = [];
        numValue.innerHTML = num;
        appendMinutes.innerHTML = minutes;
        appendSeconds.innerHTML = seconds;
        last_seconds = 0;
        $("#attemptList").empty();
    }

    $('.option').on('click', function() {
        var seconds_now = parseInt(minutes)*60 + parseInt(seconds);
        var diff = seconds_now - last_seconds;
        record = {
          question: num,
          answer: $(this).val(),
          time: {minutes: diff/60, seconds:diff%60}
        }
        attempts.push(record);
        increaseQuestionNumber();
        addAttemptedQuestion(record);
        last_seconds = seconds_now;
    });

    function increaseQuestionNumber() {
        num++;
        numValue.innerHTML = num;
    }

    function addAttemptedQuestion(record) {
        if (record.time.minutes < 10) {
            record.time.minutes = "0" + parseInt(record.time.minutes);
        }

        if (record.time.seconds < 10) {
            record.time.seconds = "0" + parseInt(record.time.seconds);
        }
        $("#attemptList").prepend('<li class="answer"><span class="question-number">' + record.question + '</span><span class="attempted-option">'+ record.answer +'</span> <span class="time-taken">' + record.time.minutes +':' + record.time.seconds + '</span> </li>')
    }

    
    function startTimer () {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;

        if (seconds > 9){
            appendSeconds.innerHTML = seconds;
        }
        
        if (seconds > 59) {
            seconds = "00";
            minutes++;
            if (minutes < 10) {
                appendMinutes.innerHTML = "0" + minutes;
            } else {
                appendMinutes.innerHTML = minutes;
            }
            appendSeconds.innerHTML = seconds;
        }
        
    }
    
}
