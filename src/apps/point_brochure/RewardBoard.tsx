import React, { useState, useEffect } from "react";
import {
	makeStyles,
	createStyles,
	withStyles,
	Theme,
} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import { IBrochure } from "./IBrochures";

const BorderLinearProgress = withStyles((theme: Theme) =>
	createStyles({
		root: {
			height: 10,
			borderRadius: 5,
		},
		colorPrimary: {
			backgroundColor:
				theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
		},
		bar: {
			borderRadius: 5,
			backgroundColor: theme.palette.primary.light,
		},
	})
)(LinearProgress);

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

export default ({
	brochures = [
		{
			50: {
				reward: "asfd",
			},
			100: {
				reward: "asdff",
			},
			200: {
				reward: "dgs",
			},
		},
	],
	totalPoints = 120,
}: {
	totalPoints: number;
	brochures?: IBrochure[];
}) => {
	const classes = useStyles();

	// 后续增加手册切换功能
	const currentBrochure = brochures[0];

	const pointSets = Object.keys(currentBrochure);

	const [currentShowing, setCurrentShowing] = useState<number>(0);

	useEffect(() => {
		for (let i in pointSets) {
			let index: number = parseInt(i);
			if (
				totalPoints >= parseInt(pointSets[index]) &&
				totalPoints < parseInt(pointSets[index + 1])
			) {
				setCurrentShowing(index);
				return;
			}
		}
	}, [totalPoints]);

	// Ts无法限制数字范围 https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range

	const currentGoal = pointSets[currentShowing],
		currentReward = currentBrochure[currentGoal].reward,
		currentProgress: number = (totalPoints / parseInt(currentGoal)) * 100;

	const minCon: boolean = currentShowing > 0,
		maxCon: boolean = currentShowing < pointSets.length - 1;

	const switchPrevious = () => {
		if (minCon) setCurrentShowing(currentShowing - 1);
	};

	const switchNext = () => {
		if (maxCon) setCurrentShowing(currentShowing + 1);
	};

	return (
		<>
			<Card className={classes.padding} component={Paper}>
				<Typography variant="h5">
					<CardGiftcardIcon />
					{currentReward}
				</Typography>
				<Typography variant="caption">{`${totalPoints}/${currentGoal}`}</Typography>
				<br />
				<BorderLinearProgress
					variant="determinate"
					value={currentProgress}
				/>
				<br />
				<div className={classes.actions}>
					<Button
						disabled={!minCon}
						onClick={switchPrevious}
						startIcon={<KeyboardArrowLeftIcon />}
					></Button>
					<Button
						disabled={!maxCon}
						onClick={switchNext}
						endIcon={<NavigateNextIcon />}
					>
						下一个
					</Button>
				</div>
			</Card>
		</>
	);
};
