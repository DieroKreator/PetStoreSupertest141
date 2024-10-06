const supertest = require('supertest')

const userName = "dico"

describe('API PetStore Swagger - Entidade User', () => {

    const request = supertest("https://petstore.swagger.io/v2")
    const massaUsers = require('../../vendors/json/massaUser')

    it('POST Pet', async () => {
        const user = await require('../../vendors/json/user.json')

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

    it.each(massaUsers.array.map(elemento => [
        elemento.idUsuario,
        elemento.apelido,
        elemento.nome,
        elemento.telephone
    ]))
    ('POST Usuario Data Driven Simples: %s', (idUsuario, apelido, nome, telephone) => {
        
        const user = require('../../vendors/json/user.json')

        user.id = idUsuario
        user.username = apelido
        user.firstName = nome
        user.phone = telephone

        return request
            .post('/user')
            .send(user)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.code).toBe(200)
                expect(res.body.type).toBe('unknown')
                expect(res.body.message).toBe(idUsuario.toString())
            })

    })    

    massaUsers.array.forEach(({ apelido }) => {
        
        it(`DELETE User Data Driven ForEach - ${apelido}`, async () => {

            return await request
                .delete(`/user/${apelido}`)
                .then((res) => {
                    expect(res.statusCode).toEqual(200)
                    expect(res.body.code).toEqual(200)
                    expect(res.body.type).toBe('unknown')
                    expect(res.body.message).toBe(apelido)
                })
            
        })
    })

})