const
  Sequelize = require('sequelize'),
  sequelize = new Sequelize('teste', 'root', 'vasco20', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports.criaDB = _criaDB;
module.exports.setDB  = _setDB;

let User = sequelize.define('user', {
name: {
  type: Sequelize.STRING,
  field: 'first_name' 
},
age: {
  type: Sequelize.INTEGER
}
});

function _criaDB(){  
  User.sync({force: true}).then(function () {
    console.log('tabela criada');    
  });
};

function _setDB(user){  
  User.sync({force: true}).then(function () {
    console.log('tabela criada');
    return User.create({
    name: user.name,
    age: user.age
  }); 
  });
};