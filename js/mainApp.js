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
	$('#loading').fadeOut(1000);
	$('#three').fadeIn(2000);
	$('#loading_screen img').fadeIn(2000);
}

$('#loading_screen img').on('click', function(){
	$('#loading_screen').fadeOut(1000, function () {
		$('#base_menu').fadeIn(1000);
	});
	
});



/* PRE LOADER END 
------------------
------------------*/





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
/* MAIN QUIZ MANAGER END
------------------------
------------------------*/



});
