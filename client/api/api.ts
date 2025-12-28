export async function fetchBuses() {
  // Replace with real backend API
  return [
    { id: 1, busNo: "27", route: "Ratnapark → Kalanki", eta: 18, status: "Live", lat: 27.7017, lng: 85.3206 },
    { id: 2, busNo: "12", route: "Ratnapark → Balkhu → Kalanki", eta: 24, status: "Moderate", lat: 27.705, lng: 85.312 },
    { id: 3, busNo: "5", route: "Tripureshwor → Kalanki", eta: 30, status: "Live", lat: 27.709, lng: 85.31 },
  ];
}

export async function fetchDrivers() {
  return [
    { id: 1, name: "Ram", busNo: "27" },
    { id: 2, name: "Shyam", busNo: "12" },
  ];
}
