const db = require('../../data/db-config');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": 
  }
*/
async function checkSchemeId(req, res, next) {
  const schema = await db('schemes').where('id', req.params.id).first()
  if (schema) {
    next();
  } else {
    next({ message: `scheme with scheme_id ${req.params.id} not found`, status: 404 })
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
  let { schema_name } = req.body;
  if (!schema_name || typeof schema_name != 'string') {
    next({ message: "invalid scheme_name", status: 400 })
  } else {
    req.body.schema_name = schema_name.trim()
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

}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
