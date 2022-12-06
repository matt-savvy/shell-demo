function factory(fields, values, fallbacks) {
  return fields.reduce((data, fieldName) => {
    if (values && values[fieldName]) {
      data[fieldName] = values[fieldName];
    } else if (fallbacks && fallbacks[fieldName]) {
      data[fieldName] = fallbacks[fieldName]();
    }

    return data;
  }, {});
}

module.exports = factory;
