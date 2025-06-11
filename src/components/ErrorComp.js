const ErrorComp = ({ error }) => {
    return (
        <div className="text-center bg-red-800 text-white p-4 rounded-md mx-auto my-4 max-w-lg">
        <p className="font-semibold text-lg">Oops! Something went wrong.</p>
        <p>{error}</p>
      </div>
    );
};

export default ErrorComp;