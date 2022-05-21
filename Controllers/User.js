const User = require('../Models/User');
const Goal = require('../Models/Goal')
const Cat = require('../Models/Catagory')
const { CreatToken, pHash, newCreatToken, newverifyToken } = require('./auth');
const { ValidateEmail, ValidatePhone } = require('./Script/Validation');
const { Rand4 } = require('./Script/Random');
const { emailVerification, forgotpassword, passwordVerified } = require('../Config/JwtConfig');



const RemovePassword = (data) => {
    data = data.toObject()
    delete data.password
    return data
}

//////////////////////////////////////////Login
//////// {email,password}
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



////////////////////////////////////////////Registeration
//////// {name,email,password}=>email
const SignUp = async (req, res) => {
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
            if (user) {
                res.send({ success: false, message: 'This Email or Number Is Already Registered' })
            } else {
                try {
                    const user = await newUser.save();
                    res.send({ success: true, message: 'Registered successfully', email: user.email })
                } catch (err) {
                    console.log(err)
                    res.send({ success: false, message: 'Server Issue', error: 'Error Code: U-C-R-56', err })
                }
            }

        } catch {
            res.send({ success: false, message: 'Server Issue', error: 'Error Code: U-C-R-56', err })
        }
    }

}


/////////////////////////////////////////Verification
//////// {email}=>( verify => token)
const ConfirmEmail = async (req, res) => {
    console.log(req.body)
    if (req.body.email == '' || req.body.email == undefined) {
        res.send({ success: false, message: 'email or number is required' })
    }
    try {
        const OTP = Rand4()
        const token = await newCreatToken({ email: req.body.email, OTP }, emailVerification)
        console.log(OTP)
        if (ValidateEmail(req.body.email)) {

            try {
                // send OPT TO Email
                res.send({ success: true, message: 'please check your Email', token })
            } catch (err) {
                // console.log(err)
                res.send({ success: false, message: 'please check your Email', err })
            }
        } else {
            if (ValidatePhone(req.body.email)) {
                // send OTP TO Number
                res.send({ success: true, message: 'please check your Inbox', token })
            } else
                res.send({ success: true, message: 'please Enter correct phoneNumber or Email' })
        }

    } catch (err) {
        console.log(err)
        res.send({ success: false, message: 'Server Issue', error: 'Error Code: U-C-EV-69' })
    }

}


/////////////////////////////////////////Verification
//////// verify {token,code}=>( LogIn => token)
const VerifyEmail = async (req, res) => {
    if (req.body.token == '' || req.body.token == undefined) {
        console.log(req.body.token)
        res.send({ success: false, message: 'token is required' })
    }
    if (req.body.code == '' || req.body.code == undefined) {
        res.send({ success: false, message: 'verification code is required' })
    }
    try {
        // const user = await User.findOne({})
        const tokenData = await newverifyToken(req.body.token, emailVerification)
        console.log(tokenData)
        try {
            //Check user is found or Not
            if (tokenData.OTP == req.body.code) {
                await User.updateOne({ email: tokenData.email }, {
                    $set: {
                        verify: true
                    }
                })
                const user = await User.findOne({ email: tokenData.email })
                const token = await CreatToken(RemovePassword(user))
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



//ADD GOALS ///

const LogInWithGoogle = async (req, res) => {

}


/////////////////////////////////////////Forgot Password
//////// {email}=>( verify => token)
/////// send OTP TO EMAIL
const EnterEmailForgot = async (req, res) => {
    if (req.body.email == '' || req.body.email == undefined) {
        res.send({ success: false, message: 'email or number is required' })
    }else{
    try {
        const user = await User.findOne({ email: req.body.email })
        console.log(user)
        if (user) {
            const OTP = Rand4()
            console.log(OTP)
            const token = await newCreatToken({ email: req.body.email, OTP }, forgotpassword)
            if (ValidateEmail(req.body.email)) {
                try {
                    // send OPT TO Email
                    res.send({ success: true, message: 'please check your Email', token })
                } catch (err) {
                    // console.log(err)
                    res.send({ success: false, message: 'please check your Email', err })
                }
            } else {
                if (ValidatePhone(req.body.email)) {
                    // send OTP TO Number
                    res.send({ success: true, message: 'please check your Inbox', token })
                } else
                    res.send({ success: true, message: 'please Enter correct phoneNumber or Email' })
            }
        } else {
            res.send({ success: false, message: 'User Not Found!' })
        }
    } catch (err) {
        res.send({ success: false, message: 'User Not Found!' })
    }}
}


/////////////////////////////////////////Forgot Password Verification
//////// Forgot Password {token ,code//email }=>( verified => token)
const VerifyEmailForgot = async (req, res) => {
    if (req.body.token == '' || req.body.token == undefined) {
        res.send({ success: false, message: 'token is required' })
    }
    else if (req.body.code == '' || req.body.code == undefined) {
        res.send({ success: false, message: 'Code is required' })
    }
    else {
        try {
            const tokenData = await newverifyToken(req.body.token, forgotpassword)
            try {
                //Check user is found or Not
                if (tokenData.OTP == req.body.code) {
                    const user = await User.findOne({ email: tokenData.email })
                    const token = await newCreatToken(RemovePassword(user), passwordVerified)
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

}

/////////////////////////////////////////////Change Password
//////// Fcode Verification  {token ,password,cpassword }
const newPassword = async (req, res) => {
    if (req.body.token == '' || req.body.token == undefined) {
        res.send({ success: false, message: 'token is required' })
    }
    else if (req.body.password == '' || req.body.password == undefined) {
        res.send({ success: false, message: 'Password is required' })
    }
    else if (req.body.cpassword == '' || req.body.cpassword == undefined) {
        res.send({ success: false, message: 'conform Password is required' })
    }
    else if (req.body.cpassword != req.body.password) {
        res.send({ success: false, message: 'Password miss match' })
    } else {
        try {
            const tokenData = await newverifyToken(req.body.token, passwordVerified)
            console.log(tokenData)
            try {
                //Check user is found or Not
                const up = await User.updateOne({ email: tokenData.email }, {
                    $set: {
                        password: pHash(req.body.password)
                    }
                })
                res.send({ success: true, message: 'Password successfully Changed' })
            } catch (err) {
                console.log(err)
                //if user not Found
                res.send({ success: false, message: 'user not Found' })
            }
        } catch (err) {
            res.send({ success: false, message: 'verification code is Expaired' })
        }
    }
}

module.exports = {
    LogIn,
    SignUp,
    ConfirmEmail,
    VerifyEmail,
    EnterEmailForgot,
    VerifyEmailForgot,
    newPassword
}