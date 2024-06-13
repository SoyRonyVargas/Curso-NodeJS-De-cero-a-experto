import { AppRouter } from '../../../src/presentation/routes'
import { testServer } from './test-server'
import request from 'supertest'

describe('Todo route testing' , () => {

    beforeAll(async() => {

        await testServer.start({
            PORT: 4000,
            routes: AppRouter.routes
        })

    })

    test('Should return TODOS' , async () => {

        const { body } = await request( testServer.app )
            .get('/todos')
            .expect(200)

        expect(body.data).toBeInstanceOf(Array)
        expect(body.data.length).toBeGreaterThan(0)

    })
    
    test('Should return TODO by id' , async () => {

        const { body } = await request( testServer.app )
            .get('/todos/1')
            .expect(200)

        // console.error(body);

        expect(body.data).toBeInstanceOf(Object)
        
        expect(body.data).toEqual({
            id: 1,
            text: expect.any(String),
            completedAt: null
        })

    })

})