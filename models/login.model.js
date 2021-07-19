module.exports = (sequelize, DataTypes) => {
    const Login = sequelize.define("Logins", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        provider: {
            type: DataTypes.STRING,
            allowNull: false
        },
        providerKey: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    });

    return Login;
}