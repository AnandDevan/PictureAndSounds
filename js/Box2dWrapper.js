define('Box2dWrapper',
	[],
	function () {

		'use strict';

		var SCALE = 30.0;

		function Box2DWrapper(fps, width, height) {			
			this.deltaTimeFrame = 1/fps;
			this.width = width;
			this.height = height;

			this.initialize();
		}

		Box2DWrapper.prototype.initialize = function() {		
			var b2Vec2 = Box2D.Common.Math.b2Vec2
			, b2BodyDef = Box2D.Dynamics.b2BodyDef
			, b2Body = Box2D.Dynamics.b2Body
			, b2FixtureDef = Box2D.Dynamics.b2FixtureDef
			, b2Fixture = Box2D.Dynamics.b2Fixture
			, b2World = Box2D.Dynamics.b2World
			, b2MassData = Box2D.Collision.Shapes.b2MassData
			, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
			, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
			, b2DebugDraw = Box2D.Dynamics.b2DebugDraw
			;

			this.box2d = {};
			this.box2d.world = new b2World(
				new b2Vec2(0, 0.5*10)    //gravity
				, true                 		//allow sleep
			); 	   	   
		}

		Box2DWrapper.prototype.addObject = function(x, y, radius, userData) {
			var bodyDef = new Box2D.Dynamics.b2BodyDef;     
			bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;		
			bodyDef.position.x = x / SCALE;
			bodyDef.position.y = y / SCALE;
	  
			var fixDef = new Box2D.Dynamics.b2FixtureDef;
			fixDef.density = 1.0;
			fixDef.friction = 0.5;
			fixDef.restitution = 0.2;
			fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape( radius / SCALE );
			bodyDef.userData = userData;
			this.box2d.world.CreateBody(bodyDef).CreateFixture(fixDef);
		}

		Box2DWrapper.prototype.removeObject = function(gameObject) {
			for ( var b = this.box2d.world.GetBodyList(); b; b = b.m_next ) {			
				if (b.GetUserData() === gameObject) {
					this.box2d.world.DestroyBody( b );	
				}	
			}
		}

		Box2DWrapper.prototype.step = function() {
			this.box2d.world.Step( this.deltaTimeFrame,		// frame-rate
				3, 	    									// velocity iterations
				3   	   									// position iterations
			);
				
			this.updateObjects();
			this.box2d.world.ClearForces();
		}

		Box2DWrapper.prototype.updateObjects = function() {
			for ( var b = this.box2d.world.GetBodyList(); b; b = b.m_next ) {			
				if ( b.IsActive() ) {
					if ( b.GetUserData() != null ) {
						if ( typeof b.GetUserData() !== 'undefined'  ) {
							var gameObject = b.GetUserData();						
							if ( gameObject.destroy ) {			
								this.box2d.world.DestroyBody( b );
							}
							else {
								gameObject.x = b.GetPosition().x * SCALE; 
								gameObject.y = b.GetPosition().y * SCALE;
								gameObject.angle = b.GetAngle();
							}
						}
					}
				}
			}
		}

		Box2DWrapper.prototype.setupDebugDraw = function() {
			//setup debug draw
			var debugDraw = new Box2D.Dynamics.b2DebugDraw();
			debugDraw.SetSprite(document.getElementById("c").getContext("2d"));
			debugDraw.SetDrawScale(SCALE);
			debugDraw.SetFillAlpha(0.3);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
			this.box2d.world.SetDebugDraw(debugDraw);
			this.debugDrawEnabled = true;
		}

		Box2DWrapper.prototype.drawDebugData = function() {
			if (!this.debugDrawEnabled) {
				this.setupDebugDraw();
			}

			this.box2d.world.DrawDebugData();
		}


		return Box2DWrapper;
	});
