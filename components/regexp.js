function regexp(string){
    let result = string;
    const regexpHTML = /(<([^>]+)>[\s]*)|\\r\\n|\\|진화|깨달음|도약|티어/gi;
    result = result.replace(regexpHTML, '');
    const tier = result.split(' ');
    const str =  `\`T${tier[0]}\` ${result.replace(tier[0], '')}`;
    console.log(str);

    return str;
}

module.exports = regexp;

