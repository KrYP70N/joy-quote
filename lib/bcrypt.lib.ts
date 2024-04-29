import bcrypt from 'bcrypt'

export const hash = async (psw: string) => {
  try {
    const hash = await bcrypt.hash(psw, 10)
    return hash
  } catch (err) {
    throw new Error('Error occur at hashing password')
  }
}

export const compareHash = async (plaintextPassword: string, storedHashedPassword: string) => {
  try {
    const compare = await bcrypt.compare(plaintextPassword, storedHashedPassword)
    return compare
  } catch (error) {
    throw new Error('Error occur at compare password')
  }
  
}