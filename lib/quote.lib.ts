import { ObjectId } from "mongodb";
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

export const setFavourite = async (id: string, email: string) => {
  const request = await collection('joy_quote', 'quotes')
  const _id = new ObjectId(id)
  try {
    const query = {_id}
    const item = await request.findOne(query)

    if(item?.favourites) {
      if(item.favourites.includes(email)) {
        // remove fav item
        const update = item.favourites.filter((e: string) => e !== email)
        await request.updateOne(query, {$set: {
          favourites: update
        }})  
      } else {
        // add fav item 
        const update = [...item.favourites, email] 
        await request.updateOne(query, {$set: {
          favourites: update
        }})  
      }
    } else {
      // create fav list and update
      await request.updateOne(query, {$set: {
        favourites: [email]
      }})
    }

    return {
      message: 'success'
    }
  } catch (error) {
    throw new Error("An error occur at set favourite")
  }
}

export const deleteQuote = async (id: string) => {
  const request = await collection('joy_quote', 'quotes')
  const _id = new ObjectId(id)
  try {
    await request.findOneAndDelete({_id})
    return {
      message: 'success'
    } 
  } catch (error) {
    throw new Error("An error occur at delete quote")
  }
}