export default function Button({ children, variant = "primary", ...props }) {
  const className = variant === "ghost" ? "btn btn-ghost" : "btn";
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
