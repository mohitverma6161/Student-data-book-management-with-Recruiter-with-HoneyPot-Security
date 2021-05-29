const express=require('express')
require('./db/mongoose')
const User=require('./models/user')
const Task=require('./models/task')
const Info=require('./models/info')
const Project=require('./models/project')
const Document=require('./models/upload-doc')
const Health=require('./models/health')
const Work=require('./models/work')
const Bank=require('./models/bank')
const Govt=require('./models/govt')
const Photo=require('./models/photo')
const RecruiterUser=require('./models/recruiter_user')

const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')
const infoRouter=require('./routers/info')
const projectRouter=require('./routers/project')
const documentRouter=require('./routers/upload-doc')
const healthRouter=require('./routers/health')
const workRouter=require('./routers/work')
const bankRouter=require('./routers/bank')
const govtRouter=require('./routers/govt')
const photoRouter=require('./routers/photo')
const recruiteruserRouter=require('./routers/recruiter_user')
const feedbackRouter=require('./routers/feedback')


const cors=require('cors')

const app=express()
const port=process.env.PORT || 3000
app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.get('origin'));
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
    next();
});
app.use(express.static(__dirname));

console.log(__dirname + '/Signin/views')
app.use(express.json())
 
app.use(userRouter)
app.use(taskRouter)
app.use(infoRouter)
app.use(projectRouter)
app.use(documentRouter)
app.use(healthRouter)
app.use(workRouter)
app.use(bankRouter)
app.use(govtRouter)
app.use(photoRouter)
app.use(recruiteruserRouter)
app.use(feedbackRouter)

// console.log(__dirname)
// app.get('/login',(req,res)=>{ res.sendFile('../Signin/views/signlog.html');})

app.listen(port,()=>{
    console.log('Server is up on port'+ port)
})


