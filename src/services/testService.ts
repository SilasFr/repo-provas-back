import testRepository from "../repositories/testRepository.js";

interface Filter {
  groupBy: "disciplines" | "teachers";
}

async function find(filter: Filter) {
  if (filter.groupBy === "disciplines") {
    return testRepository.getTestsByDiscipline();
  } else if (filter.groupBy === "teachers") {
    return testRepository.getTestsByTeachers();
  }
}

async function findSearch(filter: Filter, search: string) {
  if (filter.groupBy === "disciplines") {
    return testRepository.getFilteredTestsByDiscipline(search);
  } else if (filter.groupBy === "teachers") {
    return testRepository.getFilteredTestsByTeachers(search);
  }
}

async function updateViews(id: string) {
  return await testRepository.updateTestViewCount(Number(id));
}

export default {
  find,
  findSearch,
  updateViews,
};
