import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { dummyMovies } from "../data/MovieData";
import * as Font from "expo-font";
import { useEffect } from "react";

export default function HomeScreen({ navigation }) {
  const [movies] = useState(dummyMovies);
  const [showMovies, setShowMovies] = useState(false); // State to control when to show the movie list
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load the custom font
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Flux": require("../assets/Flux.ttf"), // Path to your font file
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  const renderMovie = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Movie", { movie: item })}
    >
      <View style={styles.movieContainer}>
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.6)", "transparent"]} // Dimming effect
          style={styles.gradientOverlay}
        >
          <Image source={{ uri: item.poster }} style={styles.poster} />
        </LinearGradient>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  if (showMovies) {
    return (
      <LinearGradient
        colors={["#0f0000", "#0f0000", "#0a0000"]} // Red horror gradient
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* Back link */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setShowMovies(false)} // Return to the banner screen
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* Movie list */}
        <Text style={styles.movieSubText}>Featured Movies</Text>
        <FlatList
          data={movies}
          renderItem={renderMovie}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        />
      </LinearGradient>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/c7/40/6e/c7406e9edfd1067b758f0adfad5e3c40.jpg", // Replace with actual banner image URL
      }}
      style={styles.fullScreenBanner}
    >
      {/* Overlay for dimming effect */}
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.1)"]} // Dimming effect with black transparency
        style={styles.gradientOverlay}
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>PARADISO</Text>
          <Text style={styles.welcomeSubText}>Watch latest horror movies</Text>

          {/* Explore Button */}
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => setShowMovies(true)} // Show the movie list on button press
          >
            <Text style={styles.exploreButtonText}>Watch Now</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  fullScreenBanner: {
    flex: 1,
    justifyContent: "center",
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Dimming effect for the banner
  },
  movieContainer: {
    flex: 1,
    marginTop:10,
    marginBottom:10,
    marginLeft:5,
    marginRight:10,
    paddingTop: 0,
  },
  poster: {
    width: 150,
    height: 225,
    borderRadius: 10,
  },
  title: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "normal",
    fontSize: 18,
    fontFamily:"Flux",
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    color: "#fff",
    fontSize: 50,
    marginBottom: 20,
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing:15,
    fontFamily:"Flux",
  },
  welcomeSubText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "normal",
    textAlign: "center",
    fontFamily:"Flux",
  },
  movieSubText:{
    color: "#fff",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "normal",
    textAlign: "center",
    fontFamily:"Flux",
  },
  exploreButton: {
    backgroundColor: "#4d0000", // Red button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    fontFamily:"Flux",
  },
  exploreButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    fontFamily:"Flux",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 5,
    fontFamily:"Flux",
  },
  backText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
    fontFamily:"Flux",
  },
});
