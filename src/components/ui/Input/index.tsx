import styles from "./Input.module.scss";

type Propstypes = {
  label?: string;
  name: string;
  placeholder?: string;
  type: string;
};

const Input = (props: Propstypes) => {
  const { label, name, type, placeholder } = props;

  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        id={name}
        className={styles.container__input}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
