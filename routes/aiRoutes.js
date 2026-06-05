const express =
require("express");

const router =
express.Router();

const protect =
require(
"../middleware/authMiddleware"
);

const restrictTo =
require(
"../middleware/roleMiddleware"
);

router.get(
"/free-model",
protect,
(req,res)=>{

res.json({
message:
"Free AI Model Access Granted"
});

}
);

router.post(
"/premium-model",

protect,

restrictTo(
"Premium_User",
"Admin"
),

(req,res)=>{

res.json({
message:
"Premium AI Model Access Granted"
});

}
);

router.delete(
"/purge-cache",

protect,

restrictTo(
"Admin"
),

(req,res)=>{

res.json({
message:
"Cache Purged Successfully"
});

}
);

module.exports =
router;