/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 17-09-2021
 * @modify date 10-06-2022
 * @desc routes handler
 */

const router = require("express").Router();
const index = require("../controllers/indexController");

router.get("/keys/generate/:email/:passphrase", index.generateKeys);
router.post("/enc", index.encryptRouter);
router.post("/dec", index.decryptRouter);

module.exports = router;