import { collection } from "./connect-db.lib";

export const getQuotes = async (limit: number = 10, page: number = 0) => {
  const req = await collection('joy_quote', 'quotes')
  try {
    const count = await req.countDocuments()

    if(page * limit >= count) {
      throw new Error('Invalid page number')
    }

    const data = await req.find({}).skip(page * limit).limit(limit).toArray()

    return { count, page: page + 1, pages: Math.ceil(count / limit), data }
  } catch (err) {
    console.log(err)
    throw new Error('Error occur at reading quotes')
  }  
}

export const postQuotes = async (data: any[]) => {
  const req = await collection('joy_quote', 'quotes')
  try {
    await req.insertMany(data)
    return {
      message: 'success'
    }
  } catch (err) {
    console.log(err)
    throw new Error('Error occur at writing quotes')
  }
}