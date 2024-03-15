import express, { Express } from 'express'
import { setUpServer } from '@root/setupServer'

const app: Express = express()

setUpServer(app)
