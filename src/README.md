Source Guide
===

Our current directory organization is:

```
- /
	- start.bash
	- frontend/
		- main-page/
	- scraper/
```

Running Locally
---

To run things locally, it is necessary to perform the procedures below.

First, enter `frontend/main-page` and install all npm packages. After that, build the react application.

```
cd frontend/main-page
npm install
npm run-script build
```

This will create the file `frontend/main-page/index.html`, which will be served in our home page.

After doing this, get into the `frontend/` and install the npm packages too.

```
cd frontend
npm install
```

Finally, run the javascript code to serve the website locally in port 8081 (8081 because the docker container uses 8080).

```
cd frontend
node index.js
```

Now, just open the URL `localhost:8081` in your browser to see the website.


Running on Docker
---

For running on docker, simply run

```
bash start.bash
```

And then open the website at URL `localhost:8080`
