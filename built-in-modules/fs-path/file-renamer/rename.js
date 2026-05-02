function rename(files) {
    let res = [];
    
    for (let i = 0; i < files.length; ++i) {
        res[i] = "_" + files[i]
    }
    return res;
}

module.exports = rename;