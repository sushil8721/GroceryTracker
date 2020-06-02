module.exports = {
  normalizeErrors: function(errors) {
    let normalizeErrors = [];
//connect your database//
    for (let property in errors) {
      if (errors.hasOwnProperty(property)) {
        normalizeErrors.push({title: property, detail: errors[property].message});
      }
    }

    return normalizeErrors;
  }
}
