
console.log('Loading es5');
echo('Loading es5');
	
console.log('   - es5/Array');
echo('   - es5/Array');

if(!Object.getOwnPropertyNames) {
	Object.getOwnPropertyNames = function getOwnPropertyNames(obj) {
		var methods = [];
		for(var i in obj) {
			if(obj.hasOwnProperty(i)) {
				methods.push(i);
			}
		}
		return methods;
	};
}

var methods = Object.getOwnPropertyNames(Array.prototype);
for(var i = 0 ; i < methods.length ; i++) {
	console.log('      - Found es5/Array/' + methods[i]);
	echo('      - Found es5/Array/' + methods[i]);
	define('es5/Array/' + methods[i], [], function() {});
}
	
define(['es5/Array/forEach'], function(){
	console.log('Executing es5');
	echo('Executing es5');
	
	return {};
});