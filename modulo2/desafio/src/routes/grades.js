import express from 'express';
import { promises } from 'fs';

const routes = express.Router();
const { readFile, writeFile } = promises;
const gradesFile = 'grades.json';

function indexExist(grades, paramId) {
  let index = grades.findIndex((grade) => grade.id === parseInt(paramId, 10));
  return index;
}

function defaultObject(body) {
  let { student, subject, type, value } = body;
  if (!student) student = '';
  if (!subject) subject = '';
  if (!type) type = '';
  if (!value) value = 0;

  return { student: student, subject: subject, type: type, value: value };
}

routes.post('/save', async (req, res) => {
  try {
    let grade = defaultObject(req.body);
    const data = await readFile(gradesFile, 'utf8');
    const json = JSON.parse(data);

    if (grade.value < 0 || grade.value > 50)
      return res
        .status(400)
        .send({ error: 'Invalid value provided. (property: value)' });

    grade = {
      id: json.nextId++,
      ...grade,
      timestamp: new Date(),
    };

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
    const index = indexExist(json.grades, req.params.id);

    if (index < 0) return res.status(404).send({ error: 'grade not found' });
    if (req.body.value < 0 || req.body.value > 50)
      return res
        .status(400)
        .send({ error: 'Invalid value provided. (property: value)' });

    const { id, timestamp } = json.grades[index];
    json.grades[index] = { id, ...req.body, timestamp };

    await writeFile(gradesFile, JSON.stringify(json));

    return res.json(json.grades[index]);
  } catch (error) {
    return res.send(error.message);
  }
});

routes.delete('/:id', async (req, res) => {
  try {
    const data = await readFile(gradesFile, 'utf8');
    const json = JSON.parse(data);

    const index = indexExist(json.grades, req.params.id);
    if (index < 0) return res.status(404).send({ error: 'grade not found' });

    const grades = json.grades.filter(
      (student) => student.id !== parseInt(req.params.id)
    );
    json.grades = grades;

    await writeFile(gradesFile, JSON.stringify(json));

    return res.end();
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

    if (!grade) return res.status(404).send({ error: 'grade not found' });

    return res.json(grade);
  } catch (error) {
    return res.send(error.message);
  }
});

routes.get('/total/:student/:subject', async (req, res) => {
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

routes.get('/average/:subject/:type', async (req, res) => {
  try {
    const data = await readFile(gradesFile, 'utf8');
    const json = JSON.parse(data);

    const grades = json.grades.filter(({ subject, type } = grade) => {
      return subject === req.params.subject && type === req.params.type;
    });

    const allSubjectType = grades.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);

    return res.json({ average: allSubjectType / grades.length });
  } catch (error) {
    return res.send(error.message);
  }
});

routes.get('/firts/:subject/:type', async (req, res) => {
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
