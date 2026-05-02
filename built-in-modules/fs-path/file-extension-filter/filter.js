function filter(files, extension) {
    let result = [];

    for (let i = 0; i < files.length; ++i) {
        let arr = files[i].split('.');
        if (arr[1] === extension) {
            result.push(files[i]);
        }
    }
    return result;
}

module.exports = filter;