import { Droppable } from "react-beautiful-dnd";
import {
    Typography,
    Spinner,
  } from "@material-tailwind/react";
import ListItem from "./ListItem";

const DraggableElement = ({
  prefix,
  elements,
  className = '',
  style = {},
  titleCard = '',
  isDropDisabled = false,
  isLoadingChip,
  isDragDisabled = false,
}) => {

    return (
    
    <div
      className={`bg-gray-100 rounded-md p-3 ${className}`}
      style={style}
      data-tut={`reactour__workflow_droppable_${prefix}`}
    >
      
    <div className="uppercase bg-green-500 text-white p-2 rounded-lg my-4 text-sm text-center">
      <Typography
        variant="small"
        className="font-bold uppercase text-white"
      >
        {prefix}
      </Typography>
    </div>
    <Droppable
      droppableId={`${prefix}`}
      data-testid={`droppable-id-${prefix}`}
      type={`position`}
      isDropDisabled={isDropDisabled}
    >
      
      {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-row flex-wrap gap-5 justify-center"
          >
            {elements?.map((item, index) => {

              return (
                  <ListItem
                      key={item.id}
                      item={item}
                      index={index}
                      titleCard={titleCard}
                      isDragDisabled={isDragDisabled}
                  />
              )
            })}
            {elements?.length === 0 && (
              <div className="border-2 border-gray-300 border-dashed rounded-md h-70 p-3 w-full">
                {isLoadingChip ? (
                  <div className="flex w-full justify-center">
                    <Spinner color="green" />
                  </div>

                ) : (
                  <Typography className="text-gray-400 text-center">
                    Drop here {titleCard} ...
                  </Typography>
                )}
              </div>
            )}
            {provided.placeholder}
          </div>
      )}
    </Droppable>
  </div>
    )
};

export default DraggableElement;
