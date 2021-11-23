const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'shirazisagood$boy';



// Route-1 create a user using :  POST "/api/auth/createuser".  does't require Auth , no login required
router.post('/createuser', [
  body('email', 'enter a valid email').isEmail(),
  body('name', 'name must be atleast 3 character').isLength({ min: 3 }),
  body('password', 'password must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {

  // if there are errors, return bad request and error 

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // check wether the user with this email exist already

  try {

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "a user with this email already exist" })
    }

    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt);

    // create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    const data = {
      user: {
        id: user.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);


    res.json({ authtoken })

  } catch (error) {
    console.log(error.message);
    res.status(500).send("some error occured");
  }
})

// Route-2 Authenticate the user :  POST "/api/auth/login".  does't require Auth , no login required
router.post('/login', [
  body('email', 'enter a valid email').isEmail(),
  body('password', 'password can not be blank').exists(),
], async (req, res) => {

  // if there are errors, return bad request and error 

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "please try login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "please try login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken })

  } catch (error) {

    console.error(error.message);
    res.status(500).send("interval server error ha bhai");

  }
});

//Route-3 Get loggedin user details using : POST  "/api/auth/getuser"  Login Required

router.post('/getuser',fetchuser, async (req, res) => {

try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
  
} catch (error) {
  console.error(error.message);
  res.status(500).send("interval server error ha bhai route 3");
}
})
module.exports = router