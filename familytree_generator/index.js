const hasard = require('hasard');
const fs = require('fs');

const run = () => {
    const lineageObj = hasard.object({
        lineage: hasard.object({
            FamilyTree: new hasard.Value(['Some Family Tree']),
            Members: hasard.array({
                value: hasard.object({

                    Name: hasard.add(
                        new hasard.Value(['First']),
                        new hasard.String({
                            value: new hasard.Value(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']),
                            size: 3
                        })
                    ),
                    BirthYear: hasard.integer(1221, 1234),
                    DeathYear: hasard.integer(1264, 1270),
                    Members: hasard.array({
                        value: hasard.object({
                            Name: hasard.add(
                                new hasard.Value(['Second']),
                                new hasard.String({
                                    value: new hasard.Value(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']),
                                    size: 3
                                })
                            ),
                            BirthYear: hasard.integer(1240, 1250),
                            DeathYear: hasard.integer(1290, 1320),
                            Members: hasard.array({
                                value: hasard.object({
                                    Name: hasard.add(
                                        new hasard.Value(['Third']),
                                        new hasard.String({
                                            value: new hasard.Value(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']),
                                            size: 3
                                        })
                                    ),
                                    BirthYear: hasard.integer(1260, 1270),
                                    DeathYear: hasard.integer(1340, 1352)
                                }),
                                size: hasard.integer([1, 2]),
                            })
                        }),
                        size: hasard.integer([1, 2]),
                    })
                }),
                size: hasard.integer([1, 2]),
            })
        })
    });

    const lineageGenerated = lineageObj.runOnce();
    const randomInt = hasard.integer(99, 999).runOnce();
    
    fs.writeFile("./sample_lineage/sample_"+ randomInt +".json", JSON.stringify(lineageGenerated), function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

module.exports = run;
