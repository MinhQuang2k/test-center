import Users from "../../models/mysql/Users.model.js";
import jwt from 'jsonwebtoken'

export const accessToken = async (req, res) => {
    try {
        const accessToken = req.cookies.accessToken
        if (!accessToken) return res.status(401).json("You're not authenticated")
        const user = await Users.findOne({
            where: {
                accessToken: accessToken,
            }
        })
        if (!user) return res.sendStatus(403)
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403)
            const userId = user.id
            const name = user.name
            const email = user.email
            const admin = user.admin
            const accessToken = jwt.sign({ userId, name, email, admin }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d'
            })
            res.status(200).json('is User')
        })
    } catch (error) {
        console.log(error)
    }
}

export const accessTokenAdmin = async (req, res) => {
    try {
        const accessToken = req.cookies.accessToken
        if (!accessToken) return res.sendStatus(401)
        const user = await Users.findOne({
            where: {
                accessToken: accessToken,
                admin: '1'
            }
        })
        if (!user) return res.sendStatus(403)
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403)
            const userId = user.id
            const name = user.name
            const email = user.email
            const admin = user.admin
            const accessToken = jwt.sign({ userId, name, email, admin }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d'
            })
            res.status(200).json('is Admin')
        })
    } catch (error) {
        console.log(error)
    }
}