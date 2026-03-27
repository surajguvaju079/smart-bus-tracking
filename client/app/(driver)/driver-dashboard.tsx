import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import AppHeader from "@/components/AppHeader";
import { useUserStore } from "@/store/userStore";

const { width } = Dimensions.get("window");

const stats = [
  {
    label: "Trips Done",
    value: "128",
    unit: "total",
    icon: "🚗",
    color: "#16a34a",
    bg: "#dcfce7",
  },
  {
    label: "Routes Created",
    value: "34",
    unit: "routes",
    icon: "🗺️",
    color: "#0891b2",
    bg: "#cffafe",
  },
  {
    label: "Km Traveled",
    value: "4,820",
    unit: "km",
    icon: "📍",
    color: "#7c3aed",
    bg: "#ede9fe",
  },
];

const recentTrips = [
  {
    route: "Thamel → Airport",
    km: "12.4 km",
    date: "Today, 9:30 AM",
    status: "Completed",
  },
  {
    route: "Patan → Bhaktapur",
    km: "18.1 km",
    date: "Yesterday, 2:15 PM",
    status: "Completed",
  },
  {
    route: "Boudha → Lalitpur",
    km: "9.8 km",
    date: "Mar 24, 11:00 AM",
    status: "Completed",
  },
];

export default function DriverDashboard() {
  const user = useUserStore((state) => state.user);

  const router = useRouter();

  return (
    <View style={styles.container}>
      <AppHeader />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.greetingSmall}>
            Welcome back! {user?.name} 👋
          </Text>
          <Text style={styles.greetingBig}>Your Dashboard</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          {stats.map((s) => (
            <View
              key={s.label}
              style={[styles.statCard, { backgroundColor: s.bg }]}
            >
              <Text style={styles.statIcon}>{s.icon}</Text>
              <Text style={[styles.statValue, { color: s.color }]}>
                {s.value}
              </Text>
              <Text style={styles.statUnit}>{s.unit}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: "#16a34a" }]}
            onPress={() => router.push("/create-trip")}
            activeOpacity={0.85}
          >
            <Text style={styles.actionIcon}>＋</Text>
            <Text style={styles.actionText}>New Trip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: "#0891b2" }]}
            onPress={() => router.push("/active-trip")}
            activeOpacity={0.85}
          >
            <Text style={styles.actionIcon}>▶</Text>
            <Text style={styles.actionText}>Active Trip</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Trips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Trips</Text>
          {recentTrips.map((t, i) => (
            <View key={i} style={styles.tripCard}>
              <View style={styles.tripLeft}>
                <Text style={styles.tripRoute}>{t.route}</Text>
                <Text style={styles.tripMeta}>{t.date}</Text>
              </View>
              <View style={styles.tripRight}>
                <Text style={styles.tripKm}>{t.km}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{t.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const CARD_WIDTH = (width - 48) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scroll: {
    padding: 16,
    paddingBottom: 40,
  },
  greeting: {
    marginBottom: 20,
    marginTop: 4,
  },
  greetingSmall: {
    fontSize: 16,
    color: "#64748b",
    fontWeight: "600",
  },
  greetingBig: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 2,
  },

  // Stats
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  statCard: {
    width: CARD_WIDTH,
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  statIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
  },
  statUnit: {
    fontSize: 11,
    color: "#64748b",
    fontWeight: "500",
    marginTop: 1,
  },
  statLabel: {
    fontSize: 11,
    color: "#334155",
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center",
  },

  // Actions
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "700",
  },
  actionText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  // Recent Trips
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 4,
  },
  tripCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  tripLeft: {
    flex: 1,
  },
  tripRoute: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1e293b",
  },
  tripMeta: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 3,
  },
  tripRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  tripKm: {
    fontSize: 13,
    fontWeight: "700",
    color: "#16a34a",
  },
  badge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    color: "#16a34a",
    fontWeight: "600",
  },
});
