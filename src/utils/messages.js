exports.invalidPermissions = "You don't have permission to do that!🚫";

exports.errorMessage = error => {
  return `${error.name}: ${error.message}`;
};

exports.unknownCommand = "I don't recognize that command 😕";
