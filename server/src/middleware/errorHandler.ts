import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { isNotFound } from "../utils/errors";

type AppError = Error & { status?: number };

export const errorHandler = (
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid request" });
    }
    if ((error as AppError)?.status === 400) {
        return res.status(400).json({ message: "Invalid request" });
    }
    if (isNotFound(error)) {
        return res.status(404).json({ message: "Not found" });
    }
    console.error(error);
    res.status(500).json({ message: "Internal error" });
};

