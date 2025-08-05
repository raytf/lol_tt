import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: any[]) => twMerge(clsx(inputs));

export const getRandomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
