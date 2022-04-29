import prisma from "../database.js";

async function get() {
  return await prisma.discipline.findMany({});
}

export default {
  get,
};
