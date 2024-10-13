import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import * as ScreenOrientation from "expo-screen-orientation";
import * as Font from "expo-font";
import { useEffect } from "react";

export default function MovieScreen({ route }) {
  const { movie } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleFullscreenUpdate = async (status) => {
    if (
      status.fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT
    ) {
      await ScreenOrientation.unlockAsync();
    } else if (
      status.fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS
    ) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
  };

  const renderCastItem = ({ item }) => (
    <View style={styles.castContainer}>
      <Image source={{ uri: item.image }} style={styles.castImage} />
      <Text style={styles.castName}>{item.name}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#0f0000", "#0f0000", "#0a0000"]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.genres}>{movie.genres.join(", ")}</Text>

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}

        <Video
          source={{ uri: movie.movieLink }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          shouldPlay
          onLoad={handleVideoLoad}
          onFullscreenUpdate={handleFullscreenUpdate}
        />

        <View style={styles.review}>
          <View style={styles.reviewBox}>
            <Text style={styles.rate}>{movie.imdb} / 10</Text>
            <Text style={styles.imdb}>IMDB</Text>
          </View>
          <View style={styles.reviewBox}>
            <Text style={styles.rate}>{movie.rt} / 100%</Text>
            <Text style={styles.rt}>Rotten Tomatoes</Text>
          </View>
          <View style={styles.reviewBox}>
            <Text style={styles.rate}>{movie.lb} / 5</Text>
            <Text style={styles.lb}>Letterboxd</Text>
          </View>
        </View>

        <Text style={styles.des}>{movie.description}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Release date: {movie.releaseDate}</Text>
          <Text style={styles.infoText}>Director: {movie.director.name}</Text>
          <Text style={styles.infoText}>
            Distributed by: {movie.distributor}
          </Text>
          <Text style={styles.infoText}>
            Box office: ${movie.boxOffice} million
          </Text>
          <Text style={styles.infoText}>
            Cinematography: {movie.cinematography}
          </Text>
          <Text style={styles.infoText}>Music by: {movie.music}</Text>
        </View>

        <Text style={styles.sectionTitle}>Cast</Text>
        <FlatList
          data={movie.cast}
          renderItem={renderCastItem}
          keyExtractor={(item) => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginBottom: 30 }}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 50,
    paddingTop: 15,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "normal",
    marginVertical: 0,
    fontFamily: "Flux",
  },
  genres: {
    color: "#ccc",
    marginBottom: 10,
    fontFamily: "Flux",
    fontSize: 15,
  },
  video: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "normal",
    color: "#fff",
    marginVertical: 10,
    fontFamily: "Flux",
  },
  des: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 15,
    paddingTop: 10,
    textAlign: "justify",
    fontFamily: "Flux",
  },
  infoContainer: {
    marginBottom: 5,
  },
  infoText: {
    color: "#ccc",
    marginBottom: 5,
    fontFamily:"Flux",
  },
  castContainer: {
    alignItems: "center",
    marginRight: 10,
  },
  castImage: {
    width: 120,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  castName: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Flux",
  },
  review: {
    paddingTop: 10,
    paddingBottom: 20,
    justifyContent: "space-around",
    display: "flex",
    flexDirection: "row",
  },
  reviewBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rate: {
    color: "#f2f2f2",
    fontSize: 15,
    fontFamily: "Flux",
  },
  imdb: {
    color: "#fbc11b",
    fontSize: 18,
    fontFamily: "Flux",
  },
  rt: {
    color: "#f93810",
    fontSize: 18,
    fontFamily: "Flux",
  },
  lb: {
    color: "#46bef4",
    fontSize: 18,
    fontFamily: "Flux",
  },
});
