module.exports = function (sequelize, DataTypes) {
    var favQuote = sequelize.define("favQuote", {
        quote: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
    });
    return favQuote;
};