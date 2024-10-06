// Bibliotecas e Framework
const supertest = require('supertest')

const petId = 602740501

// Em JavaScript, Classe é opcional
describe('API PetStore Swagger - Entidade Pet', () => {

    const request = supertest("https://petstore.swagger.io/v2")
    const massa1 = require('../../vendors/json/massaPet')

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

    // Método POST que lê e cria 3 registros
    it.each(massa1.array.map(elemento => [
        elemento.nomePet,
        elemento.idPet,
        elemento.nomeCategoria,
        elemento.idCategoria
    ]))
    ('POST Pet Data Driven Simples: %s', (nomePet, idPet, nomeCategoria, idCategoria) => {
        // Atributos, Campos, Caracteristicas, Configuracoes
        const pet = require('../../vendors/json/pet.json')

        // Sustituimos os campos que queremos personalizar através da massa
        pet.id = idPet
        pet.name = nomePet
        pet.category.id = idCategoria
        pet.category.name = nomeCategoria

        // Funcoes de Teste em Si
        return request
            .post('/pet')
            .send(pet)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.id).toBe(idPet)
                expect(res.body.name).toBe(nomePet)
                expect(res.body.category.name).toBe(nomeCategoria)
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
                expect(res.statusCode).toEqual(200)
                expect(res.body.code).toEqual(200)
                expect(res.body.message).toEqual(petId.toString())
            })
        
    })

    // Testes Data Driven do CRUD (POST, GET, PUT e Delete)
    massa1.array.forEach(({ nomePet, idPet, nomeCategoria, idCategoria}) => {
        it(`POST Pet Data Driven ForEach - ${nomePet}`, () => {
            const pet = require('../../vendors/json/pet.json')

            pet.id = idPet
            pet.name = nomePet
            pet.category.id = idCategoria
            pet.category.name = nomeCategoria

            return request
                .post('/pet')
                .send(pet)
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.id).toBe(idPet)
                    expect(res.body.name).toBe(nomePet)
                    expect(res.body.category.name).toBe(nomeCategoria)
                    expect(res.body.tags[0].name).toBe('vaccinated')
                })
        })

        it(`GET Pet Data Driven ForEach - ${nomePet}`, () => {

            return request
                // .get('/pet/' + petId') // tradicional
                .get(`/pet/${idPet}`) // moderno: template literals
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.id).toBe(idPet)
                    expect(res.body.status).toBe('available')
                })
        })

        it(`PUT Pet Data Driven ForEach - ${nomePet}`, () => {

            const pet = require('../../vendors/json/petput.json')

            pet.id = idPet
            pet.name = nomePet
            pet.category.id = idCategoria
            pet.category.name = nomeCategoria

            return request
                .put('/pet')
                .send(pet)
                .then((res) => {
                    expect(res.statusCode).toEqual(200)
                    expect(res.body.status).toEqual('sold')
                })
        })

        it(`DELETE Pet Data Driven ForEach - ${nomePet}`, async () => {

            return await request
                .delete(`/pet/${idPet}`) // moderno: template literals
                .then((res) => {
                    expect(res.statusCode).toEqual(200)
                    expect(res.body.code).toEqual(200)
                    expect(res.body.message).toBe(idPet.toString())
                })
            
        })
    })

})