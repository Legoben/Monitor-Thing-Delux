# Robbr — A Deluxe Sightseeing App

## Actually Doing Things
To rebuild the app's dist files (from the contents of the `app` folder) run `gulp build` while in the root of the repository.

To automatically re-build the dist files when any dependent files are changed, run `gulp watch`. This can be left open in a tab in the terminal or backgrounded, and only needs to be restarted if the Gulpfile is changed.

When the app's content has been changed, cd into `robbr-phonegap` and run `phonegap serve`. This will run a server on the local network that can be accessed by any other device on the network, particularly ones with the PhoneGap Developer app installed on them. Enter the IP address and port shown by the command into the application.