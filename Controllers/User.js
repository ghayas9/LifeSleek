const User = require('../Models/User');
const Goal = require('../Models/Goal')
const Cat = require('../Models/Catagory')
const { CreatToken, pHash, verifyToken } = require('./auth');
const { sendEmail } = require('./sendEmail');
const { ValidateEmail, ValidatePhone } = require('./Script/Validation');



const RemovePassword = (data) => {
    data = data.toObject()
    delete data.password
    return data
}


const LogIn = async (req, res) => {
    //***********Requaird Field*************//
    if (req.body.email == '' || req.body.email == undefined) {
        console.log(req.body, "Email not Found")
        res.send({ success: false, message: 'email is required' })
    }
    else if (req.body.password == '' || req.body.password == undefined) {
        console.log(req.body)
        res.send({ success: false, message: 'password is required' })
    }
    //***********Requaird Field*************//
    else {
        try {
            const user = await User.findOne({ email: req.body.email });
            //if User Is not verify
            // if(user.verify){
            //     res.send({ success: false, message: 'User is Not Verify ' })
            // }
            //if User Is not verify

            //Password Is In Hash form in database
            if (user.password === pHash(req.body.password)) {
                try {
                    const data = RemovePassword(user)
                    const token = await CreatToken(data)
                    res.send({ success: true, message: 'User Successfully LogIned', token: token })
                } catch (err) {
                    res.send({ success: false, message: 'server issue', error: 'Error Code : User-C-L-21' })
                }
            } else {
                res.send({ success: false, message: 'incorrect password' })
            }
        } catch (err) {
            res.send({ success: false, message: 'User not Found' })
        }
    }

}


const Register = async (req, res) => {
    //***********Requaird Field*************//
    if (req.body.name == '' || req.body.name == undefined) {
        res.send({ success: false, message: 'name is required' })
    }
    else if (req.body.email == '' || req.body.email == undefined) {
        res.send({ success: false, message: 'email or number is required' })
    }
    else if (req.body.password == '' || req.body.password == undefined) {
        res.send({ success: false, message: 'password is required' })
    }
    //***********Requaird Field*************//
    else {
        const newUser = new User()
        newUser.name = req.body.name
        newUser.email = req.body.email
        newUser.password = pHash(req.body.password)
        try {
            const email = req.body.email
            const user = await User.findOne({ email })
            res.send({ success: false, message: 'This Email or Number Is Already Registered' })
        } catch {
            try {
                const user = await newUser.save();
                res.send({ success: true, message: 'Registered successfully', email: user.email })
            } catch (err) {
                console.log(err)
                res.send({ success: false, message: 'Server Issue', error: 'Error Code: U-C-R-56', err })
            }
        }
    }

}



const EmailVerficationCode = async (req, res) => {
    if (req.body.email == '' || req.body.email == undefined) {
        res.send({ success: false, message: 'email or number is required' })
    }
    try {
        
        const otp = Math.floor((Math.random() * 100) + 999)
        const token = await CreatToken({
            email: req.body.email,
            otp
        })
        console.log(otp)
        if (ValidateEmail(req.body.email)) {

            try {
                // send OPT TO Email
                res.send({ success: true, message: 'please check your Email', token })
            } catch (err) {
                // console.log(err)
                res.send({ success: false, message: 'please check your Email', err })
            }
        } else {
            if(ValidatePhone(req.body.email)){
                // send OTP TO Number
                res.send({ success: true, message: 'please check your Inbox', token })
            }else
            res.send({ success: true, message: 'please Enter correct phoneNumber or Email'})
        }

    } catch (err) {
        console.log(err)
        res.send({ success: false, message: 'Server Issue', error: 'Error Code: U-C-EV-69' })
    }

}

const verifyCode = async (req, res) => {
    if (req.body.token == '' || req.body.token == undefined) {
        res.send({ success: false, message: 'token is required' })
    }
    if (req.body.code == '' || req.body.code == undefined) {
        res.send({ success: false, message: 'verification code is required' })
    }
    try {
        const tokenData = await verifyToken(req.body.token)
        try {
            //Check user is found or Not
            if (tokenData.otp == req.body.code) {
                await User.updateOne({ email: tokenData.email }, {
                    $set: {
                        verify: true
                    }
                })
                const user = await User.findOne({ email: tokenData.email })
                const token = await CreatToken(user.toObject())
                res.send({ success: true, message: 'Verification successfully completed', token })
            } else {
                res.send({ success: false, message: 'Wrong OTP' })
            }

        } catch (err) {
            console.log(err)
            //if user not Found
            res.send({ success: false, message: 'user not Found' })
        }
    } catch (err) {
        res.send({ success: false, message: 'verification code is Expaired' })
    }

}


const getGoals = async (req, res) => {
    const _id = req.payload._id
    try {
        const goal = await Goal.find({ 'user': _id })
        res.send({ success: true, message: 'wjh', goal })
    } catch (err) {
        res.send({ success: false, message: 'wjhqdkjqwh' })
    }

}

//ADD GOALS ///

const LogInWithGoogle = async (req, res) => {

}

module.exports = {
    LogIn,
    Register,
    EmailVerficationCode,
    verifyCode,
    getGoals,
}