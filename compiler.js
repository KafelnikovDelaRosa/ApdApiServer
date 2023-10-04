const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const {exec}=require('node:child_process');
const fs=require('fs');
const app = express();
const port = 3000;
app.use(
    cors({
        origin:"*",
        methods:"GET,HEAD,PUT,PATCH,POST,DELETE"
    })
);
app.use(bodyParser.json());
app.post('/save-code',(req,res)=>{
    /*const {content,language}=req.body;
    fs.writeFile(`temp/index.${language}`,content,err=>{
        if(err){
            console.log(err);
        }
        console.log('File Written Successfully');
    })
    return res.json({
        success:true,
    });*/
    exec("ls",(error,stdout,stderr)=>{
        if(error){
            console.error(`exec error: ${error}`);
            /*return res.json({
                success:false,
                error:stderr
            });*/
        }
        console.log(stdout);
        console.log(stderr);
        /*return res.json({
            success:true,
            result:stdout
        });*/
    });
});
app.post('/run-code',(req,res)=>{
    const {language}=req.body;
    switch(language){
        case 'cpp':
            exec("cd CodeUploads && g++ index.cpp -o index.exe && index.exe",(error,stdout,stderr)=>{
                if(error){
                    console.error(`exec error: ${error}`);
                    return res.json({
                        success:false,
                        error:stderr
                    });
                }
                console.log(stdout);
                return res.json({
                    success:true,
                    result:stdout
                });
            });
            break;
        case 'py':
            exec('cd CodeUploads && python index.py',(error,stdout,stderr)=>{
                if(error){
                    console.error(`exec error: ${error}`);
                    return res.json({
                        success:false,
                        error:stderr
                    });
                }
                console.log(stdout);
                return res.json({
                    success:true,
                    result:stdout
                });
            });
            break;
        case 'js':
            exec('cd CodeUploads && node index.js',(error,stdout,stderr)=>{
                if(error){
                    console.error(`exec error: ${error}`);
                    return res.json({
                        success:false,
                        error:stderr
                    });
                }
                console.log(stdout);
                return res.json({
                    success:true,
                    result:stdout
                });
            });
            break;
        case 'php':
            exec('cd CodeUploads && php index.php',(error,stdout,stderr)=>{
                if(error){
                    console.error(`exec error: ${error}`);
                    return res.json({
                        success:false,
                        error:stderr
                    });
                }
                console.log(stdout);
                return res.json({
                    success:true,
                    result:stdout
                });
            });
            break;
        case 'java':
            exec('cd CodeUploads && javac index.java && java index',(error,stdout,stderr)=>{
                if(error){
                    console.error(`exec error: ${error}`);
                    return res.json({
                        success:false,
                        error:stderr
                    });
                }
                console.log(stdout);
                return res.json({
                    success:true,
                    result:stdout
                });
            });
            break;
    }
});
app.listen(port,()=>{
    console.log('App is listening at port 3000');
});