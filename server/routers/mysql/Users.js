import { Router } from "express"
import { accessToken, accessTokenAdmin } from "../../controllers/mysql/accessToken.js"
import { DeleteUser, EditUser, getUsers, Login, Logout, Register, ResetPassword, searchUser, SendMail, verifyEmail } from '../../controllers/mysql/Users.controller.js'
import { verifyTokenAndAdmin } from "../../middleware/VerifyToken.js"


const router = Router()

router.get('/api/users', verifyTokenAndAdmin, getUsers)
router.get('/api/search-users/:value', verifyTokenAndAdmin, searchUser)
router.post('/api/users', Register)
router.post('/api/login', Login)
router.get('/api/token', accessToken)
router.get('/api/token-admin', accessTokenAdmin)
router.delete('/api/logout', Logout)
router.put(`/api/edit`, verifyTokenAndAdmin, EditUser)
router.delete(`/api/delete/:id`, verifyTokenAndAdmin, DeleteUser)
router.post('/api/send-mail', SendMail)
router.post('/api/reset-password', ResetPassword)
router.post('/api/verify-email', verifyEmail)



export default router
