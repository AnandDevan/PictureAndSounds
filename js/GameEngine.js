define('GameEngine',
	['Resources',
	'GameObject',
	'Box2dWrapper',
	'Ground',
	'MouseTouch'],
	function (Resources,
		GameObject,
		Box2DWrapper,
		Ground,
		MouseTouch) {

		'use strict';

		function GameEngine(fps) {
			this.fps = fps;	
			this.deltaTimeFrame = 1/fps;

			this.timeLastObjAdded =0;
		}

		GameEngine.prototype.initialize = function() {
			this.canvas = document.getElementById("c");
		    this.context = this.canvas.getContext("2d");

		    this.gameObjects = [];
			this.box2d = new Box2DWrapper(this.fps, this.canvas.width, this.canvas.height);

			this.ground = new Ground(this.canvas.width, this.canvas.height);
			this.ground.addToBox2d(this.box2d);

			var self = this;
			this.mouseTouchHandler = new MouseTouch(function(mouseX, mouseY){
					self.mouseDown(mouseX, mouseY);
				},
				this.canvas
			);
		}

		GameEngine.prototype.addObject = function() {
			var radius = Resources.radius,
				x = Math.random() * this.canvas.width,
				y = 0.0;

			var nextItem = new GameObject(radius, x, y );			
			nextItem.setUrl(Resources.getNext());
			this.gameObjects.push(nextItem);

			this.box2d.addObject(x, y, radius, nextItem);

			if (this.gameObjects.length>5){
				this.removeObject(this.gameObjects[0]);
			}
		}

		GameEngine.prototype.removeObject = function(gameObject) {			
			var index = this.gameObjects.indexOf(gameObject);
			this.gameObjects.splice(index, 1);
			this.box2d.removeObject(gameObject);
		}

		GameEngine.prototype.drawObjects = function() {			
			//return this.box2d.drawDebugData();

			var self = this;

			this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height);
			this.context.globalAlpha = 0.8;	//transparency

			this.gameObjects.forEach(function(obj){
				obj.draw(self.context);
			});

			this.ground.draw(self.context);
	        		
	        this.context.restore();
		}

		GameEngine.prototype.step = function(time) {
			this.box2d.step();
			this.drawObjects();

			if (time - this.timeLastObjAdded > 4000){
				this.addObject();
				this.timeLastObjAdded = time;
			}
		}

		GameEngine.prototype.mouseDown = function(x, y) {
			for (var obj = 0; obj < this.gameObjects.length; obj++) {
				var curObj = this.gameObjects[obj];
				if (curObj.isPointWithin(x, y)) {
					curObj.playSound();
				}
			}
		}

		return GameEngine;
	});
