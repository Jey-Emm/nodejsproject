import {EventEmitter} from 'events'

const event_emitter = new EventEmitter();

event_emitter.on('get-record', (obj) => {
    console.log(obj);
});

event_emitter.emit('get-record', 
        {
            firstname: 'JOSE',
            lastname: 'RIZAL',
            age: 140
        });

//export {event_emitter}