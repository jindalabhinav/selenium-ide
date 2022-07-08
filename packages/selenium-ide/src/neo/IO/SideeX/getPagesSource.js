// option 1
// var message = new XMLSerializer().serializeToString(document)
// console.log(message);
// option 2
// var res1 = DOMtoString(message);

function getSourceCode() {
    let outerHTML = document.documentElement.outerHTML;
    outerHTML = '<!DOCTYPE HTML>' + '\n' + outerHTML;
    return outerHTML;
}

function pageSourceToFile(filename = 'page1.html', content = '') {
    // writeFileSync(filename, content);
    return new File([content], filename, { type: "text/html"});
}

function downloadFile(zippedBlobData, filename) {
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(zippedBlobData);
    downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

downloadFile(pageSourceToFile('page1.html', getSourceCode()), 'page1.html');