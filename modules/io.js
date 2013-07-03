system = require('system');

// ConsoleIO
//-----------------------------------------------

function ConsoleIO() {}

ConsoleIO.create = function() {
    // Instantiate a new object
    return new ConsoleIO();
};

ConsoleIO.prototype.print = function(text) {
    // Write text directly to stdout
    system.stdout.write(text);
};

ConsoleIO.prototype.say = function(output) {
    // Print the chunks of text using Casper styles
    var string = "";
    for (var i in output) {
        var chunk = output[i];
        if (chunk.style)
            string += colorizer.colorize(chunk.text, chunk.style);
        else
            string += chunk.text;
    }
    casper.echo(string);
};

ConsoleIO.prototype.ask = function(output) {
    // Print the stylized text and return response from stdin
    this.say(output);
    return system.stdin.readLine().trim();
};

// Export the api
module.exports = ConsoleIO;
