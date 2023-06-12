import express from 'express'
import isAuth from '../utils/isAuth.js'
import {getAll} from "../controllers/driver_controller.js";
const router = express.Router()

router.get('/', isAuth, getAll)

export default router