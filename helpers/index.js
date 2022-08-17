const _ = require("lodash");
const fs = require('fs');

const evaluate = require('./evaluator.js');

const stringifyInvalidMembers = (invalidMembers) =>{
    let content = '';
    _.forEach(invalidMembers, (member) => {
        const mem = { Name: member.Name, BirthYear: member.BirthYear, DeathYear: member.DeathYear, Reason: member.error }
        content += JSON.stringify(mem) + '\n';
    })
    return content;
}

const stringifyMembersWithAge = (Members) =>{
    let content = '';
    _.forEach(Members, (member) => {
        const mem = { Name: member.Name, Age: member.Age }
        content += JSON.stringify(mem) + '\n';
    })
    return content;
}

const evaluateFamilyTree = (dataString, fileName) => {
    const familyLineage = JSON.parse(dataString);
    const familyMembers = _.flatMapDeep(familyLineage.lineage.Members, evaluate.getMembers);
    
    let fileContent = '';

    const invalidMembers = evaluate.getInvalidMembers(familyMembers);
    fileContent += 'Invalid members in the family tree\n';
    fileContent += stringifyInvalidMembers(invalidMembers) +'\n';

    evaluate.removeInvalidMembers(familyMembers, invalidMembers);

    evaluate.calculateAge(familyMembers);
    fileContent += 'Family members and their Age\n';
    fileContent += stringifyMembersWithAge(familyMembers) + '\n';

    evaluate.orderByAge(familyMembers);
    fileContent += 'Family members after sorting their Age\n';
    fileContent += stringifyMembersWithAge(familyMembers) + '\n';

    fileContent += 'Lineage Active Period: ';
    fileContent += evaluate.lineageActivePeriod(familyMembers) + '\n';

    fileContent += 'Mean Age of the Lineage: ';
    fileContent += evaluate.getMeanAge(familyMembers) + '\n';

    fileContent += 'Median Age of the Lineage: ';
    fileContent += evaluate.getMedianAge(familyMembers) + '\n';

    fileContent += 'IQR of the Lineage: ';
    fileContent += evaluate.getIQR(familyMembers) + '\n';

    fileContent += 'Who lived the Longest: ';
    fileContent += stringifyMembersWithAge([familyMembers[familyMembers.length - 1]]) + '\n';

    fileContent += 'Who died the Youngest: ';
    fileContent += stringifyMembersWithAge([familyMembers[0]]);

    fs.writeFile("./output_files/" + fileName + "_output.txt", fileContent, function (err) {
        if (err) {
            return console.log(err);
        }
    });

}

module.exports = evaluateFamilyTree;