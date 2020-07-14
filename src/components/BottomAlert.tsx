import React from 'react';
import { JQ } from 'mdui'

/**
 * @name 底部弹出菜单
 * 在640Px以上的屏幕会呈现为普通div元素
 */

export default class extends React.Component<Readonly<{
    /** 是否显示 */
    ifShow: boolean;
    /** 标题 */
    title: string;
    onClose(): void;
    children: any;
    height?: string
}>, {}>{
    close() {
        this.props.onClose()
        JQ.hideOverlay(true);
    }
    componentDidUpdate() {
        if (this.props.ifShow) {
            document.getElementsByClassName('mdui-overlay')[0].addEventListener('click', this.close.bind(this))
        }
    }
    render() {
        const { ifShow, title, children } = this.props;
        if (window.innerWidth <= 640 && ifShow) {
            JQ.showOverlay(1001);//刚好超过头部
        }
        !ifShow && JQ.hideOverlay();
        //用return null会每次重载图片
        return (
            <div style={{ bottom: ifShow ? '0' : `-90%`}} className="mdui-card bottom-alert bottom-dashboard">
                <div className="mdui-hidden-sm-up mdui-card-media">
                    <div className="mdui-card-menu">
                        <button
                            onClick={this.close.bind(this)}
                            className="mdui-btn mdui-btn-icon">
                            <i className="mdui-icon material-icons">close</i>
                        </button>
                    </div>
                </div>
                <div
                    style={{ padding: '15px 16px 16px 16px' }}
                    className="mdui-card-primary">
                    <div className="mdui-card-primary-title">{title}</div>
                </div>
                <div className="main">
                    {children}
                </div>
                <div className="mdui-card-actions">
                    {/** TODO */}
                </div>
            </div>
        )
    }
}