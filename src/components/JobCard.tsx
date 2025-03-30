import {
  CommonActions,
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useJobs } from "../context/JobContext";
import { useTheme } from "../context/ThemeContext";
import { StackParamList } from "../navigation/AppNavigator";
import { JobFinderStackParamList } from "../navigation/JobFinderStackNavigator";
import { Job } from "../types/types";

interface JobCardProps {
  job: Job;
  showSaveButton?: boolean;
  showRemoveButton?: boolean;
  showCancelApplicationButton?: boolean;
  onCancelApplication?: () => void;
}


type JobCardNavigationProp = CompositeNavigationProp<
  StackNavigationProp<StackParamList>,
  StackNavigationProp<JobFinderStackParamList>
>;

const JobCard: React.FC<JobCardProps> = ({
  job,
  showSaveButton = true,
  showRemoveButton = false,
  showCancelApplicationButton = false,
  onCancelApplication,
}) => {
  const navigation = useNavigation<JobCardNavigationProp>();
  const { colors, theme } = useTheme();
  const { saveJob, removeJob, isJobSaved, hasApplied } = useJobs();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

 
  const buttonTextColor = theme === "dark" ? "#2A2A2A" : "#F6F5F5";

  const notDisclosedColor = "#E53935"; 

  const handleApply = () => {
   
    const fromSavedJobs = showRemoveButton;


    navigation.navigate("JobFinder", {
      screen: "Application",
      params: { job, fromSavedJobs },
    });
  };

  const handleSave = () => {
    saveJob(job);
  };

  const handleRemove = () => {
  
    setShowConfirmModal(true);
  };

  const confirmRemove = () => {
    removeJob(job.id);
    setShowConfirmModal(false);
  };

  const cancelRemove = () => {
    setShowConfirmModal(false);
  };

  const handleCancelApplication = () => {
    if (onCancelApplication) {
      onCancelApplication();
    }
  };

  const saved = isJobSaved(job.id);
  const applied = hasApplied(job.id);

  
  const displayValue = (
    value: any,
    renderer?: (val: any) => React.ReactNode
  ) => {
    if (value === null || value === undefined || value === "") {
      return (
        <Text style={[styles.notDisclosedText, { color: notDisclosedColor }]}>
          Not Disclosed
        </Text>
      );
    }

    return renderer ? renderer(value) : value;
  };

  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View style={styles.header}>
          <Image
            source={{
              uri: job.companyLogo || "https://via.placeholder.com/50",
            }}
            style={styles.logo}
          />
          <View style={styles.headerText}>
            <Text style={[styles.title, { color: colors.text }]}>
              {displayValue(job.title)}
            </Text>
            <Text style={[styles.company, { color: colors.primary }]}>
              {displayValue(job.companyName)}
            </Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailsRow}>
            <View style={styles.detail}>
              <Icon
                name="briefcase-outline"
                size={16}
                color={colors.secondary}
              />
              <Text style={[styles.detailText, { color: colors.secondary }]}>
                {displayValue(job.jobType)}
              </Text>
            </View>
            <View style={styles.detail}>
              <Icon name="home-outline" size={16} color={colors.secondary} />
              <Text style={[styles.detailText, { color: colors.secondary }]}>
                {displayValue(job.workModel)}
              </Text>
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detail}>
              <Icon
                name="bar-chart-outline"
                size={16}
                color={colors.secondary}
              />
              <Text style={[styles.detailText, { color: colors.secondary }]}>
                {displayValue(job.seniorityLevel)}
              </Text>
            </View>
            <View style={styles.detail}>
              <Icon name="cash-outline" size={16} color={colors.secondary} />
              <Text style={[styles.detailText, { color: colors.secondary }]}>
                {job.minSalary && job.maxSalary ? (
                  `${job.minSalary} - ${job.maxSalary}`
                ) : (
                  <Text
                    style={[
                      styles.notDisclosedText,
                      { color: notDisclosedColor },
                    ]}
                  >
                    Not Disclosed
                  </Text>
                )}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          {showSaveButton && (
            <TouchableOpacity
              style={[
                styles.button,
                saved
                  ? { backgroundColor: colors.secondary }
                  : { backgroundColor: colors.primary },
              ]}
              onPress={handleSave}
              disabled={saved}
            >
              <Text style={[styles.buttonText, { color: buttonTextColor }]}>
                {saved ? "Saved" : "Save Job"}
              </Text>
            </TouchableOpacity>
          )}

          {showRemoveButton && (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.error }]}
              onPress={handleRemove}
            >
              <Text style={[styles.buttonText, { color: buttonTextColor }]}>
                Remove
              </Text>
            </TouchableOpacity>
          )}

          {showCancelApplicationButton && applied ? (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.error }]}
              onPress={handleCancelApplication}
            >
              <Text style={[styles.buttonText, { color: buttonTextColor }]}>
                Cancel Application
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.button,
                applied
                  ? { backgroundColor: colors.secondary }
                  : { backgroundColor: colors.primary },
              ]}
              onPress={handleApply}
              disabled={showCancelApplicationButton && applied}
            >
              <Text style={[styles.buttonText, { color: buttonTextColor }]}>
                {applied ? "Applied" : "Apply"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelRemove}
      >
        <TouchableWithoutFeedback onPress={cancelRemove}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View
                style={[styles.modalContent, { backgroundColor: colors.card }]}
              >
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Remove Job
                </Text>
                <Text
                  style={[styles.modalMessage, { color: colors.secondary }]}
                >
                  Are you sure you want to remove this job from your saved list?
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[
                      styles.modalButton,
                      styles.cancelButton,
                      { borderColor: colors.border },
                    ]}
                    onPress={cancelRemove}
                  >
                    <Text
                      style={[styles.modalButtonText, { color: colors.text }]}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.modalButton,
                      styles.confirmButton,
                      { backgroundColor: colors.error },
                    ]}
                    onPress={confirmRemove}
                  >
                    <Text
                      style={[
                        styles.modalButtonText,
                        { color: buttonTextColor },
                      ]}
                    >
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  company: {
    fontSize: 16,
    fontWeight: "500",
  },
  detailsContainer: {
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  fullWidthDetail: {
    width: "100%",
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "500",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "90%",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  confirmButton: {

  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  notDisclosedText: {
    fontStyle: "italic",
    fontSize: 14,
  },
});

export default JobCard;
