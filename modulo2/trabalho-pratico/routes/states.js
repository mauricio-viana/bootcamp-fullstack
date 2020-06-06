import express from 'express';
import { promises } from 'fs';

const router = express();
const { readFile, writeFile } = promises;

router.get('/:initials', async (req, res) => {
  try {
    let fileJson = `states/${req.params.initials}.json`;
    let data = await readFile(fileJson, 'utf8');
    let json = JSON.parse(data);

    res.send(json);
  } catch (error) {
    res.send({ error: error.message });
  }
});

export default router;
