


module.exports=(sequelize,DataTypes,Model)=>{
    

    const User = sequelize.define('Users', {
        
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
          // validate:{
          //   isAlpha:true,
          // },
          // get(){
          //   const rawValue=this.getDataValue('firstName');
          //   return rawValue ? rawValue.toUpperCase():null;
          // }
        },
        
        lastName: {
          type: DataTypes.STRING,
          // set(value){
          //   this.setDataValue('lastName',value+' , Indian');
          // }
          
        }
      }, {
        sequelize,
        modelName:'Users',
        paranoid: true,
        deletedAt:'soft_delete'
      });
      return User;
}