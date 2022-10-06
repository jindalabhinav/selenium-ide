// option 1
// var message = new XMLSerializer().serializeToString(document)
// console.log(message);

function getSourceCode() {
  console.log(`I/O-getPageSource.js: Calling Execute Script From Browser`);  
  let outerHTML = document.documentElement.outerHTML;
  outerHTML = '<!DOCTYPE html>' + '\n' + outerHTML;
  console.log(`Selected Page Source Length ${outerHTML.length} And Sending Message to IDE`);
  const sending = browser.runtime.sendMessage({
    sourceCode: outerHTML,
    isPageSource: true,
  })
  sending.then(
    res => {
      console.log('Message Sent', res)
    },
    err => console.log(`Message Not Sent Error: ${err}`)
  )
}
getSourceCode()
