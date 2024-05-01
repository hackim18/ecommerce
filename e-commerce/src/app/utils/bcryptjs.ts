import bcryptjs from "bcryptjs";

export const hashPassword = (password: string): string => bcryptjs.hashSync(password);
export const comparePassword = (passowrd: string, hash: string): boolean => bcryptjs.compareSync(passowrd, hash);
