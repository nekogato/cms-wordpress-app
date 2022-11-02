import {
    TransitionGroup,
    CSSTransition as ReactTransition,
  } from "react-transition-group"
  

  const Transition = ({ children, location }) => {
    return (
      <TransitionGroup className="fade-wrapper">
        <ReactTransition
          key={location}
          classNames="my-fade"
          timeout={1200}
          unmountOnExit
        >
          {children}
        </ReactTransition>
      </TransitionGroup>
    )
  }
  
  export default Transition
