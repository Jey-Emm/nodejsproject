import path from 'path';

export function display_path_values(){
    const my_current_path = 'C:/Users/mptdi/source/repos/beginner-first-node-js-project/app-es.js';

    const pathData = {
        filename: path.basename(my_current_path),
        foldername: path.dirname(my_current_path),
        fileextension: path.extname(my_current_path),
        absval: path.isAbsolute(my_current_path),
        detailsinfo: path.parse(my_current_path)
    }

    console.log(pathData);
}