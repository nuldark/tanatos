import { RequestHandler, Request, Response } from '../common'

export interface IApplication {
    use(handler: RequestHandler): this

    start(): Promise<(req: Request, res: Response) => void> 
}
