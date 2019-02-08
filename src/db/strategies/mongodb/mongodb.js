const ICrud = require('./../interface/interfaceCrud')
const Mongoose = require('mongoose')

const STATUS = {
  0: 'Disconectado',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Disconectando'
}

class MongoDB extends ICrud {
  constructor(connection, schema) {
    super()
    this._schema = schema
    this._connection = connection
  }

  create(item) {
    return this._schema.create(item)
  }

  read(item, skip = 0, limit = 10) {
    return this._schema.find(item).skip(skip).limit(limit)
  }

  update(id, item) {
    return this._schema.updateOne({
      _id: id
    }, {
      $set: item
    })
  }

  delete(id) {
    return this._schema.deleteOne({
      _id: id
    })
  }

  async isConnected() {
    const readyState = this._connection.readyState
    const state = STATUS[readyState]

    if (state === 'Conectado') return state

    if (state !== 'Conectando') return state

    await new Promise(resolve => setTimeout(resolve, 1000))

    return STATUS[readyState]
  }

  defineModel() {

  }

  static connect() {
    Mongoose.connect('mongodb://root:root@localhost:27017/admin', {
      useNewUrlParser: true
    }, (error) => {
      if (!error) return;

      console.log('Falha na conexão!', error)
    });

    const connection = Mongoose.connection

    connection.once('open', () => {})

    return connection
  }
}

module.exports = MongoDB
