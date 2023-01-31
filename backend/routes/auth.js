const express=require('express')
const router=express.Router();
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const JWT_SECRET="anshisagoodboy";
const fetchuser=require('../middleware/fetchuser')

// ROUTE 1: Create a user using:post "/api/auth/createuser" no login required

router.post('/createuser',[
    body('email','Enter a valid email').isEmail(),
    body('name','Enter a valid name').isLength({ min:3}),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
],async (req,res)=>{
    let success=false;

    // if there are erors,return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check weather the user with this email exist already
    try {
        
     
    let user=await User.findOne({email:req.body.email})
    if (user){
        return res.status(400).json({error:'Sorry a user with this email already exist'})
    }
    const salt=await bcrypt.genSalt(10);
    secPass= await bcrypt.hash( req.body.password,salt)
    user=await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })
      const data={
        user:{
            id:user.id
        }
      }
      success=true;

      const authtoken=jwt.sign(data,JWT_SECRET)
    //   console.log(authtoken);
      res.json({success,authtoken})
    } catch(error){
        res.status(500).send('internal server error')

        console.log(error.message)
    }

})


// ROUTE 2: authenticate a user using post "api/auth/login". no login required
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','password cannot be blank').exists(),
],async(req,res)=>{
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })};
    
        const {email,password}=req.body;
        try {
            let user=await User.findOne({email})
            if(!user){
                return res.status(400).json({error:"please try to login with correct credentials"})
            }
            const passwordCompare=await bcrypt.compare(password,user.password)
            if(!passwordCompare){
                
                return res.status(400).json({success,error:"please try to login with correct credentials"})

            }
            
            const data={
            user:{
                id:user.id
            }
            }
             const authtoken=jwt.sign(data,JWT_SECRET)
             success=true;
            res.json({success,authtoken})
            
        } catch (error) {
            
            res.status(500).send('internal server error')
            console.log(error.message)

            
        }

})

// ROUTE3: get logged in user details using post "/api/auth/getuser".Login required
router.post('/getuser',fetchuser,async(req,res)=>{

try {
    userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user)
    
} catch (error) {
    
    res.status(500).send('internal server error')
    console.log(error.message)
}
})
module.exports=router