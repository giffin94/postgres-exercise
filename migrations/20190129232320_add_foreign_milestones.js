
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', (table) => {
      table.integer('fid');
      table.foreign('fid').references('id').inTable('famous_people');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', (table) => {
      table.dropColumn('fid');
    })
  ]);
};