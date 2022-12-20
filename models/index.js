

const {Sequelize,DataTypes,Model}=require('sequelize')

const sequelize = new Sequelize('Practice', 'postgres', 'devi', {
  host: 'localhost',
  logging:true,
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialect: 'postgres'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.user=require('./user')(sequelize,DataTypes,Model)
db.contact=require('./contact')(sequelize,DataTypes,Model)
db.userContacts=require('./userContacts')(sequelize,DataTypes,db.user,db.contact)

// One to one
// db.user.hasOne(db.contact);
// db.contact.belongsTo(db.user);

//one to many
// db.user.hasMany(db.contact);
// db.contact.belongsTo(db.user);

//many to many
db.user.belongsToMany(db.contact, { through: db.userContacts });
db.contact.belongsToMany(db.user, { through: db.userContacts});

// db.userContacts=require('./userContacts')(sequelize,DataTypes,db.user,db.contact)

// db.user.hasMany(db.contact,{foreignKey:'user_id',as:'contactDetails'});
// db.contact.belongsTo(db.user,{foreignKey:'user_id',as:'userDetails'});

// db.user.belongsToMany(db.contact,{through:db.userContacts});
// db.contact.belongsToMany(db.user,{through:db.userContacts});


//polymorphic association
db.image=require('./image')(sequelize,DataTypes,Model);
db.video=require('./video')(sequelize,DataTypes,Model);
db.comment=require('./comment')(sequelize,DataTypes,Model);
db.tag=require('./tag')(sequelize,DataTypes,Model);
db.tagTaggable=require('./tag_taggable')(sequelize,DataTypes,Model);



db.image.hasMany(db.comment, {
  foreignKey: 'commentableId',
  constraints: false,
  scope: {
    commentableType: 'image'
  }
});
db.comment.belongsTo(db.image, { foreignKey: 'commentableId', constraints: false });

db.video.hasMany(db.comment, {
  foreignKey: 'commentableId',
  constraints: false,
  scope: {
    commentableType: 'video'
  }
});
db.comment.belongsTo(db.video, { foreignKey: 'commentableId', constraints: false });



db.image.belongsToMany(db.tag, {
  through: {
    model: db.tagTaggable,
    unique: false,
    scope: {
      taggableType: 'image'
    }
  },
  foreignKey: 'taggableId',
  constraints: false
});
db.tag.belongsToMany(db.image, {
  through: {
    model: db.tagTaggable,
    unique: false
  },
  foreignKey: 'tagId',
  constraints: false
});
db.video.belongsToMany(db.tag, {
  through: {
    model: db.tagTaggable,
    unique: false,
    scope: {
      taggableType: 'video'
    }
  },
  foreignKey: 'taggableId',
  constraints: false
});
db.tag.belongsToMany(db.video, {
  through: {
    model: db.tagTaggable,
    unique: false
  },
  foreignKey: 'tagId',
  constraints: false
});

db.post = sequelize.define('post', {
  content: DataTypes.STRING
}, { timestamps: false });

db.reaction = sequelize.define('reaction', {
  type: DataTypes.STRING
}, { timestamps: false });

db.post.hasMany(db.reaction);
db.reaction.belongsTo(db.post);




db.DataTypes=DataTypes;
db.sequelize.sync({force:false})
module.exports=db