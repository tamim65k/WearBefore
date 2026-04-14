import { auth0 } from "@/lib/auth0";
import { ensureDatabaseSchema } from "@/lib/database-schema";
import { getDbClient } from "@/lib/db";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await auth0.getSession();
  const sessionUser = session?.user;

  if (!sessionUser?.sub || !sessionUser.email) {
    return null;
  }

  return {
    id: sessionUser.sub,
    email: sessionUser.email,
    name: sessionUser.name || sessionUser.email,
    avatar: typeof sessionUser.picture === "string" ? sessionUser.picture : undefined,
  };
}

export async function ensureSessionUserInDatabase() {
  const user = await getSessionUser();

  if (!user) {
    return null;
  }

  const sql = getDbClient();

  if (!sql) {
    return user;
  }

  await ensureDatabaseSchema();

  await sql`
    INSERT INTO app_users (id, email, name, avatar, updated_at)
    VALUES (${user.id}, ${user.email}, ${user.name}, ${user.avatar ?? null}, NOW())
    ON CONFLICT (id)
    DO UPDATE SET
      email = EXCLUDED.email,
      name = EXCLUDED.name,
      avatar = EXCLUDED.avatar,
      updated_at = NOW();
  `;

  return user;
}
