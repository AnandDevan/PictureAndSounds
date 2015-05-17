define('Ground',
	[],
	function() {
		var SCALE = 30.0;
		var Ground = function(width, height) {
			this.width = width;
			this.height = height;
			this.create(width, height);
		}

		Ground.prototype.create = function(width, height) {
			this.groundPoints = [];
		
			var delta = 0.1*height,
				numSegs = 5,
				nextHeight = 1.0*height;

			this.radius = (nextHeight - 0.85*height);

			for (var seg = 0; seg < numSegs; seg++) {
				this.groundPoints.push({
					x: (seg)*width/(numSegs-1),
					y: nextHeight
				});				
			}
		}

		Ground.prototype.draw = function(context) {
			var self = this;
			context.fillStyle = 'orange';
			this.groundPoints.forEach(function(pt){
				context.beginPath();
				context.arc(pt.x, pt.y, self.radius, 0, 2*Math.PI);
				context.fill();
			});

			context.fillRect(0, this.height-30, this.width, 30);
		};

		Ground.prototype.addToBox2d = function(box2dWrapper) {
			//var radius = 0.2*this.height;
			for (var pt = 0; pt < this.groundPoints.length; pt++) {
				var bodyDef = new Box2D.Dynamics.b2BodyDef;     
				bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;		
				bodyDef.position.x = this.groundPoints[pt].x / SCALE;
				bodyDef.position.y = this.groundPoints[pt].y / SCALE;
		  
				var fixDef = new Box2D.Dynamics.b2FixtureDef;
				fixDef.density = 1.0;
				fixDef.friction = 0.5;
				fixDef.restitution = 0.2;
				fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(this.radius/ SCALE);
				bodyDef.userData = this;

				box2dWrapper.box2d.world.CreateBody(bodyDef).CreateFixture(fixDef);
			}

			//create ground
			var bodyDef = new Box2D.Dynamics.b2BodyDef;     
			bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
			bodyDef.position.x = this.width / 2 / SCALE;
			bodyDef.position.y = (this.height / SCALE) - 1;
	  
			var fixDef = new Box2D.Dynamics.b2FixtureDef;
			fixDef.density = 0.05;
			fixDef.friction = 0.5;
			fixDef.restitution = 0.0;
			fixDef.shape = new  Box2D.Collision.Shapes.b2PolygonShape;

			// half width, half height. eg actual height here is 1 unit
			fixDef.shape.SetAsBox((this.width / SCALE) / 2, (0.5 / 2) / SCALE);
			box2dWrapper.box2d.world.CreateBody(bodyDef).CreateFixture(fixDef);

			//left side , right side
			this.addStaticBody(box2dWrapper, 0, 0.5*this.height/SCALE, 0.5/SCALE, 0.5*this.height/SCALE);
			this.addStaticBody(box2dWrapper, this.width/SCALE, 0.5*this.height/SCALE, 0.5/SCALE, 0.5*this.height/SCALE);
		}

		Ground.prototype.addStaticBody = function(box2dWrapper, x, y, width, height) {
			var bodyDef = new Box2D.Dynamics.b2BodyDef;     
			bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
			bodyDef.position.x = x;
			bodyDef.position.y = y;
	  
			var fixDef = new Box2D.Dynamics.b2FixtureDef;
			fixDef.density = 0.05;
			fixDef.friction = 0.5;
			fixDef.restitution = 0.0;
			fixDef.shape = new  Box2D.Collision.Shapes.b2PolygonShape;

			// half width, half height. eg actual height here is 1 unit
			fixDef.shape.SetAsBox(width, height);
			box2dWrapper.box2d.world.CreateBody(bodyDef).CreateFixture(fixDef);

		}

		return Ground;
	});