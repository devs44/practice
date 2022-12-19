

const {Sequelize,DataTypes,Model}=require('sequelize')

const sequelize = new Sequelize('Practice', 'postgres', 'devi', {
  host: 'localhost',
  logging:true,
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




db.sequelize.sync({force:false})
module.exports=db