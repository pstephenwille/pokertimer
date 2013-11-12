// JavaScript Document
/*<![CDATA[*/
		
		
/* declare vars, and any appropriate default values. */
psw = 
	{		
		secondsTmp		:	60,	
		bBlind 			:	null,	
		divMin 			:	null,	
		divNthSec 		:	null,		
		divRndCount		:	null,		
		divSec 			:	null,	
		minutes 		:	0,	
		nthSec 			:	0,	
		params 			:	null,	
		roundCount		:	0,		
		roundTime		:	null,	
		sBlind			:	null,	
		seconds 		:	0,	
		smallB			:	0, 	
		soundObj 		:	null,	
		startAmount		:	null,		
		startBtn		:	null,	
		step			:	0,
		stepHolder		:	0,		
		tick 			:	0,
		timer			: 	null,
		totalSec 		:	0,
		trumpetSnd 		:	null
	}
	

				


/* get the dom elements */
psw.initVars = function()
	{    
		psw.divSec 		= document.getElementById('seconds');
		psw.divMin 		= document.getElementById('minutes');
		psw.divNthSec 	= document.getElementById('nthSec');
		psw.startBtn	= document.getElementById('startStop');
		psw.startAmount	= document.getElementById('startBlind');
		psw.roundTime	= document.getElementById('roundTime');
		psw.divRndCount	= document.getElementById('roundCount');
		psw.sBlind 		= document.getElementById('sBlind');
		psw.bBlind 		= document.getElementById('bBlind');
		psw.trumpetSnd	= document.getElementById('footer');
		psw.trumpetSnd.style.display = 'none';
	  
		psw.setGameParams();
	}









/* get user entered values which set the small blind and round time */
psw.setGameParams = function()
	{
		psw.roundCount = 0;
		var digits = /^\d*$/;
		var _strAmount = psw.startAmount.value.replace(/ /g, '');
		var _rndTime = psw.roundTime.value.replace(/ /g, '');
	
		if(_strAmount.match(digits) && _strAmount != '')
		{
			psw.step 			= isNaN(_strAmount)? 0: _strAmount;
			psw.stepHolder		= parseInt(psw.step);
			psw.smallB 			= parseInt(psw.step);
			
			psw.startAmount.style.backgroundColor = '#090';
		
			psw.sBlind.innerHTML 	= (psw.smallB < 10)? '0'+ psw.smallB: psw.smallB;
			psw.bBlind.innerHTML 	= ((psw.smallB * 2) < 10)? '0'+ (psw.smallB * 2): psw.smallB * 2;
			psw.startAmount.value	= psw.step;
		}
		else
		{ 
			psw.startAmount.style.backgroundColor = '#D00'; 
			psw.startAmount.value = _strAmount; 
		}
	
			
		if(_rndTime.match(digits))
		{
			psw.minutes 	= parseInt(_rndTime % 60);
			psw.totalSec	= psw.minutes * 60;
			
			psw.divNthSec.innerHTML 	= (psw.nthSec < 10)? '0' + psw.nthSec: psw.nthSec;
			psw.divSec.innerHTML 		= (psw.seconds < 10)? '0' + psw.seconds: psw.seconds;
			psw.divMin.innerHTML 		= (psw.minutes < 10)? '0' + psw.minutes: psw.minutes;
			psw.divRndCount.innerHTML 	= 'round...' + ++psw.roundCount;
			
			psw.roundTime.style.backgroundColor = '#090';
			psw.roundTime.value					= _rndTime;
		}
		else
		{ 
			psw.roundTime.style.backgroundColor = '#D00'; 
			psw.roundTime.value 				= _rndTime;
		}
	};







/*	psw.startStopTimer() 
*	evaluates the status of the game, and either clears the timer for a new round, or sets the game params for a new game. 
*	1 - if 'roundCount' is 0, the game has not been setup. call 'setGameParams' to set everything up, including 'timer'.
*	2 - if 'timer' is other than null, it must be running.  null it out in preparation for a new round.
*	3 - if 'timer' is null, its a newly created instance of 'timer', and is ready for a new round; start the 'timer'.
*	
*	psw.startTimer()
*	a new timer instance is started, and the game has progressed into a new round.
*	1 - if the 'timer' exists, it is running.  adjust the displayed clock values, such as minutes, seconds, 
*	and nth seconds, with every clock tick.
* 	2 -  the remaining 'if' blocks, creates and displays the minutes and seconds, 
*	using modulus 60 against 100 millisecond clock ticks,
*	and subtracts those values from the user entered values for round time.  
*	Once the round time has been decremented to 0, a new round is created with 'newRound()'. 
*	
*	psw.resetTimer()
*	1 - user called function to null out game params. this unlocks the input fields, allowing the user to re-enter blind 
*	and round time amounts, and start a new game with different params. */
psw.startStopTimer = function()
	{			
	
		if(psw.roundCount == 0)
			{ psw.setGameParams(); }
		else
		{//if 'timer' exists, it is running. clearing it effectively pauses the clock.
			if(psw.timer != null)
			{ 
				clearInterval(psw.timer);
				psw.timer = null;
				psw.startBtn.style.backgroundColor = '#090';
			}
			else if(psw.timer == null)
			{ 
				psw.startBtn.style.backgroundColor = '#D00';
				psw.roundTime.disabled 		= true;
				psw.startAmount.disabled	= true;
	
				psw.timer = setInterval(psw.startTimer, 100);
			}
		}
	};
psw.startTimer = function()
	{		
				
		if(psw.timer != null)
		{
			psw.minutes = (psw.tick % 10 == 0 && psw.totalSec % 60 == 0)? --psw.minutes: psw.minutes;
			
			if(psw.minutes <= 0)
				{ psw.minutes = 0; }
			
			if(psw.totalSec > 0)
			{
				psw.seconds = (psw.nthSec % 10 == 0)? --psw.secondsTmp: psw.secondsTmp;
				psw.secondsTmp = (psw.secondsTmp <= 0 && psw.nthSec == 1)? 60: psw.secondsTmp;
			}
			
			psw.nthSec	= (9 -(psw.tick % 10));//one seconds ticker; 0 = 1 second
			psw.totalSec = (psw.nthSec % 10 == 0)? --psw.totalSec: psw.totalSec;//decrement total seconds
	
			psw.tick++;
	
			if(psw.minutes == 0 && psw.seconds == 0 && psw.nthSec == 1)
			{ 
				clearInterval(psw.timer); 
				psw.timer = null; 
				psw.newRound(); 
			}		
		}
	
	
		psw.divSec.innerHTML 	= (psw.seconds < 10)? '0'+ psw.seconds: psw.seconds;
		psw.divNthSec.innerHTML = (psw.nthSec < 10)? '0' + psw.nthSec: psw.nthSec;
		psw.divMin.innerHTML	= (psw.minutes < 10)? '0'+ psw.minutes: psw.minutes;
	};	
psw.resetTimer = function() 
	{	
		clearInterval(psw.timer);		
		
		psw.roundTime.disabled 		= false;
		psw.startAmount.disabled	= false;	
		psw.divMin.innerHTML 		= '00';
		psw.divSec.innerHTML 		= '00';
		psw.divNthSec.innerHTML 	= '00';
		psw.sBlind.innerHTML		= '00';  
		psw.bBlind.innerHTML		= '00';
		psw.seconds 			= 0;
		psw.secondsTmp			= 60;
		psw.totalSec			= 0;
		psw.minutes 			= 0;
		psw.nthSec 				= 0;
		psw.tick 				= 0;
		psw.roundCount			= 0;
		psw.step				= 0;
		psw.divRndCount.innerHTML = 'round...' + psw.roundCount;	
		psw.startBtn.style.backgroundColor = '#090';
	
		/* 'timer' called last to allow clearInterval() thread to complete */
		psw.timer = null;
		
	};









/* increment round counter, add up the blinds, play the new round alarm, and reset timer, for a new round */
psw.newRound = function() 
	{	
		psw.tick		= 0;
		psw.nthSec 		= 0;	
		psw.seconds 	= 0;
		psw.secondsTmp	= 60;
		psw.totalSec 	= 0;
		psw.minutes 	= 0;
		psw.step		= parseInt(psw.step);
		
		psw.roundCount++;
	
		if(psw.roundCount <= 5)
			{ psw.smallB += psw.step; }
		if(psw.roundCount >= 6 && psw.roundCount <= 8)
			{ psw.smallB = psw.smallB + (psw.step * 5); }
		if(psw.roundCount >= 9 && psw.roundCount <= 10)
			{ psw.smallB = psw.smallB +(psw.step * 10); }
		if(psw.roundCount >=11)
			{ psw.smallB = psw.smallB + (psw.step * 20); }
		if(psw.roundCount > 100)
			{ psw.resetTimer(); }
				
		this.sBlind.innerHTML = psw.smallB;
		this.bBlind.innerHTML = psw.smallB * 2;
	
		//nthSec = parseInt(roundTime.value / 60); 
		psw.minutes = parseInt(psw.roundTime.value % 60);
		psw.totalSec = psw.minutes * 60;
	
		psw.divNthSec.innerHTML 	= (psw.nthSec < 10)? '0' + psw.nthSec: psw.nthSec;
		psw.divSec.innerHTML 		= (psw.seconds < 10)? '0' + psw.seconds: psw.seconds;
		psw.divMin.innerHTML 		= (psw.minutes < 10)? '0' + psw.minutes: psw.minutes;
		psw.divRndCount.innerHTML 	= 'round...' + psw.roundCount;
	
		psw.playSound();
		
	};








/* allows user to manually increase/decrease the displayed blind amounts, during game play */
psw.upBlinds = function()
	{
		var _sb = null;
		var _bb = null;
	
		/* get current blind amounts */
		_sb = parseInt(psw.sBlind.innerHTML);
		_bb = parseInt(psw.bBlind.innerHTML);
		
		/*null out values, else they're added like strings */
		psw.sBlind.innerHTML = null;
		psw.bBlind.innerHTML = null;
		
		/*update display of blinds */
		if(_bb.toString().length <= 4 && _bb < 10000)
		{
			psw.sBlind.innerHTML = ((_sb + psw.stepHolder) < 10)? '0'+ (_sb + psw.stepHolder): (_sb + psw.stepHolder);
			psw.bBlind.innerHTML = (((_sb + psw.stepHolder)*2) < 10)? '0'+ ((_sb + psw.stepHolder)*2): ((_sb + psw.stepHolder)*2);
		}
		else
		{
			psw.sBlind.innerHTML = _sb;
			psw.bBlind.innerHTML = (_sb *2);
		}
		psw.smallB = Math.abs(psw.sBlind.innerHTML);
		
	};
psw.downBlinds = function()
	{
	
		/* get current blind amounts */
		var _sb = Math.abs(psw.sBlind.innerHTML);
		var _bb = Math.abs(psw.bBlind.innerHTML);
		
		/* null out values, else they're added like strings */
		if(_bb.toString().length <= 5 && _bb > 0)
		{	
			psw.sBlind.innerHTML = null;
			psw.bBlind.innerHTML = null;
		
			/* update display of blinds */
			psw.sBlind.innerHTML = ((_sb - psw.stepHolder) < 10)? '0'+ (_sb - psw.stepHolder): (_sb - psw.stepHolder);
			psw.bBlind.innerHTML = (((_sb - psw.stepHolder)*2) < 10)? '0'+ ((_sb - psw.stepHolder)*2): ((_sb - psw.stepHolder)*2);
			
			smallB = Math.abs(psw.sBlind.innerHTML);
		}
		else if(_bb <= 0)
		{
			psw.sBlind.innerHTML = null;
			psw.bBlind.innerHTML = null;
		
			/* update display of blinds */
			psw.sBlind.innerHTML = (psw.stepHolder < 10)? '0'+ psw.stepHolder: psw.stepHolder;
			psw.bBlind.innerHTML = (psw.stepHolder *2 < 10)? '0'+ psw.stepHolder * 2: psw.stepHolder * 2;
			
			psw.smallB = Math.abs(psw.sBlind.innerHTML);		
		}
	};







/* new round alarm; plays trumpet sound */
psw.playSound = function()
	{	
		psw.makeSndObj();
			
		var sndTimerID = setTimeout(stopSound, 5000);
		
		function stopSound()
		{
			var cancelSnd = document.getElementById('alarmSound');
				cancelSnd.parentNode.removeChild(cancelSnd);
			
			clearTimeout(sndTimerID);
			
			sndTimerID = 0;
			psw.trumpetSnd.innerHTML = '';
			psw.trumpetSnd.style.display = 'none';  
			psw.startStopTimer();
		}
	};
/* 	creates the flash based sound obj.
*	and add/remove from DOM to start/stop it.
*	inline scripting was the simplest way for IE/others to work. */
psw.makeSndObj = function()
	{	
		psw.trumpetSnd.style.display = 'block';
		psw.trumpetSnd.innerHTML = '<object id="alarmSound" name="alarmSound" data="flash/alarmSound.swf" type="application/x-shockwave-flash" width="1" height="1"><param name="allowScriptAccess" value="sameDomain" /?<param name="allowFullScreen" value="false" /><param name="movie" value="flash/alarmSound.swf" ><param name="quality" value="high" /><param name="bgcolor" value="#000000" /></object>';
		
	};




/* users can hit the spacebar to pause the timer, at any time during the game */
psw.spaceBarPause = function()
	{
		window.onkeyup = function(e)
		{
			if(e.keyCode == 32)
				{ psw.startStopTimer();  }
		}
	}();
/*]]>*/


