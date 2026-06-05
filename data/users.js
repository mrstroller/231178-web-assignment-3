const bcrypt = require("bcryptjs");

const hashedPassword = bcrypt.hashSync("123456", 10);

const users = [
{
id: 1,
email: "admin@gmail.com",
password: hashedPassword,
role: "Admin"
},

{
id: 2,
email: "premium@gmail.com",
password: hashedPassword,
role: "Premium_User"
},

{
id: 3,
email: "free@gmail.com",
password: hashedPassword,
role: "Free_User"
}
];

module.exports = users;