


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
          
        },
        status:DataTypes.INTEGER
      },
      // {
      //   hooks: {
      //     beforeValidate: (user, options) => {
      //       user.lastName = 'happy';
      //     },
      //     afterValidate: (user, options) => {
      //       user.status = 1;
      //     }
      //   }
      // },
      
      {
        underscored: true,
        sequelize,
        modelName:'Users',
        paranoid: true,
        deletedAt:'soft_delete'
      });
      // User.addHook('beforeValidate', (user, options) => {
      //   user.lastName = 'placed';
      // });
      
      // User.addHook('afterValidate', 'someCustomName', (user, options) => {
      //   user.status=1
      // });
      User.beforeCreate(async (user, options) => {
        user.lastName = "placed";
      });
      
      User.afterValidate('myHookAfter', (user, options) => {
        user.status = 1;
      });
      User.removeHook('afterCreate', 'myHookAfter');
      // User.removeHook(); all  hooks will be removed
      return User;
}