# lineaje-assignment

## Quick Start

### Prerequisites
* Node JS v16.13.1

### Getting Started
```
$ git clone https://github.com/shariq027/lineaje-assignment.git
$ cd lineaje-assignment
$ npm install
$ node index.js
```

## Configuration

You can start evaluating the json files following steps from Getting Started section. 
Running the following command with evaluate all the files under *sample_lineage* folder and generate output text files under *output_files* folder. 
```
$ node index.js
```

To generate random lineage json, please run the following commands. This will only generate one sample json file under *sample_lineage* folder. 
Note: evaluation would happen at this point of time on the input json files available.
we have some more arguments like 
* -f for number of files 
* -l for levels of hierarchy
* -p for parent length
```
$ node index.js -g -f=3 -l=5 -p=4
```

## Tests
You can be run using the test cases using the following command.
* Jest
```
$ npm test
```
