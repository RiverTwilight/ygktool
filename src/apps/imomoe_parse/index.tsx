import React from "react";
import { snackbar } from "mdui";
import axios from "../../utils/axios";
import ClipboardJS from "clipboard";
import { Input } from "mdui-in-react";

const VideoList = ({ list }: any) => {
	return list.map((video = "", i: any) => (
		<li
			key={i}
			onClick={() => {
				// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
				window.open(/\$(\S+)\$/.exec(video)[1]);
			}}
			className="mdui-col mdui-list-item mdui-ripple"
		>
			<i className="mdui-color-theme mdui-list-item-avatar mdui-icon material-icons">
				ondemand_video
			</i>
			<div className="mdui-list-item-content">
				<div className="mdui-list-item-title mdui-list-item-one-line">{`第${
					i + 1
				}集`}</div>
				<div className="mdui-list-item-text mdui-list-item-one-line">
					{/*@ts-expect-error*/}
					{/\$(\S+)\$/.exec(video)[1]}
				</div>
			</div>
		</li>
	));
};

const Result = (props: any) => {
	const { src } = props;
	if (!src.length) return null;
	return (
		<ul className="mdui-row-md-2 mdui-list">
			{src.map((source: any, i: any) => (
				<React.Fragment key={i}>
					<li className="mdui-subheader">{`播放源${i + 1}`}</li>

					<VideoList list={source[1]} />

					<div className="mdui-clearfix"></div>
				</React.Fragment>
			))}
		</ul>
	);
};

type ComponentState = any;

export default class extends React.Component<{}, ComponentState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			url: "http://www.imomoe.in/player/7599-0-1.html",
			data: [],
		};
	}
	componentDidMount() {
		var VideoListJson;
		// @ts-expect-error ts-migrate(2454) FIXME: Variable 'clipboard' is used before being assigned... Remove this comment to see the full error message
		clipboard && clipboard.destroy();
		var clipboard = new ClipboardJS(".becopy");
		clipboard.on("success", (e) => {
			snackbar({ message: "已复制链接" });
			e.clearSelection();
		});
	}
	loadCommentsFromServer() {
		window.loadShow();
		const { url } = this.state;
		function loadJosnp() {
			var VideoListJson;
			return new Promise((resolve, reject) => {
				axios
					.get("/api/bangumi?url=" + url)
					.then((response) => {
						console.log(response.data);
						var tag = document.createElement("script");
						tag.innerText = response.data;
						document
							.getElementsByTagName("body")[0]
							.appendChild(tag);
						resolve();
					})
					.catch((error) => {
						snackbar({
							message: error,
						});
					});
			});
		}
		loadJosnp().then(() => {
			window.loadHide();
			// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'VideoListJson'.
			this.setState({ data: VideoListJson });
		});
	}
	render() {
		return (
			<>
				<Input
					autoFocus
					onValueChange={(newText) => {
						this.setState({ url: newText });
					}}
					header="输入视频播放地址(一定是播放地址！)"
					icon="link"
					// @ts-expect-error ts-migrate(2322) FIXME: Type '"link"' is not assignable to type '"number" ... Remove this comment to see the full error message
					type="link"
					value={this.state.url}
				/>

				<button
					onClick={this.loadCommentsFromServer.bind(this)}
					className="mdui-color-theme mdui-ripple mdui-float-right mdui-btn-raised mdui-btn"
				>
					获取
				</button>
				<div className="mdui-clearfix"></div>
				<Result src={this.state.data} />
			</>
		);
	}
}
