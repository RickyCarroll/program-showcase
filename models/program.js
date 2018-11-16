var mongoose = require('mongoose');

// program scheme
var ProgramScheme = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    programName: {
        type: String
    },
    programTitle: {
        type: String
    },
    mainProgram: {
        type: String
    }

});

var Program = module.exports = mongoose.model('programs',ProgramScheme);

module.exports.addProgram = function (newProgram, callback) {
    newProgram.save(callback);

};

module.exports.getProgramByUsername = function (username, programName, callback) {
    //console.log("the username and programName are" + username + " and " + programName);
    var query = { $and: [ { username: { $eq: username } }, { programName: { $eq: programName } } ] };
    // var query = {{username: username}, {programName: programName}};
    // console.log(query);
    Program.findOne(query, callback);
};


module.exports.getAllProgramsByUsername = function (username, callback) {
    var query = {username: username};
    Program.find(query,callback);
}

module.exports.removeProgram = function (username, programName, callback) {
    var query = {username: username, programName: programName};
    Program.findOneAndDelete(query, callback);
}

