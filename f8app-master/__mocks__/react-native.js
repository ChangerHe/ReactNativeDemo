import rn from "react-native";

jest.mock("Linking", () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn()
  };
});

jest.mock("PushNotificationIOS", () => ({
  addEventListener: jest.fn(),
  requestPermissions: jest.fn()
}));

module.exports = rn;
