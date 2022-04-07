const logErrors = (err,req,res,next) => {
  console.log(err)
  next(err);
}

const errorHandler = (err,req,res,next) => {
  res.status(404).json({
    message: err.message,
    stack: err.stack
  })
}

// libreria HappyBoom
const boomErrorHandler = (err,req,res,next) => {
  if(err.isBoom) {
    const {output} = err;
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}

module.exports = {logErrors, errorHandler, boomErrorHandler}
