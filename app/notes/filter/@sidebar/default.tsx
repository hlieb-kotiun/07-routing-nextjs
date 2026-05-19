import { categories } from "@/types/note";
import css from "./SidebarNotes.module.css";
import Link from "next/link";

const SidebarNotes = () => {
  return (
    <div>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <a href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </a>
        </li>
        {categories.map((category, indx) => (
          <li key={`${category}-${indx}`} className={css.menuItem}>
            <Link href={`/notes/filter/${category}`} className={css.menuLink}>
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SidebarNotes;
