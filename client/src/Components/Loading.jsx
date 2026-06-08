const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-24 h-12">
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
