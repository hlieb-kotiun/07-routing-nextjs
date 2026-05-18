"use client";

import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue: string;
}

const SearchBox = ({ onChange, defaultValue }: SearchBoxProps) => {
  return (
    <input
      defaultValue={defaultValue}
      onChange={onChange}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
};
export default SearchBox;
