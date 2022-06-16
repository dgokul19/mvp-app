export const validateFiles = ( files ) => {
    let dataFile = [];
    files.forEach(csvfile => {
        if(csvfile.type !== 'text/csv'){
            alert(`Invalid File : ${csvfile.name}`)
        }
        dataFile.push(csvfile);
    });
    return dataFile;
};