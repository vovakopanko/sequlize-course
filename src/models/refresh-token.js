import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class RefreshToken extends Model {
    static associations(models) {
      RefreshToken.belongsTo(models.User);
    }
  }

  RefreshToken.init(
    {
      token: { type: DataTypes.STRING },
    },
    { sequelize, modelName: 'RefreshToken' }
  );
  return RefreshToken;
};
