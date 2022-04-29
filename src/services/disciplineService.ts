import disciplineRepository from "../repositories/disciplineRepository.js";

async function get() {
  return disciplineRepository.get();
}

export default {
  get,
};
