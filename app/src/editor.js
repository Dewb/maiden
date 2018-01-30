import React, { Component } from 'react';
import AceEditor from 'react-ace';

import './editor.css';

import 'brace/mode/lua';
import 'brace/theme/dawn';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.modified = false;
    }

    onLoad = (editor) => {
        // grab reference to ace editor
        this.editor = editor;
        /*
        if (this.refs.ace) {
            window.setTimeout(() => {
                this.refs.ace.editor.focus();
                console.log("OL focused on", this.refs.ace.editor)
            }, 3);
        }
        */
    }

    onChange = (event) => {
        if (!this.modified) {
            this.modified = true;
            // we are consuming the first change, propagate the now modified buffer up
            this.props.scriptChange(this.props.bufferName, event);
        }
    }

    getValue = () => {
        return this.editor.getValue();
    }

    bufferWillSave = (bufferName) => {
        if (bufferName !== this.props.bufferName) {
            console.log('buffer save mismatch ', bufferName, ' vs ', this.props.bufferName)
        }
        this.props.scriptChange(this.props.bufferName, this.getValue())
    }

    bufferWasSaved = (bufferName) => {
        if (this.props.bufferName === bufferName) {
            // MAINT: the edit-view takes care of the modified flag on the buffer state and should call this method to in order to enable dirty
            this.modified = false;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.bufferName !== this.props.bufferName && this.modified) {
            // active buffer is being changed, sync current value to parent view before the editor is re-rendered
            this.props.scriptChange(this.props.bufferName, this.getValue())

            // reset dirty flag so that any change will mark (or remark) the buffer as dirty
            this.modified = false;

            // MAINT: work around a react-ace behavior; it restores the selection when the editor value prop changes but that means the selection is retained when switching between buffers too.
            this.editor.clearSelection();

            // MAINT: really lame, undo stack is global to the single wrapped editor so it extends across buffer switching. call undo repeatly will result in buffer switch (confusingly)
            this.editor.getSession().getUndoManager().reset();
        }
    }

    /*
    componentDidMount = () => {
        // this.editor.focus()
        window.setTimeout(() => {
            this.refs.ace.editor.focus();
            console.log("CDM focused on", this.refs.ace.editor)
        }, 3);

        //this.refs.ace.editor.focus();

    }
    */

    render () {
        const width = `${this.props.width}px`;
        const height = `${this.props.height}px`;

        return (
            <AceEditor
                ref="ace"
                mode="lua"
                theme="dawn"
                width={width}
                height={height}
                value={this.props.value}
                onLoad={this.onLoad}
                onChange={this.onChange}
                editorProps={{
                    $blockScrolling: Infinity
                }}
            />
        );
    }
}

export default Editor;