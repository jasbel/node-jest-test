import app from "../src/app";
import request from "supertest";

describe("GET /tasks", () => {
    test("should respond with a 200 status code ", async () => {
        const response = await request(app).get("/tasks").send();

        expect(response.statusCode).toBe(200);
    });

    test("should respond with a array ", async () => {
        const response = await request(app).get("/tasks").send();

        expect(response.body).toBeInstanceOf(Array);
    });
});

describe("POST /tasks", () => {
    describe("given title descriptipn", () => {
        const newTask = {
            title: "test task",
            description: "mi description",
        };

        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/tasks").send(newTask);

            expect(response.statusCode).toBe(200);
        });

        test("should have a contenType: application/json in header", async () => {
            const response = await request(app).post("/tasks").send(newTask);

            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
            );
        });

        test("should respond with an task ID", async () => {
            const response = await request(app).post("/tasks").send(newTask);

            expect(response.body.id).toBeDefined();
        });
    });

    describe('when title and description is missing', () => {
      test('should respons with a 400 status code', async () => {

        const field = [
          {},
          {title: 'resds'},
          {description: 'test Decription'}
        ]

        for (const body in field) {
          const response = await request(app).post('/tasks').send(body);
          expect(response.statusCode).toBe(400);
        }
      })
    })
});
