const specialties = [
  { label: 'Doctor', specialties: ['Anesthesiology', 'Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'Neurology', 'Ophthalmology', 'Orthopedics', 'Pediatrics', 'Psychiatry', 'Radiology', 'Dentistry', 'Optometry'] },
  { label: 'Nurse', specialties: ['Medical-Surgical Nursing', 'Pediatric Nursing', 'Geriatric Nursing', 'Psychiatric Nursing', 'Community Health Nursing'] },
  { label: 'Paramedic', specialties: ['Emergency Medical Services', 'Ambulance Care', 'Trauma Care', 'Advanced Life Support'] },
  { label: 'Pharmacist', specialties: ['Community Pharmacy', 'Hospital Pharmacy', 'Clinical Pharmacy', 'Industrial Pharmacy'] },
  { label: 'Physiotherapist', specialties: ['Orthopedic Physiotherapy', 'Neurological Physiotherapy', 'Cardiorespiratory Physiotherapy', 'Sports Physiotherapy'] },
  { label: 'Care', specialties: ['Assisted Living', 'Dementia Care', 'Palliative Care', 'Home Care'] },
  { label: 'It', specialties: ['Health Informatics', 'Medical Imaging Informatics', 'Clinical Data Management', 'Bioinformatics', 'Healthcare Analytics'] },
  { label: 'Technician', specialties: ['Lab Technician', 'Radiology Technician', 'Pharmacy Technician', 'Surgical Technician', 'Dialysis Technician'] },
];

export const specialtiesForForm = [
  'Anesthesiology', 'Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology',
  'Neurology', 'Ophthalmology', 'Orthopedics', 'Pediatrics', 'Psychiatry',
  'Radiology', 'Dentistry', 'Optometry',
  'Medical-Surgical Nursing', 'Pediatric Nursing', 'Geriatric Nursing',
  'Psychiatric Nursing', 'Community Health Nursing',
  'Emergency Medical Services', 'Ambulance Care', 'Trauma Care', 'Advanced Life Support',
  'Community Pharmacy', 'Hospital Pharmacy', 'Clinical Pharmacy', 'Industrial Pharmacy',
  'Orthopedic Physiotherapy', 'Neurological Physiotherapy', 'Cardiorespiratory Physiotherapy', 'Sports Physiotherapy',
  'Assisted Living', 'Dementia Care', 'Palliative Care', 'Home Care',
  'Health Informatics', 'Medical Imaging Informatics', 'Clinical Data Management', 'Bioinformatics', 'Healthcare Analytics',
  'Lab Technician', 'Radiology Technician', 'Pharmacy Technician', 'Surgical Technician', 'Dialysis Technician',
];


const specialtiesExtended = [
  {
    label: "Doctor",
    specialties: [
      "Internal Medicine",
      "Family Medicine",
      "Pediatrics",
      "Obstetrics and Gynecology",
      "General Surgery",
      "Anesthesiology and Intensive Care",
      "Cardiology",
      "Orthopedics and Traumatology",
      "Psychiatry",
      "Ophthalmology",
      "Neurology",
      "Radiology and Diagnostic Imaging",
      "Pulmonology",
      "Otorhinolaryngology",
      "Dermatology and Venereology",
      "Medical Rehabilitation",
      "Rheumatology",
      "Endocrinology",
      "Occupational Medicine",
      "Neonatology",
      "Diabetology",
      "Allergology",
      "Nephrology",
      "Urology",
    ],
  },
  {
    label: "Nurse",
    specialties: [
      "Critical Care Nursing",
      "Maternal and Child Health Nursing",
      "Oncology Nursing",
      "Mental Health Nursing",
      "Palliative Care Nursing",
      "Pediatric Nursing",
      "Geriatric Nursing",
      "Home Healthcare Nursing",
      "Surgical Nursing",
      "Orthopedic Nursing",
      "Cardiac Nursing",
      "Community Health Nursing",
      "Neonatal Nursing",
      "Diabetes Education Nursing",
      "Wound Care Nursing",
    ],
  },
  {
    label: "Paramedic",
    specialties: [
      "Emergency Medical Services",
      "Ambulance Care",
      "Trauma Care",
      "Advanced Life Support",
      "Pediatric Paramedicine", // Specializing in pediatric emergency care.
      "Geriatric Paramedicine", // Specializing in geriatric patients' emergency needs.
      "Cardiac Paramedicine", // Focusing on cardiac emergencies and care.
      "Rescue Paramedicine", // Specializing in search and rescue operations.
      "Tactical Paramedicine", // Providing emergency care in tactical or high-risk situations.
      "Disaster Response Paramedicine", // Specializing in managing emergencies during disasters.
      "Critical Care Transport", // Transporting critically ill patients between facilities.
      "Flight Paramedicine", // Providing emergency medical care during air transport.
      "Telemedicine in Paramedicine",
    ],
  },
  {
    label: "Pharmacist",
    specialties: [
      "Community Pharmacy",
      "Hospital Pharmacy",
      "Clinical Pharmacy",
      "Industrial Pharmacy",
      "Pharmaceutical Research and Development", // Focusing on drug development and testing.
      "Pharmacotherapy Management", // Specializing in optimizing medication therapy for patients.
      "Pharmaceutical Compounding", // Preparing custom medications for individual patients.
      "Pharmacovigilance and Drug Safety", // Monitoring and ensuring the safety of medications.
      "Pharmacy Informatics", // Managing and optimizing medication-related data and technology.
      "Pharmaceutical Quality Assurance", // Ensuring the quality and safety of pharmaceutical products.
      "Pharmacy Education", // Teaching and training future pharmacists.
      "Clinical Research Pharmacy", // Conducting research on the effectiveness of medications.
      "Oncology Pharmacy", // Specializing in cancer treatments and medications.
      "Infectious Diseases Pharmacy", // Focusing on medications for infectious diseases.
      "Geriatric Pharmacy", // Providing pharmaceutical care to elderly patients.
      "Pediatric Pharmacy", // Specializing in medications for children and infants.
      "Psychiatric Pharmacy", // Mana
    ],
  },
  {
    label: "Physiotherapist",
    specialties: [
      "Orthopedic Physiotherapy",
      "Neurological Physiotherapy",
      "Cardiorespiratory Physiotherapy",
      "Sports Physiotherapy",
      "Pediatric Physiotherapy",
      "Geriatric Physiotherapy",
      "Pulmonary Rehabilitation",
      "Manual Therapy",
      "Musculoskeletal Physiotherapy",
      "Vestibular Rehabilitation",
      "Women's Health Physiotherapy",
      "Aquatic Physiotherapy",
      "Hand Therapy",
      "Oncology Rehabilitation",
      "Pain Management and Chronic Pain Rehabilitation",
    ],
  },
  {
    label: "Care",
    specialties: [
      'Assisted Living',
      'Dementia Care',
      'Palliative Care',
      'Home Care',
      'Respite Care', // Providing short-term relief to primary caregivers.
      'Hospice Care', // Focusing on end-of-life care and support.
      'Alzheimer’s Care', // Specializing in care for individuals with Alzheimer's disease.
      'Elderly Companion Care', // Offering companionship and assistance to seniors.
      'Memory Care', // Designed for individuals with memory-related conditions.
      'Long-Term Care', // Providing ongoing care for individuals with chronic conditions.
      'Rehabilitation Care', // Assisting patients in their recovery and rehabilitation.
      'Hospice Volunteer Services', // Volunteering in hospice settings to provide support.
      'In-Home Respite Care', // Offering short-term relief for caregivers at home.
      'Assisted Living for Veterans', // Tailored care for military veterans.
      'End-of-Life Planning', // Assisting individuals in making end-of-life decisions.
      'Caregiver Training and Support' // Training and supporting family caregivers.
    ]
  },
  {
    label: "IT",
    specialties: [
      'Health Informatics',
      'Medical Imaging Informatics',
      'Clinical Data Management',
      'Bioinformatics',
      'Healthcare Analytics',
      'Electronic Health Records (EHR) Systems',
      'Telemedicine Technology',
      'Health Information Security',
      'Healthcare Application Development',
      'Medical Device Integration',
      'Data Privacy and Compliance',
      'Healthcare Software Quality Assurance',
      'Healthcare Data Interoperability',
      'Healthcare IT Project Management',
      'Artificial Intelligence in Healthcare',
      'Machine Learning for Medical Diagnosis'
    ],
  },
  {
    label: "Technician",
    specialties: [
      'Lab Technician',
      'Radiology Technician',
      'Pharmacy Technician',
      'Surgical Technician',
      'Dialysis Technician',
      'Medical Laboratory Assistant', // Assisting with lab tests and sample analysis.
      'Cardiac Monitor Technician', // Specializing in cardiac monitoring equipment.
      'Orthopedic Technician', // Assisting in orthopedic procedures and care.
      'Ophthalmic Technician', // Working with eye care professionals.
      'Emergency Medical Technician (EMT)', // Providing pre-hospital emergency care.
      'Biomedical Equipment Technician', // Maintaining medical equipment.
      'Respiratory Therapy Technician', // Supporting patients with respiratory conditions.
      'Electrocardiogram (ECG) Technician', // Performing ECG tests and monitoring.
      'Phlebotomy Technician', // Specializing in blood collection procedures.
      'Endoscopy Technician', // Assisting in endoscopic procedures.
      'Neurodiagnostic Technician', // Conducting neurological tests and monitoring.
      'Veterinary Technician', // Assisting in veterinary care.
    ],
  },
];
export default specialties;