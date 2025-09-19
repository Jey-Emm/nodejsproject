
let my_promise = new Promise((resolved, reject) => {
    let success = true;

    if(success){
        resolved("Operation successful!");
    }
    else{
        reject("Operation failed!");
    }
})

my_promise
            .then(result => console.log(result))
            .catch(err => console.log(err));