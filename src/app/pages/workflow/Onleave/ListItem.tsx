import { Draggable } from "react-beautiful-dnd";
import { Badge, Chip } from "@material-tailwind/react";

const ListItem = ({
    item,
    index,
    titleCard,
    isDragDisabled,
}) => {

  return (
    <Draggable
      draggableId={item.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {titleCard === 'approval' ? (
              <Badge content={index + 1} withBorder>
                <Chip
                    value={item.content}
                    color={item.bgColor}
                    variant="outlined"
                />
              </Badge>
            ) : isDragDisabled ? (
              <Chip value={item.content} variant="ghost" />
            ) : (
              <Chip
                value={item.content}
                color={item.bgColor}
                variant="outlined"
              />
            )}
          </div>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
