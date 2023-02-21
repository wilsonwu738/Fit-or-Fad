const express = require('express');
const router = express.Router();

/* GET pages listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/pages"
  });
});

module.exports = router;