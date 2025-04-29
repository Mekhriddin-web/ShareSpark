import cn from 'classnames';
import { type FormikProps } from 'formik';

import css from './index.module.scss';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const Textarea = ({ name, label, formik }: { label: string; name: string; formik: FormikProps<any> }) => {
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
      <textarea
        className={cn({
          [css.input]: true,
          [css.invalid]: invalid,
        })}
        onChange={formik.handleChange}
        onBlur={() => {
          formik.setFieldTouched(name, true);
        }}
        value={value}
        name={name}
        id={name}
        disabled={formik.isSubmitting}
      />
      {invalid && <div className={css.error}>{error}</div>}
    </div>
  );
};
