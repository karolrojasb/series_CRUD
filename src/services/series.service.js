const Boom = require('@hapi/boom')
const series_model = require('../models/series_tv.model')

class SerieService {
  async createSerie(new_serie){
    return new_serie.save().then((data)=>{
      if (data)
        return data
      else
        //throw Error('No se pudo crear la serie')
        throw Boom.notAcceptable('No se pudo crear la serie')
    }).catch((err)=>{throw err})
  }

  async updateSerie(serie_id, new_serie){
    return series_model.findByIdAndUpdate(serie_id, new_serie, {new: true}).then((data)=>{
      if (data)
        return data
      else
        //throw Error('No se pudo actualizar la serie')
        throw Boom.notImplemented('No se pudo actualizar la serie')
    }).catch((err)=>{
      throw err
    })
  }

  async listSeries(){
    return series_model.find().then((data)=>{
      if (data)
        return data
      else
        //throw Error('No se pudo listar las series')
        throw Boom.notFound('No se pudo listar las series')
    }).catch((err)=>{
      throw err
    })
  }

  listSeries3Seconds(){
    return new Promise((resolve)=>{
      setTimeout(() => {
        resolve(series_model.find())
      }, 3000);
    })
  }

  async showSeries(serie_id){
    return series_model.findById(serie_id).then((data)=>{
      if (data)
        return data
      else
        //throw Error('No se pudo mostrar la serie')
        throw Boom.notFound('No se pudo mostrar la serie')
    }).catch((err)=>{
      throw err
    })
  }

  async deleteSerie(serie_id){
    return series_model.findByIdAndDelete(serie_id).then((data)=>{
      if (data)
        return data
      else
        //throw Error('No se pudo eliminar la serie')
        throw Boom.notFound('No se pudo eliminar la serie')
    }).catch((err)=>{
      throw err
    })
  }
}

module.exports = SerieService
