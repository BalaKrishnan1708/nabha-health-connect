export type Language = "en" | "pa"

export interface TranslationKeys {
  // Navigation
  "nav.home": string
  "nav.dashboard": string
  "nav.appointments": string
  "nav.records": string
  "nav.pharmacy": string
  "nav.profile": string
  "nav.logout": string

  // Authentication
  "auth.login": string
  "auth.register": string
  "auth.email": string
  "auth.password": string
  "auth.confirmPassword": string
  "auth.fullName": string
  "auth.phoneNumber": string
  "auth.role": string
  "auth.patient": string
  "auth.doctor": string
  "auth.pharmacy": string
  "auth.loginButton": string
  "auth.registerButton": string
  "auth.forgotPassword": string

  // Biometric Authentication
  "biometric.title": string
  "biometric.notSupported": string
  "biometric.patientDesc": string
  "biometric.staffDesc": string
  "biometric.fingerprint": string
  "biometric.face": string
  "biometric.authenticating": string
  "biometric.security": string
  "biometric.failed": string

  // Voice Interface
  "voice.title": string
  "voice.notSupported": string
  "voice.listening": string
  "voice.heard": string
  "voice.accuracy": string
  "voice.languages": string
  "voice.culturalContext": string
  "voice.testMessage": string

  // Sync System
  "sync.title": string
  "sync.offline": string
  "sync.syncing": string
  "sync.conflicts": string
  "sync.pending": string
  "sync.upToDate": string
  "sync.never": string
  "sync.pendingLabel": string
  "sync.conflictsLabel": string
  "sync.syncNow": string
  "sync.operationalTransform": string
  "sync.conflictFree": string
  "sync.autoMerge": string
  "sync.optimized": string

  // Admin Dashboard
  "admin.analytics": string
  "admin.realTime": string
  "admin.villagesServed": string
  "admin.totalUsers": string
  "admin.activeConsultations": string
  "admin.offlineUsers": string
  "admin.aiPerformance": string
  "admin.accuracy": string
  "admin.responseTime": string
  "admin.systemHealth": string
  "admin.uptime": string
  "admin.securityAlerts": string
  "admin.todayStats": string
  "admin.consultations": string
  "admin.newUsers": string
  "admin.medicineRequests": string
  "admin.emergencies": string
  "admin.technicalSpecs": string
  "admin.authentication": string
  "admin.encryption": string
  "admin.videoTech": string
  "admin.aiTech": string

  // Dashboard
  "dashboard.welcome": string
  "dashboard.appointments": string
  "dashboard.upcomingAppointments": string
  "dashboard.healthRecords": string
  "dashboard.symptomChecker": string
  "dashboard.pharmacyLocator": string
  "dashboard.quickActions": string

  // Appointments
  "appointments.book": string
  "appointments.upcoming": string
  "appointments.past": string
  "appointments.selectDoctor": string
  "appointments.selectDate": string
  "appointments.selectTime": string
  "appointments.reason": string
  "appointments.bookAppointment": string
  "appointments.cancel": string
  "appointments.reschedule": string
  "appointments.videoCall": string

  // Health Records
  "records.medical": string
  "records.prescriptions": string
  "records.testResults": string
  "records.allergies": string
  "records.medications": string
  "records.addRecord": string
  "records.viewDetails": string

  // Symptom Checker
  "symptoms.checker": string
  "symptoms.describe": string
  "symptoms.analyze": string
  "symptoms.analyzing": string
  "symptoms.results": string
  "symptoms.recommendations": string
  "symptoms.urgency": string
  "symptoms.followUp": string
  "symptoms.emergency": string

  // Pharmacy
  "pharmacy.locator": string
  "pharmacy.search": string
  "pharmacy.available": string
  "pharmacy.outOfStock": string
  "pharmacy.inventory": string
  "pharmacy.orders": string
  "pharmacy.sales": string

  // Common
  "common.save": string
  "common.cancel": string
  "common.edit": string
  "common.delete": string
  "common.search": string
  "common.filter": string
  "common.loading": string
  "common.error": string
  "common.success": string
  "common.close": string
  "common.next": string
  "common.previous": string
  "common.submit": string
}

export const translations: Record<Language, TranslationKeys> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.dashboard": "Dashboard",
    "nav.appointments": "Appointments",
    "nav.records": "Records",
    "nav.pharmacy": "Pharmacy",
    "nav.profile": "Profile",
    "nav.logout": "Logout",

    // Authentication
    "auth.login": "Login",
    "auth.register": "Register",
    "auth.email": "Email Address",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.fullName": "Full Name",
    "auth.phoneNumber": "Phone Number",
    "auth.role": "Role",
    "auth.patient": "Patient",
    "auth.doctor": "Doctor",
    "auth.pharmacy": "Pharmacy",
    "auth.loginButton": "Sign In",
    "auth.registerButton": "Create Account",
    "auth.forgotPassword": "Forgot Password?",

    // Biometric Authentication
    "biometric.title": "Biometric Authentication",
    "biometric.notSupported": "Biometric authentication not supported on this device",
    "biometric.patientDesc": "Secure access with biometric + PIN verification",
    "biometric.staffDesc": "Multi-factor authentication required for staff access",
    "biometric.fingerprint": "Fingerprint",
    "biometric.face": "Face ID",
    "biometric.authenticating": "Authenticating...",
    "biometric.security": "Security Level",
    "biometric.failed": "Authentication failed. Please try again.",

    // Voice Interface
    "voice.title": "Voice Interface",
    "voice.notSupported": "Voice recognition not supported",
    "voice.listening": "Listening...",
    "voice.heard": "You said",
    "voice.accuracy": "Recognition Accuracy",
    "voice.languages": "Languages Supported",
    "voice.culturalContext": "Cultural Context Aware",
    "voice.testMessage": "Voice interface is working correctly",

    // Sync System
    "sync.title": "Offline Sync",
    "sync.offline": "Offline Mode",
    "sync.syncing": "Syncing...",
    "sync.conflicts": "{count} conflicts detected",
    "sync.pending": "{count} changes pending",
    "sync.upToDate": "All data synchronized",
    "sync.never": "Never synced",
    "sync.pendingLabel": "Pending",
    "sync.conflictsLabel": "Conflicts",
    "sync.syncNow": "Sync Now",
    "sync.operationalTransform": "Operational Transform",
    "sync.conflictFree": "Conflict-Free",
    "sync.autoMerge": "Auto-Merge",
    "sync.optimized": "Optimized",

    // Admin Dashboard
    "admin.analytics": "Real-time Analytics",
    "admin.realTime": "Live Data",
    "admin.villagesServed": "Villages Served",
    "admin.totalUsers": "Total Users",
    "admin.activeConsultations": "Active Consultations",
    "admin.offlineUsers": "Offline Users",
    "admin.aiPerformance": "AI Performance",
    "admin.accuracy": "Accuracy",
    "admin.responseTime": "Response Time",
    "admin.systemHealth": "System Health",
    "admin.uptime": "Uptime",
    "admin.securityAlerts": "Security Alerts",
    "admin.todayStats": "Today's Statistics",
    "admin.consultations": "Consultations",
    "admin.newUsers": "New Registrations",
    "admin.medicineRequests": "Medicine Requests",
    "admin.emergencies": "Emergency Alerts",
    "admin.technicalSpecs": "Technical Specifications",
    "admin.authentication": "Authentication",
    "admin.encryption": "Encryption",
    "admin.videoTech": "Video Technology",
    "admin.aiTech": "AI Technology",

    // Dashboard
    "dashboard.welcome": "Welcome to Nabha Health Connect",
    "dashboard.appointments": "Appointments",
    "dashboard.upcomingAppointments": "Upcoming Appointments",
    "dashboard.healthRecords": "Health Records",
    "dashboard.symptomChecker": "Symptom Checker",
    "dashboard.pharmacyLocator": "Pharmacy Locator",
    "dashboard.quickActions": "Quick Actions",

    // Appointments
    "appointments.book": "Book Appointment",
    "appointments.upcoming": "Upcoming",
    "appointments.past": "Past",
    "appointments.selectDoctor": "Select Doctor",
    "appointments.selectDate": "Select Date",
    "appointments.selectTime": "Select Time",
    "appointments.reason": "Reason for Visit",
    "appointments.bookAppointment": "Book Appointment",
    "appointments.cancel": "Cancel",
    "appointments.reschedule": "Reschedule",
    "appointments.videoCall": "Video Call",

    // Health Records
    "records.medical": "Medical Records",
    "records.prescriptions": "Prescriptions",
    "records.testResults": "Test Results",
    "records.allergies": "Allergies",
    "records.medications": "Current Medications",
    "records.addRecord": "Add Record",
    "records.viewDetails": "View Details",

    // Symptom Checker
    "symptoms.checker": "AI Symptom Checker",
    "symptoms.describe": "Describe your symptoms in detail...",
    "symptoms.analyze": "Analyze Symptoms",
    "symptoms.analyzing": "AI analyzing symptoms...",
    "symptoms.results": "Analysis Results",
    "symptoms.recommendations": "Recommendations",
    "symptoms.urgency": "Urgency Level",
    "symptoms.followUp": "Follow-up recommended",
    "symptoms.emergency": "Seek immediate medical attention",

    // Pharmacy
    "pharmacy.locator": "Pharmacy Locator",
    "pharmacy.search": "Search Medicine",
    "pharmacy.available": "Available",
    "pharmacy.outOfStock": "Out of Stock",
    "pharmacy.inventory": "Inventory Management",
    "pharmacy.orders": "Prescription Orders",
    "pharmacy.sales": "Sales Reports",

    // Common
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.close": "Close",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.submit": "Submit",
  },
  pa: {
    // Navigation - Punjabi translations
    "nav.home": "ਘਰ",
    "nav.dashboard": "ਡੈਸ਼ਬੋਰਡ",
    "nav.appointments": "ਮੁਲਾਕਾਤਾਂ",
    "nav.records": "ਰਿਕਾਰਡ",
    "nav.pharmacy": "ਦਵਾਈ ਦੁਕਾਨ",
    "nav.profile": "ਪ੍ਰੋਫਾਈਲ",
    "nav.logout": "ਲਾਗ ਆਊਟ",

    // Authentication
    "auth.login": "ਲਾਗਇਨ",
    "auth.register": "ਰਜਿਸਟਰ",
    "auth.email": "ਈਮੇਲ ਪਤਾ",
    "auth.password": "ਪਾਸਵਰਡ",
    "auth.confirmPassword": "ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
    "auth.fullName": "ਪੂਰਾ ਨਾਮ",
    "auth.phoneNumber": "ਫੋਨ ਨੰਬਰ",
    "auth.role": "ਭੂਮਿਕਾ",
    "auth.patient": "ਮਰੀਜ਼",
    "auth.doctor": "ਡਾਕਟਰ",
    "auth.pharmacy": "ਦਵਾਈ ਦੁਕਾਨ",
    "auth.loginButton": "ਸਾਈਨ ਇਨ",
    "auth.registerButton": "ਖਾਤਾ ਬਣਾਓ",
    "auth.forgotPassword": "ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?",

    // Biometric Authentication
    "biometric.title": "ਬਾਇਓਮੈਟ੍ਰਿਕ ਪ੍ਰਮਾਣਿਕਤਾ",
    "biometric.notSupported": "ਇਸ ਡਿਵਾਈਸ ਤੇ ਬਾਇਓਮੈਟ੍ਰਿਕ ਪ੍ਰਮਾਣਿਕਤਾ ਸਮਰਥਿਤ ਨਹੀਂ ਹੈ",
    "biometric.patientDesc": "ਬਾਇਓਮੈਟ੍ਰਿਕ + PIN ਪੁਸ਼ਟੀ ਨਾਲ ਸੁਰੱਖਿਤ ਪਹੁੰਚ",
    "biometric.staffDesc": "ਸਟਾਫ ਪਹੁੰਚ ਲਈ ਮਲਟੀ-ਫੈਕਟਰ ਪ੍ਰਮਾਣਿਕਤਾ ਲੋੜੀਂਦੀ ਹੈ",
    "biometric.fingerprint": "ਫਿੰਗਰਪ੍ਰਿੰਟ",
    "biometric.face": "ਫੇਸ ID",
    "biometric.authenticating": "ਪ੍ਰਮਾਣਿਕਤਾ ਕਰ ਰਿਹਾ ਹੈ...",
    "biometric.security": "ਸੁਰੱਖਿਆ ਪੱਧਰ",
    "biometric.failed": "ਪ੍ਰਮਾਣਿਕਤਾ ਅਸਫਲ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",

    // Voice Interface
    "voice.title": "ਆਵਾਜ਼ ਇੰਟਰਫੇਸ",
    "voice.notSupported": "ਆਵਾਜ਼ ਪਛਾਣ ਸਮਰਥਿਤ ਨਹੀਂ ਹੈ",
    "voice.listening": "ਸੁਣ ਰਿਹਾ ਹੈ...",
    "voice.heard": "ਤੁਸੀਂ ਕਿਹਾ",
    "voice.accuracy": "ਪਛਾਣ ਸ਼ੁੱਧਤਾ",
    "voice.languages": "ਸਮਰਥਿਤ ਭਾਸ਼ਾਵਾਂ",
    "voice.culturalContext": "ਸੱਭਿਆਚਾਰਕ ਸੰਦਰਭ ਜਾਣੂ",
    "voice.testMessage": "ਆਵਾਜ਼ ਇੰਟਰਫੇਸ ਸਹੀ ਤਰੀਕੇ ਨਾਲ ਕੰਮ ਕਰ ਰਿਹਾ ਹੈ",

    // Sync System
    "sync.title": "ਔਫਲਾਈਨ ਸਿੰਕ",
    "sync.offline": "ਔਫਲਾਈਨ ਮੋਡ",
    "sync.syncing": "ਸਿੰਕ ਕਰ ਰਿਹਾ ਹੈ...",
    "sync.conflicts": "{count} ਟਕਰਾਅ ਮਿਲੇ",
    "sync.pending": "{count} ਬਦਲਾਅ ਬਾਕੀ ਹਨ",
    "sync.upToDate": "ਸਾਰਾ ਡੇਟਾ ਸਿੰਕ ਹੋ ਗਿਆ",
    "sync.never": "ਕਦੇ ਸਿੰਕ ਨਹੀਂ ਹੋਇਆ",
    "sync.pendingLabel": "ਬਾਕੀ",
    "sync.conflictsLabel": "ਟਕਰਾਅ",
    "sync.syncNow": "ਹੁਣ ਸਿੰਕ ਕਰੋ",
    "sync.operationalTransform": "ਔਪਰੇਸ਼ਨਲ ਟ੍ਰਾਂਸਫਾਰਮ",
    "sync.conflictFree": "ਟਕਰਾਅ-ਮੁਕਤ",
    "sync.autoMerge": "ਆਟੋ-ਮਰਜ",
    "sync.optimized": "ਅਨੁਕੂਲਿਤ",

    // Admin Dashboard
    "admin.analytics": "ਰੀਅਲ-ਟਾਈਮ ਵਿਸ਼ਲੇਸ਼ਣ",
    "admin.realTime": "ਲਾਈਵ ਡੇਟਾ",
    "admin.villagesServed": "ਸੇਵਾ ਕੀਤੇ ਪਿੰਡ",
    "admin.totalUsers": "ਕੁੱਲ ਉਪਭੋਗਤਾ",
    "admin.activeConsultations": "ਸਰਗਰਮ ਸਲਾਹ-ਮਸ਼ਵਰੇ",
    "admin.offlineUsers": "ਔਫਲਾਈਨ ਉਪਭੋਗਤਾ",
    "admin.aiPerformance": "AI ਪ੍ਰਦਰਸ਼ਨ",
    "admin.accuracy": "ਸ਼ੁੱਧਤਾ",
    "admin.responseTime": "ਜਵਾਬ ਸਮਾਂ",
    "admin.systemHealth": "ਸਿਸਟਮ ਸਿਹਤ",
    "admin.uptime": "ਅਪਟਾਈਮ",
    "admin.securityAlerts": "ਸੁਰੱਖਿਆ ਚੇਤਾਵਨੀਆਂ",
    "admin.todayStats": "ਅੱਜ ਦੇ ਅੰਕੜੇ",
    "admin.consultations": "ਸਲਾਹ-ਮਸ਼ਵਰੇ",
    "admin.newUsers": "ਨਵੇ ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
    "admin.medicineRequests": "ਦਵਾਈ ਦੀਆਂ ਬੇਨਤੀਆਂ",
    "admin.emergencies": "ਐਮਰਜੈਂਸੀ ਅਲਰਟ",
    "admin.technicalSpecs": "ਤਕਨੀਕੀ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
    "admin.authentication": "ਪ੍ਰਮਾਣਿਕਤਾ",
    "admin.encryption": "ਐਨਕ੍ਰਿਪਸ਼ਨ",
    "admin.videoTech": "ਵੀਡੀਓ ਤਕਨਾਲੋਜੀ",
    "admin.aiTech": "AI ਤਕਨਾਲੋਜੀ",

    // Dashboard
    "dashboard.welcome": "ਨਾਭਾ ਹੈਲਥ ਕਨੈਕਟ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ",
    "dashboard.appointments": "ਮੁਲਾਕਾਤਾਂ",
    "dashboard.upcomingAppointments": "ਆਉਣ ਵਾਲੀਆਂ ਮੁਲਾਕਾਤਾਂ",
    "dashboard.healthRecords": "ਸਿਹਤ ਰਿਕਾਰਡ",
    "dashboard.symptomChecker": "ਲੱਛਣ ਜਾਂਚਕਰਤਾ",
    "dashboard.pharmacyLocator": "ਦਵਾਈ ਦੁਕਾਨ ਖੋਜੀ",
    "dashboard.quickActions": "ਤੁਰੰਤ ਕਾਰਵਾਈਆਂ",

    // Appointments
    "appointments.book": "ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ",
    "appointments.upcoming": "ਆਉਣ ਵਾਲੀਆਂ",
    "appointments.past": "ਪਿਛਲੀਆਂ",
    "appointments.selectDoctor": "ਡਾਕਟਰ ਚੁਣੋ",
    "appointments.selectDate": "ਤਾਰੀਖ ਚੁਣੋ",
    "appointments.selectTime": "ਸਮਾਂ ਚੁਣੋ",
    "appointments.reason": "ਮੁਲਾਕਾਤ ਦਾ ਕਾਰਨ",
    "appointments.bookAppointment": "ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ",
    "appointments.cancel": "ਰੱਦ ਕਰੋ",
    "appointments.reschedule": "ਮੁੜ ਨਿਰਧਾਰਿਤ ਕਰੋ",
    "appointments.videoCall": "ਵੀਡੀਓ ਕਾਲ",

    // Health Records
    "records.medical": "ਮੈਡੀਕਲ ਰਿਕਾਰਡ",
    "records.prescriptions": "ਨੁਸਖੇ",
    "records.testResults": "ਟੈਸਟ ਦੇ ਨਤੀਜੇ",
    "records.allergies": "ਐਲਰਜੀਆਂ",
    "records.medications": "ਮੌਜੂਦਾ ਦਵਾਈਆਂ",
    "records.addRecord": "ਰਿਕਾਰਡ ਸ਼ਾਮਲ ਕਰੋ",
    "records.viewDetails": "ਵੇਰਵੇ ਵੇਖੋ",

    // Symptom Checker
    "symptoms.checker": "AI ਲੱਛਣ ਜਾਂਚਕਰਤਾ",
    "symptoms.describe": "ਆਪਣੇ ਲੱਛਣਾਂ ਦਾ ਵਿਸਤਾਰ ਨਾਲ ਵਰਣਨ ਕਰੋ...",
    "symptoms.analyze": "ਲੱਛਣਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
    "symptoms.analyzing": "AI ਲੱਛਣਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰ ਰਿਹਾ ਹੈ...",
    "symptoms.results": "ਵਿਸ਼ਲੇਸ਼ਣ ਦੇ ਨਤੀਜੇ",
    "symptoms.recommendations": "ਸਿਫਾਰਸ਼ਾਂ",
    "symptoms.urgency": "ਤਤਕਾਲਤਾ ਦਾ ਪੱਧਰ",
    "symptoms.followUp": "ਫਾਲੋ-ਅੱਪ ਦੀ ਸਿਫਾਰਸ਼",
    "symptoms.emergency": "ਤੁਰੰਤ ਡਾਕਟਰੀ ਸਹਾਇਤਾ ਲਓ",

    // Pharmacy
    "pharmacy.locator": "ਦਵਾਈ ਦੁਕਾਨ ਖੋਜੀ",
    "pharmacy.search": "ਦਵਾਈ ਖੋਜੋ",
    "pharmacy.available": "ਉਪਲਬਧ",
    "pharmacy.outOfStock": "ਸਟਾਕ ਖਤਮ",
    "pharmacy.inventory": "ਇਨਵੈਂਟਰੀ ਪ੍ਰਬੰਧਨ",
    "pharmacy.orders": "ਨੁਸਖੇ ਦੇ ਆਰਡਰ",
    "pharmacy.sales": "ਵਿਕਰੀ ਰਿਪੋਰਟਾਂ",

    // Common
    "common.save": "ਸੇਵ ਕਰੋ",
    "common.cancel": "ਰੱਦ ਕਰੋ",
    "common.edit": "ਸੰਪਾਦਿਤ ਕਰੋ",
    "common.delete": "ਮਿਟਾਓ",
    "common.search": "ਖੋਜੋ",
    "common.filter": "ਫਿਲਟਰ",
    "common.loading": "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
    "common.error": "ਗਲਤੀ",
    "common.success": "ਸਫਲਤਾ",
    "common.close": "ਬੰਦ ਕਰੋ",
    "common.next": "ਅਗਲਾ",
    "common.previous": "ਪਿਛਲਾ",
    "common.submit": "ਜਮ੍ਹਾਂ ਕਰੋ",
  },
}

export function getTranslation(key: keyof TranslationKeys, language: Language): string {
  return translations[language][key] || translations.en[key] || key
}
