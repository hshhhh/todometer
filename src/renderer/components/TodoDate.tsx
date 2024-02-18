import styles from './TodoDate.module.css';
import { useAppState } from '../AppContext';

function TodoDate() {
  const { date } = useAppState();

  return (
    <div className={styles.date}>
      <div className={styles.calendar}>
        <div className={styles.day}>{date.dayDisplay}</div>
        <div className={styles.my}>
          <div className={styles.month}>{date.monthDisplay}</div>
          <div className={styles.year}>{date.year}</div>
        </div>
      </div>
      <div className="today">{date.weekday}</div>
    </div>
  );
}

export default TodoDate;
