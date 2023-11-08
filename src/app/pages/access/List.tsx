import { capitalizeFLetter } from "@/utils/general";
import Checkbox from "./Checkbox";
import { status } from "./constants";


export default function List(props) {
  const { items, compute } = props;

  return (
    <ul className="flex flex-col gap-1">
      {items.map((item) => {
        let childList = <></>;
        if (Array.isArray(item.items)) {
          childList =
          <div className="ml-4">
            <List items={item.items} compute={compute} />
          </div>
          ;
        }
        return (
          <li key={item.id}>
            <div className="flex flex-row">
              <Checkbox
                id={item.id}
                name={item.name}
                checked={item.status === status.checked}
                indeterminate={item.status === status.indeterminate}
                compute={compute}
              />
              <label className="control control-checkbox -ml-7 -mb-1" htmlFor={capitalizeFLetter(item.name)}>{capitalizeFLetter(item.name)}</label>

            </div>
            {(item.status === status.checked || item.status === status.indeterminate) && childList}
          </li>
        );
      })}
    </ul>
  );
}
