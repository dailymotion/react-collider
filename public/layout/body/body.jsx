if (typeof module !== 'undefined') {
    var React = require('react');
}
// Client side
var Body = React.createClass({
  render: function () {
    return (
      <div>
        <Header/>
            <RouteHandler/>
        <Footer/>
      </div>
    );
  }
});