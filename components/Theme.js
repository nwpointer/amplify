import { StyleSheet } from 'react-native';

// Colors
export const deepSquidInk = '#152939';
export const linkUnderlayColor = '#FFF';
export const errorIconColor = '#DD3F5B';

// Theme
export default StyleSheet.create({
	container: {
		// flex: 1,
		// flexDirection: 'column',
		// alignItems: 'center',
		// justifyContent: 'space-around',
		// paddingTop: 20,
		width: '100%',
		// backgroundColor: '#FFF'
	},
	scrollContainer: {
		flex: 1,
		// justifyContent: 'center',
		// alignContent: 'center',
		// maxWidth: 600
	},
	section: {
		flex: 1,
		width: '100%',
		padding: 20
	},
	sectionHeader: {
		width: '100%',
		marginBottom: 32
	},
	sectionHeaderText: {
		color: deepSquidInk,
		fontSize: 20,
		fontWeight: '500'
	},
	sectionFooter: {
		width: '100%',
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 15,
		marginBottom: 20
	},
	sectionFooterLink: {
		fontSize: 14,
		color: '#152939',
		alignItems: 'baseline',
		textAlign: 'center'
	},
	navBar: {
		marginTop: 35,
		padding: 15,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	navButton: {
		marginLeft: 12,
		borderRadius: 4
	},
	cell: {
		flex: 1,
		width: '50%'
	},
	errorRow: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	errorRowText: {
		marginLeft: 10
	},
	photo: {
		width: '100%'
	},
	album: {
		width: '100%'
	},
	button: {
		backgroundColor: '#152939',
		alignItems: 'center',
		padding: 16,
		borderRadius: 3,
		flex:1
	},
	buttonDisabled: {
		backgroundColor: '#15293980',
		alignItems: 'center',
		padding: 16
	},
	buttonText: {
		color: '#fff',
		fontSize: 14,
		fontWeight: '600',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	formField: {
		marginBottom: 22
	},
	input: {
		padding: 16,
		borderWidth: 1,
		borderRadius: 3,
		borderColor: '#C4C4C4'
	},
	inputLabel: {
		marginBottom: 8
	},
	phoneContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	phoneInput: {
		flex: 2,
		padding: 16,
		borderWidth: 1,
		borderRadius: 3,
		borderColor: '#C4C4C4'
	},
	picker: {
		flex: 1,
		height: 51
	},
	pickerItem: {
		height: 51
	}
});