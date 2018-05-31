import React, { Component } from 'react';
import Icon from './icon';
import ReactTooltip from 'react-tooltip';
import './icon-button.css';

// TODO:
//  * add hover style
//  * add selected style

class IconButton extends Component {
    handleClick = () => {
        if (!this.props.disabled) {
            this.props.action()
        }
    }

    getColor = () => {
        if (this.props.disabledColor && this.props.disabled) {
            return this.props.disabledColor;
        }
        return this.props.color;
    }

    render() {
        let style = { padding: this.props.padding || 6 };
        let color = this.getColor();
        let tooltipPosition = this.props.tooltipPosition || "bottom";
        
        function guid() {
            function s4() {
              return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
        
        let uniqueId = guid();

        // TODO: remove this once everything is a "component"
        let graphic;
        if (this.props.path) {
            graphic = (<Icon icon={this.props.path} size={this.props.size} color={color}/>);
        } else {
            let IconComponent = this.props.icon;
            // console.log("inc: ", IconComponent);
            graphic = (<IconComponent width={this.props.size} height={this.props.size} color={color}/>);
            // graphic = (<div/>);
        }

        return (
            <button
                className="icon-button"
                onClick={this.handleClick}
                data-tip={this.props.tooltipMessage}
                data-place={this.props.tooltipMessage && tooltipPosition}
                data-for={this.props.tooltipMessage && uniqueId}
                style={style}
            >
                {graphic}
                {this.props.tooltipMessage && <ReactTooltip id={uniqueId} effect="solid" delayShow={1000} delayHide={500} className="customTooltip"></ReactTooltip>}
            </button>
        );
    }
};

export default IconButton;