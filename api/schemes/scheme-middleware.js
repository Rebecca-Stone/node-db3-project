const db = require('../../data/db-config');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": 
  }
*/
async function checkSchemeId(req, res, next) {
  const scheme = await db('schemes').where('scheme_id', req.params.scheme_id).first()
  if (scheme) {
    next();
  } else {
    next({ message: `scheme with scheme_id ${req.params.scheme_id} not found`, status: 404 })
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  let { scheme_name } = req.body;
  if (!scheme_name || typeof scheme_name != 'string') {
    next({ message: "invalid scheme_name", status: 400 })
  } else {
    req.body.scheme_name = scheme_name.trim()
    next();
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  if (!req.body.scheme_id || !req.body.instructions || !req.body.step_number) {
    next({ message: "invalid step", status: 400})
  } else {
    next();
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
