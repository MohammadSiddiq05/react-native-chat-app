import { styles } from "@/assets/styles/AuthScreen.styles";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { SvgXml } from "react-native-svg";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

type Mode = "login" | "register";

export default function AuthScreen() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verficationCode, setVerficationCode] = useState("");
  const [loading, setLaoding] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const router = useRouter();

    const handleSubmit = async () =>{
        setLaoding(true)
        setTimeout(()=>{
            setLaoding(false)
            setVerifying(true)
        },1500)
    }

    const handleVerify = async () => {
        setLaoding(true)
        setTimeout(()=>{
            setLaoding(false)
            router.replace("/(tabs)")
        },1500)
    }

  const svgMarkup = `<svg width="62" height="53" viewBox="0 0 62 53" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35.809 0c14.464 0 26.19 11.726 26.19 26.19s-11.726 26.192-26.19 26.192c-.983 0-1.89-.052-2.727-.148V.176A20 20 0 0 1 35.809 0M2.727 0c14.464 0 26.19 11.726 26.19 26.19S17.191 52.382 2.727 52.382Q1.254 52.38 0 52.234V.176A20 20 0 0 1 2.727 0" fill="#fff"/></svg>`;

  if (verifying) {
    return (
        <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* logo */}
          <View style={styles.logoRow}>
            <LinearGradient
              colors={[Colors.primary, Colors.primaryContainer]}
              style={styles.logoBox}
            >
              <SvgXml xml={svgMarkup} width="50%" height="50%" />
            </LinearGradient>
            <Text style={styles.appName}>Chatly</Text>
          </View>

          {/* Hero Text*/}
          <Text style={styles.heading}>
            Verify Email
          </Text>
          <Text style={styles.subheading}>
           We have sent a 6-digit verficationCode to {email}
          </Text>

          {/* form */}
          <View style={styles.form}>
           
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>verfication Code</Text>
              <TextInput
                style={styles.input}
                value={verficationCode}
                onChangeText={setVerficationCode}
                placeholder="Enter 6-digit code"
                placeholderTextColor={Colors.outlineVariant}
                keyboardType="number-pad"
                autoCapitalize="none"
              />
            </View>

        {/* Back to sign up link */}
            <View style={styles.toggleRow}>
                <Text style={styles.toggleText}>Did not receive a code?</Text>
                <TouchableOpacity onPress={()=> setVerifying(false)}>
                    <Text style={styles.toggleLink}>GO back</Text>
                </TouchableOpacity>
            </View>

            {/* submit */}
            <TouchableOpacity
              onPress={handleVerify}
              disabled={loading}
              activeOpacity={0.88}
              style={styles.btnWrapper}
            >
              <LinearGradient
                colors={[Colors.primary, Colors.primaryContainer]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.btn}
              >
                {loading ? (
                  <ActivityIndicator color={Colors.primary} size="small" />
                ) : (
                  <>
                    <Text style={styles.btnText}>
                        Veridy Code
                    </Text>
                    <Ionicons
                      name="arrow-forward"
                      size={18}
                      color={Colors.onPrimary}
                    />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* logo */}
          <View style={styles.logoRow}>
            <LinearGradient
              colors={[Colors.primary, Colors.primaryContainer]}
              style={styles.logoBox}
            >
              <SvgXml xml={svgMarkup} width="50%" height="50%" />
            </LinearGradient>
            <Text style={styles.appName}>Chatly</Text>
          </View>

          {/* Hero Text*/}
          <Text style={styles.heading}>
            {mode === "login" ? "Welcome Back" : "Create account"}
          </Text>
          <Text style={styles.subheading}>
            {mode === "login"
              ? "Sign in to continue chatting"
              : "Fill in your details to get started."}
          </Text>

          {/* form */}
          <View style={styles.form}>
            {mode === "register" && (
              <>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Your name"
                    placeholderTextColor={Colors.outlineVariant}
                    autoCapitalize="words"
                  />
                </View>

                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Username Handle</Text>
                  <View style={styles.handleRow}>
                    <Text style={styles.atSign}>@</Text>
                    <TextInput
                      style={[styles.input, styles.handleInput]}
                      value={handle}
                      onChangeText={(v) =>
                        setHandle(v.toLowerCase().replace(/\s/g, ""))
                      }
                      placeholder="username"
                      placeholderTextColor={Colors.outlineVariant}
                      autoCapitalize="none"
                    />
                  </View>
                </View>
              </>
            )}

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor={Colors.outlineVariant}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="•••••••"
                placeholderTextColor={Colors.outlineVariant}
                secureTextEntry
              />
            </View>

            {/* ToggleMode */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>
                {mode === "login"
                  ? "Don't have an account"
                  : "Already have an account"}
              </Text>
              <TouchableOpacity
                onPress={() => setMode(mode === "login" ? "register" : "login")}
              >
                <Text style={styles.toggleLink}>
                  {mode === "login" ? "Sign up" : "Sign in"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* submit */}
            <TouchableOpacity
                onPress={handleSubmit}
              disabled={loading}
              activeOpacity={0.88}
              style={styles.btnWrapper}
            >
              <LinearGradient
                colors={[Colors.primary, Colors.primaryContainer]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.btn}
              >
                {loading ? (
                  <ActivityIndicator color={Colors.primary} size="small" />
                ) : (
                  <>
                    <Text style={styles.btnText}>
                      {mode === "login" ? "Sign in" : "Create account"}
                    </Text>
                    <Ionicons
                      name="arrow-forward"
                      size={18}
                      color={Colors.onPrimary}
                    />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
