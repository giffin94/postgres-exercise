
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', (table) => {
      table.integer('fid').references('famous_people.id');
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
