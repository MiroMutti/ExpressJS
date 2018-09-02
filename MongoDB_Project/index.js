let http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
    fs.readFile('./index.html', 'utf8', (err, data) => {
        if(err){
            console.log(err)
        }

        res.writeHead(200, {
            'content-type': 'text/html'
        })
        res.write(data)
        res.end()
    })
}).listen(1337)