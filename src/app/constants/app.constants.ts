// export const API_URL = 'https://devserver.lippoinnolab.com';

export const API_DOMAIN = [
    'devserver.lippoinnolab.com',
    'cmsuatapi.lippoinnolab.com',
    'api.healthwaymedical.com.sg',
    'api2.healthwaymedical.com.sg',
    'cmsapi.healthwaymedical.info',
    'localhost:9090',
  ];
  
  export const enum DOC_COMP_PARENT {
    'CONSULTATION' = 'CONSULTATION',
    'PATIENT_DETAIL' = 'PATIENT_DETAIL',
    'HISTORY_DETAIL' = 'HISTORY_DETAIL',
  }
  // export const API_AA_URL = 'https://devserver.lippoinnolab.com/aacore';
  // export const API_PATIENT_VISIT_URL = 'https://devserver.lippoinnolab.com/patient-visit';
  // export const API_INVENTORY_SYSTEM_URL = 'http://127.0.0.1:8902';
  // export const API_PATIENT_INFO_URL = 'https://devserver.lippoinnolab.com/patient-info';
  // export const API_CMS_MANAGEMENT_URL = 'https://devserver.lippoinnolab.com/cms-management-proxy';
  
  export const DISPLAY_DATE_FORMAT = 'DD-MM-YYYY';
  export const DISPLAY_DATE_TIME_NO_SECONDS_FORMAT = 'DD-MM-YYYY HH:mm';
  export const DISPLAY_DATE_TIME = 'DD-MM-YYYY HH:mm:ss';
  export const DISPLAY_TIME_NO_SECONDS_FORMAT = 'hh:mm';
  export const DISPLAY_TIME_NO_SECONDS_24_FORMAT = 'HH:mm';
  export const DISPLAY_TIME_FORMAT_WIH_SLASHESH = 'DD/MM/YYYY HH:mm:ss';
  export const INVENTORY_DATE_FORMAT = 'YYYY-MM-DD';
  export const DB_FULL_DATE_FORMAT = 'DD-MM-YYYYTHH:mm:ss';
  export const DB_FULL_DATE_FORMAT_ZERO_SECOND = 'DD-MM-YYYYTHH:mm:00';
  export const DB_FULL_DATE_FORMAT_NO_SECOND = 'DD-MM-YYYYTHH:mm';
  export const DB_FULL_DATE_TIMEZONE = 'ddd MMM DD YYYY HH:mm:ss ZZ';
  export const DB_FULL_DATE_TIMEZONE_NO_SPACE = 'YYYY-MM-DDTHH:mm:ss.SSS';
  export const DB_FULL_DATE_TIMEZONE_NO_SPACE_REVERSE = 'DD-MM-YYYYTHH:mm:ss.SSS';
  export const DB_FULL_DATE_TIMEZONE_Z = 'YYYY-MM-DDTHH:mm:ssZ';
  export const DB_VISIT_DATE_FORMAT = 'DD-MM-YYYYT00:00:00';
  export const DB_VISIT_DATE_FORMAT_NO_SECOND = 'DD-MM-YYYYT00:00';
  
  export const INPUT_DELAY = 500;
  export const INPUT_DELAY_INVENTORY = 1000;
  
  export const GST = 1.07;
  
  export const MEDICAL_COVERAGES = ['INSURANCE', 'CORPORATE', 'CHAS', 'MEDISAVE'];
  
  export const PATIENT_LIST_TABLE_CONFIG = [
    { name: 'Number', prop: 'number', flexGrow: 1 }, // Let display name be #
    { name: 'Visit no', prop: 'visitno', flexGrow: 2 },
    { name: 'Name', flexGrow: 2 },
    { name: 'NRIC', flexGrow: 2 },
    { name: 'Time', flexGrow: 1 },
    { name: 'Doctor', flexGrow: 2 },
    { name: 'Purpose', flexGrow: 3 },
    { name: 'Remarks', flexGrow: 1 },
    { name: 'Status', flexGrow: 1 },
    { name: 'Action', flexGrow: 1 },
    { name: 't', prop: 'patientId', flexGrow: 0 },
    { name: 't', prop: 'patientRegistryId', flexGrow: 0 },
    { name: 't', prop: 'consultationId', flexGrow: 0 },
  ];
  
  export const INVOICE_LIST_TABLE_CONFIG = [
    { name: 'Date', prop: 'date', flexGrow: 1 }, // Let display name be #
    { name: 'Bill No', prop: 'visitno', flexGrow: 2 },
    { name: 'Clinic', flexGrow: 2 },
    { name: 'NRIC', flexGrow: 2 },
    { name: 'Patient Name', flexGrow: 1 },
    { name: 'Vendor Code', flexGrow: 2 },
    { name: 'Vendor Name', flexGrow: 3 },
    { name: 'Dr Name', flexGrow: 1 },
    { name: 'Service', flexGrow: 1 },
    { name: 'Service Amt', flexGrow: 1 },
  ];
  
  export const PATIENT_LIST_ENTRY_COUNTS_DROPDOWN = [
    { value: '25', label: '25' },
    { value: '50', label: '50' },
    {
      value: '100',
      label: '100',
    },
  ];
  
  export const PATIENT_STATUSES = [
    'INITIAL',
    'CONSULT',
    'POST_CONSULT',
    'PAYMENT',
    'COMPLETE',
  ];
  export const STATUS_INITIAL = 'INITIAL';
  export const STATUS_CONSULT = 'CONSULT';
  export const STATUS_POST_CONSULT = 'POST_CONSULT';
  export const STATUS_PAYMENT = 'PAYMENT';
  export const STATUS_COMPLETE = 'COMPLETE';
  
  export const PATIENT_QUEUE_STATUS_COLORS = [
    { status: 'INITAL', color: '#8f12fd' },
    { status: 'CONSULT', color: '#f5a523' },
    { status: 'POST_CONSULT', color: '#0094c9' },
    { status: 'PAYMENT', color: '#7ed321' },
    { status: 'COMPLETE', color: '#9b9b9b' },
  ];
  export const PATIENT_STATUSES_DROPDOWN = [
    { label: 'INITIAL', value: 'INITIAL' },
    { label: 'CONSULT', value: 'CONSULT' },
    { label: 'POST CONSULT', value: 'POST_CONSULT' },
    { label: 'PAYMENT', value: 'PAYMENT' },
    { label: 'COMPLETE', value: 'COMPLETE' },
  ];
  
  export const ISSUE_TYPE = [
    { label: 'Long Term', value: 'LONG_TERM' },
    { label: 'Short Term', value: 'SHORT_TERM' },
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' },
  ];
  
  export const PROBLEM_LIST_STATUS = ['ACTIVE', 'INACTIVE', 'ALL'];
  
  export const PATIENT_LIST_ACTION_LIST_DROPDROWN = [
    'Vital Signs',
    'Update Visit Details',
    'Update Coverage',
    'Print Lab Form',
    'Dispense',
    'Generate Video Link'
  ];
  
  export const ALLERGY_TYPES = [
    'SPECIFIC_DRUG',
    'NAME_STARTING_WITH',
    'NAME_CONTAINING',
    'ALLERGY_GROUP',
    'FOOD',
    'OTHER',
  ];
  
  export const DOCTOR_CALENDAR = 'DOCTOR_CALENDAR';
  export const CLINIC_CALENDAR = 'CLINIC_CALENDAR';
  
  export const SILVER_CROSS_GROUP = 'Silver Cross Group';
  
  export const DEFAULT_TEMPLATE_CLINIC_NAME = 'HEALTHWAY MEDICAL CLINIC';
  export const DEFAULT_TEMPLATE_CLINIC_LETTERHEAD = 'HEALTHWAY MEDICAL';
  
  export const SILVER_CROSS_CLINIC_NAME = 'SILVER CROSS CLINIC';
  export const SILVER_CROSS_CLINIC_LETTERHEAD = 'SILVER CROSS';
  
  export const CLINIC_LOGO = new Map([
    ['Silver Cross Group', '/assets/img/hmc_logo.jpg'],
    ['Healthway Medical Group', '/assets/img/new_hmc_logo.png'],
  ]);
  
  export const ALLERGIES = [
    'nut allergy',
    'egg allergy',
    'other allergy',
    'unknown allergy',
  ];
  
  export const ALERT_TYPES = [
    'CHRONIC_DISEASE',
    'MEDICAL_CONDITION',
    'MEDICATION',
    'OTHER',
  ];
  
  export const ALERT_PRIORITY = ['HIGH', 'LOW'];
  
  export const MC_REASONS = [
    'UNFIT FOR DUTY',
    'UNFIT FOR ICT',
    'UNFIT FOR SCHOOL',
    'EXCUSED SHOES/SOCKS',
    'UNFIT FOR PHYSICAL EXERCISE',
    'EXCUSED LOWER LIMB ACTIVITIES',
    'LIGHT DUTIES ONLY',
    'FIT FOR DUTY',
    'UNFIT FOR IPPT',
    'FIT FOR SCHOOL',
    'UNFIT FOR REMEDIAL TRAINING',
    'HOSPITALISATION LEAVE',
    'MATERNITY LEAVE',
    'OUTPATIENT SICK LEAVE',
    'UNFIT FOR PHYSICAL ACTIVITIES',
    'UNFIT FOR CCA',
    'UNFIT FOR TRAVEL',
    'OTHERS',
  ];
  
  export const MC_REASONS_DROPDOWN = [
    { label: 'UNFIT FOR DUTY', value: 'UNFIT FOR DUTY' },
    { label: 'UNFIT FOR ICT', value: 'UNFIT FOR ICT' },
    { label: 'UNFIT FOR SCHOOL', value: 'UNFIT FOR SCHOOL' },
    { label: 'UNFIT (Mandatory)', value: 'UNFIT (Mandatory)' },
    { label: 'EXCUSED SHOES/SOCKS', value: 'EXCUSED SHOES/SOCKS' },
    {
      label: 'UNFIT FOR PHYSICAL EXERCISE',
      value: 'UNFIT FOR PHYSICAL EXERCISE',
    },
    { label: 'UNFIT FOR CCA', value: 'UNFIT FOR CCA' },
    { label: 'UNFIT FOR TRAVEL', value: 'UNFIT FOR TRAVEL' },
    {
      label: 'EXCUSED LOWER LIMB ACTIVITIES',
      value: 'EXCUSED LOWER LIMB ACTIVITIES',
    },
    { label: 'LIGHT DUTIES ONLY', value: 'LIGHT DUTIES ONLY' },
    { label: 'FIT FOR DUTY', value: 'FIT FOR DUTY' },
    { label: 'UNFIT FOR IPPT', value: 'UNFIT FOR IPPT' },
    { label: 'FIT FOR SCHOOL', value: 'FIT FOR SCHOOL' },
    {
      label: 'UNFIT FOR REMEDIAL TRAINING',
      value: 'UNFIT FOR REMEDIAL TRAINING',
    },
    { label: 'HOSPITALISATION LEAVE', value: 'HOSPITALISATION LEAVE' },
    { label: 'MATERNITY LEAVE', value: 'MATERNITY LEAVE' },
    { label: 'OUTPATIENT SICK LEAVE', value: 'OUTPATIENT SICK LEAVE' },
    {
      label: 'UNFIT FOR PHYSICAL ACTIVITIES',
      value: 'UNFIT FOR PHYSICAL ACTIVITIES',
    },
    { label: 'OTHERS', value: 'OTHERS' },
  ];
  
  export const MC_HALFDAY_OPTIONS = [
    { label: 'AM - Last Day', value: 'AM_LAST' },
    { label: 'PM - First Day', value: 'PM_FIRST' },
  ];
  
  
  export const HEADER_TITLES = [
    { url: '/pages/appointments/overview', value: 'Appointments' },
    // { url: '/pages/patient/list', value: 'Patient Registry' },
    { url: '/pages/patient', value: 'Patient Registry' },
    { url: '/pages/appointments', value: 'Appointments' },
  
    { url: '/pages/consultation/add', value: 'Consultation' },
    { url: '/pages/patient/search', value: 'Patients / Search Patients' },
    { url: '/pages/patient/detail', value: 'Patient Particulars' },
    { url: '/pages/patient/detail?tabIndex=1', value: 'Patient Particulars' },
    { url: '/pages/patient/add', value: 'Add New Patient' },
    { url: '/pages/payment/charge', value: 'Collect Payment' },
    { url: '/pages/payment/collect', value: 'Collect Payment' },
    { url: '/pages/communications/main/follow-ups', value: 'Communications' },
    { url: '/pages/communications', value: 'Communications' },
    { url: '/pages/claim/claim-home', value: 'Claims' },
    { url: '/pages/claim/manual-claim', value: 'Manual Claims' },
    { url: '/pages/claim/mhcp-claim', value: 'MHCP Claims' },
    { url: '/pages/report', value: 'Reports' },
    { url: '/pages/report/search', value: 'Reports' },
    { url: '/pages/inventory/main', value: 'Inventory' },
    { url: '/pages/inventory/detail/', value: 'Requisitions Detail' },
    {
      url: '/pages/inventory/purchase-request',
      value: 'Purchase Request (Standard)',
    },
    {
      url: '/pages/inventory/purchase-request;special=true',
      value: 'Purchase Request (Loose)',
    },
    { url: '/pages/inventory/return-request/', value: 'Return Request' },
    {
      url: '/pages/inventory/return-request-detail/',
      value: 'Return Request Detail',
    },
    { url: '/pages/case/list', value: 'Case Manager' },
    { url: '/pages/case/detail', value: 'Case Details' },
    { url: '/pages/settings', value: 'Settings' },
    { url: '/pages/settings/templates', value: 'Settings' },
    { url: '/pages/pcn/list', value: 'Primary Care Network' },
    { url: '/pages/invoice', value: 'Invoice Management' },
    { url: '/pages/invoice/list', value: 'Invoice Management' },
    { url: '/pages/invoice/search', value: 'Search Invoice' },
    { url: '/pages/invoice/verify', value: 'Verify Invoices' },
    { url: '/pages/notes/list', value: 'User Notes' },
    { url: '/pages/queries/list', value: 'Search Category' },
  ];
  
  export const LOCK_NOTES_DROPDOWN = [
    {
      short_label: 'Lock for CA',
      long_label: 'Lock for CA',
      value: 'LOCK_FOR_CA',
    },
    {
      short_label: 'Lock for All',
      long_label: 'Lock for All',
      value: 'LOCK_FOR_ALL',
    },
    { short_label: 'Open', long_label: 'Open', value: 'OPEN' },
  ];
  
  export const PATIENT_INFO_KEYS = [
    'title',
    'preferredMethodOfCommunication',
    'consentGiven',
    'race',
    'preferredLanguage',
    'name',
    'dob',
    'userId',
    'gender',
    'contactNumber',
    'secondaryNumber',
    'status',
    'address',
    'emailAddress',
    'emergencyContactNumber',
    'company',
    'nationality',
    'maritalStatus',
    'allergies',
    'patientVaccinations',
    'primaryCareNetwork',
  ];
  
  export const DAY_OF_WEEK = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ];
  
  export const DAY_INT_OF_WEEK = [
    { MONDAY: 1 },
    { TUESDAY: 2 },
    { WEDNESDAY: 3 },
    { THURSDAY: 4 },
    { FRIDAY: 5 },
    { SATURDAY: 6 },
    { SUNDAY: 7 },
  ];
  
  export const CLINIC_NOTES_TITLE = 'Notes to Clinic Staff';
  export const CONS_NOTES_TITLE = 'Diagnosis / Notes';
  export const CASH = 'Cash';
  
  export const ITEM_DRUG = 'DRUG';
  export const ITEM_CONSULTATION = 'CONSULTATION';
  export const ITEM_MEDICAL_SERVICE = 'SERVICE';
  export const ITEM_LABORATORY = 'LABORATORY';
  export const ITEM_VACCINATION = 'VACCINATION';
  
  export const APPOINTMENT_TYPE = [
    'APPOINTMENT',
    'CLINIC_HOLIDAY',
    'DOCTOR_BLOCKED_TIME',
    'DOCTOR_LEAVE',
  ];
  
  export const TABS = {
    PROFILE: 'Profile',
    VITALS: 'Vital Signs',
    ASSESSMENTS: 'Assessments',
    HISTORY: 'History',
    CONSULTATION: 'Consultation',
    PCN: 'Primary Care Network',
    SERVICES: 'Medical Services',
    COVERAGE: 'Coverage',
    DOCUMENTS: 'Documents',
    DISPENSING: 'Dispensing',
    PRINTING: 'Printing',
    PAYMENT: 'Payment',
  };
  
  export enum PCNFORMS {
    PATIENTEXTRADETAILSFORM = 'patientExtraDetailsForm',
    PATIENTCONDITIONFORM = 'patientConditionForm',
    COMPLICATIONFORM = 'complicationForm',
    VITALFORM = 'vitalForm',
    ASSESSMENTFORM = 'assessmentForm',
  }
  
  export const DOCTOR_BLOCKED_TIME = 'DOCTOR_BLOCKED_TIME';
  export const CLINIC_BLOCKED_TIME = 'CLINIC_BLOCKED_TIME';
  export const DOCTOR_LEAVE = 'DOCTOR_LEAVE';
  export const CLINIC_HOLIDAY = 'CLINIC_HOLIDAY';
  export const APPOINTMENT = 'APPOINTMENT';
  
  export const CONFIRM_DOUBLE_REGISTRATION =
    'This patient has already registered a visit in the registry. Do you still want to proceed?';
  
    export const CANCELLED_VISIT =
    'This patient cancelled the visit.';
  
  
  
  // Inventory Invalid Msgs
  export const SEPARATE_BATCH_AVAILABLE =
    'Items are available in different batches. Please issue item separately.';
  // export const SEPARATE_BATCH_AVAILABLE = 'Input quantity exceeds batch stock. Please add separate batch.';
  
  export const INSUFFICIENT_STOCK = 'Stock may not be sufficient.';
  export const UNAVAILABLE_INVENTORY =
    'This item is not available in the inventory.';
  
  export const CHAS_BALANCE_UNAVAILABLE =
    "CHAS balance can't be retrieved. Please check with the portal.";
  export const BALANCE_UNAVAILABLE =
    'Balance is unavailable. Please check with the portal.';
  
  export const PCN_CONDITIONS = [
    { name: 'Pre-Diabetes', selected: false, id: 1 },
    { name: 'Diabetes', selected: false, id: 2 },
    { name: 'Hypertension', selected: false, id: 3 },
    { name: 'Lipid Disorders', selected: false, id: 4 },
    { name: 'Stroke', selected: false, id: 5 },
    { name: 'Dementia', selected: false, id: 2 },
    { name: 'Asthma', selected: false, id: 6 },
    { name: 'COPD', selected: false, id: 7 },
    { name: 'Osteoarthritis', selected: false, id: 8 },
    { name: 'Benign Prostatic Hyperplasia', selected: false, id: 9 },
    { name: 'Nephritis / Nephrosis', selected: false, id: 10 },
    { name: "Parkinson's Disease", selected: false, id: 11 },
    { name: 'Epilepsy', selected: false, id: 12 },
    { name: 'Osteoporosis', selected: false, id: 13 },
    { name: 'Psoriasis', selected: false, id: 14 },
    { name: 'Rheumatoid arthritis', selected: false, id: 15 },
  ];
  
  export const PCN_CHAS_STATUS = [
    'CHAS Blue',
    'CHAS Orange',
    'CHAS Green',
    'MG',
    'PA',
    'PG',
    'Non-CHAS',
  ];
  
  export const DOCTOR_BLOCK_TYPE = [
    { name: 'Leave', value: 'AL' },
    { name: 'Blocked Time', value: 'BL' },
  ];
  
  export const PCN_MEDISAVE_USAGE = [
    {
      value: true,
      label: 'YES',
    },
    { value: false, label: 'NO' },
  ];
  
  export const PCN_REFERENCE_SOURCE = [
    'Self',
    'Polyclinic',
    'Private Clinics/Hospitals',
    'PHIs/SOCs',
    'FMCs',
  ];
  
  export const DATA_SAVED_SUCCESSFULLY = 'Data Saved Successfully.';
  
  export const COVERAGE_MODE = {
    ADD_TO_REGISTRY: 'ADD_TO_REGISTRY',
    ATTACH_MEDICAL_COVERAGE: 'ATTACH_MEDICAL_COVERAGE',
    DISPLAY_MEDICAL_COVERAGE: 'DISPLAY_MEDICAL_COVERAGE',
    REGISTER_PATIENT_ONLY: 'REGISTER_PATIENT_ONLY',
  };
  
  export const colors: any = {
    red: {
      primary: '#EFC7C2',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#FFE5D4',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#BFD3C1',
      secondary: '#FDF1BA',
    },
    green: {
      primary: '#E0D3DE',
      secondary: '#FDF1BA',
    },
    black: {
      primary: '#FFFFFF',
      secondary: '#000000',
    },
  };
  
  export const doctorColorCode: any = [
    '#E3B23C',
    '#8FC93A',
    '#1E91D6',
    '#A06CD5',
    '#FFA69E',
    '#FFEECF',
    '#4B3F72',
    '#417B5A',
    '#D0CEBA',
    '#A06CD5',
    '#E9D2C0',
    '#A4B494',
    '#90AA86',
    '#417B5A',
    '#4A2545',
    '#8B575C',
    '#C98986',
    '#F6BDD1',
    '#87D68D',
    '#93B48B',
    '#8491A3',
    '#9FA4A9',
    '#847E89',
    '#AFBFC0',
    '#273C2C',
    '#626868',
    '#939196',
    '#9FA4A9',
    '#D3C1D2',
    '#FFE2FE',
    '#EAD2AC',
    '#DF928E',
    '#C58882',
    '#D1DEDE',
    '#BEBBBB',
    '#DB8A74',
  ];
  
  export const locumColorCode = '#3949ab';
  export const noPreferredDoctorColorCode = '#4D4861';
  
  export const EMERGENCY_CONTACT_RELATIONSHIPS = [
    { value: 'SPOUSE', label: 'SPOUSE' },
    { value: 'FATHER', label: 'FATHER' },
    { value: 'MOTHER', label: 'MOTHER' },
    { value: 'PARENT', label: 'PARENT' },
    { value: 'CHILDREN', label: 'CHILDREN' },
    { value: 'IN_LAWS', label: 'IN LAWS' },
    { value: 'GRANDPARENT', label: 'GRANDPARENT' },
    { value: 'FRIEND', label: 'FRIEND' },
    { value: 'RELATIVE', label: 'RELATIVE' },
    { value: 'OTHER', label: 'OTHER' },
  ];
  
  export const TOASTR_TIMEOUT = 3000;
  
  
  
  export const CLINICS_ARRAY = [{​​​​​​​
  
  
  
  "id" :"5baae28d93bc1661aa7b1aee",
  "name" : "HEALTHWAY KWSC",
  "groupName":"",
  "address" : {​​​​​​​
      "address" : "KWONG WAI SHIU HOSPITAL,\n705 SERANGOON ROAD, BLK A, #01-06",
      "postalCode" : "328127"
  }​​​​​​​,
  "contactNumber" : "62914331",
  "clinicCode" : "KWSC",
  
  "faxNumber":"",
  "attendingDoctorId":[],
  "clinicStaffUsernames":[],
  "companyRegistrationNumber":"",
  "gstRegistrationNumber":"",
  "heCode":"",
  "clinicLogo":"",
  "pcnRegistered":false,
  "clinicFeatures":[],
  "status":""
  }​​​​​​​,
  {​​​​​​​
  "id" : "5b55aabd0550de0021097bd7",
  "name" : "HEALTHWAY MEDICAL-JP",
  "groupName":"",
  "address" : {​​​​​​​
      "address" : "BLK 690 JURONG WEST CENTRAL 1\n#01-193",
      "postalCode" : "640690"
  }​​​​​​​,
  "contactNumber" : "67921812",
  "clinicCode" : "JP",
  
  "faxNumber":"",
  "attendingDoctorId":[],
  "clinicStaffUsernames":[],
  "companyRegistrationNumber":"",
  "gstRegistrationNumber":"",
  "heCode":"",
  "clinicLogo":"",
  "pcnRegistered":false,
  "clinicFeatures":[],
  "status":""
  }​​​​​​​,
  {​​​​​​​
  "id" : "5b55aabd0550de0021097be6",
  "name" : "HEALTHWAY MEDICAL-TCC",
  "groupName":"",
  "address" : {​​​​​​​
      "address" : "BLK 503 TAMPINES CENTRAL 1\n#01-311",
      "postalCode" : "520503"
  }​​​​​​​,
  "contactNumber" : "67890383",
  "clinicCode" : "TCC",
  
  "faxNumber":"",
  "attendingDoctorId":[],
  "clinicStaffUsernames":[],
  "companyRegistrationNumber":"",
  "gstRegistrationNumber":"",
  "heCode":"",
  "clinicLogo":"",
  "pcnRegistered":false,
  "clinicFeatures":[],
  "status":""
  }​​​​​​​,
  {​​​​​​​
  "id" : "5b55aabd0550de0021097be8",
  "name" : "HEALTHWAY MEDICAL-TPC",
  "groupName":"",
  "address" : {​​​​​​​
      "address" : "BLK 177 TOA PAYOH CENTRAL\n#01-130",
      "postalCode" : "310177"
  }​​​​​​​,
  "contactNumber" : "62553773",
  "clinicCode" : "TPC",
  
  "faxNumber":"",
  "attendingDoctorId":[],
  "clinicStaffUsernames":[],
  "companyRegistrationNumber":"",
  "gstRegistrationNumber":"",
  "heCode":"",
  "clinicLogo":"",
  "pcnRegistered":false,
  "clinicFeatures":[],
  "status":""
  }​​​​​​​,
  {​​​​​​​
  "id" : "5b55aabd0550de0021097bed",
  "name" : "HEALTHWAY MEDICAL-YIS",
  "groupName":"",
  "address" : {​​​​​​​
      "address" : "BLK 748 YISHUN STREET 72\n#01-230",
      "postalCode" : "760748"
  }​​​​​​​,
  "contactNumber" : "68537101",
  "clinicCode" : "YIS",
  
  "faxNumber":"",
  "attendingDoctorId":[],
  "clinicStaffUsernames":[],
  "companyRegistrationNumber":"",
  "gstRegistrationNumber":"",
  "heCode":"",
  "clinicLogo":"",
  "pcnRegistered":false,
  "clinicFeatures":[],
  "status":""
  }​​​​​​​];
  