'use strict';


var
    fs = require('fs');


module.exports = function(assets)
{
    var
        path = 'bower_components';

    // Try to find bower components dir in .bowerrc
    fs.readFile(assets.fileSystem.getPath('.bowerrc'), 'utf8', function(error, data) {
        if (!error) {
            try {
                data = JSON.parse(data);
                if (data.directory) {
                    path = data.directory;
                }
            } catch(exception) {}
        }

        // Library Patterns
        assets
            .addLibraryPattern({
                path:        path,
                description: 'Bower components'
            });
    });
};
