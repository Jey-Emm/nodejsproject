//using ES modules
import {display_os_values} from './builtin-os.js';
import {display_path_values} from './builtin-path.js'
import {
        async_create_directory,
        sync_createandread_file,
        async_create_file,
        async_read_file,
        async_read_all_files,
        async_rename_file,
        async_delete_file
       } from './builtin-fs.js'

//built-in os modules
//display_os_values();

//built-in path modules
//display_path_values();

//built-in file-stream(fs) modules

const pathValue = 'FileStreamFolder'
const fileValue = 'WriteTextFile.txt'
const fileDataValue = 'This is my Value that writes using node js file stream (fs) module'

const asyncfileValue = 'AsyncWriteTextFile.txt'
const asyncfileDataValue = 'This is my Value that writes using node js file stream (fs) module'
const newFileName = 'NewWriteTextFileName2.txt'

/*async_create_directory(pathValue);
sync_createandread_file(pathValue, fileValue, fileDataValue);*/

//async_create_file(pathValue, asyncfileValue, fileDataValue);
//async_read_file(pathValue + '/' + asyncfileValue);

async_rename_file(pathValue,fileValue,newFileName);
async_delete_file(pathValue,asyncfileValue);
async_read_all_files(pathValue);