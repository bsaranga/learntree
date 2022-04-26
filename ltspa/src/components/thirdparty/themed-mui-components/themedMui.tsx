import { createTheme, TextField, ThemeProvider } from '@mui/material';
import IGenericProp from '../../../interfaces/IGenericProp';

const theme = createTheme({
	palette: {
		primary: {
			light: '#757ce8',
			main: '#3f50b5',
			dark: '#002884',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000',
		},
	},
	typography: {
		fontFamily: [
			'ui-sans-serif', 
			'system-ui', 
			'-apple-system', 
			'BlinkMacSystemFont', 
			'Segoe UI', 
			'Roboto', 
			'Helvetica Neue', 
			'Arial', 
			'Noto Sans', 
			'sans-serif', 
			'Apple Color Emoji', 
			'Segoe UI Emoji', 
			'Segoe UI Symbol', 
			'Noto Color Emoji'
		].join(','),
		fontSize: 10
	},
	spacing: 1
});

function MultiLineText(props: IGenericProp) {
	const className = props.className;
	return(
		<div className={className}>
			<ThemeProvider theme={theme}>
				<TextField
					id="standard-textarea"
					label="Add comment"
					multiline
					variant="standard"
					fullWidth={true}
					margin="dense"
					size='small'
					sx={{
						padding: 0,
						marginTop: 0,
						marginBottom: 0
					}}
				/>
			</ThemeProvider>
		</div>
	);
}


export {MultiLineText};