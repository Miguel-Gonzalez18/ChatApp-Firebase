import { useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from 'react-native'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
const backImage = require("../assets/backImage.jpg");


const Login = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onHandleLogin = () =>{
        if(email !== "" && password !== ""){
            signInWithEmailAndPassword(auth, email, password)
                .then(() => console.log("Login Success"))
                .catch((err) => Alert.alert("Login error", err.message))
        }
    }

    return (
        <View style={styles.container}>
            <Image source={backImage} style={styles.imgBack} />
            <View style={styles.whiteSheet} />

            <SafeAreaView style={styles.form}>
                <Text style={styles.title} >Iniciar sesión</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Intoduzca su correo"
                    autoCapitalize='none'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    value={email}
                    onChangeText={(text)=> setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Intruduzca su contraseña"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    onChangeText={(pass)=> setPassword(pass)}
                />

                <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Iniciar</Text>
                </TouchableOpacity>

                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                    <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>
                        No tienes una cuenta?
                    </Text>
                    <TouchableOpacity onPress={()=> navigation.navigate("Signup")}>
                        <Text style={{color: "#1A3C84", fontWeight: '600', fontSize: 14}}> crea una aquí</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#1A3C84',
        alignSelf: 'center',
        paddingBottom: 24
    },
    imgBack: {
        width: "100%",
        height: 340,
        position: 'absolute',
        top: 0,
        resizeMode: 'cover'
    },
    input: {
        backgroundColor: '#F6F7FB',
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12
    },
    whiteSheet: {
        width: '100%',
        height: '75%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    form: {
        marginTop: 150,
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30
    },
    button: {
        backgroundColor: '#1A3C84',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    }
})

export default Login