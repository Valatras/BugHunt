// import { useEffect, useState } from "react";
// import { View, Text } from "react-native";
// import MapView from "react-native-maps";
// import * as Location from "expo-location";
// import { PROVIDER_GOOGLE } from "react-native-maps";

// export default function MapScreen() {
//   const [region, setRegion] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadLocation = async () => {
//       try {
//         const permission = await Location.requestForegroundPermissionsAsync();

//         console.log("Permission:", permission);

//         if (permission.status !== "granted") {
//           setError("Permission refusée");
//           return;
//         }

//         const current = await Location.getCurrentPositionAsync({});

//         console.log("Position:", current.coords);

//         setRegion({
//           latitude: current.coords.latitude,
//           longitude: current.coords.longitude,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         });
//       } catch (err) {
//         console.error(err);
//         setError(String(err));
//       }
//     };

//     loadLocation();
//   }, []);

//   if (error) {
//     return (
//       <View className="flex-1 items-center justify-center">
//         <Text>{error}</Text>
//       </View>
//     );
//   }

//   if (!region) {
//     return (
//       <View className="flex-1 items-center justify-center">
//         <Text>Récupération GPS...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <Text
//         style={{
//           position: "absolute",
//           top: 50,
//           left: 10,
//           zIndex: 999,
//           backgroundColor: "white",
//           padding: 8,
//         }}
//       >
//         {region.latitude}, {region.longitude}
//       </Text>

//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={{ flex: 1 }}
//         initialRegion={region}
//       />
//     </View>
//   );
// }
