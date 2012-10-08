#!/bin/bash

echo "$ Running: phantomjs main.js"
#phantomjs --debug=yes --remote-debugger-port=9000 --remote-debugger-autorun=yes main.js
phantomjs main.js
echo "$ Done"