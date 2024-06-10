import { envs } from "../src/config/envs"
import { AppRouter } from "../src/presentation/routes"
import { Server } from "../src/presentation/server"

jest.mock("../src/presentation/server")

describe('Primer test', () => {

    test("should work" , async () => {

        await import('../src/app')

        expect(Server).toHaveBeenCalledTimes(1)
        
        expect(Server.prototype.start).toHaveBeenCalledWith({
            PORT: envs.PORT,
            routes: AppRouter.routes
        })

    })


})