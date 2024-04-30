import { ObjectId } from "mongodb";
import { collection } from "./connect-db.lib";

export const getQuotes = async (limit: number = 10, page: number = 0, search: string = '') => {
  const query = {
    quote: {
      $regex: search
    }
  }
  
  const req = await collection('joy_quote', 'quotes')
  try {
    const count = await req.collection.find(query).toArray()
    if(page * limit >= count.length) {
      throw new Error('Invalid page number')
    }

    const data = await req.collection.find(query).skip(page * limit).limit(limit).toArray()
    req.client.close()
    return { count: count.length, page: page + 1, pages: Math.ceil(count.length / limit), data }
  } catch (err) {
    console.log(err)
    throw new Error('Error occur at reading quotes')
  }  
}

export const postQuotes = async (data: any[]) => {
  const req = await collection('joy_quote', 'quotes')
  try {
    await req.collection.insertMany(data)
    req.client.close()
    return {
      message: 'success'
    }
  } catch (err) {
    console.log(err)
    throw new Error('Error occur at writing quotes')
  } finally {
    await req.client.close()
  }
}

export const setFavourite = async (id: string, email: string) => {
  const request = await collection('joy_quote', 'quotes')
  const _id = new ObjectId(id)
  try {
    const query = {_id}
    const item = await request.collection.findOne(query)

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
      await request.collection.updateOne(query, {$set: {
        favourites: [email]
      }})
    }
    request.client.close()
    return {
      message: 'success'
    }
  } catch (error) {
    throw new Error("An error occur at set favourite")
  } finally {
    await request.client.close()
  }
}

export const deleteQuote = async (id: string) => {
  const request = await collection('joy_quote', 'quotes')
  const _id = new ObjectId(id)
  try {
    await request.collection.findOneAndDelete({_id})
    request.client.close()
    return {
      message: 'success'
    } 
  } catch (error) {
    request.client.close()
    throw new Error("An error occur at delete quote")
  }
}

export const randomQuote = async () => {
  const request = await collection('joy_quote', 'quotes')
  try {
    const [randomItem] = await request.collection.aggregate([{ $sample: { size: 1 } }]).toArray();
    
    return randomItem
  } catch (error) {
    throw new Error("An error occur at delete quote")
  } finally {
    await request.client.close()
  }
}