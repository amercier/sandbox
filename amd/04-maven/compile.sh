node ../lib/r-2.0.2.js -o include=../lib/require-2.0.2.js name=main out=main.r.min.js baseUrl=.
java -jar ../lib/compiler.jar --compilation_level=ADVANCED_OPTIMIZATIONS --js ../lib/require-2.0.2.js main.js  --js_output_file main.cc.min.js
