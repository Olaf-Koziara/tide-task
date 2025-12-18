import 'dotenv/config';
import z from 'zod';

const EnvSchema = z.object({
    PORT: z.coerce.number().int().positive().max(65535).default(4000),
    DATABASE_URL: z.string().trim().default('file:./prisma/dev.db'),
    CLIENT_ORIGIN:z.string().trim().default('http://localhost:5173'),
});

export const env = EnvSchema.parse(process.env);