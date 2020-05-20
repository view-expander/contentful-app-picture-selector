import axios from 'axios'

const http = axios.create({
  baseURL: process.env.API_PATH,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

export class Repository {
  protected http = http
}
