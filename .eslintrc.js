module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
  },
};
