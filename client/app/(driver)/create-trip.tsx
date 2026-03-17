import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Alert,
} from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AppHeader from "@/components/AppHeader";
import { kathmanduLocations } from "@/constants/KathmanduLocations";
import { LocationOption } from "@/types/location/location";
import { createTripSchema, CreateTripType } from "@/schema/tripSchema";
import { trip } from "@/api/trip";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "expo-router";

// ─── Icon placeholders (replace with your icon lib e.g. @expo/vector-icons) ───
const Icon = ({ name }: { name: string }) => {
  const icons: Record<string, string> = {
    car: "🚗",
    id: "🪪",
    pin: "📍",
    flag: "🏁",
    clock: "🕐",
    chevron: "›",
    check: "✓",
    plus: "+",
  };
  return <Text style={{ fontSize: 16 }}>{icons[name] ?? "•"}</Text>;
};

// ─── Reusable Field Wrapper ────────────────────────────────────────────────────
const FieldWrapper = ({
  label,
  icon,
  children,
  error,
}: {
  label: string;
  icon: string;
  children: React.ReactNode;
  error?: string;
}) => (
  <View style={styles.fieldWrapper}>
    <View style={styles.fieldLabel}>
      <Icon name={icon} />
      <Text style={styles.fieldLabelText}>{label}</Text>
    </View>
    {children}
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

// ─── Location Dropdown Item ────────────────────────────────────────────────────
const LocationItem = ({
  item,
  onSelect,
}: {
  item: LocationOption;
  onSelect: () => void;
}) => (
  <TouchableOpacity
    style={styles.locationItem}
    onPress={onSelect}
    activeOpacity={0.7}
  >
    <View style={styles.locationDot} />
    <Text style={styles.locationItemText}>{item.name}</Text>
    <Text style={styles.locationCoords}>
      {item.latitude.toFixed(2)}, {item.longitude.toFixed(2)}
    </Text>
  </TouchableOpacity>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function CreateTripScreen() {
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showStartList, setShowStartList] = useState(false);
  const [showEndList, setShowEndList] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateTripType>({
    resolver: zodResolver(createTripSchema),
    defaultValues: {
      start_time: new Date().toISOString(),
    },
  });

  const onSubmit = async (data: CreateTripType) => {
    try {
      setLoading(true);
      console.log("Submitting trip data:", data);
      await trip.create({
        ...data,
        driver_id: user?.driver_id!,
        vehicle_number: user?.vehicle_number!,
      });
      Alert.alert("Trip Created", "Your trip has been created successfully!");

      router.replace("/driver-dashboard");
    } catch (error) {
      console.log("Error creating trip:", error);
    } finally {
      setLoading(false);
    }
  };

  const onTimeChange = (_event: any, selectedDate?: Date) => {
    setShowTimePicker(Platform.OS === "ios"); // keep open on iOS until dismissed
    if (selectedDate) {
      setStartTime(selectedDate);
      setValue("start_time", selectedDate.toISOString());
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0f0a" />
      <AppHeader />
      <View style={styles.driverCard}>
        <Text style={styles.driverName}>{user?.name}</Text>
        <Text style={styles.driverVehicle}>{user?.vehicle_number}</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Header ── */}
        <View style={styles.headerSection}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>NEW TRIP</Text>
          </View>
          <Text style={styles.title}>Create Trip</Text>
          <Text style={styles.subtitle}>
            Fill in the details to schedule your route
          </Text>
        </View>

        {/* ── Divider ── */}
        <View style={styles.divider} />

        {/* ── Form Card ── */}
        <View style={styles.card}>
          {/* START LOCATION */}
          <FieldWrapper
            label="Start Location"
            icon="pin"
            error={errors.start_location_name?.message}
          >
            <Controller
              control={control}
              name="start_location_name"
              render={({ field: { value } }) => (
                <>
                  <TouchableOpacity
                    style={[
                      styles.inputRow,
                      errors.start_location_name && styles.inputError,
                    ]}
                    onPress={() => {
                      setShowStartList((p) => !p);
                      setShowEndList(false);
                    }}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={value ? styles.inputText : styles.inputPlaceholder}
                    >
                      {value || "Select start location"}
                    </Text>
                    <Text
                      style={[
                        styles.chevron,
                        showStartList && styles.chevronOpen,
                      ]}
                    >
                      ›
                    </Text>
                  </TouchableOpacity>

                  {showStartList && (
                    <View style={styles.dropdown}>
                      <FlatList
                        data={kathmanduLocations}
                        keyExtractor={(item) => item.name}
                        style={{ maxHeight: 220 }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                          <LocationItem
                            item={item}
                            onSelect={() => {
                              setValue("start_location_name", item.name);
                              setValue("start_latitude", item.latitude);
                              setValue("start_longitude", item.longitude);
                              setShowStartList(false);
                            }}
                          />
                        )}
                      />
                    </View>
                  )}
                </>
              )}
            />
          </FieldWrapper>

          {/* Route connector visual */}
          <View style={styles.routeConnector}>
            <View style={styles.routeLine} />
            <View style={styles.routeArrow}>
              <Text style={styles.routeArrowText}>↓</Text>
            </View>
            <View style={styles.routeLine} />
          </View>

          {/* END LOCATION */}
          <FieldWrapper
            label="End Location"
            icon="flag"
            error={errors.end_location_name?.message}
          >
            <Controller
              control={control}
              name="end_location_name"
              render={({ field: { value } }) => (
                <>
                  <TouchableOpacity
                    style={[
                      styles.inputRow,
                      errors.end_location_name && styles.inputError,
                    ]}
                    onPress={() => {
                      setShowEndList((p) => !p);
                      setShowStartList(false);
                    }}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={value ? styles.inputText : styles.inputPlaceholder}
                    >
                      {value || "Select end location"}
                    </Text>
                    <Text
                      style={[
                        styles.chevron,
                        showEndList && styles.chevronOpen,
                      ]}
                    >
                      ›
                    </Text>
                  </TouchableOpacity>

                  {showEndList && (
                    <View style={styles.dropdown}>
                      <FlatList
                        data={kathmanduLocations}
                        keyExtractor={(item) => item.name}
                        style={{ maxHeight: 220 }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                          <LocationItem
                            item={item}
                            onSelect={() => {
                              setValue("end_location_name", item.name);
                              setValue("end_latitude", item.latitude);
                              setValue("end_longitude", item.longitude);
                              setShowEndList(false);
                            }}
                          />
                        )}
                      />
                    </View>
                  )}
                </>
              )}
            />
          </FieldWrapper>

          {/* START TIME */}
          <FieldWrapper label="Departure Time" icon="clock">
            <TouchableOpacity
              style={styles.inputRow}
              onPress={() => setShowTimePicker(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.inputText}>{formatTime(startTime)}</Text>
              <View style={styles.timeBadge}>
                <Text style={styles.timeBadgeText}>TAP TO CHANGE</Text>
              </View>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={startTime}
                mode="time"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onTimeChange}
                themeVariant="dark"
              />
            )}
          </FieldWrapper>
        </View>

        {/* ── Submit Button ── */}
        <TouchableOpacity
          style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.85}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#0a0f0a" />
          ) : (
            <>
              <Text style={styles.submitBtnText}>CREATE TRIP</Text>
              <View style={styles.submitIcon}>
                <Text style={{ fontSize: 16 }}>→</Text>
              </View>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.footer}>
          Trip will be visible to all assigned drivers immediately
        </Text>
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const EMERALD = "#22c55e";
const EMERALD_DIM = "#16a34a";
const BG = "#ffffff";
const CARD = "#eeeeee";
const BORDER = "#d1d5db";
const TEXT = "#cccccc";
const MUTED = "#6b7f6b";

const styles = StyleSheet.create({
  driverCard: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: "#111811",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1e2e1e",
    marginBottom: 20,
  },

  driverName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#e8f5e8",
  },

  driverVehicle: {
    fontSize: 14,
    color: "#22c55e",
    marginTop: 4,
  },
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 48,
    gap: 0,
  },

  // ── Header
  headerSection: {
    paddingTop: 8,
    paddingBottom: 24,
    gap: 8,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#0d2010",
    borderWidth: 1,
    borderColor: "#1a4a1a",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 4,
  },
  badgeText: {
    color: EMERALD,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: MUTED,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: BORDER,
    marginBottom: 20,
  },

  // ── Card
  card: {
    backgroundColor: CARD,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 20,
    gap: 4,
    marginBottom: 20,
  },

  // ── Field
  fieldWrapper: {
    gap: 8,
    marginBottom: 16,
  },
  fieldLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  fieldLabelText: {
    fontSize: 12,
    fontWeight: "600",
    color: MUTED,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  errorText: {
    fontSize: 12,
    color: "#f87171",
    marginTop: 2,
  },

  // ── Input
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eeeeee",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    minHeight: 52,
  },
  inputError: {
    borderColor: "#f87171",
  },
  input: {
    flex: 1,
    color: TEXT,
    fontSize: 15,
    fontWeight: "500",
    padding: 0,
  },
  inputUppercase: {
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  inputText: {
    flex: 1,
    color: TEXT,
    fontSize: 15,
    fontWeight: "500",
  },
  inputPlaceholder: {
    flex: 1,
    color: "#3a5a3a",
    fontSize: 15,
  },
  chevron: {
    color: MUTED,
    fontSize: 22,
    fontWeight: "300",
    transform: [{ rotate: "0deg" }],
  },
  chevronOpen: {
    transform: [{ rotate: "90deg" }],
  },

  // ── Dropdown
  dropdown: {
    backgroundColor: "#0d150d",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 4,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    borderColor: "#161f16",
    gap: 10,
  },
  locationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: EMERALD,
  },
  locationItemText: {
    flex: 1,
    color: TEXT,
    fontSize: 14,
    fontWeight: "500",
  },
  locationCoords: {
    color: MUTED,
    fontSize: 11,
  },

  // ── Route Connector
  routeConnector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
    gap: 8,
  },
  routeLine: {
    flex: 1,
    height: 1,
    backgroundColor: BORDER,
  },
  routeArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#0d2010",
    borderWidth: 1,
    borderColor: "#1a4a1a",
    alignItems: "center",
    justifyContent: "center",
  },
  routeArrowText: {
    color: EMERALD,
    fontSize: 14,
  },

  // ── Time Badge
  timeBadge: {
    backgroundColor: "#0d2010",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  timeBadgeText: {
    color: EMERALD,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
  },

  // ── Submit
  submitBtn: {
    backgroundColor: EMERALD,
    borderRadius: 12,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: EMERALD,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  submitBtnDisabled: {
    backgroundColor: EMERALD_DIM,
    shadowOpacity: 0,
    elevation: 0,
  },
  submitBtnText: {
    color: "#0a0f0a",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 2,
  },
  submitIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Footer
  footer: {
    textAlign: "center",
    color: MUTED,
    fontSize: 12,
    marginTop: 16,
    lineHeight: 18,
  },
});
