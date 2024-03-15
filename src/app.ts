import express, { Express } from 'express'
import { setUpServer } from './setupServer'

const app: Express = express()

setUpServer(app)
