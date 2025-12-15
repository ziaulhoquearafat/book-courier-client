const MyContainer = ({ className, children }) => {
  return <div className={`${className} max-w-7xl mx-auto`}>{children}</div>;
};

export default MyContainer;
