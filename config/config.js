require('dotenv').config({ path: `${process.cwd()}/env` });

module.exports = {//nao esquecer de adicionar molude.exports pra mudar de json para js 
  development: {
    username: 'postgres',
    password: 'P4d48iv9!',
    database: 'godzil',
    host: 'localhost',
    port: 5432,
    dialect: "postgres",
  }
}
