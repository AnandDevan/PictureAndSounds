define('Resources', 
	[],
	function () {
		var assetList = [
			'assets/Aeroplane',
			'assets/BumbleBee',
			'assets/Crocodile',
			'assets/Dinosaur',
			'assets/Duck',
			'assets/Elephant',
			'assets/Fish',
			'assets/FireTruckToy',
			'assets/Frog',
			'assets/Goat',
			'assets/Horse',
			'assets/Horse1',
			'assets/IceCream',
			'assets/JingCha',
			'assets/Monkey',
			'assets/MusicalBox',
			'assets/Rider',
			'assets/RockyDog',
			'assets/RubberDuck',
			'assets/Tiger',
			'assets/Train',
			'assets/Whistle'
		];

		var imageArray = {}, audioArray = {};

		var next = 0;

		var Resources = {
			assetList: assetList,
			radius: 75,		// 75 pixel image radius

			getNext: function() {
				if ( next >= assetList.length ) next = 0;
				return this.assetList[next++];
			},

			getImage: function(url) {
				if (!imageArray[url]) {
					var image = new Image();
					image.src = url + '.png';
					imageArray[url] = image;
				}

				return imageArray[url];
			},

			getAudio: function(url) {
				if (!audioArray[url]) {
					var audio = new Audio(url+'.wav');
					audioArray[url] = audio;					 
				} else {
					audioArray[url].currentTime = 0;
				}
				return audioArray[url];
			}
		}


		return Resources;
	});
