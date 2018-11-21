markdown单页文档
======

想用`markdown`编写带索引的单页结构HTML文档的话，可以试试。

### 安装

>	npm install filedoc -g

### 使用

首先参考`demo/`目录，使用`markdown`编写一些章节文件（位于`demo/section/`），并使用`HTML`编写好页面模板文件（位于`demo/index.tpl`）。在模板文件中，使用`x-markdown`标签引用`.md`文件，并使用`x-index`标签指定索引输出位置。

准备好所有文件后，使用以下命令将模板文件编译为HTML文件。

>	filedoc index.tpl

如果希望生成的`index.html`好看一些，可以在`style.css`里修改添加CSS样式。

- 可以使用 demo命令生成结构目录，命令如下：

> filedoc demo

在生成的目录中，section中是添加的文档章节，index.tpl 是模板，需要把section中的各个markdown文件按照顺序格式在index.tpl中添加，最后使用
`filedoc index.tpl` 进行编译，会在本目录下生成html文件

————————————————————————————————————————————————————————————————
> filedoc tree index.tpl

编辑indexx.tpl模板，生成菜单，h2为父级，h3为子级

