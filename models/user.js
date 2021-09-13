module.exports = function (sequelize, DataTypes) {
	const User = sequelize.define("user", {
		profileImage: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	return User;
};
