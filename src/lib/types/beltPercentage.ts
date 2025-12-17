import { colors } from "@prisma/client";

export type BeltPercentage = {
  color: colors;
  students_count: number;
  percentage: number;
};