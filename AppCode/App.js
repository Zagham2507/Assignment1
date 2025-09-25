import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";

/* -------------------- DEMO DATA -------------------- */

const demoSkills = [
  {
    id: "1",
    user: "zagham",
    userImage: "https://i.ibb.co/L6V2LzX/lego-profile-pic.png",
    rating: "0.0",
    skill: "Full Stack Developer",
    category: "Programming & Tech",
    description: "Learn Web Dev with me",
    lookingFor: "",
  },
  {
    id: "2",
    user: "javeria",
    userImage: "https://i.ibb.co/L6V2LzX/lego-profile-pic.png",
    rating: "0.0",
    skill: "Social Studies",
    category: "Education & Tutoring",
    description: "I can teach social studies upto class 8",
    lookingFor: "Science",
  },
  {
    id: "3",
    user: "hassan",
    userImage: "https://i.ibb.co/L6V2LzX/lego-profile-pic.png",
    rating: "0.0",
    skill: "React Native",
    category: "Programming & Tech",
    description: "Let's build mobile apps together!",
    lookingFor: "UX/UI Design",
  },
];

const initialChats = [
  {
    id: "1",
    name: "zagham",
    lastMsg: "Hey! Interested in React collab?",
    messages: [
      { id: "m1", text: "Hey! Are you still looking for a partner for the React project?", sender: "zagham", time: "10:00" },
      { id: "m2", text: "Yes, I am!", sender: "me", time: "10:02" },
      { id: "m3", text: "Great! I have some experience with React and would love to help.", sender: "zagham", time: "10:05" },
    ],
  },
  {
    id: "2",
    name: "javeria",
    lastMsg: "Sure, let's schedule a call.",
    messages: [
      { id: "m4", text: "Hi, I saw your post. I'm looking to learn social studies.", sender: "me", time: "09:00" },
      { id: "m5", text: "That's great! Let's schedule a call this week to discuss a plan.", sender: "javeria", time: "09:10" },
    ],
  },
  {
    id: "3",
    name: "hassan",
    lastMsg: "I can help you with UI design.",
    messages: [
      { id: "m6", text: "I need some help with UI design for my new app. Can you help?", sender: "me", time: "08:00" },
      { id: "m7", text: "Yes, I can. What kind of design are you looking for?", sender: "hassan", time: "08:10" },
    ],
  },
];

const PROFILE_OPTIONS = [
  { id: "1", icon: "heart-outline", title: "Favourites" },
  { id: "2", icon: "download-outline", title: "Downloads" },
  { id: "3", icon: "language-outline", title: "Languages" },
  { id: "4", icon: "location-outline", title: "Location" },
  { id: "5", icon: "wallet-outline", title: "Subscription" },
  { id: "6", icon: "laptop-outline", title: "Display" },
  { id: "7", icon: "trash-outline", title: "Clear Cache" },
  { id: "8", icon: "time-outline", title: "Clear History" },
];

/* -------------------- LOGIN SCREEN -------------------- */

const LoginScreen = ({ onLogin, onSignupPress }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={mainStyles.container}>
      <View style={mainStyles.cardContainer}>
        <View style={mainStyles.logoContainer}>
          <Image
            source={{
              uri: "https://play-lh.googleusercontent.com/yVphJwxijwV131_Tv2BS3OaWP-qTJqwls-2ReOmORfUo7ZZFMmbfLj1W_wEWAHDnoQ",
            }}
            style={mainStyles.logo}
          />
        </View>
        <Text style={mainStyles.formTitle}>Log In</Text>

        <TextInput
          style={mainStyles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
        />

        <View style={mainStyles.passwordContainer}>
          <TextInput
            style={mainStyles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={mainStyles.eyeButton}
          >
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={mainStyles.loginButton}
          onPress={() => onLogin({ email })}
        >
          <Text style={mainStyles.loginButtonText}>LOG IN</Text>
        </TouchableOpacity>

        <Text style={mainStyles.signupSentence}>
          Don’t have an account?{" "}
          <Text style={mainStyles.signupLink} onPress={onSignupPress}>
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
};

/* -------------------- SIGNUP -------------------- */

const SignupScreen = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={mainStyles.container}>
      <View style={mainStyles.cardContainer}>
        <Text style={mainStyles.formTitle}>Sign Up</Text>
        <TextInput
          style={mainStyles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={mainStyles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={mainStyles.loginButton} onPress={onBack}>
          <Text style={mainStyles.loginButtonText}>SUBMIT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onBack} style={mainStyles.backButton}>
          <Text style={mainStyles.backButtonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* -------------------- FEED -------------------- */

const SkillsFeedScreen = ({ onNavigate, onOpenChatFromFeed }) => {
  const renderSkillCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => onOpenChatFromFeed(item)}
      style={feedStyles.card}
    >
      <View style={feedStyles.cardHeader}>
        <Image source={{ uri: item.userImage }} style={feedStyles.userImage} />
        <View style={feedStyles.userInfo}>
          <Text style={feedStyles.userName}>{item.user}</Text>
          <View style={feedStyles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={feedStyles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <TouchableOpacity style={feedStyles.categoryTag}>
          <Text style={feedStyles.categoryText}>{item.category}</Text>
        </TouchableOpacity>
      </View>
      <Text style={feedStyles.cardTitle}>{item.skill}</Text>
      <Text style={feedStyles.cardSubtitle}>{item.description}</Text>
      {item.lookingFor ? (
        <Text style={feedStyles.lookingForText}>
          <Text style={{ fontWeight: "bold" }}>Looking for:</Text>{" "}
          {item.lookingFor}
        </Text>
      ) : null}
    </TouchableOpacity>
  );

  return (
    <View style={feedStyles.container}>
      <View style={feedStyles.header}>
        <View style={feedStyles.headerRow}>
          <View style={feedStyles.headerIcons}>
            <Ionicons name="swap-horizontal" size={24} color="#fff" />
            <Text style={feedStyles.headerTitle}>SkillSwap</Text>
          </View>
          <TouchableOpacity onPress={() => onNavigate({ name: "profile" })}>
            <Ionicons name="person-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <TextInput
          style={feedStyles.searchInput}
          placeholder="Search skills or users..."
          placeholderTextColor="#aaa"
        />
      </View>

      <FlatList
        data={demoSkills}
        renderItem={renderSkillCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <View style={feedStyles.bottomNav}>
        <TouchableOpacity
          style={feedStyles.navItem}
          onPress={() => onNavigate({ name: "feed" })}
        >
          <Ionicons name="swap-horizontal-outline" size={24} color="#7c3aed" />
          <Text style={feedStyles.navText}>Swaps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={feedStyles.navItem}
          onPress={() => onNavigate({ name: "conversations" })}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="gray" />
          <Text style={feedStyles.navText}>Conversations</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={feedStyles.navItem}
          onPress={() => onNavigate({ name: "profile" })}
        >
          <Ionicons name="person-outline" size={24} color="gray" />
          <Text style={feedStyles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* -------------------- CONVERSATIONS -------------------- */

const ConversationsScreen = ({ onBack, chats, onSelectChat, onDeleteChat }) => {
  const confirmDelete = (chat) => {
    Alert.alert(
      "Delete conversation",
      `Delete the conversation with ${chat.name}? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => onDeleteChat(chat.id) },
      ]
    );
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onSelectChat(item)}
      style={feedStyles.card}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
          <Text style={{ color: "#666" }}>{item.lastMsg}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => confirmDelete(item)} style={{ marginLeft: 10 }}>
            <Ionicons name="trash-outline" size={22} color="#c00" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={feedStyles.container}>
      <View style={feedStyles.header}>
        <View style={feedStyles.headerRow}>
          <TouchableOpacity onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={feedStyles.headerTitle}>Conversations</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
};

/* -------------------- CHAT SCREEN -------------------- */

const ChatScreen = ({ onBack, chat, onSendMessage, onUpdateLastMsg }) => {
  const [messages, setMessages] = useState(chat.messages || []);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // If chat prop changes (navigating to different chat), update local messages
    setMessages(chat.messages || []);
  }, [chat]);

  const handleSend = () => {
    const text = newMessage.trim();
    if (!text) return;
    const msg = {
      id: Date.now().toString(),
      text,
      sender: "me",
      time: new Date().toLocaleTimeString().replace(/:\d+ /, " "),
    };
    const updated = [...messages, msg];
    setMessages(updated);
    setNewMessage("");
    onSendMessage(chat.id, updated);
    onUpdateLastMsg(chat.id, text);
  };

  const renderMessage = ({ item }) => (
    <View style={[
      chatStyles.messageBubble,
      item.sender === "me" ? chatStyles.myMessage : chatStyles.otherMessage,
    ]}>
      <Text style={chatStyles.messageText}>{item.text}</Text>
      <Text style={{ fontSize: 11, color: "#666", marginTop: 6, textAlign: item.sender === "me" ? "right" : "left" }}>{item.time || ""}</Text>
    </View>
  );

  // Show messages in normal order; use contentContainerStyle to push to bottom
  return (
    <KeyboardAvoidingView
      style={chatStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <View style={chatStyles.header}>
        <TouchableOpacity onPress={onBack} style={chatStyles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={chatStyles.headerTitle}>{chat.name}</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ padding: 12, paddingBottom: 20 }}
      />

      <View style={chatStyles.inputContainer}>
        <TextInput
          style={chatStyles.textInput}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={handleSend} style={chatStyles.sendButton}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

/* -------------------- PROFILE & EDIT PROFILE -------------------- */

const ProfileScreen = ({ onLogout, onBack, onNavigate, profileData }) => {
  const renderOptionItem = ({ item }) => (
    <TouchableOpacity style={profileStyles.listItem}>
      <View style={profileStyles.listItemLeft}>
        <Ionicons name={item.icon} size={22} color="#333" style={profileStyles.listIcon} />
        <Text style={profileStyles.listTitle}>{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={22} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={profileStyles.container}>
      <View style={profileStyles.header}>
        <View style={profileStyles.headerRow}>
          <TouchableOpacity onPress={onBack} style={profileStyles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={profileStyles.headerTitle}>My Profile</Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={profileStyles.profileInfoContainer}>
          <Image source={{ uri: profileData.profileImage || "https://i.ibb.co/6y4sM6X/image.png" }} style={profileStyles.profileImage} />
          <Text style={profileStyles.profileName}>{profileData.name}</Text>
          <Text style={profileStyles.profileEmail}>{profileData.email}</Text>
          <TouchableOpacity style={profileStyles.editButton} onPress={() => onNavigate({ name: "editProfile" })}>
            <Text style={profileStyles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={profileStyles.optionsContainer}>
          <FlatList data={PROFILE_OPTIONS} renderItem={renderOptionItem} keyExtractor={(item) => item.id} scrollEnabled={false} />
        </View>

        <TouchableOpacity style={profileStyles.logoutButton} onPress={onLogout}>
          <View style={profileStyles.listItemLeft}>
            <Ionicons name="log-out-outline" size={22} color="#333" style={profileStyles.listIcon} />
            <Text style={profileStyles.listTitle}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <Text style={profileStyles.appVersion}>App Version 2.2</Text>
    </View>
  );
};

const EditProfileScreen = ({ onBack, profileData, setProfileData }) => {
  const [firstName, setFirstName] = useState(profileData.firstName);
  const [lastName, setLastName] = useState(profileData.lastName);
  const [username, setUsername] = useState(profileData.username);
  const [email, setEmail] = useState(profileData.email);
  const [phone, setPhone] = useState(profileData.phone);
  const [birth, setBirth] = useState(profileData.birth);
  const [gender, setGender] = useState(profileData.gender);
  const [profileImage, setProfileImage] = useState(profileData.profileImage);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Permission to access the camera roll is required to set a profile picture.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    const newName = `${firstName} ${lastName}`;
    setProfileData({
      ...profileData,
      name: newName,
      firstName,
      lastName,
      username,
      email,
      phone,
      birth,
      gender,
      profileImage,
    });
    onBack();
  };

  return (
    <View style={editProfileStyles.container}>
      <LinearGradient colors={["#a18cd1", "#fbc2eb"]} style={editProfileStyles.gradientBackground}>
        <TouchableOpacity style={editProfileStyles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={editProfileStyles.profileHeader}>
          <Image source={{ uri: profileImage || "https://i.ibb.co/6y4sM6X/image.png" }} style={editProfileStyles.profileImage} />
          <TouchableOpacity style={editProfileStyles.editImageButton} onPress={pickImage}>
            <Ionicons name="pencil-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <ScrollView style={editProfileStyles.formContainer} contentContainerStyle={editProfileStyles.formContent}>
        <Text style={editProfileStyles.formTitle}>Edit Profile</Text>

        <Text style={editProfileStyles.inputLabel}>First Name</Text>
        <TextInput style={editProfileStyles.input} placeholder="First Name" placeholderTextColor="#ccc" value={firstName} onChangeText={setFirstName} />
        <Text style={editProfileStyles.inputLabel}>Last Name</Text>
        <TextInput style={editProfileStyles.input} placeholder="Last Name" placeholderTextColor="#ccc" value={lastName} onChangeText={setLastName} />
        <Text style={editProfileStyles.inputLabel}>Username</Text>
        <TextInput style={editProfileStyles.input} placeholder="@Username" placeholderTextColor="#ccc" value={username} onChangeText={setUsername} />
        <Text style={editProfileStyles.inputLabel}>Email</Text>
        <TextInput style={editProfileStyles.input} placeholder="Email" placeholderTextColor="#ccc" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <Text style={editProfileStyles.inputLabel}>Phone Number</Text>
        <TextInput style={editProfileStyles.input} placeholder="+xxx xxxx xxxx" placeholderTextColor="#ccc" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
        <Text style={editProfileStyles.inputLabel}>Birth</Text>
        <TextInput style={editProfileStyles.input} placeholder="YYYY-MM-DD" placeholderTextColor="#ccc" value={birth} onChangeText={setBirth} />
        <Text style={editProfileStyles.inputLabel}>Gender</Text>
        <TextInput style={editProfileStyles.input} placeholder="Gender" placeholderTextColor="#ccc" value={gender} onChangeText={setGender} />

        <TouchableOpacity style={editProfileStyles.saveButton} onPress={handleSave}>
          <Text style={editProfileStyles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={editProfileStyles.changePasswordButton}>
          <Ionicons name="lock-closed-outline" size={16} color="#fff" />
          <Text style={editProfileStyles.changePasswordText}>Change Password</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

/* -------------------- APP (root) -------------------- */

export default function App() {
  const [screen, setScreen] = useState({ name: "login" });
  const [profileData, setProfileData] = useState({
    name: "Syed Zagham Abbas",
    email: "zagham208@gmail.com",
    firstName: "zagham",
    lastName: "abbas",
    username: "@zaghu",
    phone: "+234 904 8470",
    birth: "12-11-1998",
    gender: "Male",
    profileImage: "https://i.ibb.co/6y4sM6X/image.png",
  });

  const [chats, setChats] = useState(initialChats);
  const [selectedChat, setSelectedChat] = useState(null);

  // Navigate to chat - used by feed or conversations
  const openChat = (chat) => {
    setSelectedChat(chat);
    setScreen({ name: "chat" });
  };

  // When clicking a user on Feed: either open existing chat or create a new one
  const openChatFromFeed = (skillUser) => {
    const existing = chats.find(c => c.name.toLowerCase() === skillUser.user.toLowerCase());
    if (existing) {
      openChat(existing);
      return;
    }
    // create new chat
    const newChat = {
      id: Date.now().toString(),
      name: skillUser.user,
      lastMsg: `Start a new chat with ${skillUser.user}`,
      messages: [{ id: Date.now().toString() + "_init", text: `Hi ${skillUser.user}, I'd like to connect about ${skillUser.skill}.`, sender: "me", time: new Date().toLocaleTimeString().replace(/:\d+ /, " ") }],
    };
    const newChats = [newChat, ...chats];
    setChats(newChats);
    openChat(newChat);
  };

  // Select existing chat from Conversations
  const handleSelectChat = (chat) => {
    openChat(chat);
  };

  // Delete conversation
  const handleDeleteChat = (chatId) => {
    setChats(prev => prev.filter(c => c.id !== chatId));
    // if currently open chat is deleted, go back to conversations
    if (selectedChat && selectedChat.id === chatId) {
      setSelectedChat(null);
      setScreen({ name: "conversations" });
    }
  };

  // Update messages for a chat (called by ChatScreen)
  const handleSendMessage = (chatId, updatedMessages) => {
    setChats(prev => prev.map(c => c.id === chatId ? { ...c, messages: updatedMessages } : c));
  };

  // Update last message preview
  const handleUpdateLastMsg = (chatId, text) => {
    setChats(prev => prev.map(c => c.id === chatId ? { ...c, lastMsg: text } : c));
  };

  switch (screen.name) {
    case "login":
      return (
        <LoginScreen
          onLogin={() => setScreen({ name: "feed" })}
          onSignupPress={() => setScreen({ name: "signup" })}
        />
      );
    case "signup":
      return <SignupScreen onBack={() => setScreen({ name: "login" })} />;
    case "feed":
      return <SkillsFeedScreen onNavigate={setScreen} onOpenChatFromFeed={openChatFromFeed} />;
    case "conversations":
      return <ConversationsScreen onBack={() => setScreen({ name: "feed" })} chats={chats} onSelectChat={handleSelectChat} onDeleteChat={handleDeleteChat} />;
    case "chat":
      return <ChatScreen onBack={() => setScreen({ name: "conversations" })} chat={selectedChat} onSendMessage={handleSendMessage} onUpdateLastMsg={handleUpdateLastMsg} />;
    case "profile":
      return <ProfileScreen onLogout={() => setScreen({ name: "login" })} onBack={() => setScreen({ name: "feed" })} onNavigate={setScreen} profileData={profileData} />;
    case "editProfile":
      return <EditProfileScreen onBack={() => setScreen({ name: "profile" })} profileData={profileData} setProfileData={setProfileData} />;
    default:
      return null;
  }
}

/* -------------------- STYLES -------------------- */

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7c3aed",
  },
  cardContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    padding: 20,
    width: "85%",
    alignItems: "center",
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: { width: 80, height: 80, borderRadius: 40 },
  formTitle: { fontSize: 24, fontWeight: "bold", color: "white", marginBottom: 16 },
  input: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: "white",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    marginBottom: 12,
    paddingRight: 10,
  },
  passwordInput: { flex: 1, padding: 12, color: "white" },
  eyeButton: { padding: 5 },
  loginButton: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 12,
    borderRadius: 50,
    marginTop: 8,
  },
  loginButtonText: {
    color: "#2563eb",
    fontWeight: "bold",
    textAlign: "center",
  },
  signupSentence: { marginTop: 16, color: "white", fontSize: 16 },
  signupLink: {
    color: "#ffd700",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  backButton: { marginTop: 16 },
  backButtonText: { color: "white", textDecorationLine: "underline" },
});

const feedStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5" },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#7c3aed",
    paddingTop: 50,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerIcons: { flexDirection: "row", alignItems: "center", gap: 8 },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  searchInput: {
    marginVertical: 12,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#333",
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  userImage: { width: 45, height: 45, borderRadius: 22.5, marginRight: 12 },
  userInfo: { flex: 1 },
  userName: { fontWeight: "bold", fontSize: 16, color: "#333" },
  ratingContainer: { flexDirection: "row", alignItems: "center", gap: 4 },
  ratingText: { fontSize: 14, color: "#666" },
  categoryTag: {
    backgroundColor: "#eef2ff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: { color: "#4f46e5", fontSize: 12, fontWeight: "bold" },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 4 },
  cardSubtitle: { fontSize: 14, color: "#666" },
  lookingForText: { fontSize: 14, color: "#888", marginTop: 8 },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 10,
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, color: "gray", marginTop: 4 },
});

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  profileInfoContainer: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profileEmail: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  editButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#eef2ff",
    borderRadius: 20,
  },
  editButtonText: {
    color: "#4f46e5",
    fontSize: 14,
    fontWeight: "bold",
  },
  optionsContainer: {
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  listItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  listIcon: {
    marginRight: 15,
  },
  listTitle: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  appVersion: {
    fontSize: 12,
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
});

const editProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gradientBackground: {
    paddingTop: 60,
    paddingBottom: 100,
    alignItems: "center",
    position: "relative",
  },
  profileHeader: {
    position: "relative",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -80,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  formContent: {
    paddingVertical: 20,
    paddingBottom: 50,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#7c3aed",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  changePasswordButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  changePasswordText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
});

const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingTop: 50,
    backgroundColor: "#7c3aed",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  messageList: {
    paddingHorizontal: 10,
    flexGrow: 1,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 20,
    marginVertical: 6,
  },
  myMessage: {
    backgroundColor: "#eef2ff",
    alignSelf: "flex-end",
    borderTopRightRadius: 5,
  },
  otherMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderTopLeftRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#7c3aed",
    borderRadius: 20,
    padding: 10,
  },
});
