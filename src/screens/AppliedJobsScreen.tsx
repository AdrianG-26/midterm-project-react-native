import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Header from "../components/Header";
import JobList from "../components/JobList";
import ThemeToggle from "../components/ThemeToggle";
import { useJobs } from "../context/JobContext";
import { useTheme } from "../context/ThemeContext";
import { Job } from "../types/types";

interface CancelModalProps {
  visible: boolean;
  job: Job | null;
  onCancel: () => void;
  onConfirm: () => void;
  colors: any;
  theme: string;
}

const CancelModal: React.FC<CancelModalProps> = ({
  visible,
  job,
  onCancel,
  onConfirm,
  colors,
  theme,
}) => {
  if (!job) return null;

  const buttonTextColor = theme === "dark" ? "#2A2A2A" : "#F6F5F5";

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View
              style={[styles.modalContent, { backgroundColor: colors.card }]}
            >
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Cancel Application
              </Text>
              <Text style={[styles.modalMessage, { color: colors.secondary }]}>
                Are you sure you want to cancel your application for {job.title}{" "}
                at {job.companyName}?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.cancelButton,
                    { borderColor: colors.border },
                  ]}
                  onPress={onCancel}
                >
                  <Text
                    style={[styles.modalButtonText, { color: colors.text }]}
                  >
                    Keep
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.confirmButton,
                    { backgroundColor: colors.error },
                  ]}
                  onPress={onConfirm}
                >
                  <Text
                    style={[styles.modalButtonText, { color: buttonTextColor }]}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const AppliedJobsScreen: React.FC = () => {
  const { colors, theme } = useTheme();
  const { applications, jobs, cancelApplication } = useJobs();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Filter jobs that have been applied for
  const appliedJobs = jobs.filter((job) =>
    applications.some((app) => app.jobId === job.id)
  );

  const handleCancelPress = (job: Job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const handleConfirmCancel = () => {
    if (selectedJob) {
      cancelApplication(selectedJob.id);
      setModalVisible(false);
      setSelectedJob(null);
    }
  };

  const handleCancelModal = () => {
    setModalVisible(false);
    setSelectedJob(null);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <Header title="Applied Jobs" variant="appliedJobs" />
      <JobList
        jobs={appliedJobs}
        loading={false}
        showSaveButton={false}
        showRemoveButton={false}
        showCancelApplicationButton={true}
        onCancelApplication={handleCancelPress}
      />
      <ThemeToggle />

      <CancelModal
        visible={modalVisible}
        job={selectedJob}
        onCancel={handleCancelModal}
        onConfirm={handleConfirmCancel}
        colors={colors}
        theme={theme}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Modal styles
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
    // background color set with colors.error in component
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AppliedJobsScreen;
