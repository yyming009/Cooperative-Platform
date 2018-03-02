// var problems = [
//   {
//     id: 1,
//     name: "Two sum",
//     desc: 'Given  as  anoisnf a anfoiaf anoafroafa  aowfoaf  afaf  af oanoa   na aa foa of oa foafwnfaowfwo',
//     difficulty: "easy"
//   },
//   {
//     id: 2,
//     name: "Three sum",
//     desc: 'Given  as  anoisnf a anfoiaf anoafroafa  aowfoaf  afaf  af oanoa   na aa foa of oa foafwnfaowfwo',
//     difficulty: "easy"
//   },
//   {
//     id: 3,
//     name: "Four sum",
//     desc: 'Given  as  anoisnf a anfoiaf anoafroafa  aowfoaf  afaf  af oanoa   na aa foa of oa foafwnfaowfwo',
//     difficulty: "hard"
//   },
//   {
//     id: 4,
//     name: "forg jump",
//     desc: 'Given  as  anoisnf a anfoiaf anoafroafa  aowfoaf  afaf  af oanoa   na aa foa of oa foafwnfaowfwo',
//     difficulty: "medium"
//   },
// ];

var problemModel = require("../models/problemModel");


var getProblems = function () {
  return new Promise ((resolve, reject) => {
    problemModel.find({}, function(err, problems){
      if (err) {
        reject(err);
      } else {
        resolve(problems);
      }
    });
  });
};

var getProblem = function (id) {
  return new Promise ((resolve, reject) => {
    problemModel.findOne({ id: id }, function (err, problem) {
      if (err) {
        reject(err);
      } else {
        resolve(problem);
      }
    });
  });
};

var addProblem = function (newProblem) {
  return new Promise ((resolve, reject) => {
    problemModel.findOne({ name: newProblem.name }, function (err, problem) {
      if (problem) {
        reject("problem name already exists!!!");
      } else {
        problemModel.count({}, function(err, num){
          newProblem.id = num + 1;
          var mongoProblem = new problemModel(newProblem);
          mongoProblem.save();
          resolve(newProblem);
        });
      }
    });
  });
};

module.exports = {
  getProblems: getProblems,
  getProblem: getProblem,
  addProblem: addProblem
}
