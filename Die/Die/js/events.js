var Events = function(){
	var
	$dieTemplate    = null,
	$leftDiceArea   = null,
	$rightDiceArea  = null,
	$diceArea       = null,
	$dieNumOptions  = null,
	$dieSideOptions = null,
	$numSidesInput  = null,
	$numDieInput    = null,

	thatsSoRando = [],
	animating = false,
	numDie = 4,
	numSides = 6,
	count = 1,


	setCachedElements = function(){
		$dieTemplate    = $($('#die-template').html());
		$leftDiceArea   = $('#left-dice-area');
		$rightDiceArea  = $('#right-dice-area');
		$diceArea       = $('.dice-area');
		$dieNumOptions  = $('#die-num-options');
		$dieSideOptions = $('#die-side-options');
		$numSidesInput  = $('#num-sides');
		$numDieInput    = $('#num-die');
	},

	setGameboard = function(){
		$leftDiceArea.html('');
        $rightDiceArea.html('');
        for (var i = 0; i < numDie; i++){
            $leftDiceArea.append($dieTemplate.clone().html(Math.ceil(Math.random()*numSides)).attr('id', i));
            i++;
            if (i == numDie) break;
            $rightDiceArea.append($dieTemplate.clone().html(Math.ceil(Math.random()*numSides)).attr('id', i));
        }
	},

	setEventListeners = function(){
        $diceArea.on('click', function(){
            if (!animating){
                animating = true;
                setTimeout(function(){animating = false;}, 2000);

                var dieElements = [];

                thatsSoRando = [];
                for (var i = 0; i < numDie; i++){
                    thatsSoRando.push(Math.ceil(Math.random()*numSides));
                    dieElements.push($('#'+i));
                }

                for (var i = 0; i < numDie; i++){
					dieElements[i]
						.css('transform', 'rotateX('+(2160*count)+'deg)')
						.addClass('die-jump');
                }

				setTimeout(function(){
					for (var i = 0; i < numDie; i++){
						dieElements[i].html(thatsSoRando[i]);
					}
				}, 1500);

                setTimeout(function(){$('.die').removeClass('die-jump');},1000);
                count++;

            }
        });

        $dieNumOptions.on('click', '.arrow', function(){
            $(this).css('transform', 'scale(0.9)');
            setTimeout(function(){$dieNumOptions.children('.arrow').css('transform', 'scale(1)');}, 200);
            if ($(this).hasClass('left-arrow')){
                if (numDie > 1){
                    numDie--;
                    $numDieInput.html(numDie);
                    setGameboard();
                }
            } else if ($(this).hasClass('right-arrow')){
                if (numDie < 6){
                    numDie++;
                    $numDieInput.html(numDie);
                    setGameboard();
                }
            }
        });

        $dieSideOptions.on('click', '.arrow', function(){
            $(this).css('transform', 'scale(0.9)');
            setTimeout(function(){$dieNumOptions.children('.arrow').css('transform', 'scale(1)');}, 200);
            if ($(this).hasClass('left-arrow')){
                if (numSides > 6){
                    numSides--;
                    $numSidesInput.html(numSides);
                    setGameboard();
                }
            } else if ($(this).hasClass('right-arrow')){
                if (numSides < 50){
                    numSides++;
                    $numSidesInput.html(numSides);
                    setGameboard();
                }
            }
        });
    };

	return {
		setCachedElements : setCachedElements,
		setGameboard      : setGameboard,
		setEventListeners : setEventListeners
	};
}();