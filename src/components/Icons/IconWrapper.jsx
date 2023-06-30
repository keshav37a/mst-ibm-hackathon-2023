const IconWrapper = ({
  children,
  className,
  width = 32,
  height = 32,
  viewBox = "0 0 48 48",
  ...extraProps
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      {...extraProps}
    >
      {children}
    </svg>
  );
};

export default IconWrapper;
