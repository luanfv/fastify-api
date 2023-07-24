import fastify from 'fastify'
import { randomUUID } from 'node:crypto'
import { knex } from './database'

const app = fastify()

app.get('/transactions', async () => {
  const transactions = await knex('transactions')
    .insert({
      id: randomUUID(),
      title: 'transação de teste',
      amount: 100,
    })
    .returning('*')

  return transactions
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Http server running!')
  })
