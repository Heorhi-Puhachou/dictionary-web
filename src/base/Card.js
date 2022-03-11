import './Card.css';

function Card(props) {
  const classes = 'out-card ' + props.className;
  return (
    <div className={classes}>
      <div className="card">
        {props.children}
      </div>
    </div>);
}

export default Card;