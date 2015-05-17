require(['GameEngine'],
	function (GameEngine) {
		// make canvas occupy full page
		var canvas = document.getElementById("c");
		var w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0],
			pageWidth = w.innerWidth || e.clientWidth || g.clientWidth,
			pageHeight = w.innerHeight || e.clientHeight || g.clientHeight;
		canvas.width = pageWidth;
		canvas.height = pageHeight;

	    var fps = 60, deltaTime = 1000/fps;

	    var engine = new GameEngine(fps);
	    engine.initialize();
	    engine.addObject();

	    var prevTimeStamp = 0;
	    function update(timeStamp) {
	    	//if (timeStamp - prevTimeStamp > deltaTime)	{
	    		engine.step(timeStamp);
	    		prevTimeStamp = timeStamp;
	    	//}
	    	requestAnimationFrame(update);
		}

		// kick off game engine loop
		update(1000);
	});
