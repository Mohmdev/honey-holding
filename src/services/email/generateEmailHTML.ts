import fs from 'fs'
import path from 'path'

import ejs from 'ejs'
import juice from 'juice'

export const generateEmailHTML = async (data: any): Promise<string> => {
  const templatePath = path.join(
    process.cwd(),
    'src/services/email/template.ejs'
  )
  const templateContent = fs.readFileSync(templatePath, 'utf8')

  // Compile and render the template with EJS
  const preInlinedCSS = ejs.render(templateContent, {
    ...data,
    cta: data.cta || {}
  })

  // Inline CSS
  const html = juice(preInlinedCSS)

  return Promise.resolve(html)
}
