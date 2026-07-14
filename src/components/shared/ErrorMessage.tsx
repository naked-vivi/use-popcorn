interface ErrorMessageProps {
    message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <p className="error">
            {message}
        </p>
    )
}

export default ErrorMessage