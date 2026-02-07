import request from "supertest";
import app from "../src/app";

describe("Ticket Routes", () => {
  it("should return all tickets", async () => {
    // Arrange
    const endpoint = "/api/v1/tickets";

    // Act
    const res = await request(app).get(endpoint);

    // Assert
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("GET /api/v1/tickets/:id", () => {
  it("should return a ticket when id exists", async () => {
    // Arrange
    const createRes = await request(app)
      .post("/api/v1/tickets")
      .send({
        title: "Test Ticket",
        description: "Test Description",
        priority: "low",
      });

    const id = createRes.body.id;

    // Act
    const res = await request(app).get(`/api/v1/tickets/${id}`);

    // Assert
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
  });

  it("should return 404 when ticket does not exist", async () => {
    // Arrange
    const nonExistentId = 9999;

    // Act
    const res = await request(app).get(`/api/v1/tickets/${nonExistentId}`);

    // Assert
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Ticket not found");
  });
});