import { expect, it, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import request from 'supertest'
import app from '../src/app'
import { execSync } from 'node:child_process'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new transaction', async () => {
    const result = await request(app.server).post('/transactions').send({
      title: 'New transaction',
      amount: 500,
      type: 'credit',
    })

    expect(result.statusCode).toEqual(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionCookie = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 500,
        type: 'credit',
      })

    const cookies = createTransactionCookie.get('Set-Cookie')

    const result = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .send()

    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual({
      transactions: [
        expect.objectContaining({ title: 'New transaction', amount: 500 }),
      ],
    })
  })
})
