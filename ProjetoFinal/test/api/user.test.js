const request = require('supertest');
const app = require('../../app'); 

describe('TesteDeApiUser', () => {

    it("adicionar usuario", async () => {

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE5ODc2OTQ1LCJleHAiOjE3MTk4ODA1NDV9.vzPSATrU0FHu0TteImKI9l3DHJV2qr1Aw5y4Ja_GqHA'
        const response = await request(app)

        .post("/api/v1/user")
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "william",
                email: "william@gmail.com",
                senha: "123e"
            });
            console.log(response.body);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.nome).toBe("william");
        expect(response.body.email).toBe("william@gmail.com");
    });
});

//tentei mas não deu certo
