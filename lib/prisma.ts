/**
 * Prisma Client Export
 * Re-exports from db.ts for compatibility
 */

import { db } from "./db";

export const prisma = db;
export { db };
export * from "@prisma/client";
