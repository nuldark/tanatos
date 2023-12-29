import * as http from 'node:http';
import { Application } from './application';


describe('application', () => {
    let app: Application;
    let server: http.Server;

    beforeEach(() => {
        app = new Application();
    });

    afterEach(() => {
        server.close();
    });

    it('should execute middleware and server returns statusCode 201', done => {
        app.use((req, res, next) => {
            res.statusCode = 201;
            next();
        });

        app.start().then(callback => {
            server = http.createServer(callback);
            server.listen(3000, () => {
                http.get('http://localhost:3000').on('response', res => {
                    expect(res.statusCode).toBe(201);
                });
            });
        });

        done();
    });
});