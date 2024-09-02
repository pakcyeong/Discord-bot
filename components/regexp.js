function regexp(string){
    let result = string;

    const regexpHTML = /(<([^>]+)>[\s]*)|\\r\\n|\\|/gi;

    result = result.replace(regexpHTML, '');

    return result;
}

module.exports = regexp;