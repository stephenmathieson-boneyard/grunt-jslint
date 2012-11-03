(function () {
    'use strict';

    /*jslint node:true*/
    /*jslint nomen:true*/
    var entities = require('entities');
    /*jslint node:false*/
    /*jslint nomen:false*/

    exports.jslint = {
        encode: function (test) {
            test.expect(2);

            var ampersandsText = entities.encode('dude with a red hat && beard'),
                quotesText = entities.encode('dudette with a white rock & "so" long hair');

            test.equal(ampersandsText, 'dude with a red hat &amp;&amp; beard', 'should correct encode ampersands for XML output');
            test.equal(quotesText, 'dudette with a white rock &amp; &quot;so&quot; long hair', 'should correct encode quotes and ampersands for XML output');

            test.done();
        }
    };
}());