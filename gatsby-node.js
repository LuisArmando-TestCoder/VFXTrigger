const fs = require('fs')

exports.createPages = async function ({ actions }) {
  fs.readdir('./src/shaders', (_, files) => {
    files.forEach(fileName => {
      const key = fileName.replace(/\.ts/g, '')
  
      if (key !== 'index') {
        actions.createPage({
          path: `shaders/${key}`,
          component: require.resolve(`./src/templates/shaders.tsx`),
          context: { slug: key },
        })
      }
    })
  })
}
