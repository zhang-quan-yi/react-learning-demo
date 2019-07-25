## Entities

- 创建并应用选中文字区域的显示组件

## 快捷键 keyBindingFn handleKeyCommand

- keyBindingFn： 根据键盘事件标记快捷键 

```javascript

// 创建自定义快捷键命令
keyBindingFn = (event) => {
    if (event.keyCode === 83 /* `S` key */ && hasCommandModifier(event)) {
        return 'myeditor-save';
    }
    return getDefaultKeyBinding(event);
};

```


- handleKeyCommand 根据标记的快捷键，执行动作

```javascript

handleKeyCommand = (command, editorState) => {
    // 保存快捷键
    if (command === 'myeditor-save') {
        console.log('save handled');
        return 'handled';
    }
    return 'not-handled';
};

```

## 自定义 block 样式（样式名称）：blockStyleFn 

## 自定义 block 渲染： blockRenderMap

- https://draftjs.org/docs/advanced-topics-custom-block-render-map

## 自定义 block 组件： blockRendererFn