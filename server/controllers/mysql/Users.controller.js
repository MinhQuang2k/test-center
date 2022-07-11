import Users from "../../models/mysql/Users.model.js";
import bcrypt from 'bcrypt'
import nodeMailer from 'nodemailer'
import jwt from "jsonwebtoken";
import { Op } from 'sequelize'

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email', 'admin']
        })
        res.json(users)
    } catch (error) {
        console.log(error)
    }
}

export const searchUser = async (req, res) => {
    try {
        const value = req.params.value
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email'],
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: `%${value}%`
                        }
                    },
                    {
                        email: {
                            [Op.like]: `%${value}%`
                        }
                    }],
            }
        })
        res.json(users)

    } catch (error) {
        console.log(error)
    }
}

export const Register = async (req, res) => {
    const { name, email, password, confPassword } = req.body
    if (password !== confPassword) return res.status(400).json({ msg: "The Password confirmation confirmation does not match" })
    const user = await Users.findAll({
        where: {
            email: req.body.email
        }
    })
    if (user.length > 0) return res.status(400).json({ msg: "Email has been already existed" })
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        })
        res.json({ msg: "Register success" })
    } catch (error) {
        res.status(400).json({ msg: "Register failed" })
    }
}

export const Login = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                email: req.body.email
            }
        })

        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) return res.status(400).json({ msg: "Email or Password is incorrect" })
        const userId = user.id
        const name = user.name
        const email = user.email
        const admin = user.admin
        const accessToken = jwt.sign({ userId, name, email, admin }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        })
        await Users.update({ accessToken: accessToken }, {
            where: {
                id: userId
            }
        })
        res.cookie('accessToken', accessToken, {
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).json({ userId, name, email, admin, accessToken })
    } catch (error) {
        res.status(400).json({ msg: "Email or Password is incorrect" })
    }
}




export const Logout = async (req, res) => {
    const accessToken = req.cookies.accessToken
    if (!accessToken) return res.sendStatus(204)
    const user = await Users.findAll({
        where: {
            accessToken: accessToken
        }
    })
    if (!user[0]) return res.sendStatus(204)
    const userId = user[0].id
    await Users.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    })
    res.clearCookie('accessToken')
    return res.sendStatus(200)
}

export const EditUser = async (req, res) => {
    const { id, name, email, password } = req.body
    try {
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)
        await Users.update({
            name: name,
            email: email,
            password: hashPassword
        }, {
            where: {
                id: id
            }
        })
            .then(function (data) {
                if (data.length != 0) {
                    const res = {
                        success: true,
                        data: data,
                        message: "update success"
                    }
                    return res

                } else {
                    res.status(500).send({
                        success: false,
                        data: data,
                        message: "update false"
                    })
                }
            })
        return res.sendStatus(200)
    }
    catch (error) {
        console.log(error)
    }
}

export const DeleteUser = async (req, res) => {
    try {
        const response = await Users.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({ msg: "Delete success" })
    }
    catch (error) {
        console.log(error)
    }
}

export const SendMail = async (req, res) => {
    const { email } = req.body
    const transport = nodeMailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    })

    const mailToken = jwt.sign({ email }, process.env.MAIL_SECRET, {
        expiresIn: '30m'
    })

    const user = await Users.findAll({
        where: {
            email: email
        }
    })
    if (!user.length) return res.status(400).json({ msg: "Email is not registered" })

    await transport.sendMail({
        from: process.env.MAIL_FROM_ADDRESS,
        to: `${email}`,
        subject: '[Netko] Please reset your password',
        html: `<h3>NetkoQuiz password reset</h3>
        <p>We heard that you lost your GitHub password. Sorry about that!</p>
        <p>But don’t worry! You can use the following button to reset your password:</p>
        <a href="${process.env.REACT_APP_API_URL_PRODUCT}/reset-password?email=${email}&mailToken=${mailToken}">Reset your password</a>
        <p>If you don’t use this link within 30minutes, it will expire. To get a new password reset link, visit: 
        <a href="${process.env.REACT_APP_API_URL_PRODUCT}/forget-password">${process.env.REACT_APP_API_URL_PRODUCT}/forget-password</a>
        </p>
        <p>Thanks,<p>
        <p>Netko</p>`
    },
        (err) => {
            if (err) {
                return res.status(500).json('Error')
            }
            return res.status(200).json('suscess')
        }
    )

}

export const ResetPassword = async (req, res) => {
    const { password, email } = req.body
    const user = await Users.findAll({
        where: {
            email: email
        }
    })
    if (!user.length) return res.status(400).json({ msg: "Email is not registered" })
    try {
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)
        await Users.update({
            password: hashPassword
        }, {
            where: {
                email: email
            }
        })
        return res.sendStatus(200)
    }
    catch (error) {
        res.sendStatus(500)
    }
}

export const verifyEmail = async (req, res) => {
    const { mailToken } = req.body
    try {
        jwt.verify(mailToken, process.env.MAIL_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403)
            res.status(200).json('is User')
        })
    } catch (error) {
        res.sendStatus(500)
    }
}