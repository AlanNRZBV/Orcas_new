'use client';
import React, { useEffect } from 'react';
import { FormControl, FormGroup, InputLabel, Select, SelectChangeEvent, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

const TaskForm = () => {
	const [age, setAge] = React.useState('');

	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value as string);
	};

	useEffect(() => {}, []);

	return (
		<form>
			<FormGroup>
				<FormControl>
					<TextField id="name" name="name" label="Name" type="text" />
				</FormControl>
				<FormControl>
					<TextField id="description" name="description" label="Description" type="text" />
				</FormControl>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Age</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={age}
						label="Age"
						onChange={handleChange}
					>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
				</FormControl>
			</FormGroup>
		</form>
	);
};

export default TaskForm;
