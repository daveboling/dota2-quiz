$(document).ready(function () {

//Score bar!
var level;
function progress(percent, $element) {
	level = 1;
	var progressBarWidth = percent * $element.width() / 100;

	for (var i = 1; i <= 25; i++){
		if(percent > ((i / 25) * 100)){level++;$('.level').text(level);}
	}

	$element.find('div').animate({ width: progressBarWidth }, 500);
}


/* PRE LOADER */
//All other images
var misc_images = [
	{src: '../images/buttons/n_button.png' },
	{src: '../images/back.jpg' },
];

var loadPercent = 0;
var images = [];
function preload(array) {
	for (var k = 0; k < array.length; k++) {
		if (array[k].pic === true)
		{
			images[k] = new Image();
			images[k].src = array[k].src;
			
		}
		
	}
	loadPercent = (k / array.length) * 100;

}

//What do we need to preload? Put it all here!
preload(misc_images);
preload(basic);

//Send % complete to percentage bar
$('#perc').html(loadPercent);

//If done loading, show the 'ready' image.
if (loadPercent === 100){
	$('#loading').fadeOut(1000, function () {
		$('#three').fadeIn(500, function () {
			$('#loading_screen img').fadeIn(500, function(){
				$('.arrow').fadeIn(800);
			});
		});
	});
}


$('#loading_screen img').on('click', function(){
	$('#loading_screen').fadeOut(1000, function () {
		$('#base_menu').fadeIn(1000);
	});
	
});

$('#game_over').find('.again').on('click', function(){
	progress(0, $('#xp_bar'));
	$('#game_over').fadeOut(1000, function () {
		$('#base_menu').fadeIn(1000);
		level = 1;
		$('.level').html(level);
	});

});



/* ARROW ANIMATION */
function arrow() {
var arr = $('.arrow');
	arr.animate({left: '+=5%'}, 300, function () {
		arr.animate({left: '-=5%'}, 300, function(){
			arrow();
		});
	});
}

arrow();



/* BASE MENU SELECTION */
$('#basic').on('click', function () {
	$('#base_menu').fadeOut(1000, function () {
			quiz(basic);
			$('#quiz').fadeIn(500);
	});
});



/* MAIN QUIZ MANAGER */
var q_menu = $('#quiz');
var game_over = $('#game_over');
var answer;

function quiz (array) {
	var i = 0;
	var score = 1;

	loadQuestion(); //initial load

	$('.q_button').on('click', checkAnswer); //Turn on the event

function checkAnswer() {
	var levelSpan = $('.level').text();

		$('.q_button').off('click', checkAnswer); //Turn it off during checks

		if (this.innerHTML == array[i].choices[answer]){
			$('#correct').html('<div class="check"></div>Correct ').fadeIn(2000);
			score++;
			progress((score / array.length  * 100), $('#xp_bar'));
		}
		else {
			$('#correct').html('<div class="x"></div>Correct Answer: ' + array[i].choices[answer]).fadeIn(2000);
		}

		//Give user enough time to see answer
		setTimeout(function () {
			i++;
			$('.q_button').on('click', checkAnswer);
			loadQuestion();
		}, 2000);

		//Game Over Menu
		if(i === array.length - 2){
		setTimeout(function () {
			loadQuestion();
			q_menu.hide();

			game_over.fadeIn();
			if(level >= 1 && level <= 5){game_over.find('.message').html("Intentional feeder. <br />You have no idea what you're doing yet.<br /> That's ok, keep going!");}
			if(level >= 6 && level <= 10){game_over.find('.message').html("Game is hard. <br />So no more feeding?<br />Let's see some hustle.");}
			if(level >= 11 && level <= 15){game_over.find('.message').html("Getting there.<br />You can at least survive and have a positive score. <br />Still lots of work to be done.");}
			if(level >= 14 && level <= 20){game_over.find('.message').html("You're competent.<br />You can hold your own in most situations.");}
			if(level >= 21 && level <= 25){game_over.find('.message').html("You are a Sensei.<br />Your only limitations are not being psychic. <br/> What are you waiting for? <br />Carry your team to victory! ");}

			$('#score').html(level);


			//RESETS
			i = -1;
			score = 0;


		}, 2000);
		}//End Game Over

	

}




function loadQuestion(){

	answer = array[i].answer;

	//Load picture if there is one
	if(array[i].pic === true){
		q_menu.find('.img_holder').html(array[i].img);
	}
	else { q_menu.find('.img_holder').html(''); }

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
