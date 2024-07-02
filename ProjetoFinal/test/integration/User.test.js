 const UserController = require("../../src/controller/user");
const User = require("../../src/model/user");

describe("Teste de integração", () => {

    it("adicionar usuario", async () => {
        const { dataValues } = await UserController.createUser(
            "william",
            "william@gmail.com",
            "123e"
        );

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(dataValues.nome).toBe("william");
        expect(dataValues.email).toBe("william@gmail.com");
    })
})

// tentei mas não deu certo