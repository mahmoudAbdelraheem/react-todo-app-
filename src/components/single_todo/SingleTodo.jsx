/* eslint-disable react/prop-types */
const SingleTodo = (props) => {
  return (
    <div className="row pb-3">
      <div
        className={
          props.task.isCompleted
            ? "col-12 d-flex justify-content-evenly border p-1 border-2 rounded bg-secondary-subtle"
            : "col-12 d-flex justify-content-evenly border p-1 border-2 rounded text-light bg-primary"
        }
      >
        <div className="col-8">
          <h4
            style={{
              textDecoration: props.task.isCompleted ? "line-through" : "none",
            }}
          >
            {props.task.text}
          </h4>
        </div>
        <div className="col-4">
          <button
            className="btn btn-danger mx-2"
            onClick={() => props.onRemove(props.index)}
          >
            Delete
          </button>
          <button
            className={
              props.task.isCompleted
                ? "btn btn-success mx-2"
                : "btn border text-light mx-2"
            }
            onClick={() => props.onComplete(props.index)}
          >
            {props.task.isCompleted ? "Undo" : "Complete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleTodo;
