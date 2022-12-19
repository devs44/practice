const {sequelize}=require('../models')
const db=require('../models')

const User=db.user;
console.log(User)
const Contact=db.contact;

const {Sequelize,Op,QueryTypes}=require('sequelize')

const addUser=async(req,res)=>{
    const simran=User.build({firstName:"Simran"});
    await simran.save();
    res.status(200).json(simran.toJSON());
}

const getUsers=async(req,res)=>{
    const data=await User.findAll({ });
    res.status(200).json({data:data});
}

const getUser=async(req,res)=>{
    const data=await User.findOne({
        where:{
            id:req.params.id
        }
    });
    res.status(200).json({data:data});
}

const postUsers=async(req,res)=>{
    var postData=req.body;
    const data=await User.create(postData);
    res.status(200).json({data:data});
}

const postContacts=async(req,res)=>{
    var postData=req.body;
    const data=await Contact.create(postData);
    res.status(200).json({data:data});
}

const deleteUser=async(req,res)=>{
    
    const data=await User.destroy({
        where:{
            id:req.params.id
        }
    });
    res.status(200).json({data:data});
}


const patchUser=async(req,res)=>{
    var updatedData=req.body;
    const data=await User.update({updatedData},{
        where:{
            id:req.params.id
        }
    });
    console.log(updatedData)
    res.status(200).json({data:data});
}


const queryUser=async(req,res)=>{
   
    const data=await User.findAll({
        where:{
            id:{
                [Op.eq]:1
            }
        }
    });
    res.status(200).json({data:data});
}


const finderUser=async(req,res)=>{
   
    const [user,created]=await User.findOrCreate({
        where:{firstName:'Sabitri'},
        defaults:{
            lastName:'Sunuwar'
        }
    })
    res.status(200).json({data:user,created:created});
}


const getSetVirtualUser=async(req,res)=>{
    const data=await User.create({
        firstName:"Simran",
        lastName:"Goyal"
    });
    res.status(200).json({data:data});
}

const validateUser=async(req,res)=>{
    var data={};
    var message={};
    try{
        data=await User.create({
            firstName:'Simra13',
            lastName:"Goyal"
        });
    }catch(e){
        let message;
        e.errors.forEach(error=>{
            switch(error.validatorKey){
                case 'isAlpha':
                    message='Only alphabets are allowed'
                    break;
            }
        })
    }
    res.status(200).json({data:data,message:message});
}

const rawQueriesUser=async(req,res)=>{
    const users=await db.sequelize.query("SELECT * FROM users ",
    {
        type:QueryTypes.SELECT,
        model:User,
        mapToModel:true
    });
    res.status(200).json({data:users})
}

// const oneToOneUser=async(req,res)=>{
//     // const data=await User.create({firstName:'mohit',lastName:'kumar'})
//     // if(data && data.id ){
//     //     await Contact.create({
//     //         permanent_address:'xyz',
//     //         'current_address':'abc',
//     //         'user_id':data.id
//     //     })
//     // }
//     const data=await User.findAll({
//         attibutes:["firstName","lastName"],
//         include:[{
//             model:Contact,
//             attibutes:["permanent_address","current_address"]
//         }]
//     })
    
//     res.status(200).json({data:data});
// }


// const oneToManyUser=async(req,res)=>{
//     const data=await Contact.findAll({
//                 attibutes:["firstName","lastName"],
//                 include:[{
//                     model:User,
//                     attibutes:["firstName","lastName"]
//                 }],
//                 where:{id:2}
//             })
//     // const data=await Contact.create({
//     //     permanent_address:'Coimbatore',
//     //     'current_address':'punjab',
//     //     'id':2
//     // })
//     res.status(200).json({data:data})
// }

// const paranoidUser=async(req,res)=>{
//     const data =await User.create({firstName:'ram',lastName:'Singh'})
//     res.status(200).json({data:data})
// }

// const loadingUser=async(req,res)=>{
//     const data=await User.findAll({
//         attributes:['firstName','lastName'],
//         include:[{
//             model:Contact,
//             attributes:['permanent_addres','current_address']
//         }]
//     })
//     res.status(200).json({data:data})
// }



const manyToManyUser=async(req,res)=>{
    // const data=await User.create({firstName:'devi',lastName:'sunuwar'})
    //    if(data && data.id ){
    //        await Contact.create({
    //            permanent_address:'kathmandu',
    //            Current_address:'punjab',
    //            user_id:data.id
    //         })
    //      }
    const data=await Contact.findAll({
        attributes:['permanent_address','Current_address'],
        include:{
            model:User,
            attributes:['firstName','lastName']
        }
    })
    res.status(200).json({data:data})
}

const eagerloadingUser=async(req,res)=>{
    const data=User.findAll({
        include:[{
            model:Contact //left join
            // required:true inner join
            // right:true    right join
        }]
    })
    res.status(200).json({data:data})
}

const creatorUser=async(req,res)=>{
    
    const data=User.findAll({
        include:[{
            model:Contact 
        }]
    })
    res.status(200).json({data:data})
}

module.exports={
    getUsers,
    addUser,
    getUser,
    postUsers,
    deleteUser,
    patchUser,

    postContacts,

    queryUser,
    finderUser,
    getSetVirtualUser,
    validateUser,
    rawQueriesUser,
    // oneToOneUser,
    // oneToManyUser,
    manyToManyUser,
    // paranoidUser,
    // loadingUser,
    eagerloadingUser,
    creatorUser

}