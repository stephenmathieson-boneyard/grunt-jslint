
exports.hello = function (name) {
    "use strict";

    name = name
        ? " " + name
        : "";
    process.stdout.write("hello" + name);
};

exports.hello("world");
