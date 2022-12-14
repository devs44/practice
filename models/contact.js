

module.exports=(sequelize,DataTypes)=>{
    const Contact=sequelize.define('contacts',{
        permanent_address:{
            type:DataTypes.STRING,
            allowNull: false
        },
        Current_address:{
            type:DataTypes.STRING
        },
        UserId:DataTypes.INTEGER
     
    },{

    });
    return Contact
}