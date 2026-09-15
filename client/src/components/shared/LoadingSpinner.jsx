const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
  const sizes = { sm: "w-6 h-6", md: "w-10 h-10", lg: "w-14 h-14" };
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div
        className={`${sizes[size]} border-4 border-brand-green border-t-transparent rounded-full animate-spin`}
      />
      {text && <p className="text-sm text-gray-500 mt-3">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
