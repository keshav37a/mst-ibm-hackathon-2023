import IconWrapper from "./IconWrapper";

const HamburgerMenuIcon = ({ className, ...extraProps }) => {
  return (
    <IconWrapper className={className} {...extraProps}>
      <path d="M5.5 9a1.5 1.5 0 1 0 0 3h37a1.5 1.5 0 1 0 0-3h-37zm0 13.5a1.5 1.5 0 1 0 0 3h37a1.5 1.5 0 1 0 0-3h-37zm0 13.5a1.5 1.5 0 1 0 0 3h37a1.5 1.5 0 1 0 0-3h-37z" />
    </IconWrapper>
  );
};

export default HamburgerMenuIcon;
