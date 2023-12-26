module.exports = (sequelize, DataTypes)=>{
    const User = sequelize.define('User',{
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        role : {
            type : DataTypes.ENUM,
            values : ['admin', 'student'],
            allowNull : false,
        },
        profession : {
            type : DataTypes.STRING,
            allowNull : true,
        },
        avatar : {
            type : DataTypes.STRING,
            allowNull : true,
        },
        createdAt : {
            type : DataTypes.DATE,
            field :'created_at',
            allowNull : false,
        },
        updatedAt : {
            type : DataTypes.DATE,
            field :'updated_at',
            allowNull : false,
        }
    },{
        tableName : 'users',
        timestamps : true,
    }
    )
    return User;
}