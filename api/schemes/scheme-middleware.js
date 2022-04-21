const db = require('../../data/db-config');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": 
  }
*/
async function checkSchemeId(req, res, next) {
  let scheme = await db('schemes').where({'scheme_id': req.params.scheme_id}).first()
  if (!scheme) {
    next({
      message: `scheme with scheme_id ${req.params.scheme_id} not found`,
      status: 404,
    });
  } else {
    next();
  }
}

const validateScheme = (req, res, next) => {
  let { scheme_name } = req.body;
  if (!scheme_name || typeof scheme_name != 'string' || !scheme_name.trim()) {
    next({ message: "invalid scheme_name", status: 400 })
  } else {
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
  let { instructions, step_number } = req.body;
  if (!instructions || typeof instructions != 'string' || !instructions.trim() || typeof step_number != 'number' || step_number < 1) {
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
