const { mkdirSync, writeFileSync } = require('fs')
const { getDirectoriesBasenames } = require('./utils.js')
const dirs = require('./dirs')

const [execPath, selfPath, pageName] = process.argv
const existingPages = getDirectoriesBasenames(`${dirs.pages}`)

if (existingPages.includes(pageName)) {
  throw new Error(`Page with the name ${pageName} already exists`)
}

const pagePath = `${dirs.pages}/${pageName}`

mkdirSync(pagePath)

writeFileSync(
  `${pagePath}/${pageName}.scss`,
  "@import '~@/assets/scss/common';"
)
writeFileSync(`${pagePath}/${pageName}.pug`, '')
writeFileSync(`${pagePath}/${pageName}.js`, `import './${pageName}.scss'`)
