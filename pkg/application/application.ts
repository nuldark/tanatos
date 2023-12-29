import { RequestHandler, Request, Response } from '../common'
import { IApplication } from './application.interface'

export class Application implements IApplication {
    private stack: RequestHandler[] = []

    public use(handler: RequestHandler): this {
        this.stack.push(handler)
        return this
    }

    public async start(): Promise<(req: Request, res: Response) => void> {
        return new Promise((resolve) => {
            const finalRequestHandler = (req: Request, res: Response) => {
                let idx = 0

                const next = () => {
                    if (idx < this.stack.length) {
                        const middleware = this.stack[idx++]
                        middleware(req, res, next)
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/plain' })
                        res.end('Test\n')
                    }
                }

                next()
            }

            resolve(finalRequestHandler)
        })
    }
}
