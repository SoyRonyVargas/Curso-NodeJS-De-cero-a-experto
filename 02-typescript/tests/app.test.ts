
describe("App", () => {

    test('Primer test' , () => {

        // 1. ARRANGE
        const num1 = 10
        const num2 = 20
        
        // 2. ACT

        const result = num1 + num2
        
        // 3. ASSERT

        expect(result).toBe(30)

    })

})