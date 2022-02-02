const express = require('express')
const router = express.Router()
const controller = require('../controllers/routeController')

router.get('/',controller.homeGET)
router.get('/success',controller.success)
router.post('/donate',controller.donate)
module.exports = router;