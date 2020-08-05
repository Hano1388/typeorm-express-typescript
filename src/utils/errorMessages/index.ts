export const generateErrorMessages = (err) => {
    let errorMessages = err.map(err => Object.keys(err.constraints)[0]);
    errorMessages = errorMessages.map((key, index) => err[index]['constraints'][key]);
    return errorMessages;
}