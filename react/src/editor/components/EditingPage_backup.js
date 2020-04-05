import React, { Component, useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import * as constants from "../../constants";
import PageSection from "./PageSection";
import Card from "./Card.jsx";
import update from 'immutability-helper'

const style = {
  // this is commented out because I mean to use an EditingPage withing a column component, which must take up the entire column
  // marginLeft: "50vh"
}


/**
 * The purpose of this class is to have a column with a Row-PageSection Component act as a EditingPage
 */
class EditingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.page,
      active: 0
    }
  }


  toggleClickClass = (i) => {
    this.setState({ active: i });
    this.props.setActive(i, this);
  }

  /**
   * This method renders a page from JSON onto the actual page editor
   * Can be reused for actual page viewing as well
   * Returns the sections added to the editor page
   */
  returnPage() {
    let x = []; //empty array
    try {
      for (let i = 0; i < this.props.page.length; i++) {  //for each section
        var y = {   //get section values
          key: this.props.page[i].id,
          id: this.props.page[i].id,
          type: this.props.page[i].type,
          style: this.props.page[i].style[0],
          text: this.props.page[i].text,
          faClassName: this.props.page[i].faClassName,
          onClick: this.props.page.onClick,
          url: this.props.page[i].url,
          onSectionPush: this.props.onSectionPush,
          toggleClickClass: this.toggleClickClass,
          clicked: (this.state.active === this.props.page[i].id ? true : false),
          href: this.props.page[i].href,
          col: this.props.page[i].col,
        }
        x.push(y) //push to array
      }
      console.log(x);
    } catch (e) { }
    return x;
  }

  render() {

    const Container = () => {
      let x = this.returnPage();

      /**
       * This sets up a setState handler called setCards
       * and inializes the state of the cards object with x
       */
      const [cards, setCards] = useState(x)

      /**
       * This is a call back method used to update the index of a moved card
       * which then updates the state.cards with the new arrangement.
       */
      const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
          const dragCard = cards[dragIndex]
          setCards(
            update(cards, {
              $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
              ],
            }),
          )
        },
        [cards],
      );

      /**
       * This method creates a PageSection component i.e. Header, Image etc
       * and wraps it inside a Card Component to allow verticle dragging
       * @param {*} card 
       * @param {*} index 
       */
      const renderCard = (card, index) => {

        /*Update the page with the card's new order so that rearrangements reflect on page permanently.*/
        this.props.page[index].id = card.id;
        this.props.page[index].type = card.type;
        this.props.page[index].style[0] = card.style;
        this.props.page[index].text = card.text;
        this.props.page[index].faClassName = card.faClassName;
        this.props.page[index].onClick = card.onClick;
        this.props.page[index].url = card.url;
        this.props.page[index].onSectionPush = card.onSectionPush;
        this.props.page[index].toggleClickClass = card.toggleClickClass;
        this.props.page[index].clicked = card.clicked;
        this.props.page[index].href = card.href;
        this.props.page[index].col = card.col;


        return (      //returns a card which returns a page section with these vals
          <Card
            key={card.id}
            id={card.id}
            type={card.type}
            style={card.style}
            text={card.text}
            faClassName={card.faClassName}
            onClick={card.onClick}
            url={card.url}
            onSectionPush={card.onSectionPush}
            toggleClickClass={card.toggleClickClass}
            clicked={card.clicked}
            index={index}
            moveCard={moveCard}
            href={card.href}
            col={card.col}
          />
        )
      }

      return (
        <>
          <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
        </>
      )
      // }
    }


    return (
      <DndProvider backend={Backend}>
        <Container />
      </DndProvider>
    )
  }
}

export default EditingPage;
