const server = require("../server");
const request = require("supertest");
////////////////////////////////////set de datas
const validData = [
  {
    dato1: "data 1",
    dato2: 123,
    dato3: {
      id: "hola",
    },
    dato4: ["1", "b", "3c"],
  },
];
describe("GET /api/prueba", () => {
  test("should respond with an array of rows", async () => {
    const response = await request(server).get("/api/prueba").send();
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.rows)).toBe(true);
    expect(response.body).toHaveProperty("state");
    expect(response.body).toHaveProperty("rows");
    expect(response.body).toHaveProperty("message");
  });

  test("should handle errors gracefully", async () => {
    const response = await request(server).get("/api/ruta-inexistente").send();
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBeTruthy();
  });

  test("should respond with a data type", async () => {
    const response = await request(server)
      .post("/api/prueba")
      .set("Content-Type", "application/json")
      .send({});
    expect(response.body).toHaveProperty("state");
    expect(response.body).toHaveProperty("rows");
    expect(response.body).toHaveProperty("message");
  });

  test("should respond with success for valid data", async () => {
    const validData = [
      {
        dato1: "data 1",
        dato2: 123,
        dato3: {
          id: "hola",
        },
        dato4: ["1", "b", "3c"],
      },
    ];
    const invalid1 = [
      {
        dato1: 123, //dato cambiado invalido
        dato2: 123,
        dato3: {
          id: "hola",
        },
        dato4: ["1", "b", "3c"],
      },
    ];
    const invalid2 = [
      {
        dato1: "data 1 ", //dato cambiado invalido
        dato2: "123",
        dato3: {
          id: "hola",
        },
        dato4: ["1", "b", "3c"],
      },
    ];

    const response = await request(server)
      .post("/api/prueba")
      .set("Content-Type", "application/json")
      .send(validData);
    let responseInvalid = await request(server)
      .post("/api/prueba")
      .set("Content-Type", "application/json")
      .send(invalid1);

    expect(response.statusCode).toBe(200);
    expect(response.body.state).toBe(true);
    expect(Array.isArray(response.body.rows)).toBe(true);
    expect(response.body.message).toBe("peticion exitosa");

    expect(responseInvalid.statusCode).toBe(400);
    expect(responseInvalid.body.state).toBe(false);
    expect(responseInvalid.body.rows).toBe(null);
    expect(Array.isArray(responseInvalid.body.errors)).toBe(true);
    responseInvalid = await request(server)
      .post("/api/prueba")
      .set("Content-Type", "application/json")
      .send(invalid2);
    expect(responseInvalid.statusCode).toBe(400);
    expect(responseInvalid.body.state).toBe(false);
    expect(responseInvalid.body.rows).toBe(null);
    expect(Array.isArray(responseInvalid.body.errors)).toBe(true);
  });
});
afterAll(() => {
  server.close();
});
