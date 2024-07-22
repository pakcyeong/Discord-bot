function regexp(string){
    let result = string;

    const regexpHTML = /(<([^>]+)>[\s]*)|\\r\\n|\\|/gi;
    const regexpSTRStart = /"{/g;
    const regexpSTREnd = /}"/g;

    result = result.replace(regexpHTML, '');
    result = result.replace(regexpSTRStart, '{');
    result = result.replace(regexpSTREnd, '}'); 

    return result;
}

module.exports = regexp;