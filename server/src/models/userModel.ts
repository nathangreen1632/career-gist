import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  async setPassword(password: string) {
    try {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(password, salt);
      console.log("✅ Password hashed successfully.");
    } catch (error) {
      console.error("‼️ Error in setPassword:", error);
      throw new Error("‼️ Password hashing failed.");
    }
  }
}

export function UserFactory(sequelize: Sequelize): typeof User {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'users',
        sequelize,
        hooks: {
          beforeCreate: async (user: User) => {
            await user.setPassword(user.password);
          },
          beforeUpdate: async (user: User) => {
            if (user.changed('password')) {
              await user.setPassword(user.password);
            }
          },
        }
      }
    );
  
    return User;
  }
