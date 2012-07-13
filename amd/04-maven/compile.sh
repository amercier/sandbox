node ../lib/r-2.0.2.js -o \
	include=../lib/require-2.0.2 \
	paths.domReady=../lib/domReady \
	name=main \
	out=./build/main.r.min.js \
	baseUrl=.

java -jar ../lib/compiler.jar \
	--compilation_level=ADVANCED_OPTIMIZATIONS \
	--js ../lib/require-2.0.2.js ../lib/domReady.js main.js  \
	--js_output_file ./build/main.cc.min.js
