import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import evironment from '../config/evironment';

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.RefreshToken = User.hasOne(models.RefreshToken);
      User.Roles = User.hasMany(models.Role);
    }

    static async hashPassword(password) {
      return await bcrypt.hash(password, evironment.saltRounds);
    }
    static async createNewUser({
      email,
      password,
      roles,
      userName,
      firstName,
      lastName,
      refreshToken,
    }) {
      return sequelize.transaction(async () => {
        let rolesToSave = [];

        //role = ['customer','admin']
        //roleToSave = [{role:'customer'},{role: 'admin'}]

        if (roles && Array.isArray(roles)) {
          rolesToSave = roles.map((role) => ({ role }));
        }
        await User.create(
          {
            email,
            password,
            userName,
            firstName,
            lastName,
            RefreshToken: { token: refreshToken },
            Roles: rolesToSave,
          },
          { include: [User.RefreshToken, User.Roles] }
        );
      });
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msh: 'Not a valid email adress',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      userName: {
        type: DataTypes.SMALLINT(50),
        unique: true,
        validate: {
          len: {
            args: [2, 26],
            msg: 'User name must contain between 2 and 26 characters',
          },
        },
      },
      firstName: {
        type: DataTypes.SMALLINT(50),
        unique: false,
        validate: {
          len: {
            args: [2, 26],
            msg: 'First name must contain between 2 and 26 characters',
          },
        },
      },
      lastName: {
        type: DataTypes.SMALLINT(50),
        unique: false,
        validate: {
          len: {
            args: [2, 26],
            msg: 'Last name must contain between 2 and 26 characters',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ['password'],
        },
      },
      scopes: {
        withPassword: {
          attributes: {
            include: ['password'],
          },
        },
      },
    }
  );

  User.prototype.comparePasswords = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.beforeSave(async (user, options) => {
    const hashedPassword = await User.hashPassword(user.password);
    user.password = hashedPassword;
  });

  User.afterCreate((user, options) => {
    delete user.dataValues.password;
  });

  return User;
};
