export default function Icon({ path, title, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      {title && <title>{title}</title>}
      <path d={path} />
    </svg>
  )
}
