import { getQuickJS } from 'quickjs-emscripten'

export async function run() {
  const QuickJS = await getQuickJS()
  const vm = QuickJS.newContext()

  // [{ name: 'sum', body: `return params.x + params.y` }, ...]
  const functions: { name: string; body: string }[] = []

  // { name: 'sum', body: `return params.x + params.y` } => `function sum(params) { return { result: params.x + params.y } };`
  const resolverFunctions = functions.map(({ name, body }) => `function ${name}(params) { ${body} };`).join()

  // {
  //   tasks: {
  //     sum: {
  //       requires: ['a', 'b'],
  //       provides: ['sum'],
  //       resolver: {
  //         name: 'sum',
  //         params: { x: 'a', y: 'b' },
  //         results: { result: 'sum' }
  //       }
  //     }
  //   }
  // }
  const flowSpec = `{}`
  // { a: 1, b: 1 }
  const params = `{}`
  // ['sum']
  const expectedResults = `[]`
  // { sum }
  const resolvers = `{${functions.map(({ name }) => `${name},`).join('')}}`

  let code = `import { FlowManager } from 'flowed';${resolverFunctions};FlowManager.run(${flowSpec}, ${params}, ${expectedResults}, ${resolvers});`

  vm.evalCode(code)
}
