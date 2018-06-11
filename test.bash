#!/bin/bash

docker run --rm robot pytest
robot_error=$?

docker run --rm --tty frontend yarn build | grep "Compiled successfully."
frontend_error=$?

echo

# Print some messages for helping the user to find the problem
if [ $robot_error == 0 ]; then
	echo "Robot passed the tests.";
else
	echo "Robot HAS NOT passed the tests.";
fi
echo

if [ $frontend_error == 0 ]; then
	echo "Frontend passed the tests.";
else
	echo "Frontend HAS NOT passed the tests.";
	echo "Please, verify if the React code is having compilation errors or warnings.";
fi
echo

# Export error in the correct variable
exit $(( robot_error + frontend_error ))
