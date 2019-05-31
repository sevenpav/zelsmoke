const { mkdirSync, writeFileSync } = require('fs')
const { getDirectoriesBasenames } = require('./utils.js')
const dirs = require('./dirs')

const [execPath, selfPath, componentName] = process.argv
const existingComponents = getDirectoriesBasenames(`${dirs.components}`)

if (existingComponents.includes(componentName)) {
  throw new Error(`Component with the name ${componentName} already exists`)
}

const componentPath = `${dirs.components}/${componentName}`

mkdirSync(componentPath)

writeFileSync(`${componentPath}/${componentName}.scss`, '')
writeFileSync(`${componentPath}/${componentName}.pug`, `mixin ${componentName}`)
writeFileSync(`${componentPath}/${componentName}.js`, '')
