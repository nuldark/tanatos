import * as http from 'node:http'

export type NextFunction = () => void

export type Request = http.IncomingMessage

export type Response = http.ServerResponse

export type RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => void
