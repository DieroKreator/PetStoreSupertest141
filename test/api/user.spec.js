const supertest = require('supertest')

const petId = 602740501

describe('API PetStore Swagger - Entidade User', () => {

    const request = supertest("https://petstore.swagger.io/v2")

    it('POST Pet', async () => {
        const pet = await require('../../vendors/json/user.json')

        // Funcoes de Teste em Si
        return await request
            .post('/user')
            .send(pet)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.code).toBe(200)
                expect(res.body.type).toBe('unknown')
                expect(res.body.message).toBe('82740501')
            })

    })

})