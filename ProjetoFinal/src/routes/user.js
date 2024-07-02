const express = require('express')

const UserApi = require('../api/user')
const router = express.Router()

router.get('/', UserApi.findUsersAll)
router.get('/:id', UserApi.findUsers)
router.put('/:id', UserApi.updateUser)
router.delete('/:id', UserApi.deleteUser)

module.exports = router