const User = require('../Models/User');
const { CreatToken, pHash, verifyToken } = require('./auth');



const RemovePassword= (data)=>{
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
    console.log(req.body)
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
        const otp = Math.floor((Math.random() * 4000) + 9999)
        const token = await CreatToken({
            email: req.body.email,
            otp
        })

        //NOT COMPLETE
        if ('email' == 'email') {
            //send Email (code)
            res.send({ success: true, message: 'please check your Email', token })
        }
        else if ('number' == 'number') {
            //send Message (code)
            res.send({ success: true, message: 'please check your Inbox', token })
        }
        //NOT COMPLETE
    } catch (err) {
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
            if (tokenData.otp == req.body.otp) {
                await User.updateOne({ email: tokenData.email }, {
                    $set: {
                        verify: true
                    }
                })
                const user = await User.findOne({ email: tokenData.email })
                const token = await CreatToken(user)
                res.send({ success: true, message: 'Verification successfully completed', token })
            } else {
                res.send({ success: false, message: 'Wrong OTP' })
            }

        } catch (err) {
            //if user not Found
            res.send({ success: false, message: 'user not Found' })
        }
    } catch (err) {
        res.send({ success: false, message: 'verification code is Expaired' })
    }

}


const LogInWithGoogle =async(req,res)=>{

}

module.exports = {
    LogIn,
    Register,
    EmailVerficationCode
}