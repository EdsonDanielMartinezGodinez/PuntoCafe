export default function Stars({ rating }) {
  const llenas = Math.floor(rating)
  return <span className="ms-stars">{'★'.repeat(llenas)}{'☆'.repeat(5 - llenas)}</span>
}
