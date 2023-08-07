import { StyleSheet } from "react-native";

export const commonStyle = StyleSheet.create({
    title: {
        paddingTop: 7,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 2.5,
        marginTop: 5,
        color: '#999999',
        fontWeight: 'bold',
    },
    form: {
        height: 50,
        borderColor: '#d9d9d9',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        paddingLeft: 15,
    },
    btn: {
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 20,
        color: 'white',
        backgroundColor: '#6487b7',
        borderRadius: 5,
        fontSize: 15,
    },
    active: {
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 20,
        color: 'white',
        backgroundColor: '#1c4587',
        borderRadius: 5,
        fontSize: 15,
    },
    error: {
        flex: 1,
        padding: 7,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 2.5,
        marginTop: 5,
        color: '#cc0000',
        fontWeight: 'bold',
        textAlign: 'right',
    },
    bottomTextContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#1c4587',
      },
      bottomText: {
        flex: 1,
        fontSize: 18,
        color: 'white',
        marginLeft: 44,
      },
})