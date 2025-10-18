import z from "zod"

export type Colors = "white" | "white_gray" | "gray" | "gray_black" | "yellow_white" | "yellow" | "yellow_black" | "orange_white" | "orange" | "orange_black" | "green_white" | "green" | "green_black" | "blue" | "purple" | "brown" | "black" | "red"

export const ZodColors = z.enum([
  "white",
  "white_gray",
  "gray",
  "gray_black",
  "yellow_white",
  "yellow",
  "yellow_black",
  "orange_white",
  "orange",
  "orange_black",
  "green_white",
  "green",
  "green_black",
  "blue",
  "purple",
  "brown",
  "black",
  "red",
])