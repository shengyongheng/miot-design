## 弹出层管理器-PopViewComponent

### 背景

### 预览


### 基本信息

| 基本信息  |                                                              |
| --------- | ------------------------------------------------------------ |
| 中文名称  | 弹出层管理器                                      |
| 描述      | 弹出层管理器 |
| 位置      | `miot/ui/Dialog/PopViewComponent`                              |
| SDK_Level | `SDK_10048`                                                  |
| 注意事项  | \                                                            |

### 使用方法

```jsx
        <PopViewComponent name="test" popViewType={'input'}/>
        <PopViewComponent name="test2" popViewType={'date'} type={'time24'}/>
        <PopViewComponent name="test2" popViewType={'date'} type={'single'}/>


        <Button title='show' title='showtest2' onPress={() => PopViewComponent.show('test2', )}></Button>
        <Button title='hide' onPress={() => PopViewComponent.hide('test')}></Button>
        <Button title='show' title='showtest1' onPress={() => PopViewComponent.show('test', )}></Button>
        <Button title="input" onPress={() => PopViewComponent.update('test', { popViewType: 'input' })}></Button>
        <Button title="choice" onPress={() => PopViewComponent.update('test', { popViewType: 'choice', options: [{ title: '123'}] })}></Button>
        <Button title="date" onPress={() => PopViewComponent.update('test', { popViewType: 'date' })}></Button>
        <Button title="message" onPress={() => PopViewComponent.update('test', { popViewType: 'message' })}></Button>
```

### 参数
| Param         | Type                                            | Description                                                  |
| ------------- | ----------------------------------------------- | ------------------------------------------------------------ |
| name | <code>`string`</code>    | 组件名称。同名的PopViewComponent会复用同一个组件，你需要通过update来更新状态 |
| popViewType | <code>`'date' | 'input' | 'loading' | 'message' | 'choice'`</code>    | 弹出层类型 |
| onSelect | <code>`(...args: any[]) => void`</code>    | 选中时的回调。只有在popViewType为date或choice时生效。 |
| onOk | <code>`(...args: any[]) => void`</code>    | 点击确认按钮时的回调 |
| onOk | <code>`(...args: any[]) => void`</code>    | 点击确认按钮时的回调 |
| okText | <code>`string`</code>    | 确认按钮文本内容 |
| onCancel | <code>`(...args: any[]) => void`</code>    | 点击取消按钮时的回调 |
| cancelText | <code>`string`</code>    | 取消按钮文本内容 |
| animationType | <code>string</code>                             | modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype |
| animationType | <code>string</code>                             | modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype |
| visible       | <code>bool</code>                               | 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible |
| style         | <code>style</code>                              | modal 的自定义样式                                           |
| title         | <code>string</code>                             | 标题                                                         |
| subtitle      | <code>string</code>                             | 副标题                                                       |
| showTitle     | <code>bool</code>                               | 是否显示标题，如果`false`，整个标题都不显示（包括副标题），默认`true` |
| showSubtitle  | <code>bool</code>                               | 是否显示副标题，默认`false`                                  |
| canDismiss    | <code>bool</code>                               | 是否允许点击蒙层背景隐藏 Modal，默认`true`                   |
| buttons       | [<code>Array&lt;Button&gt;</code>](#button按钮) | 按钮数组，定义底部按钮的属性，只能显示1～2个按钮，多传将失效。默认左取消右确定，左灰右绿，点击回调都是隐藏 Modal |
| showButton    | <code>bool</code>                               | 是否显示按钮，默认`true`                                     |
| onDismiss     | <code>function</code>                           | 点击`Modal`内容外面按钮，Modal隐藏时的回调函数 |
| keyboardAvoidingHeight | <code>number</code>                    | 10044新增 修正键盘弹起的高度 仅iOS使用                         |
|useNewTheme  |<code>bool</code>     | 10045新增 是否使用新样式，默认false  10045后 *!必须!* 使用新样式 旧样式将被废弃|
|onModalHide  |<code>`()=>void`</code>     | 对话框关闭后的回调|
|onModalShow  |<code>`()=>void`</code>     | 对话框打开后的回调|


### 方法
| method         | define                                            | Description                                                  |
| ------------- | ----------------------------------------------- | ------------------------------------------------------------ |
| show | <code>`(name: string, config?: PopViewComponentState)=>void`</code>    | 打开对应name的对话框，可以附带其他属性 |
| hide | <code>`(name: string)=>void`</code>    | 隐藏指定name的对话框 |
| update | <code>`(name: string)=>void`</code>    | 更新指定name的对话框 |
|get|<code>`(name: string)=>PopViewComponent | undefined`</code>|获取name对话框|
|has|<code>`(name: string)=>boolean`</code> |检查所有对话框里是否含有name对话框|
|getFirstId|<code>` (name: string): number | undefined `</code>|获取name对应的对话框中第一个组件id|
