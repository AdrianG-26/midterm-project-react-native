import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  variant?: "default" | "jobFinder" | "savedJobs" | "appliedJobs";
  customIcon?: string;
  customColor?: string;
  onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  variant = "default",
  customIcon,
  customColor,
  onBackPress,
}) => {
  const { colors, theme } = useTheme();
  const navigation = useNavigation();


  const getVariantProperties = () => {
    switch (variant) {
      case "jobFinder":
        return {
          icon: "briefcase",
          color: colors.primary,
          showUnderline: false,
          useLogo: true,
          showIcon: true,
        };
      case "savedJobs":
        return {
          icon: "bookmark",
          color: colors.primary,
          showUnderline: false,
          useLogo: false,
          showIcon: false,
        };
      case "appliedJobs":
        return {
          icon: "checkmark-done",
          color: colors.primary,
          showUnderline: false,
          useLogo: false,
          showIcon: false,
        };
      default:
        return {
          icon: customIcon || "briefcase",
          color: customColor || colors.primary,
          showUnderline: false,
          useLogo: false,
          showIcon: false,
        };
    }
  };

  const variantProps = getVariantProperties();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.header }]}>
      <View style={styles.content}>
        {showBackButton ? (
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={handleBackPress}
          >
            <Icon name="arrow-back" size={24} color={variantProps.color} />
          </TouchableOpacity>
        ) : (
          <View style={styles.logoLeftSpace} />
        )}

        <View style={styles.titleContainer}>
          {variantProps.useLogo ? (
            <View style={styles.logoContainer}>
              <Image
                source={
                  theme === "dark"
                    ? require("../../assets/logo/logo2.png")
                    : require("../../assets/logo/logo1.png")
                }
                style={styles.logoImage}
              />
            </View>
          ) : (
            <View style={styles.logoContainer}>
              {variantProps.showIcon && (
                <Icon
                  name={variantProps.icon}
                  size={28}
                  color={variantProps.color}
                  style={styles.logoIcon}
                />
              )}
              <Text
                style={[
                  styles.title,
                  {
                    color: variantProps.color,
                    fontFamily:
                      Platform.OS === "ios" ? "-apple-system" : "sans-serif",
                    fontWeight: Platform.OS === "ios" ? "600" : "bold",
                    includeFontPadding: false,
                    textAlignVertical: "center",
                    ...(Platform.OS === "ios"
                      ? {
                          paddingTop: 3,
                          marginBottom: -3,
                        }
                      : {
                          marginTop: 2,
                        }),
                  },
                ]}
              >
                {title}
              </Text>
            </View>
          )}

          {variantProps.showUnderline && (
            <View
              style={[
                styles.underline,
                { backgroundColor: variantProps.color },
              ]}
            />
          )}
        </View>

        {showBackButton ? (
          <View style={styles.rightSpace} />
        ) : (
          <View style={styles.logoRightSpace} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 0,
    elevation: 0,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  logoIcon: {
    marginRight: 8,
  },
  logoImage: {
    width: "90%",
    height: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  underline: {
    height: 2,
    width: "50%",
    marginTop: 3,
    borderRadius: 2,
  },
  logoLeftSpace: {
    width: 40,
  },
  logoRightSpace: {
    width: 40,
  },
  rightSpace: {
    width: 40,
  },
});

export default Header;
