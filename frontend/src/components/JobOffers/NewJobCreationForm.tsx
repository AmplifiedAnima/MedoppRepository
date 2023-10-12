import React, { useRef, FormEvent, useContext } from 'react';
import { Offer } from './OffersList';
import { ThemeContext } from '../../styles/ThemeProvider';
import styles from './NewJobCreationForm.module.css';
import HeaderForOtherRoutes from '../Header/HeaderForOtherRoutes';

interface NewJobCreationFormProps {
  createOffer: (offer: Offer) => void;
}

const NewJobCreationForm: React.FC<NewJobCreationFormProps> = ({ createOffer }) => {
  // const jobTitleRef = useRef<HTMLInputElement>(null);
  // const companyRef = useRef<HTMLInputElement>(null);
  // const locationRef = useRef<HTMLInputElement>(null);
  // const salaryRef = useRef<HTMLInputElement>(null);
  // const descriptionRef = useRef<HTMLTextAreaElement>(null);
  // const specialtiesRef = useRef<HTMLInputElement>(null);

  // const { themeMode } = useContext(ThemeContext);

  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const jobTitle = jobTitleRef.current?.value;
  //   const company = companyRef.current?.value;
  //   const location = locationRef.current?.value;
  //   const salary = salaryRef.current?.value;
  //   const description = descriptionRef.current?.value;
  //   const specialties = specialtiesRef.current?.value.split(',');

  //   if (jobTitle && company && location && salary && description && specialties ) {
  //     const offer: Offer = {
  //       label: jobTitle,
  //       title: jobTitle,
  //       company,
  //       location,
  //       salary,
  //       description,
  //       specialties,
  //       latitude: 0, // Replace with actual latitude
  //       longitude: 0,
  //       typeOfEmployment: '' // Replace with actual longitude
  //     };

  //     createOffer(offer);

  //     // Reset the form fields
  //     if (jobTitleRef.current) jobTitleRef.current.value = '';
  //     if (companyRef.current) companyRef.current.value = '';
  //     if (locationRef.current) locationRef.current.value = '';
  //     if (salaryRef.current) salaryRef.current.value = '';
  //     if (descriptionRef.current) descriptionRef.current.value = '';
  //     if (specialtiesRef.current) specialtiesRef.current.value = '';
  //   }
  // };

  return (
    <>
    {/* <HeaderForOtherRoutes />
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${themeMode === 'dark' ? styles['dark-mode'] : ''}`}
    >
      <div>
        <label htmlFor="jobTitle" className={styles.label}>
          Job Title:
        </label>
        <input type="text" id="jobTitle" ref={jobTitleRef} className={styles.input} />
      </div>

      <div>
        <label htmlFor="company" className={styles.label}>
          Company:
        </label>
        <input type="text" id="company" ref={companyRef} className={styles.input} />
      </div>

      <div>
        <label htmlFor="location" className={styles.label}>
          Location:
        </label>
        <input type="text" id="location" ref={locationRef} className={styles.input} />
      </div>

      <div>
        <label htmlFor="salary" className={styles.label}>
          Salary:
        </label>
        <input type="text" id="salary" ref={salaryRef} className={styles.input} />
      </div>

      <div>
        <label htmlFor="description" className={styles.label}>
          Description:
        </label>
        <textarea id="description" ref={descriptionRef} className={styles.textarea} />
      </div>

      <div>
        <label htmlFor="specialties" className={styles.label}>
          Specialties (separated by commas):
        </label>
        <input type="text" id="specialties" ref={specialtiesRef} className={styles.input} />
      </div>

      <button type="submit" className={styles.button}>
        Create Job
      </button>
    </form> */}
    </>
  );
};

export default NewJobCreationForm;
