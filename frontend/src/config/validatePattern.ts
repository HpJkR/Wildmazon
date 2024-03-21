const validate = {
  validationPatterns: {
    // eslint-disable-next-line max-len, no-useless-escape
    email: new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
    // List of supported special characters : @$!%*-?&.()+,:<=>^_{}~/ #"'`,;\|[]
    // eslint-disable-next-line max-len, no-useless-escape
    password: new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%.*\-?&()\+,:<=>^_{}~\/ #"'`,;\\|[\]])[A-Za-z\d@$!%*\-?&\.()\+,:<=>^_{}~\/ #"'`,;\\|[\]]{8,}$/
    ),
  },
  validatePasswordMessage(p: string) {
    let errors = [];
    if (p.length < 8) {
      errors.push("Le mot de passe doit faire minimum 8 caractères");
    }
    if (p.search(/[a-z]/) < 0) {
      errors.push("Le mot de passe doit contenir une minuscule");
    }
    if (p.search(/[A-Z]/) < 0) {
      errors.push("Le mot de passe doit contenir une majuscule");
    }
    if (p.search(/[0-9]/) < 0) {
      errors.push("Le mot de passe doit contenir un chiffre");
    }

    return errors;
  },
};

export default validate;

// function validatePassword(p: string) {
//   let errors = [];
//   if (p.length < 8)
//     errors.push("Le mot de passe doit faire minimum 8 caractères");
//   if (p.search(/[a-z]/) < 0)
//     errors.push("Le mot de passe doit contenir une minuscule");
//   if (p.search(/[A-Z]/) < 0)
//     errors.push("Le mot de passe doit contenir une majuscule");
//   if (p.search(/[0-9]/) < 0)
//     errors.push("Le mot de passe doit contenir un chiffre");

//   return errors;
// }
