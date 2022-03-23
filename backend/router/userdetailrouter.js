import express from 'express'
import { mutualfriends, getemptyusersdetails,getuserbyid, getallusers, removeusers,userdetailbyid,getallusersdetails,pendinguserdetails,getusersdetailsbyid,updateuserdetails,suggestions } from '../controllers/userdetail.js'

const router = express.Router()

router.get('/userbyid/:id',getuserbyid)
router.get('/useremptydetails',getemptyusersdetails)
router.get('/allusers',getallusers)
router.delete('/removeusers',removeusers)
router.post('/userdetailsbyid',userdetailbyid)
router.get('/allusersdetails',getallusersdetails)
router.get('/usersdetailsbyid/:id',getusersdetailsbyid)
router.put('/updateuserdetails',updateuserdetails)
router.post('/suggestions',suggestions)
router.put('/pendinguserdetails',pendinguserdetails)
router.post('/mutualfriends',mutualfriends)

export default router