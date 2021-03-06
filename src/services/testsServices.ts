import { object } from "joi";
import * as testsRepo from "../repositories/testsRepository.js";

export async function getByFilter(filter: string) {
  if (filter === "discipline") {
    const response = await testsRepo.getByDiscipline();
    const terms = [];

    response.map((term) => {
      let { number, disciplines } = term;

      const filteredDisciplines = disciplines.map((dp) => {
        const testCategory = [];
        dp.TeacherDiscipline[0].Test.map((test) => {
          const category = { [test.category.name]: test };
          testCategory.push(category);
          delete test.category;
        });
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
    const response = await testsRepo.getByTeacher();
    const teachers = [];

    response.map((obj) => {
      const teacher = obj.name;
      const testCategory = { P1: [], P2: [], P3: [], P2ch: [] };

      obj.TeacherDiscipline.filter((td) => td.Test).map(({ Test }) => {
        Test.map((test) => {
          testCategory[test.category.name].push(test);
          delete test.category;
        });
      });

      const result = {
        [teacher]: {
          categories: { ...testCategory },
        },
      };
      teachers.push(result);
    });
    return teachers;
  }
}
