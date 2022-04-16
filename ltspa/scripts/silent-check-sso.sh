#!/bin/sh
FILE=public/silent-check-sso.html
if [ ! -f "$FILE" ]; then
    echo "<html><body><script>parent.postMessage(location.href, location.origin)</script></body></html>" > $FILE
fi