const generate = require('./generator.js');

const run = (files = 1, hierarchyLevel = 2, length = 2) => {
    for (let x = 0; x < files; x++) generate(hierarchyLevel, length);
}

module.exports = run;
