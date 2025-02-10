import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
//import sequelize from '../config/connection.js';

interface JobQueryAttributes {
  id: number;
  query: string;
  results: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface JobQueryCreationAttributes extends Optional<JobQueryAttributes, "id"> {}

class JobModel extends Model<JobQueryAttributes, JobQueryCreationAttributes> implements JobQueryAttributes {
  public id!: number;
  public query!: string;
  public results!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function JobQueryFactory(sequelize: Sequelize): typeof JobModel {
  JobModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      query: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      results: {
        type: DataTypes.TEXT, 
        allowNull: false,
      },
    },
    {
      sequelize, 
      tableName: "jobsQuery",
      timestamps: true,
  }
  );
  return JobModel;
}

export default JobModel;





