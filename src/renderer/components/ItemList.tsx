import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@reach/accordion';
import '@reach/accordion/styles.css';
import { useAppReducer, useItems } from '../AppContext';
import Progress from './Progress';
import AddItemForm from './AddItemForm';
import Item from './Item';
import styles from './ItemList.module.css';
import arrow from '../img/arrow.svg';
import alldone from '../img/alldone.svg';

function ItemList() {
  const dispatch = useAppReducer();
  const { pending, paused, completed } = useItems();

  return (
    <div>
      <Progress />
      <AddItemForm />
      {pending.length > 0 ? (
        <>
          {pending.map((item: any) => {
            return <Item item={item} key={item.key} />;
          })}
        </>
      ) : (
        <div className={styles.alldone}>
          <img src={alldone} alt="Nothing to do!" />
        </div>
      )}
      <Accordion collapsible multiple>
        {paused.length > 0 && (
          <AccordionItem>
            <AccordionButton className={styles.toggle}>
              <img src={arrow} alt="Do Later Toggle" />
              <span>Do Later</span>
            </AccordionButton>
            <AccordionPanel className={styles.panel}>
              {paused &&
                paused.map((item: any) => {
                  return <Item item={item} key={item.key} />;
                })}
            </AccordionPanel>
          </AccordionItem>
        )}
        {completed.length > 0 && (
          <AccordionItem>
            <AccordionButton className={styles.toggle}>
              <img src={arrow} alt="Completed Toggle" /> <span>Completed</span>
            </AccordionButton>
            <AccordionPanel className={styles.panel}>
              {completed &&
                completed.map((item: any) => {
                  return <Item item={item} key={item.key} />;
                })}
            </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
      {(completed.length > 0 || paused.length > 0) && (
        <div className={styles.reset}>
          <button
            type="button"
            onClick={() => {
              dispatch({ type: 'RESET_ALL' });
            }}
          >
            reset progress
          </button>
        </div>
      )}
    </div>
  );
}

export default ItemList;
