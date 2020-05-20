import axios from 'axios'

const http = axios.create({ baseURL: process.env.API_PATH })

export class Repository {
  protected http = http
}
