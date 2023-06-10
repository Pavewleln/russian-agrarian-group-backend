import express from 'express'
import isAuth from '../utils/isAuth.js'
import {create, getAll, remove, edit} from '../controllers/order_controller.js'

const router = express.Router()

router.get('/', getAll)
router.post('/', isAuth, create)
router.patch('/:id', isAuth, remove)
router.patch('/edit/:id', isAuth, edit)

export default router