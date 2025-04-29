import { FormikProps } from 'formik';
import cn from 'classnames';

import css from './index.module.scss';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const Input = ({
  name,
  label,
  formik,
  maxWidth,
}: {
  label: string;
  name: string;
  formik: FormikProps<any>;
  maxWidth?: number;
}) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];
  const invalid = !!touched && !!error;
  const disabled = formik.isSubmitting;

  return (
    <div className={cn({ [css.field]: true, [css.disabled]: disabled })}>
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={cn({
          [css.input]: true,
          [css.invalid]: invalid,
        })}
        type="text"
        onChange={formik.handleChange}
        onBlur={() => {
          formik.setFieldTouched(name, true);
        }}
        value={value}
        name={name}
        id={name}
        disabled={formik.isSubmitting}
        style={{ maxWidth }}
      />
      {invalid && <div className={css.error}>{error}</div>}
    </div>
  );
};
