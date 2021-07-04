import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import useInput from "../../utils/Hooks/useInput"

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
        fixed: {
            padding: theme.spacing(1),
            position: "relative",
            bottom: 0
        }
	});
});

export default () => {
    const [value, setValue] = useInput("");
    const classes = useStyles();
	return (
		<Paper className={classes.fixed}>
			<FormControl fullWidth>
				<TextField
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchSharpIcon />
							</InputAdornment>
						),
					}}
					autoComplete="on"
					id="search"
					value={value}
					variant="outlined"
					onChange={setValue}
				/>
			</FormControl>
		</Paper>
	);
};
