

/*const error_helper = (err, req, res, next) => {
    switch(res.statusCode){
        case 400: 
                res.status(err.statusCode).json({
                    success: false,
                    message: err.message
                })
    }
}*/

export function error_helper(res) {

    const response_structure = {
        success: '',
        statuscode: '',
        message: ''
    }

    let json_error_response = '';

    switch(res){
        case 400: 
            response_structure.success = 'false';
            response_structure.statuscode = 400;
            response_structure.message = '400 Bad Request';
            json_error_response = JSON.stringify(response_structure);
            console.log(json_error_response);
            break;
        case 404: 
            response_structure.success = 'false';
            response_structure.statuscode = 404;
            response_structure.message = '404 Not Found';
            json_error_response = JSON.stringify(response_structure);
            console.log(json_error_response);
            break;
        case 408: 
            response_structure.success = 'false';
            response_structure.statuscode = 408;
            response_structure.message = '408 Request Timeout';
            json_error_response = JSON.stringify(response_structure);
            console.log(json_error_response);
            break;
        case 409: 
            response_structure.success = 'false';
            response_structure.statuscode = 409;
            response_structure.message = '409 Duplicate';
            json_error_response = JSON.stringify(response_structure);
            console.log(json_error_response);
            break;
        case 500: 
            response_structure.success = 'false';
            response_structure.statuscode = 500;
            response_structure.message = '500 Internal Server Error';
            json_error_response = JSON.stringify(response_structure);
            console.log(json_error_response);
            break;
        default:
            console.log("response code not identified");
    }
}