import { useState, useEffect } from "react";
import {
	makeStyles,
	createStyles,
	withStyles,
	Theme,
} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import TaskLists from "./TaskLists";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CreateTask from "./CreateTask";
import RewardBoard from "./RewardBoard";
import { db } from "./db";
import { ITaskItem } from "./ITaskItem";
import { IBrochure } from "./IBrochures";

const DEFAULT_TITLE = "无标题";

// Inspired by the former Facebook spinners.
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		padding: {
			padding: theme.spacing(2),
		},
		addAction: {
			right: theme.spacing(3),
			bottom: theme.spacing(3),
			position: "fixed",
		},
		actions: {
			display: "flex",
			justifyContent: "space-between",
		},
	})
);

// TODO 积分手册工具https://github.com/dfahlander/Dexie.js/tree/master/samples/react/src
const App = () => {
	const classes = useStyles();
	const [tasks, setTasks] = useState<ITaskItem[]>([]);
	const [rewards, setRewards] = useState<IBrochure[]>([]);

	useEffect(() => {
		db.table("tasks")
			.toArray()
			.then((tasks) => {
				setTasks(tasks);
			});
	}, []);

	const addTask = (title = DEFAULT_TITLE, point = 10) => {
		const todo: ITaskItem = {
			title,
			done: true,
			point,
		};
		db.table("tasks")
			.add(todo)
			.then((id) => {
				const newList = [...tasks, Object.assign({}, todo, { id })];
				setTasks(newList);
			});
	};

	const sum =
		tasks
			.filter((task) => task.done)
			.map((task) => task.point)
			.reduce((a = 0, b = 0) => a + b, 0) || 0;

	console.log(sum);

	return (
		<>
			<RewardBoard totalPoints={sum} />
			<br />
			<TaskLists tasks={tasks} />
			<Fab
				size="small"
				color="secondary"
				aria-label="add"
				className={classes.addAction}
				onClick={() => addTask("bia")}
			>
				<AddIcon />
			</Fab>
			<CreateTask />
		</>
	);
};

export default App;
