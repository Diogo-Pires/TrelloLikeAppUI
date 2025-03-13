type LoadingMsgProps = {
    isLoading: boolean;
  };

const LoadingMsg = ({isLoading}: LoadingMsgProps) => {
    if (isLoading) return <p>Loading...</p>
    return <></>
}

export default LoadingMsg;