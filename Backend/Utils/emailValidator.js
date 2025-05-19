function isValidGmail(email) {
  return /^([a-zA-Z0-9_.+-])+@gmail\.com$/.test(email);
}

module.exports = { isValidGmail }; 