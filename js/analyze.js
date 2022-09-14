
var vowels = "aeiouyäöå";

var consonants = "bcdfghjklmnpqrstvwxyz";

/*

Collects the longest grouping of characters and creates
a distribution of the groups.

*/

var d = {};

function analyzeWord(w){
	for (var i = 0; i < w.length; i++) {
		for (var j = 0; j < 6; j++) {
			var end = Math.min(i+j,w.length)
			for (var k = 0; k < 5; k++) {
				var start = Math.min(i+k,w.length)
				analyzeSet(w.substr(start,end));

			}
		}
	}
}

function analyzeSetA(s){
	if (s.length == 1) return;
	if (d[s]) {
		d[s].count += 1;
	}
	else {
		d[s] = {count: 1,length:s.length};
	}
}

function analyzeSet(s){
	var vowel = true;
	var a = [];
	for (var i = 0; i < s.length; i++) {
		
	}
}

function getLongest(){

}


















//
