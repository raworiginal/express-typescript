import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
export const hashPassword = (password: string): Promise<string> => {
	const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
	return bcrypt.hash(password, saltRounds);
};

export const comparePassword = (
	password: string,
	hashedPassword: string
): Promise<boolean> => {
	return bcrypt.compare(password, hashedPassword);
};

export const generateAccessToken = (userId: string): string => {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error("JWT_SECRET environment variable is not set.");
	}
	return jwt.sign({ userId }, secret, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

export const verifyAccessToken = (token: string): string | null => {
	const secret: string = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error("JWT_SECRET environment variable is not set.");
	}
	try {
		const decoded = jwt.verify(token, secret) as { userId: string };
		return decoded.userId;
	} catch (error) {
		return null;
	}
};
