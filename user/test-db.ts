import prisma from "./src/config/db.js";

async function test() {
  try {
    console.log("Testing connection...");
    const userCount = await prisma.user.count();
    console.log("User count:", userCount);
  } catch (error) {
    console.error("Test failed:");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
