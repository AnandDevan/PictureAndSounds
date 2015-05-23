define('GameObject', 
	[],
	function () {		
		'use strict';

		var GameObject = function(radius, x, y)
		{
			this.radius = radius;
			this.x = x;
			this.y = y;
			this.angle = 0.0;
			this.destroy = false;
			this.numBumps = 0;
			this.image = null;
		}

		GameObject.prototype.setUrl = function(url) {
			this.image = new Image();
			this.image.src = url + '.png';

			this.audio = new Audio(url + '.wav');
		}

		GameObject.prototype.draw = function(canvasContext) {
			canvasContext.drawImage( this.image, this.x - 75, this.y - 75);
		}

		GameObject.prototype.playSound = function(canvasContext) {
			this.audio.play();
		}

		GameObject.prototype.isPointWithin = function(x, y) {
			var delX = this.x - x, delY = this.y - y;
			if ( Math.pow( delX, 2) + Math.pow( delY, 2 ) < this.radius * this.radius )
			{
				return true;
			}

			return false;
		}

		return GameObject;
	});
