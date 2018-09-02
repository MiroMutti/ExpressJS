const fs = require("fs")
const path = require("path")
const url = require("url")

function getContentType(url) {
    let contentTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg'
}
let fileExtension = "." + url.split('.').pop();

    return contentTypes[fileExtension];
}

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname

    if (req.pathname.startsWith("/public/") && req.method === "GET") {
        let filePath = path.normalize(
            path.join(__dirname, `..${req.pathname}`)
        )

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, {
                    "Content-Type": "text/plain"
                })

                res.write("Resource not found")
                res.end()
                return
            } else {
                let ct = getContentType(req.pathname)
                if (ct === undefined) {
                    res.writeHead(404, {
                        "Content-Type": "text/plain"
                    })
    
                    res.write("Resource not found")
                    res.end()
                    return
                }
                res.writeHead(200, {
                    "Content-Type": ct
                })

                res.write(data)
                res.end()
            }
        })
    } else {
        return true
    }
}