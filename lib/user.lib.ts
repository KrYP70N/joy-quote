import { compareHash, hash } from "./bcrypt.lib"
import { collection } from "./connect-db.lib"
import { generateToken, verifyToken } from "./jwt.lib"
import { mailTo } from "./mailer.lib"

export const checkUser = async (email: string) => {
  const req = await collection('joy_quote', 'users')
  try {
    const user = await req.collection.findOne({email})
    if(user) {
      return true
    } else {
      return false
    }
  } catch (err) {
    console.log(err)
    throw new Error("Error occur at search user")
  } finally {
    await req.client.close()
  }
}

export const registerUser = async (email: string, password: string) => {
    const psw = await hash(password)
    const req = await collection('joy_quote', 'users')
    try {
      const data = {
        email,
        psw,
        token: generateToken({email, psw}),
        verifyToken: generateToken({email, psw, type: 'verify'}, '5m'),
        verify: false
      }
      await req.collection.insertOne(data)
      await mailTo(email, 'Verify your account', `
        http://localhost:3000/api/user/verify?token=${data.verifyToken}
      `)

      return {
        message: 'success'
      }
    } catch (error) {
      console.log(error)
      throw new Error("Error occur at create user")
    } finally {
      await req.client.close()
    }
}

export const resendVerification = async (email: string, token: string) => {
  const req = await collection('joy_quote', 'users')
  const verifyToken = generateToken({type: 'verify', email}, '5m')
  const query = {email: email, token}
  const update = { $set: { verifyToken} }
  try {
    const data = await req.collection.updateOne(query, update)
    if(data.modifiedCount === 0) {
      throw new Error("Invalid input at resend verification")
    }
    await mailTo(email, 'Verify your account', `
        http://localhost:3000/api/user/verify?token=${verifyToken}
      `)
    return {
      message: 'success'
    }
  } catch (error) {
    throw new Error("Error occur at resend verification")
  } finally {
    await req.client.close()
  }
}

export const loginUser = async (email: string, password: string) => {
  const req = await collection('joy_quote', 'users')
  const query = {email: email}
  const invalid = {
    message: 'Invalid user name or password!',
    status: 202
  }
  try {
    const data = await req.collection.findOne(query)
    if(!data) {

      return invalid
    }

    const parseJWT: any = verifyToken(data.token)
    const matchPsw = await compareHash(password, parseJWT.psw)
    if(matchPsw) {
      return {
        token: data.token
      }
    } else {
      return invalid
    }
    
  } catch(error) {
    throw new Error("An error occur at login user")
  } finally {
    await req.client.close()
  }
}

export const verifyUser = async (verifyToken: string) => {
  const req = await collection('joy_quote', 'users')
  const query = {verifyToken}
  const update = {$set: {verify: true}}
  try {
    const data = await req.collection.updateOne(query, update)
    if(data.modifiedCount === 0) {

      throw new Error("Invalid input at resend verification")
    }
    return {
      message: 'success'
    }
  } catch (error) {
    throw new Error("Error occur at resend verification")
  } finally {
    await req.client.close()
  }
}

export const validate = async (header: any) => {
  const token = header.get('access-token')
  const req = await collection('joy_quote', 'users')
  try {
    const find = await req.collection.findOne({token})
    const valid = verifyToken(token)
    if(find && valid) {
      return valid
    } else {
      return false
    }
  } catch (error) {
    throw new Error("Error occur at validate token")
  } finally {
    await req.client.close()
  }
}