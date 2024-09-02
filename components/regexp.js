function regexp(string){
    let result = string;
    const regexpHTML = /(<([^>]+)>[\s]*)|\\r\\n|\\|진화|깨달음|도약/gi;
    result = result.replace(regexpHTML, '');
    let tier = result.split(' ');
    const tierNum = tier[0].replace('티어', '');
    const str =  `\`T${tierNum}\` ${result.replace(tier[0], '')}`;
    console.log(str);

    return str;
}

module.exports = regexp;

