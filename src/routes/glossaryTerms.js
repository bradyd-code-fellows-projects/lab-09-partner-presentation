'use strict';

const express = require('express');
const TermModel = require('../auth/models/glossaryInputModel');

const termsRouter = express.Router();

termsRouter.get('/glossary', async (req, res, next) => {
  try {
    const allTerms = await TermModel.findAll();
    res.status(200).send(allTerms);
  } catch (e) {
    res.status(404).send('Not found');
  }
});

termsRouter.get('/glossary/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const selectedTerm = await TermModel.findOne({ where: { id }});
    res.status(200).send(selectedTerm);
  } catch (e) {
    res.status(404).send('Not found');
  }
});

termsRouter.post('/glossary/', async (req, res, next) => {
  const term = req.body;
  try {
    let response = await TermModel.create(term);
    res.status(200).send(response);
  } catch (e) {
    res.status(404).send('Cannot perform this method');
  }
});

termsRouter.put('/glossary/:id', async (req, res, next) => {
  const { id } = req.params;
  const updatedTerm = req.body;
  try {
    const selectedTerm = await TermModel.findOne({ where: { id }});
    await selectedTerm.update(updatedTerm);
    await selectedTerm.save();
    res.status(200).send(selectedTerm);
  } catch (e) {
    res.status(404).send('Cannot perform this method');
  }
});

termsRouter.delete('/glossary/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const recordToDelete = await TermModel.findOne({where: { id }});
    await recordToDelete.destroy();
    res.status(200).send(recordToDelete);
  } catch (e) {
    res.status(404).send('Cannot perform this method');
  }
});

module.exports = termsRouter;