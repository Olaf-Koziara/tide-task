import { PrismaClient } from "@prisma/client";
import assert from "node:assert";
import { execSync } from "node:child_process";
import path from "node:path";
import { after, before, beforeEach, test } from "node:test";
import request from "supertest";

const databaseUrl =  "file:./prisma/test.db";
process.env.DATABASE_URL = databaseUrl;
process.env.PORT = process.env.PORT ?? "0";

const { app } = require("../src/app");
const { prisma: appPrisma } = require("../src/prisma");

const prisma = new PrismaClient({ datasources: { db: { url: databaseUrl } } });

const pushSchema = () => {
    execSync("npx prisma db push --force-reset --skip-generate", {
        stdio: "ignore",
        env: { ...process.env },
        cwd: path.resolve(__dirname, "..")
    });
};

before(async () => {
    pushSchema();
});

after(async () => {
    await prisma.$disconnect();
    await appPrisma.$disconnect();
});

beforeEach(async () => {
    await prisma.city.deleteMany();
});

test("creates and lists cities", async () => {
    const createRes = await request(app).post("/cities").send({ name: "Paris" }).expect(201);
    assert.ok(createRes.body.id);
    assert.equal(createRes.body.name, "Paris");

    const listRes = await request(app).get("/cities").expect(200);
    assert.equal(listRes.body.length, 1);
    assert.equal(listRes.body[0].name, "Paris");
});

test("gets and updates a city", async () => {
    const createRes = await request(app).post("/cities").send({ name: "Berlin" }).expect(201);
    const id = createRes.body.id;

    const getRes = await request(app).get(`/cities/${id}`).expect(200);
    assert.equal(getRes.body.name, "Berlin");

    const updateRes = await request(app).patch(`/cities/${id}`).send({ name: "Berlin Updated" }).expect(200);
    assert.equal(updateRes.body.name, "Berlin Updated");
});

test("deletes a city", async () => {
    const createRes = await request(app).post("/cities").send({ name: "Lisbon" }).expect(201);
    const id = createRes.body.id;

    await request(app).delete(`/cities/${id}`).expect(204);

    const listRes = await request(app).get("/cities").expect(200);
    assert.equal(listRes.body.length, 0);
});

test("rejects invalid name", async () => {
    await request(app).post("/cities").send({ name: "" }).expect(400);
});

test("returns 404 when getting non-existent city", async () => {
    await request(app).get("/cities/99999").expect(404);
});

test("returns 404 when updating non-existent city", async () => {
    await request(app).patch("/cities/99999").send({ name: "Updated" }).expect(404);
});

test("returns 404 when deleting non-existent city", async () => {
    await request(app).delete("/cities/99999").expect(404);
});

test("returns 400 for invalid ID format in get request", async () => {
    await request(app).get("/cities/invalid").expect(400);
    await request(app).get("/cities/0").expect(400);
    await request(app).get("/cities/-1").expect(400);
    await request(app).get("/cities/1.5").expect(400);
});

test("returns 400 for invalid ID format in update request", async () => {
    await request(app).patch("/cities/invalid").send({ name: "Test" }).expect(400);
    await request(app).patch("/cities/0").send({ name: "Test" }).expect(400);
    await request(app).patch("/cities/-1").send({ name: "Test" }).expect(400);
});

test("returns 400 for invalid ID format in delete request", async () => {
    await request(app).delete("/cities/invalid").expect(400);
    await request(app).delete("/cities/0").expect(400);
    await request(app).delete("/cities/-1").expect(400);
});

