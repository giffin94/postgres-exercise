const pg = require("pg");
const settings = require("./settings");

const data = process.argv.slice(2)[0];

const client = new pg.Client(settings);

client.connect();

function doQuery(client, query, values) {
  client.query(query, values, (err, res) => {
    if (err) {
      console.log(err);
      return false;
    } else {
      console.log("Searching ...");
    }

    if (res.rows.length) {
      console.log(`Found ${res.rows.length} for name ${data}.`);
      let c = 1;
      res.rows.forEach((famous_people) => {
        console.log(`${c++}- ${famous_people.first_name} ${famous_people.last_name}, born '${famous_people.dob}'`)
      });
    } else {
      console.log("No results found");
    }
    client.end();
  });
}

if (data) {
  const query = "SELECT first_name, last_name, to_char(birthdate, 'YYYY-MM-DD') AS dob FROM famous_people WHERE first_name LIKE $1 OR last_name LIKE $1";
  const values = [`%${data}%`];
  doQuery(client, query, values);
}


