import {StyleSheet} from 'react-native'

export const color = {
    statusBarColor: '#999',
    borderColor: '#aaa',
    primaryColor: 'rgb(0,100,0)',
    disableColor: 'rgba(0,100,0,.5)',
    errorColor: 'rgb(200,0,0)'
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#fff',
    },
    padding: {
        padding: 15
    },
    backgroundWhite:{
        backgroundColor: '#fff'
    },
    text: {
        color: 'rgb(0,100,0)', //'#000',
        fontSize: 24
    },
    centerHorizontally: {
        alignItems: 'center'
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoLoginText:{
        height: 40,
        width: 200,
        resizeMode: 'stretch'
    },
    logoLogin: {
        width:80,
        height: 80
    },
    input: {
        height: 42,
        width: 'auto',
        marginVertical: 6,
        borderWidth: 1,
        padding: 10,
        color: '#000',
        borderColor: color.borderColor,
        borderRadius: 5
    },
    errorColor: {
        color: color.errorColor,
    },
    errorInput: {
        color: color.errorColor,
        marginBottom: 4
    },
    btnPrimary: {
        alignItems: 'center',
        backgroundColor: color.primaryColor,
        padding: 10,
        marginVertical: 4,
        width: 'auto',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: color.primaryColor
    },
    disableColor: {
        backgroundColor: color.disableColor,
        borderColor: color.disableColor
    }
});

export default styles
