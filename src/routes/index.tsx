import { useTheme } from "native-base";
import { useEffect, useState } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { OneSignal, OSNotification } from "react-native-onesignal";

import { Notification } from "../components/Notification";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  const [notification, setNotification] = useState<OSNotification>();
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
    <NavigationContainer theme={theme}>
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
