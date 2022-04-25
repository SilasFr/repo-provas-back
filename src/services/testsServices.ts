import { object } from "joi";
import * as testsRepo from "../repositories/testsRepository.js";

export async function getByFilter(filter: string) {
  if (filter === "discipline") {
    const response = await testsRepo.getByDiscipline();
    const terms = [];

    response.map((term) => {
      let { number, disciplines } = term;

      const filteredDisciplines = disciplines.map((dp) => {
        const testCategory = { P1: [], P2: [], P3: [], P2ch: [] };
        dp.TeacherDiscipline[0].Test.map((test) => {
          testCategory[test.category.name].push(test);
          delete test.category;
        });
        console.log(testCategory);
        return { name: dp.name, tests: testCategory };
      });
      const result = {
        [number]: filteredDisciplines,
      };
      terms.push(result);
    });

    return terms;
  }

  if (filter === "teacher") {
    return await testsRepo.getByTeacher();
  }
}
