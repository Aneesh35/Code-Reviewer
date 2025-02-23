const app=require('./src/app');
app.listen(3000,()=>{
    console.log("server has started at http://localhost:3000")
})
app.get('/',(req,res)=>{
    res.send("hello world");
})