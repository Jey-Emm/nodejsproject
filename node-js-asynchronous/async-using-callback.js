
const userLogin = new Date();
const userLogout = new Date();
const userTimeout = new Date();

export function greetUser(user, callback){
    console.log('Hello ' + user);
    console.log('Login at: ' + userLogin.toISOString());
    setTimeout(()=> {
        console.log("Timeout Executed at " + userTimeout.toISOString());
    },5000);
    callback();
}

export function exitUser(){

    console.log("User has been log out!");
    console.log("Logout at: " + userLogout.toISOString());
}