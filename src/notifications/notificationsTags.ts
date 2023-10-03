import { OneSignal } from "react-native-onesignal";

export function tagUserInfoCreate() {
  OneSignal.User.addTags({
    user_name: "erivaldo",
    user_email: "erivaldo@email.com",
  });
}

export function tagCartUpdate(item_count: string) {
  OneSignal.User.addTag("cart_items_count", item_count);
}
