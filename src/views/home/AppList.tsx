import React from "react";
import { Link } from "react-router-dom";
import applist from "../../data/appData";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import ListSubheader from "@material-ui/core/ListSubheader";
import BurstModeIcon from "@material-ui/icons/BurstMode";
import BrightnessAutoTwoToneIcon from "@material-ui/icons/BrightnessAutoTwoTone";
import CodeTwoToneIcon from "@material-ui/icons/CodeTwoTone";
import LinkTwoToneIcon from "@material-ui/icons/LinkTwoTone";
import WbSunnyTwoToneIcon from "@material-ui/icons/WbSunnyTwoTone";
import Paper from "@material-ui/core/Paper";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
			// backgroundColor: theme.palette.background.paper,
		},
		nested: {
			paddingLeft: theme.spacing(4),
		},
		appItem:{
			height: "90px",
		},
		[theme.breakpoints.up("sm")]: {
			appItem: {
				height: "100px",
			},
		},
		appItemIcon: {
			// height: "50px",
		},
		appItemText: {
			paddingLeft: "20px",
			fontWeight: 700,
		}
	})
);

// TODO schema info check https://schema.org
const AppListItem = ({
	isActive,
	channel,
	name,
	link,
	description,
	selected,
	icon,
}: {
	description?: string;
	name: string;
	isActive?: boolean;
	link?: string;
	selected?: boolean;
	channel?: number;
	icon?: string;
}) => {
	const classes = useStyles();
	const attr =
		channel === 5
			? {
					href: link,
					target: "_blank",
					component: "a",
					rel: "noopener noreferrer",
			  }
			: {
					component: Link,
					to: "/app/" + link,
			  };
	return (
		<Card>
			<ListItem
			className={classes.appItem}
				selected={selected}
				button
				key={name}
				{...attr}
			>
				<ListItemAvatar className={classes.appItemIcon}>
					<Avatar imgProps={{
						loading: "lazy"
					}} variant="rounded" alt={name} src={icon} />
				</ListItemAvatar>
				<ListItemText
					className={classes.appItemText}
					inset
					primary={name}
					secondary={description}
				/>
			</ListItem>
		</Card>
	);
};

//分类栏目
const MakeChannels = ({
	data: { name, apps, Icon },
}: {
	data: { name: string; apps: IApp[]; Icon: JSX.Element | JSX.Element[] };
}) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<>
			<ListItem button onClick={handleClick}>
				<ListItemIcon>{Icon}</ListItemIcon>
				<ListItemText primary={name} />
				{/* {open ? <ExpandLess /> : <ExpandMore />} */}
			</ListItem>
			{/* <Collapse in={open} timeout="auto" unmountOnExit> */}
			<List component="div" disablePadding>
				<Grid container spacing={1}>
					{apps.map((app: any) => (
						<Grid key={app.name} item sm={6} xl={4} xs={12}>
							<AppListItem {...app} />
						</Grid>
					))}
				</Grid>
			</List>
			{/* </Collapse> */}
		</>
	);
};

const getChannelName = (index: any) =>
	["AI人工智能", "图片视频", "编程开发", "生活常用", "第三方工具&友情链接"][
		index - 1
	];

const getChannelIcon = (index: any) => {
	const Icons = [
		<BrightnessAutoTwoToneIcon />,
		<BurstModeIcon />,
		<CodeTwoToneIcon />,
		<WbSunnyTwoToneIcon />,
		<LinkTwoToneIcon />,
	];
	return Icons[index - 1];
};

const AppList = () => {
	const classes = useStyles();

	var channelType: any = [];

	for (let i = applist.length - 1; i >= 0; i--) {
		let app = applist[i];
		if (!channelType.includes(app.channel)) {
			channelType.unshift(app.channel);
		}
	}

	var data: { name: string; Icon: any; apps: any[] }[] = channelType.map(
		(channel: number) => ({
			name: getChannelName(channel),
			Icon: getChannelIcon(channel),
			apps: applist.filter((app) => app.channel === channel),
		})
	);

	return (
		<List
			aria-labelledby="nested-list-subheader"
			subheader={
				<ListSubheader component="div" id="nested-list-subheader">
					所有工具
				</ListSubheader>
			}
			className={classes.root}
		>
			{data.map((a: any, i: any) => {
				return <MakeChannels key={i} data={a} />;
			})}
		</List>
	);
};

export { AppListItem };
export default AppList;
