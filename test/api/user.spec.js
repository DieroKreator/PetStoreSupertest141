const supertest = require('supertest')

const userName = "dico"

describe('API PetStore Swagger - Entidade User', () => {

    const request = supertest("https://petstore.swagger.io/v2")

    it('POST Pet', async () => {
        const user = await require('../../vendors/json/user.json')

        // Funcoes de Teste em Si
        return await request
            .post('/user')
            .send(user)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.code).toBe(200)
                expect(res.body.type).toBe('unknown')
                expect(res.body.message).toBe('82740501')
            })

    })

    it('GET Pet', async () => {

        return await request
            .get(`/user/${userName}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.id).toBe(82740501)
                expect(res.body.username).toBe('dico')
                expect(res.body.firstName).toBe('Din')
                expect(res.body.lastName).toBe('Collen')
                expect(res.body.email).toBe('dico@yupmail.com')
                expect(res.body.password).toBe('123456')
                expect(res.body.phone).toBe('5148546135')
                expect(res.body.userStatus).toBe(1)
            })
        
    })

    it('PUT Pet', async () => {
        const user = await require('../../vendors/json/userput.json')

        // Funcoes de Teste em Si
        return await request
            .put(`/user/${userName}`)
            .send(user)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.code).toBe(200)
                expect(res.body.type).toBe('unknown')
                expect(res.body.message).toBe('82740501')
            })

    })

    it('DELETE Pet', async () => {

        return await request
            .delete(`/user/${userName}`)
            .then((res) => {
                expect(res.statusCode).toEqual(200)
                expect(res.body.code).toEqual(200)
                expect(res.body.type).toBe('unknown')
                expect(res.body.message).toBe(userName)
            })
        
    })

})