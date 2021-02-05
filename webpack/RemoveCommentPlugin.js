class RemoveCommentPlugin {
  apply(compiler) {
    // 去除注释正则
    const reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)|(\/\*\*\*\*\*\*\/)/g

    // 在emit阶段插入钩子函数
    compiler.hooks.emit.tap('RemoveComment', (compilation) => {
      // 遍历构建产物，.assets中包含构建产物的文件名
      Object.keys(compilation.assets).forEach((item) => {
        // .source()是获取构建产物的文本
        let content = compilation.assets[item].source()
        content = content.replace(reg, function (word) {
          // 去除注释后的文本
          return /^\/{2,}/.test(word) || /^\/\*!/.test(word) || /^\/\*{3,}\//.test(word) ? '' : word
        })
        // 更新构建产物对象
        compilation.assets[item] = {
          source: () => content,
          size: () => content.length,
        }
      })
    })
  }
}
  
module.exports = RemoveCommentPlugin