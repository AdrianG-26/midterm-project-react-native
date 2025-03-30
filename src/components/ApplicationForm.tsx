import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useJobs } from "../context/JobContext";
import { useTheme } from "../context/ThemeContext";
import {
  ApplicationForm as ApplicationFormType,
  FormErrors,
  Job,
} from "../types/types";
import { validateForm } from "../utils/validations";

interface ApplicationFormProps {
  job: Job;
  fromSavedJobs?: boolean;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  job,
  fromSavedJobs = false,
}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { colors } = useTheme();
  const { applyForJob } = useJobs();
  const [modalVisible, setModalVisible] = useState(false);

  const [form, setForm] = useState<ApplicationFormType>({
    name: "",
    email: "",
    contactNumber: "",
    whyHireYou: "",
    jobId: job.id,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const updateForm = (field: keyof ApplicationFormType, value: string) => {
    setForm({ ...form, [field]: value });
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleSubmit = () => {
    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Submit the application
    applyForJob(form);

    // Show success modal
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);

    // Clear the form
    setForm({
      name: "",
      email: "",
      contactNumber: "",
      whyHireYou: "",
      jobId: job.id,
    });

    // Navigate back to appropriate screen
    if (fromSavedJobs) {
      navigation.navigate("JobFinder");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.background },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.jobInfoContainer}>
          <Text style={[styles.jobTitle, { color: colors.text }]}>
            {job.title}
          </Text>
          <Text style={[styles.jobCompany, { color: colors.primary }]}>
            {job.companyName}
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Your Information
          </Text>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              Full Name
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.card,
                  color: colors.text,
                  borderColor: errors.name ? colors.error : colors.border,
                },
              ]}
              placeholder="Enter your full name"
              placeholderTextColor={colors.secondary}
              value={form.name}
              onChangeText={(text) => updateForm("name", text)}
            />
            {errors.name && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.name}
              </Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              Email Address
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.card,
                  color: colors.text,
                  borderColor: errors.email ? colors.error : colors.border,
                },
              ]}
              placeholder="Enter your email address"
              placeholderTextColor={colors.secondary}
              value={form.email}
              onChangeText={(text) => updateForm("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.email}
              </Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              Contact Number
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.card,
                  color: colors.text,
                  borderColor: errors.contactNumber
                    ? colors.error
                    : colors.border,
                },
              ]}
              placeholder="Enter your contact number"
              placeholderTextColor={colors.secondary}
              value={form.contactNumber}
              onChangeText={(text) => updateForm("contactNumber", text)}
              keyboardType="phone-pad"
            />
            {errors.contactNumber && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.contactNumber}
              </Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              Why should we hire you?
            </Text>
            <TextInput
              style={[
                styles.textArea,
                {
                  backgroundColor: colors.card,
                  color: colors.text,
                  borderColor: errors.whyHireYou ? colors.error : colors.border,
                },
              ]}
              placeholder="Tell us why you're a great fit for this role"
              placeholderTextColor={colors.secondary}
              value={form.whyHireYou}
              onChangeText={(text) => updateForm("whyHireYou", text)}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
            {errors.whyHireYou && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.whyHireYou}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit Application</Text>
          </TouchableOpacity>
        </View>

        {/* Success Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View
              style={[styles.modalContent, { backgroundColor: colors.card }]}
            >
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Application Submitted!
              </Text>
              <Text style={[styles.modalText, { color: colors.secondary }]}>
                Your application for {job.title} at {job.companyName} has been
                successfully submitted.
              </Text>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={closeModal}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  jobInfoContainer: {
    marginBottom: 24,
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 16,
    fontWeight: "500",
  },
  formContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 120,
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
  },
  submitButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
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
  modalText: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 22,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ApplicationForm;
