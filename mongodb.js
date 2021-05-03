//CRUD create read update delete

// const mongodb=require('mongodb')
// const MongoClient=mongodb.MongoClient
// const ObjectID=mongodb.ObjectID

const {MongoClient,ObjectID}=require('mongodb')

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error)
    {
        return console.log('Unable to connect to database')
    }
    const db=client.db(databaseName)

    // db.collection('users').insertOne({
    //     _id:id,
    //     name:'Vikram',
    //     age:26
    // },(error,result)=>{
    //     if(error){
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })
    // db.collection('users').insertMany([
    //     {
    //         name:'Rohit',
    //         age:15
    //     },
    //     {
    //         name:'Shweta',
    //         age:19
    //     }
    // ],(error,result)=>{
    //     if(error){
    //                return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })
    // db.collection('tasks').insertMany([
    //     {
    //         description:'Clean the house',
    //         completed:true
    //     },
    //     {
    //         description:'Renew inspection',
    //         completed:false
    //     },
    //     {
    //         description:'Pot plants',
    //         completed:true
    //     }
    // ],(error,result)=>{
    //     if(error){
    //                return console.log('Unable to insert tasks')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').findOne({_id:new ObjectID("6009be6d5490ee19c4cc5c08")},(error,user)=>{
    //     if(error){
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })
    // db.collection('users').find({age:22}).toArray((error,user)=>{
    //     if(error){
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })
    // db.collection('users').find({age:22}).count((error,count)=>{
    //     if(error){
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(count)
    // })

    // db.collection('users').updateOne({
    //     _id:new ObjectID("6009b7969bac3f0b0c188a86")
    // },{
    //     $inc:{
    //         age:1
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed:false
    // },{
    //     $set:{
    //         completed:true
    //     }
    // }).then((result)=>{
    //     console.log(result.modifiedCount)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    db.collection('users').deleteMany({
        age:22
    }).then((result)=>{
        console.log(result)
       }).catch((error)=>{
           console.log(error)
       })
    db.collection('tasks').deleteOne({
        description:'Clean the house'
    }).then((result)=>{
        console.log(result)
       }).catch((error)=>{
           console.log(error)
       })


})