import express from 'express';
import { promises } from 'fs';

const routes = express.Router();
const { readFile, writeFile } = promises;
const gradesFile = 'grades.json';

routes.post('/saveGrade', async (req, res) => {
  try {
    let grade = req.body;
    const data = await readFile(gradesFile, 'utf8');
    const json = JSON.parse(data);

    grade = { id: json.nextId++, ...grade, timestamp: new Date() };
    json.grades.push(grade);

    await writeFile(gradesFile, JSON.stringify(json));

    res.json(grade);
  } catch (error) {
    return res.send(error.mesage);
  }
});

routes.put('/:id', async (req, res) => {
  try {
    const data = await readFile(gradesFile, 'utf8');
    const json = JSON.parse(data);
    const indexExist = json.grades.findIndex(
      (student) => student.id === parseInt(req.params.id, 10)
    );

    if (indexExist < 0) throw new Error('student not found');

    const { id, timestamp } = json.grades[indexExist];
    json.grades[indexExist] = { id, ...req.body, timestamp };

    await writeFile(gradesFile, JSON.stringify(json));

    return res.json(json.grades[indexExist]);
  } catch (error) {
    return res.send(error.message);
  }
});

routes.delete('/:id', async (req, res) => {
  try {
    const data = await readFile(gradesFile, 'utf8');
    const json = JSON.parse(data);
    const grades = json.grades.filter(
      (student) => student.id !== parseInt(req.params.id)
    );
    json.grades = grades;

    await writeFile(gradesFile, JSON.stringify(json));

    return res.json(json);
  } catch (error) {
    return res.send(error.message);
  }
});

routes.get('/:id', async (req, res) => {
  try {
    const data = await readFile(gradesFile, 'utf8');
    const json = JSON.parse(data);
    const grade = json.grades.find(
      (student) => student.id === parseInt(req.params.id, 10)
    );

    return res.json(grade);
  } catch (error) {
    return res.send(error.message);
  }
});

routes.get('/total-grade/:student/:subject', async (req, res) => {
  try {
    const data = await readFile(gradesFile, 'utf8');
    const json = JSON.parse(data);

    const grades = json.grades.filter(({ student, subject } = student) => {
      return student === req.params.student && subject === req.params.subject;
    });

    const totalGrade = grades.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);

    return res.json({ total: totalGrade });
  } catch (error) {
    return res.send(error.message);
  }
});

routes.get('/average-topics/:subject/:type', async (req, res) => {
  try {
    const data = await readFile(gradesFile, 'utf8');
    const json = JSON.parse(data);

    const grades = json.grades.filter(({ subject, type } = grade) => {
      return subject === req.params.subject && type === req.params.type;
    });

    const allSubjectType = grades.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);

    return res.json({ total: allSubjectType / grades.length });
  } catch (error) {
    return res.send(error.message);
  }
});

routes.get('/three-firsts/:subject/:type', async (req, res) => {
  try {
    const data = await readFile(gradesFile, 'utf8');
    const json = JSON.parse(data);

    const threeFirsts = json.grades
      .filter(({ subject, type } = grade) => {
        return subject === req.params.subject && type === req.params.type;
      })
      .sort((a, b) => b.value - a.value)
      .splice(0, 3);

    return res.send(threeFirsts);
  } catch (error) {
    return res.send(error.message);
  }
});

export default routes;
