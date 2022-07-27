// option 1
// var message = new XMLSerializer().serializeToString(document)
// console.log(message);

function getSourceCode() {
  let outerHTML = document.documentElement.outerHTML
  outerHTML = '<!DOCTYPE html>' + '\n' + outerHTML
  const sending = browser.runtime.sendMessage({
    sourceCode: outerHTML,
    isPageSource: true,
  })
  sending.then(
    res => {
      console.log('Message Sent', res)
    },
    err => console.log(err)
  )
}
getSourceCode()
