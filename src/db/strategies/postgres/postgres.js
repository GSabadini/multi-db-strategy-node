const Sequelize = require('sequelize');
const ICrud = require('./../interface/interfaceCrud');

class Postgres extends ICrud {
  constructor(connection, schema) {
    super();
    this._connection = connection;
    this._schema = schema;
  }

  async isConnected() {
    try {
      await this._connection.authenticate();
      return true;
    } catch (error) {
      return false;
    }
  }

  static async defineModel(connection, schema) {
    const model = connection.define(
      schema.name,
      schema.schema,
      schema.options,
    );
    await model.sync();

    return model;
  }

  static connect() {
    const connection = new Sequelize(
      'heroes',
      'root',
      'root', {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false,
        logging: false,
      },
    );
    return connection;
  }

  async create(item) {
    const {
      dataValues,
    } = await this._schema.create(item);

    return dataValues;
  }

  async read(value = {}) {
    return await this._schema.findAll({
      where: value,
      raw: true,
    });
  }

  async update(id, item) {
    return await this._schema.update(item, {
      where: {
        id,
      },
    });
  }

  async delete(id) {
    const query = id ? {
      id,
    } : {};
    return await this._schema.destroy({
      where: query,
    });
  }
}

module.exports = Postgres;
