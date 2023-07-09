import  express, { Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'

import { generateToken} from '../utils/jwt.util'
import { User, UserModel } from '../model/user.model'


//Login
export const Login = asyncHandler(async (req: Request, res: Response) =>{
  const findUser = await UserModel.findOne({email: req.body.email})
  if (findUser && bcrypt.compareSync(req.body.password, findUser.password)) {
    await findUser.save()
    res.send({
      accessToken: generateToken(findUser)
    })
  }
  else{
    res.status(401).send({message: "incorrect Email or Password"})
  }
})

//Register
export const Register = asyncHandler(async (req: Request, res: Response) =>{
  const findUser = await UserModel.findOne({email: req.body.email})
  const findUserPhone = await UserModel.findOne({phone_number: req.body.phone_number})

  if(!findUser && !findUserPhone){
    const salt = await bcrypt.genSalt(12) 
    await UserModel.create({
      Username: req.body.first_name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt)
    } as User)
    res.status(201).send({message:"Successfully Registered"})
  }
  else{
    res.status(401).send({message:"This email address has been registered by another user"})
  }

})
