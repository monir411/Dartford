import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@gmail.com";
  const password = "13663";
  const hashedPassword = await hash(password, 12);

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: {
      passwordHash: hashedPassword,
      isActive: true,
      role: "SUPER_ADMIN",
    },
    create: {
      email,
      passwordHash: hashedPassword,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });

  console.log(`Successfully seeded admin: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
