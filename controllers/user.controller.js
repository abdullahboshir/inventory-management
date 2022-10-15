const { signupService, findUserByEmail } = require("../services/user.service");
const { generateToken } = require("../utils/token");
const { sendMailWithtGmail } = require("../utils/email");


exports.signup = async (req, res) => {
    try {
        const user = await signupService(req.body);

        const mailData = {
            to: [user.email],
            subject: 'Verify your Account',
            text: 'Thank You'
        };

        sendMailWithtGmail(mailData);

        res.status(200).json({
            status: 'success',
            message: 'Successfully signed up'
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error.message
        })
    }
};


/**
 * 1. Check if Email and passeord are given
 * 2. Load user with email
 * 3. if not user send res
 * 4. compare password
 * 5. if password not correct ans res
 * 6. check if usr is active
 * 7. if not active send res
 * 8. generate token
 * 9. send user and token
 */

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(401).json({
                status: 'fail',
                error: 'Please provide your credentials'
            });
        };

        const user = await findUserByEmail(email);

        if(!user){
            return res.status(401).json({
                status: 'fail',
                error: 'No user found. Please create an new account'
            })
        };

        const isPasswordValid = user.comparePassword(password, user.password);

        if(!isPasswordValid){
            return res.status(401).json({
                status: 'fail',
                error: 'Your password or email is incorrect'
            })
        };

        if(user.status != 'active'){
            return res.status(401).json({
                status: 'fail',
                error: 'Your account is not active yet.'
            })
        };

        const token = generateToken(user)

        res.status(200).json({
            status: 'success',
            message: 'Successfully login up',
            data: {
                user,
                token
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error.message
        })
    }
};


exports.getMe = async (req, res) => {
    try {
       const user = await findUserByEmail(req.user?.email);

       res.status(200).json({
        status: 'success',
        data: user
       })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error
        })
    }
}