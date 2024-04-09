const fs = require('fs')
const path = process.argv[2]

function cat (path){
    fs.readFile(path,"utf8", (err, data) =>{

        if(err){
            console.log("Error:", err.Error)
            process.exit(1)
        }
        {
            console.log(data)
        }

    })

}
cat(path)