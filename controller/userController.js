const User = require('../modal/userModal')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { default: mongoose } = require('mongoose')
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}
const signupUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const exist = await User.findOne({ "email": email })
        if (exist) {
            throw Error('Email already in use')
        } else {
            salt = await bcrypt.genSalt(10)
            hash = await bcrypt.hash(password, salt)
            newUser = await User.create({ email, password: hash })
            const token = createToken(newUser._id)
            res.status(200).json({ email, token })
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }

}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const exist = await User.findOne({ "email": email })
        if(exist){
            const match=await bcrypt.compare(password,exist.password)
            if(match){
            const token = createToken(exist._id)
            res.status(200).json({email, token})
            }else throw Error('wrong password or email address')
        }else{
            throw Error('wrong email address')
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }

}
module.exports = {
    signupUser,loginUser
}