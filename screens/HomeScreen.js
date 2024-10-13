import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { dummyMovies } from "../data/MovieData";
import * as Font from "expo-font";

const screenWidth = Dimensions.get("window").width; // Get screen width for slideshow

// Fake data for slideshow
const slideshowData = [
  {
    id: 1,
    image: "https://www.btglifestyle.com/wp-content/uploads/2024/08/Alien-Romulus-Spoiler-Free-Review-BTG-Lifestyle.jpg",
    title: "Slideshow Movie 1",
  },
  {
    id: 2,
    image: "https://www.evildeadrisemovie.com/images/share.jpg",
    title: "Slideshow Movie 2",
  },
  {
    id: 3,
    image: "https://www.upressonline.com/wp-content/uploads/2021/09/Malignant-movie.jpg",
    title: "Slideshow Movie 3",
  },
];

export default function HomeScreen({ navigation }) {
  const [movies] = useState(dummyMovies);
  const [showMovies, setShowMovies] = useState(false); // State to control when to show the movie list
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0); // State for active slide

  // Load the custom font
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Flux: require("../assets/Flux.ttf"), // Path to your font file
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

  const renderSlideshowItem = ({ item }) => (
    <View style={styles.slideshowItem}>
      <Image source={{ uri: item.image }} style={styles.slideshowImage} />
    </View>
  );

  // Handle the end of scrolling event
  const onMomentumScrollEnd = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveSlide(slideIndex); // Update active slide based on precise scroll position
  };

  const renderPaginationDots = () => {
    return (
      <View style={styles.paginationDotsContainer}>
        {slideshowData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeSlide === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    );
  };

  if (showMovies) {
    return (
      <LinearGradient
        colors={["#0f0000", "#0f0000", "#0a0000"]} // Red horror gradient
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Back link */}
        {/* <TouchableOpacity
          style={styles.backButton}
          onPress={() => setShowMovies(false)} // Return to the banner screen
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity> */}

        {/* Slideshow */}
        <FlatList
          data={slideshowData}
          renderItem={renderSlideshowItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.slideshow}
          onMomentumScrollEnd={onMomentumScrollEnd} // Update slide on momentum end
          snapToAlignment="center"
          decelerationRate="fast"
          snapToInterval={screenWidth} // Ensure each item snaps to the full screen width
        />

        {/* Pagination Dots */}
        {renderPaginationDots()}

        {/* Movie list */}
        {movies.map((category) => (
            <View key={category.id}>
              <Text style={styles.movieSubText}>{category.title}</Text>
              <FlatList
                data={category.movies}
                renderItem={renderMovie}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          ))}
        </ScrollView>
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
  scrollContainer: {
    paddingTop: 0,
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
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 10,
    paddingTop: 0,
  },
  poster: {
    width: 125,
    height: 200,
    borderRadius: 10,
  },
  title: {
    color: "#b3b3b3",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "normal",
    fontSize: 18,
    fontFamily: "Flux",
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
    letterSpacing: 15,
    fontFamily: "Flux",
  },
  welcomeSubText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "normal",
    textAlign: "center",
    fontFamily: "Flux",
  },
  movieSubText: {
    color: "#b32400",
    fontSize: 20,
    marginBottom: 5,
    marginTop:25,
    paddingLeft:10,
    fontWeight: "normal",
    textAlign: "justify",
    fontFamily: "Flux",
  },
  exploreButton: {
    backgroundColor: "#4d0000", // Red button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    fontFamily: "Flux",
  },
  exploreButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Flux",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 0,
    fontFamily: "Flux",
  },
  backText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
    fontFamily: "Flux",
  },
  slideshow: {
    marginBottom: 20, // Add margin for the slideshow
  },
  slideshowItem: {
    width: screenWidth, // Full screen width for each slide
    justifyContent: "center",
    alignItems: "center",
  },
  slideshowImage: {
    width: screenWidth,
    height: 200,
    borderRadius: 10,
  },
  paginationDotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "#ddd",
  },
  activeDot: {
    backgroundColor: "#b32400", // Active dot color (red)
  },
  inactiveDot: {
    backgroundColor: "#888", // Inactive dot color (grey)
  },
});
