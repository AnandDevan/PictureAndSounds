define('MouseTouch',
	[],
	function () {
		'use strict';

		var callbackMouseDown = null,
			canvas = null;

		var MouseTouch = function(callback, canvasElem) {
			document.addEventListener('mousedown', mousedown, false);
	        document.addEventListener("touchstart", touchHandler, true);
	        document.addEventListener("touchmove", touchHandler, true);
	        document.addEventListener("touchend", touchHandler, true);
	        document.addEventListener("touchcancel", touchHandler, true);

	        canvas = canvasElem;
	        callbackMouseDown = callback;
		}

		function touchHandler(event) {
	        var touches = event.changedTouches,
	            first = touches[0],
	            type = "";
	        switch(event.type)
	        {
	            case "touchstart": type = "mousedown"; break;
	            case "touchmove":  type="mousemove"; break;        
	            case "touchend":   type="mouseup"; break;
	            default: return;
	        }

			touchFactor = 4.0;
	        var simulatedEvent = document.createEvent("MouseEvent");
	        simulatedEvent.initMouseEvent(type, true, true, window, 1, 
	                                  first.screenX, first.screenY, 
	                                  first.clientX, first.clientY, false, 
	                                  false, false, false, 0/*left*/, null);

	        first.target.dispatchEvent(simulatedEvent);
	    }

		var touchFactor = 1.0;
		function mousedown(evt) {
	        callbackMouseDown(
	        	evt.clientX - canvas.clientLeft,
	        	evt.clientY - canvas.clientTop
	        );
			touchFactor = 1.0;
		}

		return MouseTouch;

	});
