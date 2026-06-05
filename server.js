require("dotenv").config();

const express =
require("express");

const cookieParser =
require("cookie-parser");

const cors =
require("cors");

const authRoutes =
require("./routes/authRoutes");

const aiRoutes =
require("./routes/aiRoutes");

const errorHandler =
require(
"./middleware/errorMiddleware"
);

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
cors({
origin:true,
credentials:true
})
);

app.use(
"/api/auth",
authRoutes
);

app.use(
"/api/ai",
aiRoutes
);

app.use(errorHandler);

app.listen(
process.env.PORT,
()=>{

console.log(
`Server Running On Port ${process.env.PORT}`
);

}
);