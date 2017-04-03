var Q = require('q');
var elasticio = require('elasticio-node');
var messages = elasticio.messages;

exports.process = processAction;

/**
 *  This method will be called from elastic.io platform providing following data
 * 
 * @param msg
 * @param cfg
 */
function processAction(msg, cfg) {
    var self = this;
    var name = cfg.name;

    function emitData() {

        console.log('Updated the data fetched from ' + name + ' to the downstream');

        var body = {
            greeting: 'Data from ' name + ' is updated in this system!',
            originalGreeting: msg.body.greeting
        };

        var data = messages.newMessageWithBody(body);

        self.emit('data', data);
    }

    function emitError(e) {
        console.log('Oops! Error occurred');

        self.emit('error', e);
    }

    function emitEnd() {
        console.log('Finished execution');

        self.emit('end');
    }

    Q().then(emitData).fail(emitError).done(emitEnd);

}
