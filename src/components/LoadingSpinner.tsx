export const LoadingSpinner = (props: { size?: number }) => {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-4 border-solid border-info border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${
        props.size ? `w-${props.size} h-${props.size}` : "h-12 w-12"
      }`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 text-info ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export const LoadingPage = () => {
  return (
    <div
      data-theme="lofi"
      className="grid h-screen w-full place-items-center bg-base-100"
    >
      <LoadingSpinner size={16} />
    </div>
  );
};
