function etcregexp(string){
    let result = string;

    const regexpHTML = /(<([^>]+)>[\s]*)|\\r\\n|\\|/gi;
    const regexpSTRStart = /"{/g;
    const regexpSTREnd = /}"/g;

    result = result.replace(regexpHTML, '');
    result = result.replace(regexpSTRStart, '{');
    result = result.replace(regexpSTREnd, '}'); 

    return JSON.parse(result);
}

module.exports = etcregexp;