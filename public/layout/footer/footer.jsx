if (typeof module !== 'undefined') {
    var React = require('react');
}

var Footer = React.createClass({
    render: function() {
        return(
            <footer>
            </footer>
        );
    }
});


if (typeof module !== 'undefined') {
    // server
    module.exports = Footer
}