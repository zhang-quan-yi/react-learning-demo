import React from 'react';
import Link from './decorator/link';
import AtTag from './decorator/atTag';

import {
    Editor,
    EditorState,
    KeyBindingUtil, getDefaultKeyBinding,

    CompositeDecorator,
    convertToRaw,
    convertFromRaw,
    RichUtils,
} from 'draft-js';
import { relative } from 'path';

const { hasCommandModifier } = KeyBindingUtil;

const findLinkEntities = function (contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}

const loopMap = (map) => {
    let obj = {};
    if (map && map.size) {
        for (let [key, value] of map) {
            obj[key] = loopMap(value);
        }
    } else {
        obj = map;
    }
    return obj;
};
const HANDLE_REGEX = /@[\w]+/g;
const atTagImmutableStrategy = function (contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            if (entityKey === null) {
                return false;
            }
            return contentState.getEntity(entityKey).getType() === 'AtTag';
        },
        callback
    );
};

const atTagMutableStrategy = function (contentBlock, callback, contentState) {
    const text = contentBlock.getText();
    const index = text.lastIndexOf('@');
    console.log();
    if (index !== -1) {
        callback(index, text.length);
    } else {
        return false;
    }

}

const findWithRegex = function (regex, contentBlock, callback) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
};

const rawContent = {
    blocks: [
        {
            text: '@raymond zhang ',
            type: 'unstyled',
            entityRanges: [{ offset: 0, length: 14, key: 'atNameTag' }],
        },
    ],
    entityMap: {
        atNameTag: {
            type: 'AtTag',
            mutability: 'IMMUTABLE',
            data: { id: 'raymond id 1' }
        }
    }

};

/**
 * 
 * TODO:
 * 1. 第一次的光标问题
 * 
 */
class MyEditor extends React.Component {
    constructor(props) {
        super(props);

        // 注册文字装饰器
        const decorator = new CompositeDecorator([
            // {
            //     "//": '超文本装饰器',
            //     strategy: findLinkEntities,
            //     component: Link,
            // },
            {
                "//": '@ 符号装饰器',
                strategy: atTagImmutableStrategy,
                component: AtTag
            },
            {
                "//": '@ 符号装饰器',
                strategy: atTagMutableStrategy,
                component: AtTag
            },

        ]);

        // 创建空的 editor
        // this.state = {
        //     editorState: EditorState.createEmpty(decorator),
        //     showInput: false,
        //     urlValue: '',
        // };

        // 创建有内容的 editor
        const blocks = convertFromRaw(rawContent);
        this.state = {
            editorState: EditorState.createWithContent(blocks, decorator),
            showInput: false,
            urlValue: '',
            isAtKeyDown: false,
            atText: '',
            users: [
                'raymond',
                'quanyi',
                'hailei',
                'langke'
            ]
        };
    }

    // 创建 @ entity
    createAtImmutableEntity = (e) => {
        e.preventDefault();
        const { editorState, urlValue } = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'MUTABLE',
            { url: urlValue }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        this.setState({
            editorState: RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey
            ),
        }, () => {
            setTimeout(() => this.refs.editor.focus(), 0);
        });
    };

    onChange = (editorState) => {
        console.log('this.state.isAtKeyDown',this.state.isAtKeyDown);
        if (this.state.isAtKeyDown) {
            const contentState = editorState.getCurrentContent();
            const contentBlock = contentState.getLastBlock();
            const contentText = contentBlock.getText();
            const startKey = contentText.lastIndexOf('@');
            const atText = contentText.substr(startKey + 1);
            console.log('atText', atText);
            this.setState({
                atText
            });
        }

        this.setState({ editorState });
    };

    // 创建自定义快捷键命令
    keyBindingFn = (event) => {
        // console.log(event.keyCode);
        if (event.keyCode === 83 /* `S` key */ && hasCommandModifier(event)) {
            return 'myeditor-save';
        } else if (event.keyCode === 50 && event.shiftKey) {
            this.setState({
                isAtKeyDown: true,
            });
            return getDefaultKeyBinding(event);
        } else if (event.keyCode === 13 && this.state.isAtKeyDown) {
            return 'at-key-enter';
        } else if (event.keyCode === 27 && this.state.isAtKeyDown) {
            return 'at-key-esc';
        }
        return getDefaultKeyBinding(event);
    };

    // 处理快捷键
    handleKeyCommand = (command, editorState) => {
        // 保存快捷键
        if (command === 'myeditor-save') {
            return 'handled';
        }
        // if (command === 'at-key') {
        //     // at key started
        //     // choose at content
        //     this.setState({
        //         isAtKeyDown: true,
        //     });
        //     return 'handled';
        // }
        if (command === 'at-key-enter') {
            // create at entity
            return 'handled';
        }
        if (command === 'at-key-esc') {
            // this.setState({
            //     isAtKeyDown: false,
            //     atText: ''
            // });
            return 'handled';
        }
        return 'not-handled';
    };

    logState = () => {
        const content = this.state.editorState.getCurrentContent();
        console.log(convertToRaw(content));
    };

    focusEditor = () => {
        this.refs.editor.focus();
    };

    showInput = (e) => {
        e.preventDefault();
        const { editorState } = this.state;

        const contentState = editorState.getCurrentContent();
        const contentBlock = contentState.getLastBlock();
        const contentText = contentBlock.getText();
        const startKey = contentText.lastIndexOf('@');
        const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
        const atText = contentText.substr(startKey + 1);
        this.setState({

        });
        // console.log('blockWithLinkAtBeginning',blockWithLinkAtBeginning);
    };

    removeLink = (e) => {
        e.preventDefault();
        const { editorState } = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            this.setState({
                editorState: RichUtils.toggleLink(editorState, selection, null),
            });
        }
    };

    onURLChange = (e) => {
        this.setState({ urlValue: e.target.value });
    };
    confirmLink = (e) => {
        e.preventDefault();
        const { editorState } = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'AtTag',
            'IMMUTABLE',
            { id: '' }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        this.setState({
            editorState: RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey
            ),
            showInput: false,
            urlValue: '',
        }, () => {
            setTimeout(() => this.refs.editor.focus(), 0);
        });
    };

    render() {
        let urlInput;
        const { atText, isAtKeyDown } = this.state;
        if (this.state.showInput) {
            urlInput =
                <div style={styles.urlInputContainer}>
                    <input
                        onChange={this.onURLChange}
                        ref="url"
                        style={styles.urlInput}
                        type="text"
                        value={this.state.urlValue}
                        onKeyDown={this.onLinkInputKeyDown}
                    />
                    <button onMouseDown={this.confirmLink}>
                        Confirm
                    </button>
                </div>;
        }
        return (
            <div className="editor-page">
                <button onClick={this.logState}>log state</button>
                <button onClick={this.showInput}>Add @ name entity</button>
                {/* <button onClick={this.removeLink}>Remove Link</button> */}

                <div>
                    {urlInput}
                </div>

                <div className="my-editor" onClick={this.focusEditor}>
                    {
                        isAtKeyDown ?
                            (
                                <div className="at-pop">
                                    {
                                        this.state.users
                                            .filter(user => (user.indexOf(atText) !== -1))
                                            .map(user => (
                                                <span className="at-pop-item" key={user}>{user}</span>
                                            ))
                                    }
                                </div>
                            )
                            :
                            null
                    }
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                        keyBindingFn={this.keyBindingFn}
                        ref="editor"
                    />
                </div>
            </div>
        );
    }
}

export default MyEditor;

const styles = {
    myEditor: {
        position: 'relative'
    },
    atPop: {
        position: 'absolute',
        top: '-100%',
        left: 0,
    },
    root: {
        fontFamily: '\'Georgia\', serif',
        padding: 20,
        width: 600,
    },
    buttons: {
        marginBottom: 10,
    },
    urlInputContainer: {
        marginBottom: 10,
    },
    urlInput: {
        fontFamily: '\'Georgia\', serif',
        marginRight: 10,
        padding: 3,
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
    },
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
    link: {
        color: '#3b5998',
        textDecoration: 'underline',
    },
};