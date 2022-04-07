const Boom = require('@hapi/boom')
const express = require('express')
const series_model = require('../models/series_tv.model')
const Service = require('../services/series.service')
const series_router = express.Router()
const series_service = new Service()

series_router.get('/serie', async (req, res, next) => {
  try {
    const data_service = await series_service.listSeries()
    res.status(200).json(data_service)
  } catch (error) {
    //res.status(404).json({message: error})
    next(error)
  }
});

series_router.get('/serie3', async (req, res, next) => {
  try {
    const data_service = await series_service.listSeries3Seconds()
    res.status(200).json(data_service)
  } catch (error) {
    //res.status(404).json({message: error})
    next(error)
  }
});

series_router.get('/serie/:id', async (req, res, next) => {
  try {
    const serie_id = req.params.id
    const data_service = await series_service.showSeries(serie_id)
    res.status(200).json(data_service)
  } catch (error) {
    //res.status(500).json({message: error})
    next(error)
  }
});

/*http://localhost:5000/api/v1/series/serie */
series_router.post('/serie', async(req,res, next) =>{
  try {
    const new_serie = series_model(req.body)
    const data_service = await series_service.createSerie(new_serie)
    res.status(201).json(data_service)
  } catch (error) {
    //res.status(500).json({message: error})
    next(error)
  }
})

/*http://localhost:5000/api/v1/superheros/superhero */
series_router.put('/serie/:id', async(req,res, next) =>{
  try {
    const serie_id = req.params.id
    const data_service = await series_service.updateSerie(serie_id, req.body)
    res.status(202).json(data_service)
  } catch (error) {
    //res.status(500).json({message: error})
    next(error)
  }
})


series_router.delete('/serie/:id', async (req, res, next) => {
  try {
    const serie_id = req.params.id
    const data_service = await series_service.deleteSerie(serie_id)
    res.status(204).json(data_service)
  } catch (error) {
    //res.status(500).json({message: error})
    next(error)
  }
});

module.exports = series_router
