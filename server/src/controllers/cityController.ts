import { Request, Response } from "express";
import z from "zod";
import { prisma } from "../prisma";
import { handlePrismaNotFound } from "../utils/errors";

type AppError = Error & { status?: number };

const cityInputSchema = z.object({
    name: z.string().trim().min(1)
});

const parseId = (value: string) => {
    const id = Number(value);
    if (!Number.isInteger(id) || id <= 0) {
        const error: AppError = new Error("Invalid city ID provided");
        error.status = 400;
        throw error;
    }
    return id;
};

export const listCities = async (_req: Request, res: Response) => {
    const cities = await prisma.city.findMany({ orderBy: { id: "asc" } });
    res.json(cities);
};

export const getCity = async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    const city = await prisma.city.findUnique({ where: { id } });
    if (!city) {
        return res.status(404).json({ message: "Not found" });
    }
    res.json(city);
};

export const createCity = async (req: Request, res: Response) => {
    const { name } = cityInputSchema.parse(req.body ?? {});
    const city = await prisma.city.create({ data: { name } });
    res.status(201).json(city);
};

export const updateCity = async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    const { name } = cityInputSchema.parse(req.body ?? {});
    const city = await handlePrismaNotFound(res, () =>
        prisma.city.update({ where: { id }, data: { name } })
    );
    if (city) {
        res.json(city);
    }
};

export const deleteCity = async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    const result = await handlePrismaNotFound(res, () =>
        prisma.city.delete({ where: { id } })
    );
    if (result !== undefined) {
        res.status(204).send();
    }
};

