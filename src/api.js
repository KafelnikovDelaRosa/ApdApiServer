const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const {exec}=require('child_process');
const serverless=require('serverless-http');
const fs=require('fs');
const app = express();
const router=express.Router();
app.use(
    cors({
        origin:"*",
        methods:"GET,HEAD,PUT,PATCH,POST,DELETE"
    })
);
app.use(bodyParser.json());
router.get('/',(req,res)=>{
    return res.send("Hello World");
})
router.post('/save-code',(req,res)=>{
    const {content,language}=req.body;
    fs.writeFile(`codeUploads/index.${language}`,content,err=>{
        if(err){
            console.log(err);
        }
        console.log('File Written Successfully');
    })
    return res.json({
        success:true,
    });
});
router.post('/run-code',(req,res)=>{
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
app.use('/.netlify/functions/api',router);
module.exports.handler=serverless(app);
