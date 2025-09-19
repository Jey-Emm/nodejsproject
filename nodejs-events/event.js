import {EventEmitter} from 'events'

const event_emitter = new EventEmitter();

event_emitter.on('get-record', (fname, lname,age) => {
    const res_obj = {
        firstname: fname,
        lastname: lname,
        age: age
    }
    console.log(res_obj);
});

//event_emitter.emit('get-record', "Jose", "Rizal", 120);

export {event_emitter}