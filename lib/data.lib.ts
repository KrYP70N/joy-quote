import fs from 'fs'
import path from 'path'

export const readData = async (name: string) : Promise<JSON | Error> => {
  try {
    const data = await fs.readFileSync(`data/${name}.json`, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    console.log(err)
    throw new Error('Error occour at reading data.')
  }
}