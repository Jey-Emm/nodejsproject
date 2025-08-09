import fs from 'fs'

export function async_create_directory(directoryname){

    fs.mkdir('./' + `${directoryname}`, (err) => {
        if(err){
            console.log(err);
        }
        else{
            console.log('Directory ' + `${directoryname}` + ' has been created');
        }
    })
}

export function async_create_file(directoryname, filename, filedata){

    fs.writeFile('./' + `${directoryname}` +'/'+`${filename}`, filedata, (err) => {
        if(err){
            console.log(err);
        }
        else{
            console.log('File ' + `${filename}` + ' has been created in directory ' + `${directoryname}`);
        }
    })
}

export function async_read_file(filedirectory){

    fs.readFile('./' + `${filedirectory}`, {encoding: 'utf-8'}, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            console.log('File has been successfully read. See details below:');
            console.log(data)
        }
    })
}

export function async_read_all_files(folderdirectory){
    fs.readdir('./' + `${folderdirectory}`, (err,files) =>{
        if(err){
            console.log(err);
        }
        else{
            console.log('Directory ' + folderdirectory + 'has been read successfully. Below are the read files.');
            console.log(files);
        }
    })
}

export function async_rename_file(folderdirectory,currentfilename,newfilename){
    fs.rename('./' + `${folderdirectory}` + '/' + `${currentfilename}`, 
              './' + `${folderdirectory}` + '/' + `${newfilename}`, (err) =>{

        if(err){
            console.log(err);
        }
        else{
            console.log('File ' + currentfilename + ' has been successfully renamed to ' + newfilename);
        }
    })
}

export function async_delete_file(folderdirectory,filename){
    fs.unlink('./' + `${folderdirectory}` + '/' + `${filename}`, (err) => {

        if(err){
            console.log(err);
        }
        else{
            console.log('File '+ filename + ' has been successfully deleted ');
        }
    })
}


export function sync_createandread_file(directoryname, filename, filedata){

    try {
        fs.writeFileSync('./' + `${directoryname}` + '/' + `${filename}`, filedata);
        
            console.log('File ' + `${filename}` + ' has been created in directory ' + `${directoryname}`);

        const readfilevalue = fs.readFileSync('./' + `${directoryname}` + '/' + `${filename}`, {encoding: 'utf-8'});
        console.log('File has been successfully read. See details below:');
        console.log(readfilevalue);

    } catch (error) {
        console.log(error);
    }
    
}
