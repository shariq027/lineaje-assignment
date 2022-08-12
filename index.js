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

let args = parser.parse_args();

if (args.generatelineage) {
  try {
    generateRandomLineage();
    console.log('Generated a random Lineage and added to sample_lineage folder');
  }
  catch (err) {
    console.log('Unable to generate lineage file\nError: ' + err);
  }

}
else {

  try {
    const jsonsInDir = fs.readdirSync('./sample_lineage').filter(file => path.extname(file) === '.json');
    if(!jsonsInDir.length){
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
