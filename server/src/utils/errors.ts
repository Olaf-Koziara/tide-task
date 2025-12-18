import { Response } from "express";


export const isNotFound = (error: unknown): boolean =>
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === "P2025";


export const handlePrismaNotFound = async <T>(
    res: Response,
    operation: () => Promise<T>
): Promise<T | undefined> => {
    try {
        return await operation();
    } catch (error) {
        if (isNotFound(error)) {
            res.status(404).json({ message: "Not found" });
            return undefined;
        }
        throw error;
    }
};

