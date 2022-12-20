const bodyParser=require('body-parser')
const PORT=5000
const express=require('express')

const useCtrl=require('./controllers/userController')

app=express()

app.use(bodyParser.json())


require('./models/index')

app.get('/',(req,res)=>{
    res.send("hello world")
})


app.get('/query',useCtrl.queryUser)
app.get('/finders',useCtrl.finderUser)
app.get('/get-set-virtual',useCtrl.getSetVirtualUser)
app.get('/validate',useCtrl.validateUser)
app.get('/raw-queries',useCtrl.rawQueriesUser)
// app.get('/one-to-one',useCtrl.oneToOneUser)
// app.get('/one-to-many',useCtrl.oneToManyUser)

app.get('/many-to-many',useCtrl.manyToManyUser)
// app.get('/paranoid',useCtrl.paranoidUser)
// app.get('/loading',useCtrl.loadingUser)

app.get('/eager',useCtrl.eagerloadingUser)
app.get('/creator',useCtrl.creatorUser)
app.get('/scopes',useCtrl.scopesUser)
app.get('/transactions',useCtrl.transactionsUser)
app.get('/hooks',useCtrl.hooksUser)
app.get('/polyOneToMany',useCtrl.polyOneToMany)
app.get('/polyManyToMany',useCtrl.polyManyToMany)
app.get('/queryInterface',useCtrl.queryInterface)
// app.get('/subQueries',useCtrl.subQueryUsers)



app.get('/users',useCtrl.getUsers) 
app.get('/add',useCtrl.addUser)
app.get('/users/:id',useCtrl.getUser)
app.post('/users',useCtrl.postUsers)
app.delete('/users/:id',useCtrl.deleteUser)
app.patch('/users/:id',useCtrl.patchUser)


app.post('/contacts',useCtrl.postContacts)



const server=app.listen(PORT,function(){
    console.log(`Server running at http:localhost:${PORT}`)
})