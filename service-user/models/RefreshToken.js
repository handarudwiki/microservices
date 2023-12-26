module.exports = (sequelize, DataTypes) => {
    const RefreshToken = sequelize.define('RefreshToken',{
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true,
        },
        token : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        user_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        createdAt : {
            field : 'created_at',
            type : DataTypes.DATE,
            allowNull : false,
        },
        updatedAt : {
            field : 'updated_at',
            type : DataTypes.DATE,
            allowNull : false,
        },
    },{
        tableName : 'refresh_tokens',
        timestamps : true
    })

    return RefreshToken
}