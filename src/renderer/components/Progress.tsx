import { useItems, useAppState } from '../AppContext';
import styles from './Progress.module.css';

// Progress bar for completed/paused todo items
function Progress() {
  const totalAmount = useAppState().items.length;
  const { paused, completed } = useItems();
  const completedAmount = completed.length;
  const pausedAmount = paused.length;

  let completedPercentage = completedAmount / totalAmount;
  let pausedPercentage = pausedAmount / totalAmount + completedPercentage;

  if (Number.isNaN(completedPercentage)) {
    completedPercentage = 0;
  }

  if (Number.isNaN(pausedPercentage)) {
    pausedPercentage = 0;
  }

  return (
    <div className={styles.progress}>
      <div
        className={`${styles.progressbar} ${styles.paused}`}
        style={{ width: `${pausedPercentage * 100}%` }}
      />
      <div
        className={`${styles.progressbar} ${styles.completed}`}
        style={{ width: `${completedPercentage * 100}%` }}
      />
    </div>
  );
}

export default Progress;
