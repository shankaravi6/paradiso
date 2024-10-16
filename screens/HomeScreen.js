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
import * as Font from "expo-font";

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [slides, setSlides] = useState([]);
  const [showMovies, setShowMovies] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Load custom font
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Flux: require("../assets/Flux.ttf"),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  // Fetch movies data from API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://paradiso-server.onrender.com/movies'); // Use your server URL
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies: ", error);
      }
    };
    fetchMovies();
  }, []);

  // Fetch slideshow data from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('https://paradiso-server.onrender.com/slide'); // Use your server URL
        const data = await response.json();
        setSlides(data);
      } catch (error) {
        console.error("Error fetching slides: ", error);
      }
    };
    fetchSlides();
  }, []);

  const renderMovie = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Movie", { movie: item })}>
      <View style={styles.movieContainer}>
        <LinearGradient colors={["rgba(0, 0, 0, 0.6)", "transparent"]} style={styles.gradientOverlay}>
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

  const onMomentumScrollEnd = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveSlide(slideIndex);
  };

  const renderPaginationDots = () => {
    return (
      <View style={styles.paginationDotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.paginationDot, activeSlide === index ? styles.activeDot : styles.inactiveDot]}
          />
        ))}
      </View>
    );
  };

  if (showMovies) {
    return (
      <LinearGradient colors={["#0f0000", "#0f0000", "#0a0000"]} style={styles.container} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <FlatList
            data={slides}
            renderItem={renderSlideshowItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.slideshow}
            onMomentumScrollEnd={onMomentumScrollEnd}
            snapToAlignment="center"
            decelerationRate="fast"
            snapToInterval={screenWidth}
          />
          {renderPaginationDots()}
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
      source={{ uri: "https://i.pinimg.com/736x/c7/40/6e/c7406e9edfd1067b758f0adfad5e3c40.jpg" }}
      style={styles.fullScreenBanner}
    >
      <LinearGradient colors={["rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.1)"]} style={styles.gradientOverlay}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>PARADISO</Text>
          <Text style={styles.welcomeSubText}>Watch latest horror movies</Text>
          <TouchableOpacity style={styles.exploreButton} onPress={() => setShowMovies(true)}>
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
    color: "#ffb3b3",
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
