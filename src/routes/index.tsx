import { useTheme } from "native-base";
import { useEffect, useState } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { OneSignal, OSNotification } from "react-native-onesignal";
import { Notification } from "../components/Notification";
import { AppRoutes } from "./app.routes";

const linking = {
  prefixes: [
    "igniteshoesapp://",
    "com.erivaldo.igniteshoes://",
    "exp+igniteshoesapp://",
  ],
  config: {
    screens: {
      details: {
        path: "details/:productId",
        parse: {
          productId: (productId: string) => productId,
        },
      },
    },
  },
};

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>();
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay",
      (event) => {
        const response = event.getNotification();
        setNotification(response);
      }
    );
  }, []);
  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />

      {notification && (
        <Notification
          data={notification}
          onClose={() => {
            setNotification(undefined);
          }}
        />
      )}
    </NavigationContainer>
  );
}
