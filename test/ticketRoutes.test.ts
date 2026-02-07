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
