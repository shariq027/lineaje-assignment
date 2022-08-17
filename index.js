const fs = require('fs');
const path = require('path');
const { ArgumentParser } = require('argparse');

const evaluateFamilyTree = require("./helpers");
const generateRandomLineage = require('./familytree_generator');

const parser = new ArgumentParser({});

parser.add_argument('-g', '--generatelineage', {
  action: 'store_const',
  const: true,
  help: 'This will generate random lineage json file under sample_lineage folder'
});

parser.add_argument('-f', '--numberoffiles', {
  type: 'int',
  help: 'Number of files to generate'
});

parser.add_argument('-l', '--hierarchylevel', {
  type: 'int',
  help: 'Hierarchy level'
});

parser.add_argument('-p', '--parentlenght', {
  type: 'int',
  help: 'To set the parent length for the Members'
});

let args = parser.parse_args();

if (args.generatelineage) {
  try {
    generateRandomLineage(args.numberoffiles, args.hierarchylevel, args.parentlenght);
    console.log('Generated a random Lineage jsons and added to sample_lineage folder');
  }
  catch (err) {
    console.log('Unable to generate lineage file\nError: ' + err);
  }

}
else {

  try {
    const jsonsInDir = fs.readdirSync('./sample_lineage').filter(file => path.extname(file) === '.json');
    if (!jsonsInDir.length) {
      console.log('No files in the sample_lineage folder to evaluate');
    }

    jsonsInDir.forEach(file => {
      try {
        const fileData = fs.readFileSync(path.join('./sample_lineage', file));
        evaluateFamilyTree(fileData.toString(), file);
        console.log('Evaluated file ' + file + ' and output file generated');
      }
      catch (err) {
        console.log('Unable to process file ' + file + '\nError: ' + err);
      }

    });

  }
  catch (err) {
    console.log('Unable to get files from the folder sample_lineage\nError: ' + err);
  }

}

// var jsonChance = require('json-chance')

// var a = jsonChance('guid,name,year({min: 1900, max: 2100}),profile(url,twitter,fbid)');
// console.log(a);

// var Chance = require('chance');

// // Instantiate Chance so it can be used
// var chance = new Chance();

// const mems = (x, age) => () => {
//   x--;
//   return {
//     Name: chance.name(),
//     BirthYear: chance.year({ min: age, max: age + 20 }),
//     DeathYear: chance.year({ min: age + 70, max: age + 90 }),
//     ...(x > 0 ? { Members: chance.unique(mems(x, age + 25), 2) } : {})
//   };
// }

// chance.mixin({
//   'lineajeObj': function () {
//     return {
//       lineage: {
//         FamilyTree: chance.pick(['Some Family Tree']),
//         Members: chance.unique(mems(4, 1200), 3)
//       }
//     }
//   }
// });

// var a = chance.lineajeObj();

// // var a = chance.unique(chance.user, 10);

// console.log(JSON.stringify(a));

