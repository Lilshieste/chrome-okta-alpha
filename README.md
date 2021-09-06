# chrome-okta-alpha
A Chrome extension that sorts Okta tiles alphabetically.

## How Does It Work?
The extension monitors the part of the DOM in which the Okta tiles are dynamically loaded. As soon as the tiles have finished loading, the
extension sorts the tiles by the content of their respective
`p app-button-name` element.
