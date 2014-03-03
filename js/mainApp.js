$(document).ready(function () {

var q_menu = $('#quiz');
var game_over = $('#game_over');



//Hide the .base_menu on choice
$('#basic').on('click', function () {

	$('#base_menu').hide();

	//Load basic quiz
	quiz(basic);

	$('#quiz').fadeIn(500);
});


var answer;

function quiz (array) {
	var i = 0;
	var score = 0;


	loadQuestion(); //initial load


	$('.q_button').on('click', function () {

		if (this.innerHTML == array[i].choices[answer]){
			console.log('You got the right answer!');
			score++;
		}
		else {
			console.log('You got the wrong answer!');
		}

		loadQuestion(i++);

		if(i === array.length - 1){
			q_menu.hide();
			game_over.fadeIn();
			game_over.find('#score').text(score);
		}

	});


	function loadQuestion(q){

	answer = array[i].answer;

	//Load picture if there is one
	if(array[i].pic === true){
		q_menu.find('.img_holder').html(array[i].img);
	}

	//Load question
	q_menu.find('.question').text(array[i].question);

	//Load potential answers into divs
	for(var j = 0; j <= 3; j++){
		q_menu.find('#choice' + j).text(array[i].choices[j]);
	}

}


}




});
