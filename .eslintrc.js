module.exports = {
    'env': {
        'node': true,
        'commonjs': true,
        'es2021': true,
        'jest': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 12
    },
    'rules': {
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'arrow-spacing': [
        'error', { 'before': true, 'after': true }
        ],
        'no-console': 0
    }
}
