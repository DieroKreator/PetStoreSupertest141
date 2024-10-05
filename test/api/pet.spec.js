// Bibliotecas e Framework
const supertest = require('supertest')

const petId = 602740501

// Em JavaScript, Classe é opcional
describe('API PetStore Swagger - Entidade Pet', () => {

    const request = supertest("https://petstore.swagger.io/v2")

    // Funções ou Métodos
    it('POST Pet', async () => {
        // Atributos, Campos, Caracteristicas, Configuracoes
        const pet = await require('../../vendors/json/pet.json')

        // Funcoes de Teste em Si
        return await request
            .post('/pet')
            .send(pet)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.id).toBe(petId)
                expect(res.body.name).toBe('Snoopy')
                expect(res.body.category.name).toBe('dog')
                expect(res.body.tags[0].name).toBe('vaccinated')
            })

    })

    it('GET Pet', async () => {

        return await request
            // .get('/pet/' + petId') // tradicional
            .get(`/pet/${petId}`) // moderno: template literals
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.id).toBe(petId)
                expect(res.body.status).toBe('available')
            })
        
    })

    it('PUT Pet', async () => {
        // Atributos, Campos, Caracteristicas, Configuracoes
        const pet = await require('../../vendors/json/petput.json')

        // Funcoes de Teste em Si
        return await request
            .put('/pet')
            .send(pet)
            .then((res) => {
                expect(res.statusCode).toEqual(200)
                expect(res.body.status).toEqual('sold')
            })

    })

    it('DELETE Pet', async () => {

        return await request
            .delete(`/pet/${petId}`) // moderno: template literals
            .then((res) => {
                expect(res.body.code).toEqual(200)
                expect(res.body.message).toEqual(petId.toString())
            })
        
    })

})