import { Role } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET ?? "wecare-dev-secret";
const JWT_EXPIRES_IN = "7d";

export const AUTH_COOKIE_NAME = "wecare_auth";

const secretKey = new TextEncoder().encode(JWT_SECRET);

export type AuthPayload = {
  sub: string;
  name: string | null;
  email: string;
  role: Role;
};

export const hashPassword = async (password: string) => {
  return hash(password, 12);
};

export const verifyPassword = async (password: string, passwordHash: string) => {
  return compare(password, passwordHash);
};

export const signAuthToken = async (payload: AuthPayload) => {
  return new SignJWT({
    name: payload.name,
    email: payload.email,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(secretKey);
};

export const verifyAuthToken = async (token: string) => {
  const { payload } = await jwtVerify(token, secretKey);

  return {
    id: Number(payload.sub),
    name: typeof payload.name === "string" ? payload.name : null,
    email: String(payload.email),
    role: payload.role as Role,
  };
};
