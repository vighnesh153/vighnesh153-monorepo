module.exports = async function getInquirer() {
  return import('inquirer').then((m) => m.default);
};
