/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-autofocus */
import { useRef } from 'react';
import { useAppReducer } from '../AppContext';
import styles from './AddItemForm.module.css';

// Form to populate todo items
function AddItemForm() {
  const dispatch = useAppReducer();
  const inputRef = useRef();

  function addItem(e: any) {
    const newItem = {
      // @ts-ignore
      text: inputRef.current.value,
      key: Date.now(),
      status: 'pending',
    };
    if (newItem.text.trim()) {
      dispatch({ type: 'ADD_ITEM', item: newItem });
    }
    e.preventDefault();
    // @ts-ignore
    inputRef.current.value = '';
    // @ts-ignore
    inputRef.current.focus();
  }

  return (
    <form className={styles.form} onSubmit={addItem}>
      {/* @ts-ignore */}
      <input ref={inputRef} placeholder="Add new item" autoFocus />
      <button type="submit" />
    </form>
  );
}

export default AddItemForm;
