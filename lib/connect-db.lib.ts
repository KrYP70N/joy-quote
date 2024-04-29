import { MongoClient } from "mongodb";

export const collection = async (db_name: string, collection_name: string) => {
  try {
    const connectionStr = 'mongodb+srv://joy-user:12345@redoc.xh2ff5u.mongodb.net/?retryWrites=true&w=majority&appName=REDOC'
    const client = new MongoClient(connectionStr);
    await client.connect()
    const db = client.db(db_name)
    const collection = db.collection(collection_name)
    return collection
  } catch (err) {
    console.log(err)
    throw new Error('error occur at connecting to DB')
  }

}
