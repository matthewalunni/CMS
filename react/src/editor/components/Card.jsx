import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
import PageSection from "./PageSection"

const style = { //styling of card
  border: '1px solid green',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

const Card = ({ id, type, style, text, faClassName, onClick, url, onSectionPush, index, moveCard }) => { //section fields + index + moveCard
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2  //get vertical middle
      const clientOffset = monitor.getClientOffset()  //mouse pos
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {  //drag down only if 1/2 item height crossed
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {  //drag up only if 1/2 item height crossed
        return
      }
      moveCard(dragIndex, hoverIndex) //move card
      item.index = hoverIndex
      console.log("ITEM INDEX: "+item.index)
      console.log("HOVER INDEX: "+hoverIndex);
    },
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  /*
  console.log("ID "+id);
  console.log("TYPE "+type);
  console.log("STYLE "+style);
  console.log("TEXT "+text);
  console.log("CLASSNAME "+faClassName);
  console.log("ONCLICK "+onClick);
  console.log("URL "+url);
  console.log("ON SEC PUSH "+onSectionPush);
  */

    return (
      <div ref={ref} style={{ ...style, opacity }}>
        {   //card returns a page section
          <PageSection
            index={id}
            type={type}
            style={style}
            text={text}
            faClassName={faClassName}
            onClick={onClick}
            url={url}
            onSectionPush={onSectionPush}
          />
        }
      </div>
    )
}
export default Card