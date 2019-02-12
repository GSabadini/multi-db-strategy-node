const assert = require('assert');
const MongoDB = require('../db/strategies/mongodb/mongodb');
const Context = require('../db/strategies/base/contextStrategy');
const HeroiSchema = require('./../db/strategies/mongodb/schemas/heroisSchema');

let context = {};

const MOCK_HEROI_CADASTRAR = {
  nome: 'Flash',
  poder: 'Velocidade',
};

const MOCK_HEROI_ATUALIZAR = {
  nome: `Batman-${Date.now()}`,
  poder: 'Dinheiro',
};

let MOCK_HEROI_ID = '';

describe('MongoDB Strategy', function () {
  this.timeout(Infinity);
  this.beforeAll(async () => {
    const connection = MongoDB.connect();
    context = new Context(new MongoDB(connection, HeroiSchema));
    const result = await context.create(MOCK_HEROI_ATUALIZAR);
    MOCK_HEROI_ID = result._id;
  });

  it('MongoDB Connection', async () => {
    const result = await context.isConnected();
    const expected = 'Conectado';

    assert.deepEqual(result, expected);
  });

  it('Create', async () => {
    const {
      nome,
      poder,
    } = await context.create(MOCK_HEROI_CADASTRAR);

    assert.deepEqual({
      nome,
      poder,
    }, MOCK_HEROI_CADASTRAR);
  });

  it('Read', async () => {
    const [{
      nome,
      poder,
    }] = await context.read({
      nome: MOCK_HEROI_CADASTRAR.nome,
    });

    const result = {
      nome,
      poder,
    };

    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it('Update', async () => {
    const result = await context.update(MOCK_HEROI_ID, {
      nome: 'Homem de ferro',
    });

    assert.deepEqual(result.nModified, 1);
  });

  it('Delete', async () => {
    const result = await context.delete(MOCK_HEROI_ID);

    assert.deepEqual(result.n, 1);
  });
});
