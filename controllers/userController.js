const {sequelize, image, tag}=require('../models')
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

const scopesUser=async(req,res)=>{
    User.addScope('checkStatus',{
        where:{
            status:1
        }
    })
    User.addScope('lastNameCheck',{
        where:{
            lastName:"V,Sunuwar"
        }
    })
    User.addScope('includeContact',{
        include:{
            model:Contact
        }
    })
    const data=await User.scope(['checkStatus','lastNameCheck']).findAll({});
    res.status(200).json({data:data})
}


//unmanaged transaction
// const transactionsUser=async(req,res)=>{
//     const t=await db.sequelize.transaction();
//     const data=await User.create({
//         firstName:'Devi',
//         lastName:'Sununwar'
//     })
//     if (data && data.id){
//         try{
//             await Contact.create({
//                 permanent_address:'Kathmandu',
//                 Current_address:'punjab',
//                 'User_id':null
//             })
//             await t.commit();
//             data['transaction_status']='commit';
//         }
//         catch(error){
//             await t.rollback();
//             data['transaction_status']='rollback';
//             await User.destroy({
//                 where:{
//                     id:data.id
//                 }
//             })
//         }
//     }
//     res.status(200).json({data:data})
// }

//managed transaction
const transactionsUser=async(req,res)=>{
    const data=await User.create({
                firstName:'Sabitri',
                lastName:'Sununwar'
            })
            try {

                const result = await db.sequelize.transaction(async (t) => {
              
                  const contact = await Contact.create({
                    permanent_address: 'Kathmandu',
                    Current_address: 'Canberra',
                    'UserId':null
                  }, { transaction: t });
                  return contact;
              
                });
              
                console.log('result ',result)
              } catch (error) {
                console.log('error: ',error.message)
                await User.destroy({
                    where:{
                        id:data.id
                    }
                })

              }
    res.status(200).json({data:data})
}

const hooksUser=async(req,res)=>{
    const data=await User.create({
        firstName:"Kumar",
        lastName:"Sanu",
        status:0
    })
    res.status(200).json({data:data})
}

const Image=db.image;
const Video=db.video;
const Comment=db.comment;
const Tag=db.tag;
const TagTaggable=db.tagTaggable;

const polyOneToMany=async(req,res)=>{
    // const imageData=await Image.create({
    //     title:'First Image',
    //     url:'first_url'
    // })
    // const videoData=await Video.create({
    //     title:'Second Video',
    //     text:'awesome video'
    // })
    // if (imageData && imageData.id){
    //     await Comment.create({
    //         title:"First comment for image",
    //         commentableId:imageData.id,
    //         commentableType:'image'
    //     })
        
    // }
    // if (videoData && videoData.id){
    //     await Comment.create({
    //         title:"First comment for video",
    //         commentableId:videoData.id,
    //         commentableType:'video'
    //     })
    // }

    //image to comment
    // const  imageCommentData=await Image.findAll({
    //     include:[{
    //         model:Comment
    //     }]

    // })

    //video to comment
    const videoCommentData=await Video.findAll({
        include:[{
            model:Comment
        }]
    })
    res.status(200).json({data:videoCommentData})
}


const polyManyToMany=async(req,res)=>{
    
    // const imageData=await Image.create({
    //     title:'Second Image',
    //     url:'second_url'
    // })
    // const videoData=await Video.create({
    //     title:'Third Video',
    //     text:'awesome video'
    // })
    // const tagData=await Tag.create({
    //     name:'Good job'
    // })
    // if (tagData && tagData.id && imageData && imageData.id){
    //         await TagTaggable.create({
    //             tagId:tagData.id,
    //             taggableId:imageData.id,
    //             taggableType:'image'
    //         })
    //     }
    // if (tagData && tagData.id && videoData && videoData.id){
    //             await TagTaggable.create({
    //                 tagId:tagData.id,
    //                 taggableId:videoData.id,
    //                 taggableType:'video'
    //             })
    // }
    const tagData=await Tag.findAll({
        include:[Image,Video]
    })
    res.status(200).json({data:tagData})
}

const queryInterface=async(req,res)=>{
    const data={}
    const queryInterface = db.sequelize.getQueryInterface();
    // queryInterface.createTable('Person', {
    //     name: db.DataTypes.STRING,
    //     isBetaMember: {
    //       type: db.DataTypes.BOOLEAN,
    //       defaultValue: false,
    //       allowNull: false
    //     }
    //   });
    queryInterface.addColumn('Person', 'petName', { type: db.DataTypes.STRING });
    res.status(200).json({data:data})
}


// async function makePostWithReactions(content, reactionTypes) {
//     const post = await db.post.create({ content });
//     await db.reaction.bulkCreate(
//         reactionTypes.map(type => ({ type, postId: post.id }))
//     );
//     return post;
// // }
// const subQueryUsers=async(req,res)=>{
//     // const data=await makePostWithReactions('Hello World', [
//     //     'Like', 'Angry', 'Laugh', 'Like', 'Like', 'Angry', 'Sad', 'Like'
//     // ]);
//     // await makePostWithReactions('My Second Post', [
//     //     'Laugh', 'Laugh', 'Like', 'Laugh'
//     // ]);
//     const data=await db.post.findAll({
//         attributes: {
//             include: [
//                 [
//                     // Note the wrapping parentheses in the call below!
//                     db.sequelize.literal(`(
//                         SELECT COUNT(*)
//                         FROM reactions AS reaction
//                         WHERE
//                             reaction.postId = post.id
//                             AND
//                             reaction.type = "Laugh"
//                     )`),
//                     'laughReactionsCount'
//                 ]
//             ]
//         }
//     });
//     res.status(200).json({data:data})
// }


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
    creatorUser,
    scopesUser,
    transactionsUser,
    hooksUser,
    polyOneToMany,
    polyManyToMany,
    queryInterface,
    // subQueryUsers
    

}