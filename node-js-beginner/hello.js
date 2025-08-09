// export file as module
//note: use ` instead of ' in concatinating string and variable value
function PrintHello(){
    console.log('Hello');
}


function PrintName(name){
    console.log(`${name}`);
}
//either of two will work.
//export default PrintGreeting

//Single export
//module.exports = PrintHello

//Multiple export
module.exports = 
{
    Greeting: PrintHello,
    DisplayName: PrintName
}
