import { hash } from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run hash:admin-password -- "your-password"');
  process.exit(1);
}

const hashedPassword = await hash(password, 12);
console.log(hashedPassword);
