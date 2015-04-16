# Daily-collider

Example app for react-collider.

## Usage

    # Install the dependencies
    $ npm install

    # Build webpack
    $ npm run webpack

    # Run the server
    $ npm start

Then open your browser at [localhost:3000](http://localhost:3000)

## Client side only app

To test the app without server-side rendering, cd into the public directory, create a simple `index.html` like below,launch a server and open your browser at [localhost:8000](http://localhost:8000).

```html
<!DOCTYPE html>
<html>
<body>
    <script src="/bundle.js"></script>
</body>
</html>
```

    # Build the bundle
    $ npm run webpack

    $ cd public; python -m SimpleHTTPServer
