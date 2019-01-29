const moment = require('moment');
const settings = require("./settings");
const knex = require("knex")({
  client: 'pg',
  connection:  settings 
});
const data = process.argv.slice(2)[0];

/* DB: test_db Collection: famous_people 
   Column   |         Type          |                        
------------+-----------------------+
 id         | bigint                | 
 first_name | character varying(50) | 
 last_name  | character varying(50) | 
 birthdate  | date                  | 
*/

function logResults (row, c) {
  console.log(`${c}- ${row.first_name} ${row.last_name}, born ${moment(row.birthdate).format("YYYY-MM-DD")}`);
};

function reportSearch (numberOfRes) {
  console.log(`Found ${numberOfRes} matching search ${data}`)
}

knex("famous_people")
.where("first_name", "like", `%${data}%`)
.orWhere("last_name", "like", `%${data}%`)
.select("first_name", "last_name", "birthdate")
.then((rows) => {
  if (rows.length) {
    reportSearch(rows.length);
    let c = 1;
    rows.forEach((row) => {
      logResults(row, c++);
    });
  } else {
    console.log("No results found!");
  }
})
.finally(() => {
  knex.destroy();
});

