function regexp(string){
    let result = string;

    const regexpHTML = /(<([^>]+)>[\s]*)|\\r\\n|\\|도약|깨달음|진화/gi;

    result = result.replace(regexpHTML, '');

    return result;
}

module.exports = regexp;