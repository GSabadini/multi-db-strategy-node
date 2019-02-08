const assert = require('assert');
const Postgres = require('../db/strategies/postgres/postgres');
const Context = require('../db/strategies/base/contextStrategy');
const HeroiSchema = require('./../db/strategies/postgres/schemas/heroiSchema');

let context = {};

const MOCK_HEROI_CADASTRAR = {
  nome: 'Gaviao negro',
  poder: 'Flexas',
};

const MOCK_HEROI_ATUALIZAR = {
  nome: 'Batman',
  poder: 'Dinheiro',
};

describe('Postgres Strategy', function () {
  this.timeout(Infinity);
  this.beforeAll(async () => {
    const connection = await Postgres.connect();
    const model = await Postgres.defineModel(connection, HeroiSchema);
    context = new Context(new Postgres(connection, model));
    await context.delete();
    await context.create(MOCK_HEROI_ATUALIZAR);
  });

  it('Postgres Connection', async () => {
    const result = await context.isConnected();
    assert.equal(result, true);
  });

  it('Create', async () => {
    const result = await context.create(MOCK_HEROI_CADASTRAR);
    delete result.id;
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it('Show', async () => {
    const [result] = await context.read({
      nome: MOCK_HEROI_CADASTRAR.nome,
    });
    delete result.id;
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it('Update', async () => {
    const [itemAtualizar] = await context.read({
      nome: MOCK_HEROI_ATUALIZAR.nome,
    });
    const newItem = {
      ...MOCK_HEROI_ATUALIZAR,
      nome: 'Mulher Maravilha',
    };
    const [result] = await context.update(itemAtualizar.id, newItem);
    const [itemAtualizado] = await context.read({
      id: itemAtualizar.id,
    });

    assert.deepEqual(result, 1);
    assert.deepEqual(itemAtualizado.nome, newItem.nome);
  });

  it('Delete', async () => {
    const [item] = await context.read();
    const result = await context.delete(item.id);
    assert.deepEqual(result, 1);
  });
});
