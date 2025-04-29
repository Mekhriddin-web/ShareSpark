import { FormikProps } from 'formik';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const Input = ({ name, label, formik }: { label: string; name: string; formik: FormikProps<any> }) => {
  const error = formik.errors[name] as string | undefined;
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        type="text"
        onChange={formik.handleChange}
        onBlur={() => {
          formik.setFieldTouched(name, true);
        }}
        value={formik.values[name]}
        name={name}
        id={name}
        disabled={formik.isSubmitting}
      />
      {formik.touched[name] && error ? <div style={{ color: 'red' }}>{error}</div> : null}
    </div>
  );
};
