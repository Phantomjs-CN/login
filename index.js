const spawn = require('child_process').spawn,
    fs = require('fs');



function cutstr(text,start,end){

    let s = text.indexOf(start)

    if(s>-1){

    let text2 = text.substr(s+start.length);

    let s2 = text2.indexOf(end);

    if(s2>-1){

    result = text2.substr(0,s2);

    }else result = '';

    }else result = '';

    return result;

}


function mkdirPath(path,cb) {
   fs.mkdir(path, function (err) {

        if(err)

            throw err;

        console.log('创建目录成功');

        cb()

     }); 
}

function  isHasPF(pf,cb) {
    fs.exists(pf, function (exists) {
        if(exists){
            cb()
        }else{
           mkdirPath(pf,function () {
               cb()
           }) 
        }           

    });

}

const sites = ["http://www.panli.com/"]; // 这里存放网站的Url列表
const requests = sites.map(site => {
    const phantom = spawn('phantomjs', ['netsniff.js', site]);
    let result = '';



    phantom.stdout.on('data', (data) => {
       
        result += data;
     
    });

    
    

    phantom.stderr.on('error', (err) => {
        console.log(`stderr: ${site}, ${err}`);
    });
    phantom.on('close', (code) => {
        
        let sitep = site.replace(/http|https|:|\//g, "");
        console.log(sitep)

        isHasPF('./resource',function () {
             fs.writeFile(`./resource/${sitep}.json`, result);
        })
       

      
        console.log(`${site} complated with code:${code}.`);
    });
});