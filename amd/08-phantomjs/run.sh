#!/bin/bash

#echo "$ Running: phantomjs timeout.js"
#phantomjs timeout.js
#echo "$ Done"

echo "$ Running: phantomjs main.js"
#phantomjs main.js
#phantomjs --debug=yes --remote-debugger-port=9000 --remote-debugger-autorun=yes main.js
phantomjs main2.js
echo "$ Done"