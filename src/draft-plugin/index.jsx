import React, { Component } from 'react';
import {
    EditorState,
    convertToRaw,
    convertFromRaw,
    RichUtils,
    ContentState,
    Modifier,
    Entity,
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import emojiTheme from './emoji/theme';
import mentions from './mentions.js';
import Hashs from './hashs.js';
import HashEntry from './hashEntry';


const mentionsStyles = {
    mention: {
        color: '#407ee7',
        fontWeight: 'bold'
    }
};
const rawContent = {
    blocks: [
        {
            text: '@raymond Zhang ',
            type: 'unstyled',
            entityRanges: [{ offset: 0, length: 14, key: 0 }],
        }
    ],

    entityMap: {
        0: {
            type: 'mention',
            mutability: 'IMMUTABLE',
            data: {
                name: 'raymond Zhang',
                link: 'https://twitter.com/mrussell247',
                avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
            },
        }
    },
};
class MyEditor extends Component {
    constructor(props) {
        super(props);

        this.mentionPlugin = createMentionPlugin({
            entityMutability: 'IMMUTABLE',  // @组件是否可以不可以逐子删除，会整体删除
            supportWhitespace: false,       // 搜索的时候是否可以使用空格
            mentionPrefix: '@',             // 在@的内容前显示的前缀
            mentionComponent: (mentionProps) => (
                <span
                    style={mentionsStyles.mention}
                >
                    {mentionProps.children}
                </span>
            ),
        });
        this.hashPlugin = createMentionPlugin({
            entityMutability: 'MUTABLE',    // @组件是否可以不可以逐子删除，会整体删除
            supportWhitespace: false,       // 搜索的时候是否可以使用空格
            mentionPrefix: '#',             // 在@的内容前显示的前缀
            mentionTrigger: '#',
            mentionComponent: (props) => {
                return props.children;
            },
        });

        this.emojiPlugin = createEmojiPlugin({
            theme: emojiTheme
        });

        const blocks = convertFromRaw(rawContent);

        this.state = {
            editorState: EditorState.createWithContent(blocks),
            suggestions: mentions,
            hashSuggestions: Hashs,
        };
    }
    componentDidMount() {

    }

    addMention = () => {
        const { editorState } = this.state;
        const currentContent = editorState.getCurrentContent();
        const contentStateWithEntity = currentContent.createEntity(
            'mention',
            'IMMUTABLE',
            {
                avatar: "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg",
                link: "https://twitter.com/mrussell247",
                name: "Matthew Russell",
            }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const currentSelectionState = editorState.getSelection();
        // const textWithEntity = Modifier.insertText(contentStateWithEntity, selection, '@Matthew Russell', null, entityKey);
        let mentionReplacedContent = Modifier.replaceText(
            editorState.getCurrentContent(),
            currentSelectionState,
            '@Matthew Russell',
            null, // no inline style needed
            entityKey
        );
        this.setState({ editorState: EditorState.push(editorState, mentionReplacedContent, 'insert-mention') });
    };

    logState = () => {
        const content = this.state.editorState.getCurrentContent();
        console.log(convertToRaw(content));
    };

    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    onSearchChange = ({ value }) => {
        this.setState({
            suggestions: defaultSuggestionsFilter(value, mentions),
        });
    };

    onHashSearchChange = ({ value }) => {
        this.setState({
            hashSuggestions: Hashs.filter(hash => (hash.key.indexOf(value) !== -1)),
        });
    }

    onAddMention = (mention) => {
        // get the mention object selected
        console.log('onAddMention', mention);
    }
    onAddHash = (mention) => {
        console.log('onAddHash', mention);
        const { editorState } = this.state;
        const currentContent = editorState.getCurrentContent();
        const contentStateWithEntity = currentContent.createEntity(
            '#mention',
            'MUTABLE',
            mention
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const currentSelectionState = editorState.getSelection();

        //_____________
        const anchorKey = currentSelectionState.getAnchorKey();
        const anchorOffset = currentSelectionState.getAnchorOffset();
        const currentBlock = currentContent.getBlockForKey(anchorKey);
        const blockText = currentBlock.getText();
        const start = blockText.lastIndexOf('#');

        const mentionTextSelection = currentSelectionState.merge({
            anchorOffset: start,
            focusOffset: blockText.length,
        })

        //_____________


        // const textWithEntity = Modifier.insertText(contentStateWithEntity, selection, '@Matthew Russell', null, entityKey);
        let mentionReplacedContent = Modifier.replaceText(
            editorState.getCurrentContent(),
            mentionTextSelection,
            mention.content,
            null, // no inline style needed
            entityKey
        );

        setTimeout(() => {
            const preEditorState = EditorState.redo(editorState);
            this.setState({ editorState: EditorState.push(preEditorState, mentionReplacedContent, 'insert-mention') });
        })

    };
    focus = () => {
        this.editor.focus();
    };

    render() {
        const { MentionSuggestions } = this.mentionPlugin;
        const { MentionSuggestions: HashSuggestions} = this.hashPlugin;
        const { EmojiSuggestions, EmojiSelect } = this.emojiPlugin;
        const plugins = [this.mentionPlugin, this.hashPlugin,this.emojiPlugin];

        return (
            <div className="editor-page">
                <button onClick={this.logState}>log content</button>
                <button onClick={this.addMention}>add mention</button>
                <EmojiSelect />

                <div className='my-editor' onClick={this.focus}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => { this.editor = element; }}
                    />
                    <MentionSuggestions
                        onSearchChange={this.onSearchChange}
                        suggestions={this.state.suggestions}
                        onAddMention={this.onAddMention}
                    />
                    <HashSuggestions
                        onSearchChange={this.onHashSearchChange}
                        suggestions={this.state.hashSuggestions}
                        onAddMention={this.onAddHash}
                        entryComponent={HashEntry}
                    />
                    <EmojiSuggestions />
                </div>
            </div>
        );
    }
}

export default MyEditor;