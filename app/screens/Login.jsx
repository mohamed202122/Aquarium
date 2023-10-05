import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

import { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { AUTH } from "../../DB/FirebaseConfig";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [porder, setPorder] = useState("grey");
  const [porder2, setPorder2] = useState("grey");
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(AUTH, (user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    return await createUserWithEmailAndPassword(AUTH, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
      })
      .catch((error) => alert(error.message));
  };
  const forgetPassword = async () => {
    return await sendPasswordResetEmail(AUTH, email)
      .then(() => {
        alert("email sent!");
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = async () => {
    return await signInWithEmailAndPassword(AUTH, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          label={"Email"}
          mode="outlined"
          keyboardType={"email-address"}
          style={{ marginTop: 30, backgroundColor: "#eceff1" }}
          value={email}
          onChangeText={setEmail}
          outlineStyle={{ borderColor: porder, borderRadius: 10, color: "red" }}
          left={<TextInput.Icon icon="email" />}
          onFocus={() => {
            setPorder("blue");
          }}
          onBlur={() => {
            setPorder("grey");
          }}
          activeOutlineColor={"blue"}
        />
        <TextInput
          label={"password"}
          mode="outlined"
          style={{ marginTop: 20, backgroundColor: "#eceff1" }}
          value={password}
          onChangeText={setPassword}
          outlineStyle={{ borderColor: porder2, borderRadius: 10 }}
          secureTextEntry={!showPasswordIcon}
          activeOutlineColor={"blue"}
          left={<TextInput.Icon icon="lock" />}
          right={
            <TextInput.Icon
              icon={showPasswordIcon ? "eye-off" : "eye"}
              onPress={() => setShowPasswordIcon(!showPasswordIcon)}
              iconColor="grey"
            />
          }
          onFocus={() => {
            setPorder2("blue");
          }}
          onBlur={() => {
            setPorder2("grey");
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={forgetPassword}
          style={[styles.button, styles.buttonOutline, { margin: 20 }]}
        >
          <Text style={styles.buttonOutlineText}>Forget password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
