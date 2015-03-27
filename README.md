# React-collider

Tentative to reach the Graal: isomorphic react done the good way

## Installation

    # install the dependencies
    $ npm install

    # start the jsx compiler and watchify
    $ gulp

    # start the server
    $ npm start

Then open your browser at http://localhost:3000

## Usage

Create your modules in `/src` then declare your routes in `/src/bootstrap.js`. The app will take care of the server-side rendering and the routing.

## TODO

- [x] find the Grail
- [x] use async API
- [ ] use webpack
- [ ] simplify `fetchData` call to handle multiple calls
- [ ] move outputScript to `Html`
