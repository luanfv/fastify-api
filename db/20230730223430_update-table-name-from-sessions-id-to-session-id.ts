import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('transactions', (table) => {
    table.renameColumn('sessions_id', 'session_id')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('transactions', (table) => {
    table.renameColumn('session_id', 'sessions_id')
  })
}
