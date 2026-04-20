import { compare } from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { env } from "@/config/env";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth/constants";
import { isMissingTableError } from "@/lib/db/safe-query";
import { prisma } from "@/lib/prisma";
import type { AdminUser } from "@/types";

type SessionRole = "SUPER_ADMIN" | "EDITOR";

type SessionIdentity = {
  id: string;
  email: string;
  role: SessionRole;
};

const sessionSecret = new TextEncoder().encode(env.ADMIN_SESSION_SECRET);

async function createSessionToken(identity: SessionIdentity) {
  return new SignJWT({
    email: identity.email,
    role: identity.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(identity.id)
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(sessionSecret);
}

async function readSessionToken(token: string | undefined) {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, sessionSecret);

    if (payload.email !== env.ADMIN_EMAIL) {
      return null;
    }

    const role = payload.role;

    return {
      id: typeof payload.sub === "string" ? payload.sub : "env-admin",
      email: typeof payload.email === "string" ? payload.email : env.ADMIN_EMAIL,
      role: role === "EDITOR" || role === "SUPER_ADMIN" ? role : "SUPER_ADMIN",
    } satisfies SessionIdentity;
  } catch {
    return null;
  }
}

export async function verifyAdminCredentials(email: string, password: string) {
  if (email !== env.ADMIN_EMAIL) {
    return false;
  }

  return compare(password, env.ADMIN_PASSWORD_HASH);
}

export async function createAdminSession(identity: SessionIdentity) {
  const cookieStore = await cookies();
  const token = await createSessionToken(identity);

  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function syncAdminUser(email: string): Promise<SessionIdentity> {
  try {
    const adminUser = await prisma.adminUser.upsert({
      where: { email },
      update: {
        isActive: true,
        lastLoginAt: new Date(),
      },
      create: {
        email,
        role: "SUPER_ADMIN",
        isActive: true,
        lastLoginAt: new Date(),
      },
    });

    return {
      id: adminUser.id,
      email: adminUser.email,
      role: adminUser.role,
    };
  } catch (error) {
    if (!isMissingTableError(error)) {
      throw error;
    }

    return {
      id: "env-admin",
      email,
      role: "SUPER_ADMIN",
    };
  }
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const session = await readSessionToken(
    cookieStore.get(ADMIN_SESSION_COOKIE)?.value,
  );

  if (!session) {
    return null;
  }

  return {
    id: session.id,
    email: session.email,
    role: session.role,
    name: "Administrator",
    lastLoginAt: null,
  };
}

export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getCurrentAdmin();

  if (!admin) {
    throw new Error("Admin authentication is required.");
  }

  return admin;
}

export async function isAdminRequestAuthenticated(request: NextRequest) {
  const session = await readSessionToken(
    request.cookies.get(ADMIN_SESSION_COOKIE)?.value,
  );

  return Boolean(session);
}

export { ADMIN_SESSION_COOKIE };
