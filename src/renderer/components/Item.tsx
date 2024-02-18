/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react/prop-types */
import { useAppReducer } from '../AppContext';
import styles from './Item.module.css';

// Individual todo item
// @ts-ignore
function Item({ item }) {
  const dispatch = useAppReducer();
  const { text } = item;
  const paused = item.status === 'paused';
  const completed = item.status === 'completed';

  function deleteItem() {
    dispatch({ type: 'DELETE_ITEM', item });
  }

  function pauseItem() {
    const pausedItem = { ...item, status: 'paused' };
    dispatch({ type: 'UPDATE_ITEM', item: pausedItem });
  }

  function resumeItem() {
    const pendingItem = { ...item, status: 'pending' };
    dispatch({ type: 'UPDATE_ITEM', item: pendingItem });
  }

  function completeItem() {
    const completedItem = { ...item, status: 'completed' };
    dispatch({ type: 'UPDATE_ITEM', item: completedItem });
  }

  return (
    <div className={styles.item} tabIndex={0}>
      <div className={styles.itemname}>{text}</div>
      <div
        className={`${styles.buttons} ${
          completed ? styles.completedButtons : ''
        }`}
      >
        {completed && <button className={styles.empty} tabIndex={0} />}
        <button className={styles.delete} onClick={deleteItem} tabIndex={0} />
        {!paused && !completed && (
          <button className={styles.pause} onClick={pauseItem} tabIndex={0} />
        )}
        {(paused || completed) && (
          <button className={styles.resume} onClick={resumeItem} tabIndex={0} />
        )}
        {!completed && (
          <button
            className={styles.complete}
            onClick={completeItem}
            tabIndex={0}
          />
        )}
      </div>
    </div>
  );
}

export default Item;
