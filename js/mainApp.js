$(document).ready(function () {


/* PRE LOADER */
//All other images
var misc_images = [
	{src: '../images/buttons/n_button.png' },
	{src: '../images/back.jpg' },
];

var loadPercent = 0;
var images = [];
var k;
function preload(array) {
	for (k = 0; k < array.length; k++) {
		if (array[k].pic === true)
		{
			images[k] = new Image();
			images[k].src = array[k].src;
			
		}
		
	}

}
//What to load? Put it here!
preload(misc_images);
preload(basic);

//Percentage bar
loadPercent = k / images.length * 75;
$('#perc').html(loadPercent);

//Load intro if done loading
if (loadPercent === 100){
	$('#loading').fadeOut(1000, function () {
		$('#three').fadeIn(500, function () {
			$('#loading_screen img').fadeIn(500, function(){
				$('.arrow').fadeIn(800);
			});
		});
	});
}

//If DOTA 2 Symbol is clicked 
$('#loading_screen img').on('click', function(){
	$('#loading_screen').fadeOut(1000, function () {
		$('#base_menu').fadeIn(1000);
	});
	
});



/* PRE LOADER END 
------------------
------------------*/

/* ARROW ANIMATION */
var arr = $('.arrow');
function arrow() {
arr.animate({left: '+=5%'}, 300, function () {
	arr.animate({left: '-=5%'}, 300, function(){
		arrow();
	});

});

}

arrow();




/* BASE MENU SELECTION */
//Hide the .base_menu on choice
$('#basic').on('click', function () {

	$('#base_menu').hide();

	//Load basic quiz
	quiz(basic);

	$('#quiz').fadeIn(500);
});
/* BASE MENU SELECTION END
--------------------------
--------------------------*/






/* MAIN QUIZ MANAGER */
var q_menu = $('#quiz');
var game_over = $('#game_over');
var answer;

function quiz (array) {
	var i = 0;
	var score = 0;
	


	loadQuestion(); //initial load

	$('.q_button').on('click', checkAnswer);


function checkAnswer() {

		$('.q_button').off('click', checkAnswer);

		if (this.innerHTML == array[i].choices[answer]){

			$('#correct').html('<div class="check"></div>Correct ').fadeIn(2000);
			score++;
		}
		else {
			$('#correct').html('<div class="x"></div> Correct Answer: ' + array[i].choices[answer]).fadeIn(2000);
		}


		setTimeout(function () {
			i++;
			$('.q_button').on('click', checkAnswer);
			loadQuestion();
		}, 2000);

		if(i === array.length - 2){
		setTimeout(function () {
			loadQuestion();

			q_menu.hide();
			game_over.fadeIn();
			game_over.find('#score').text(score);
		}, 2000);
		}

	

}


function loadQuestion(){

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

	//Clear correct/wrong answer
	$('#correct').html('').hide();
}



}
/* MAIN QUIZ MANAGER END
------------------------
------------------------*/



});
