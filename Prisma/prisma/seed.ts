/************
 * imports
 */
import { PrismaClient } from "@prisma/client";

/************
 * variables
 */
const prisma = new PrismaClient();

/************
 * functions
 */
/**
 * upsertメソッドを使用し、
 * whereで設定した条件でデータが
 * 　存在する場合はupdate実施
 * 　存在しない場合create実実施
 */
const main = async () => {
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
    },
  });
  console.log(alice);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
