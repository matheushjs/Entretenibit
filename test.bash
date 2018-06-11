#!/bin/bash

# Accumulates the number of errors
error=0

docker run --rm robot pytest
error=$( expr $error + $? )

docker run --rm --tty frontend yarn build | grep "Compiled successfully."
error=$( expr $error + $? )

# Export error in the correct variable
exit $error
