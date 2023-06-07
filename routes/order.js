import express from 'express'
import isAuth from '../utils/isAuth.js'
import {create, getAll, remove} from '../controllers/order_controller.js'

const router = express.Router()

router.get('/', getAll)
router.post('/', isAuth, create)
router.delete('/:id', isAuth, remove)

export default router