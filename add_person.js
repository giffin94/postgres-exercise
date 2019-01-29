const settings = require("./settings");
const knex = require("knex")({
  client: 'pg',
  connection:  settings 
});
const [firstName, lastName, birthDate] = process.argv.slice(2);

/* DB: test_db Collection: famous_people 
   Column   |         Type          |                        
------------+-----------------------+
 id         | bigint                | 
 first_name | character varying(50) | 
 last_name  | character varying(50) | 
 birthdate  | date                  | 
*/

console.log(firstName, lastName, birthDate);

knex('famous_people')
.insert([{
  first_name: `${firstName}`,
  last_name: `${lastName}`,
  birthdate: `${birthDate}`
}])
.then( () => {
console.log("insert complete!");
})
.finally( () => {
  knex.destroy();
})
.catch( (error) => {
  console.error(error);
});