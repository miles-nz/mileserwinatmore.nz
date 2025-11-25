function Button({ onClick, classes, text }) {
    return (
        <div className={classes}>
            <button onClick={onClick} className="button">
                {text}
            </button>
        </div>
    );
}

export default Button;
