//POST MODEL FILE -- This is for you Mitch

module.exports = function (sequelize, DataTypes) {
	const Post = sequelize.define("post", {
		image: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		likes: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		owner: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});
	return Post;
};
