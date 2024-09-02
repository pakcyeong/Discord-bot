function regexp(string){
    let result = string;
    const regexpHTML = /(<([^>]+)>[\s]*)|\\r\\n|\\|진화|깨달음|도약|티어/gi;
    result = result.replace(regexpHTML, '');

    const tier = result.split(' ');

    return `\`T${tier[0]}\` ${result.replace(tier[0], '')}`;
}

module.exports = regexp;

// \`T${n}\` ${Title} Lv. ${n} => expect value