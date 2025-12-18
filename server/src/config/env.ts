import 'dotenv/config';
import z from 'zod';

const EnvSchema = z.object({
    PORT: z.coerce.number().int().positive().default(4000),
    DATABASE_URL: z.string().trim().default('file:./prisma/dev.db')
});

export const env = EnvSchema.parse(process.env);