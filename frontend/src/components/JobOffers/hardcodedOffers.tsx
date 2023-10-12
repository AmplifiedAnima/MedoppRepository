const offers = [
  {
    label: 'Doctor',
    title: 'Anesthesiologist',
    company: 'Medical Center ABC',
    location: 'Warsaw',
    salary: '15,000 PLN/month',
    description: 'We are seeking an experienced anesthesiologist to provide anesthesia services for surgical procedures. Proficiency in pain management and critical care is required.',
    specialties: ['Anesthesiology'],
    latitude: 52.2297,
    longitude: 21.0122,
  },

  // Doctor - Cardiology
  {
    label: 'Doctor',
    title: 'Cardiologist',
    company: 'Hospital XYZ',
    location: 'Krakow',
    salary: '18,000 PLN/month',
    description: 'Join our cardiology department as a cardiologist and provide comprehensive care for patients with heart conditions. Experience in diagnostic procedures and interventional cardiology is desired.',
    specialties: ['Cardiology'],
    latitude: 50.0647,
    longitude: 19.9450,
  },

  // Doctor - Dermatology
  {
    label: 'Doctor',
    title: 'Dermatologist',
    company: 'Skin Clinic DEF',
    location: 'Gdansk',
    salary: '14,000 PLN/month',
    description: 'We are looking for a dermatologist with expertise in diagnosing and treating various skin conditions. Experience in cosmetic dermatology and laser treatments is preferred.',
    specialties: ['Dermatology'],
    latitude: 54.3520,
    longitude: 18.6466,
  },

  // Doctor - Endocrinology
  {
    label: 'Doctor',
    title: 'Endocrinologist',
    company: 'Endocrine Clinic GHI',
    location: 'Poznan',
    salary: '16,000 PLN/month',
    description: 'Join our endocrinology department as an endocrinologist and provide specialized care for patients with hormonal disorders. Experience in diabetes management and thyroid diseases is required.',
    specialties: ['Endocrinology'],
    latitude: 52.4064,
    longitude: 16.9252,
  },

  // Doctor - Gastroenterology
  {
    label: 'Doctor',
    title: 'Gastroenterologist',
    company: 'Gastro Clinic XYZ',
    location: 'Warsaw',
    salary: '17,000 PLN/month',
    description: 'We are seeking a skilled gastroenterologist to diagnose and treat disorders of the digestive system. Proficiency in endoscopic procedures and liver diseases is desired.',
    specialties: ['Gastroenterology'],
    latitude: 52.2297,
    longitude: 21.0122,
  },

  // Doctor - Neurology
  {
    label: 'Doctor',
    title: 'Neurologist',
    company: 'Neuro Clinic ABC',
    location: 'Krakow',
    salary: '16,500 PLN/month',
    description: 'Join our neurology department as a neurologist and provide specialized care for patients with neurological disorders. Experience in stroke management and epilepsy is preferred.',
    specialties: ['Neurology'],
    latitude: 50.0647,
    longitude: 19.9450,
  },
  {
    label: 'Doctor',
    title: 'Orthopedic Surgeon',
    company: 'Ortho Clinic XYZ',
    location: 'Warsaw',
    salary: '20,000 PLN/month',
    description: 'We are seeking an orthopedic surgeon to provide surgical and non-surgical treatment for musculoskeletal injuries and disorders. Experience in joint replacements and sports medicine is desired.',
    specialties: ['Orthopedics'],
    latitude: 52.2297,
    longitude: 21.0122,
  },

  // Doctor - Pediatrics
  {
    label: 'Doctor',
    title: 'Pediatrician',
    company: 'Children Hospital ABC',
    location: 'Krakow',
    salary: '15,500 PLN/month',
    description: 'Join our pediatric department as a pediatrician and provide medical care for infants, children, and adolescents. Experience in developmental assessments and immunizations is preferred.',
    specialties: ['Pediatrics'],
    latitude: 50.0647,
    longitude: 19.9450,
  },

  // Doctor - Radiology
  {
    label: 'Doctor',
    title: 'Radiologist',
    company: 'Imaging Center DEF',
    location: 'Gdansk',
    salary: '17,500 PLN/month',
    description: 'We are looking for a radiologist with expertise in diagnostic imaging techniques. Experience in interpreting X-rays, CT scans, and MRIs is required.',
    specialties: ['Radiology'],
    latitude: 54.3520,
    longitude: 18.6466,
  },

  // Doctor - Urology
  {
    label: 'Doctor',
    title: 'Urologist',
    company: 'Uro Clinic GHI',
    location: 'Poznan',
    salary: '18,500 PLN/month',
    description: 'Join our urology department as a urologist and provide specialized care for patients with urinary tract and reproductive system disorders. Experience in urological surgeries and prostate diseases is desired.',
    specialties: ['Urology'],
    latitude: 52.4064,
    longitude: 16.9252,
  },

  // Doctor - Ophthalmology
  {
    label: 'Doctor',
    title: 'Ophthalmologist',
    company: 'Eye Clinic XYZ',
    location: 'Warsaw',
    salary: '16,500 PLN/month',
    description: 'We are seeking an ophthalmologist to diagnose and treat eye conditions and perform eye surgeries. Experience in cataract surgery, LASIK, and retinal disorders is preferred.',
    specialties: ['Ophthalmology'],
    latitude: 52.2297,
    longitude: 21.0122,
  },

  // Doctor - Psychiatry
  {
    label: 'Doctor',
    title: 'Psychiatrist',
    company: 'Mental Health Clinic ABC',
    location: 'Krakow',
    salary: '19,000 PLN/month',
    description: 'Join our psychiatry department as a psychiatrist and provide mental health assessments and treatments. Experience in psychotherapy and psychopharmacology is desired.',
    specialties: ['Psychiatry'],
    latitude: 50.0647,
    longitude: 19.9450,
  },
  {
    label: 'Nurse',
    title: 'ICU Nurse',
    company: 'General Hospital XYZ',
    location: 'Sopot',
    salary: '8,000 PLN/month',
    description: 'Join our intensive care unit (ICU) as a registered nurse and provide critical care to patients. Experience in ventilator management and cardiac monitoring is desired.',
    specialties: ['Critical Care Nursing'],
    latitude: 54.4416,
    longitude: 18.5602,
  },

  // Pharmacist
  {
    label: 'Pharmacist',
    title: 'Clinical Pharmacist',
    company: 'Pharmacy ABC',
    location: 'Poznan',
    salary: '10,000 PLN/month',
    description: 'We are looking for a clinical pharmacist to provide pharmaceutical care to patients. Experience in medication therapy management and drug information services is preferred.',
    specialties: ['Clinical Pharmacy'],
    latitude: 52.4064,
    longitude: 16.9252,
  },
  {
    label: 'Paramedic',
    title: 'Emergency Paramedic',
    company: 'Emergency Medical Services',
    location: 'Gdynia',
    salary: '9,000 PLN/month',
    description: 'We are seeking an emergency paramedic to provide pre-hospital medical care in emergency situations. Experience in trauma management and advanced life support is required.',
    specialties: ['Emergency Medicine'],
    latitude: 54.5189,
    longitude: 18.5319,
  },

  // Paramedic - Critical Care Transport
  {
    label: 'Paramedic',
    title: 'Critical Care Transport Paramedic',
    company: 'Ambulance Services XYZ',
    location: 'Sopot',
    salary: '8,500 PLN/month',
    description: 'Join our critical care transport team as a paramedic and provide advanced medical care during inter-facility transfers. Experience in critical care transport and advanced airway management is desired.',
    specialties: ['Critical Care Transport'],
    latitude: 54.4416,
    longitude: 18.5602,
  },

  // Nurse - Pediatric Intensive Care
  {
    label: 'Nurse',
    title: 'Pediatric Intensive Care Nurse',
    company: 'Children Hospital DEF',
    location: 'Poznan',
    salary: '9,500 PLN/month',
    description: 'We are looking for a pediatric intensive care nurse to provide specialized care to critically ill children. Experience in pediatric resuscitation and mechanical ventilation is preferred.',
    specialties: ['Pediatric Intensive Care'],
    latitude: 52.4064,
    longitude: 16.9252,
  },

  // Nurse - Oncology
  {
    label: 'Nurse',
    title: 'Oncology Nurse',
    company: 'Cancer Center GHI',
    location: 'Gdansk',
    salary: '9,000 PLN/month',
    description: 'Join our oncology department as a nurse and provide comprehensive care to patients with cancer. Experience in chemotherapy administration and symptom management is desired.',
    specialties: ['Oncology Nursing'],
    latitude: 54.3520,
    longitude: 18.6466,
  },

  // Pharmacist - Hospital
  {
    label: 'Pharmacist',
    title: 'Hospital Pharmacist',
    company: 'Medical Center XYZ',
    location: 'Gdynia',
    salary: '10,500 PLN/month',
    description: 'We are seeking a hospital pharmacist to ensure safe and effective medication use within the healthcare facility. Experience in drug distribution and clinical pharmacy services is required.',
    specialties: ['Hospital Pharmacy'],
    latitude: 54.5189,
    longitude: 18.5319,
  },
];

export { offers };
