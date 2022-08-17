const Chance = require('chance');
const fs = require('fs');

const generateTree = (hierarchyLevel, length) => {
    const chance = new Chance();

    const mems = (x, age) => () => {
        x--;
        return {
            Name: chance.name(),
            BirthYear: chance.year({ min: age, max: age + 20 }),
            DeathYear: chance.year({ min: age + 70, max: age + 90 }),
            ...(x > 0 ? { Members: chance.unique(mems(x, age + 25), length) } : {})
        };
    }

    chance.mixin({
        'lineajeObj': function () {
            return {
                lineage: {
                    FamilyTree: chance.pick(['Some Family Tree']),
                    Members: chance.unique(mems(hierarchyLevel, 1200), length)
                }
            }
        }
    });

    var lineageGenerated = chance.lineajeObj();
    let randomInt = chance.integer({ min: 9, max: 999 })

    fs.writeFile("./sample_lineage/sample_" + randomInt + ".json", JSON.stringify(lineageGenerated), function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

module.exports = generateTree;
