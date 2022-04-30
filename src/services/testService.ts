import teacherRepository from "../repositories/teacherRepository.js";
import testRepository, { TestCreate } from "../repositories/testRepository.js";

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

async function create(test: any) {
  const { id: teacherDisciplineId } =
    await teacherRepository.getTeacherDisciplineId(
      Number(test.teacherId),
      Number(test.disciplineId)
    );

  delete test.teacherId;
  delete test.disciplineId;
  test.views = 0;
  test.teacherDisciplineId = teacherDisciplineId;
  test.categoryId = Number(test.categoryId);

  return await testRepository.create(test);
}

export default {
  create,
  find,
  findSearch,
  updateViews,
};
