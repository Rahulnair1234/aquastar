const express = require("express");
const User = require("../tables_schema/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const JWT_AUTH = "Rahulisagoodboy";

// Route 1: Register
router.post(
  "/registerUser",
  [
    //VALIDATE WITHOUT VISTING THE SERVER
    body("name", "Enter a valid name").isLength({ min: 3 }),
    // password must be at least 5 chars long
    body("password", "Password must be atleast 8 characters").isLength({
      min: 8,
    }),
    body("email", "Enter a valid email").isEmail(),
    body("mobile","Enter a valid Number").isLength({min:10})

  ],
  async (req, res) => {
    let success = false;
    let uid_prefix="C";
    let uid="";
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({success, errors: errors.array()});
    }
    try {
      
        uid=Math.floor(Math.random() * 1000);
        uid=uid_prefix+uid;
      let id_bool=await User.findOne({uid:uid});
      console.log(uid)
      while(id_bool){
        uid=Math.floor(Math.random() * 1000);
        uid=uid_prefix+uid;
        console.log(uid)
        id_bool=await User.findOne({uid:uid});
        
      };
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return (
          res.status(400)
          .json({
            success,
            error: "sorry a user with this email already exists",
          })
         );
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        uid:uid,
        name: req.body.name,
        email: req.body.email,
        mobile:req.body.mobile,
        //privileges:true,
        password: secPass,
      });
      const data = {
        user: {
          id: user.uid,
          privileges:user.privileges
        },
      };
      const authtoken = jwt.sign(data, JWT_AUTH);
      // res.json(user);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
  }
);

//  Route 2:   ****login*****
router.post(
  "/login",
  [
    body("password", "Password must not be empty").exists(),
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      console.log(user.uid)
      if (!user) {
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct credentials",
          });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct credentials",
          });
      }
      const data = {
        user: {
          id: user.uid,
          privileges:user.privileges
        },
      };
      const authtoken = jwt.sign(data, JWT_AUTH);
      success = true;
      res.json({ success, authtoken ,role:user.privileges});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
// Route 3:Get login user detail :Post:  Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try{
    console.log(req.user.privileges)
    const userId = req.user.id;
    const user = await User.findOne({uid:userId}).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
