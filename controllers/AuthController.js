const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthController{
    static login(req, res){
        res.render('auth/login')
    }

    static register (req, res){
        res.render('auth/register')
    }

    static async registerPost(req, res){ 
        const {name, email, password, confirmpassword } = req.body
    //password match validation 
    if(password != confirmpassword){
        req.flash('message','The passwords dont match, try again!')
        res.render('auth/register')

        return
    }
    // check if user exist 
    const checkIfUserExists = await User.findOne({ where: {email: email}})

    if(checkIfUserExists){
        req.flash('message','The email already exixts, try another one!')
       
        res.render('auth/register')

        return
    }

    //create a password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync( password, salt)

    const user = {
        name,
        email,
        password: hashedPassword
    }
    try {
        const createdUser = await User.create(user) 

        //initialization session 
        req.session.userid = createdUser.id

        req.flash('message', 'sucsses!')

        req.session.save(() => {
            res.redirect('/')
        })
     
    } catch (err) {
        console.log(err)
    }
  }

}