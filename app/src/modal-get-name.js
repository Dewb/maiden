import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Set } from 'immutable';
import { siblingNamesForResource } from './model/listing';
import IconButton from './icon-button';
import { ICONS } from './svg-icons';
import { INVALID_NAME_CHARS } from './constants';

const mapStateToProps = (state) => {
    const getSiblingNames = (selectedResource) => {
        if (selectedResource) {
            return siblingNamesForResource(state.edit.rootNodes, selectedResource);
        }
        return new Set();
    };
    
    return {
        getSiblingNames,
    };
}

class ModalGetName extends Component {
    constructor(props) {
        super(props)
        this.textArea = undefined
        this.state = {
            showError: false,
            errorMessage: "",
        }

        this.siblingNames = props.getSiblingNames(this.props.selectedResource);
    }
    
    handleKeyDown = (event) => {
        // filter out chars we can't have in names
        if (INVALID_NAME_CHARS.has(event.key)) {
            console.log("character '", event.key, "' not allowed in names")
            event.preventDefault()
            return;
        }

        switch (event.keyCode) {
         case 13:            // return
            event.preventDefault()
            this.complete('ok')
            break;

        case 27:            // escape
            event.preventDefault()
            this.complete('cancel')
            break;

        default:
            break;
        }
    }

    handleOnChange = (event) => {
        if (this.siblingNames.has(this.textArea.value)) {
            this.setState({
                errorMessage: "name already in use",
            })
        } else {
            this.setState({
                errorMessage: "",
            })
        }
    }

    isValidName = (name) => {
        return !this.siblingNames.has(name);
    }

    complete = (choice) => {
        let name = this.textArea.value;
        if (choice === "ok" && !this.isValidName(name)) {
            // prevent completion if name is bad
            return
        }
        this.props.buttonAction(choice, this.textArea.value)
    }

    render() {
        return (
            <div className="modal-content">
            <div className="message-container">
                <span className="message">{this.props.message}</span>
                <p/>
            </div>
            <textarea
                    className="get-name-modal-text-area"
                    ref={(e) => this.textArea = e}
                    placeholder={this.props.initialName || ""}
                    rows="1"
                    maxLength="128"
                    wrap="false"
                    autoFocus="true"
                    onKeyDown={this.handleKeyDown}
                    onChange={this.handleOnChange}
                />
            <div className="get-name-modal-error-message">
                {this.state.errorMessage}
            </div>
            <div className="button-container">
                <IconButton
                    key='cancel'
                    action={() => this.complete('cancel')}
                    path={ICONS['cross']}
                    color="#979797"   // FIXME:
                    size="24"
                />
                <IconButton
                    key='ok'
                    action={() => this.complete('ok')}
                    path={ICONS['check']}
                    color="#979797"   // FIXME:
                    size="30"
                />
            </div>
            </div>
        )
    }
}

// export default ModalGetName;
export default connect(mapStateToProps)(ModalGetName);