     const response_structure = {
        success: '',
        statuscode: '',
        message: ''
    }

export function error_handler(res, error = '') {

    let json_error_response = '';

    switch(res){
        case 400: 
            response_structure.success = 'false';
            response_structure.statuscode = 400;
            response_structure.message = '400 Bad Request';
            json_error_response = JSON.stringify(response_structure);
            console.log(json_error_response);
            console.error(error);
            return json_error_response;
        case 401: 
            response_structure.success = 'false';
            response_structure.statuscode = 401;
            response_structure.message = '401 Unauthorized';
            json_error_response = JSON.stringify(response_structure);
            console.log(json_error_response);
            console.error(error);
            return json_error_response;
        case 404: 
            response_structure.success = 'false';
            response_structure.statuscode = 404;
            response_structure.message = '404 Not Found';
            json_error_response = JSON.stringify(response_structure);
            console.log(json_error_response);
            console.error(error);
            return json_error_response;
        case 408: 
            response_structure.success = 'false';
            response_structure.statuscode = 408;
            response_structure.message = '408 Request Timeout';
            json_error_response = JSON.stringify(response_structure);
            console.log(json_error_response);
            console.error(error);
            return json_error_response;
        case 409: 
            response_structure.success = 'false';
            response_structure.statuscode = 409;
            response_structure.message = '409 Duplicate';
            json_error_response = JSON.stringify(response_structure);
            console.log(json_error_response);
            console.error(error);
            return json_error_response;
        case 500: 
            response_structure.success = 'false';
            response_structure.statuscode = 500;
            response_structure.message = '500 Internal Server Error';
            json_error_response = JSON.stringify(response_structure);
            console.log(json_error_response);
            console.error(error);
            return json_error_response;
        default:
            console.log("response code not identified");
            console.error(error);
    }
}

export function success_request_handler(res, isblank){

    let json_success_response = '';
    if(isblank){
            response_structure.success = 'true';
            response_structure.statuscode = 200;
            response_structure.message = 'No record found!';
            json_success_response = JSON.stringify(response_structure);
            console.log(json_success_response);
            return json_success_response;
    }
    else {
            json_success_response = JSON.stringify(res);
            console.log(json_success_response);
            return json_success_response;
    }
}