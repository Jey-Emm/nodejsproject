//display current directory
console.log(__dirname);
//display currect directory filename
console.log(__filename);

//Global Variable
global.PrintHello = 'Hello';
console.log(PrintHello);

//using Common JS modules
const helloName = require('./hello.js');
const displayOsValues = require('./builtin-os.js');

//Single export module usage
//helloName('Jose');
//helloName('Rizal');

//Multiple export module usage

helloName.PrintHello  
helloName.DisplayName('Jose Rizal')

//Common module
displayOsValues();


