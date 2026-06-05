const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const users = require("../data/users");

const refreshTokens = [];

const generateAccessToken = (user) => {

return jwt.sign(
{
id: user.id,
email: user.email,
role: user.role
},
process.env.JWT_SECRET,
{
expiresIn:
process.env.ACCESS_TOKEN_EXPIRES
}
);

};

const generateRefreshToken = (user) => {

return jwt.sign(
{
id: user.id
},
process.env.JWT_SECRET,
{
expiresIn:
process.env.REFRESH_TOKEN_EXPIRES
}
);

};

const login = async (req,res) => {

const {email,password}
= req.body;

const user = users.find(
u => u.email === email
);

if(!user){

return res.status(401).json({
message:"Invalid Credentials"
});

}

const match =
await bcrypt.compare(
password,
user.password
);

if(!match){

return res.status(401).json({
message:"Invalid Credentials"
});

}

const accessToken =
generateAccessToken(user);

const refreshToken =
generateRefreshToken(user);

refreshTokens.push(refreshToken);

res.cookie(
"refreshToken",
refreshToken,
{
httpOnly:true,
secure:false,
sameSite:"strict"
}
);

res.json({
accessToken
});

};

const refresh = (req,res)=>{

const token =
req.cookies.refreshToken;

if(!token){

return res.status(401).json({
message:"No Refresh Token"
});

}

if(
!refreshTokens.includes(token)
){

return res.status(403).json({
message:"Invalid Refresh Token"
});

}

try{

const decoded =
jwt.verify(
token,
process.env.JWT_SECRET
);

const user =
users.find(
u => u.id === decoded.id
);

const newAccessToken =
generateAccessToken(user);

res.json({
accessToken:
newAccessToken
});

}
catch(err){

return res.status(403).json({
message:"Expired Refresh Token"
});

}

};

module.exports = {
login,
refresh
};